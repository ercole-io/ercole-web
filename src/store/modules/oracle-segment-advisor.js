import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  segmentAdvisor: {}
})

export const getters = {}

export const mutations = {
  SET_SEGMENT_ADVISOR: (state, payload) => {
    state.segmentAdvisor = payload
  }
}

export const actions = {
  async getSegmentAdvisor({ commit }) {
    const segmentAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/segment-advisors'
    )
    const response = await segmentAdvisor.data
    commit('SET_SEGMENT_ADVISOR', response)
  }
}
