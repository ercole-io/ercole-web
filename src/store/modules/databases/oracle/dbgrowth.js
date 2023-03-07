import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  dbGrwothHostnames: [],
  searchTherm: '',
})

export const getters = {
  filteredOracleDbGrowthHostnames: (state) => {
    let hostnames = _.uniq(state.dbGrwothHostnames)
    const therm = state.searchTherm

    if (state.searchTherm !== '') {
      hostnames = _.filter(hostnames, (el) => {
        return (
          _.includes(el.toUpperCase(), therm.toUpperCase()) ||
          _.filter(el.oracleChangesDBs, (v) => {
            return _.includes(v.databasename.toUpperCase(), therm.toUpperCase())
          }).length > 0
        )
      })
    }

    return hostnames
  },
}

export const mutations = {
  SET_DBGROWTH_HOSTNAMES: (state, payload) => {
    state.dbGrwothHostnames = payload
  },
  SET_SEARCH: (state, payload) => {
    state.searchTherm = payload
  },
}

export const actions = {
  getDbgrowth({ getters }, hostname) {
    const config = {
      method: 'get',
      url: `hosts/technologies/oracle/databases/change-list/${hostname}`,
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    return axiosRequest('baseApi', config)
  },
  async getDbGrowthDbs({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      merthod: 'get',
      url: 'hosts/technologies/oracle/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      const hostnames = _.map(res.data, (val) => val.hostname)
      commit('SET_DBGROWTH_HOSTNAMES', hostnames)
    })
  },
}
