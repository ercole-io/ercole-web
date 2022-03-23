import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  oracleAgreements: [],
  mysqlAgreements: [],
})

export const getters = {
  returnLicensesAgreement: (state, getters) => (type) => {
    return getters.filteredOrNot(state[type + 'Agreements'])
  },
  // getLicenseAgreementHostAssociated: state => id => {
  //   const findHostAssociated = _.find(state.oracleAgreements, val => {
  //     return val.id === id
  //   })
  //   const hostsAssociated = findHostAssociated.hosts
  //   return hostsAssociated
  // },
  returnAgreeNumbers: (state) => {
    const agreeNumbers = []

    _.map(state.oracleAgreements, (val) => {
      agreeNumbers.push(val.agreementID)
    })
    return agreeNumbers
  },
  returnCsiNumbers: (state) => {
    const csiNumbers = []

    _.map(state.oracleAgreements, (val) => {
      csiNumbers.push(val.csi)
    })
    return csiNumbers
  },
  returnReferenceNumbers: (state) => {
    const referenceNumbers = []

    _.map(state.oracleAgreements, (val) => {
      referenceNumbers.push(val.referenceNumber)
    })
    return referenceNumbers
  },
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
      (val) => val.id === payload.id
    )
    Object.assign(item, payload)
  },
  DELETE_AGREEMENT: (state, payload) => {
    const index = _.findIndex(
      state[payload.type + 'Agreements'],
      (val) => val.id === payload.id
    )
    state[payload.type + 'Agreements'].splice(index, 1)
  },
}

export const actions = {
  async getLicensesAgreement({ commit, dispatch }, type, noLoading = null) {
    let agreementList = null

    if (noLoading) {
      agreementList = await axiosNoLoading.get(`/agreements/${type}/database`)
    } else {
      dispatch('onLoadingTable')
      agreementList = await axiosNoLoading.get(`/agreements/${type}/database`)
    }

    const response = await agreementList.data.agreements
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_AGREEMENTS', { res: response, type: type })
    }
  },
  async createLicenseAgreement({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const create = await axiosNoLoading.post(
      `/agreements/${payload.type}/database`,
      payload.body
    )
    let response = await create.data
    if (response) {
      response = { ...response, mode: payload.type }
      dispatch('offLoadingTable')
      commit('CREATE_AGREEMENT', response)
    }
  },
  async updateLicenseAgreement({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    let data
    if (payload.type === 'mysql') {
      await axiosNoLoading
        .put(
          `/agreements/${payload.type}/database/${payload.body.id}`,
          payload.body
        )
        .then((res) => {
          data = res.data
        })
    } else if (payload.type === 'oracle') {
      await axiosNoLoading
        .put(`/agreements/${payload.type}/database`, payload.body)
        .then((res) => {
          data = res.data
        })
    }

    if (data) {
      data = { ...data, mode: payload.type }
      dispatch('offLoadingTable')
      commit('UPDATE_AGREEMENTS', data)
    }
  },
  async deleteLicenseAgreement({ dispatch }, payload) {
    dispatch('onLoadingTable')
    const delAgreement = await axiosNoLoading.delete(
      `/agreements/${payload.type}/database/${payload.id}`
    )
    const response = await delAgreement
    if (response.status === 200) {
      dispatch('offLoadingTable')
    }
  },
}
