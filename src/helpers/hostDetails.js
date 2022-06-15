import _ from 'lodash'
import moment from 'moment'
import {
  returnAlertsByTypeDate,
  setRangeDateFormat,
  checkRangeDate,
} from '@/helpers/helpers.js'
// import { mapDatabases } from '@/helpers/databasesMap.js'
import { mapClustStatus } from '@/helpers/helpers.js'
import { ModalProgrammatic as Modal } from 'buefy'
import formatDateTime from '@/filters/formatDateTime.js'
import formatDate from '@/filters/formatDate.js'
import ClusterNamesModal from '@/components/hosts/hostDetails/ClusterNamesModal.vue'

const startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
const endDate = moment().add(1, 'days').format('YYYY-MM-DD')

// Notifications
const getNotificationsByType = (notifications, type) => {
  return returnAlertsByTypeDate(notifications, type, startDate, endDate).length
}

// Host Info
const getHostInfo = (info, host) => {
  const general = {
    name: 'General Info',
    data: [
      {
        name: 'Environment',
        value: host.environment,
      },
      {
        name: 'Technology',
        value: host.technology,
      },
      {
        name: 'Clust',
        value: mapClustStatus(host.clusterMembershipStatus)[0],
        hasIcon: true,
      },
      {
        name: 'Cluster Type',
        value: mapClustStatus(host.clusterMembershipStatus)[1],
      },
    ],
  }

  if (mapClustStatus(host.clusterMembershipStatus)[2]) {
    general.data.push({
      name: 'Cluster Nodes',
      value: mapClustStatus(host.clusterMembershipStatus)[2],
      hasLink: true,
      link: () => {
        Modal.open({
          component: ClusterNamesModal,
          hasModalCard: true,
          props: {
            clusterNames: host.clusterMembershipStatus.veritasClusterHostnames,
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
        value: host.cluster,
      },
      {
        name: 'Node',
        value: host.virtualizationNode,
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
        value: host.agentVersion,
      },
      {
        name: 'Last Update',
        value: formatDateTime(host.createdAt),
      },
    ],
  }
  return _.concat(general, osDetails, virtual, cpu, agent)
}

// Host Type
const getHostType = (databases) => {
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
}

// Map data from diferent api's
const mapExtraData = (name, extraData) => {
  const item = []
  _.map(extraData, (val) => {
    if (name === val.dbName) {
      item.push({ ...val })
    }
  })
  return item
}

// Map Host databases
const mapHostDatabases = (data, extraData, type) => {
  let newData = []
  if (type === 'oracle') {
    _.map(data, (item) => {
      newData.push({
        id: item.dbID,
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
  } else if (type === 'mysql') {
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
        licenses: mapExtraData(item.name, extraData.licenses(item.name)),
        dbGrants: mapExtraData(item.name, extraData.dbGrants(item.name)),
      })
    })
  } else if (type === 'microsoft') {
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
        licenses: mapExtraData(item.name, extraData.licenses(item.name)),
        dbGrants: mapExtraData(item.name, extraData.dbGrants(item.name)),
      })
    })
  }
  return newData
}

const stringContains = (str, srch) => {
  return str.toString().toUpperCase().includes(srch.toString().toUpperCase())
}

