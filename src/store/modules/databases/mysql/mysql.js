import axiosNoLoading from '@/axios/axios-no-loading.js'

export const state = () => ({
  mysqlDbs: [],
})

export const getters = {
  getAllMysqlDbs: (state, getters) => {
    return getters.filteredOrNot(state.mysqlDbs)
  },
}

export const mutations = {
  SET_MYSQL_DBS: (state, payload) => {
    state.mysqlDbs = payload
  },
}

export const actions = {
  async getMysqlDbs({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const mysqlDbs = await axiosNoLoading.get(
      '/hosts/technologies/mysql/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = (await mysqlDbs.data.databases) || []
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_MYSQL_DBS', response)
    }
  },
}
