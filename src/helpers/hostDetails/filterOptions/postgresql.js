import { stringSearch } from '@/helpers/hostDetails/hostDetailsHelpers.js'

// PostgreSql Filter Options
const filterOptionsPostgreSql = [
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
    name: 'DB Name',
    value: 'dbName',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.dbName, search),
  },
  {
    name: 'Is In Replica',
    value: 'isinreplica',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.isinreplica, search),
  },
  {
    name: 'Is Master',
    value: 'ismaster',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.ismaster, search),
  },
  {
    name: 'Is Slave',
    value: 'isslave',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.isslave, search),
  },
  {
    name: 'Archiver Working',
    value: 'archiverWorking',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.archiverWorking, search),
  },
  {
    name: 'Port',
    value: 'port',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.port, search),
  },
  {
    name: 'Charset',
    value: 'charset',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.charset, search),
  },
  {
    name: 'DB Num',
    value: 'dbNum',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.dbNum, search),
  },
  {
    name: 'Instance Size',
    value: 'instanceSize',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.instanceSize, search),
  },
  {
    name: 'Max Connections',
    value: 'maxConnections',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.maxConnections, search),
  },
  {
    name: 'Slaves Num',
    value: 'slavesNum',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.slavesNum, search),
  },
  {
    name: 'Tblsp Num',
    value: 'tblspNum',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.tblspNum, search),
  },
  {
    name: 'Trust Hba Entries',
    value: 'trustHbaEntries',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.trustHbaEntries, search),
  },
  {
    name: 'Users Num',
    value: 'usersNum',
    level: 2,
    group: 'info',
    filter: (db, search) => stringSearch(db.usersNum, search),
  },
  {
    name: 'Databases',
    value: 'databases',
    level: 1,
    // group: 'databases',
    filter: (db, search) => databasesFilter(db.databases, search),
  },
  // {
  //   name: 'DB Name',
  //   value: 'databasesDbName',
  //   level: 2,
  //   group: 'databases',
  //   filter: (db, search) => databasesFilter(db.databases, search, 'dbName'),
  // },
  // {
  //   name: 'DB Owner',
  //   value: 'databasesDbOwner',
  //   level: 2,
  //   group: 'databases',
  //   filter: (db, search) => databasesFilter(db.databases, search, 'dbOwner'),
  // },
]

const databasesFilter = (db, search) => {
  return (
    db.filter((data) => {
      const searchdatconnlimit = stringSearch(data.datconnlimit, search)
      const searchdbName = stringSearch(data.dbName, search)
      const searchdbOwner = stringSearch(data.dbOwner, search)
      const searchdbSize = stringSearch(data.dbSize, search)
      const searchextensionsCount = stringSearch(data.extensionsCount, search)
      const searchindexesCount = stringSearch(data.indexesCount, search)
      const searchindexesSize = stringSearch(data.indexesSize, search)
      const searchlobsCount = stringSearch(data.lobsCount, search)
      const searchlobsSize = stringSearch(data.lobsSize, search)
      const searchlogicReplSetup = stringSearch(data.logicReplSetup, search)
      const searchmatviewsCount = stringSearch(data.matviewsCount, search)
      const searchmatviewsSize = stringSearch(data.matviewsSize, search)
      const searchpublicationsCount = stringSearch(
        data.publicationsCount,
        search
      )
      const searchschemas = data.schemas.filter((sch) => {
        return (
          stringSearch(sch.indexesCount, search) ||
          stringSearch(sch.indexesSize, search) ||
          stringSearch(sch.matviewsCount, search) ||
          stringSearch(sch.matviewsSize, search) ||
          stringSearch(sch.schemaName, search) ||
          stringSearch(sch.schemaOwner, search) ||
          stringSearch(sch.schemaSize, search) ||
          stringSearch(sch.tablesCount, search) ||
          stringSearch(sch.tablesSize, search) ||
          stringSearch(sch.viewsCount, search)
        )
      })
      const searchschemasCount = stringSearch(data.schemasCount, search)
      const searchsubscriptionsCount = stringSearch(
        data.subscriptionsCount,
        search
      )
      const searchtablesCount = stringSearch(data.tablesCount, search)
      const searchtablesSize = stringSearch(data.tablesSize, search)
      const searchviewsCount = stringSearch(data.viewsCount, search)

      return (
        searchdatconnlimit ||
        searchdbName ||
        searchdbOwner ||
        searchdbSize ||
        searchextensionsCount ||
        searchindexesCount ||
        searchindexesSize ||
        searchlobsCount ||
        searchlobsSize ||
        searchlogicReplSetup ||
        searchmatviewsCount ||
        searchmatviewsSize ||
        searchpublicationsCount ||
        searchschemas ||
        searchschemasCount ||
        searchsubscriptionsCount ||
        searchtablesCount ||
        searchtablesSize ||
        searchviewsCount
      )
    }).length > 0
  )
}

export { filterOptionsPostgreSql }
