import _ from 'lodash'

export const mapDatabases = (dbs, query) => {
  if (dbs) {
    switch (query) {
      case 'databases':
        if (dbs.mysql && dbs.mysql.instances.length > 0) {
          return _.slice(_.map(dbs.mysql.instances, dbName => dbName.name))
        } else if (
          dbs.microsoft &&
          dbs.microsoft.sqlServer.instances.length > 0
        ) {
          return _.slice(
            _.map(dbs.microsoft.sqlServer.instances, dbName => dbName.name)
          )
        } else if (dbs.oracle) {
          if (dbs.oracle.database && dbs.oracle.database.databases.length > 0) {
            return _.slice(
              _.map(dbs.oracle.database.databases, dbName => dbName.name)
            )
          } else if (
            dbs.oracle.exadata &&
            dbs.oracle.exadata.components.length > 0
          ) {
            return _.slice(
              _.map(dbs.oracle.exadata.components, dbName => dbName.hostname)
            )
          } else {
            return '-'
          }
        } else {
          return '-'
        }
      case 'technology':
        if (dbs.mysql) {
          return 'MySql Server'
        } else if (dbs.microsoft) {
          return 'Microsoft SQL Server'
        } else if (dbs.oracle) {
          if (dbs.oracle.database) {
            return 'Oracle Database'
          } else if (dbs.oracle.exadata) {
            return 'Oracle Exadata'
          }
        } else {
          return '-- Not Available --'
        }
        break
      default:
        break
    }
  }
}
