import _ from 'lodash'

// Map data from diferent api's
const mapExtraData = (name, extraData) => {
  const item = []
  _.map(extraData, (val) => {
    if (name === val.dbName) {
      item.push({ ...val })
    }
  })
  return item
}

// Search by string
const stringSearch = (str, srch) => {
  return str.toString().toUpperCase().includes(srch.toString().toUpperCase())
}

// Search By Licenses
const licensesFilter = (db, search) => {
  return (
    db.filter((license) => {
      const searchIgnoreComment = stringSearch(license.ignoredComment, search)
      const searchLicenseTypeID = stringSearch(license.licenseTypeID, search)
      const searchDescription = stringSearch(license.description, search)
      const searchMetric = stringSearch(license.metric, search)
      const searchUsedLicenses = stringSearch(license.usedLicenses, search)
      const searchClusterLicenses = stringSearch(
        license.clusterLicenses,
        search
      )

      return (
        searchIgnoreComment ||
        searchLicenseTypeID ||
        searchDescription ||
        searchMetric ||
        searchUsedLicenses ||
        searchClusterLicenses
      )
    }).length > 0
  )
}

export { mapExtraData, stringSearch, licensesFilter }