// Oracle Databases
const filterOptionsOracle = [
  {
    name: 'Database Name',
    value: 'name',
    disabled: (selectedKeys) => {
      return selectedKeys.length === 1 && selectedKeys.includes('name')
        ? true
        : false
    },
    level: 1,
    filter: (db, search) => {
      return stringContains(db.name, search)
    },
  },
  {
    name: 'Info',
    value: 'info',
    level: 1,
    group: 'info',
  },
  {
    name: 'Status',
    value: 'status',
    level: 2,
    group: 'info',
  },
  {
    name: 'Role',
    value: 'role',
    level: 2,
    group: 'info',
  },
  {
    name: 'Db ID',
    value: 'dbID',
    level: 2,
    group: 'info',
  },
  {
    name: 'Unique Name',
    value: 'uniqueName',
    level: 2,
    group: 'info',
  },
  {
    name: 'ArchiveLog',
    value: 'archiveLog',
    level: 2,
    group: 'info',
  },
  {
    name: 'Block Size',
    value: 'blockSize',
    level: 2,
    group: 'info',
  },
  {
    name: 'Charset',
    value: 'charset',
    level: 2,
    group: 'info',
  },
  {
    name: 'N Charset',
    value: 'nCharset',
    level: 2,
    group: 'info',
  },
  {
    name: 'Memory Target',
    value: 'memoryTarget',
    level: 2,
    group: 'info',
  },
  {
    name: 'PGA Target',
    value: 'pgaTarget',
    level: 2,
    group: 'info',
  },
  {
    name: 'SGA MaxSize',
    value: 'sgaMaxSize',
    level: 2,
    group: 'info',
  },
  {
    name: 'SGA Target',
    value: 'sgaTarget',
    level: 2,
    group: 'info',
  },
  {
    name: 'Db Time',
    value: 'dbTime',
    level: 2,
    group: 'info',
  },
  {
    name: 'Elapsed',
    value: 'elapsed',
    level: 2,
    group: 'info',
  },
  {
    name: 'Thread Used',
    value: 'work',
    level: 2,
    group: 'info',
  },
  {
    name: 'CPU Count',
    value: 'cpuCount',
    level: 2,
    group: 'info',
  },
  {
    name: 'Allocable',
    value: 'allocable',
    level: 2,
    group: 'info',
  },
  {
    name: 'DataFile Size',
    value: 'datafileSize',
    level: 2,
    group: 'info',
  },
  {
    name: 'Segments Size',
    value: 'segmentsSize',
    level: 2,
    group: 'info',
  },
  {
    name: 'ASM',
    value: 'asm',
    level: 2,
    group: 'info',
  },
  {
    name: 'Data Guard',
    value: 'dataguard',
    level: 2,
    group: 'info',
  },
  {
    name: 'Platform',
    value: 'platform',
    level: 2,
    group: 'info',
  },
  {
    name: 'Version',
    value: 'version',
    level: 2,
    group: 'info',
  },
  {
    name: 'Pluggable DBs',
    value: 'pdbs',
    level: 1,
    filter: (db, search) => {
      // {
      //   pdbName: val.name,
      //   pdbSchemas: val.schemas,
      //   pdbService: val.services,
      //   pdbStatus: val.status,
      //   pdbTablespaces: val.tablespaces,
      // }

      return (
        db.pdbs.filter((pdb) => {
          const searchName = stringContains(pdb.pdbName, search)
          const searchSchemas = pdb.pdbSchemas.filter((schema) =>
            stringContains(schema.user, search)
          )

          return searchName || searchSchemas
        }).length > 0
      )
    },
  },
  {
    name: 'Licenses',
    value: 'licenses',
    level: 1,
  },
  {
    name: 'DB Grants',
    value: 'dbGrants',
    level: 1,
  },
  {
    name: 'Options',
    value: 'options',
    level: 1,
  },
  {
    name: 'Tablespaces',
    value: 'tablespaces',
    level: 1,
  },
  {
    name: 'Schemas',
    value: 'schemas',
    level: 1,
  },
  {
    name: 'Patches',
    value: 'patches',
    level: 1,
  },
  {
    name: 'PSU',
    value: 'psus',
    level: 1,
  },
  {
    name: 'ADDM',
    value: 'addms',
    level: 1,
  },
  {
    name: 'Segment Advisors',
    value: 'segmentAdvisors',
    level: 1,
  },
  {
    name: 'Backups',
    value: 'backups',
    level: 1,
  },
  {
    name: 'Services',
    value: 'services',
    level: 1,
  },
]

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

export {
  getNotificationsByType,
  getHostInfo,
  getHostType,
  mountCpuUsageChart,
  mapHostDatabases,
  filterOptionsOracle,
}
