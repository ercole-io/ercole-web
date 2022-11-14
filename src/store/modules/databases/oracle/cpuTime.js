import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import {
  mapHostDatabases,
  mountCpuUsageChart,
} from '@/helpers/hostDetails/hostDetails.js'

export const state = () => ({
  oracleHostsList: [],
  currentHostDatabases: [],
  currentHostHistory: [],
  searchCpuTherm: '',
})

export const getters = {
  getOracleHostsList: (state) => {
    const therm = state.searchCpuTherm
    let filteredData = []
    filteredData = state.oracleHostsList

    if (therm !== '') {
      filteredData = _.filter(filteredData, (val) => {
        return _.includes(val.toUpperCase(), therm.toUpperCase())
      })
    }

    return filteredData
  },
  getOracleCpuTimeChart: (state, getters, rootstate) => (selected) => {
    const dailyDbState = state.currentHostDatabases
    const dailyHistory = state.currentHostHistory
    const rangeDates = rootstate.rangeDates.rangeDates

    if (dailyDbState) {
      return mountCpuUsageChart(
        dailyHistory,
        selected,
        dailyDbState,
        rangeDates
      )
    } else {
      return null
    }
  },
  getOracleCpuTimeChartInfo: (state, getters) => {
    const databases = getters.currentHostDBs

    return _.map(databases, (val) => {
      return {
        name: val.name,
        id: val.dbID,
      }
    })
  },
}

export const mutations = {
  SET_ORACLE_HOSTS_LIST: (state, payload) => {
    state.oracleHostsList = payload
  },
  SET_CURRENT_HOST_DATABASES: (state, payload) => {
    state.currentHostDatabases = payload
  },
  SET_CURRENT_HOST_HISTORY: (state, payload) => {
    state.currentHostHistory = payload
  },
  SET_SEARCH_CPU_THEME: (state, payload) => {
    state.searchCpuTherm = payload
  },
}

export const actions = {
  async getOracleHosts({ commit, getters }) {
    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      let oracleHosts = []
      if (res.data) {
        const data = _.uniqBy(res.data, 'hostname')
        _.map(data, (val) => {
          oracleHosts.push(val.hostname)
        })
        commit('SET_ORACLE_HOSTS_LIST', oracleHosts)
      } else {
        commit('SET_ORACLE_HOSTS_LIST', [])
      }
    })
  },
  async getOracleCpuTimeData({ commit, dispatch }, hostname) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: `hosts/${hostname}`,
    }

    await axiosRequest('baseApi', config)
      .then((res) => {
        const extraData = { licenses: () => {} }
        const databases = res.data.features.oracle.database.databases
        const mapDatabases = mapHostDatabases(databases, extraData, 'oracle')

        commit('SET_CURRENT_HOST_DATABASES', mapDatabases)
        commit('SET_CURRENT_HOST_HISTORY', res.data.history)
      })
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
}
