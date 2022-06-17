import {
  stringSearch,
  // licensesFilter,
} from '@/helpers/hostDetails/hostDetailsHelpers.js'

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
    name: 'Name',
    value: 'dbName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbName, search)
    },
  },
  {
    name: 'Is In Replica',
    value: 'isinreplica',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.isinreplica, search)
    },
  },
  {
    name: 'Is Master',
    value: 'ismaster',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.ismaster, search)
    },
  },
  {
    name: 'Is Slave',
    value: 'isslave',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.isslave, search)
    },
  },
  {
    name: 'Archiver Working',
    value: 'archiverWorking',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.archiverWorking, search)
    },
  },
  {
    name: 'Port',
    value: 'port',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.port, search)
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
    name: 'DB Num',
    value: 'dbNum',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbNum, search)
    },
  },
  {
    name: 'Instance Size',
    value: 'instanceSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.instanceSize, search)
    },
  },
  {
    name: 'Max Connections',
    value: 'maxConnections',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.maxConnections, search)
    },
  },
  {
    name: 'Slaves Num',
    value: 'slavesNum',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.slavesNum, search)
    },
  },
  {
    name: 'Tblsp Num',
    value: 'tblspNum',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.tblspNum, search)
    },
  },
  {
    name: 'Trust Hba Entries',
    value: 'trustHbaEntries',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.trustHbaEntries, search)
    },
  },
  {
    name: 'Users Num',
    value: 'usersNum',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.usersNum, search)
    },
  },
  // {
  //   name: 'Databases',
  //   value: 'databases',
  //   level: 1,
  //   group: 'databases',
  //   filter: (db, search) => {
  //     return stringSearch(db.databases, search)
  //   },
  // },
  // {
  //   name: 'Licenses',
  //   value: 'licenses',
  //   level: 1,
  //   filter: (db, search) => licensesFilter(db.licenses, search),
  // },
]

export { filterOptionsPostgreSql }
