import axiosDefault from '../../axios/axios-default'
import axiosNoLoading from '../../axios/axios-no-loading.js'
import _ from 'lodash'

export const state = () => ({
  databases: [],
  totalMemory: 0,
  totalSegment: 0,
  totalDatafile: 0
})

export const getters = {
  getTotalCpu: state => {
    return _.sumBy(state.databases, 'cpuCount')
  },
  getChartData: state => {
    const finalChartData = []

    const dbType = _.groupBy(state.databases, 'type')
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

    const envType = _.groupBy(state.databases, 'environment')
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

    const archiveLog = _.groupBy(state.databases, 'archivelog')
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

    const dataguard = _.groupBy(state.databases, 'dataguard')
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

    const ha = _.groupBy(state.databases, 'ha')
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
  SET_DATABASES: (state, payload) => {
    _.map(payload, item => {
      item.type = 'Oracle'
    })
    state.databases = payload
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
  async getDatabases({ commit, dispatch }) {
    const databases = await axiosDefault.get(
      '/hosts/technologies/oracle/databases'
    )
    const response = await databases.data
    commit('SET_DATABASES', response)
    dispatch('getTotalMemory')
    dispatch('getTotalSegment')
    dispatch('getTotalDatafile')
  },
  async getTotalMemory({ commit }) {
    const totalMemory = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/total-memory-size'
    )
    const response = await totalMemory.data
    commit('SET_TOTAL_MEMORY', response)
  },
  async getTotalSegment({ commit }) {
    const totalSegment = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/total-segment-size'
    )
    const response = await totalSegment.data
    commit('SET_TOTAL_SEGMENT', response)
  },
  async getTotalDatafile({ commit }) {
    const totalDatafile = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/total-datafile-size'
    )
    const response = await totalDatafile.data
    commit('SET_TOTAL_DATAFILE', response)
  }
}
