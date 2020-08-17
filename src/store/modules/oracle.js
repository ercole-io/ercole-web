import axiosDefault from '../../axios/axios-default'
import axiosNoLoading from '../../axios/axios-no-loading.js'
import _ from 'lodash'

export const state = () => ({
  oracleDbs: [],
  topWorkload: [],
  topReclaimable: []
})

export const getters = {
  getOracleChartData: state => {
    const finalChartData = []

    const dbType = _.groupBy(state.oracleDbs, 'type')
    const dbTypeData = []
    _.map(dbType, (value, key) => {
      dbTypeData.push({ name: key, value: value.length })
    })
    _.map(dbTypeData, item => {
      finalChartData.push({
        name: item.name,
        data: [['Type Of Databases', item.value]]
      })
    })

    const envType = _.groupBy(state.oracleDbs, 'environment')
    const envTypeData = []
    _.map(envType, (value, key) => {
      envTypeData.push({ name: key, value: value.length })
    })
    _.map(envTypeData, item => {
      finalChartData.push({
        name: item.name,
        data: [['Type Of Environment', item.value]]
      })
    })

    const archiveLog = _.groupBy(state.oracleDbs, 'archivelog')
    const archiveLogData = []
    _.map(archiveLog, (value, key) => {
      archiveLogData.push({ name: key, value: value.length })
    })
    _.map(archiveLogData, item => {
      finalChartData.push({
        name: item.name,
        data: [['Archivelog Mode', item.value]]
      })
    })

    const dataguard = _.groupBy(state.oracleDbs, 'dataguard')
    const dataguardData = []
    _.map(dataguard, (value, key) => {
      dataguardData.push({ name: key, value: value.length })
    })
    _.map(dataguardData, item => {
      finalChartData.push({
        name: item.name,
        data: [['Disaster Recovery', item.value]]
      })
    })

    const ha = _.groupBy(state.oracleDbs, 'ha')
    const haData = []
    _.map(ha, (value, key) => {
      haData.push({ name: key, value: value.length })
    })
    _.map(haData, item => {
      finalChartData.push({
        name: item.name,
        data: [['High Reliability', item.value]]
      })
    })

    return finalChartData
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
  async getOracleDbs({ commit, dispatch }) {
    const oracleDbs = await axiosDefault.get(
      '/hosts/technologies/oracle/databases'
    )
    const response = await oracleDbs.data
    commit('SET_ORACLE_DBS', response)
    dispatch('getTopWorkload')
    dispatch('getTopReclaimable')
  },
  async getTopWorkload({ commit }) {
    const topWorkload = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-workload'
    )
    const response = await topWorkload.data
    commit('SET_TOP_WORLOAD', response)
  },
  async getTopReclaimable({ commit }) {
    const topReclaimable = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-reclaimable'
    )
    const response = await topReclaimable.data
    commit('SET_TOP_RECLAIMABLE', response)
  }
}
