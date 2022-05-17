import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import { setFullPartNumber } from '@/helpers/helpers.js'
import toLower from '@/filters/toLower.js'

export const state = () => ({
  microsoftContracts: [],
  microsoftLicensesTypes: [],
})

export const getters = {
  getMicrosoftContracts: (state, getters) => {
    let contracts = []
    _.forEach(state.microsoftLicensesTypes, (type) => {
      _.map(state.microsoftContracts, (val) => {
        if (type.id === val.licenseTypeID) {
          contracts.push({
            ...val,
            type: toLower(val.type),
            licenseTypeID: type.id,
            description: type.itemDescription,
            metric: `${type.edition} - ${type.version}`,
          })
        }
      })
    })

    return getters.filteredOrNot(setFullPartNumber(contracts))
  },
  getMicrosoftLicensesTypes: (state) => {
    const licensesTypes = []

    _.map(state.microsoftLicensesTypes, (val) => {
      licensesTypes.push({
        id: val.id,
        desc: val.itemDescription,
        version: val.version,
        edition: val.edition,
        full: `${val.id} - ${val.itemDescription} - ${val.edition} - ${val.version}`,
      })
    })

    return licensesTypes
  },
}

export const mutations = {
  SET_MICROSOFT_CONTRACTS: (state, payload) => {
    state.microsoftContracts = payload
  },
  CREATE_MICROSOFT_CONTRACTS: (state, payload) => {
    state.microsoftContracts.unshift(payload)
  },
  UPDATE_MICROSOFT_CONTRACTS: (state, payload) => {
    const item = _.find(
      state.microsoftContracts,
      (val) => val.id === payload.id
    )
    Object.assign(item, payload)
  },
  DELETE_MICROSOFT_CONTRACTS: (state, payload) => {
    const index = _.findIndex(
      state.microsoftContracts,
      (val) => val.id === payload.id
    )
    state.microsoftContracts.splice(index, 1)
  },
  SET_MICROSOFT_LICENSES_TYPES: (state, payload) => {
    state.microsoftLicensesTypes = payload
  },
}

export const actions = {
  async microsoftContractsActions({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const url = '/contracts/microsoft/database'
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
        commit('CREATE_MICROSOFT_CONTRACTS', res.data)
      } else if (payload.action === 'put') {
        commit('UPDATE_MICROSOFT_CONTRACTS', res.data)
      } else if (payload.action === 'delete') {
        if (res.status === 200 || res.status === 204) {
          commit('DELETE_MICROSOFT_CONTRACTS', payload)
        }
      } else {
        commit('SET_MICROSOFT_CONTRACTS', res.data.contracts)
      }
      dispatch('offLoadingTable')
    })
  },
  async microsoftLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: '/settings/microsoft/database/license-types',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_MICROSOFT_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
