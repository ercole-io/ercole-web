import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import { mountDatabasesChart } from '@/helpers/databasesCharts.js'
import _ from 'lodash'

const url = '/hosts/technologies/oracle/databases'

export const state = () => ({
  oracleDbs: [],
  statistics: {},
  topWorkload: [],
  topUnusedIR: [],
})

export const getters = {
  getAllOracleDBs: (state, getters) => {
    const oracleDbs = []
    _.map(state.oracleDbs, (val) => {
      let services = []
      _.map(val.services, (serv) => {
        services.push(serv.name)
      })

      let pdbs = []
      _.map(val.pdbs, (pdb) => {
        if (pdb !== '') {
          pdbs.push(pdb)
        }
      })

      oracleDbs.push({
        ...val,
        work: val.work === null ? 0 : val.work,
        services: services.length > 0 ? services : '-',
        pdbs: pdbs.length > 0 ? pdbs : '-',
      })
      return oracleDbs
    })
    return getters.filteredOrNot(oracleDbs)
  },
  getOracleChartsData: (state) => {
    return mountDatabasesChart(state.oracleDbs, 'oracle')
  },
  getTop3workload: (state) => {
    return state.topWorkload.slice(0, 3)
  },
  getTop3UnusedIR: (state) => {
    return state.topUnusedIR.slice(0, 3)
  },
}

export const mutations = {
  SET_ORACLE_DBS: (state, payload) => {
    state.oracleDbs = payload
  },
  SET_TOP_WORLOAD: (state, payload) => {
    state.topWorkload = payload
  },
  SET_TOP_UNUSEDIR: (state, payload) => {
    state.topUnusedIR = payload
  },
  SET_ORACLE_STATISTICS: (state, payload) => {
    state.statistics = payload
  },
}

export const actions = {
  async getOracleDbs({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const endPoints = [
      url,
      `${url}/top-workload`,
      `${url}/top-unused-instance-resource`,
      `${url}/statistics`,
    ]

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
        commit('SET_ORACLE_DBS', allData[0].data)
        commit('SET_TOP_WORLOAD', allData[1].data)
        commit('SET_TOP_UNUSEDIR', allData[2].data)
        commit('SET_ORACLE_STATISTICS', allData[3].data)
        dispatch('offLoadingTable')
      })
    )
  },
}
