import axiosDefault from '@/axios/axios-default.js'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { mountDatabasesChart } from '@/helpers/databasesCharts.js'
import _ from 'lodash'

export const state = () => ({
  oracleDbs: [],
  statistics: {},
  topWorkload: [],
  topUnusedIR: [],
})

export const getters = {
  getAllOracleDBs: (state, getters) => {
    const oracleDbs = []
    _.map(state.oracleDbs, (val) => {
      let services = []
      _.map(val.services, (serv) => {
        services.push(serv.name)
      })

      oracleDbs.push({
        ...val,
        work: val.work === null ? 0 : val.work,
        services: services.length > 0 ? services : '-',
      })
      return oracleDbs
    })
    return getters.filteredOrNot(oracleDbs)
  },
  getOracleChartsData: (state) => {
    return mountDatabasesChart(state.oracleDbs, 'oracle')
  },
  getTop3workload: (state) => {
    return state.topWorkload.slice(0, 3)
  },
  getTop3UnusedIR: (state) => {
    return state.topUnusedIR.slice(0, 3)
  },
}

export const mutations = {
  SET_ORACLE_DBS: (state, payload) => {
    state.oracleDbs = payload
  },
  SET_TOP_WORLOAD: (state, payload) => {
    state.topWorkload = payload
  },
  SET_TOP_UNUSEDIR: (state, payload) => {
    state.topUnusedIR = payload
  },
  SET_ORACLE_STATISTICS: (state, payload) => {
    state.statistics = payload
  },
}

export const actions = {
  async getOracleDbs({ commit, dispatch, getters }) {
    dispatch('getTopWorkload')
    dispatch('getTopUnusedIR')
    dispatch('getOracleStatistics')

    const oracleDbs = await axiosDefault.get(
      '/hosts/technologies/oracle/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
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
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await topWorkload.data
    commit('SET_TOP_WORLOAD', response)
  },
  async getTopUnusedIR({ commit, getters }) {
    const topUnused = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-unused-instance-resource',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await topUnused.data
    commit('SET_TOP_UNUSEDIR', response)
  },
  async getOracleStatistics({ commit, getters }) {
    const stats = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/statistics',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )

    const response = await stats.data
    commit('SET_ORACLE_STATISTICS', response)
  },
}
