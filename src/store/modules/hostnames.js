import _ from 'lodash'

export const state = () => ({
  hostnames: []
})

export const getters = {
  getHostnames: state => {
    return state.hostnames
  },
  checkHostnameExists: state => hostname => {
    let result = _.some(state.hostnames, name => {
      return name === hostname
    })
    return result
  }
}

export const mutations = {
  SET_HOSTNAMES: (state, payload) => {
    state.hostnames = _.map(payload, host => {
      return host.hostname
    })
  }
}
