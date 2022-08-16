import { axiosRequest } from '@/services/services.js'
import router from '@/router/index.js'
import * as helpers from '@/helpers/helpers.js'
import i18n from '@/i18n.js'

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
  async login({ commit, dispatch }, auth) {
    const config = {
      method: 'post',
      url: '/user/login',
      data: {
        username: auth.username,
        password: auth.password,
      },
      timeout: 15000,
    }

    await axiosRequest('login', config, false)
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
        dispatch('offLoading')
        if (err && !err.response) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginTimeout`))
        } else if (err.response && err.response.status === 401) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginUnauthorized`))
        } else if (err.response && err.response.status === 422) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginErr422`))
        } else if (err.response && err.response.status === 500) {
          dispatch('setErrMsg', i18n.t(`common.validations.loginErr500`))
        } else {
          dispatch('setErrMsg', i18n.t(`common.validations.loginErrGeneric`))
        }
      })
  },
  // tryAutoLogin({ commit }) {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     commit('LOGOUT')
  //   }

  //   const tokenExp = localStorage.getItem('expiration')
  //   const expiration = moment(tokenExp).format()
  //   const now = moment(new Date()).format()

  //   if (now >= expiration) {
  //     commit('LOGOUT')
  //   }

  //   commit('LOGIN_SUCCESS')
  // },
  logout({ commit, dispatch }) {
    dispatch('offLoading')
    commit('LOGOUT')
    commit('SET_DEFAULT_COLS')
    helpers.clearLocalStorageAuth()
    router.push('/login')
  },
}
