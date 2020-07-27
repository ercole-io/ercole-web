import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  clusters: null
})

export const getters = {
  getErcoleClusterCount: state => {
    const ercoleClusterCount = {
      withErcole: 0,
      withoutErcole: 0
    }
    _.map(state.clusters, item => {
      const { vmsErcoleAgentCount } = item
      if (vmsErcoleAgentCount > 0) {
        ercoleClusterCount.withErcole += 1
      } else {
        ercoleClusterCount.withoutErcole += 1
      }
    })
    return ercoleClusterCount
  }
}

export const mutations = {
  SET_CLUSTERS: (state, payload) => {
    state.clusters = payload
  }
}

export const actions = {
  async getClusters({ commit }) {
    const clustersData = await axiosDefault.get('/hosts/clusters')
    const response = await clustersData.data
    commit('SET_CLUSTERS', response)
  }
}
