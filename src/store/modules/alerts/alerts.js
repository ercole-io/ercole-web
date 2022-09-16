import { axiosRequest } from '@/services/services.js'
import { returnAlertsByTypeDate } from '@/helpers/helpers.js'
import moment from 'moment'
import _ from 'lodash'
import formatDateTime from '@/filters/formatDateTime.js'

const startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
const endDate = moment().add(1, 'days').format('YYYY-MM-DD')

export const state = () => ({
  alerts: [],
  params: {
    status: 'NEW',
    category: null,
    severity: null,
    hostname: null,
    from: '',
    to: '',
  },
})

export const getters = {
  getAlerts: (state) => {
    const alerts = []

    _.map(state.alerts, (val) => {
      alerts.push({
        ...val,
        date: formatDateTime(val.date),
      })
    })

    return alerts
  },
  // getAllAlerts: (state) => {
  //   const finalData = []
  //   const agents = state.alerts.AGENT

  //   const licenses = state.alerts.LICENSE
  //   const licensesFull = organizeAlertsByFlag(licenses)

  //   const engines = state.alerts.ENGINE
  //   const enginesFull = organizeAlertsByFlag(engines)

  //   let all = _.concat(agents, licensesFull, enginesFull)
  //   // all = _.orderBy(all, ['date'], ['desc'])

  //   _.map(_.compact(all), (val) => {
  //     finalData.push({
  //       ...val,
  //       date: formatDateTime(val.date),
  //     })
  //   })

  //   console.log(finalData)

  //   return finalData
  // },
  getFilteredAgents: (state) => (code, category) => {
    const agents = state.alerts[category]
    const filtered = _.filter(agents, ['alertCode', code])

    return _.orderBy(filtered, ['date'], ['desc'])
  },
  getFilteredAlertsByHost: (state) => (host, category) => {
    let alertsByHost = {}

    if (category === 'AGENT') {
      alertsByHost = state.alerts[category]
    } else {
      alertsByHost = _.concat(
        state.alerts[category].WARNING || [],
        state.alerts[category].CRITICAL || [],
        state.alerts[category].INFO || []
      )
    }
    const findByDate = returnAlertsByTypeDate(
      alertsByHost,
      category,
      startDate,
      endDate
    )
    const filtered = _.filter(findByDate, ['hostname', host])

    return _.orderBy(filtered, ['date'], ['desc'])
  },
  getFirstAlertByCategory: (state) => (category) => {
    const alert = state.alerts[category]
    const alerts = organizeAlertByFirst(alert)

    if (alerts) {
      return {
        category: category,
        alertId: alerts._id,
        host: alerts.otherInfo ? alerts.otherInfo.hostname : null,
        date: alerts.date,
        msg: alerts.description,
        severity: alerts.alertSeverity,
        code: alerts.alertCode,
      }
    }
  },
  getTotalAlertsByCategory: (state) => (category) => {
    let alerts = state.alerts[category]

    let info = alerts && alerts.INFO ? alerts.INFO.length : 0
    let warn = alerts && alerts.WARNING ? alerts.WARNING.length : 0
    let crit = alerts && alerts.CRITICAL ? alerts.CRITICAL.length : 0
    return {
      info: info,
      warn: warn,
      crit: crit,
      total: info + warn + crit,
    }
  },
  getAlertsParams: (state) => {
    return state.params
  },
}

export const mutations = {
  SET_ALERTS: (state, payload) => {
    state.alerts = payload
    // state.alerts = _.groupBy(payload, 'alertCategory')
    // state.alerts.ENGINE = _.groupBy(state.alerts.ENGINE, 'alertSeverity')
    // state.alerts.LICENSE = _.groupBy(state.alerts.LICENSE, 'alertSeverity')

    // _.forEach(state.alerts.ENGINE, (value, key) => {
    //   state.alerts.ENGINE[key] = _.orderBy(value, ['date'], ['desc'])
    // })

    // _.forEach(state.alerts.LICENSE, (value, key) => {
    //   state.alerts.LICENSE[key] = _.orderBy(value, ['date'], ['desc'])
    // })
  },
  MARK_AS_READ_DASH: (state, payload) => {
    let id = payload.id
    let flag = payload.flag
    let type = payload.type

    if (flag === 'AGENT') {
      state.alerts[flag] = _.filter(state.alerts[flag], (item) => {
        return item._id !== id
      })
    }

    filterOnAlertsById(state.alerts, flag, type, id)
  },
  MARK_AS_READ_ALERTS_PAGE: (state, payload) => {
    const alerts = state.alerts

    _.forEach(payload.idList, (id) => {
      filterOnAlertsById(alerts, 'ENGINE', 'INFO', id)
      filterOnAlertsById(alerts, 'ENGINE', 'WARNING', id)
      filterOnAlertsById(alerts, 'ENGINE', 'CRITICAL', id)
      filterOnAlertsById(alerts, 'LICENSE', 'INFO', id)
      filterOnAlertsById(alerts, 'LICENSE', 'WARNING', id)
      filterOnAlertsById(alerts, 'LICENSE', 'CRITICAL', id)
    })
  },
  SET_ALERTS_PARAMS: (state, payload) => {
    state.params = {
      status: payload.status,
      from: payload.from,
      to: payload.to,
      category: payload.category,
      severity: payload.severity,
      hostname: payload.hostname,
    }
  },
}

export const actions = {
  async getAlertsData({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const params = {
      status: getters.getAlertsParams.status,
      from: getters.getAlertsParams.from,
      to: getters.getAlertsParams.to,
      severity: getters.getAlertsParams.severity,
      'sort-by': getters.getSortItem,
      'sort-desc': getters.getSortOrder,
      page: getters.getPageNum,
      size: getters.getPerPage,
      search: getters.getSearchTherm,
    }

    const config = {
      method: 'get',
      url: '/alerts',
      params: params,
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_ALERTS', res.data.items)
      commit('SET_TOTAL_DATA', res.data.count)
      commit('SET_PAGE_LENGTH', res.data.items.length)
      dispatch('offLoadingTable')
    })
  },
  async markAsRead({ commit }, payload) {
    const config = {
      method: 'post',
      url: '/alerts/ack',
      data: {
        ids: [payload.id],
      },
    }

    await axiosRequest('baseApi', config).then(() => {
      commit('MARK_AS_READ_DASH', payload)
    })
  },
  async markAsReadAlertsPage({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: '/alerts/ack',
      data: {
        ids: payload,
      },
    }

    await axiosRequest('baseApi', config).then(() => {
      commit('MARK_AS_READ_ALERTS_PAGE', payload)
      dispatch('offLoadingTable')
    })
  },
}

// const organizeAlertsByFlag = (flag) => {
//   if (flag) {
//     return _.concat(flag.INFO || [], flag.WARNING || [], flag.CRITICAL || [])
//   }
// }

const organizeAlertByFirst = (alert) => {
  if (alert) {
    return (
      (alert.CRITICAL && alert.CRITICAL[0]) ||
      null ||
      (alert.WARNING && alert.WARNING[0]) ||
      null ||
      (alert.INFO && alert.INFO[0]) ||
      null
    )
  }
}

const filterOnAlertsById = (alerts, flag, type, id) => {
  alerts[flag][type] = _.filter(alerts[flag][type], (item) => {
    return item._id !== id
  })

  return alerts[flag][type]
}
