import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import toLower from '@/filters/toLower.js'
import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapOracleDatabases = (data, extraData) => {
  let newData = []
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
      dbGrants: resolveDbGrants(
        mapExtraData(item.name, extraData.dbGrants(item.name))
      ),
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
