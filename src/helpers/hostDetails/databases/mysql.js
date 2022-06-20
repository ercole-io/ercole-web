import _ from 'lodash'
import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapMysqlDatabases = (data, extraData) => {
  let newData = []
  _.map(data, (item) => {
    newData.push({
      name: item.name,
      dbName: item.name,
      platform: item.platform,
      edition: item.edition,
      engine: item.engine,
      architecture: item.architecture,
      sortBufferSize: item.sortBufferSize,
      logBufferSize: item.logBufferSize,
      bufferPoolSize: item.bufferPoolSize,
      readOnly: item.readOnly ? 'yes' : 'no',
      redoLogEnabled: item.redoLogEnabled,
      threadsConcurrency: item.threadsConcurrency.toString(),
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
  return newData
}

export { mapMysqlDatabases }
