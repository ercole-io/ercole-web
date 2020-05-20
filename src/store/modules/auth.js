import axiosAuth from '../../axios/axios-auth.js'
import router from '../../router/index.js'
import * as helpers from '../../helpers/helpers.js'

export const state = () => {
  return {
    tokenId: null
  }
}

export const getters = {
  isAuth: state => state.tokenId !== null
}

export const mutations = {
  AUTH_USER: (state, payload) => {
    state.tokenId = payload.tokenId
  },
  CLEAR_AUTH: state => {
    state.tokenId = null
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
        commit('AUTH_USER', {
          tokenId: token
        })
        helpers.setLocalStorageAuth(token)
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
