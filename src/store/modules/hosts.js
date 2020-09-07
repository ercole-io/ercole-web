import axiosDefault from '../../axios/axios-default'
import _ from 'lodash'
import moment from 'moment'
import formatDate from '@/filters/formatDate.js'
import { mapBooleanIcon } from '@/helpers/helpers.js'

export const state = () => ({
  hosts: {},
  currentHost: {}
})

export const getters = {
  getAllHosts: state => {
    const allHosts = []
    _.map(state.hosts, host => {
      allHosts.push({
        _id: host._id,
        hostname: host.hostname || '-',
        environment: host.environment || '-',
        databases: mapDbs(host.features.oracle),
        techType: mapTechType(host.features.oracle),
        platform: host.info.hardwareAbstractionTechnology || '-',
        cluster: host.cluster || '-',
        virtNode: host.virtualizationNode || '-',
        os: host.info.os || '-',
        kernel: host.info.kernel || '-',
        memorytotal: host.info.memoryTotal || '-',
        swaptotal: host.info.swapTotal || '-',
        iconCluster: mapClustStatus(host.clusterMembershipStatus),
        model: host.info.cpuModel || '-',
        threads: host.info.cpuThreads || '-',
        cores: host.info.cpuCores || '-',
        socket: host.info.cpuSockets || '-',
        version: host.agentVersion || '-',
        updated: formatDate(host.createdAt) || '-'
      })
    })
    return allHosts
  },
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
        date: moment(item.createdAt).format(),
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
          date: moment(data.updated).format(),
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
  }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload
  }
}

export const actions = {
  async getHosts({ commit }) {
    const hostsData = await axiosDefault.get('/hosts')
    const response = await hostsData.data
    commit('SET_HOSTS', response)
  },
  async getHostByName({ commit }, hostname) {
    const hostByName = await axiosDefault.get(`/hosts/${hostname}`)
    const response = await hostByName.data
    commit('SET_CURRENT_HOST', response)
  }
}

const mapDbs = dbs => {
  if (dbs) {
    if (dbs.database) {
      if (dbs.database.databases.length > 0) {
        return dbs.database.databases.map(dbName => dbName.name)
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  } else {
    return '-'
  }
}

const mapTechType = dbs => {
  if (dbs) {
    if (dbs.database) {
      if (dbs.database.databases.length > 0) {
        return 'Oracle Database'
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  } else {
    return '-'
  }
}

const mapClustStatus = clust => {
  if (
    clust.hacmp ||
    clust.oracleClusterware ||
    clust.sunCluster ||
    clust.veritasClusterServer
  ) {
    return mapBooleanIcon(true)
  } else {
    return mapBooleanIcon(false)
  }
}
