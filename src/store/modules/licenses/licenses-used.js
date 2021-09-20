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
    let cleanData = _.without(state.hostsLicensesUsed, undefined, null, '')
    const finalData = []

    cleanData = _.groupBy(cleanData, 'licenseTypeID')
    _.forEach(cleanData, (typeVal, typeIndex) => {
      let groupByHost = _.groupBy(typeVal, 'hostname')
      _.forEach(groupByHost, (hostVal, hostIndex) => {
        let DBs = []
        let usedLicenses = null

        _.forEach(hostVal, val => {
          if (val.hostname === hostIndex && val.licenseTypeID === typeIndex) {
            DBs.push({ dbName: val.dbName })
            usedLicenses = val.usedLicenses
          }
        })

        finalData.push({
          dbsQty: DBs.length,
          databases: DBs,
          licenseTypeID: typeIndex,
          description: getters.returnMetricAndDescription(typeIndex)
            .description,
          metric: getters.returnMetricAndDescription(typeIndex).metric,
          hostname: hostIndex,
          usedLicenses: usedLicenses
        })
        DBs = []
      })
    })
    return getters.filteredOrNot(finalData)
  },
  getUsedLicensesByCluster: (state, getters) => {
    return getters.filteredOrNot(state.clustersLicensesUsed)
  }
}

export const mutations = {
  SET_LICENSE_LIST: (state, payload) => {
    state.dbsLicensesUsed = payload
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

    let setLicensesInfo = _.map(response, val => {
      return {
        ...val,
        description: getters.returnMetricAndDescription(val.licenseTypeID)
          .description,
        metric: getters.returnMetricAndDescription(val.licenseTypeID).metric
      }
    })

    commit('SET_LICENSE_LIST', setLicensesInfo)
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
