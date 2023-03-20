import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import router from '@/router/index.js'
import * as helpers from '@/helpers/helpers.js'
import i18n from '@/i18n.js'
import { bus } from '@/helpers/eventBus.js'
import qs from 'qs'

export const state = () => {
  return {
    isLoggedIn: !!localStorage.getItem('token'),
    isAdmin: false,
    provider: '',
    userRole: '',
    sso_visible: false,
    username: '',
  }
}

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  isAdmin: (state) => state.isAdmin,
  getUsername: (state) => state.username,
  getProvider: (state) => state.provider,
  getUserRole: (state) => state.userRole,
  apiPrefix: (state) => {
    if (state.provider === 'ldap') {
      return '/ldap/'
    } else {
      return '/'
    }
  },
}

export const mutations = {
  LOGIN_SUCCESS: (state) => {
    state.isLoggedIn = true
  },
  LOGOUT: (state) => {
    state.isLoggedIn = false
  },
  SET_ADMIN: (state, payload) => {
    state.isAdmin = payload
  },
  SET_USERNAME: (state, payload) => {
    state.username = payload
  },
  SET_PROVIDER: (state, payload) => {
    state.provider = payload
  },
  SET_USER_ROLE: (state, payload) => {
    state.userRole = payload
  },
  SET_SSO_VISIBILITY: (state, payload) => {
    state.sso_visible = payload
  },
}

export const actions = {
  async login({ commit, dispatch }, loginData) {
    const basicUrl = '/user/login'
    const ldapUrl = '/ldap/login'

    const provider = loginData.type === 'Basic Auth' ? 'basic' : 'ldap'

    const config = {
      method: 'post',
      url: loginData.type === 'LDAP' ? ldapUrl : basicUrl,
      data: {
        username: loginData.credentials.username,
        password: loginData.credentials.password,
      },
      timeout: 15000,
    }

    await axiosRequest('login', config, false)
      .then((res) => {
        const limited = _.includes(res.data.allowedUser.groups, 'limited')
        if (limited) {
          bus.$emit('isLimited')
          const admin = _.includes(res.data.allowedUser.groups, 'admin')
          commit('SET_ADMIN', admin)
          const token = res.data.token
          localStorage.setItem('token', token)
          return
        } else {
          return res
        }
      })
      .then((res) => {
        const token = res.data.token
        const decodeToken = JSON.parse(atob(token.split('.')[1]))
        const expiration = decodeToken.exp

        const payload = {
          token: token,
          expiration: expiration,
        }

        commit('SET_PROVIDER', provider)
        commit('LOGIN_SUCCESS')
        helpers.setLocalStorageAuth(payload)
      })
      .then(() => {
        dispatch('getUsersInfo')
      })
      .then(() => {
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
          dispatch('requestDynamicMenu')
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
  async loginSSO({ commit, dispatch }, data) {
    const basicAuth = btoa(`${data.sso.client_id}:${data.sso.client_id_secret}`)

    const config = {
      method: 'post',
      url: data.sso.token_url,
      data: qs.stringify({
        grant_type: data.sso.grant_type,
        code: data.auth_code,
        client_id: data.sso.client_id,
        redirect_uri: data.sso.redirect_uri,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
    }

    await axios(config)
      .then((res) => {
        const token = res.data.access_token
        const decodeToken = JSON.parse(atob(token.split('.')[1]))
        const expiration = decodeToken.exp

        const payload = {
          token: token,
          expiration: expiration,
        }

        commit('SET_PROVIDER', 'sso')
        commit('LOGIN_SUCCESS')
        helpers.setLocalStorageAuth(payload)
      })
      .then(() => {
        dispatch('getUsersInfo')
      })
      .then(() => {
        router.push('/dashboard')
      })
      .catch((err) => {
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
        router.push('/login')
      })
  },
  async getUsersInfo({ commit }) {
    const config = {
      method: 'get',
      url: 'users/info',
    }

    await axiosRequest('baseApi', config).then((res) => {
      const username = res.data.username
      const admin = _.includes(res.data.groups, 'admin')
      const userRole = res.data.groups[0]

      commit('SET_ADMIN', admin)
      commit('SET_USERNAME', username)
      commit('SET_USER_ROLE', userRole)
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
    if (JSON.parse(localStorage.getItem('sso')).signoff_url !== '') {
      dispatch('logoutSSO')
    }

    commit('SET_ACTIVE_FILTERS', {
      active: {
        location: null,
        environment: null,
        date: null,
      },
      status: false,
    })
    commit('SET_DEFAULT_COLS')
    commit('LOGOUT')
    helpers.clearLocalStorageAuth()
    router.push('/login')
  },
  logoutSSO() {
    const signoffUrl = JSON.parse(localStorage.getItem('sso')).signoff_url
    window.open(`${signoffUrl}`, '_blank')
  },
}
