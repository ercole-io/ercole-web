import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

const url = 'exadata'

export const state = () => ({
  exadata: {},
  exadataList: [],
})

export const getters = {
  getExadata: (state) => (searchTherm) => {
    const exadata = getMachineTypes(state.exadata)

    if (searchTherm === '') {
      return exadata
    }

    const search = _.filter(exadata, (data) => {
      const {
        exadata,
        machineType,
        _id,
        kvmhost,
        kvmOpenRows,
        ibswitch,
        dom0,
        domOpenRows,
        baremetal,
        storagecell,
        stoOpenRows,
      } = data

      return (
        _.includes(_.lowerCase(exadata), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(machineType), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(_id), _.lowerCase(searchTherm)) ||
        filterGeneric(kvmhost, kvmOpenRows, searchTherm, 'kvm') ||
        filterGeneric(dom0, domOpenRows, searchTherm, 'dom') ||
        filterGeneric(baremetal, null, searchTherm, 'bare') ||
        filterGeneric(storagecell, stoOpenRows, searchTherm, 'sto') ||
        filterGeneric(ibswitch, null, searchTherm, 'ibs')
      )
    })

    return search
  },
  getExadataList: (state) => {
    return state.exadataList
  },
  getExadataListData: (state) => (selected) => {
    const exadata = getMachineTypes(state.exadata)
    console.log(exadata)

    const data = _.filter(exadata, (val) => {
      if (val.exadata === selected) {
        return val
      }
    })

    return data
  },
}

export const mutations = {
  SET_EXADATA: (state, payload) => {
    state.exadata = payload.exadata
  },
  SET_EXADATA_LIST: (state, payload) => {
    state.exadataList = payload
  },
}

export const actions = {
  async getExadataData({ commit, getters, dispatch }, olderThan = null) {
    dispatch('onLoadingTable')

    const endPoints = [url]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('baseApi', {
          merthod: 'get',
          url: endpoint,
          params: {
            'older-than': getters.getActiveFilters.date || olderThan,
            environment: getters.getActiveFilters.environment,
            location: getters.getActiveFilters.location,
          },
        })
      )
    ).then(
      axios.spread((...allData) => {
        const data = allData[0].data
        const list = _.map(data, (val) => {
          return val.hostname
        })

        commit('SET_EXADATA_LIST', list)
        commit('SET_EXADATA', {
          exadata: data,
        })
        dispatch('offLoadingTable')
      })
    )
  },
}

const organizeExadata = (data) => {
  return _.map(data, (val) => {
    return {
      _id: val.rackID,
      exadata: val.hostname,
      kvmhost: getHostype(val, 'KVM_HOST'),
      kvmOpenRows: [],
      ibswitch: getHostype(val, 'IB_SWITCH'),
      storagecell: getHostype(val, 'STORAGE_CELL'),
      stoOpenRows: [],
      dom0: getHostype(val, 'DOM0'),
      domOpenRows: [],
      baremetal: getHostype(val, 'BARE_METAL'),
      progress: {
        totalCPU: val.totalCPU,
        usedCPU: val.usedCPU,
        freeCPU: val.freeCPU,
        totalMemory: val.totalMemory,
        usedMemory: val.usedMemory,
        freeMemory: val.freeMemory,
      },
    }
  })
}

const getMachineTypes = (data) => {
  return _.map(organizeExadata(data), (val) => {
    if (val.dom0.length > 0) {
      return {
        ...val,
        machineType: 'OVM',
      }
    } else if (val.kvmhost.length > 0) {
      return {
        ...val,
        machineType: 'KVM',
      }
    } else {
      return {
        ...val,
        machineType: 'BARE METAL',
      }
    }
  })
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
