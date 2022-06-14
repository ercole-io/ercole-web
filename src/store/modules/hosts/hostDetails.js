import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import {
  getNotificationsByType,
  getHostInfo,
  getHostType,
  mountCpuUsageChart,
  mapHostDatabases,
  filterOptionsOracle,
} from '@/helpers/hostDetails.js'
import { removeDashFromMsDesc } from '@/helpers/licenses.js'

export const state = () => ({
  currentHost: {},
  hostType: '',
  activeDb: '',
  currentHostDatabases: [],
  currentHostDbLicenses: [],
  currentHostDbGrants: [],
  selectedKeys: ['name'],
  searchTermDB: '',
})

// const info = [
//   'status',
//   'role',
//   'dbID',
//   'uniqueName',
//   'archiveLog',
//   'blockSize',
//   'charset',
//   'nCharset',
//   'memoryTarget',
//   'pgaTarget',
//   'sgaMaxSize',
//   'sgaTarget',
//   'dbTime',
//   'elapsed',
//   'work',
//   'cpuCount',
//   'allocable',
//   'datafileSize',
//   'segmentsSize',
//   'asm',
//   'dataguard',
//   'platform',
//   'version',
// ]

export const getters = {
  // general
  hostNotifications: (state) => {
    const notifications = state.currentHost.alerts
    const hostname = state.currentHost.hostname

    let agents = getNotificationsByType(notifications, 'AGENT')
    let licenses = getNotificationsByType(notifications, 'LICENSE')
    let engine = getNotificationsByType(notifications, 'ENGINE')
    let total = _.sum([agents, licenses, engine])

    return {
      total,
      agents,
      licenses,
      engine,
      hostname,
    }
  },
  hostFileSystems: (state) => {
    return state.currentHost.filesystems
  },
  currentHost: (state) => {
    return state.currentHost.hostname
  },
  currentHostInfo: (state) => {
    const info = state.currentHost.info
    const host = state.currentHost
    return getHostInfo(info, host)
  },
  currentHostType: (state) => {
    return state.hostType
  },
  currentHostDBs: (state) => {
    return state.currentHostDatabases
  },
  currentHostActiveDB: (state) => {
    return state.activeDb
  },
  currentHostActiveDbIndex: (state, getters) => (filteredDbs) => {
    return _.findIndex(filteredDbs, {
      name: getters.currentHostActiveDB,
    })
  },
  getCurrentHostDbLicenses: (state) => (db) => {
    const usedLicensesByDb = []
    _.map(state.currentHostDbLicenses, (val) => {
      if (val.dbName === db) {
        usedLicensesByDb.push({
          ...val,
          description: removeDashFromMsDesc(val.description),
        })
      }
    })
    return usedLicensesByDb
  },
  getCurrentHostDbGrants: (state) => (db) => {
    const grantsByHost = state.currentHostDbGrants
    const grantsByHostFormated = []
    const dbGrants = []

    _.map(grantsByHost, (val) => {
      const defaultRole =
        val.oracleGrantDba.defaultRole === 'yes' ? true : false
      const adminOption =
        val.oracleGrantDba.adminOption === 'yes' ? true : false

      grantsByHostFormated.push({
        dbName: val.databasename,
        hostname: val.hostname,
        adminOption: adminOption,
        defaultRole: defaultRole,
        grantee: val.oracleGrantDba.grantee,
      })
    })

    _.map(grantsByHostFormated, (val) => {
      if (val.dbName === db) {
        dbGrants.push(val)
      }
    })

    return dbGrants
  },
  currentHostFiltered: (state, getters) => {
    const databases = getters.currentHostDBs
    const selectedKeys = [...state.selectedKeys]
    const search = state.searchTermDB

    let data
    if (selectedKeys.length === 1 && selectedKeys[0] === 'name') {
      data = databases
    } else {
      selectedKeys.push('name')

      data = databases.map((db) => {
        const keys = Object.keys(db)
        const filter = keys.filter((k) => selectedKeys.includes(k))
        return filter.reduce((acc, key) => {
          acc[key] = db[key]
          return acc
        }, {})
      })
    }

    let filteredData = data

    if (search) {
      const selectedOptions = filterOptionsOracle.filter((item) =>
        selectedKeys.includes(item.value)
      )
      filteredData = data.filter((itemData) => {
        return selectedOptions.reduce((acc, opt) => {
          return acc || (opt.filter ? opt.filter(itemData, search) : false)
        }, false)
      })
    }

    return filteredData
  },
  // Oracle Chart
  getOracleCpuUsageChart: (state, getters) => (selected) => {
    const dailyDbState = getters.currentHostDBs
    const dailyHistory = state.currentHost.history
    const rangeDates = getters.getOracleCpuUsageChartRangeDates

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
  getOracleCpuUsageChartInfo: (state, getters) => {
    const databases = getters.currentHostDBs

    return _.map(databases, (val) => {
      return {
        name: val.name,
        id: val.dbID,
      }
    })
  },
  getOracleCpuUsageChartRangeDates: (state, getters, rootstate) => {
    return rootstate.rangeDates.rangeDates
  },
}

export const mutations = {
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload
  },
  SET_CURRENT_HOST_TYPE: (state, payload) => {
    state.hostType = payload
  },
  SET_CURRENT_HOST_DATABASES: (state, payload) => {
    state.currentHostDatabases = payload
  },
  SET_ACTIVE_DB: (state, payload) => {
    state.activeDb = payload
  },
  SET_HOST_DB_LICENSES: (state, payload) => {
    state.currentHostDbLicenses = payload
  },
  SET_HOST_DB_GRANTS: (state, payload) => {
    state.currentHostDbGrants = payload
  },
  SET_SELECTED_KEYS: (state, payload) => {
    state.selectedKeys = payload
  },
  SET_SEARCH_TERM_DB: (state, payload) => {
    state.searchTermDB = payload
  },
}

