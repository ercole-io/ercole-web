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
import formatDate from '@/filters/formatDate.js'
import store from '@/store/index.js'
import { ModalProgrammatic as Modal } from 'buefy'
import ClusterNamesModal from '@/components/hosts/hostDetails/ClusterNamesModal.vue'

const startDate = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD')
const endDate = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD')

export const state = () => ({
  currentHost: {},
  currentHostActiveDB: '',
  dbFiltersSelected: ['name']
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
  'version'
]

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
    const current = state.currentHost

    const general = {
      name: 'General Info',
      data: [
        {
          name: 'Environment',
          value: current.environment
        },
        {
          name: 'Technology',
          value: mapDatabases(current.features, 'technology')
        },
        {
          name: 'Clust',
          value: mapClustStatus(current.clusterMembershipStatus)[0],
          hasIcon: true
        },
        {
          name: 'Cluster Type',
          value: mapClustStatus(current.clusterMembershipStatus)[1]
        }
      ]
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
                current.clusterMembershipStatus.veritasClusterHostnames
            }
          })
        }
      })
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
          value:
            info.hardwareAbstractionTechnology === 'PH'
              ? 'Bare Metal'
              : info.hardwareAbstractionTechnology
        },
        {
          name: 'Cluster',
          value: current.cluster
        },
        {
          name: 'Node',
          value: current.virtualizationNode
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
          value: current.agentVersion
        },
        {
          name: 'Last Update',
          value: formatDateTime(current.createdAt)
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
          return mapOracleDatabase(databases.oracle.database.databases)
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
  currentHostDBsInfo: (state, getters) => {
    const databases = getters.currentHostDBs

    return _.map(databases, val => {
      return {
        name: val.name,
        id: val.dbID
      }
    })
  },
  currentHostFiltered: (state, getters) => search => {
    const databases = getters.currentHostDBs
    let keys = state.dbFiltersSelected

    const filterSubChildArray = subChildArray => {
      return _.filter(subChildArray, value => {
        return _.some(value, result => {
          return (
            _.includes(_.toLower(result).toString(), _.toLower(search)) ||
            _.includes(result, search)
          )
        })
      })
    }

    const filterChildArray = childArray => {
      return _.filter(childArray, value => {
        return _.some(value, result => {
          return _.includes(_.toLower(result).toString(), _.toLower(search)) ||
            _.includes(result, search) ||
            filterSubChildArray(result).length > 0
            ? childArray
            : null
        })
      })
    }

    const filterDatabases = _.filter(databases, db => {
      return _.some(keys, key => {
        return _.includes(_.toLower(db[key]).toString(), _.toLower(search)) ||
          _.includes(db[key], search) ||
          filterChildArray(db[key]).length > 0
          ? db
          : null
      })
    })

    return filterDatabases
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
  },
  getCheckedFilters: state => item => {
    const checkInfo = _.map(info, val => {
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
  }
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
    const { name, dbID, dbGrowth } = item

    _.map(dbGrowth, data => {
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
      id: dbID,
      data: changedResult
    })
  })
  return dailyDbData
}

const matchSelectedDbs = (selected, dbs, rangeDates) => {
  let selectedDbs = []
  _.forEach(selected, val => {
    return _.map(mountTotalDailyUsageDbs(dbs, rangeDates), dbData => {
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
      data: mountTotalDailyUsage(history, rangeDates)
    }
  ]

  _.forEach(matchSelectedDbs(selected, dbs, rangeDates), item => {
    finalResult.push(item)
  })

  return finalResult
}

const mapOracleDatabase = data => {
  const newData = []
  _.map(data, item => {
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
      licenses: resolveLicenses([...item.licenses]),
      options: resolveOptions([...item.featureUsageStats]),
      tablespaces: [...item.tablespaces],
      schemas: [...item.schemas],
      patches: genericResolve([...item.patches]),
      psus: genericResolve([...item.psus]),
      addms: [...item.addms],
      segmentAdvisors: [...item.segmentAdvisors],
      dbGrowth: [...item.changes],
      backups: [...item.backups],
      services: resolveServices([...item.services])
    })
  })
  return newData
}

const resolvePdbs = pdbs => {
  let filteredPdbs = []
  _.filter(pdbs, val => {
    if (val) {
      filteredPdbs.push({
        pdbName: val.name,
        pdbSchemas: val.schemas,
        pdbService: val.services,
        pdbStatus: val.status,
        pdbTablespaces: val.tablespaces
      })
    }
  })

  return filteredPdbs
}

const resolveOptions = options => {
  let filteredOptions = []
  _.filter(options, val => {
    if (val) {
      filteredOptions.push({
        ...val,
        lastUsageDate: formatDate(val.lastUsageDate),
        firstUsageDate: formatDate(val.firstUsageDate)
      })
    }
  })

  return filteredOptions
}

const resolveServices = services => {
  let filteredServices = []
  _.filter(services, val => {
    if (val) {
      filteredServices.push({
        ...val,
        creationDate: formatDate(val.creationDate)
      })
    }
  })

  return filteredServices
}

const resolveLicenses = licences => {
  let filteredLicenses = []
  _.filter(licences, val => {
    let licenseComplement = store.getters.returnMetricAndDescription(
      val.licenseTypeID
    )

    if (val.count > 0) {
      filteredLicenses.push({
        ...val,
        description: licenseComplement.description,
        metric: licenseComplement.metric
      })
    }
  })

  return filteredLicenses
}

const genericResolve = data => {
  let filteredData = []
  _.filter(data, val => {
    filteredData.push({
      ...val,
      date: formatDate(val.date)
    })
  })
  return filteredData
}
