import _ from 'lodash'

export const state = () => ({
  clusternames: []
})

export const getters = {
  getClusternames: state => {
    return state.clusternames
  }
}

export const mutations = {
  SET_CLUSTERNAMES: (state, payload) => {
    state.clusternames = _.map(payload, cluster => {
      return cluster.name
    })
  }
}
