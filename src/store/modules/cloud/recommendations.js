import recommendations from '@/views/cloud/recommendations.json'

export const state = () => ({
  recommendations: []
})

export const mutations = {
  SET_RECOMMENDATIONS: (state, payload) => {
    state.recommendations = payload
  }
}

export const actions = {
  async getRecommendationsData({ commit }) {
    const response = await recommendations
    commit('SET_RECOMMENDATIONS', response)
  }
}
