import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  alerts: []
})

export const getters = {
  getFilteredAgents: state => (type, flag) => {
    const agents = state.alerts[flag]
    return _.filter(agents, ['AlertCode', type])
  },
  getAllAlerts: state => {
    const agents = state.alerts.AGENT
    const licenses = state.alerts.LICENSE
    const engines = state.alerts.ENGINE
    const all = _.concat(agents, licenses, engines)
    return _.orderBy(all, ['Date'], ['asc'])
  },
  getFilteredAlerts: state => (type, flag) => {
    const alerts = state.alerts[flag][type]
    return _.filter(alerts, ['AlertSeverity', type])
  },
  getFirstAlertByFlag: state => flag => {
    const alerts =
      state.alerts[flag].CRITICAL[0] ||
      state.alerts[flag].WARNING[0] ||
      state.alerts[flag].INFO[0]

    if (alerts) {
      return {
        flag: flag,
        alertId: alerts._id,
        host: alerts.OtherInfo.Hostname,
        date: alerts.Date,
        msg: alerts.Description,
        severity: alerts.AlertSeverity
      }
    }
  },
  getTotalAlertsByFlag: state => flag => {
    const alerts = state.alerts[flag]
    let info = alerts.INFO.length
    let warn = alerts.WARNING.length
    let crit = alerts.CRITICAL.length
    return {
      info: info,
      warn: warn,
      crit: crit,
      total: info + warn + crit
    }
  }
}

export const mutations = {
  SET_ALERTS: (state, payload) => {
    state.alerts = _.groupBy(payload, 'AlertCategory')
    state.alerts.ENGINE = _.groupBy(state.alerts.ENGINE, 'AlertSeverity')
    state.alerts.LICENSE = _.groupBy(state.alerts.LICENSE, 'AlertSeverity')

    _.forEach(state.alerts.ENGINE, (value, key) => {
      state.alerts.ENGINE[key] = _.orderBy(value, ['Date'], ['asc'])
    })

    _.forEach(state.alerts.LICENSE, (value, key) => {
      state.alerts.LICENSE[key] = _.orderBy(value, ['Date'], ['asc'])
    })
  },
  MARK_AS_READ: (state, payload) => {
    let flag = payload.flag
    let type = payload.type
    state.alerts[flag][type] = _.filter(state.alerts[flag][type], item => {
      return item._id !== payload.id
    })
  }
}

export const actions = {
  async getAlertsData({ commit }) {
    const alertsData = await axiosDefault.get('/alerts')
    const response = await alertsData.data
    commit('SET_ALERTS', response)
  },
  markAsRead({ commit }, payload) {
    // const deleteAlert = await axiosDefault.get(`/alerts/${payload.id}`)
    // const response = await deleteAlert
    // if (response) {
    commit('MARK_AS_READ', payload)
    // }
  }
}
