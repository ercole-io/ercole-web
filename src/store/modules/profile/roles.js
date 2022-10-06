import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  roles: [],
})

export const getters = {
  showRoles: (state) => {
    const roles = []
    _.map(state.roles, (role) => {
      roles.push({
        name: role.name,
        description: `Description for ${role.name} with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      })
    })
    return roles
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
}
