import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import toLower from '@/filters/toLower.js'
import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapOracleDatabases = (data, extraData) => {
  let newData = []
  _.map(data, (item) => {
    const oracleDatabaseMemoryAdvisor = item.oracleDatabaseMemoryAdvisor
    const memorySizeLowerGb =
      oracleDatabaseMemoryAdvisor &&
      oracleDatabaseMemoryAdvisor.memorySizeLowerGb
        ? oracleDatabaseMemoryAdvisor.memorySizeLowerGb.toString()
        : ''
    const pgaTargetAggregateLowerGb =
      oracleDatabaseMemoryAdvisor &&
      oracleDatabaseMemoryAdvisor.pgaTargetAggregateLowerGb
        ? oracleDatabaseMemoryAdvisor.pgaTargetAggregateLowerGb.toString()
        : ''
    const sgaSizeLowerGb =
      oracleDatabaseMemoryAdvisor && oracleDatabaseMemoryAdvisor.sgaSizeLowerGb
        ? oracleDatabaseMemoryAdvisor.sgaSizeLowerGb.toString()
        : ''

    newData.push({
      tabName: item.name.toString(),
      id: item.dbID.toString(),
      name: item.name.toString(),
      dbName: item.name.toString(),
      status: item.status.toString(),
      role: item.role.toString(),
      dbID: item.dbID.toString(),
      uniqueName: item.uniqueName.toString(),
      archivelog: item.archivelog ? 'yes' : 'no',
      blockSize: item.blockSize.toString(),
      charset: item.charset.toString(),
      nCharset: item.nCharset.toString(),
      memoryTarget: item.memoryTarget.toString(),
      memorySizeLowerGb: memorySizeLowerGb,
      pgaTarget: item.pgaTarget.toString(),
      pgaTargetAggregateLowerGb: pgaTargetAggregateLowerGb,
      pgaSum: item.pgaSum.toString(),
      sgaMaxSize: item.sgaMaxSize.toString(),
      sgaTarget: item.sgaTarget.toString(),
      sgaSum: item.sgaSum.toString(),
      sgaSizeLowerGb: sgaSizeLowerGb,
      dbTime: item.dbTime.toString(),
      elapsed: item.elapsed ? item.elapsed.toString() : null,
      work: item.work ? item.work.toString() : '0',
      cpuCount: item.cpuCount.toString(),
      allocable: item.allocable.toString(),
      datafileSize: item.datafileSize.toString(),
      segmentsSize: item.segmentsSize.toString(),
      asm: item.asm ? 'yes' : 'no',
      dataguard: item.dataguard ? 'yes' : 'no',
      platform: item.platform.toString(),
      version: item.version.toString(),
      pdbs: item.pdbs ? resolvePdbs([...item.pdbs]) : null,
      options: item.featureUsageStats
        ? resolveOptions([...item.featureUsageStats])
        : null,
      tablespaces: item.tablespaces ? [...item.tablespaces] : null,
      schemas: item.schemas ? [...item.schemas] : null,
      patches: item.patches ? genericResolve([...item.patches]) : null,
      psus: item.psus ? genericResolve([...item.psus]) : null,
      addms: item.addms ? [...item.addms] : null,
      segmentAdvisors: item.segmentAdvisors ? [...item.segmentAdvisors] : null,
      dbGrowth: item.changes ? [...item.changes] : null,
      backups: item.backups ? [...item.backups] : null,
      services: item.services ? resolveServices([...item.services]) : null,
      dbGrants: item.grantDba ? resolveDbGrants([...item.grantDba]) : null,
      licenses: mapExtraData(item.name, extraData.licenses(item.name)),
      partitionings: genericResolve([...item.partitionings]),
      capacity: item.cpuDiskConsumptions
        ? resolveCapacity([...item.cpuDiskConsumptions])
        : [],
      capacityDaily: item.cpuDiskConsumptions
        ? resolveCapacityDaily([...item.cpuDiskConsumptions])
        : [],
      diskGroups: item.diskGroups,
    })
  })

  return newData
}

const resolveDbGrants = (grants) => {
  const dbaRole = []

  _.map(grants, (val) => {
    const defaultRole = toLower(val.defaultRole) === 'yes' ? true : false
    const adminOption = toLower(val.adminOption) === 'yes' ? true : false

    dbaRole.push({
      ...val,
      adminOption: adminOption,
      defaultRole: defaultRole,
    })
  })

  return dbaRole
}

const resolvePdbs = (pdbs) => {
  const filteredPdbs = []
  const grants = []

  _.filter(pdbs, (val) => {
    if (val) {
      _.map(val.grantDba, (grant) => {
        const defaultRole = toLower(grant.defaultRole) === 'yes' ? true : false
        const adminOption = toLower(grant.adminOption) === 'yes' ? true : false

        grants.push({
          adminOption: adminOption,
          defaultRole: defaultRole,
          grantee: grant.grantee,
        })
      })

      let capacityPdb = []
      let capacityDailyPdb = []
      _.map(val.cpuDiskConsumptionPdbs, (value) => {
        if (_.isString(value.target)) {
          value = _.omit(value, ['timeEnd', 'timeStart'])
          capacityPdb.push(value)
        } else {
          value = _.omit(value, ['timeEnd'])
          capacityDailyPdb.push(value)
        }
      })

      filteredPdbs.push({
        pdbName: val.name,
        pdbSchemas: val.schemas,
        pdbService: val.services,
        pdbStatus: val.status,
        pdbTablespaces: val.tablespaces,
        pdbGrantDba: grants,
        pdbAllocable: val.allocable,
        pdbDatafileSize: val.datafileSize,
        pdbSegmentsSize: val.segmentsSize,
        pdbPartitionings: val.partitionings,
        pdbCapacity: capacityPdb,
        pdbDailyCapacity: capacityDailyPdb,
        pdbServices: val.services,
        pdbPgsqlMigrability: val.pgsqlMigrability,
        pdbCharset: val.charset,
        pdbPgaTarget: _.round(val.pgaAggregateTarget, 3),
        pdbSgaTarget: _.round(val.sgaTarget, 3),
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
      container: val.containerName,
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

const resolveCapacity = (data) => {
  let capacity = []
  _.map(data, (value) => {
    value = _.omit(value, ['timeEnd', 'timeStart'])
    if (_.isString(value.target)) {
      capacity.push(value)
    }
  })

  return capacity
}

const resolveCapacityDaily = (data) => {
  let capacityDaily = []
  _.map(data, (value) => {
    value = _.omit(value, ['timeEnd'])
    if (!_.isString(value.target)) {
      capacityDaily.push(value)
    }
  })
  capacityDaily = _.orderBy(capacityDaily, ['timeStart'], ['asc'])
  return capacityDaily
}

export { mapOracleDatabases, resolveCapacity, resolveCapacityDaily }
