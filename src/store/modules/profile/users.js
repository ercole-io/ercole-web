import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  users: [],
  passwordReset: '',
})

export const getters = {
  showUsers: (state) => {
    const users = []
    _.map(state.users, (user) => {
      users.push({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        groups: user.groups && user.groups.length > 0 ? user.groups : '-',
      })
    })
    return users
  },
  showResetPassword: (state) => state.passwordReset,
}

export const mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload
  },
  SET_PASSWORD_RESET: (state, payload) => {
    state.passwordReset = payload
  },
}

export const actions = {
  async getUsers({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/users',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_USERS', res.data)
      dispatch('offLoadingTable')
    })
  },
  async createUser({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: '/users',
      data: payload,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getUsers')
    })
  },
  async updateUser({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'put',
      url: `/users/${payload.username}`,
      data: payload.data,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getUsers')
    })
  },
  async deleteUser({ dispatch }, username) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `/users/${username}`,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getUsers')
    })
  },
  async resetPassword({ commit }, username) {
    const config = {
      method: 'post',
      url: `/admin/users/${username}/reset-password`,
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_PASSWORD_RESET', res.data)
    })
  },
  async changePassword({ commit }, payload) {
    const config = {
      method: 'post',
      url: `/admin/users/${payload.username}/change-password`,
      data: payload.data,
    }

    await axiosRequest('baseApi', config).then((res) => {
      console.log(res)
    })
  },
}
