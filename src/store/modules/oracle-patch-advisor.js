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
  async getPatchAdvisor({ commit }) {
    const loc = JSON.parse(localStorage.getItem('globalFilters')).location
    const env = JSON.parse(localStorage.getItem('globalFilters')).environment
    const date = JSON.parse(localStorage.getItem('globalFilters')).date

    const patchAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/patch-advisors',
      {
        params: {
          'older-than': date,
          environment: env,
          location: loc
        }
      }
    )
    const response = await patchAdvisor.data
    commit('SET_PATCH_ADVISOR', response)
  }
}
