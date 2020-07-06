import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

function checkIconType(serverity) {
  if (serverity === 'NOTICE') {
    return 'is-info'
  } else if (serverity === 'WARN') {
    return 'is-warning'
  } else if (serverity === 'CRITICAL') {
    return 'is-danger'
  } else {
    return 'is-dark'
  }
}

function checkIcon(serverity) {
  if (serverity === 'NOTICE') {
    return 'info-circle'
  } else if (serverity === 'WARN') {
    return 'exclamation-triangle'
  } else if (serverity === 'CRITICAL') {
    return 'exclamation-circle'
  } else {
    return 'times'
  }
}

export const state = () => ({
  alerts: {
    agents: [],
    licenses: [],
    engines: []
  }
})

export const getters = {
  getStoppedAgents: state => {
    const agents = state.alerts.agents
    return _.filter(agents, ['AlertCode', 'NO_DATA']).length
  },
  getFirstLicenseAlert: state => {
    const license = state.alerts.licenses[0]
    if (license) {
      return {
        flag: 'licenses',
        type: checkIconType(license.AlertSeverity),
        icon: checkIcon(license.AlertSeverity),
        alertId: license._id,
        host: license.Hostname,
        date: license.Date,
        msg: license.Description
      }
    }
  },
  getTotalLicensesAlerts: state => {
    const licenses = state.alerts.licenses
    let info = _.filter(licenses, ['AlertSeverity', 'NOTICE' || 'INFO']).length
    let warn = _.filter(licenses, ['AlertSeverity', 'WARN']).length
    let crit = _.filter(licenses, ['AlertSeverity', 'CRITICAL']).length
    return {
      info: info,
      warn: warn,
      crit: crit,
      total: info + warn + crit
    }
  },
  getFirstEngineAlert: state => {
    const engine = state.alerts.engines[0]
    if (engine) {
      return {
        flag: 'engines',
        type: checkIconType(engine.AlertSeverity),
        icon: checkIcon(engine.AlertSeverity),
        alertId: engine._id,
        host: engine.Hostname,
        date: engine.Date,
        msg: engine.Description
      }
    }
  },
  getTotalEnginesAlerts: state => {
    const engines = state.alerts.engines
    let info = _.filter(engines, ['AlertSeverity', 'NOTICE' || 'INFO']).length
    let warn = _.filter(engines, ['AlertSeverity', 'WARN']).length
    let crit = _.filter(engines, ['AlertSeverity', 'CRITICAL']).length
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
    const agents = _.filter(payload, { AlertCategory: 'AGENT' })
    state.alerts.agents = agents

    const licenses = _.filter(payload, { AlertCategory: 'LICENSE' })
    state.alerts.licenses = _.orderBy(
      licenses,
      ['AlertSeverity', 'AlertSeverity', 'Date'],
      ['CRITICAL', 'WARN', 'asc']
    )

    let engines = _.filter(payload, { AlertCategory: 'ENGINE' })
    state.alerts.engines = _.orderBy(
      engines,
      ['AlertSeverity', 'AlertSeverity', 'Date'],
      ['CRITICAL', 'WARN', 'asc']
    )
  },
  MARK_AS_READ: (state, payload) => {
    if (payload.flag === 'licenses') {
      state.alerts.licenses = _.filter(state.alerts.licenses, item => {
        return item._id !== payload.id
      })
    } else {
      state.alerts.engines = _.filter(state.alerts.engines, item => {
        return item._id !== payload.id
      })
    }
  }
}

export const actions = {
  async getAlertsData({ commit }) {
    const alertsData = await axiosDefault.get('/alerts')
    const response = await alertsData.data
    commit('SET_ALERTS', response)
  },
  async markAsRead({ commit }, payload) {
    // const deleteAlert = await axiosDefault.get(`/alerts/${payload.id}`)
    // const response = await deleteAlert
    // if (response) {
    commit('MARK_AS_READ', payload)
    // }
  }
}
