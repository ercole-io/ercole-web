import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  services: [],
})

export const getters = {
  getOracleServices: (state, getters) => {
    const services = []
    _.map(state.services, (val) => {
      services.push({
        hostname: val.hostname,
        dbName: val.databasename,
        servName: val.oracleDatabaseService.name,
        servEnabled: val.oracleDatabaseService.enabled,
      })
    })
    return getters.filteredOrNot(services)
  },
}

export const mutations = {
  SET_SERVICES: (state, payload) => {
    state.services = payload
  },
}

export const actions = {
  async getServices({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/service-list',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_SERVICES', res.data)
    })
  },
}
