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
  databases: [],
  totalMemory: 0,
  totalSegment: 0,
  totalDatafile: 0
})

export const getters = {
  getAllDatabases: state => {
    return state.databases
  },
  getTotalCpu: state => {
    return _.sumBy(state.databases, 'cpuCount')
  },
  getDatabasesCharts: state => id => {
    let chartValues = {}

    switch (id) {
      case 'TypeOfDatabases':
        chartValues = {
          title: 'Type Of Databases',
          collapseId: 'TypeOfDatabases',
          data: mountChart('type', state.databases),
          chartId: 'dt',
          isOpen: true
        }
        break
      case 'TypeOfEnvironment':
        chartValues = {
          title: 'Type Of Environment',
          collapseId: 'TypeOfEnvironment',
          data: mountChart('environment', state.databases),
          chartId: 'et'
        }
        break
      case 'ArchivelogMode':
        chartValues = {
          title: 'Archivelog Mode',
          collapseId: 'ArchivelogMode',
          data: mountChart('archivelog', state.databases),
          chartId: 'al'
        }
        break
      case 'DisasterRecovery':
        chartValues = {
          title: 'Disaster Recovery',
          collapseId: 'DisasterRecovery',
          data: mountChart('dataguard', state.databases),
          chartId: 'dr'
        }
        break
      case 'HighAvailability':
        chartValues = {
          title: 'High Availability',
          collapseId: 'HighAvailability',
          data: mountChart('ha', state.databases),
          chartId: 'ha'
        }
        break
      default:
        break
    }

    return chartValues
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
  async getDatabases({ commit, dispatch, getters }) {
    dispatch('getTotalMemory')
    dispatch('getTotalSegment')
    dispatch('getTotalDatafile')

    const databases = await axiosDefault.get(
      '/hosts/technologies/oracle/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await databases.data
    commit('SET_DATABASES', response)
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
