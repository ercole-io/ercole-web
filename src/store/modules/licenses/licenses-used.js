import _ from 'lodash'
import axiosDefault from '@/axios/axios-default.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  dbsLicensesUsed: [],
  hostsLicensesUsed: [],
  clustersLicensesUsed: []
})

export const getters = {
  getUsedLicensesByDbs: (state, getters) => {
    const cleanData = _.without(state.dbsLicensesUsed, undefined, null, '')
    return getters.filteredOrNot(cleanData)
  },
  getUsedLicensesByHost: (state, getters) => {
    return getters.filteredOrNot(state.hostsLicensesUsed)
  },
  getUsedLicensesByCluster: (state, getters) => {
    return getters.filteredOrNot(state.clustersLicensesUsed)
  }
}

export const mutations = {
  SET_LICENSE_DATABASES: (state, payload) => {
    state.dbsLicensesUsed = setFullPartNumber(payload)
  },
  SET_LICENSES_HOST: (state, payload) => {
    state.hostsLicensesUsed = setFullPartNumber(payload)
  },
  SET_LICENSES_CLUSTER: (state, payload) => {
    let newPayload = _.map(payload, val => {
      return {
        ...val,
        hostCount: val.hostnames.length
      }
    })

    state.clustersLicensesUsed = setFullPartNumber(newPayload)
  }
}

export const actions = {
  async getLicensesList({ commit, getters }) {
    const licensesList = await axiosDefault.get(
      '/hosts/technologies/all/databases/licenses-used',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await licensesList.data.usedLicenses
    commit('SET_LICENSE_DATABASES', response)
  },
  async getLicensesPerHost({ commit, getters }) {
    const licensePerHost = await axiosDefault.get(
      '/hosts/technologies/all/databases/licenses-used-per-host',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await licensePerHost.data.usedLicenses
    commit('SET_LICENSES_HOST', response)
  },
  async getLicensesCluster({ commit, getters }) {
    const licensesCluster = await axiosDefault.get(
      '/hosts/technologies/all/databases/licenses-used-per-cluster',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await licensesCluster.data.usedLicensesPerCluster
    commit('SET_LICENSES_CLUSTER', response)
  }
}
