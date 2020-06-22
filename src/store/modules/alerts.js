import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  alerts: null
})

export const getters = {
  getStoppedAgents: state => {
    const alerts = state.alerts
    return _.filter(alerts, ['AlertCode', 'NO_DATA']).length
  }
}

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
