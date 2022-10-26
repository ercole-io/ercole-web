import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import { setFullPartNumber } from '@/helpers/helpers.js'
import { removeDashFromMsDesc } from '@/helpers/licenses.js'
import toLower from '@/filters/toLower.js'

export const state = () => ({
  microsoftLicensesTypes: [],
})

export const getters = {
  getMicrosoftContracts: (state, getters) => {
    let contracts = []
    _.forEach(state.microsoftLicensesTypes, (type) => {
      _.map(getters.getContracts('microsoft'), (val) => {
        if (type.id === val.licenseTypeID) {
          contracts.push({
            ...val,
            type: toLower(val.type),
            licenseTypeID: type.id,
            description: removeDashFromMsDesc(type.itemDescription),
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
      const desc = removeDashFromMsDesc(val.itemDescription)
      licensesTypes.push({
        id: val.id,
        desc: desc,
        version: val.version,
        edition: val.edition,
        full: `${val.id} - ${desc} - ${val.edition} - ${val.version}`,
      })
    })

    return licensesTypes
  },
}

export const mutations = {
  SET_MICROSOFT_LICENSES_TYPES: (state, payload) => {
    state.microsoftLicensesTypes = payload
  },
}

export const actions = {
  async microsoftContractsActions({ dispatch }, payload) {
    await dispatch('resolveContractsRequest', {
      type: 'microsoft',
      payload: payload,
    })
  },
  async microsoftLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: 'settings/microsoft/database/license-types',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_MICROSOFT_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
