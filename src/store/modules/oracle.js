import axiosDefault from '@/axios/axios-default'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'

const mountChart = (prop, data) => {
  const finalChartData = []

  const groupByProp = _.groupBy(data, prop)
  const propData = []

  _.map(groupByProp, (value, key) => {
    propData.push({ name: key, value: value.length })
  })

  _.map(propData, item => {
    finalChartData.push({
      name: item.name,
      data: [['', item.value]]
    })
  })

  return finalChartData
}

export const state = () => ({
  oracleDbs: [],
  topWorkload: [],
  topReclaimable: []
})

export const getters = {
  getAllOracleDBs: state => {
    return state.oracleDbs
  },
  getOracleChartsData: state => id => {
    let chartValues = {}

    switch (id) {
      case 'TypeOfEnvironment':
        chartValues = {
          title: 'Type Of Environment',
          collapseId: 'TypeOfEnvironment',
          data: mountChart('environment', state.oracleDbs),
          chartId: 'et'
        }
        break
      case 'ArchivelogMode':
        chartValues = {
          title: 'Archivelog Mode',
          collapseId: 'ArchivelogMode',
          data: mountChart('archivelog', state.oracleDbs),
          chartId: 'al'
        }
        break
      case 'DisasterRecovery':
        chartValues = {
          title: 'Disaster Recovery',
          collapseId: 'DisasterRecovery',
          data: mountChart('dataguard', state.oracleDbs),
          chartId: 'dr'
        }
        break
      case 'HighAvailability':
        chartValues = {
          title: 'High Availability',
          collapseId: 'HighAvailability',
          data: mountChart('ha', state.oracleDbs),
          chartId: 'ha'
        }
        break
      default:
        break
    }

    return chartValues
  },
  getTop3workload: state => {
    return state.topWorkload.slice(0, 3)
  },
  getTop3Reclaimable: state => {
    return state.topReclaimable.slice(0, 3)
  }
}

export const mutations = {
  SET_ORACLE_DBS: (state, payload) => {
    state.oracleDbs = payload
  },
  SET_TOP_WORLOAD: (state, payload) => {
    state.topWorkload = payload
  },
  SET_TOP_RECLAIMABLE: (state, payload) => {
    state.topReclaimable = payload
  }
}

export const actions = {
  async getOracleDbs({ commit, dispatch, getters }) {
    dispatch('getTopWorkload')
    dispatch('getTopReclaimable')

    const oracleDbs = await axiosDefault.get(
      '/hosts/technologies/oracle/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await oracleDbs.data
    commit('SET_ORACLE_DBS', response)
  },
  async getTopWorkload({ commit, getters }) {
    const topWorkload = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-workload',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await topWorkload.data
    commit('SET_TOP_WORLOAD', response)
  },
  async getTopReclaimable({ commit, getters }) {
    const topReclaimable = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-reclaimable',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await topReclaimable.data
    commit('SET_TOP_RECLAIMABLE', response)
  }
}
