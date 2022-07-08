import _ from 'lodash'
import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapPostgreSqlDatabases = (data, extraData) => {
  let newData = []
  _.map(data, (item) => {
    newData.push({
      name: item.name,
      dbName: item.name,
      archiverWorking: item.archiverWorking ? 'yes' : 'no',
      charset: item.charset,
      dbNum: item.dbNum,
      instanceSize: item.instanceSize,
      isinreplica: item.isinreplica ? 'yes' : 'no',
      ismaster: item.ismaster ? 'yes' : 'no',
      isslave: item.isslave ? 'yes' : 'no',
      maxConnections: item.maxConnections,
      port: item.port,
      slavesNum: item.slavesNum.toString(),
      tblspNum: item.tblspNum.toString(),
      trustHbaEntries: item.trustHbaEntries,
      usersNum: item.usersNum,
      databases: [...item.databases],
      licenses: mapExtraData(item.name, extraData.licenses(item.name)),
    })
  })
  return newData
}

export { mapPostgreSqlDatabases }
