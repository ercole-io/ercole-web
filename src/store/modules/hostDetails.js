import axiosDefault from '../../axios/axios-default'
import _ from 'lodash'
import moment from 'moment'
import { mapTechType, mapClustStatus } from '@/helpers/helpers.js'

export const state = () => ({
  currentHost: {},
  hostInfo: {},
  hostDBs: [],
  filesys: [],
  hostAlerts: {}
})

export const getters = {
  getCurrentHost: state => {
    return state.currentHost
  },
  getGpuGrowthChart: state => {
    // calc total daily
    const totalDailyState = state.currentHost.history
    const totalDailyData = []
    let resultTotalDaily = {}

    _.map(totalDailyState, item => {
      totalDailyData.push({
        date: moment(item.createdAt).format('YYYY-MM-DD'),
        value: item.totalDailyCPUUsage
      })
    })

    for (const prop in totalDailyData) {
      resultTotalDaily[totalDailyData[prop].date] = totalDailyData[prop].value
    }

    // calc daily per db
    const dailyDbState = state.currentHost.features.oracle.database.databases
    const dailyDbData = []

    _.map(dailyDbState, item => {
      const { name, changes } = item
      let changed = _.map(changes, data => {
        return {
          date: moment(data.updated).format('YYYY-MM-DD'),
          value: data.dailyCPUUsage
        }
      })

      const changedResult = {}
      for (const prop in changed) {
        changedResult[changed[prop].date] = changed[prop].value
      }

      dailyDbData.push({
        name: name,
        data: changedResult
      })
    })

    const finalResult = [
      { name: 'Total Daily CPU Usage', data: resultTotalDaily }
    ]

    _.forEach(dailyDbData, item => {
      finalResult.push(item)
    })

    return finalResult
  },
  getHostDetailInfo: state => {
    const info = state.hostInfo
    const hostInfo = {}
    hostInfo.general = [
      {
        name: 'Environment',
        value: info.environment || '-'
      },
      {
        name: 'Technologie',
        value: mapTechType(info.features)
      },
      {
        name: 'Clust',
        value: mapClustStatus(info.clusterMembershipStatus),
        hasIcon: true
      },
      {
        name: 'OS',
        value: info.os || '-'
      },
      {
        name: 'Kernel',
        value: info.kernel || '-'
      },
      {
        name: 'Memorie',
        value: info.memoryTotal || '-'
      },
      {
        name: 'Swap',
        value: info.swapTotal || '-'
      }
    ]
    hostInfo.virtual = [
      {
        name: 'Platform',
        value: info.hardwareAbstractionTechnology || '-'
      },
      {
        name: 'Cluster',
        value: info.cluster || '-'
      },
      {
        name: 'Node',
        value: info.virtualizationNode || '-'
      }
    ]
    hostInfo.cpu = [
      {
        name: 'Model',
        value: info.cpuModel || '-'
      },
      {
        name: 'Threads',
        value: info.cpuThreads || '-'
      },
      {
        name: 'Cores',
        value: info.cpuCores || '-'
      },
      {
        name: 'Socket',
        value: info.cpuSockets || '-'
      }
    ]
    hostInfo.agent = [
      {
        name: 'Version',
        value: info.agentVersion || '-'
      },
      {
        name: 'Last Update',
        value: moment(info.createdAt).format('DD/MM/YYYY hh:mm') || '-'
      }
    ]

    return hostInfo
  },
  getNotificationInfo: state => {
    const hostAlerts = state.hostAlerts

    let agents = countAlertsByType(hostAlerts, 'AGENT')
    let licenses = countAlertsByType(hostAlerts, 'LICENSE')
    let engine = countAlertsByType(hostAlerts, 'ENGINE')
    let total = agents + licenses + engine
    let hostname = state.currentHost.hostname

    return {
      total,
      agents,
      licenses,
      engine,
      hostname
    }
  }
}

export const mutations = {
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload

    const {
      environment,
      features,
      clusterMembershipStatus,
      cluster,
      virtualizationNode,
      agentVersion,
      createdAt
    } = payload

    const {
      hardwareAbstractionTechnology,
      os,
      kernel,
      memoryTotal,
      swapTotal,
      cpuModel,
      cpuThreads,
      cpuCores,
      cpuSockets
    } = payload.info

    state.hostInfo = {
      environment,
      features,
      clusterMembershipStatus,
      cluster,
      virtualizationNode,
      agentVersion,
      createdAt,
      hardwareAbstractionTechnology,
      os,
      kernel,
      memoryTotal,
      swapTotal,
      cpuModel,
      cpuThreads,
      cpuCores,
      cpuSockets
    }

    const hostDBs = payload.features.oracle.database.databases
    const dbs = []
    if (hostDBs && hostDBs.length > 0) {
      _.forEach(hostDBs, val => {
        if (val.name) {
          dbs.push(val)
        }
      })
    }
    state.hostDBs = dbs || []

    state.filesys = payload.filesystems
    state.hostAlerts = payload.alerts
  }
}

export const actions = {
  async getHostByName({ commit }, hostname) {
    const hostByName = await axiosDefault.get(`/hosts/${hostname}`)
    const response = await hostByName.data
    commit('SET_CURRENT_HOST', response)
  }
}

const startDate = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD')
const endDate = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD')

const checkHostDate = date => {
  const dateToCheck = moment(date).format('YYYY-MM-DD')
  return moment(dateToCheck).isBetween(startDate, endDate)
}

const countAlertsByType = (alerts, type) => {
  return _.filter(alerts, val => {
    if (checkHostDate(val.date) && val.alertStatus !== 'ACK') {
      if (type === 'ENGINE') {
        console.log(val.date, type, val._id, val.alertStatus)
      }
      return val.alertCategory === type
    }
  }).length
}
