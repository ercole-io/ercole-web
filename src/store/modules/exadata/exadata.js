import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

const url = 'exadata'

export const state = () => ({
  exadata: {},
})

export const getters = {
  getExadata: (state) => {
    let exadata = []

    _.map(state.exadata, (val) => {
      exadata.push({
        _id: val.rackID,
        hostname: `${val.hostname} - ${val.rackID}`,
        kvmhost: getHostype(val, 'KVM_HOST'),
        ibswitch: getHostype(val, 'IB_SWITCH'),
        storagecell: getHostype(val, 'STORAGE_CELL'),
        dom0: getHostype(val, 'DOM0'),
        baremetal: getHostype(val, 'BARE_METAL'),
        progress: {
          totalCPU: val.totalCPU,
          usedCPU: val.usedCPU,
          freeCPU: val.freeCPU,
          totalMemory: val.totalMemory,
          usedMemory: val.usedMemory,
          freeMemory: val.freeMemory,
        },
      })
    })
    console.log(exadata)
    return exadata
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

const getHostype = (val, type) => {
  return _.filter(val.components, (t) => {
    return t.hostType === type
  })
}
