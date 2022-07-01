export const state = () => ({
  awsActiveProfile: false,
  awsActiveProfileErrors: '',
  awsActiveProfileGeneralErrors: [],
})

export const getters = {
  getAwsActiveProfiles: (state) => {
    return state.awsActiveProfile
  },
  getAwsActiveProfileErrors: (state) => {
    return state.awsActiveProfileErrors
  },
  getAwsActiveProfileGeneralErrors: (state) => {
    return state.awsActiveProfileGeneralErrors
  },
}

export const mutations = {
  SET_AWS_ACTIVE_PROFILE: (state, payload) => {
    state.awsActiveProfile = payload
  },
  SET_AWS_ACTIVE_PROFILE_ERRORS: (state, payload) => {
    state.awsActiveProfileErrors = payload
  },
  SET_AWS_ACTIVE_PROFILE_GENERAL_ERRORS: (state, payload) => {
    state.awsActiveProfileGeneralErrors = payload
  },
}
