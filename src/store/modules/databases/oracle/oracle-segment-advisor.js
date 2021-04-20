import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  segmentAdvisor: []
})

export const getters = {
  getOracleSegmentAdvisor: state => {
    return state.segmentAdvisor
  }
}

export const mutations = {
  SET_SEGMENT_ADVISOR: (state, payload) => {
    state.segmentAdvisor = payload
  }
}

export const actions = {
  async getSegmentAdvisor({ commit, getters }) {
    const segmentAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/segment-advisors',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await segmentAdvisor.data.segmentAdvisors
    commit('SET_SEGMENT_ADVISOR', response)
  }
}
