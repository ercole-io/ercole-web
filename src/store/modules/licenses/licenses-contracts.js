import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  oracleContracts: [],
  mysqlContracts: [],
  microsoftContracts: [],
  hostsAssociated: [],
})

export const getters = {
  getContracts: (state) => (type) => {
    return state[`${type}Contracts`]
  },
  getHostsAssociated: (state) => {
    return state.hostsAssociated
  },
}

export const mutations = {
  SET_LICENSES_CONTRACTS: (state, payload) => {
    state[`${payload.type}Contracts`] =
      payload.type === 'oracle' ? setFullPartNumber(payload.data) : payload.data
  },
  CREATE_LICENSES_CONTRACTS: (state, payload) => {
    state[`${payload.type}Contracts`].unshift(payload.data)
  },
  UPDATE_LICENSES_CONTRACTS: (state, payload) => {
    const item = _.find(
      state[`${payload.type}Contracts`],
      (val) => val.id === payload.data.id
    )
    Object.assign(item, payload.data)
  },
  DELETE_LICENSES_CONTRACTS: (state, payload) => {
    const index = _.findIndex(
      state[`${payload.type}Contracts`],
      (val) => val.id === payload.data.id
    )
    state[`${payload.type}Contracts`].splice(index, 1)
  },
  SET_HOSTS_ASSOCIATED: (state, payload) => {
    state.hostsAssociated = payload
  },
}

export const actions = {
  async resolveContractsRequest({ commit, dispatch }, data) {
    dispatch('onLoadingTable')
    const type = data.type
    const url = `contracts/${type}/database`
    const config = {
      method: data.payload.action,
      url: url,
    }

    if (data.payload.action !== 'get' && data.payload.action !== 'delete') {
      config.data = data.payload.body
      if (data.payload.action === 'put' && data.type === 'mysql') {
        config.url = `${url}/${data.payload.body.id}`
      }
    }

    if (data.payload.action === 'delete') {
      config.url = `${url}/${data.payload.id}`
    }

    await axiosRequest('baseApi', config)
      .then((res) => {
        if (config.method === 'post') {
          commit('CREATE_LICENSES_CONTRACTS', {
            data: res.data,
            type: data.type,
          })
        } else if (config.method === 'put') {
          commit('UPDATE_LICENSES_CONTRACTS', {
            data: res.data,
            type: data.type,
          })
        } else if (config.method === 'delete') {
          if (res.status === 200 || res.status === 204) {
            commit('DELETE_LICENSES_CONTRACTS', {
              data: data.payload,
              type: data.type,
            })
          }
        } else {
          commit('SET_LICENSES_CONTRACTS', {
            data: res.data.contracts,
            type: data.type,
          })
        }
      })
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
  async getHostsAssociatedList({ commit }) {
    const config = {
      method: 'get',
      url: 'hosts?mode=hostnames',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_HOSTS_ASSOCIATED', res.data)
    })
  },
}
