import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import toLower from '@/filters/toLower.js'

export const state = () => ({
  mysqlLicensesTypes: [],
})

export const getters = {
  getMysqlContracts: (state, getters) => {
    const contracts = []
    _.map(getters.getContracts('mysql'), (val) => {
      contracts.push({ ...val, type: toLower(val.type) })
    })

    return getters.filteredOrNot(contracts)
  },
  getMysqlLicensesTypes: (state) => {
    console.log(state.mysqlLicensesTypes)
    // const licensesTypes = []

    // _.map(state.microsoftLicensesTypes, (val) => {
    //   licensesTypes.push({
    //     id: val.id,
    //     desc: val.itemDescription,
    //     version: val.version,
    //     edition: val.edition,
    //     full: `${val.id} - ${val.itemDescription} - ${val.edition} - ${val.version}`,
    //   })
    // })

    // return licensesTypes
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
  async microsoftLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: '/settings/mysql/database/license-types',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_MYSQL_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
