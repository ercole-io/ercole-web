import axios from 'axios'
import axiosNoLoading from '@/axios/axios-no-loading.js'

export const state = () => ({
  engSys: {},
  memory: 0,
  cpu: {
    running: 0,
    total: 0
  },
  storage: 0,
  patching: [
    {
      data: [
        ['6 months', 20],
        ['12 months', 15]
      ]
    }
  ]
})

export const getters = {
  getEngSys: state => {
    return state.engSys
  }
}

export const mutations = {
  SET_ENGINEERED_SYSTEMS: (state, payload) => {
    state.engSys = payload.engSys
    state.memory = payload.memory
    state.cpu = payload.cpu
    state.storage = payload.storage || 0
    // state.patching = payload.patch
  }
}

export const actions = {
  async getEngineeredSystems({ commit, getters, dispatch }, olderThan = null) {
    const url = '/hosts/technologies/oracle/exadata'
    let params = {
      'older-than': getters.getActiveFilters.date || olderThan,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location
    }

    dispatch('onLoading')

    axios
      .all([
        await axiosNoLoading.get(url, { params: params }),
        await axiosNoLoading.get(`${url}/total-memory-size`, {
          params: params
        }),
        await axiosNoLoading.get(`${url}/total-cpu`, { params: params }),
        await axiosNoLoading.get(`${url}/average-storage-usage`),
        await axiosNoLoading.get(`${url}/patch-status`, { params: params })
      ])
      .then(
        axios.spread((engSysRes, memoryRes, cpuRes, storageRes, patchRes) => {
          commit('SET_ENGINEERED_SYSTEMS', {
            engSys: engSysRes.data,
            memory: memoryRes.data,
            cpu: cpuRes.data,
            storage: storageRes.data,
            patch: patchRes.data
          })
        })
      )
      .then(() => {
        dispatch('offLoading')
      })
  }
}
