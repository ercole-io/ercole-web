import axiosNoLoading from '@/axios/axios-no-loading.js'

export const state = () => ({
  allTechs: {}
})

export const getters = {
  getAllTechnologies: state => {
    return state.allTechs
  }
}

export const mutations = {
  SET_TECHNOLOGIES_DATA: (state, payload) => {
    state.allTechs = payload
  }
}

export const actions = {
  async getTechnologiesData({ commit }) {
    const techData = await axiosNoLoading.get('/settings/technologies')
    const response = await techData.data

    commit('SET_TECHNOLOGIES_DATA', response)
  }
}
