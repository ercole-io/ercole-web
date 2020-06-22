import axiosDefault from '../../axios/axios-default.js'

export const state = () => ({
  alerts: null
})

export const getters = {}

export const mutations = {
  SET_ALERTS: (state, payload) => {
    state.alerts = payload
  }
}

export const actions = {
  getAlertsData({ commit }) {
    return axiosDefault.get('/alerts').then(res => {
      commit('SET_ALERTS', res.data)
    })
  }
}
