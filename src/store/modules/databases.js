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
  stats: {}
})

export const getters = {
  getAllDatabases: state => {
    return state.databases
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
    state.databases = payload
  },
  SET_DB_STATS: (state, payload) => {
    state.stats = payload
  }
}

export const actions = {
  async getDatabases({ commit, dispatch, getters }) {
    dispatch('getDatabasesStats')

    const databases = await axiosDefault.get(
      '/hosts/technologies/all/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await databases.data.databases
    commit('SET_DATABASES', response)
  },
  async getDatabasesStats({ commit, getters }) {
    const stats = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/statistics',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await stats.data
    commit('SET_DB_STATS', response)
  }
}
