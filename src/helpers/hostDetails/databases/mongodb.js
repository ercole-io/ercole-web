import _ from 'lodash'
// import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapMongoDbDatabases = (data) => {
  let newData = []
  _.map(data, (item) => {
    newData.push({
      name: item.dbName,
      dbName: item.dbName,
      charset: item.charset,
      collections: item.collections,
      dataSize: item.dataSize,
      freeStorageSize: item.freeStorageSize,
      fsTotalSize: item.fsTotalSize,
      fsUsedSize: item.fsUsedSize,
      indexFreeStorageSize: item.indexFreeStorageSize,
      indexSize: item.indexSize,
      indexes: item.indexes,
      objects: item.objects,
      shardDBs: item.shardDBs,
      storageSize: item.storageSize,
      totalFreeStorageSize: item.totalFreeStorageSize,
      totalSize: item.totalSize,
      users: item.users,
      views: item.views,
    })
  })
  return newData
}

export { mapMongoDbDatabases }
