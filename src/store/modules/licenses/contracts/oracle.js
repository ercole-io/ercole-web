import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  oracleContracts: [],
  oracleLicensesTypes: {},
})

export const getters = {
  getOracleContracts: (state, getters) => {
    return getters.filteredOrNot(state.oracleContracts)
  },
  getOracleContractsIDs: (state) => {
    const contractNumbers = []

    _.map(state.oracleContracts, (val) => {
      contractNumbers.push(val.contractID)
    })
    return contractNumbers
  },
  getOracleCsiNumbers: (state) => {
    const csiNumbers = []

    _.map(state.oracleContracts, (val) => {
      csiNumbers.push(val.csi)
    })
    return csiNumbers
  },
  getOracleReferenceNumbers: (state) => {
    const referenceNumbers = []

    _.map(state.oracleContracts, (val) => {
      referenceNumbers.push(val.referenceNumber)
    })
    return referenceNumbers
  },
  getOracleLicensesTypes: (state) => {
    const licensesTypes = []

    _.map(state.oracleLicensesTypes, (val) => {
      licensesTypes.push({
        id: val.id,
        desc: val.itemDescription,
        metric: val.metric,
        full: `${val.id} - ${val.itemDescription} - ${val.metric}`,
      })
    })

    return licensesTypes
  },
}

export const mutations = {
  SET_ORACLE_CONTRACTS: (state, payload) => {
    state.oracleContracts = setFullPartNumber(payload)
  },
  CREATE_ORACLE_CONTRACTS: (state, payload) => {
    state.oracleContracts.unshift(payload)
  },
  UPDATE_ORACLE_CONTRACTS: (state, payload) => {
    const item = _.find(state.oracleContracts, (val) => val.id === payload.id)
    Object.assign(item, payload)
  },
  DELETE_ORACLE_CONTRACTS: (state, payload) => {
    const index = _.findIndex(
      state.oracleContracts,
      (val) => val.id === payload.id
    )
    state.oracleContracts.splice(index, 1)
  },
  SET_ORACLE_LICENSES_TYPES: (state, payload) => {
    state.oracleLicensesTypes = payload
  },
}

export const actions = {
  async oracleContractsActions({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const url = '/contracts/oracle/database'
    const config = {
      method: payload.action,
      url: url,
    }

    if (payload.action !== 'get' && payload.action !== 'delete') {
      config.data = payload.body
    } else if (payload.action === 'delete') {
      config.url = `${url}/${payload.id}`
    }

    await axiosRequest('baseApi', config).then((res) => {
      if (payload.action === 'post') {
        commit('CREATE_ORACLE_CONTRACTS', res.data)
      } else if (payload.action === 'put') {
        commit('UPDATE_ORACLE_CONTRACTS', res.data)
      } else if (payload.action === 'delete') {
        if (res.status === 200 || res.status === 204) {
          commit('DELETE_ORACLE_CONTRACTS', payload)
        }
      } else {
        commit('SET_ORACLE_CONTRACTS', res.data.contracts)
      }
      dispatch('offLoadingTable')
    })
  },
  async oracleLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: '/settings/oracle/database/license-types',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_ORACLE_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
