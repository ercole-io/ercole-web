import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  licensesAgreement: [],
  agreementParts: {}
})

export const getters = {
  returnLicensesAgreement: state => {
    return state.licensesAgreement
  },
  returnAgreementParts: state => {
    const agreeParts = []

    _.map(state.agreementParts, val => {
      agreeParts.push({
        agreeParts: `${val.partID} - ${val.itemDescription} - ${val.metrics}`
      })
    })

    return agreeParts
  }
}

export const mutations = {
  SET_LICENSE_AGREEMENT: (state, payload) => {
    state.licensesAgreement = payload
  },
  SET_AGREEMENT_PARTS: (state, payload) => {
    state.agreementParts = payload
  }
}

export const actions = {
  async getLicensesAgreement({ commit }) {
    const agreementList = await axiosDefault.get('/agreements/oracle/database')
    const response = await agreementList.data

    commit('SET_LICENSE_AGREEMENT', response)
  },
  async getAgreementParts({ commit }) {
    const agreementParts = await axiosDefault.get(
      '/settings/oracle/database/agreements-parts'
    )
    const response = await agreementParts.data

    commit('SET_AGREEMENT_PARTS', response)
  }
}
