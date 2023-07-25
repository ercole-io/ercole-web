import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

const url = 'exadata'

export const state = () => ({
  exadata: {},
})

export const getters = {
  getExadata: (state) => (searchTherm) => {
    const exadata = getMachineTypes(state.exadata)

    if (searchTherm === '') {
      return exadata
    }

    const search = _.filter(exadata, (data) => {
      return (
        _.includes(_.lowerCase(data.hostname), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(data.machineType), _.lowerCase(searchTherm)) ||
        _.includes(_.lowerCase(data._id), _.lowerCase(searchTherm)) ||
        searchChilds(data, 'kvmhost', searchTherm) ||
        searchChilds(data, 'dom0', searchTherm) ||
        searchChilds(data, 'ibswitch', searchTherm) ||
        searchChilds(data, 'storagecell', searchTherm)
      )
    })

    return search
  },
}

export const mutations = {
  SET_EXADATA: (state, payload) => {
    state.exadata = payload.exadata
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
        commit('SET_EXADATA', {
          exadata: allData[0].data,
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
      hostname: val.hostname,
      kvmhost: getHostype(val, 'KVM_HOST'),
      ibswitch: getHostype(val, 'IB_SWITCH'),
      storagecell: getHostype(val, 'STORAGE_CELL'),
      dom0: getHostype(val, 'DOM0'),
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

const searchChilds = (data, item, therm) => {
  return data[item].filter((i) => {
    let val = i

    if (item === 'storagecell') {
      val = _.unset(i, ['gridDisks', 'databases'])
    }

    const resultSearch = _.includes(
      _.lowerCase(JSON.stringify(val)),
      _.lowerCase(_.toString(therm))
    )

    return resultSearch
  }).length
}
