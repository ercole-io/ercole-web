import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  dbsLicensesUsed: [],
  hostsLicensesUsed: [],
  clustersLicensesUsed: [],
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
}

export const actions = {
  async getLicensesList({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')
    const licensesList = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-used',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    let response = await licensesList.data.usedLicenses

    if (response) {
      response = _.map(response, (val) => {
        return {
          ...val,
          ignore: false,
        }
      })
      commit('SET_LICENSE_DATABASES', response)
      dispatch('offLoadingTable')
    }
  },
  async getLicensesPerHost({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')
    const licensePerHost = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-used-per-host',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await licensePerHost.data.usedLicenses
    if (response) {
      commit('SET_LICENSES_HOST', response)
      dispatch('offLoadingTable')
    }
  },
  async getLicensesCluster({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const licensesCluster = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-used-per-cluster',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await licensesCluster.data.usedLicensesPerCluster
    if (response) {
      commit('SET_LICENSES_CLUSTER', response)
      dispatch('offLoadingTable')
    }
  },
}
