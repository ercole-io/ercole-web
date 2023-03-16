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
    filter: (db, search) => stringSearch(db.name, search),
  },
  {
    name: 'Info',
    value: 'info',
    level: 1,
    group: 'info',
  },
  {
    name: 'Db Name',
    value: 'dbName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbName, search)
    },
  },
  {
    name: 'Charset',
    value: 'charset',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.charset, search)
    },
  },
  {
    name: 'Collections',
    value: 'collections',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.collections, search)
    },
  },
  {
    name: 'Data Size',
    value: 'dataSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dataSize, search)
    },
  },
  {
    name: 'Free Storage Size',
    value: 'freeStorageSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.freeStorageSize, search)
    },
  },
  {
    name: 'Fs Total Size',
    value: 'fsTotalSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.fsTotalSize, search)
    },
  },
  {
    name: 'Fs Used Size',
    value: 'fsUsedSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.fsUsedSize, search)
    },
  },
  {
    name: 'Index Free Storage Size',
    value: 'indexFreeStorageSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.indexFreeStorageSize, search)
    },
  },
  {
    name: 'Index Size',
    value: 'indexSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.indexSize, search)
    },
  },
  {
    name: 'Indexes',
    value: 'indexes',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.indexes, search)
    },
  },
  {
    name: 'Objects',
    value: 'objects',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.objects, search)
    },
  },
  {
    name: 'ShardDBs',
    value: 'shardDBs',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.shardDBs, search)
    },
  },
  {
    name: 'Storage Size',
    value: 'storageSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.storageSize, search)
    },
  },
  {
    name: 'Total Free Storage Size',
    value: 'totalFreeStorageSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.totalFreeStorageSize, search)
    },
  },
  {
    name: 'Total Size',
    value: 'totalSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.totalSize, search)
    },
  },
  {
    name: 'Users',
    value: 'users',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.users, search)
    },
  },
  {
    name: 'Views',
    value: 'views',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.views, search)
    },
  },
]

export { filterOptionsMongoDb }
