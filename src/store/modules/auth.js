import axiosAuth from '../../axios/axios-auth.js'
import router from '../../router/index.js'
import * as helpers from '../../helpers/helpers.js'

export const state = () => {
  return {
    token: null
  }
}

export const getters = {
  isAuth: state => state.token !== null
}

export const mutations = {
  AUTH_USER: (state, token) => {
    state.token = token
  },
  CLEAR_AUTH: state => {
    state.token = null
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

        commit('AUTH_USER', payload.token)
        helpers.setLocalStorageAuth(payload)
        router.replace('/dashboard')
      })
      .then(() => {
        dispatch('setErrMsg', null)
        dispatch('offLoading')
      })
      .catch(err => {
        const errorMessage = err.response.data.ErrorDescription
        dispatch('setErrMsg', errorMessage)
        dispatch('offLoading')
      })
  },
  logout({ commit }) {
    commit('CLEAR_AUTH')
    helpers.clearLocalStorageAuth()
    router.replace('/login')
  }
}
