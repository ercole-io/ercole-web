import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

const url = 'exadata'

export const state = () => ({
  exadataList: {},
  currentExadata: {},
})

export const getters = {
  showExadataList: (state) => {
    return state.exadataList
  },
  showSelectedExadata: (state) => (searchTherm) => {
    const exadata = getMachineTypes(state.currentExadata)

    if (searchTherm) {
      filterGeneric(exadata.kvmhost, exadata.kvmOpenRows, searchTherm, 'kvm')
      filterGeneric(exadata.dom0, exadata.domOpenRows, searchTherm, 'dom')
      filterGeneric(exadata.baremetal, null, searchTherm, 'bare')
      filterGeneric(
        exadata.storagecell,
        exadata.stoOpenRows,
        searchTherm,
        'sto'
      )
      filterGeneric(exadata.ibswitch, null, searchTherm, 'ibs')

      // const search = _.filter(exadata, (data) => {
      //   const {
      //     exadata,
      //     machineType,
      //     _id,
      //     kvmhost,
      //     kvmOpenRows,
      //     ibswitch,
      //     dom0,
      //     domOpenRows,
      //     baremetal,
      //     storagecell,
      //     stoOpenRows,
      //   } = data

      //   return (
      //     _.includes(_.lowerCase(exadata), _.lowerCase(searchTherm)) ||
      //     _.includes(_.lowerCase(machineType), _.lowerCase(searchTherm)) ||
      //     _.includes(_.lowerCase(_id), _.lowerCase(searchTherm)) ||
      //     filterGeneric(kvmhost, kvmOpenRows, searchTherm, 'kvm') ||
      //     filterGeneric(dom0, domOpenRows, searchTherm, 'dom') ||
      //     filterGeneric(baremetal, null, searchTherm, 'bare') ||
      //     filterGeneric(storagecell, stoOpenRows, searchTherm, 'sto') ||
      //     filterGeneric(ibswitch, null, searchTherm, 'ibs')
      //   )
      // })

      // return search
    }

    return exadata
  },
}

export const mutations = {
  SET_EXADATA_LIST: (state, payload) => {
    state.exadataList = payload
  },
  SET_CURRENT_EXADATA: (state, payload) => {
    state.currentExadata = payload
  },
  SET_EXADATA_STORAGE_CLUSTERNAMES: (state, payload) => {
    let exadataScoped = { ...state.currentExadata }

    if (exadataScoped.rackID === payload.rackID) {
      exadataScoped.components.find(
        (el) => el.hostID === payload.hostID
      ).clusterNames = payload.clusterNames
    }

    state.currentExadata = { ...exadataScoped }
  },
  SET_EXADATA_KVM_CLUSTERNAME: (
    state,
    { rackID, hostID, hostname, clusterName }
  ) => {
    let exadataScoped = { ...state.currentExadata }

    if (exadataScoped.rackID === rackID) {
      exadataScoped.components
        .find((el) => el.hostID === hostID)
        .vms.find((el) => el.name === hostname).clusterName = clusterName
    }

    state.currentExadata = { ...exadataScoped }
  },
  SET_EXADATA_RDMA: (state, { rackID, swVersion, switchName, model }) => {
    let exadataScoped = { ...state.currentExadata }

    if (exadataScoped.rackID === rackID) {
      exadataScoped.rdma = {
        swVersion,
        switchName,
        model,
      }
    }

    state.currentExadata = { ...exadataScoped }
  },
}

export const actions = {
  // eslint-disable-next-line no-empty-pattern
  async getExadataList({}) {
    const config = {
      method: 'get',
      url: url,
    }

    return await axiosRequest('baseApi', config)
  },
  async getSelectedExadata({ commit, dispatch }, id) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: `${url}/${id}`,
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_CURRENT_EXADATA', res.data)
      dispatch('offLoadingTable')
    })
  },
  async updateClusterName({ commit }, cluster) {
    const { rackID, hostID, clusterNames } = cluster
    axiosRequest('baseApi', {
      method: 'post',
      url: `/exadata/${rackID}/components/${hostID}`,
      data: {
        clusterNames,
      },
    }).then(() => {
      commit('SET_EXADATA_STORAGE_CLUSTERNAMES', {
        hostID,
        rackID,
        clusterNames,
      })
    })
  },
  async updateVmsClusterName({ commit }, cluster) {
    const { rackID, hostID, clusterName, hostname } = cluster
    axiosRequest('baseApi', {
      method: 'post',
      url: `/exadata/${rackID}/components/${hostID}/vms/${hostname}`,
      data: {
        clusterName,
      },
    }).then(() => {
      commit('SET_EXADATA_KVM_CLUSTERNAME', {
        hostID,
        rackID,
        clusterName,
        hostname,
      })
    })
  },
  async createRDMA({ commit }, rdma) {
    const { rackID, swVersion, switchName, model } = rdma
    axiosRequest('baseApi', {
      method: 'post',
      url: `/exadata/${rackID}/rdma`,
      data: {
        swVersion,
        switchName,
        model,
      },
    }).then(() => {
      commit('SET_EXADATA_RDMA', {
        swVersion,
        rackID,
        switchName,
        model,
      })
    })
  },
}

