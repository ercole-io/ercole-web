// import _ from 'lodash'
// import { axiosRequest } from '@/services/services.js'
// import { setFullPartNumber } from '@/helpers/helpers.js'

// export const state = () => ({
//   oracleContracts: [],
//   mysqlContracts: [],
// })

// export const getters = {
//   returnLicensesContracts: (state, getters) => (type) => {
//     return getters.filteredOrNot(state[type + 'Contracts'])
//   },
//   returnContractIDs: (state) => {
//     const contractNumbers = []

//     _.map(state.oracleContracts, (val) => {
//       contractNumbers.push(val.contractID)
//     })
//     return contractNumbers
//   },
//   returnCsiNumbers: (state) => {
//     const csiNumbers = []

//     _.map(state.oracleContracts, (val) => {
//       csiNumbers.push(val.csi)
//     })
//     return csiNumbers
//   },
//   returnReferenceNumbers: (state) => {
//     const referenceNumbers = []

//     _.map(state.oracleContracts, (val) => {
//       referenceNumbers.push(val.referenceNumber)
//     })
//     return referenceNumbers
//   },
// }

// export const mutations = {
//   SET_CONTRACTS: (state, payload) => {
//     state[payload.type + 'Contracts'] =
//       payload.type === 'oracle' ? setFullPartNumber(payload.res) : payload.res
//   },
//   CREATE_CONTRACT: (state, payload) => {
//     state[payload.mode + 'Contracts'].unshift(payload)
//   },
//   UPDATE_CONTRACT: (state, payload) => {
//     const item = _.find(
//       state[payload.mode + 'Contracts'],
//       (val) => val.id === payload.id
//     )
//     Object.assign(item, payload)
//   },
//   DELETE_AGREEMENT: (state, payload) => {
//     const index = _.findIndex(
//       state[payload.type + 'Contracts'],
//       (val) => val.id === payload.id
//     )
//     state[payload.type + 'Contracts'].splice(index, 1)
//   },
// }

// export const actions = {
//   async getLicensesContracts({ commit, dispatch }, type) {
//     dispatch('onLoadingTable')

//     const config = {
//       method: 'get',
//       url: `/contracts/${type}/database`,
//     }

//     await axiosRequest('baseApi', config).then((res) => {
//       if (type === 'mysql') {
//         dispatch('onLoadingTable')
//         commit('SET_CONTRACTS', { res: res.data.contracts, type: type })
//       } else {
//         commit('SET_CONTRACTS', { res: res.data.contracts, type: type })
//         dispatch('offLoadingTable')
//       }
//     })
//   },
//   async createLicenseContract({ commit, dispatch }, payload) {
//     dispatch('onLoadingTable')

//     const config = {
//       method: 'post',
//       url: `/contracts/${payload.type}/database`,
//       data: payload.body,
//     }

//     await axiosRequest('baseApi', config).then((res) => {
//       let response = res.data
//       response = { ...response, mode: payload.type }

//       if (response) {
//         commit('CREATE_CONTRACT', response)
//         dispatch('offLoadingTable')
//       }
//     })
//   },
//   async updateLicenseContract({ commit, dispatch }, payload) {
//     dispatch('onLoadingTable')

//     const oracleUrl = `/contracts/${payload.type}/database`
//     const mySqlUrl = `/contracts/${payload.type}/database/${payload.body.id}`

//     const config = {
//       method: 'put',
//       data: payload.body,
//     }

//     if (payload.type === 'mysql') {
//       config.url = mySqlUrl
//     } else if (payload.type === 'oracle') {
//       config.url = oracleUrl
//     }

//     await axiosRequest('baseApi', config).then((res) => {
//       let response = res.data
//       response = { ...response, mode: payload.type }

//       commit('UPDATE_CONTRACT', response)
//       dispatch('offLoadingTable')
//     })
//   },
//   async deleteLicenseContract({ dispatch }, payload) {
//     dispatch('onLoadingTable')

//     const config = {
//       method: 'delete',
//       url: `/contracts/${payload.type}/database/${payload.id}`,
//     }

//     await axiosRequest('baseApi', config).then((res) => {
//       if (res.status === 200 || res.status === 204) {
//         dispatch('offLoadingTable')
//       }
//     })
//   },
// }
