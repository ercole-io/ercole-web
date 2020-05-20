import axiosAuth from '../../axios/axios-auth.js'
import router from '../../router/index.js'
import * as helpers from '../../helpers/helpers.js'

export const state = () => {
  return {
    tokenId: null,
    errMesg: null
  }
}

export const getters = {
  isAuth: state => state.tokenId !== null,
  getErrMsg: state => state.errMesg
}

export const mutations = {
  AUTH_USER: (state, payload) => {
    state.tokenId = payload.tokenId
  },
  CLEAR_AUTH: state => {
    state.tokenId = null
  },
  SET_ERR_MSG: (state, payload) => {
    state.errMesg = payload
  }
}

export const actions = {
  login({ commit }, auth) {
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
        commit('SET_ERR_MSG', null)
      })
      .catch(err => {
        const errorMessage = err.response.data.ErrorDescription
        commit('SET_ERR_MSG', errorMessage)
      })
  },
  logout({ commit }) {
    commit('CLEAR_AUTH')
    helpers.clearLocalStorageAuth()
    router.replace('/login')
  }
}
