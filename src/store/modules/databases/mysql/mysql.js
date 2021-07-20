import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  mysqlDbs: []
})

export const getters = {
  getAllMysqlDbs: (state, getters) => {
    return getters.filteredOrNot(state.mysqlDbs)
  }
}

export const mutations = {
  SET_MYSQL_DBS: (state, payload) => {
    state.mysqlDbs = payload
  }
}

export const actions = {
  async getMysqlDbs({ commit, getters }) {
    const mysqlDbs = await axiosDefault.get(
      '/hosts/technologies/mysql/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = (await mysqlDbs.data.databases) || []
    commit('SET_MYSQL_DBS', response)
  }
}
