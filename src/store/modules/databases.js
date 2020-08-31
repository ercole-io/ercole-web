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
  databases: [],
  totalMemory: 0,
  totalSegment: 0,
  totalDatafile: 0
})

export const getters = {
  getTotalCpu: state => {
    return _.sumBy(state.databases, 'cpuCount')
  },
  getDatabasesTypeChartData: state => {
    return mountChart('type', 'Type Of Databases', state.databases)
  },
  getEnvironmentTypeChartData: state => {
    return mountChart('environment', 'Type Of Environment', state.databases)
  },
  getArchivelogChartData: state => {
    return mountChart('archivelog', 'Archivelog Mode', state.databases)
  },
  getDataguardChartData: state => {
    return mountChart('dataguard', 'Disaster Recovery', state.databases)
  },
  getHighReliabilityChartData: state => {
    return mountChart('ha', 'High Reliability', state.databases)
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
