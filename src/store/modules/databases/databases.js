import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import { mountDatabasesChart } from '@/helpers/databasesCharts.js'
import { returnTechTypePrettyName } from '@/helpers/helpers.js'
import _ from 'lodash'

const url = '/hosts/technologies/all/databases'

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

    const endPoints = [url, `${url}/statistics`]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('baseApi', {
          merthod: 'get',
          url: endpoint,
          params: {
            'older-than': getters.getActiveFilters.date,
            environment: getters.getActiveFilters.environment,
            location: getters.getActiveFilters.location,
          },
        })
      )
    ).then(
      axios.spread((...allData) => {
        commit('SET_DATABASES', allData[0].data.databases)
        commit('SET_DB_STATS', allData[1].data)
        dispatch('offLoadingTable')
      })
    )
  },
}
