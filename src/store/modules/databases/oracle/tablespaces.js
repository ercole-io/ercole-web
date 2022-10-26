import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  tablespaces: [],
})

export const getters = {
  getOracleTablespaces: (state, getters) => {
    return getters.filteredOrNot(state.tablespaces)
  },
}

export const mutations = {
  SET_TABLESPACES: (state, payload) => {
    state.tablespaces = payload
  },
}

export const actions = {
  async getTablespaces({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/tablespaces',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_TABLESPACES', res.data)
    })
  },
}
