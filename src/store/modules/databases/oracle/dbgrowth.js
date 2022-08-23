import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  dbgrowth: [],
})

export const getters = {
  getOracleDbgrowth: (state) => {
    const dbgrowth = []

    _.map(state.dbgrowth, (val) => {
      if (val.oracleChangesDBs.length > 0) {
        dbgrowth.push(val)
      }
    })
    return dbgrowth
  },
}

export const mutations = {
  SET_DBGROWTH: (state, payload) => {
    state.dbgrowth = payload
  },
}

export const actions = {
  async getDbgrowth({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/change-list',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_DBGROWTH', res.data)
    })
  },
}
