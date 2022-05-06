import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'

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
    const hostsData = await axiosNoLoading.get('/hosts?mode=summary')

    const response = await hostsData.data.hosts

    if (response) {
      commit('SET_HOSTNAMES', response)
    }
  },
}
