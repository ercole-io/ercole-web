import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  allTechs: {},
})

export const getters = {
  getAllTechnologies: (state) => {
    return state.allTechs
  },
}

export const mutations = {
  SET_TECHNOLOGIES_DATA: (state, payload) => {
    state.allTechs = payload
  },
}

export const actions = {
  async getTechnologiesData({ commit }) {
    const config = {
      method: 'get',
      url: '/settings/technologies',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_TECHNOLOGIES_DATA', res.data)
    })
  },
}
