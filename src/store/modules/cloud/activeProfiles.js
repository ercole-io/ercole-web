export const state = () => ({
  ociActiveProfile: [],
  ociActiveProfileErrors: '',
  ociActiveProfileGeneralErrors: [],
})

export const getters = {
  getOciActiveProfiles: (state) => {
    return state.ociActiveProfile
  },
  getOciActiveProfileErrors: (state) => {
    return state.ociActiveProfileErrors
  },
  getOciActiveProfileGeneralErrors: (state) => {
    return state.ociActiveProfileGeneralErrors
  },
}

export const mutations = {
  SET_OCI_ACTIVE_PROFILE: (state, payload) => {
    state.ociActiveProfile = payload
  },
  SET_OCI_ACTIVE_PROFILE_ERRORS: (state, payload) => {
    state.ociActiveProfileErrors = payload
  },
  SET_OCI_ACTIVE_PROFILE_GENERAL_ERRORS: (state, payload) => {
    state.ociActiveProfileGeneralErrors = payload
  },
}
