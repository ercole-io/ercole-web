import _ from 'lodash'

export const state = () => ({
  ociActiveProfile: [],
  ociActiveProfileError: ''
})

export const getters = {
  getOciActiveProfiles: state => {
    // const activeProfiles = state.ociActiveProfile

    // _.map(activeProfiles, (id, index) => {
    //   const checkProfilesId = _.includes(
    //     _.map(getters.getOciProfiles, 'id'),
    //     id
    //   )

    //   if (!checkProfilesId) {
    //     activeProfiles.splice(index, 1)
    //   }
    // })

    // return activeProfiles
    return state.ociActiveProfile
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
