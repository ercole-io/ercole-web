import axiosAuth from '@/axios/axios-auth.js'
import router from '@/router/index.js'
import * as helpers from '@/helpers/helpers.js'
import moment from 'moment'
import i18n from '@/i18n.js'
import _ from 'lodash'

export const state = () => {
  return {
    isLoggedIn: !!localStorage.getItem('token'),
  }
}

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
}

export const mutations = {
  LOGIN_SUCCESS: (state) => {
    state.isLoggedIn = true
  },
  LOGOUT: (state) => {
    state.isLoggedIn = false
  },
}

export const actions = {
  login({ commit, dispatch }, auth) {
    return axiosAuth
      .post(
        '/login',
        {
          username: auth.username,
          password: auth.password,
        },
        {
          timeout: 15000,
        }
      )
      .then((res) => {
        const token = res.data
        const decodeToken = JSON.parse(atob(token.split('.')[1]))
        const username = decodeToken.sub
        const expiration = decodeToken.exp

        const payload = {
          token: token,
          username: username,
          expiration: expiration,
        }

        commit('LOGIN_SUCCESS')
        helpers.setLocalStorageAuth(payload)
        dispatch('setErrMsg', null)
        dispatch('getHosts')
        dispatch('getClusters')
      })
      .then(() => {
        const historyPage = localStorage.getItem('historyPage')
        if (!historyPage) {
          router.replace('/dashboard')
        } else {
          router.replace(`${historyPage}`)
        }

        dispatch('offLoading')
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED' && err.message !== 'Unauthorized') {
          dispatch('setErrMsg', i18n.t(`common.validations.loginTimeout`))
        } else if (_.includes(err, '401')) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginUnauthorized`))
        } else if (_.includes(err, '422')) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginErr422`))
        } else if (_.includes(err, '500')) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginErr500`))
        } else {
          dispatch('setErrMsg', i18n.t(`common.validations.loginErrGeneric`))
        }

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
    commit('SET_DEFAULT_COLS')
    commit('SET_OCI_ACTIVE_PROFILE', [])
    helpers.clearLocalStorageAuth()
    router.push('/login')
  },
}
