import _ from 'lodash'

export const state = () => ({
  ociActiveProfile: [],
  ociActiveProfileError: ''
})

export const getters = {
  getOciActiveProfiles: (state, getters) => {
    const activeProfiles = state.ociActiveProfile

    _.map(activeProfiles, (id, index) => {
      if (!_.includes(_.map(getters.getOciProfiles, 'id'), id)) {
        activeProfiles.splice(index, 1)
      }
    })

    return activeProfiles
  },
  getOciActiveProfileError: state => {
    const errNumber = _.slice(state.ociActiveProfileError)[0]
    return errNumber ? errNumber : ''
  }
}

export const mutations = {
  SET_OCI_ACTIVE_PROFILE: (state, payload) => {
    state.ociActiveProfile = payload
  },
  SET_OCI_ACTIVE_PROFILE_ERROR: (state, payload) => {
    state.ociActiveProfileError = payload
  }
}
