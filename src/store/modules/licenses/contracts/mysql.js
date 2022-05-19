import _ from 'lodash'
import toLower from '@/filters/toLower.js'

export const state = () => ({})

export const getters = {
  getMysqlContracts: (state, getters) => {
    const contracts = []
    _.map(getters.getContracts('mysql'), (val) => {
      contracts.push({ ...val, type: toLower(val.type) })
    })

    return getters.filteredOrNot(contracts)
  },
}

export const mutations = {}

export const actions = {
  async mysqlContractsActions({ dispatch }, payload) {
    await dispatch('resolveContractsRequest', {
      type: 'mysql',
      payload: payload,
    })
  },
}
