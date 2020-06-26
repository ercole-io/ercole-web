import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  hosts: null,
  currentHost: null
})

export const getters = {
  getAllHosts: state => {
    return state.hosts
  },
  getCurrentHost: state => {
    return state.currentHost
  }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload
  }
}

export const actions = {
  async getHosts({ commit }) {
    const hostsData = await axiosDefault.get('/hosts')
    const response = await hostsData.data
    commit('SET_HOSTS', response)
  },
  async getHostByName({ commit }, hostname) {
    const hostByName = await axiosDefault.get(`/hosts/${hostname}`)
    const response = await hostByName.data
    commit('SET_CURRENT_HOST', response)
  }
}
