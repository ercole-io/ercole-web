import {
  stringSearch,
  licensesFilter,
} from '@/helpers/hostDetails/hostDetailsHelpers.js'

// Microsoft Filter Options
const filterOptionsMicrosft = [
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
    name: 'Db ID',
    value: 'databaseID',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.databaseID, search)
    },
  },
  {
    name: 'Status',
    value: 'status',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.status, search)
    },
  },
  {
    name: 'State Description',
    value: 'stateDesc',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.stateDesc, search)
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
    name: 'Collation Name',
    value: 'collationName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.collationName, search)
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
    name: 'Display Name',
    value: 'displayName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.displayName, search)
    },
  },
  {
    name: 'Server Name',
    value: 'serverName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.serverName, search)
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
    name: 'Edition Type',
    value: 'editionType',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.editionType, search)
    },
  },
  {
    name: 'Product Code',
    value: 'productCode',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.productCode, search)
    },
  },
  {
    name: 'Licensing Info',
    value: 'licensingInfo',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.licensingInfo, search)
    },
  },
  // {
  //   name: 'Databases',
  //   value: 'databases',
  //   level: 1,
  //   filter: (db, search) => {
  //     return (
  //       db.databases.filter((data) => {
  //         const searchDbName = stringSearch(data.dbName, search)
  //         console.log(searchDbName)
  //         return searchDbName
  //       }).length > 0
  //     )
  //   },
  // },
  {
    name: 'Licenses',
    value: 'licenses',
    level: 1,
    filter: (db, search) => licensesFilter(db.licenses, search),
  },
]

export { filterOptionsMicrosft }
