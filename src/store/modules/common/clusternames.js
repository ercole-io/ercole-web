import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  clusternames: [],
})

export const getters = {
  getClusternames: (state) => {
    return state.clusternames
  },
}

export const mutations = {
  SET_CLUSTERNAMES: (state, payload) => {
    state.clusternames = payload
  },
}

export const actions = {
  async getClusterNames({ commit }) {
    const config = {
      method: 'get',
      url: 'hosts/clusters?mode=clusternames',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_CLUSTERNAMES', res.data)
    })
  },
}
