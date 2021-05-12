import _ from 'lodash'
import moment from 'moment'
import axiosDefault from '@/axios/axios-default'
import { mapClustStatus, returnAlertsByTypeDate } from '@/helpers/helpers.js'
import { mapDatabases } from '@/helpers/databasesMap.js'
import formatDateTime from '@/filters/formatDateTime.js'

const startDate = moment()
  .subtract(1, 'week')
  .add(1, 'days')
  .format('YYYY-MM-DD')
const endDate = moment().format('YYYY-MM-DD')

export const state = () => ({
  currentHost: {},
  currentHostActiveDB: ''
  // hostDBs: [],
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
          value: info.environment
        },
        {
          name: 'Technology',
          value: mapDatabases(info.features, 'technology')
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
          value: info.cluster
        },
        {
          name: 'Node',
          value: info.virtualizationNode
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
          value: info.agentVersion
        },
        {
          name: 'Last Update',
          value: formatDateTime(info.createdAt)
        }
      ]
    }
    return _.concat(general, osDetails, virtual, cpu, agent)
  },
  currentHostType: state => {
    const databases = state.currentHost.features

    if (databases) {
      if (databases.oracle && databases.oracle.database.databases) {
        state.hostType = 'oracle'
      } else if (databases.mysql && databases.mysql.instances) {
        state.hostType = 'mysql'
      } else if (
        databases.microsoft &&
        databases.microsoft.sqlServer.instances
      ) {
        state.hostType = 'microsoft'
      }
    }
  }
}

export const mutations = {
  SET_CURRENT_HOST: (state, payload) => {
    console.log(payload)
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