export const actions = {
  async getHostByName({ commit, dispatch, getters }, hostname) {
    dispatch('onLoadingTable')
    const baseUrl = `/hosts/${hostname}`
    const endPoints = [
      baseUrl,
      `${baseUrl}/technologies/all/databases/licenses-used`,
      `${baseUrl}/technologies/all/databases/grant-dba`,
    ]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('baseApi', {
          merthod: 'get',
          url: endpoint,
          params: {
            'older-than': getters.getActiveFilters.date,
          },
        })
      )
    )
      .then(
        axios.spread((...allData) => {
          commit('SET_CURRENT_HOST', allData[0].data)
          commit('SET_CURRENT_HOST_TYPE', getHostType(allData[0].data.features))
          commit('SET_HOST_DB_LICENSES', allData[1].data.usedLicenses)
          commit('SET_HOST_DB_GRANTS', allData[2].data)
          return allData[0].data.features
        })
      )
      .then((databases) => {
        if (databases) {
          const extraData = {
            licenses: (dbName) => getters.getCurrentHostDbLicenses(dbName),
            dbGrants: (dbName) => getters.getCurrentHostDbGrants(dbName),
          }

          const type = getters.currentHostType
          let hostDatabases = []

          if (type === 'oracle') {
            const oracle = databases.oracle.database.databases
            hostDatabases = mapHostDatabases(oracle, extraData, type)
          } else if (type === 'mysql') {
            const mysql = databases.mysql.instances
            hostDatabases = mapHostDatabases(mysql, extraData, type)
          } else if (type === 'microsoft') {
            const microsoft = databases.microsoft.sqlServer.instances
            hostDatabases = mapHostDatabases(microsoft, extraData, type)
          }
          commit('SET_CURRENT_HOST_DATABASES', hostDatabases)
        } else {
          commit('SET_CURRENT_HOST_DATABASES', [])
        }
      })
      .then(() => dispatch('offLoadingTable'))
  },
}
