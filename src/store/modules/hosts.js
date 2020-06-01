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
  getHosts({ commit }) {
    return axiosDefault.get('/hosts').then(res => {
      commit('SET_HOSTS', res.data)
    })
  },
  getHostByName({ commit }, hostname) {
    return axiosDefault.get(`/hosts/${hostname}`).then(res => {
      commit('SET_CURRENT_HOST', res.data)
    })
  }
}
