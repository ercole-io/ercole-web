import axiosAuth from '../../axios/axios-auth.js'
import router from '../../router/index.js'
import * as helpers from '../../helpers/helpers.js'
import moment from 'moment'

export const state = () => {
  return {
    isLoggedIn: !!localStorage.getItem('token')
  }
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn
}

export const mutations = {
  LOGIN_SUCCESS: state => {
    state.isLoggedIn = true
  },
  LOGOUT: state => {
    state.isLoggedIn = false
  }
}

export const actions = {
  login({ commit, dispatch }, auth) {
    return axiosAuth
      .post('/login', {
        username: auth.username,
        password: auth.password
      })
      .then(res => {
        const token = res.data
        const decodeToken = JSON.parse(atob(token.split('.')[1]))
        const username = decodeToken.aud[0]
        const expiration = decodeToken.exp

        const payload = {
          token: token,
          username: username,
          expiration: expiration
        }

        commit('LOGIN_SUCCESS')
        helpers.setLocalStorageAuth(payload)
        dispatch('setErrMsg', null)
      })
      .then(() => {
        router.replace('/dashboard')
      })
      .catch(err => {
        const errorMessage = err.response.data.ErrorDescription
        dispatch('setErrMsg', errorMessage)
        dispatch('offLoading')
      })
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) {
      commit('LOGOUT')
    }

    const tokenExp = localStorage.getItem('expiration')
    const expiration = moment(tokenExp).format()
    const now = moment(new Date()).format()

    if (now >= expiration) {
      commit('LOGOUT')
    }

    commit('LOGIN_SUCCESS')
  },
  logout({ commit, dispatch }) {
    dispatch('offLoading')
    commit('LOGOUT')
    helpers.clearLocalStorageAuth()
    router.push('/login')
  }
}
