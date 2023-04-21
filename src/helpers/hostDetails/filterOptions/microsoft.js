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
    name: 'DB Name',
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
  {
    name: 'Patches',
    value: 'patches',
    level: 1,
    filter: (db, search) => patchesFilter(db.patches, search),
  },
  {
    name: 'Features',
    value: 'features',
    level: 1,
    filter: (db, search) => featuresFilter(db.features, search),
  },
]

// Search By Patches
const patchesFilter = (db, search) => {
  return (
    db.filter((patch) => {
      const searchDisplayName = stringSearch(patch.displayName, search)
      const searchDisplayVersion = stringSearch(patch.displayVersion, search)
      const searchInstallDate = stringSearch(patch.installDate, search)

      return searchDisplayName || searchDisplayVersion || searchInstallDate
    }).length > 0
  )
}

// Search By Features
const featuresFilter = (db, search) => {
  return (
    db.filter((feature) => {
      const searchclustered = stringSearch(feature.clustered, search)
      const searchconfigured = stringSearch(feature.configured, search)
      const searchedition = stringSearch(feature.edition, search)
      const searchfeature = stringSearch(feature.feature, search)
      const searchlanguage = stringSearch(feature.language, search)
      const searchproduct = stringSearch(feature.product, search)
      const searchversion = stringSearch(feature.version, search)

      return (
        searchclustered ||
        searchconfigured ||
        searchedition ||
        searchfeature ||
        searchlanguage ||
        searchproduct ||
        searchversion
      )
    }).length > 0
  )
}

export { filterOptionsMicrosft }
