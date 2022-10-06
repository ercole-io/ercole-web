import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  users: [],
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
}

export const mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload
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
}
