export const state = () => ({
  ociActiveProfile: []
})

export const getters = {
  getOciActiveProfiles: state => {
    return state.ociActiveProfile
  }
}

export const mutations = {
  SET_OCI_ACTIVE_PROFILE: (state, payload) => {
    state.ociActiveProfile = payload
  }
}
