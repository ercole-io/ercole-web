import { axiosRequest } from '@/services/services.js'

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
  async getMysqlDbs({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/mysql/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_MYSQL_DBS', res.data.databases)
    })
  },
}
