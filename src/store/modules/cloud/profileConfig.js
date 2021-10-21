import _ from 'lodash'
import axiosOci from '@/axios/axios-oci'

export const state = () => ({
  ociProfiles: []
})

export const getters = {
  getOciProfiles: (state, getters) => {
    return getters.filteredOrNot(state.ociProfiles)
  }
}

export const mutations = {
  SET_OCI_PROFILE: (state, payload) => {
    state.ociProfiles = payload
  },
  CREATE_OCI_PROFILE: (state, payload) => {
    state.ociProfiles.unshift(payload)
  },
  UPDATE_OCI_PROFILE: (state, payload) => {
    const toUpdate = _.find(state.ociProfiles, val => val.id === payload.id)
    Object.assign(toUpdate, payload)
  },
  DELETE_OCI_PROFILE: (state, payload) => {
    const index = _.findIndex(state.ociProfiles, val => val.id === payload)
    state.ociProfiles.splice(index, 1)
  }
}

export const actions = {
  async getProfiles({ commit }) {
    const ociProfiles = await axiosOci.get('/oracle-cloud/configurations')
    const response = await ociProfiles.data

    commit('SET_OCI_PROFILE', response)
  },
  async createProfile({ commit }, payload) {
    const create = await axiosOci.post('/oracle-cloud/configurations', payload)
    const response = await create.data

    commit('CREATE_OCI_PROFILE', response)
  },
  async updateProfile({ commit }, payload) {
    const update = await axiosOci.put(
      `/oracle-cloud/configurations/${payload.id}`,
      payload
    )
    const response = await update.data

    commit('UPDATE_OCI_PROFILE', response)
  },
  async removeProfile({ commit }, id) {
    await axiosOci.delete(`/oracle-cloud/configurations/${id}`)

    commit('DELETE_OCI_PROFILE', id)
  }
}
