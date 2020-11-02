import axiosDefault from '@/axios/axios-default'
import _ from 'lodash'
import {
  mapDbs,
  mapTechType,
  mapClustStatus,
  filterByKeys
} from '@/helpers/helpers.js'

export const state = () => ({
  hosts: {}
})

export const getters = {
  getAllHosts: (state, getters, rootState) => {
    let allHosts = []
    _.map(state.hosts, host => {
      allHosts.push({
        _id: host._id,
        hostname: host.hostname,
        environment: host.environment,
        databases: mapDbs(host.features.oracle),
        techType: mapTechType(host.features),
        platform: host.info.hardwareAbstractionTechnology,
        cluster: host.cluster,
        virtNode: host.virtualizationNode,
        os: host.info.os,
        kernel: host.info.kernel,
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
  async getHosts({ commit, getters }) {
    const hostsData = await axiosDefault.get('/hosts', {
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location
      }
    })
    const response = await hostsData.data
    commit('SET_HOSTS', response)
    commit('SET_HOSTNAMES', response)
  }
}
