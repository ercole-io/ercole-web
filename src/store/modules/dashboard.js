import axiosDefault from '../../axios/axios-default.js'

export const state = () => ({
  dashData: null
})

export const getters = {}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.dashData = payload
  }
}

export const actions = {
  getDashboardData({ commit }) {
    return axiosDefault.get('/frontend/dashboard').then(res => {
      commit('SET_DASHBOARD_DATA', res.data)
    })
  }
}
