import _ from 'lodash'
import moment from 'moment'
import { mapClustStatus } from '@/helpers/helpers.js'
import { axiosRequest } from '@/services/services.js'
import capitalize from '@/filters/capitalize.js'

export const state = () => ({
  hosts: [],
})

export const getters = {
  getAllHosts: (state) => {
    let allHosts = []
    _.map(state.hosts, (item) => {
      let time = moment(item.Host.createdAt).format('YYYY-MM-DDTHH:mm')
      let compareTime = moment().diff(time, 'seconds')
      let fromNow = moment(time).fromNow()
      const seconds = 86400 //24h in seconds

      allHosts.push({
        _id: item.Host.id,
        hostname: item.Host.hostname,
        environment: item.Host.environment,
        databases: getDatabasesNames(item.Host.features),
        techType: getTechnologyType(item.Host.features),
        platform: formatPlatform(item.Host.info.hardwareAbstractionTechnology),
        cluster: item.Host.clusters || '-',
        virtNode: item.Host.virtualizationNode || '-',
        os: `${item.Host.info.os} - ${item.Host.info.osVersion}`,
        kernel: `${item.Host.info.kernelVersion} - ${item.Host.info.kernel}`,
        memorytotal: item.Host.info.memoryTotal,
        swaptotal: item.Host.info.swapTotal,
        iconCluster: mapClustStatus(item.Host.clusterMembershipStatus)[0],
        model: item.Host.info.cpuModel,
        threads: item.Host.info.cpuThreads,
        cores: item.Host.info.cpuCores,
        socket: item.Host.info.cpuSockets,
        version: formatVersion(item.Host.agentVersion),
        updated: item.Host.createdAt,
        obsolete: compareTime > seconds ? true : false,
        obsoleteDiff: `Obsolete from ${fromNow}`,
        IsMissingDB: item.IsMissingDB,
      })
    })

    return allHosts
  },
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
}

export const actions = {
  async getHosts({ commit, getters, dispatch }, olderThan = null) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts',
      params: {
        'sort-by': getters.getSortItem,
        'sort-desc': getters.getSortOrder,
        page: getters.getPageNum,
        size: getters.getPerPage,
        search: getters.getSearchTherm,
        'older-than': getters.getActiveFilters.date || olderThan,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      let hostsData = []
      let hostsTotal = 0

      if (res.data.items && res.data.items.length > 0) {
        hostsData = res.data.items
        hostsTotal = res.data.count
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
