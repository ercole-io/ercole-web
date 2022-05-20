import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  dbGrants: [],
})

export const getters = {
  getOracleDbGrants: (state, getters) => {
    return getters.filteredOrNot(state.dbGrants)
  },
}

export const mutations = {
  SET_DB_GRANTS: (state, payload) => {
    state.dbGrants = payload
  },
}

export const actions = {
  async getDbGrants({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/grant-dba',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_DB_GRANTS', res.data)
      dispatch('offLoadingTable')
    })
  },
}
