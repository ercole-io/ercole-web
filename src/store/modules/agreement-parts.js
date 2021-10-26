import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'

export const state = () => ({
  agreementParts: {}
})

export const getters = {
  returnMetricAndDescription: state => licenseID => {
    let description = null
    let metric = null

    _.filter(state.agreementParts, val => {
      if (val.id === licenseID) {
        description = val.itemDescription
        metric = val.metric
      }
    })

    return {
      description: description,
      metric: metric
    }
  },
  returnAgreementParts: state => {
    const agreeParts = []

    _.map(state.agreementParts, val => {
      agreeParts.push({
        id: val.id,
        desc: val.itemDescription,
        metric: val.metric,
        full: `${val.id} - ${val.itemDescription} - ${val.metric}`
      })
    })

    return agreeParts
  }
}

export const mutations = {
  SET_AGREEMENT_PARTS: (state, payload) => {
    state.agreementParts = payload
  }
}

export const actions = {
  async getAgreementParts({ commit }) {
    const agreementParts = await axiosNoLoading.get(
      '/settings/oracle/database/license-types'
    )
    const response = await agreementParts.data['license-types']
    console.log(response)
    commit('SET_AGREEMENT_PARTS', response)
  }
}
