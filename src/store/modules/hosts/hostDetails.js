import _ from 'lodash'
import moment from 'moment'
import axiosDefault from '@/axios/axios-default'
import {
  mapClustStatus,
  returnAlertsByTypeDate,
  setRangeDateFormat,
  checkRangeDate
} from '@/helpers/helpers.js'
import { mapDatabases } from '@/helpers/databasesMap.js'
import formatDateTime from '@/filters/formatDateTime.js'

const startDate = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD')
const endDate = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD')

export const state = () => ({
  currentHost: {},
  currentHostActiveDB: ''
})

export const getters = {
  currentHostNotifications: state => {
    const notifications = state.currentHost.alerts
    const hostname = state.currentHost.hostname

    let agents = returnAlertsByTypeDate(
      notifications,
      'AGENT',
      startDate,
      endDate
    ).length

    let licenses = returnAlertsByTypeDate(
      notifications,
      'LICENSE',
      startDate,
      endDate
    ).length

    let engine = returnAlertsByTypeDate(
      notifications,
      'ENGINE',
      startDate,
      endDate
    ).length

    let total = _.sum([agents, licenses, engine])

    return {
      total,
      agents,
      licenses,
      engine,
      hostname
    }
  },
  currentHostFileSystems: state => {
    return state.currentHost.filesystems
  },
  currentHostName: state => {
    return state.currentHost.hostname
  },
  currentHostInfo: state => {
    const info = state.currentHost.info

    const general = {
      name: 'General Info',
      data: [
        {
          name: 'Environment',
          value: state.currentHost.environment
        },
        {
          name: 'Technology',
          value: mapDatabases(state.currentHost.features, 'technology')
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
          value: `${info.os} - ${info.osVersion}`
        },
        {
          name: 'Kernel',
          value: `${info.kernel} - ${info.kernelVersion}`
        },
        {
          name: 'Memory',
          value: info.memoryTotal
        },
        {
          name: 'Swap',
          value: info.swapTotal
        }
      ]
    }
    const virtual = {
      name: 'Virtual',
      data: [
        {
          name: 'Platform',
          value: info.hardwareAbstractionTechnology
        },
        {
          name: 'Cluster',
          value: state.currentHost.cluster
        },
        {
          name: 'Node',
          value: state.currentHost.virtualizationNode
        }
      ]
    }
    const cpu = {
      name: 'CPU',
      data: [
        {
          name: 'Model',
          value: info.cpuModel
        },
        {
          name: 'Threads',
          value: info.cpuThreads
        },
        {
          name: 'Cores',
          value: info.cpuCores
        },
        {
          name: 'Socket',
          value: info.cpuSockets
        }
      ]
    }
    const agent = {
      name: 'Agent',
      data: [
        {
          name: 'Version',
          value: state.currentHost.agentVersion
        },
        {
          name: 'Last Update',
          value: formatDateTime(state.currentHost.createdAt)
        }
      ]
    }
    return _.concat(general, osDetails, virtual, cpu, agent)
  },
  currentHostType: state => {
    const databases = state.currentHost.features

    if (databases) {
      if (databases.oracle && databases.oracle.database.databases) {
        return 'oracle'
      } else if (databases.mysql && databases.mysql.instances) {
        return 'mysql'
      } else if (
        databases.microsoft &&
        databases.microsoft.sqlServer.instances
      ) {
        return 'microsoft'
      }
    }
  },
  currentHostActiveDB: state => {
    return state.currentHostActiveDB
  },
  currentHostActiveDbIndex: (state, getters) => filteredDbs => {
    return _.findIndex(filteredDbs, {
      name: getters.currentHostActiveDB
    })
  },
  currentHostDBs: state => {
    const databases = state.currentHost.features

    if (databases) {
      if (databases.oracle) {
        if (databases.oracle.database.databases) {
          return databases.oracle.database.databases
        } else {
          return []
        }
      } else if (databases.mysql) {
        if (databases.mysql.instances) {
          return databases.mysql.instances
        } else {
          return []
        }
      } else if (databases.microsoft) {
        if (databases.microsoft.sqlServer.instances) {
          return databases.microsoft.sqlServer.instances
        } else {
          return []
        }
      }
    }
  },
  currentHostDBsName: (state, getters) => {
    const databases = getters.currentHostDBs

    return _.map(databases, val => {
      return val.name
    })
  },
  currentHostFiltered: (state, getters) => search => {
    return _.filter(getters.currentHostDBs, db => {
      return (
        db.name
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) > -1
      )
    })
  },
  getOracleCpuUsageChart: (state, getters) => selected => {
    const dailyDbState = getters.currentHostDBs
    const dailyHistory = state.currentHost.history
    const rangeDates = getters.getRangeDates

    if (dailyDbState) {
      return mountCpuUsageChart(
        dailyHistory,
        selected,
        dailyDbState,
        rangeDates
      )
    } else {
      return null
    }
  },
  getRangeDates: (state, getters, rootstate) => {
    return rootstate.rangeDates.rangeDates
  }
}

export const mutations = {
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload
  },
  SET_ACTIVE_DB: (state, payload) => {
    state.currentHostActiveDB = payload
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

const mountTotalDailyUsage = (data, rangeDates) => {
  const totalDailyData = []
  let resultTotalDaily = {}

  _.map(data, item => {
    let date = setRangeDateFormat(item.createdAt)

    if (checkRangeDate(date, rangeDates)) {
      totalDailyData.push({
        date: date,
        value: item.totalDailyCPUUsage
      })
    }
  })

  for (const prop in totalDailyData) {
    resultTotalDaily[totalDailyData[prop].date] = totalDailyData[prop].value
  }

  return resultTotalDaily
}

const mountTotalDailyUsageDbs = (data, rangeDates) => {
  let dailyDbData = []
  let changed = []

  _.map(data, item => {
    const { name, changes } = item

    _.map(changes, data => {
      let date = setRangeDateFormat(data.updated)

      if (checkRangeDate(date, rangeDates)) {
        changed.push({
          date: date,
          value: data.dailyCPUUsage
        })
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

const matchSelectedDbs = (selected, dbs, rangeDates) => {
  let selectedDbs = []
  _.forEach(selected, val => {
    return _.map(mountTotalDailyUsageDbs(dbs, rangeDates), dbData => {
      if (dbData.name === val) {
        selectedDbs.push(dbData)
      }
    })
  })
  return selectedDbs
}

const mountCpuUsageChart = (history, selected, dbs, rangeDates) => {
  const finalResult = [
    {
      name: 'Total Daily CPU Usage',
      data: mountTotalDailyUsage(history, rangeDates)
    }
  ]

  _.forEach(matchSelectedDbs(selected, dbs, rangeDates), item => {
    finalResult.push(item)
  })

  return finalResult
}
