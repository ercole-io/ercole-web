import axiosDefault from '@/axios/axios-default.js'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'

export const state = () => ({
  oracleAgreements: [],
  mysqlAgreements: []
})

export const getters = {
  getLicenseAgreementHostAssociated: state => id => {
    const findHostAssociated = _.find(state.oracleAgreements, val => {
      return val.id === id
    })
    const hostsAssociated = findHostAssociated.hosts
    return hostsAssociated
  },
  returnLicensesAgreement: state => type => {
    return state[type + 'Agreements']
  },
  returnAgreeNumbers: state => {
    const agreeNumbers = []

    _.map(state.oracleAgreements, val => {
      agreeNumbers.push(val.agreementID)
    })
    return agreeNumbers
  },
  returnCsiNumbers: state => {
    const csiNumbers = []

    _.map(state.oracleAgreements, val => {
      csiNumbers.push(val.csi)
    })
    return csiNumbers
  },
  returnReferenceNumbers: state => {
    const referenceNumbers = []

    _.map(state.oracleAgreements, val => {
      referenceNumbers.push(val.referenceNumber)
    })
    return referenceNumbers
  }
}

export const mutations = {
  SET_AGREEMENTS: (state, payload) => {
    state[payload.type + 'Agreements'] =
      payload.type === 'oracle' ? payload.res : payload.res.agreements
  },
  CREATE_AGREEMENT: (state, payload) => {
    state[payload.type + 'Agreements'].unshift(payload.body)
  },
  UPDATE_AGREEMENTS: (state, payload) => {
    const item = _.find(
      state[payload.type + 'Agreements'],
      val => val.id === payload.body.id
    )
    Object.assign(item, payload.body)
  },
  DELETE_AGREEMENT: (state, payload) => {
    const index = _.findIndex(
      state[payload.type + 'Agreements'],
      val => val.id === payload.id
    )
    state[payload.type + 'Agreements'].splice(index, 1)
  }
}

export const actions = {
  async getLicensesAgreement({ commit, dispatch }, type, noLoading = null) {
    dispatch('getAgreementParts')
    let agreementList = null

    if (noLoading) {
      agreementList = await axiosNoLoading.get(`/agreements/${type}/database`)
    } else {
      agreementList = await axiosDefault.get(`/agreements/${type}/database`)
    }

    const response = await agreementList.data

    commit('SET_AGREEMENTS', { res: response, type: type })
  },
  async createLicenseAgreement({ commit }, payload) {
    const create = await axiosDefault.post(
      `/agreements/${payload.type}/database`,
      payload.body
    )
    const response = await create.data
    payload.body.id = response

    commit('CREATE_AGREEMENT', payload)
  },
  async updateLicenseAgreement({ commit }, payload) {
    if (payload.type === 'mysql') {
      await axiosDefault.put(
        `/agreements/${payload.type}/database/${payload.body.id}`,
        payload.body
      )
    } else if (payload.type === 'oracle') {
      await axiosDefault.put(
        `/agreements/${payload.type}/database`,
        payload.body
      )
    }

    commit('UPDATE_AGREEMENTS', payload)
  },
  async deleteAgreement(context, payload) {
    await axiosDefault.delete(
      `/agreements/${payload.type}/database/${payload.id}`
    )
  }
}
