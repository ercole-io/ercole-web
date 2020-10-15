import axiosDefault from '@/axios/axios-default.js'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { returnAlertsByTypeDate } from '@/helpers/helpers.js'
import moment from 'moment'
import _ from 'lodash'

const startDate = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD')
const endDate = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD')

export const state = () => ({
  alerts: []
})

export const getters = {
  getAlerts: (state, getters) => (type, flag) => {
    if (!type && !flag) {
      return getters['getAllAlerts']
    } else if (type === 'NO_DATA') {
      return getters.getFilteredAgents(type, flag)
    } else if (type === 'INFO' || type === 'WARNING' || type === 'CRITICAL') {
      return getters.getFilteredAlerts(type, flag)
    } else {
      return getters.getFilteredAlertsByHost(type, flag)
    }
  },
  getAllAlerts: state => {
    const agents = state.alerts.AGENT

    const licenses = state.alerts.LICENSE
    const licensesFull = organizeAlertsByFlag(licenses)

    const engines = state.alerts.ENGINE
    const enginesFull = organizeAlertsByFlag(engines)

    let all = _.concat(agents, licensesFull, enginesFull)
    all = _.orderBy(all, ['date'], ['asc'])

    return _.compact(all)
  },
  getFilteredAgents: state => (type, flag) => {
    const agents = state.alerts[flag]
    return _.filter(agents, ['alertCode', type])
  },
  getFilteredAlerts: state => (type, flag) => {
    const alerts = state.alerts[flag][type]
    return _.filter(alerts, ['alertSeverity', type])
  },
  getFilteredAlertsByHost: state => (host, flag) => {
    let alertsByHost = {}

    if (flag === 'AGENT') {
      alertsByHost = state.alerts[flag]
    } else {
      alertsByHost = _.concat(
        state.alerts[flag].WARNING || [],
        state.alerts[flag].CRITICAL || [],
        state.alerts[flag].INFO || []
      )
    }
    const findByDate = returnAlertsByTypeDate(
      alertsByHost,
      flag,
      startDate,
      endDate
    )
    return _.filter(findByDate, ['hostname', host])
  },
  getFirstAlertByFlag: state => flag => {
    const alert = state.alerts[flag]
    const alerts = organizeAlertByFirst(alert)

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
  MARK_AS_READ_DASH: (state, payload) => {
    let id = payload.id
    let flag = payload.flag
    let type = payload.type

    if (flag === 'AGENT') {
      state.alerts[flag] = _.filter(state.alerts[flag], item => {
        return item._id !== id
      })
    }

    filterOnAlertsById(state.alerts, flag, type, id)
  },
  MARK_AS_READ_ALERTS_PAGE: (state, payload) => {
    const alerts = state.alerts

    _.forEach(payload.idList, id => {
      filterOnAlertsById(alerts, 'ENGINE', 'INFO', id)
      filterOnAlertsById(alerts, 'ENGINE', 'WARNING', id)
      filterOnAlertsById(alerts, 'ENGINE', 'CRITICAL', id)
      filterOnAlertsById(alerts, 'LICENSE', 'INFO', id)
      filterOnAlertsById(alerts, 'LICENSE', 'WARNING', id)
      filterOnAlertsById(alerts, 'LICENSE', 'CRITICAL', id)
    })
  }
}

export const actions = {
  async getAlertsData({ commit, getters }) {
    const alertsData = await axiosDefault.get('/alerts', {
      params: {
        status: 'NEW',
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location
      }
    })
    const response = await alertsData.data
    _.map(response, val => {
      if (val.alertCategory !== 'AGENT') {
        val.isChecked = false
      }
    })
    commit('SET_ALERTS', response)
  },
  async markAsRead({ commit }, payload) {
    const deleteAlert = await axiosNoLoading.post(`/alerts/ack`, [payload.id])
    const response = await deleteAlert
    if (response) {
      commit('MARK_AS_READ_DASH', payload)
    }
  },
  async markAsReadAlertsPage({ commit }, payload) {
    const deleteAlert = await axiosNoLoading.post(`/alerts/ack`, payload.idList)
    const response = await deleteAlert
    if (response) {
      commit('MARK_AS_READ_ALERTS_PAGE', payload)
    }
  }
}

const organizeAlertsByFlag = flag => {
  return _.concat(flag.INFO || [], flag.WARNING || [], flag.CRITICAL || [])
}

const organizeAlertByFirst = alert => {
  return (
    (alert.CRITICAL && alert.CRITICAL[0]) ||
    null ||
    (alert.WARNING && alert.WARNING[0]) ||
    null ||
    (alert.INFO && alert.INFO[0]) ||
    null
  )
}

const filterOnAlertsById = (alerts, flag, type, id) => {
  alerts[flag][type] = _.filter(alerts[flag][type], item => {
    return item._id !== id
  })

  return alerts[flag][type]
}
