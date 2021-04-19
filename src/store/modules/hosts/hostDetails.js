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
  hostType: '',
  filesys: [],
  hostAlerts: {}
})

export const getters = {
  getCpuUsageChart: state => selected => {
    const dailyDbState = state.currentHost.features.oracle.database.databases
    const dailyHistory = state.currentHost.history

    if (dailyDbState) {
      return mountCpuUsageChart(dailyHistory, selected, dailyDbState)
    } else {
      return null
    }
  },
  getHostDetailInfo: state => {
    const info = state.hostInfo
    const general = {
      name: 'General Info',
      data: [
        {
          name: 'Environment',
          value: info.environment || '-'
        },
        {
          name: 'Technology',
          value: mapTechType(info.features)
        },
        {
          name: 'Clust',
          value: mapClustStatus(info.clusterMembershipStatus),
          hasIcon: true
        }
      ]
    }
    const osDetails = {
      name: 'OS Details',
      data: [
        {
          name: 'OS',
          value: `${info.os} - ${info.osVersion}` || '-'
        },
        {
          name: 'Kernel',
          value: `${info.kernel} - ${info.kernelVersion}` || '-'
        },
        {
          name: 'Memory',
          value: info.memoryTotal || '-'
        },
        {
          name: 'Swap',
          value: info.swapTotal || '-'
        }
      ]
    }
    const virtual = {
      name: 'Virtual',
      data: [
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
    }
    const cpu = {
      name: 'CPU',
      data: [
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
    }
    const agent = {
      name: 'Agent',
      data: [
        {
          name: 'Version',
          value: info.agentVersion || '-'
        },
        {
          name: 'Last Update',
          value:
            moment(info.createdAt)
              .utc()
              .format('DD/MM/YYYY hh:mm') || '-'
        }
      ]
    }
    return _.concat(general, osDetails, virtual, cpu, agent)
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
  },
  getCurrentHostDbs: state => {
    return state.hostDBs
  },
  getCurrentHostDbsName: state => {
    return _.map(state.hostDBs, val => {
      return val.name
    })
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
      osVersion,
      kernel,
      kernelVersion,
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
      osVersion,
      kernel,
      kernelVersion,
      memoryTotal,
      swapTotal,
      cpuModel,
      cpuThreads,
      cpuCores,
      cpuSockets
    }

    let hostDBs
    if (payload.features.oracle.database.databases) {
      state.hostType = 'oracle'
      hostDBs = payload.features.oracle.database.databases
    } else if (payload.features.mysql.instances) {
      state.hostType = 'mysql'
      hostDBs = payload.features.mysql.instances
    }

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

const mountTotalDailyUsage = data => {
  const totalDailyData = []
  let resultTotalDaily = {}

  _.map(data, item => {
    totalDailyData.push({
      date: moment(item.createdAt).format('YYYY-MM-DD'),
      value: item.totalDailyCPUUsage
    })
  })

  for (const prop in totalDailyData) {
    resultTotalDaily[totalDailyData[prop].date] = totalDailyData[prop].value
  }

  return resultTotalDaily
}

const mountTotalDailyUsageDbs = data => {
  let dailyDbData = []
  _.map(data, item => {
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
  return dailyDbData
}

const matchSelectedDbs = (selected, dbs) => {
  let selectedDbs = []
  _.forEach(selected, val => {
    return _.map(mountTotalDailyUsageDbs(dbs), dbData => {
      if (dbData.name === val) {
        selectedDbs.push(dbData)
      }
    })
  })
  return selectedDbs
}

const mountCpuUsageChart = (history, selected, dbs) => {
  const finalResult = [
    {
      name: 'Total Daily CPU Usage',
      data: mountTotalDailyUsage(history)
    }
  ]

  _.forEach(matchSelectedDbs(selected, dbs), item => {
    finalResult.push(item)
  })

  return finalResult
}