const organizeExadata = (data) => {
  const result = {
    _id: data.rackID,
    exadata: data.hostname,
    update: data.updateAt,
    kvmhost: getHostype(data, 'KVM_HOST'),
    kvmOpenRows: [],
    ibswitch: getHostype(data, 'IB_SWITCH'),
    storagecell: getHostype(data, 'STORAGE_CELL'),
    stoOpenRows: [],
    dom0: getHostype(data, 'DOM0'),
    domOpenRows: [],
    baremetal: getHostype(data, 'BARE_METAL'),
    progress: {
      totalCPU: data.totalCPU,
      usedCPU: data.usedCPU,
      usedCPUPercentage: data.usedCPUPercentage,
      freeCPU: data.freeCPU,
      totalMemory: data.totalMemory,
      usedMemory: data.usedMemory,
      usedMemoryPercentage: data.usedMemoryPercentage,
      freeMemory: data.freeMemory,
      totalSize: data.totalSize,
      usedSize: data.usedSize,
      usedSizePercentage: data.usedSizePercentage,
      freeSpace: data.freeSpace,
    },
    rdma: data.rdma ? data.rdma : {},
  }

  return result
}

const getMachineTypes = (data) => {
  const newData = organizeExadata(data)
  let result = {}

  if (newData.dom0.length > 0) {
    result = {
      ...newData,
      machineType: 'OVM',
    }
  } else if (newData.kvmhost.length > 0) {
    result = {
      ...newData,
      machineType: 'KVM',
    }
  } else {
    result = {
      ...newData,
      machineType: 'BARE METAL',
    }
  }

  return result
}

const getHostype = (val, type) => {
  return _.filter(val.components, (t) => {
    return t.hostType === type
  })
}

const filterGeneric = (techData, techOpenRows, searchTherm, type) => {
  return _.filter(techData, (kvm) => {
    const {
      hostname,
      model,
      imageVersion,
      totalCPU,
      usedCPU,
      freeCPU,
      memory,
      usedRAM,
      freeRAM,
      cpuEnabled,
      kernel,
      vms,
      storageCells,
      swVersion,
    } = kvm

    let searchVms
    if (type === 'kvm') {
      searchVms = filterKvmVms(vms, techOpenRows, hostname, searchTherm)
    }

    if (type === 'dom') {
      searchVms = filterDomVms(vms, techOpenRows, hostname, searchTherm)
    }

    if (type === 'sto') {
      searchVms = filterStoVms(
        storageCells,
        techOpenRows,
        hostname,
        searchTherm
      )
    }

    if (type === 'kvm' || type === 'dom') {
      return (
        _.includes(_.lowerCase(hostname), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(model), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(imageVersion), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(totalCPU), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(usedCPU), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(freeCPU), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(memory), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(usedRAM), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(freeRAM), _.lowerCase(searchTherm)) ||
        searchVms
      )
    }

    if (type === 'bare') {
      return (
        _.includes(_.lowerCase(hostname), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(memory), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(cpuEnabled), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(totalCPU), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(imageVersion), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(kernel), _.lowerCase(searchTherm))
      )
    }

    if (type === 'sto') {
      return (
        _.includes(_.lowerCase(hostname), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(model), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(imageVersion), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(totalCPU), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(cpuEnabled), _.lowerCase(searchTherm)) ||
        searchVms
      )
    }

    if (type === 'ibs') {
      return (
        _.includes(_.lowerCase(hostname), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(model), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(swVersion), _.lowerCase(searchTherm))
      )
    }
  }).length
}

const filterKvmVms = (vms, techOpenRows, hostname, searchTherm) => {
  return _.filter(vms, (vm) => {
    const { name, ramCurrent, cpuCurrent } = vm

    if (
      _.includes(_.lowerCase(name), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(ramCurrent), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cpuCurrent), _.lowerCase(searchTherm))
    ) {
      techOpenRows.push(hostname)
    }

    return (
      _.includes(_.lowerCase(name), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(ramCurrent), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cpuCurrent), _.lowerCase(searchTherm))
    )
  }).length
}

const filterDomVms = (vms, techOpenRows, hostname, searchTherm) => {
  return _.filter(vms, (vm) => {
    const { name, cpuOnline, ramOnline } = vm

    if (
      _.includes(_.lowerCase(name), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cpuOnline), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(ramOnline), _.lowerCase(searchTherm))
    ) {
      techOpenRows.push(hostname)
    }

    return (
      _.includes(_.lowerCase(name), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cpuOnline), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(ramOnline), _.lowerCase(searchTherm))
    )
  }).length
}

const filterStoVms = (vms, techOpenRows, hostname, searchTherm) => {
  return _.filter(vms, (vm) => {
    const { type, cellDisk, cell, status, size, freeSpace, errorCount } = vm

    if (
      _.includes(_.lowerCase(type), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cellDisk), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cell), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(status), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(size), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(freeSpace), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(errorCount), _.lowerCase(searchTherm))
    ) {
      techOpenRows.push(hostname)
    }

    return (
      _.includes(_.lowerCase(type), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cellDisk), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(cell), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(status), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(size), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(freeSpace), _.lowerCase(searchTherm)) ||
      _.includes(_.lowerCase(errorCount), _.lowerCase(searchTherm))
    )
  }).length
}
