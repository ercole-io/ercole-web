import _ from 'lodash'

const mountDatabasesChart = (prop, data) => {
  const finalChartData = []

  const groupByProp = _.groupBy(data, prop)
  const propData = []

  _.map(groupByProp, (value, key) => {
    propData.push({ name: key, value: value.length })
  })

  _.map(propData, item => {
    let name = ''

    if (item.name === 'true') {
      name = 'Yes'
    } else if (item.name === 'false') {
      name = 'No'
    } else {
      name = item.name
    }

    finalChartData.push({
      name: name,
      data: [['', item.value]]
    })
  })

  return finalChartData
}

export const pickDatabaseChart = (data, id, page) => {
  let chartValues = {}
  let key

  switch (id) {
    case 'TypeOfDatabases':
      chartValues = {
        title: 'Type Of Databases',
        collapseId: 'TypeOfDatabases',
        data: mountDatabasesChart('type', data),
        chartId: 'dt',
        isOpen: true
      }
      break
    case 'TypeOfEnvironment':
      chartValues = {
        title: 'Type Of Environment',
        collapseId: 'TypeOfEnvironment',
        data: mountDatabasesChart('environment', data),
        chartId: 'et'
      }
      break
    case 'ArchivelogMode':
      chartValues = {
        title: 'Archivelog Mode',
        collapseId: 'ArchivelogMode',
        data: mountDatabasesChart('archivelog', data),
        chartId: 'al'
      }
      break
    case 'DisasterRecovery':
      key = page === 'databases' ? 'disasterRecovery' : 'dataguard'
      chartValues = {
        title: 'Disaster Recovery',
        collapseId: 'DisasterRecovery',
        data: mountDatabasesChart(key, data),
        chartId: 'dr'
      }
      break
    case 'HighAvailability':
      key = page === 'databases' ? 'highAvailability' : 'ha'
      chartValues = {
        title: 'High Availability',
        collapseId: 'HighAvailability',
        data: mountDatabasesChart(key, data),
        chartId: 'ha'
      }
      break
    default:
      break
  }

  return chartValues
}
