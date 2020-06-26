import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  alerts: null
})

export const getters = {
  getAgentsTotalHosts: state => {
    const alerts = state.alerts
    return alerts.length
  },
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
  async getAlertsData({ commit }) {
    const alertsData = await axiosDefault.get('/alerts')
    const response = await alertsData.data
    commit('SET_ALERTS', response)
  }
}
