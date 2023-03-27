import { stringSearch } from '@/helpers/hostDetails/hostDetailsHelpers.js'

// Mongodb Filter Options
const filterOptionsMongoDb = [
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
      return stringSearch(db.name, search)
    },
  },
  {
    name: 'Info',
    value: 'info',
    level: 1,
    group: 'info',
  },
  {
    name: 'DB Name',
    value: 'dbName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbName, search)
    },
  },
  {
    name: 'DBs',
    value: 'dbs',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbs, search)
    },
  },
  {
    name: 'Version',
    value: 'version',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.version, search)
    },
  },
  {
    name: 'Databases',
    value: 'databases',
    level: 1,
    filter: (db, search) => databasesFilter(db.databases, search),
  },
  {
    name: 'Shard List',
    value: 'shardList',
    level: 1,
    filter: (db, search) => shardListFilter(db.shardList, search),
  },
  {
    name: 'Replica Set',
    value: 'replicaSet',
    level: 1,
    filter: (db, search) => replicaSetFilter(db.replicaSet, search),
  },
  {
    name: 'Status Connection',
    value: 'statusConnection',
    level: 1,
    filter: (db, search) => statusConnectionFilter(db.statusConnection, search),
  },
]

const databasesFilter = (db, search) => {
  const searchShards =
    db.filter((data) => {
      return (
        stringSearch(data.shardDBs.partitioned, search) ||
        stringSearch(data.shardDBs.primary, search) ||
        stringSearch(data.shardDBs._id, search)
      )
    }).length > 0

  const searchInfo =
    db.filter((data) => {
      const searchname = stringSearch(data.dbInfo.name, search)
      const searchDbName = stringSearch(data.dbInfo.dbName, search)
      const searchCharset = stringSearch(data.dbInfo.charset, search)
      const searchcollections = stringSearch(data.dbInfo.collections, search)
      const searchdataSize = stringSearch(data.dbInfo.dataSize, search)
      const searchfreeStorageSize = stringSearch(
        data.dbInfo.freeStorageSize,
        search
      )
      const searchfsTotalSize = stringSearch(data.dbInfo.fsTotalSize, search)
      const searchfsUsedSize = stringSearch(data.dbInfo.fsUsedSize, search)
      const searchindexFreeStorageSize = stringSearch(
        data.dbInfo.indexFreeStorageSize,
        search
      )
      const searchindexSize = stringSearch(data.dbInfo.indexSize, search)
      const searchindexes = stringSearch(data.dbInfo.indexes, search)
      const searchobjects = stringSearch(data.dbInfo.objects, search)
      const searchshardDBs = stringSearch(data.dbInfo.shardDBs, search)
      const searchstorageSize = stringSearch(data.dbInfo.storageSize, search)
      const searchtotalFreeStorageSize = stringSearch(
        data.dbInfo.totalFreeStorageSize,
        search
      )
      const searchtotalSize = stringSearch(data.dbInfo.totalSize, search)
      const searchusers = stringSearch(data.dbInfo.users, search)
      const searchviews = stringSearch(data.dbInfo.views, search)

      return (
        searchname ||
        searchDbName ||
        searchCharset ||
        searchcollections ||
        searchdataSize ||
        searchfreeStorageSize ||
        searchfsTotalSize ||
        searchfsUsedSize ||
        searchindexFreeStorageSize ||
        searchindexSize ||
        searchindexes ||
        searchobjects ||
        searchshardDBs ||
        searchstorageSize ||
        searchtotalFreeStorageSize ||
        searchtotalSize ||
        searchusers ||
        searchviews
      )
    }).length > 0

  return searchInfo || searchShards
}

const shardListFilter = (db, search) => {
  return (
    db.filter((db) => {
      const searchHost = stringSearch(db.host, search)
      const searchState = stringSearch(db.state, search)
      const searchID = stringSearch(db._id, search)

      return searchHost || searchState || searchID
    }).length > 0
  )
}

const replicaSetFilter = (db, search) => {
  const searchPrimary = stringSearch(db.primary, search)
  const searchSetName = stringSearch(db.setName, search)
  const searchHosts = stringSearch(db.hosts, search)

  return searchPrimary || searchSetName || searchHosts
}

const statusConnectionFilter = (db, search) => {
  const searchActive = stringSearch(db.active, search)
  const searchAvailable = stringSearch(db.available, search)
  const searchAwaitingTopologyChanges = stringSearch(
    db.awaitingTopologyChanges,
    search
  )
  const searchCurrent = stringSearch(db.current, search)
  const searchExhaustHello = stringSearch(db.exhaustHello, search)
  const searchExhaustIsMaster = stringSearch(db.exhaustIsMaster, search)
  const searchLoadBalanced = stringSearch(db.loadBalanced, search)
  const searchThreaded = stringSearch(db.threaded, search)
  const searchTotalCreated = stringSearch(db.totalCreated, search)

  return (
    searchActive ||
    searchAvailable ||
    searchAwaitingTopologyChanges ||
    searchCurrent ||
    searchExhaustHello ||
    searchExhaustIsMaster ||
    searchLoadBalanced ||
    searchThreaded ||
    searchTotalCreated
  )
}

export { filterOptionsMongoDb }
