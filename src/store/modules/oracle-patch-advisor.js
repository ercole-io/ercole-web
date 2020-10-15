import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  patchAdvisor: []
})

export const getters = {
  getOraclePatchAdvisor: state => {
    return state.patchAdvisor
  }
}

export const mutations = {
  SET_PATCH_ADVISOR: (state, payload) => {
    state.patchAdvisor = payload
  }
}

export const actions = {
  async getPatchAdvisor({ commit, getters }) {
    const patchAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/patch-advisors',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await patchAdvisor.data
    commit('SET_PATCH_ADVISOR', response)
  }
}
