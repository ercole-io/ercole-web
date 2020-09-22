import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  licensesAgreement: [
    {
      id: 0,
      agreeNumber: 5051863,
      partNumber: 'L75978',
      description: 'Oracle GoldenGate',
      metrics: 'Processor Perpetual',
      csi: 19765174,
      referenceNumber: 103246681,
      ula: 'no',
      licenseNumber: 72,
      userNumber: null,
      availableNumber: 60,
      hostAssociated: [
        {
          id: 0,
          hostname: 'erclin6db18',
          usedLicenses: 4
        },
        {
          id: 0,
          hostname: 'erclin7dbx',
          usedLicenses: 8
        }
      ]
    },
    {
      id: 2,
      agreeNumber: 5051863,
      partNumber: 'L75978',
      description: 'Oracle GoldenGate',
      metrics: 'Processor Perpetual',
      csi: 19765174,
      referenceNumber: 103246681,
      ula: 'no',
      licenseNumber: 72,
      userNumber: null,
      availableNumber: 60,
      hostAssociated: [
        {
          id: 0,
          hostname: 'erclin6db18',
          usedLicenses: 4
        },
        {
          id: 0,
          hostname: 'erclin7dbx',
          usedLicenses: 8
        }
      ]
    }
  ],
  agreementParts: {}
})

export const getters = {
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
    state.licensesAgreement.push(payload)
  },
  SET_AGREEMENT_PARTS: (state, payload) => {
    state.agreementParts = payload
  }
}

export const actions = {
  async getLicensesAgreement({ commit }) {
    const agreementList = await axiosDefault.get('/agreements/oracle/database')
    const response = await agreementList.data

    if (response.length > 0) {
      commit('SET_LICENSE_AGREEMENT', response)
    }
  },
  async getAgreementParts({ commit }) {
    const agreementParts = await axiosDefault.get(
      '/settings/oracle/database/agreements-parts'
    )
    const response = await agreementParts.data

    commit('SET_AGREEMENT_PARTS', response)
  }
}
