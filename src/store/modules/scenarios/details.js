import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  currentScenario: {},
  scenarioLicenses: {
    COMPLIANCE: {},
    USED_DATABASES: {},
    USED_HOSTS: {},
    USED_CLUSTERS: {},
    USED_CLUSTERS_VERITAS: {},
  },
})

const showStrokeColor = (value) =>
  value < 80 ? 'is-danger' : value < 100 ? 'is-warning' : 'is-success'

export const getters = {
  getCurrentScenario: (state) => state.currentScenario,
  getLicensesScenario: (state) => (type) => {
    const data = state.scenarioLicenses[type]
    return configData[type](data)
  },
}

export const mutations = {
  SET_SCENARIO_CURRENT: (state, payload) => {
    state.currentScenario = payload
  },
  SET_SCENARIO_LICENSES: (state, { type, payload }) => {
    state.scenarioLicenses[type] = payload
  },
}

export const actions = {
  async fetchCurrentScenario({ commit, dispatch }, id) {
    dispatch('onLoadingTable')
    const config = { method: 'get', url: `scenarios/${id}` }
    const res = await axiosRequest('baseApi', config)
    commit('SET_SCENARIO_CURRENT', res.data)
    dispatch('offLoadingTable')
  },
  async fetchScenarioLicenses({ commit, dispatch }, { type, id }) {
    const urls = {
      COMPLIANCE: `scenarios/${id}/license-compliance`,
      USED_DATABASES: `scenarios/${id}/license-used-database`,
      USED_HOSTS: `scenarios/${id}/license-used-host`,
      USED_CLUSTERS: `scenarios/${id}/license-used-cluster`,
      USED_CLUSTERS_VERITAS: `scenarios/${id}/license-used-cluster-veritas`,
    }
    dispatch('onLoadingTable')
    const config = { method: 'get', url: urls[type] }
    const res = await axiosRequest('baseApi', config)
    commit('SET_SCENARIO_LICENSES', { type, payload: res.data.licenses })
    dispatch('offLoadingTable')
  },
}

const configData = {
  COMPLIANCE: (data) =>
    _.map(data, (item) => {
      return {
        partNumber: item.actual.LicenseTypeID,
        description: item.actual.ItemDescription,
        metric: item.actual.Metric,
        available: item.actual.Available,
        availableSim: item.got.Available,
        compliance: item.actual.Compliance * 100,
        complianceStroke: showStrokeColor(item.actual.Compliance * 100),
        complianceSim: item.got.Compliance ? item.got.Compliance * 100 : 0,
        complianceSimStroke: item.got.Compliance
          ? showStrokeColor(item.got.Compliance * 100)
          : 'is-danger',
        consumed: item.actual.Consumed,
        consumedSim: item.got.Consumed,
        covered: item.actual.Covered,
        coveredSim: item.got.Covered,
        purchased: item.actual.Purchased,
        purchasedSim: item.got.Purchased,
        unlimited: item.actual.Unlimited,
        unlimitedSim: item.got.Unlimited,
      }
    }),
  USED_DATABASES: (data) =>
    _.map(data, (item) => {
      return {
        partNumber: item.actual.LicenseTypeID,
        description: item.actual.Description,
        metric: item.actual.Metric,
        hostname: item.actual.Hostname,
        dbName: item.actual.DbName,
        usedLicenses: item.actual.UsedLicenses,
        usedLicensesSim: item.got.UsedLicenses,
        clusterLicenses: item.actual.ClusterLicenses,
        clusterLicensesSim: item.got.ClusterLicenses,
      }
    }),
  USED_HOSTS: (data) =>
    _.map(data, (item) => {
      return {
        partNumber: item.actual.LicenseTypeID,
        description: item.actual.Description,
        metric: item.actual.Metric,
        hostname: item.actual.Hostname,
        databases: item.actual.DatabaseNames.length,
        usedLicenses: item.actual.UsedLicenses,
        usedLicensesSim: item.got.UsedLicenses,
        clusterLicenses: item.actual.ClusterLicenses,
        clusterLicensesSim: item.got.ClusterLicenses,
      }
    }),
  USED_CLUSTERS: (data) =>
    _.map(data, (item) => {
      return {
        partNumber: item.data.LicenseTypeID,
        description: item.data.Description,
        metric: item.data.Metric,
        hosts: item.data.Hostnames.length,
        cluster: item.data.Cluster,
        usedLicenses: item.data.UsedLicenses,
        usedLicensesSim: item.got.UsedLicenses,
      }
    }),
  USED_CLUSTERS_VERITAS: (data) =>
    _.map(data, (item) => {
      return {
        partNumber: item.actual.LicenseTypeID,
        description: item.actual.Description,
        metric: item.actual.Metric,
        hosts: item.actual.Hostnames.length,
        cluster: item.actual.ID,
        usedLicenses: item.actual.Count,
        usedLicensesSim: item.got.Count,
      }
    }),
}
