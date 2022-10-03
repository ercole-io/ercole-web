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
  async createRole({ dispatch }, payload) {
    const config = {
      method: 'post',
      url: '/roles',
      data: {
        name: payload,
      },
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getRoles')
    })
  },
  async deleteRole({ dispatch }, rolename) {
    const config = {
      method: 'delete',
      url: `/roles/${rolename}`,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getRoles')
    })
  },
}
