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
        status: item.status,
        tenOCID: item.tenancyOCID
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
  async getRecommendationsData({ commit, getters }) {
    let response = null

    if (getters.getOciActiveProfiles.length > 0) {
      const recommendations = await axiosOci.get(
        `/oracle-cloud/recommendations/${getters.getOciActiveProfiles}`
      )
      response = await recommendations.data.recommendations
    } else {
      response = []
    }

    commit('SET_RECOMMENDATIONS', response)
  }
}
