import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  postgreSql: [],
})

export const getters = {
  getAllPostgreSqlDbs: (state, getters) => {
    return getters.filteredOrNot(state.postgreSql)
  },
}

export const mutations = {
  SET_POSTGRE_SQL_DBS: (state, payload) => {
    state.postgreSql = payload
  },
}

export const actions = {
  async getPostgreSqlDbs({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/postgresql/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_POSTGRE_SQL_DBS', res.data)
    })
  },
}
