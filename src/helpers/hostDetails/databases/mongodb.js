import _ from 'lodash'
// import { mapExtraData } from '@/helpers/hostDetails/hostDetailsHelpers.js'

const mapMongoDbDatabases = (data) => {
  let newData = []
  _.map(data, (item) => {
    const databases = []
    _.map(item.dbStats, (db) => {
      databases.push({
        dbInfo: {
          dbName: db.dbName,
          charset: db.charset,
          collections: db.collections,
          dataSize: db.dataSize,
          freeStorageSize: db.freeStorageSize,
          fsTotalSize: db.fsTotalSize,
          fsUsedSize: db.fsUsedSize,
          indexFreeStorageSize: db.indexFreeStorageSize,
          indexSize: db.indexSize,
          indexes: db.indexes,
          objects: db.objects,
          storageSize: db.storageSize,
          totalFreeStorageSize: db.totalFreeStorageSize,
          totalSize: db.totalSize,
          users: db.users,
          views: db.views,
          shardDBs: db.shardDBs ? db.shardDBs.length : null,
        },
        shardDBs: db.shardDBs,
        name: db.dbName,
      })
    })

    newData.push({
      name: item.name,
      dbName: item.name,
      dbs: item.dbs,
      version: item.version,
      databases: databases,
      replicaSet: item.replicaSet,
      shardList: item.shardList.shards,
      statusConnection: item.statusConnection,
    })
  })

  return newData
}

export { mapMongoDbDatabases }
