import _ from 'lodash'
import axiosOciNoLoading from '@/axios/axios-oci-no-loading.js'

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
    const ociProfiles = await axiosOciNoLoading.get(
      '/oracle-cloud/configurations'
    )
    const response = await ociProfiles.data

    if (response) {
      commit('SET_OCI_PROFILE', response)
      dispatch('offLoadingTable')
    }
  },
  async createProfile({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')
    const create = await axiosOciNoLoading.post(
      '/oracle-cloud/configurations',
      payload
    )
    const response = await create.data
    if (response) {
      commit('CREATE_OCI_PROFILE', response)
      dispatch('offLoadingTable')
    }
  },
  async updateProfile({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')
    const update = await axiosOciNoLoading.put(
      `/oracle-cloud/configurations/${payload.id}`,
      payload
    )
    const response = await update.data
    if (response) {
      commit('UPDATE_OCI_PROFILE', response)
      dispatch('offLoadingTable')
    }
  },
  async removeProfile({ commit, dispatch }, id) {
    dispatch('onLoadingTable')
    const removeProfile = await axiosOciNoLoading.delete(
      `/oracle-cloud/configurations/${id}`
    )

    const response = await removeProfile
    if (response.status === 204) {
      commit('DELETE_OCI_PROFILE', id)
      dispatch('offLoadingTable')
    }
  },
}
