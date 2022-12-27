import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  partitionings: [],
})

export const getters = {
  getOraclePartitionings: (state, getters) => {
    return getters.filteredOrNot(state.partitionings)
  },
}

export const mutations = {
  SET_PARTITIONINGS: (state, payload) => {
    state.partitionings = payload
  },
}

export const actions = {
  async getPartitionings({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/partitionings',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_PARTITIONINGS', res.data)
    })
  },
}
