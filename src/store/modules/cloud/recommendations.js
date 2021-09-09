import _ from 'lodash'
import axiosOci from '@/axios/axios-oci'

export const state = () => ({
  recommendations: []
})

export const getters = {
  getRecommendations: (state, getters) => {
    const recommendations = state.recommendations

    let mapRecommendations = []
    _.map(recommendations, item => {
      mapRecommendations.push({
        costSaving: _.toNumber(item.estimatedCostSaving),
        importance: item.importance,
        name: item.name,
        pending: _.toNumber(item.numPending),
        recID: item.recommendationId,
        status: item.status
      })
    })

    return getters.filteredOrNot(mapRecommendations)
  }
}

export const mutations = {
  SET_RECOMMENDATIONS: (state, payload) => {
    state.recommendations = payload
  }
}

export const actions = {
  async getRecommendationsData({ commit }) {
    const recommendations = await axiosOci.get('/GetOCRecommendations')
    const response = await recommendations.data

    commit('SET_RECOMMENDATIONS', response)
  }
}
