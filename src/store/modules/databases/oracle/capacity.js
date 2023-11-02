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
  currentHostCapacityDailyByOs: [],
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
    return state.currentHostCapacityByOs
  },
  oracleCapacityDailyByOs: (state) => {
    return state.currentHostCapacityDailyByOs
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
  SET_CURRENT_HOST_CAPACITY_DAILY_BY_OS: (state, payload) => {
    state.currentHostCapacityDailyByOs = payload
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
        let newData = _.concat(cpuConsumptions, diskConsumptions)

        let m = []
        let w1 = []
        let w2 = []
        let w3 = []
        let w4 = []
        let d1 = []
        let d2 = []
        let d3 = []
        let d4 = []
        let d5 = []
        let d6 = []
        let d7 = []

        let capacityOS = resolveCapacity(newData)
        _.forEach(capacityOS, (val) => {
          if (val.target === 'm') {
            m.push(val)
          }
          if (val.target === 'w1') {
            w1.push(val)
          }
          if (val.target === 'w2') {
            w2.push(val)
          }
          if (val.target === 'w3') {
            w3.push(val)
          }
          if (val.target === 'w4') {
            w4.push(val)
          }
          if (val.target === 'd1') {
            d1.push(val)
          }
          if (val.target === 'd2') {
            d2.push(val)
          }
          if (val.target === 'd3') {
            d3.push(val)
          }
          if (val.target === 'd4') {
            d4.push(val)
          }
          if (val.target === 'd5') {
            d5.push(val)
          }
          if (val.target === 'd6') {
            d6.push(val)
          }
          if (val.target === 'd7') {
            d7.push(val)
          }
        })

        m = resolveValues(m)
        w1 = resolveValues(w1)
        w2 = resolveValues(w2)
        w3 = resolveValues(w3)
        w4 = resolveValues(w4)
        d1 = resolveValues(d1)
        d2 = resolveValues(d2)
        d3 = resolveValues(d3)
        d4 = resolveValues(d4)
        d5 = resolveValues(d5)
        d6 = resolveValues(d6)
        d7 = resolveValues(d7)

        capacityOS = _.concat(m, w1, w2, w3, w4, d1, d2, d3, d4, d5, d6, d7)
        const capacityDailyOS = resolveCapacityDaily(newData)

        commit('SET_CURRENT_HOST_DB_CAPACITY', databasesCapacity)
        commit('SET_CURRENT_HOST_CAPACITY_BY_OS', capacityOS)
        commit('SET_CURRENT_HOST_CAPACITY_DAILY_BY_OS', capacityDailyOS)
      })
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
}

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

const resolveValues = (val) => {
  return _(val)
    .flatten()
    .groupBy('target')
    .map(
      _.spread((...values) => {
        return _.mergeWith(...values, customizer)
      })
    )
    .value()
}
