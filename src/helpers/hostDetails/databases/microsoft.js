import _ from 'lodash'
import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapMicrosoftDatabases = (data, extraData) => {
  let newData = []
  _.map(data, (item) => {
    const databases = []
    _.map(item.databases, (db) => {
      databases.push({
        info: {
          affinityMask: db.affinityMask,
          alloc: db.alloc,
          blockSize: db.blockSize,
          collationName: db.collationName,
          ctp: db.ctp,
          databaseID: db.databaseID,
          maxDop: db.maxDop,
          maxServerMemory: db.maxServerMemory,
          minServerMemory: db.minServerMemory,
          recoveryModel: db.recoveryModel,
          schedulersCount: db.schedulersCount,
          status: db.status,
          databaseName: db.name,
        },
        fileGroups: db.tablespaces,
        objectsSize: db.schemas,
        dbName: db.name,
      })
    })

    newData.push({
      name: item.name,
      dbName: item.name,
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
      databases: databases,
      licenses: mapExtraData(item.name, extraData.licenses(item.name)),
    })
  })
  return newData
}

export { mapMicrosoftDatabases }
