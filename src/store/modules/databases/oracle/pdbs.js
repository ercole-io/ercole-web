import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
// import pdbsData from '@/store/modules/databases/oracle/pdbs.json'

export const state = () => ({
  pdbs: [],
})

export const getters = {
  getOraclePdbs: (state) => {
    const pdbs = _.groupBy(state.pdbs, 'hostname')
    return pdbs
  },
}

export const mutations = {
  SET_PDBS: (state, payload) => {
    state.pdbs = payload
  },
}

export const actions = {
  async getPdbs({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/pdbs',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_PDBS', res.data)
      // if (res.data.length > 0) {
      //   commit('SET_PDBS', res.data)
      // } else {
      //   commit('SET_PDBS', pdbsData)
      // }
    })
  },
}