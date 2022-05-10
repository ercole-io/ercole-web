import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  msSqlServer: [],
})

export const getters = {
  getAllMsSqlServerDbs: (state, getters) => {
    return getters.filteredOrNot(state.msSqlServer)
  },
}

export const mutations = {
  SET_MS_SQL_SERVER_DBS: (state, payload) => {
    state.msSqlServer = payload
  },
}

export const actions = {
  async getMsSqlServerDbs({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/microsoft/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_MS_SQL_SERVER_DBS', res.data)
    })
  },
}
