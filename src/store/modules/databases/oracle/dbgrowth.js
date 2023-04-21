import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  dbGrwothHostnames: [],
  dbgrowthData: [],
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
  getDbGrowthPdbData: (state) => {
    return state.dbgrowthData
  },
}

export const mutations = {
  SET_DBGROWTH_HOSTNAMES: (state, payload) => {
    state.dbGrwothHostnames = payload
  },
  SET_DBGROWTH_DATA: (state, payload) => {
    state.dbgrowthData = payload
  },
  SET_SEARCH: (state, payload) => {
    state.searchTherm = payload
  },
}

export const actions = {
  async getDbgrowth({ commit, getters }, hostname) {
    const url = 'hosts/technologies/oracle/databases/change-list/'
    const endPoints = [`${url}${hostname}`, `${url}${hostname}/pdbs`]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('baseApi', {
          method: 'get',
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
        let data = []
        let dbgrowth = allData[0].data[0].oracleChangesDBs
        const dbgrowthPdbs = allData[1].data

        _.forEach(dbgrowth, (db) => {
          const filterPDB = _.filter(dbgrowthPdbs, (pdb) => {
            return db.databasename === pdb.dbname
          })

          data.push({
            ...db,
            pdbs: _.groupBy(filterPDB, 'pdbname'),
          })
        })

        commit('SET_DBGROWTH_DATA', data)
      })
    )

    // return axiosRequest('baseApi', config)
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
