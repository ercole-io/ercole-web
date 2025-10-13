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
    const original = data.actual
    const simulated = data.got
    const simulatedMap = _.keyBy(simulated, 'LicenseTypeID')
    return configData[type](original, simulatedMap)
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
    commit('SET_SCENARIO_LICENSES', { type, payload: res.data })
    dispatch('offLoadingTable')
  },
}

const configData = {
  COMPLIANCE: (original, simulatedMap) =>
    _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.ItemDescription,
        metric: ori.Metric,
        available: ori.Available,
        availableSim: sim?.Available,
        compliance: ori.Compliance * 100,
        complianceStroke: showStrokeColor(ori.Compliance * 100),
        complianceSim: sim ? sim.Compliance * 100 : 0,
        complianceSimStroke: sim
          ? showStrokeColor(sim.Compliance * 100)
          : 'is-danger',
        consumed: ori.Consumed,
        consumedSim: sim?.Consumed,
        covered: ori.Covered,
        coveredSim: sim?.Covered,
        purchased: ori.Purchased,
        purchasedSim: sim?.Purchased,
        unlimited: ori.Unlimited,
        unlimitedSim: sim?.Unlimited,
      }
    }),
  USED_DATABASES: (original, simulatedMap) =>
    _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hostname: ori.Hostname,
        dbName: ori.DbName,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim?.UsedLicenses,
        clusterLicenses: ori.ClusterLicenses,
        clusterLicensesSim: sim?.ClusterLicenses,
      }
    }),
  USED_HOSTS: (original, simulatedMap) =>
    _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hostname: ori.Hostname,
        databases: ori.DatabaseNames.length,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim?.UsedLicenses,
        clusterLicenses: ori.ClusterLicenses,
        clusterLicensesSim: sim?.ClusterLicenses,
      }
    }),
  USED_CLUSTERS: (original, simulatedMap) =>
    _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hosts: ori.Hostnames.length,
        cluster: ori.Cluster,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim?.UsedLicenses,
      }
    }),
  USED_CLUSTERS_VERITAS: (original, simulatedMap) =>
    _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hosts: ori.Hostnames.length,
        cluster: ori.ID,
        usedLicenses: ori.Count,
        usedLicensesSim: sim?.Count,
      }
    }),
}
