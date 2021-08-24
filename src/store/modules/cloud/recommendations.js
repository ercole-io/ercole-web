import axiosOci from '@/axios/axios-oci'
// import recommendations from '@/views/cloud/recommendations.json'

export const state = () => ({
  recommendations: []
})

export const getters = {
  getRecommendations: (state, getters) => {
    return getters.filteredOrNot(state.recommendations)
  }
}

export const mutations = {
  SET_RECOMMENDATIONS: (state, payload) => {
    state.recommendations = payload
  }
}

export const actions = {
  async getRecommendationsData({ commit, getters }) {
    const recommendations = await axiosOci.get('/GetOCRecommendations', {
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location
      }
    })
    const response = await recommendations
    console.log(response)
    commit('SET_RECOMMENDATIONS', response)
  }
}
