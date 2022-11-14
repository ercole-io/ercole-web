import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  dbgrowth: [],
  // searchKey: 'oracleChangesDBs',
  searchTherm: '',
})

export const getters = {
  filteredOracleDbGrowth: (state) => {
    let dbgrowth = []
    const therm = state.searchTherm
    // const key = state.searchKey

    _.map(state.dbgrowth, (val) => {
      if (val.oracleChangesDBs.length > 0) {
        dbgrowth.push(val)
      }
    })

    if (state.searchTherm !== '') {
      dbgrowth = _.filter(dbgrowth, (el) => {
        return (
          _.includes(el.hostname.toUpperCase(), therm.toUpperCase()) ||
          _.filter(el.oracleChangesDBs, (v) => {
            return _.includes(v.databasename.toUpperCase(), therm.toUpperCase())
          }).length > 0
        )
      })
    }

    return dbgrowth
  },
}

export const mutations = {
  SET_DBGROWTH: (state, payload) => {
    state.dbgrowth = payload
  },
  SET_SEARCH: (state, payload) => {
    state.searchTherm = payload
  },
}

export const actions = {
  async getDbgrowth({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/change-list',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_DBGROWTH', res.data)
    })
  },
}
