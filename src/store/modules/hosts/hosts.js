import axiosDefault from '@/axios/axios-default'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'
import { mapClustStatus } from '@/helpers/helpers.js'
import router from '@/router'

export const state = () => ({
  hosts: [],
})

export const getters = {
  getAllHosts: (state, getters) => {
    let allHosts = []
    _.map(state.hosts, (host) => {
      allHosts.push({
        _id: host._id,
        hostname: host.hostname,
        environment: host.environment,
        databases: _.split(Object.values(host.databases), ','),
        techType: Object.keys(host.databases),
        platform: formatPlatform(host.info.hardwareAbstractionTechnology),
        cluster: host.cluster,
        virtNode: host.virtualizationNode,
        os: `${host.info.os} - ${host.info.osVersion}`,
        kernel: `${host.info.kernelVersion} - ${host.info.kernel}`,
        memorytotal: host.info.memoryTotal,
        swaptotal: host.info.swapTotal,
        iconCluster: mapClustStatus(host.clusterMembershipStatus)[0],
        model: host.info.cpuModel,
        threads: host.info.cpuThreads,
        cores: host.info.cpuCores,
        socket: host.info.cpuSockets,
        version: formatVersion(host.agentVersion),
        updated: host.createdAt,
      })
    })

    return getters.filteredOrNot(allHosts)
  },
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
}

export const actions = {
  async getHosts({ commit, getters }, olderThan = null) {
    const params = {
      'older-than': getters.getActiveFilters.date || olderThan,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location,
    }

    let hostsData
    if (router.currentRoute.name === 'hosts') {
      hostsData = await axiosDefault.get('/hosts?mode=summary', {
        params: params,
      })
    } else {
      hostsData = await axiosNoLoading.get('/hosts?mode=summary', {
        params: params,
      })
    }

    const response = await hostsData.data.hosts
    commit('SET_HOSTS', response)
    commit('SET_HOSTNAMES', response)
  },
}

const formatPlatform = (platform) => {
  if (platform === 'PH') {
    platform = 'Bare Metal'
  }
  return platform
}

const formatVersion = (agentVersion) => {
  if (agentVersion) {
    let version = _.split(agentVersion, '.')
    if (version.length > 2 && version[1].length === 1) {
      version[1] = `0${version[1]}`
    }
    version = _.join(version, '.')
    return version
  } else {
    return agentVersion
  }
}
