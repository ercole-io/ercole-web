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
      url: 'admin/roles',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_ROLES', res.data.roles)
      dispatch('offLoadingTable')
    })
  },
  async createRole({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: 'admin/roles',
      data: payload,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getRoles')
    })
  },
  async updateRole({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'put',
      url: `admin/roles/${payload.rolename}`,
      data: payload.data,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getRoles')
    })
  },
  async deleteRole({ dispatch }, rolename) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `admin/roles/${rolename}`,
    }

    await axiosRequest('baseApi', config)
      .then(() => {
        dispatch('getRoles')
      })
      .catch((err) => {
        dispatch('offLoadingTable')
        throw err.data
      })
  },
}
