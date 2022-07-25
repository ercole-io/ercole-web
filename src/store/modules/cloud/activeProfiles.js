export const state = () => ({
  ociActiveProfile: false,
  awsActiveProfile: false,
  cloudActiveProfileErrors: '',
  cloudActiveProfileGeneralErrors: [],
})

export const getters = {
  getCloudActiveProfiles: (state) => (tech) => {
    return state[`${tech}ActiveProfile`]
  },
  getCloudActiveProfileErrors: (state) => {
    return state.cloudActiveProfileErrors
  },
  getCloudActiveProfileGeneralErrors: (state) => {
    return state.cloudActiveProfileGeneralErrors
  },
}

export const mutations = {
  SET_CLOUD_ACTIVE_PROFILE: (state, payload) => {
    state[`${payload[1]}ActiveProfile`] = payload[0]
  },
  SET_CLOUD_ACTIVE_PROFILE_ERRORS: (state, payload) => {
    state.cloudActiveProfileErrors = payload
  },
  SET_CLOUD_ACTIVE_PROFILE_GENERAL_ERRORS: (state, payload) => {
    state.cloudActiveProfileGeneralErrors = payload
  },
}
