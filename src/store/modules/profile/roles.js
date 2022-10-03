// import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  roles: [],
})

export const getters = {
  showRoles: (state) => {
    return state.roles
  },
}

export const mutations = {
  SET_ROLES: (state, payload) => {
    state.roles = payload
  },
}

export const actions = {
  async getRoles({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/roles',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_ROLES', res.data.roles)
      dispatch('offLoadingTable')
    })
  },
  async createRoles({ commit, dispatch }) {},
  async updateRoles({ commit, dispatch }) {},
  async deleteRoles({ commit, dispatch }) {},
}
