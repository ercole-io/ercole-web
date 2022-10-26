import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  isConnected: true,
})

export const getters = {
  isDbConnected: (state) => {
    return state.isConnected
  },
}

export const mutations = {
  SET_DB_CONNECTION: (state, payload) => {
    state.isConnected = payload
  },
}

export const actions = {
  async getDbConnection({ commit }) {
    const config = {
      method: 'get',
      url: 'database/connection/status',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_DB_CONNECTION', res.data.connected)
    })
  },
}
