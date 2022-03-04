import axiosDefault from '@/axios/axios-default.js'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'
import router from '@/router'
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
  async getClusters({ commit, getters }) {
    const params = {
      'older-than': getters.getActiveFilters.date,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location,
    }

    let clustersData
    if (router.currentRoute.name === 'hypervisors') {
      clustersData = await axiosDefault.get('/hosts/clusters', {
        params: params,
      })
    } else {
      clustersData = await axiosNoLoading.get('/hosts/clusters', {
        params: params,
      })
    }

    const response = await clustersData.data
    commit('SET_CLUSTERS', response)
    commit('SET_CLUSTERNAMES', response)
  },
  async getClusterByName({ commit, getters }, clustername) {
    const clusterByName = await axiosDefault.get(
      `/hosts/clusters/${clustername}`,
      {
        params: {
          'older-than': getters.getActiveFilters.date,
        },
      }
    )

    const response = await clusterByName.data
    commit('SET_CURRENT_CLUSTER', response)
  },
}
