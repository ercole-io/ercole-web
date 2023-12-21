import _ from 'lodash'
import moment from 'moment'
import {
  returnAlertsByTypeDate,
  setRangeDateFormat,
  checkRangeDate,
} from '@/helpers/helpers.js'
import { mapClustStatus } from '@/helpers/helpers.js'
import { ModalProgrammatic as Modal } from 'buefy'
import formatDateTime from '@/filters/formatDateTime.js'
import ClusterNamesModal from '@/components/hosts/hostDetails/ClusterNamesModal.vue'

// Databases
import { mapOracleDatabases } from '@/helpers/hostDetails/databases/oracle.js'
import { mapMysqlDatabases } from '@/helpers/hostDetails/databases/mysql.js'
import { mapMicrosoftDatabases } from '@/helpers/hostDetails/databases/microsoft.js'
import { mapPostgreSqlDatabases } from '@/helpers/hostDetails/databases/postgresql.js'
import { mapMongoDbDatabases } from '@/helpers/hostDetails/databases/mongodb.js'

const startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
const endDate = moment().add(1, 'days').format('YYYY-MM-DD')

// Notifications
const getNotificationsByType = (notifications, type) => {
  return returnAlertsByTypeDate(notifications, type, startDate, endDate).length
}

// Host Info
const getHostInfo = (info, host) => {
  console.log(info)
  const clusterVersion = info.clusterwareVersion
    ? `- ${info.clusterwareVersion}`
    : ''

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
        value: `${
          mapClustStatus(host.clusterMembershipStatus)[1]
        } ${clusterVersion}`,
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
const getHostType = (hostType) => {
  if (hostType) {
    if (hostType === 'Oracle/Database') {
      return 'oracle'
    } else if (hostType === 'Oracle/MySQL') {
      return 'mysql'
    } else if (hostType === 'Microsoft/SQLServer') {
      return 'microsoft'
    } else if (hostType === 'PostgreSQL/PostgreSQL') {
      return 'postgresql'
    } else if (hostType === 'MongoDB/MongoDB') {
      return 'mongodb'
    } else {
      return null
    }
  }
}

// Map Host databases
const mapHostDatabases = (data, extraData, type) => {
  if (type === 'oracle') {
    return mapOracleDatabases(data, extraData)
  } else if (type === 'mysql') {
    return mapMysqlDatabases(data, extraData)
  } else if (type === 'microsoft') {
    return mapMicrosoftDatabases(data, extraData)
  } else if (type === 'postgresql') {
    return mapPostgreSqlDatabases(data, extraData)
  } else if (type === 'mongodb') {
    return mapMongoDbDatabases(data)
  }
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
}
