import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  groups: [],
})

export const getters = {
  showGroups: (state) => {
    return state.groups
  },
}

export const mutations = {
  SET_GROUPS: (state, payload) => {
    state.groups = payload
  },
}

export const actions = {
  async getGroups({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/groups',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_GROUPS', res.data.groups)
      dispatch('offLoadingTable')
    })
  },
  async createGroup({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: '/groups',
      data: payload,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getGroups')
    })
  },
  async updateGroup({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'put',
      url: `/groups/${payload.groupname}`,
      data: payload.data,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getGroups')
    })
  },
  async deleteGroup({ dispatch }, groupname) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `/groups/${groupname}`,
    }

    await axiosRequest('baseApi', config)
      .then(() => {
        dispatch('getGroups')
      })
      .catch((err) => {
        dispatch('offLoadingTable')
        throw err.data
      })
  },
}
