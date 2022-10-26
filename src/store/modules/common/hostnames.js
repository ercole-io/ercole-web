import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  hostnames: [],
})

export const getters = {
  getHostnames: (state) => {
    return state.hostnames
  },
}

export const mutations = {
  SET_HOSTNAMES: (state, payload) => {
    state.hostnames = payload
  },
}

export const actions = {
  async getHostNames({ commit }) {
    const config = {
      method: 'get',
      url: 'hosts?mode=hostnames',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_HOSTNAMES', res.data)
    })
  },
}
