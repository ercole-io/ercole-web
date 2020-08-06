import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  patchAdvisor: {}
})

export const getters = {}

export const mutations = {
  SET_PATCH_ADVISOR: (state, payload) => {
    state.patchAdvisor = payload
  }
}

export const actions = {
  async getPatchAdvisor({ commit }) {
    const patchAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/patch-advisors'
    )
    const response = await patchAdvisor.data
    commit('SET_PATCH_ADVISOR', response)
  }
}
