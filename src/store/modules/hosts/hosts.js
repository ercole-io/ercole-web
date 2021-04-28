import axiosDefault from '@/axios/axios-default'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'
import { mapClustStatus, filterByKeys } from '@/helpers/helpers.js'
import { mapDatabases } from '@/helpers/databasesMap.js'
import router from '@/router'

export const state = () => ({
  hosts: []
})

export const getters = {
  getAllHosts: (state, getters, rootState) => {
    let allHosts = []
    _.map(state.hosts, host => {
      allHosts.push({
        _id: host._id,
        hostname: host.hostname,
        environment: host.environment,
        databases: mapDatabases(host.features, 'databases'),
        techType: mapDatabases(host.features, 'technology'),
        platform: host.info.hardwareAbstractionTechnology,
        cluster: host.cluster,
        virtNode: host.virtualizationNode,
        os: `${host.info.os} - ${host.info.osVersion}`,
        kernel: `${host.info.kernelVersion} - ${host.info.kernel}`,
        memorytotal: host.info.memoryTotal,
        swaptotal: host.info.swapTotal,
        iconCluster: mapClustStatus(host.clusterMembershipStatus),
        model: host.info.cpuModel,
        threads: host.info.cpuThreads,
        cores: host.info.cpuCores,
        socket: host.info.cpuSockets,
        version: host.agentVersion,
        updated: host.createdAt
      })
    })

    if (rootState.localFilters.hasFilters) {
      allHosts = filterByKeys(allHosts, rootState.localFilters.filters)
    } else {
      allHosts
    }

    return allHosts
  }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  }
}

export const actions = {
  async getHosts({ commit, getters }, olderThan = null) {
    const params = {
      'older-than': getters.getActiveFilters.date || olderThan,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location
    }

    let hostsData
    if (router.currentRoute.name === 'hosts') {
      hostsData = await axiosDefault.get('/hosts', {
        params: params
      })
    } else {
      hostsData = await axiosNoLoading.get('/hosts', {
        params: params
      })
    }

    const response = await hostsData.data
    commit('SET_HOSTS', response)
    commit('SET_HOSTNAMES', response)
  }
}
