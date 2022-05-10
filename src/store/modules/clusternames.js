import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  clusternames: [],
})

export const getters = {
  getClusternames: (state) => {
    return state.clusternames
  },
}

export const mutations = {
  SET_CLUSTERNAMES: (state, payload) => {
    state.clusternames = _.map(payload, (cluster) => {
      return cluster.name
    })
  },
}

export const actions = {
  async getClusterNames({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts/clusters',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_CLUSTERNAMES', res.data)
    })
  },
}
