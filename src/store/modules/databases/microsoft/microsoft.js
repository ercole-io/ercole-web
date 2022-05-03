import axiosNoLoading from '@/axios/axios-no-loading.js'

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

    const msSqlServer = await axiosNoLoading.get(
      '/hosts/technologies/microsoft/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = (await msSqlServer.data) || []
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_MS_SQL_SERVER_DBS', response)
    }
  },
}
