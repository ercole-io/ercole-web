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

const showStrokeColor = (value) => {
  if (value < 100 && value >= 80) {
    return 'is-warning'
  } else if (value < 80) {
    return 'is-danger'
  } else {
    return 'is-success'
  }
}

export const getters = {
  getCurrentScenario: (state) => {
    return state.currentScenario
  },
  getLicensesScenario: (state) => (type) => {
    const data = state.scenarioLicenses[type]

    const original = data.actual
    const simulated = data.got

    const simulatedMap = _.keyBy(simulated, 'LicenseTypeID')

    const result = configData[type](original, simulatedMap)

    return result
  },
}

export const mutations = {
  SET_SCENARIO_CURRENT: (state, payload) => {
    state.currentScenario = payload
  },
  SET_SCENARIO_LICENSES_COMPLIANCE: (state, payload) => {
    state.scenarioLicenses.COMPLIANCE = payload
  },
  SET_SCENARIO_LICENSES_USED_DATABASES: (state, payload) => {
    state.scenarioLicenses.USED_DATABASES = payload
  },
  SET_SCENARIO_LICENSES_USED_HOSTS: (state, payload) => {
    state.scenarioLicenses.USED_HOSTS = payload
  },
  SET_SCENARIO_LICENSES_USED_CLUSTERS: (state, payload) => {
    state.scenarioLicenses.USED_CLUSTERS = payload
  },
  SET_SCENARIO_LICENSES_USED_CLUSTERS_VERITAS: (state, payload) => {
    state.scenarioLicenses.USED_CLUSTERS_VERITAS = payload
  },
}

export const actions = {
  async fetchCurrentScenario({ commit, dispatch }, id) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: `scenarios/${id}`,
    }

    await axiosRequest('baseApi', config).then((res) => {
      const data = res.data

      commit(`SET_SCENARIO_CURRENT`, data)
      dispatch('offLoadingTable')
    })
  },
  async fetchScenarioLicenses({ commit, dispatch }, info) {
    const type = info.type
    const id = info.id
    const urls = {
      COMPLIANCE: `scenarios/${id}/license-compliance`,
      USED_DATABASES: `scenarios/${id}/license-used-database`,
      USED_HOSTS: `scenarios/${id}/license-used-host`,
      USED_CLUSTERS: `scenarios/${id}/license-used-cluster`,
      USED_CLUSTERS_VERITAS: `scenarios/${id}/license-used-cluster-veritas`,
    }
    const url = urls[type]

    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('baseApi', config).then((res) => {
      const data = res.data

      commit(`SET_SCENARIO_LICENSES_${type}`, data)
      dispatch('offLoadingTable')
    })
  },
}

const configData = {
  COMPLIANCE: (original, simulatedMap) => {
    return _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]

      return {
        partNumber: ori.LicenseTypeID,
        description: ori.ItemDescription,
        metric: ori.Metric,
        available: ori.Available,
        availableSim: sim.Available,
        compliance: ori.Compliance * 100,
        complianceStroke: showStrokeColor(ori.Compliance * 100),
        complianceSim: sim.Compliance * 100,
        complianceSimStroke: showStrokeColor(sim.Compliance * 100),
        consumed: ori.Consumed,
        consumedSim: sim.Consumed,
        covered: ori.Covered,
        coveredSim: sim.Covered,
        purchased: ori.Purchased,
        purchasedSim: sim.Purchased,
        unlimited: ori.Unlimited,
        unlimitedSim: sim.Unlimited,
      }
    })
  },
  USED_DATABASES: (original, simulatedMap) => {
    return _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]

      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hostname: ori.Hostname,
        dbName: ori.DbName,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim.UsedLicenses,
        clusterLicenses: ori.ClusterLicenses,
        clusterLicensesSim: sim.ClusterLicenses,
      }
    })
  },
  USED_HOSTS: (original, simulatedMap) => {
    return _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]

      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hostname: ori.Hostname,
        databases: ori.DatabaseNames.length,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim.UsedLicenses,
        clusterLicenses: ori.ClusterLicenses,
        clusterLicensesSim: sim.ClusterLicenses,
      }
    })
  },
  USED_CLUSTERS: (original, simulatedMap) => {
    return _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]

      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hosts: ori.Hostnames.length,
        cluster: ori.Cluster,
        usedLicenses: ori.UsedLicenses,
        usedLicensesSim: sim.UsedLicenses,
      }
    })
  },
  USED_CLUSTERS_VERITAS: (original, simulatedMap) => {
    return _.map(original, (ori) => {
      const sim = simulatedMap[ori.LicenseTypeID]

      return {
        partNumber: ori.LicenseTypeID,
        description: ori.Description,
        metric: ori.Metric,
        hosts: ori.Hostnames.length,
        cluster: ori.ID,
        usedLicenses: ori.Count,
        usedLicensesSim: sim.Count,
      }
    })
  },
}
