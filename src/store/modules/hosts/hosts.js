import _ from 'lodash'
import moment from 'moment'
import { mapClustStatus } from '@/helpers/helpers.js'
import { axiosRequest } from '@/services/services.js'
import capitalize from '@/filters/capitalize.js'

export const state = () => ({
  hosts: [],
  params: {
    hostname: null,
    environment: null,
    updated: null,
    databases: null,
    techType: null,
    os: null,
    iconCluster: '',
    kernel: null,
    kernelVersion: null,
    memorytotal: null,
    swaptotal: null,
    platform: null,
    cluster: null,
    virtNode: null,
    model: null,
    threads: null,
    cores: null,
    socket: null,
    isMissingDb: '',
    version: null,
  },
})

export const getters = {
  getAllHosts: (state) => {
    let allHosts = []
    _.map(state.hosts, (item) => {
      let time = moment(item.createdAt).format('YYYY-MM-DDTHH:mm')
      let compareTime = moment().diff(time, 'seconds')
      let fromNow = moment(time).fromNow()
      const seconds = 86400 //24h in seconds

      allHosts.push({
        _id: item.id,
        hostname: item.hostname,
        environment: item.environment,
        databases: getDatabasesNames(item.features),
        techType: getTechnologyType(item.features),
        platform: formatPlatform(item.info.hardwareAbstractionTechnology),
        cluster: setClusterNames(item.clusters),
        virtNode: item.virtualizationNode || '-',
        os: `${item.info.os} - ${item.info.osVersion}`,
        kernel: `${item.info.kernelVersion} - ${item.info.kernel}`,
        memorytotal: item.info.memoryTotal,
        swaptotal: item.info.swapTotal,
        iconCluster: mapClustStatus(item.clusterMembershipStatus)[0],
        model: item.info.cpuModel,
        threads: item.info.cpuThreads,
        cores: item.info.cpuCores,
        socket: item.info.cpuSockets,
        version: formatVersion(item.agentVersion),
        updated: item.createdAt,
        obsolete: compareTime > seconds ? true : false,
        obsoleteDiff: `Obsolete from ${fromNow}`,
        isMissingDb: item.isMissingDb,
      })
    })

    return allHosts
  },
  getHostsParams: (state) => {
    return state.params
  },
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
  SET_HOSTS_PARAMS: (state, payload) => {
    state.params = {
      hostname: payload.hostname,
      environment: payload.environment,
      updated: payload.updated,
      databases: payload.databases,
      techType: payload.techType,
      os: payload.os,
      iconCluster: payload.iconCluster,
      kernel: payload.kernel,
      kernelVersion: payload.kernelVersion,
      memorytotal: payload.memorytotal,
      swaptotal: payload.swaptotal,
      platform: payload.platform,
      cluster: payload.cluster,
      virtNode: payload.virtNode,
      model: payload.model,
      threads: payload.threads,
      cores: payload.cores,
      socket: payload.socket,
      isMissingDb: payload.isMissingDb,
      version: payload.version,
    }
  },
}

export const actions = {
  async getHosts({ commit, getters, dispatch }, olderThan = null) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts',
      params: {
        hostname: getters.getHostsParams.hostname,
        database: getters.getHostsParams.databases,
        technology: getters.getHostsParams.techType,
        clusters: getters.getHostsParams.cluster,
        'physical-host': getters.getHostsParams.physicalHost,
        'operating-system': getters.getHostsParams.os,
        kernel: getters.getHostsParams.kernel,
        'kernel-version': getters.getHostsParams.kernelVersion,
        'memory-total-lte': getters.getHostsParams.memorytotal,
        'swap-total-lte': getters.getHostsParams.swaptotal,
        'is-member-of-cluster': getters.getHostsParams.iconCluster,
        'cpu-model': getters.getHostsParams.model,
        'cpu-cores-lte': getters.getHostsParams.cores,
        'cpu-threads-lte': getters.getHostsParams.threads,
        'sort-by': getters.getSortItem,
        'sort-desc': getters.getSortOrder,
        'is-missing-db': getters.getHostsParams.isMissingDb,
        'agent-version': getters.getHostsParams.version,
        'virtualization-node': getters.getHostsParams.virtNode,
        'hardware-abstraction-technology': getters.getHostsParams.platform,
        'cpu-sockets': getters.getHostsParams.socket,
        page: getters.getPageNum - 1,
        size: getters.getPerPage,
        search: getters.getSearchTherm,
        'older-than':
          getters.getActiveFilters.date ||
          olderThan ||
          getters.getHostsParams.updated,
        environment:
          getters.getHostsParams.environment ||
          getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      let hostsData = []
      let hostsTotal = 0

      if (res.data.content && res.data.content.length > 0) {
        hostsData = res.data.content
        hostsTotal = res.data.metadata.totalElements
      }

      commit('SET_HOSTS', hostsData)
      commit('SET_TOTAL_DATA', hostsTotal)
      commit('SET_PAGE_LENGTH', hostsData.length)

      dispatch('offLoadingTable')
    })
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

const getTechnologyComplement = (technology, features) => {
  if (technology.length > 0 && Object.keys(features[technology])) {
    return Object.keys(features[technology])
  }
}

const getTechnologyType = (features) => {
  const technology = Object.keys(features)
  const complement = getTechnologyComplement(technology, features)

  if (!_.isUndefined(complement) && _.toString(complement) !== 'instances') {
    return `${capitalize(technology)}/${capitalize(complement)}`
  } else {
    if (_.isArray(technology) && technology.length > 0) {
      return capitalize(technology[0])
    } else {
      return '-'
    }
  }
}

const getDatabasesNames = (features) => {
  let databases

  if (features) {
    if (features.oracle) {
      databases = features.oracle.database.databases
    } else if (features.mysql) {
      databases = features.mysql.instances
    } else if (features.microsoft) {
      databases = features.microsoft.sqlServer.instances
    } else if (features.postgresql) {
      databases = features.postgresql.instances
    } else if (features.mongodb) {
      databases = features.mongodb.instances
    }
  }

  return setDbNames(databases)
}

const setDbNames = (dbs) => {
  let dbNames = []
  _.map(dbs, (val) => {
    dbNames.push(val.name)
  })

  return dbNames.length > 0 ? dbNames : '-'
}

const setClusterNames = (clusters) => {
  let clusterNames = []
  _.map(clusters, (val) => {
    clusterNames.push(val.name)
  })

  return clusterNames.length > 0 ? clusterNames : '-'
}
