import {
  stringSearch,
  licensesFilter,
} from '@/helpers/hostDetails/hostDetailsHelpers.js'

// Mysql Filter Options
const filterOptionsMysql = [
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
    name: 'Db Name',
    value: 'dbName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbName, search)
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
    name: 'Platform',
    value: 'platform',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.platform, search)
    },
  },
  {
    name: 'Architecture',
    value: 'architecture',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.architecture, search)
    },
  },
  {
    name: 'Edition',
    value: 'edition',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.edition, search)
    },
  },
  {
    name: 'Engine',
    value: 'engine',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.engine, search)
    },
  },
  {
    name: 'Sort Buffer Size',
    value: 'sortBufferSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.sortBufferSize, search)
    },
  },
  {
    name: 'Log Buffer Size',
    value: 'logBufferSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.logBufferSize, search)
    },
  },
  {
    name: 'Pool Buffer Size',
    value: 'bufferPoolSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.bufferPoolSize, search)
    },
  },
  {
    name: 'Read Only',
    value: 'readOnly',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.readOnly, search)
    },
  },
  {
    name: 'Redo Log Enabled',
    value: 'redoLogEnabled',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.redoLogEnabled, search)
    },
  },
  {
    name: 'Threads Concurrency',
    value: 'threadsConcurrency',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.threadsConcurrency, search)
    },
  },
  {
    name: 'Server Charset',
    value: 'charsetServer',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.charsetServer, search)
    },
  },
  {
    name: 'System Charset',
    value: 'charsetSystem',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.charsetSystem, search)
    },
  },
  {
    name: 'Page Size',
    value: 'pageSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.pageSize, search)
    },
  },
  {
    name: 'Licenses',
    value: 'licenses',
    level: 1,
    filter: (db, search) => licensesFilter(db.licenses, search),
  },
  {
    name: 'Databases',
    value: 'databases',
    level: 1,
    filter: (db, search) => databasesFilter(db.databases, search),
  },
  {
    name: 'Segment Advisors',
    value: 'segmentAdvisors',
    level: 1,
    filter: (db, search) => segmentAdvisorsFilter(db.segmentAdvisors, search),
  },
  {
    name: 'Table Schemas',
    value: 'tableSchemas',
    level: 1,
    filter: (db, search) => tableSchemasFilter(db.tableSchemas, search),
  },
]

const databasesFilter = (db, search) => {
  return (
    db.filter((data) => {
      const searchName = stringSearch(data.name, search)
      const searchCharset = stringSearch(data.charset, search)
      const searchCollation = stringSearch(data.collation, search)
      const searchEncrypted = stringSearch(data.encrypted, search)

      return searchName || searchCharset || searchCollation || searchEncrypted
    }).length > 0
  )
}

const segmentAdvisorsFilter = (db, search) => {
  return (
    db.filter((seg) => {
      console.log(seg)
      const searchData = stringSearch(seg.data, search)
      const searchegine = stringSearch(seg.engine, search)
      const searchFree = stringSearch(seg.free, search)
      const searchIndex = stringSearch(seg.index, search)
      const searchTableName = stringSearch(seg.tableName, search)
      const searchTableSchema = stringSearch(seg.tableSchema, search)
      const searchAllocation = stringSearch(seg.allocation, search)

      return (
        searchData ||
        searchegine ||
        searchegine ||
        searchFree ||
        searchIndex ||
        searchTableName ||
        searchTableSchema ||
        searchAllocation
      )
    }).length > 0
  )
}

const tableSchemasFilter = (db, search) => {
  return (
    db.filter((schema) => {
      const searchAllocation = stringSearch(schema.allocation, search)
      const searchEngine = stringSearch(schema.engine, search)
      const searchName = stringSearch(schema.name, search)

      return searchAllocation || searchEngine || searchName
    }).length > 0
  )
}

export { filterOptionsMysql }
