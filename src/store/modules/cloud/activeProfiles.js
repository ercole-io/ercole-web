import _ from 'lodash'

export const state = () => ({
  ociActiveProfile: [],
  ociActiveProfileError: '',
})

export const getters = {
  getOciActiveProfiles: (state) => {
    return state.ociActiveProfile
  },
  getOciActiveProfileError: (state) => {
    const errNumber = _.slice(state.ociActiveProfileError)[0]
    return errNumber ? errNumber : ''
  },
}

export const mutations = {
  SET_OCI_ACTIVE_PROFILE: (state, payload) => {
    state.ociActiveProfile = payload
  },
  SET_OCI_ACTIVE_PROFILE_ERROR: (state, payload) => {
    state.ociActiveProfileError = payload
  },
}
