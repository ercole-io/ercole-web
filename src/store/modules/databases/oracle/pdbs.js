import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  pdbs: [],
  pdbsDbGrowth: [],
})

export const getters = {
  getOraclePdbs: (state) => {
    const pdbs = _.groupBy(state.pdbs, 'hostname')
    return pdbs
  },
  getOraclePdbsDbGrowth: (state) => (db, pdb) => {
    const dbGrowth = []
    _.map(state.pdbsDbGrowth, (data) => {
      if (db) {
        if (data.dbname === db && data.pdbname === pdb) {
          dbGrowth.push(data)
        }
      }

      if (!db) {
        if (data.pdbname === pdb) {
          dbGrowth.push(data)
        }
      }
    })

    return dbGrowth
  },
}

export const mutations = {
  SET_PDBS: (state, payload) => {
    state.pdbs = payload
  },
  SET_DBGROWTH_PDBS: (state, payload) => {
    state.pdbsDbGrowth = payload
  },
}

export const actions = {
  async getPdbs({ commit, getters, dispatch }) {
    dispatch('onLoading')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/pdbs',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoading')
      commit('SET_PDBS', res.data)
    })
  },
  async getPdbsByHostDbGrothData({ commit, getters, dispatch }, hostname) {
    const config = {
      method: 'get',
      url: `/hosts/technologies/oracle/databases/change-list/${hostname}/pdbs`,
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoading')
      commit('SET_DBGROWTH_PDBS', res.data)
    })
  },
}
