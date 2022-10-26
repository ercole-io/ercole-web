import { axiosRequest } from '@/services/services.js'
import _ from 'lodash'

export const state = () => ({
  licensesTypes: {},
})

export const getters = {
  returnMetricAndDescription: (state) => (licenseID) => {
    let description = null
    let metric = null

    _.filter(state.licensesTypes, (val) => {
      if (val.id === licenseID) {
        description = val.itemDescription
        metric = val.metric
      }
    })

    return {
      description: description,
      metric: metric,
    }
  },
  returnLicensesTypes: (state) => {
    const licensesTypes = []

    _.map(state.licensesTypes, (val) => {
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
  SET_LICENSES_TYPES: (state, payload) => {
    state.licensesTypes = payload
  },
}

export const actions = {
  async getLicensesTypes({ commit }) {
    const config = {
      method: 'get',
      url: 'settings/oracle/database/license-types',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_LICENSES_TYPES', res.data['license-types'])
    })
  },
}
