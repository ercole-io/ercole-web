import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  listScenarios: [],
})

export const getters = {
  getListScenarios: (state) => {
    return state.listScenarios
  },
}

export const mutations = {
  SET_LIST_SCENARIOS: (state, payload) => {
    state.listScenarios = payload
  },
}

export const actions = {
  async fetchListScenarios({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'scenarios',
    }

    await axiosRequest('baseApi', config).then((res) => {
      const data = res.data

      commit('SET_LIST_SCENARIOS', data)
      dispatch('offLoadingTable')
    })

    dispatch('offLoadingTable')
  },
  deleteListScenario({ dispatch }, id) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `scenarios/${id}`,
    }

    return axiosRequest('baseApi', config)
  },
}
