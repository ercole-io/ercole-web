import axiosNoLoading from '@/axios/axios-no-loading.js'
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
    const licensesTypes = await axiosNoLoading.get(
      '/settings/oracle/database/license-types'
    )
    const response = await licensesTypes.data['license-types']

    commit('SET_LICENSES_TYPES', response)
  },
}
