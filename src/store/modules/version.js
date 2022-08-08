import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  version: '',
})

export const getters = {
  version: (state) => {
    return state.version
  },
}

export const mutations = {
  SET_VERSION: (state, payload) => {
    state.version = payload
  },
}

export const actions = {
  async getVersion({ commit }) {
    const config = {
      method: 'get',
      url: '/version',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_VERSION', res.data.version)
    })
  },
}
