import axiosNoLoading from '@/axios/axios-no-loading.js'
import { mountDatabasesChart } from '@/helpers/databasesCharts.js'
import { returnTechTypePrettyName } from '@/helpers/helpers.js'
import _ from 'lodash'

export const state = () => ({
  databases: [],
  stats: {},
})

export const getters = {
  getAllDatabases: (state, getters) => {
    return getters.filteredOrNot(state.databases)
  },
  getDatabasesCharts: (state) => {
    return mountDatabasesChart(state.databases, 'databases')
  },
}

export const mutations = {
  SET_DATABASES: (state, payload) => {
    const databases = []
    _.map(payload, (val) => {
      databases.push({
        ...val,
        type: returnTechTypePrettyName(val.type),
      })
    })
    state.databases = databases
  },
  SET_DB_STATS: (state, payload) => {
    state.stats = payload
  },
}

export const actions = {
  async getDatabases({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')
    dispatch('getDatabasesStats')

    const databases = await axiosNoLoading.get(
      '/hosts/technologies/all/databases',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await databases.data.databases
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_DATABASES', response)
    }
  },
  async getDatabasesStats({ commit, getters }) {
    const stats = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/statistics',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await stats.data
    if (response) {
      commit('SET_DB_STATS', response)
    }
  },
}
