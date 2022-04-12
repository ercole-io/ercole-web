import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { setFullPartNumber } from '@/helpers/helpers.js'

export const state = () => ({
  oracleContracts: [],
  mysqlContracts: [],
})

export const getters = {
  returnLicensesContracts: (state, getters) => (type) => {
    return getters.filteredOrNot(state[type + 'Contracts'])
  },
  // getLicenseAgreementHostAssociated: state => id => {
  //   const findHostAssociated = _.find(state.oracleContracts, val => {
  //     return val.id === id
  //   })
  //   const hostsAssociated = findHostAssociated.hosts
  //   return hostsAssociated
  // },
  returnContractIDs: (state) => {
    const contractNumbers = []

    _.map(state.oracleContracts, (val) => {
      contractNumbers.push(val.contractID)
    })
    return contractNumbers
  },
  returnCsiNumbers: (state) => {
    const csiNumbers = []

    _.map(state.oracleContracts, (val) => {
      csiNumbers.push(val.csi)
    })
    return csiNumbers
  },
  returnReferenceNumbers: (state) => {
    const referenceNumbers = []

    _.map(state.oracleContracts, (val) => {
      referenceNumbers.push(val.referenceNumber)
    })
    return referenceNumbers
  },
}

export const mutations = {
  SET_CONTRACTS: (state, payload) => {
    state[payload.type + 'Contracts'] =
      payload.type === 'oracle' ? setFullPartNumber(payload.res) : payload.res
  },
  CREATE_CONTRACT: (state, payload) => {
    state[payload.mode + 'Contracts'].unshift(payload)
  },
  UPDATE_CONTRACT: (state, payload) => {
    const item = _.find(
      state[payload.mode + 'Contracts'],
      (val) => val.id === payload.id
    )
    Object.assign(item, payload)
  },
  DELETE_AGREEMENT: (state, payload) => {
    const index = _.findIndex(
      state[payload.type + 'Contracts'],
      (val) => val.id === payload.id
    )
    state[payload.type + 'Contracts'].splice(index, 1)
  },
}

export const actions = {
  async getLicensesContracts({ commit, dispatch }, type) {
    dispatch('onLoadingTable')
    let contractList = await axiosNoLoading.get(`/contracts/${type}/database`)

    const response = await contractList.data.contracts
    if (response) {
      if (type === 'mysql') {
        dispatch('onLoadingTable')
        commit('SET_CONTRACTS', { res: response, type: type })
      } else {
        commit('SET_CONTRACTS', { res: response, type: type })
        dispatch('offLoadingTable')
      }
    }
  },
  async createLicenseContract({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const create = await axiosNoLoading.post(
      `/contracts/${payload.type}/database`,
      payload.body
    )
    let response = await create.data
    response = { ...response, mode: payload.type }

    if (response) {
      commit('CREATE_CONTRACT', response)
      dispatch('offLoadingTable')
    }
  },
  async updateLicenseContract({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    let data
    if (payload.type === 'mysql') {
      await axiosNoLoading
        .put(
          `/contracts/${payload.type}/database/${payload.body.id}`,
          payload.body
        )
        .then((res) => {
          data = res.data
        })
    } else if (payload.type === 'oracle') {
      await axiosNoLoading
        .put(`/contracts/${payload.type}/database`, payload.body)
        .then((res) => {
          data = res.data
        })
    }

    data = { ...data, mode: payload.type }

    if (data) {
      commit('UPDATE_CONTRACT', data)
      dispatch('offLoadingTable')
    }
  },
  async deleteLicenseContract({ dispatch }, payload) {
    dispatch('onLoadingTable')
    const deleteContract = await axiosNoLoading.delete(
      `/contracts/${payload.type}/database/${payload.id}`
    )
    const response = await deleteContract
    if (response.status === 204) {
      dispatch('offLoadingTable')
    }
  },
}
