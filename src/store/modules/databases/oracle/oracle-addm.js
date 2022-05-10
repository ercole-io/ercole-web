import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  addms: [],
})

export const getters = {
  getOracleAddms: (state, getters) => {
    return getters.filteredOrNot(state.addms)
  },
}

export const mutations = {
  SET_ADDMS: (state, payload) => {
    state.addms = payload
  },
}

export const actions = {
  async getAddms({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/addms',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_ADDMS', res.data)
    })
  },
}
