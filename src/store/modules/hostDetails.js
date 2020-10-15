import axiosDefault from '@/axios/axios-default'
import {
  mapTechType,
  mapClustStatus,
  returnAlertsByTypeDate
} from '@/helpers/helpers.js'
import moment from 'moment'
import _ from 'lodash'

const startDate = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD')
const endDate = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD')

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

    let agents = returnAlertsByTypeDate(hostAlerts, 'AGENT', startDate, endDate)
      .length

    let licenses = returnAlertsByTypeDate(
      hostAlerts,
      'LICENSE',
      startDate,
      endDate
    ).length

    let engine = returnAlertsByTypeDate(
      hostAlerts,
      'ENGINE',
      startDate,
      endDate
    ).length

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
  async getHostByName({ commit, getters }, hostname) {
    const hostByName = await axiosDefault.get(`/hosts/${hostname}`, {
      params: {
        'older-than': getters.getActiveFilters.date
      }
    })
    const response = await hostByName.data
    commit('SET_CURRENT_HOST', response)
  }
}
