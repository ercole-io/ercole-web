import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  oracleLicensesTypes: {},
})

export const getters = {
  getOracleContracts: (state, getters) => {
    return getters.filteredOrNot(getters.getContracts('oracle'))
  },
  getOracleContractsIDs: (state, getters) => {
    const contractNumbers = []

    _.map(getters.getContracts('oracle'), (val) => {
      contractNumbers.push(val.contractID)
    })
    return contractNumbers
  },
  getOracleCsiNumbers: (state, getters) => {
    const csiNumbers = []

    _.map(getters.getContracts('oracle'), (val) => {
      csiNumbers.push(val.csi)
    })
    return csiNumbers
  },
  getOracleReferenceNumbers: (state, getters) => {
    const referenceNumbers = []

    _.map(getters.getContracts('oracle'), (val) => {
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
  getOracleStatus: (state, getters) => {
    const status = []

    _.map(getters.getContracts('oracle'), (val) => {
      status.push(val.status)
    })
    return _.uniq(status)
  },
}

export const mutations = {
  SET_ORACLE_LICENSES_TYPES: (state, payload) => {
    state.oracleLicensesTypes = payload
  },
}

export const actions = {
  async oracleContractsActions({ getters, dispatch }, payload) {
    const params = {
      'older-than': getters.getActiveFilters.date,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location,
    }

    await dispatch('resolveContractsRequest', {
      type: 'oracle',
      payload: payload,
      params: params,
    })
  },
  async oracleLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: 'settings/oracle/database/license-types',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_ORACLE_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
