import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { returnTechTypePrettyName } from '@/helpers/helpers.js'

export const state = () => ({
  clusters: [],
  currentCluster: {},
  currentClusterVms: [],
})

export const getters = {
  getHypervisors: (state, getters) => {
    return getters.filteredOrNot(state.clusters)
  },
  getCurrentCluster: (state) => {
    return state.currentCluster
  },
  getCurrentClusterVms: (state, getters) => {
    return getters.filteredOrNot(state.currentClusterVms)
  },
  getErcoleClusterCount: (state) => {
    const ercoleClusterCount = {
      withErcole: 0,
      withoutErcole: 0,
    }
    _.map(state.clusters, (item) => {
      const { vmsErcoleAgentCount } = item
      if (vmsErcoleAgentCount > 0) {
        ercoleClusterCount.withErcole += 1
      } else {
        ercoleClusterCount.withoutErcole += 1
      }
    })
    return ercoleClusterCount
  },
  getClusterChartData: (state) => {
    const allVms = state.currentCluster.virtualizationNodesStats
    const withErcole = []
    const withoutErcole = []
    const finalData = []

    _.map(allVms, (item) => {
      withErcole.push([
        item.virtualizationNode,
        item.totalVMsWithErcoleAgentCount,
      ])
      withoutErcole.push([
        item.virtualizationNode,
        item.totalVMsWithoutErcoleAgentCount,
      ])
    })

    finalData.push(
      {
        name: 'With Ercole',
        data: withErcole,
      },
      {
        name: 'Without Ercole',
        data: withoutErcole,
      }
    )
    return finalData
  },
  getVirtualizationChartData: (state, getters) => {
    const data = _.groupBy(state.clusters, 'type')
    const finalData = []
    const colors = []

    _.map(data, (value, key) => {
      _.find(getters.getAllTechnologies, (prod) => {
        if (prod.prettyName === key) {
          finalData.push({
            name: prod.prettyName,
            data: [['', value.length]],
          })
          colors.push(prod.color)
        }
      })
    })

    return { finalData, colors }
  },
}

export const mutations = {
  SET_CLUSTERS: (state, payload) => {
    const clusters = []
    _.map(payload, (val) => {
      clusters.push({
        ...val,
        type: returnTechTypePrettyName(val.type),
      })
    })
    state.clusters = clusters
  },
  SET_CURRENT_CLUSTER: (state, payload) => {
    state.currentCluster = payload
    state.currentClusterVms = payload.vms
  },
}

export const actions = {
  async getClusters({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const params = {
      'older-than': getters.getActiveFilters.date,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location,
    }

    const clustersData = await axiosNoLoading.get('/hosts/clusters', {
      params: params,
    })

    const response = await clustersData.data
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_CLUSTERS', response)
    }
  },
  async getClusterByName({ commit, dispatch, getters }, clustername) {
    dispatch('onLoadingTable')

    const clusterByName = await axiosNoLoading.get(
      `/hosts/clusters/${clustername}`,
      {
        params: {
          'older-than': getters.getActiveFilters.date,
        },
      }
    )

    const response = await clusterByName.data
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_CURRENT_CLUSTER', response)
    }
  },
}
