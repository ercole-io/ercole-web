import axiosDefault from '../../axios/axios-default'
import axiosNoLoading from '../../axios/axios-no-loading.js'
import _ from 'lodash'

const mountChart = (prop, chartName, data) => {
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
  getEnvironmentTypeChartDataOracle: state => {
    return mountChart('environment', 'Type Of Environment', state.oracleDbs)
  },
  getArchivelogChartDataOracle: state => {
    return mountChart('archivelog', 'Archivelog Mode', state.oracleDbs)
  },
  getDataguardChartDataOracle: state => {
    return mountChart('dataguard', 'Disaster Recovery', state.oracleDbs)
  },
  getHaChartDataOracle: state => {
    return mountChart('ha', 'High Availability', state.oracleDbs)
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
