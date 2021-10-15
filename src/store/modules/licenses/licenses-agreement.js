import _ from 'lodash'
import axiosDefault from '@/axios/axios-default.js'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  oracleAgreements: [],
  mysqlAgreements: []
})

export const getters = {
  returnLicensesAgreement: (state, getters) => type => {
    return getters.filteredOrNot(state[type + 'Agreements'])
  },
  // getLicenseAgreementHostAssociated: state => id => {
  //   const findHostAssociated = _.find(state.oracleAgreements, val => {
  //     return val.id === id
  //   })
  //   const hostsAssociated = findHostAssociated.hosts
  //   return hostsAssociated
  // },
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
      payload.type === 'oracle' ? setFullPartNumber(payload.res) : payload.res
  },
  CREATE_AGREEMENT: (state, payload) => {
    state[payload.mode + 'Agreements'].unshift(payload)
  },
  UPDATE_AGREEMENTS: (state, payload) => {
    const item = _.find(
      state[payload.mode + 'Agreements'],
      val => val.id === payload.id
    )
    Object.assign(item, payload)
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
  async getLicensesAgreement({ commit }, type, noLoading = null) {
    let agreementList = null

    if (noLoading) {
      agreementList = await axiosNoLoading.get(`/agreements/${type}/database`)
    } else {
      agreementList = await axiosDefault.get(`/agreements/${type}/database`)
    }

    const response = await agreementList.data.agreements

    commit('SET_AGREEMENTS', { res: response, type: type })
  },
  async createLicenseAgreement({ commit }, payload) {
    const create = await axiosDefault.post(
      `/agreements/${payload.type}/database`,
      payload.body
    )
    let response = await create.data
    response = { ...response, mode: payload.type }

    commit('CREATE_AGREEMENT', response)
  },
  async updateLicenseAgreement({ commit }, payload) {
    let data
    if (payload.type === 'mysql') {
      await axiosDefault
        .put(
          `/agreements/${payload.type}/database/${payload.body.id}`,
          payload.body
        )
        .then(res => {
          data = res.data
        })
    } else if (payload.type === 'oracle') {
      await axiosDefault
        .put(`/agreements/${payload.type}/database`, payload.body)
        .then(res => {
          data = res.data
        })
    }

    data = { ...data, mode: payload.type }
    commit('UPDATE_AGREEMENTS', data)
  },
  async deleteLicenseAgreement(context, payload) {
    await axiosDefault.delete(
      `/agreements/${payload.type}/database/${payload.id}`
    )
  }
}
