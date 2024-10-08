import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import { setFullPartNumber } from '@/helpers/helpers.js'
import { removeDashFromMsDesc } from '@/helpers/licenses.js'

const url = 'hosts/technologies/all/databases'

export const state = () => ({
  dbsLicensesUsed: [],
  hostsLicensesUsed: [],
  clustersLicensesUsed: [],
  databasesLoading: false,
  hostsLoading: false,
  clustersLoading: false,
})

export const getters = {
  getUsedLicensesByDbs: (state, getters) => {
    const cleanData = _.without(state.dbsLicensesUsed, undefined, null, '')
    const licensesByDatabases = []

    _.map(cleanData, (val) => {
      licensesByDatabases.push({
        hostname: val.hostname,
        dbName: val.dbName,
        licenseTypeID: val.licenseTypeID,
        description: removeDashFromMsDesc(val.description),
        metric: val.metric === 'HOST' ? 'Host' : val.metric,
        usedLicenses: val.usedLicenses,
        clusterLicenses: val.clusterLicenses,
        fullPartNumber: val.fullPartNumber,
        ignored: val.ignored,
        ignoredComment: val.ignoredComment,
        olvmCapped: val.olvmCapped,
      })
    })

    return getters.filteredOrNot(licensesByDatabases)
  },
  getUsedLicensesByHost: (state, getters) => {
    const cleanData = _.without(state.hostsLicensesUsed, undefined, null, '')
    const licensesByHost = []

    _.map(cleanData, (val) => {
      licensesByHost.push({
        hostname: val.hostname,
        databases: val.databaseNames.length,
        databasesNames: val.databaseNames,
        licenseTypeID: val.licenseTypeID,
        description: removeDashFromMsDesc(val.description),
        metric: val.metric === 'HOST' ? 'Host' : val.metric,
        usedLicenses: val.usedLicenses,
        clusterLicenses: val.clusterLicenses,
        fullPartNumber: val.fullPartNumber,
        olvmCapped: val.olvmCapped,
      })
    })

    return getters.filteredOrNot(licensesByHost)
  },
  getUsedLicensesByCluster: (state, getters) => {
    const cleanData = _.without(state.clustersLicensesUsed, undefined, null, '')
    const licensesByCluster = []

    _.map(cleanData, (val) => {
      licensesByCluster.push({
        ...val,
        metric: val.metric === 'HOST' ? 'Host' : val.metric,
        description: removeDashFromMsDesc(val.description),
      })
    })

    return getters.filteredOrNot(licensesByCluster)
  },
}

export const mutations = {
  SET_LICENSE_DATABASES: (state, payload) => {
    state.dbsLicensesUsed = setFullPartNumber(payload)
  },
  SET_LICENSES_HOST: (state, payload) => {
    state.hostsLicensesUsed = setFullPartNumber(payload)
  },
  SET_LICENSES_CLUSTER: (state, payload) => {
    let newPayload = _.map(payload, (val) => {
      return {
        ...val,
        hostCount: val.hostnames.length,
      }
    })

    state.clustersLicensesUsed = setFullPartNumber(newPayload)
  },
  SET_IGNORE_DB_LICENSE: (state, payload) => {
    _.map(state.dbsLicensesUsed, (val) => {
      if (
        val.dbName === payload.database &&
        val.licenseTypeID === payload.licenseID &&
        val.hostname === payload.hostname
      ) {
        val.ignored = !val.ignored
      }
    })
  },
  ON_LOADING_DATABASES: (state, payload) => {
    state.databasesLoading = payload
  },
  ON_LOADING_HOSTS: (state, payload) => {
    state.hostsLoading = payload
  },
  ON_LOADING_CLUSTERS: (state, payload) => {
    state.clustersLoading = payload
  },
}

export const actions = {
  async getLicensesDatabases({ commit, getters }) {
    commit('ON_LOADING_DATABASES', true)

    const config = {
      method: 'get',
      url: `${url}/licenses-used`,
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_LICENSE_DATABASES', res.data.usedLicenses)
      commit('ON_LOADING_DATABASES', false)
    })
  },
  async getLicensesHosts({ commit, getters }) {
    commit('ON_LOADING_HOSTS', true)

    const config = {
      method: 'get',
      url: `${url}/licenses-used-per-host`,
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_LICENSES_HOST', res.data.usedLicenses)
      commit('ON_LOADING_HOSTS', false)
    })
  },
  async getLicensesClusters({ commit, getters }) {
    commit('ON_LOADING_CLUSTERS', true)

    const config = {
      method: 'get',
      url: `${url}/licenses-used-per-cluster`,
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_LICENSES_CLUSTER', res.data.usedLicensesPerCluster)
      commit('ON_LOADING_CLUSTERS', false)
    })
  },
}
