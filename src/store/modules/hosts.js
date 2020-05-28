import axiosDefault from '../../axios/axios-default'
import router from '../../router/index.js'

export const state = () => ({
  hosts: null,
  hostByName: null
})

export const getters = {
  getAllHosts: state => {
    return state.hosts
  },
  getHostName: state => {
    return state.hostByName
  }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
  SET_HOST_ID: (state, payload) => {
    state.hostByName = payload
  }
}

export const actions = {
  getHosts({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      axiosDefault
        .get('/hosts')
        .then(res => {
          resolve(res)
          commit('SET_HOSTS', res.data)
        })
        .then(() => {
          dispatch('offLoading')
        })
        .catch(err => {
          reject(err)
          dispatch('offLoading')
          if (err.response.status === 401) {
            router.replace('/login')
          }
        })
    })
  },
  getHostByName({ commit, dispatch }, hostname) {
    return new Promise((resolve, reject) => {
      axiosDefault
        .get(`/hosts/${hostname}`)
        .then(res => {
          commit('SET_HOST_ID', res.data)
          resolve(res)
        })
        .then(() => {
          dispatch('offLoading')
        })
        .catch(err => {
          reject(err)
          dispatch('offLoading')
          if (err.response.status === 401) {
            dispatch('logout')
          }
        })
    })
  }
}
