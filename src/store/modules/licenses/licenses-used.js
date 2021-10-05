import _ from 'lodash'
import axiosDefault from '@/axios/axios-default.js'
import licUsedCluster from '@/components/licenses/used/clusters/licensesUsed_cluster.json'

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
    state.dbsLicensesUsed = payload
  },
  SET_LICENSES_HOST: (state, payload) => {
    state.hostsLicensesUsed = payload
  },
  SET_LICENSES_CLUSTER: (state, payload) => {
    state.clustersLicensesUsed = payload
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

    let licensesPerDatabase = _.map(response, val => {
      return {
        ...val,
        description: getters.returnMetricAndDescription(val.licenseTypeID)
          .description,
        metric: getters.returnMetricAndDescription(val.licenseTypeID).metric
      }
    })

    commit('SET_LICENSE_DATABASES', licensesPerDatabase)
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
  async getLicensesCluster({ commit }) {
    // const licensesCluster = await axiosDefault.get(
    //   '/hosts/technologies/all/databases/licenses-used-per-cluster',
    //   {
    //     params: {
    //       'older-than': getters.getActiveFilters.date,
    //       environment: getters.getActiveFilters.environment,
    //       location: getters.getActiveFilters.location
    //     }
    //   }
    // )
    // const response = await licensesCluster.data

    const response = licUsedCluster

    commit('SET_LICENSES_CLUSTER', response)
  }
}
