import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

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
    let cleanData = _.without(state.dbsLicensesUsed, undefined, null, '')
    return getters.filteredOrNot(cleanData)
  },
  getUsedLicensesByHost: (state, getters) => {
    let licensesByHost = []

    _.map(state.hostsLicensesUsed, (val) => {
      licensesByHost.push({
        hostname: val.hostname,
        databases: val.databaseNames.length,
        databasesNames: val.databaseNames,
        licenseTypeID: val.licenseTypeID,
        description: val.description,
        metric: val.metric,
        usedLicenses: val.usedLicenses,
        clusterLicenses: val.clusterLicenses,
        fullPartNumber: val.fullPartNumber,
      })
    })

    return getters.filteredOrNot(licensesByHost)
  },
  getUsedLicensesByCluster: (state, getters) => {
    return getters.filteredOrNot(state.clustersLicensesUsed)
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
    const licensesUsedDatabases = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-used',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    let response = await licensesUsedDatabases.data.usedLicenses
    response = _.map(response, (val) => {
      return {
        ...val,
        ignore: false,
      }
    })

    if (response) {
      commit('SET_LICENSE_DATABASES', response)
      commit('ON_LOADING_DATABASES', false)
    }
  },
  async getLicensesHosts({ commit, getters }) {
    commit('ON_LOADING_HOSTS', true)
    const licenseUsedHosts = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-used-per-host',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await licenseUsedHosts.data.usedLicenses
    if (response) {
      commit('SET_LICENSES_HOST', response)
      commit('ON_LOADING_HOSTS', false)
    }
  },
  async getLicensesClusters({ commit, getters }) {
    commit('ON_LOADING_CLUSTERS', true)
    const licensesUsedCluster = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-used-per-cluster',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await licensesUsedCluster.data.usedLicensesPerCluster
    if (response) {
      commit('SET_LICENSES_CLUSTER', response)
      commit('ON_LOADING_CLUSTERS', false)
    }
  },
}
