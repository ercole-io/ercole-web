import axiosDefault from '@/axios/axios-default'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { pickDatabaseChart } from '@/helpers/databasesCharts.js'
import _ from 'lodash'

export const state = () => ({
  oracleDbs: [],
  topWorkload: [],
  topReclaimable: [],
  totalMemory: 0,
  totalSegment: 0,
  totalDatafile: 0
})

export const getters = {
  getAllOracleDBs: state => {
    return state.oracleDbs
  },
  getOracleChartsData: state => id => {
    return pickDatabaseChart(state.oracleDbs, id, 'oracle')
  },
  getTop3workload: state => {
    return state.topWorkload.slice(0, 3)
  },
  getTop3Reclaimable: state => {
    return state.topReclaimable.slice(0, 3)
  },
  getOracleTotalCpu: state => {
    return _.sumBy(state.oracleDbs, 'work')
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
  },
  SET_TOTAL_MEMORY: (state, payload) => {
    state.totalMemory = payload
  },
  SET_TOTAL_SEGMENT: (state, payload) => {
    state.totalSegment = payload
  },
  SET_TOTAL_DATAFILE: (state, payload) => {
    state.totalDatafile = payload
  }
}

export const actions = {
  async getOracleDbs({ commit, dispatch, getters }) {
    dispatch('getTopWorkload')
    dispatch('getTopReclaimable')
    dispatch('getTotalMemory')
    dispatch('getTotalSegment')
    dispatch('getTotalDatafile')

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
  },
  async getTotalMemory({ commit, getters }) {
    const totalMemory = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/total-memory-size',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await totalMemory.data
    commit('SET_TOTAL_MEMORY', response)
  },
  async getTotalSegment({ commit, getters }) {
    const totalSegment = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/total-segment-size',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await totalSegment.data
    commit('SET_TOTAL_SEGMENT', response)
  },
  async getTotalDatafile({ commit, getters }) {
    const totalDatafile = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/total-datafile-size',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await totalDatafile.data
    commit('SET_TOTAL_DATAFILE', response)
  }
}
