import axiosDefault from '../../axios/axios-default.js'
import axiosNoLoading from '../../axios/axios-no-loading.js'
import _ from 'lodash'
import formatDate from '../../filters/formatDate.js'

export const state = () => ({
  alerts: {}
})

export const getters = {
  getFilteredAgents: state => (type, flag) => {
    const agents = state.alerts[flag]
    return _.filter(agents, ['alertCode', type])
  },
  getAllAlerts: state => {
    const agents = state.alerts.AGENT
    const licenses = state.alerts.LICENSE
    const licensesFull = _.concat(
      licenses.INFO ?? [],
      licenses.WARNING ?? [],
      licenses.CRITICAL ?? []
    )

    const engines = state.alerts.ENGINE
    const enginesFull = _.concat(
      engines.INFO ?? [],
      engines.WARNING ?? [],
      engines.CRITICAL ?? []
    )

    let all = _.concat(agents, licensesFull, enginesFull)
    return _.orderBy(all, ['date'], ['asc'])
  },
  getFilteredAlerts: state => (type, flag) => {
    const alerts = state.alerts[flag][type]
    return _.filter(alerts, ['alertSeverity', type])
  },
  getFirstAlertByFlag: state => flag => {
    const alert = state.alerts[flag]
    const alerts =
      ((alert.CRITICAL && alert.CRITICAL[0]) ?? null) ||
      ((alert.WARNING && alert.WARNING[0]) ?? null) ||
      ((alert.INFO && alert.INFO[0]) ?? null)

    if (alerts) {
      return {
        flag: flag,
        alertId: alerts._id,
        host: alerts.otherInfo.hostname,
        date: alerts.date,
        msg: alerts.description,
        severity: alerts.alertSeverity
      }
    }
  },
  getTotalAlertsByFlag: state => flag => {
    const alerts = state.alerts[flag]
    let info = alerts.INFO ? alerts.INFO.length : 0
    let warn = alerts.WARNING ? alerts.WARNING.length : 0
    let crit = alerts.CRITICAL ? alerts.CRITICAL.length : 0
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
    _.forEach(payload, item => {
      item.date = formatDate(item.date)
    })

    state.alerts = _.groupBy(payload, 'alertCategory')
    state.alerts.ENGINE = _.groupBy(state.alerts.ENGINE, 'alertSeverity')
    state.alerts.LICENSE = _.groupBy(state.alerts.LICENSE, 'alertSeverity')

    _.forEach(state.alerts.ENGINE, (value, key) => {
      state.alerts.ENGINE[key] = _.orderBy(value, ['date'], ['asc'])
    })

    _.forEach(state.alerts.LICENSE, (value, key) => {
      state.alerts.LICENSE[key] = _.orderBy(value, ['date'], ['asc'])
    })
  },
  MARK_AS_READ: (state, payload) => {
    let id = payload.id
    let flag = payload.flag
    let type = payload.type

    if (flag === 'AGENT') {
      state.alerts[flag] = _.filter(state.alerts[flag], item => {
        return item._id !== id
      })
    }
    state.alerts[flag][type] = _.filter(state.alerts[flag][type], item => {
      return item._id !== id
    })
  }
}

export const actions = {
  async getAlertsData({ commit }) {
    const alertsData = await axiosDefault.get('/alerts?status=NEW')
    const response = await alertsData.data
    commit('SET_ALERTS', response)
  },
  async markAsRead({ commit }, payload) {
    const deleteAlert = await axiosNoLoading.post(`/alerts/${payload.id}`)
    const response = await deleteAlert
    if (response) {
      commit('MARK_AS_READ', payload)
    }
  }
}
