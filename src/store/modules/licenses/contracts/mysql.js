import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import { setFullPartNumber } from '@/helpers/helpers.js'
import toLower from '@/filters/toLower.js'

export const state = () => ({
  mysqlLicensesTypes: [],
})

export const getters = {
  getMysqlContracts: (state, getters) => {
    let contracts = []
    _.forEach(state.mysqlLicensesTypes, (type) => {
      _.map(getters.getContracts('mysql'), (val) => {
        if (type.id === val.licenseTypeID) {
          contracts.push({
            ...val,
            type: toLower(val.type),
            licenseTypeID: type.id,
            description: type.itemDescription,
          })
        }
      })
    })

    return getters.filteredOrNot(setFullPartNumber(contracts))
  },
  getMysqlLicensesTypes: (state) => {
    const licensesTypes = []

    _.map(state.mysqlLicensesTypes, (val) => {
      licensesTypes.push({
        id: val.id,
        desc: val.itemDescription,
        full: `${val.id} - ${val.itemDescription}`,
      })
    })

    return licensesTypes
  },
}

export const mutations = {
  SET_MYSQL_LICENSES_TYPES: (state, payload) => {
    state.mysqlLicensesTypes = payload
  },
}

export const actions = {
  async mysqlContractsActions({ dispatch }, payload) {
    await dispatch('resolveContractsRequest', {
      type: 'mysql',
      payload: payload,
    })
  },
  async mysqlLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: '/settings/mysql/database/license-types',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_MYSQL_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
