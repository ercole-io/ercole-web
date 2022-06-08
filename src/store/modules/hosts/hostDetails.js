import _ from 'lodash'
import moment from 'moment'
import { axiosRequest } from '@/services/services.js'
import {
  mapClustStatus,
  returnAlertsByTypeDate,
  setRangeDateFormat,
  checkRangeDate,
} from '@/helpers/helpers.js'
import { mapDatabases } from '@/helpers/databasesMap.js'
import formatDateTime from '@/filters/formatDateTime.js'
import formatDate from '@/filters/formatDate.js'
import { ModalProgrammatic as Modal } from 'buefy'
import ClusterNamesModal from '@/components/hosts/hostDetails/ClusterNamesModal.vue'
import { removeDashFromMsDesc } from '@/helpers/licenses.js'

const startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
const endDate = moment().add(1, 'days').format('YYYY-MM-DD')

export const state = () => ({
  currentHost: {},
  currentHostActiveDB: '',
  dbFiltersSelected: ['name'],
  currentHostDbLicenses: [],
  currentHostDbGrants: [],
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
  currentHostNotifications: (state) => {
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
      hostname,
    }
  },
  currentHostFileSystems: (state) => {
    return state.currentHost.filesystems
  },
  currentHostName: (state) => {
    return state.currentHost.hostname
  },
  currentHostInfo: (state) => {
    const info = state.currentHost.info
    const current = state.currentHost

    const general = {
      name: 'General Info',
      data: [
        {
          name: 'Environment',
          value: current.environment,
        },
        {
          name: 'Technology',
          value: mapDatabases(current.features, 'technology'),
        },
        {
          name: 'Clust',
          value: mapClustStatus(current.clusterMembershipStatus)[0],
          hasIcon: true,
        },
        {
          name: 'Cluster Type',
          value: mapClustStatus(current.clusterMembershipStatus)[1],
        },
      ],
    }

    if (mapClustStatus(current.clusterMembershipStatus)[2]) {
      general.data.push({
        name: 'Cluster Nodes',
        value: mapClustStatus(current.clusterMembershipStatus)[2],
        hasLink: true,
        link: () => {
          Modal.open({
            component: ClusterNamesModal,
            hasModalCard: true,
            props: {
              clusterNames:
                current.clusterMembershipStatus.veritasClusterHostnames,
            },
          })
        },
      })
    }

    const osDetails = {
      name: 'OS Details',
      data: [
        {
          name: 'OS',
          value: `${info.os} - ${info.osVersion}`,
        },
        {
          name: 'Kernel',
          value: `${info.kernel} - ${info.kernelVersion}`,
        },
        {
          name: 'Memory',
          value: info.memoryTotal,
        },
        {
          name: 'Swap',
          value: info.swapTotal,
        },
      ],
    }
    const virtual = {
      name: 'Virtual',
      data: [
        {
          name: 'Platform',
          value:
            info.hardwareAbstractionTechnology === 'PH'
              ? 'Bare Metal'
              : info.hardwareAbstractionTechnology,
        },
        {
          name: 'Cluster',
          value: current.cluster,
        },
        {
          name: 'Node',
          value: current.virtualizationNode,
        },
      ],
    }
    const cpu = {
      name: 'CPU',
      data: [
        {
          name: 'Model',
          value: info.cpuModel,
        },
        {
          name: 'Threads',
          value: info.cpuThreads,
        },
        {
          name: 'Cores',
          value: info.cpuCores,
        },
        {
          name: 'Socket',
          value: info.cpuSockets,
        },
      ],
    }
    const agent = {
      name: 'Agent',
      data: [
        {
          name: 'Version',
          value: current.agentVersion,
        },
        {
          name: 'Last Update',
          value: formatDateTime(current.createdAt),
        },
      ],
    }
    return _.concat(general, osDetails, virtual, cpu, agent)
  },
  currentHostType: (state) => {
    const databases = state.currentHost.features

    if (databases) {
      if (databases.oracle) {
        return 'oracle'
      } else if (databases.mysql) {
        return 'mysql'
      } else if (databases.microsoft) {
        return 'microsoft'
      } else {
        return null
      }
    }
  },
  currentHostActiveDB: (state) => {
    return state.currentHostActiveDB
  },
  currentHostActiveDbIndex: (state, getters) => (filteredDbs) => {
    return _.findIndex(filteredDbs, {
      name: getters.currentHostActiveDB,
    })
  },
  currentHostDBs: (state, getters) => {
    const databases = state.currentHost.features

    if (databases) {
      if (databases.oracle) {
        if (databases.oracle.database.databases) {
          const oracleDatabases = databases.oracle.database.databases
          const extraData = {
            licenses: (dbName) => getters.getCurrentHostDbLicenses(dbName),
            dbGrants: (dbName) => getters.getCurrentHostDbGrants(dbName),
          }
          return mapOracleDatabase(oracleDatabases, extraData)
        } else {
          return []
        }
      } else if (databases.mysql) {
        if (databases.mysql.instances) {
          return mapMySqlDatabase(databases.mysql.instances)
        } else {
          return []
        }
      } else if (databases.microsoft) {
        if (databases.microsoft.sqlServer.instances) {
          return mapMicrosoftDatabase(databases.microsoft.sqlServer.instances)
        } else {
          return []
        }
      }
    } else {
      return null
    }
  },
  currentHostDBsInfo: (state, getters) => {
    const databases = getters.currentHostDBs

    return _.map(databases, (val) => {
      return {
        name: val.name,
        id: val.dbID,
      }
    })
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
  getOracleCpuUsageChart: (state, getters) => (selected) => {
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
}

export const mutations = {
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload
  },
  SET_ACTIVE_DB: (state, payload) => {
    state.currentHostActiveDB = payload
  },
  SET_DATABASES_FILTERS: (state, payload) => {
    state.dbFiltersSelected = payload
  },
  SET_HOST_DB_LICENSES: (state, payload) => {
    state.currentHostDbLicenses = payload
  },
  SET_HOST_DB_GRANTS: (state, payload) => {
    state.currentHostDbGrants = payload
  },
}

export const actions = {
  async getHostByName({ commit, dispatch, getters }, hostname) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: `/hosts/${hostname}`,
      params: {
        'older-than': getters.getActiveFilters.date,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_CURRENT_HOST', res.data)
      dispatch('offLoadingTable')
    })
  },
  async getLicensesByHostName({ commit }, hostname) {
    const config = {
      method: 'get',
      url: `/hosts/${hostname}/technologies/all/databases/licenses-used`,
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_HOST_DB_LICENSES', res.data.usedLicenses)
    })
  },
  async getDbGrantsByHostName({ commit }, hostname) {
    const config = {
      method: 'get',
      url: `/hosts/${hostname}/technologies/all/databases/grant-dba`,
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_HOST_DB_GRANTS', res.data)
    })
  },
}

