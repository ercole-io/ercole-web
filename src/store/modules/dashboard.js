import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  dashData: null
})

export const getters = {
  getTotalTarget: state => {
    const total = state.dashData.Technologies.Total
    return {
      agentsDiscovered: total.Used,
      percCompliance: (total.HostsCount / total.Used) * 100,
      moneyMissing: total.PaidCost - total.TotalCost
    }
  },
  getTechnologies: state => {
    const tech = state.dashData.Technologies.Technologies
    const techArray = []
    _.forEach(tech, val => {
      techArray.push({
        name: val.Name,
        agents: val.Used,
        perc: Math.round((val.HostsCount / val.Used) * 100),
        money: val.PaidCost - val.TotalCost
      })
    })
    return techArray
  },
  getAgentsTotalHosts: state => {
    const alerts = state.dashData.Alerts
    let agentsTotalHosts = _.sumBy(alerts, 'Count')
    return agentsTotalHosts
  }
}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.dashData = payload
  }
}

export const actions = {
  async getDashboardData({ commit }) {
    const dashData = await axiosDefault.get('/frontend/dashboard')
    const response = await dashData.data
    commit('SET_DASHBOARD_DATA', response)
  }
}
