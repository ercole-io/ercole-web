import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import toLower from '@/filters/toLower.js'
import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapOracleDatabases = (data, extraData) => {
  let newData = []
  _.map(data, (item) => {
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
      memoryTarget: item.memoryTarget ? 'yes' : 'no',
      pgaTarget: item.pgaTarget.toString(),
      sgaMaxSize: item.sgaMaxSize.toString(),
      sgaTarget: item.sgaTarget.toString(),
      dbTime: item.dbTime.toString(),
      elapsed: item.elapsed.toString(),
      work: item.work ? item.work.toString() : '0',
      cpuCount: item.cpuCount.toString(),
      allocable: item.allocable.toString(),
      datafileSize: item.datafileSize.toString(),
      segmentsSize: item.segmentsSize.toString(),
      asm: item.asm ? 'yes' : 'no',
      dataguard: item.dataguard ? 'yes' : 'no',
      platform: item.platform.toString(),
      version: item.version.toString(),
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
      dbGrants: item.grantDba ? resolveDbGrants([...item.grantDba]) : [],
      licenses: mapExtraData(item.name, extraData.licenses(item.name)),
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

      filteredPdbs.push({
        pdbName: val.name,
        pdbSchemas: val.schemas,
        pdbService: val.services,
        pdbStatus: val.status,
        pdbTablespaces: val.tablespaces,
        pdbGrantDba: grants,
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

export { mapOracleDatabases }