// Oracle Chart
const mountTotalDailyUsage = (data, rangeDates) => {
  const totalDailyData = []
  let resultTotalDaily = {}

  _.map(data, (item) => {
    let date = setRangeDateFormat(item.createdAt)

    if (checkRangeDate(date, rangeDates)) {
      totalDailyData.push({
        date: date,
        value: item.totalDailyCPUUsage,
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

  _.map(data, (item) => {
    const { name, dbID, dbGrowth } = item

    _.map(dbGrowth, (data) => {
      let date = setRangeDateFormat(data.updated)

      if (checkRangeDate(date, rangeDates)) {
        changed.push({
          date: date,
          value: data.dailyCPUUsage,
        })
      }
    })

    const changedResult = {}
    for (const prop in changed) {
      changedResult[changed[prop].date] = changed[prop].value
    }

    dailyDbData.push({
      name: name,
      id: dbID,
      data: changedResult,
    })
  })
  return dailyDbData
}

const matchSelectedDbs = (selected, dbs, rangeDates) => {
  let selectedDbs = []
  _.forEach(selected, (val) => {
    return _.map(mountTotalDailyUsageDbs(dbs, rangeDates), (dbData) => {
      if (dbData.id === val.id) {
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
      data: mountTotalDailyUsage(history, rangeDates),
    },
  ]

  _.forEach(matchSelectedDbs(selected, dbs, rangeDates), (item) => {
    finalResult.push(item)
  })

  return finalResult
}

// Oracle Databases
const mapOracleDatabase = (data, extraData) => {
  const newData = []
  _.map(data, (item) => {
    newData.push({
      name: item.name,
      status: item.status,
      role: item.role,
      dbID: item.dbID,
      uniqueName: item.uniqueName,
      archivelog: item.archivelog,
      blockSize: item.blockSize,
      charset: item.charset,
      nCharset: item.nCharset,
      memoryTarget: item.memoryTarget,
      pgaTarget: item.pgaTarget,
      sgaMaxSize: item.sgaMaxSize,
      sgaTarget: item.sgaTarget,
      dbTime: item.dbTime,
      elapsed: item.elapsed,
      work: item.work,
      cpuCount: item.cpuCount,
      allocable: item.allocable,
      datafileSize: item.datafileSize,
      segmentsSize: item.segmentsSize,
      asm: item.asm,
      dataguard: item.dataguard,
      platform: item.platform,
      version: item.version,
      pdbs: resolvePdbs([...item.pdbs]),
      options: resolveOptions([...item.featureUsageStats]),
      tablespaces: [...item.tablespaces],
      schemas: [...item.schemas],
      patches: genericResolve([...item.patches]),
      psus: genericResolve([...item.psus]),
      addms: [...item.addms],
      segmentAdvisors: [...item.segmentAdvisors],
      dbGrowth: [...item.changes],
      backups: [...item.backups],
      services: resolveServices([...item.services]),
      licenses: mapExtraData(item.name, extraData.licenses(item.name)),
      dbGrants: mapExtraData(item.name, extraData.dbGrants(item.name)),
    })
  })
  return newData
}

const resolvePdbs = (pdbs) => {
  let filteredPdbs = []

  _.filter(pdbs, (val) => {
    if (val) {
      filteredPdbs.push({
        pdbName: val.name,
        pdbSchemas: val.schemas,
        pdbService: val.services,
        pdbStatus: val.status,
        pdbTablespaces: val.tablespaces,
      })
    }
  })

  return filteredPdbs
}

const resolveOptions = (options) => {
  let filteredOptions = []
  _.filter(options, (val) => {
    if (val) {
      filteredOptions.push({
        ...val,
        lastUsageDate: formatDate(val.lastUsageDate),
        firstUsageDate: formatDate(val.firstUsageDate),
      })
    }
  })

  return filteredOptions
}

const resolveServices = (services) => {
  let filteredServices = []
  _.filter(services, (val) => {
    filteredServices.push({
      name: val.name,
      creationDate: formatDate(val.creationDate),
      enabled: val.enabled,
    })
  })
  return filteredServices
}

const genericResolve = (data) => {
  let filteredData = []
  _.filter(data, (val) => {
    filteredData.push({
      ...val,
      date: formatDate(val.date),
    })
  })
  return filteredData
}

// MySql Database
const mapMySqlDatabase = (data) => {
  const newData = []
  _.map(data, (item) => {
    newData.push({
      name: item.name,
      platform: item.platform,
      edition: item.edition,
      engine: item.engine,
      architecture: item.architecture,
      sortBufferSize: item.sortBufferSize,
      logBufferSize: item.logBufferSize,
      bufferPoolSize: item.bufferPoolSize,
      readOnly: item.readOnly,
      redoLogEnabled: item.redoLogEnabled,
      threadsConcurrency: item.threadsConcurrency,
      charsetServer: item.charsetServer,
      charsetSystem: item.charsetSystem,
      pageSize: item.pageSize,
      version: item.version,
      databases: [...item.databases],
      segmentAdvisors: [...item.segmentAdvisors],
      tableSchemas: [...item.tableSchemas],
      dbGrowth: [...item.changes],
    })
  })
  return newData
}

// Microsoft Databases
const mapMicrosoftDatabase = (data) => {
  const newData = []
  _.map(data, (item) => {
    newData.push({
      name: item.name,
      info: {
        name: item.name,
        collationName: item.collationName,
        databaseID: item.databaseID,
        displayName: item.displayName,
        edition: item.edition,
        editionType: item.editionType,
        licensingInfo: item.licensingInfo,
        platform: item.platform,
        productCode: item.productCode,
        serverName: item.serverName,
        status: item.status,
        version: item.version,
        stateDesc: item.stateDesc,
      },
      databases: [...item.databases],
    })
  })
  return newData
}

// For all technologies
const mapExtraData = (name, extraData) => {
  const item = []
  _.map(extraData, (val) => {
    if (name === val.dbName) {
      item.push({ ...val })
    }
  })
  return item
}
