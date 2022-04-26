import _ from 'lodash'
import axiosOciNoLoading from '@/axios/axios-oci-no-loading.js'

export const state = () => ({
  recommendations: [],
})

export const getters = {
  getRecommendations: (state, getters) => {
    const recommendations = state.recommendations

    let mapRecommendations = []
    _.map(recommendations, (item) => {
      mapRecommendations.push({
        costSaving: _.toNumber(item.estimatedCostSaving),
        importance: item.importance,
        name: item.name,
        pending: _.toNumber(item.numPending),
        recID: item.recommendationId,
        status: item.status,
        tenOCID: item.tenancyOCID,
      })
    })

    return getters.filteredOrNot(mapRecommendations)
  },
}

export const mutations = {
  SET_RECOMMENDATIONS: (state, payload) => {
    state.recommendations = payload
  },
}

export const actions = {
  async getRecommendationsData({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')
    let response = null
    let error = null

    if (getters.getOciActiveProfiles.length > 0) {
      const recommendations = await axiosOciNoLoading.get(
        `/oracle-cloud/recommendations/${getters.getOciActiveProfiles}`
      )
      response = await recommendations.data.recommendations
      error = await recommendations.data.error
    } else {
      ;(response = []), (error = '')
    }

    if (response) {
      commit('SET_RECOMMENDATIONS', response)
      commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
      dispatch('offLoadingTable')
    }
  },
}
