import axiosDefault from '../../axios/axios-default'

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
  async getSegmentAdvisor({ commit }) {
    const loc = JSON.parse(localStorage.getItem('globalFilters')).location
    const env = JSON.parse(localStorage.getItem('globalFilters')).environment
    const date = JSON.parse(localStorage.getItem('globalFilters')).date

    const segmentAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/segment-advisors',
      {
        params: {
          'older-than': date,
          environment: env,
          location: loc
        }
      }
    )
    const response = await segmentAdvisor.data
    commit('SET_SEGMENT_ADVISOR', response)
  }
}
