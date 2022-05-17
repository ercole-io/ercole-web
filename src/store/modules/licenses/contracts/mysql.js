import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import toLower from '@/filters/toLower.js'

export const state = () => ({
  mysqlContracts: [],
})

export const getters = {
  getMysqlContracts: (state, getters) => {
    const contracts = []
    _.map(state.mysqlContracts, (val) => {
      contracts.push({ ...val, type: toLower(val.type) })
    })

    return getters.filteredOrNot(contracts)
  },
}

export const mutations = {
  SET_MYSQL_CONTRACTS: (state, payload) => {
    state.mysqlContracts = payload
  },
  CREATE_MYSQL_CONTRACTS: (state, payload) => {
    state.mysqlContracts.unshift(payload)
  },
  UPDATE_MYSQL_CONTRACTS: (state, payload) => {
    const item = _.find(state.mysqlContracts, (val) => val.id === payload.id)
    Object.assign(item, payload)
  },
  DELETE_MYSQL_CONTRACTS: (state, payload) => {
    const index = _.findIndex(
      state.mysqlContracts,
      (val) => val.id === payload.id
    )
    state.mysqlContracts.splice(index, 1)
  },
}

export const actions = {
  async mysqlContractsActions({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const url = '/contracts/mysql/database'
    const config = {
      method: payload.action,
      url: url,
    }

    if (payload.action !== 'get' && payload.action !== 'delete') {
      config.data = payload.body
      if (payload.action === 'put') {
        config.url = `${url}/${payload.body.id}`
      }
    }

    if (payload.action === 'delete') {
      config.url = `${url}/${payload.id}`
    }

    await axiosRequest('baseApi', config).then((res) => {
      if (payload.action === 'post') {
        commit('CREATE_MYSQL_CONTRACTS', res.data)
      } else if (payload.action === 'put') {
        commit('UPDATE_MYSQL_CONTRACTS', res.data)
      } else if (payload.action === 'delete') {
        if (res.status === 200 || res.status === 204) {
          commit('DELETE_MYSQL_CONTRACTS', payload)
        }
      } else {
        commit('SET_MYSQL_CONTRACTS', res.data.contracts)
      }
      dispatch('offLoadingTable')
    })
  },
}
