import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

const url = '/oracle-cloud/configurations'

export const state = () => ({
  ociProfiles: [],
})

export const getters = {
  getOciProfiles: (state, getters) => {
    return getters.filteredOrNot(state.ociProfiles)
  },
}

export const mutations = {
  SET_OCI_PROFILE: (state, payload) => {
    state.ociProfiles = payload
  },
  CREATE_OCI_PROFILE: (state, payload) => {
    state.ociProfiles.unshift(payload)
  },
  UPDATE_OCI_PROFILE: (state, payload) => {
    const toUpdate = _.find(state.ociProfiles, (val) => val.id === payload.id)
    Object.assign(toUpdate, payload)
  },
  DELETE_OCI_PROFILE: (state, payload) => {
    const index = _.findIndex(state.ociProfiles, (val) => val.id === payload)
    state.ociProfiles.splice(index, 1)
  },
}

export const actions = {
  async getProfiles({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      commit('SET_OCI_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async createProfile({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: url,
      data: payload,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      commit('CREATE_OCI_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async updateProfile({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'put',
      url: `${url}/${payload.id}`,
      data: payload,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      commit('UPDATE_OCI_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async removeProfile({ commit, dispatch }, id) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `${url}/${id}`,
    }

    await axiosRequest('thunderApi', config, false).then(() => {
      commit('DELETE_OCI_PROFILE', id)
      dispatch('offLoadingTable')
    })
  },
}
