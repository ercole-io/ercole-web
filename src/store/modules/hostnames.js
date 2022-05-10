import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  hostnames: [],
})

export const getters = {
  getHostnames: (state) => {
    return state.hostnames
  },
  // checkHostnameExists: (state) => (hostname) => {
  //   let result = _.some(state.hostnames, (name) => {
  //     return name === hostname
  //   })
  //   return result
  // },
}

export const mutations = {
  SET_HOSTNAMES: (state, payload) => {
    state.hostnames = _.map(payload, (host) => {
      return host.hostname
    })
  },
}

export const actions = {
  async getHostNames({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts?mode=summary',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_HOSTNAMES', res.data.hosts)
    })
  },
}
