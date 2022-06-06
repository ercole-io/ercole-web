import _ from 'lodash'

const findLicenseType = (desc) => {
  if (_.includes(desc, 'Oracle')) {
    return 'oracle'
  } else if (_.includes(desc, 'SQL Server')) {
    return 'microsoft'
  } else if (_.includes(desc, 'MySQL')) {
    return 'mysql'
  }
}

const removeDashFromMsDesc = (desc) => {
  return findLicenseType(desc) === 'microsoft' ? _.split(desc, '-')[0] : desc
}

export { findLicenseType, removeDashFromMsDesc }
