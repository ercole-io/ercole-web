import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import {
  getNotificationsByType,
  getHostInfo,
  getHostType,
  mountCpuUsageChart,
  mapHostDatabases,
} from '@/helpers/hostDetails/hostDetails.js'
import { removeDashFromMsDesc } from '@/helpers/licenses.js'

// filter options
import { filterOptionsOracle } from '@/helpers/hostDetails/filterOptions/oracle.js'
import { filterOptionsMysql } from '@/helpers/hostDetails/filterOptions/mysql.js'
import { filterOptionsMicrosft } from '@/helpers/hostDetails/filterOptions/microsoft.js'
import { filterOptionsPostgreSql } from '@/helpers/hostDetails/filterOptions/postgresql.js'

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
  currentHostActiveDbIndex: (state, getters) => {
    const filteredDbs = getters.currentHostFiltered
    return _.findIndex(filteredDbs, {
      name: state.activeDb,
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
  currentDatabasesOptions: (state, getters) => {
    const hostType = getters.currentHostType

    if (hostType === 'oracle') {
      return filterOptionsOracle
    } else if (hostType === 'mysql') {
      return filterOptionsMysql
    } else if (hostType === 'microsoft') {
      return filterOptionsMicrosft
    } else if (hostType === 'postgresql') {
      return filterOptionsPostgreSql
    }
  },
  returnSelectedKeys: (state) => {
    return state.selectedKeys
  },
  currentHostFiltered: (state, getters) => {
    const databases = getters.currentHostDBs
    const selectedKeys = [...getters.returnSelectedKeys]
    const search = state.searchTermDB
    const options = getters.currentDatabasesOptions

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
      const selectedOptions = options.filter((item) =>
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
  getOracleCpuUsageChart: (state, getters, rootstate) => (selected) => {
    const dailyDbState = getters.currentHostDBs
    const dailyHistory = state.currentHost.history
    const rangeDates = rootstate.rangeDates.rangeDates

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
  async getHostByName({ commit, dispatch, getters }, payload) {
    if (payload.loading) {
      dispatch('onLoadingTable')
    }

    const baseUrl = `/hosts/${payload.hostname}`
    const endPoints = [
      baseUrl,
      `${baseUrl}/technologies/all/databases/licenses-used`,
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
          const hostType = allData[0].data.technology
          const hostDatabases = allData[0].data.features

          commit('SET_CURRENT_HOST', allData[0].data)
          commit('SET_CURRENT_HOST_TYPE', getHostType(hostType))
          commit('SET_HOST_DB_LICENSES', allData[1].data.usedLicenses)

          return hostDatabases
        })
      )
      .then((databases) => {
        if (databases) {
          const extraData = {
            licenses: (dbName) => getters.getCurrentHostDbLicenses(dbName),
          }

          const type = getters.currentHostType
          let getDatabases = []

          if (type === 'oracle') {
            const oracle = databases.oracle.database.databases
            getDatabases = mapHostDatabases(oracle, extraData, type)
          } else if (type === 'mysql') {
            const mysql = databases.mysql.instances
            getDatabases = mapHostDatabases(mysql, extraData, type)
          } else if (type === 'microsoft') {
            const microsoft = databases.microsoft.sqlServer.instances
            getDatabases = mapHostDatabases(microsoft, extraData, type)
          } else if (type === 'postgresql') {
            const postgresql = databases.postgresql.instances
            getDatabases = mapHostDatabases(postgresql, extraData, type)
          }
          commit('SET_CURRENT_HOST_DATABASES', getDatabases)
        } else {
          commit('SET_CURRENT_HOST_DATABASES', [])
        }
      })
      .then(() => dispatch('offLoadingTable'))
  },
}
