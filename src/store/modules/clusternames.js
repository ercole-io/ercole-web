import _ from 'lodash'
import axiosNoLoading from '@/axios/axios-no-loading.js'

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
  async getClusters({ commit }) {
    const clustersData = await axiosNoLoading.get('/hosts/clusters')

    const response = await clustersData.data
    if (response) {
      commit('SET_CLUSTERNAMES', response)
    }
  },
}
