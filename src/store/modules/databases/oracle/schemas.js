import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  schemas: [],
})

export const getters = {
  getOracleSchemas: (state, getters) => {
    return getters.filteredOrNot(state.schemas)
  },
}

export const mutations = {
  SET_SCHEMAS: (state, payload) => {
    state.schemas = payload
  },
}

export const actions = {
  async getSchemas({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/schemas',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_SCHEMAS', res.data)
    })
  },
}
