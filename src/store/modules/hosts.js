import axiosDefault from '../../axios/axios-default'
import * as errorHandler from '../../helpers/errorHandler.js'

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
    return new Promise((resolve, reject) => {
      axiosDefault
        .get('/hosts')
        .then(res => {
          resolve(res)
          commit('SET_HOSTS', res.data)
        })
        .catch(err => {
          reject(err)
          errorHandler(err)
        })
    })
  },
  getHostByName({ commit }, hostname) {
    return new Promise((resolve, reject) => {
      axiosDefault
        .get(`/hosts/${hostname}`)
        .then(res => {
          commit('SET_CURRENT_HOST', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
          errorHandler(err.response.status)
        })
    })
  }
}
