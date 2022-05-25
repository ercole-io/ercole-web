import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import {
  getNotificationsByType,
  getHostInfo,
  getHostType,
  mapOracleDatabase,
  mapMySqlDatabase,
  mapMicrosoftDatabase,
  mountCpuUsageChart,
} from '@/helpers/hostDetails.js'

export const state = () => ({
  currentHost: {},
  hostType: '',
  activeDb: '',
  currentHostDatabases: [],
  currentHostDbLicenses: [],
  currentHostDbGrants: [],
  dbFiltersSelected: ['name'],
})

const info = [
  'status',
  'role',
  'dbID',
  'uniqueName',
  'archiveLog',
  'blockSize',
  'charset',
  'nCharset',
  'memoryTarget',
  'pgaTarget',
  'sgaMaxSize',
  'sgaTarget',
  'dbTime',
  'elapsed',
  'work',
  'cpuCount',
  'allocable',
  'datafileSize',
  'segmentsSize',
  'asm',
  'dataguard',
  'platform',
  'version',
]

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
        usedLicensesByDb.push(val)
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
  currentHostFiltered: (state, getters) => (search) => {
    const databases = getters.currentHostDBs
    let keys = state.dbFiltersSelected

    const filterSubChildArray = (subChildArray) => {
      return _.filter(subChildArray, (value) => {
        return _.some(value, (result) => {
          return (
            _.includes(_.toLower(result).toString(), _.toLower(search)) ||
            _.includes(result, search)
          )
        })
      })
    }

    const filterChildArray = (childArray) => {
      return _.filter(childArray, (value) => {
        return _.some(value, (result) => {
          return _.includes(_.toLower(result).toString(), _.toLower(search)) ||
            _.includes(result, search) ||
            filterSubChildArray(result).length > 0
            ? childArray
            : null
        })
      })
    }

    const filterDatabases = _.filter(databases, (db) => {
      return _.some(keys, (key) => {
        return _.includes(_.toLower(db[key]).toString(), _.toLower(search)) ||
          _.includes(db[key], search) ||
          filterChildArray(db[key]).length > 0
          ? db
          : null
      })
    })

    return filterDatabases
  },
  getCheckedFilters: (state) => (item) => {
    const checkInfo = _.map(info, (val) => {
      return _.includes(state.dbFiltersSelected, val)
    })

    if (
      state.dbFiltersSelected.length === 1 &&
      state.dbFiltersSelected[0] === 'name'
    ) {
      return true
    } else if (_.includes(checkInfo, true) && item === 'info') {
      return true
    } else {
      return _.includes(state.dbFiltersSelected, item)
    }
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
  SET_DATABASES_FILTERS: (state, payload) => {
    state.dbFiltersSelected = payload
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
          if (getters.currentHostType === 'oracle') {
            const extraData = {
              licenses: (dbName) => getters.getCurrentHostDbLicenses(dbName),
              dbGrants: (dbName) => getters.getCurrentHostDbGrants(dbName),
            }
            const oracle = mapOracleDatabase(
              databases.oracle.database.databases,
              extraData
            )
            commit('SET_CURRENT_HOST_DATABASES', oracle)
          } else if (getters.currentHostType === 'mysql') {
            const mysql = mapMySqlDatabase(databases.mysql.instances)
            commit('SET_CURRENT_HOST_DATABASES', mysql)
          } else if (getters.currentHostType === 'microsoft') {
            const microsoft = mapMicrosoftDatabase(
              databases.microsoft.sqlServer.instances
            )
            commit('SET_CURRENT_HOST_DATABASES', microsoft)
          } else {
            commit('SET_CURRENT_HOST_DATABASES', [])
          }
        }
      })
      .then(() => dispatch('offLoadingTable'))
  },
}
