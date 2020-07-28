import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  clusters: {},
  currentCluster: {}
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
  },
  getClusterChartData: state => {
    const allVms = state.currentCluster.virtualizationNodesStats
    const withErcole = []
    const withoutErcole = []
    const finalData = []

    _.map(allVms, item => {
      withErcole.push([
        item.virtualizationNode,
        item.totalVMsWithErcoleAgentCount
      ])
      withoutErcole.push([
        item.virtualizationNode,
        item.totalVMsWithoutErcoleAgentCount
      ])
    })

    finalData.push(
      {
        name: 'With Ercole',
        data: withErcole
      },
      {
        name: 'Without Ercole',
        data: withoutErcole
      }
    )

    return finalData
  }
}

export const mutations = {
  SET_CLUSTERS: (state, payload) => {
    state.clusters = payload
  },
  SET_CURRENT_CLUSTER: (state, payload) => {
    state.currentCluster = payload
  }
}

export const actions = {
  async getClusters({ commit }) {
    const clustersData = await axiosDefault.get('/hosts/clusters')
    const response = await clustersData.data
    commit('SET_CLUSTERS', response)
  },
  async getClusterByName({ commit }, clustername) {
    const clusterByName = await axiosDefault.get(
      `/hosts/clusters/${clustername}`
    )
    const response = await clusterByName.data
    commit('SET_CURRENT_CLUSTER', response)
  }
}
