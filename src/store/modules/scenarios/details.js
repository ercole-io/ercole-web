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
    const original = _.orderBy(data.actual, 'LicenseTypeID')
    const simulated = _.orderBy(data.got, 'LicenseTypeID')
    return configData[type](original, simulated)
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
  COMPLIANCE: (original, simulated) =>
    _.map(original, (ori) => {
      const sim = _.find(
        simulated,
        (sim) => sim.LicenseTypeID === ori.LicenseTypeID
      )
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.ItemDescription,
        metric: ori.Metric,
        available: ori.Available,
        availableSim: sim ? sim.Available : undefined,
        compliance: ori.Compliance * 100,
        complianceStroke: showStrokeColor(ori.Compliance * 100),
        complianceSim: sim ? sim.Compliance * 100 : 0,
        complianceSimStroke: sim
          ? showStrokeColor(sim.Compliance * 100)
          : 'is-danger',
        consumed: ori.Consumed,
        consumedSim: sim ? sim.Consumed : undefined,
        covered: ori.Covered,
        coveredSim: sim ? sim.Covered : undefined,
        purchased: ori.Purchased,
        purchasedSim: sim ? sim.Purchased : undefined,
        unlimited: ori.Unlimited,
        unlimitedSim: sim ? sim.Unlimited : undefined,
      }
    }),
  USED_DATABASES: (original, simulated) =>
    _.map(original, (ori) => {
      const sim = _.find(
        simulated,
        (sim) =>
          sim.LicenseTypeID === ori.LicenseTypeID &&
          sim.DbName === ori.DbName &&
          sim.Hostname === ori.Hostname
      )
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hostname: ori.Hostname,
        dbName: ori.DbName,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim ? sim.UsedLicenses : undefined,
        clusterLicenses: ori.ClusterLicenses,
        clusterLicensesSim: sim ? sim.ClusterLicenses : undefined,
      }
    }),
  USED_HOSTS: (original, simulated) =>
    _.map(original, (ori) => {
      const sim = _.find(
        simulated,
        (sim) =>
          sim.LicenseTypeID === ori.LicenseTypeID &&
          sim.Hostname === ori.Hostname
      )
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hostname: ori.Hostname,
        databases: ori.DatabaseNames.length,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim ? sim.UsedLicenses : undefined,
        clusterLicenses: ori.ClusterLicenses,
        clusterLicensesSim: sim ? sim.ClusterLicenses : undefined,
      }
    }),
  USED_CLUSTERS: (original, simulated) =>
    _.map(original, (ori) => {
      const sim = _.find(
        simulated,
        (sim) =>
          sim.LicenseTypeID === ori.LicenseTypeID &&
          sim.Hostname === ori.Hostname
      )
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hosts: ori.Hostnames.length,
        cluster: ori.Cluster,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim ? sim.UsedLicenses : undefined,
      }
    }),
  USED_CLUSTERS_VERITAS: (original, simulated) =>
    _.map(original, (ori) => {
      const sim = _.find(
        simulated,
        (sim) => sim.LicenseTypeID === ori.LicenseTypeID && sim.ID === ori.ID
      )
      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hosts: ori.Hostnames.length,
        cluster: ori.ID,
        usedLicenses: ori.Count,
        usedLicensesSim: sim ? sim.Count : undefined,
      }
    }),
}
