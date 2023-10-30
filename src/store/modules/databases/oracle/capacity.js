import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import {
  resolveCapacity,
  resolveCapacityDaily,
} from '@/helpers/hostDetails/databases/oracle.js'

export const state = () => ({
  oracleHostNames: [],
  currentHostDatabasesCapacity: [],
  currentHostCapacityByOs: [],
  searchHostname: '',
})

export const getters = {
  oracleHostNamesList: (state) => {
    const search = state.searchHostname
    let filteredData = state.oracleHostNames

    if (search !== '') {
      filteredData = _.filter(filteredData, (val) => {
        return _.includes(val.toUpperCase(), search.toUpperCase())
      })
    }

    return filteredData
  },
  oracleDatabasesCapacity: (state) => {
    return state.currentHostDatabasesCapacity
  },
  oracleCapacityByOs: (state) => {
    console.log(state.currentHostCapacityByOs)
    return state.currentHostCapacityByOs
  },
}

export const mutations = {
  SET_ORACLE_HOST_NAMES: (state, payload) => {
    state.oracleHostNames = payload
  },
  SET_CURRENT_HOST_DB_CAPACITY: (state, payload) => {
    state.currentHostDatabasesCapacity = payload
  },
  SET_CURRENT_HOST_CAPACITY_BY_OS: (state, payload) => {
    state.currentHostCapacityByOs = payload
  },
  SET_SEARCH_HOSTNAME: (state, payload) => {
    state.searchHostname = payload
  },
}

export const actions = {
  async getOracleHostNames({ commit, getters }) {
    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      let oracleHosts = []
      if (res.data) {
        const data = _.uniqBy(res.data, 'hostname')
        _.map(data, (val) => {
          oracleHosts.push(val.hostname)
        })
      }

      commit('SET_ORACLE_HOST_NAMES', oracleHosts)
    })
  },
  async getOracleCapacityData({ commit, dispatch }, hostname) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: `hosts/${hostname}`,
    }

    await axiosRequest('baseApi', config)
      .then((res) => {
        const databases = res.data.features.oracle.database.databases
        const hostData = res.data

        const databasesCapacity = _.map(databases, (db) => {
          const { name, cpuDiskConsumptions, pdbs } = db

          const pdbsCapacity = _.map(pdbs, (pdb) => {
            const { name, cpuDiskConsumptionPdbs } = pdb

            return {
              pdbName: name,
              pdbCapacity: resolveCapacity(cpuDiskConsumptionPdbs),
              pdbCapacityDaily: resolveCapacityDaily(cpuDiskConsumptionPdbs),
            }
          })

          return {
            dbName: name,
            dbCapacity: resolveCapacity(cpuDiskConsumptions),
            dbCapacityDaily: resolveCapacityDaily(cpuDiskConsumptions),
            pdbs: pdbsCapacity,
          }
        })

        const { cpuConsumptions, diskConsumptions } = hostData
        const databasesCapacityByOs = [cpuConsumptions, diskConsumptions]

        commit('SET_CURRENT_HOST_DB_CAPACITY', databasesCapacity)
        commit('SET_CURRENT_HOST_CAPACITY_BY_OS', databasesCapacityByOs)
      })
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
}
