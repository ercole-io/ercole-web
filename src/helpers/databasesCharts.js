import _ from 'lodash'

export const mountDatabasesChart = (data, page) => {
  let final
  if (page === 'databases') {
    final = _.concat(
      chartBySeries(data, 'type', 'Type Of Databases'),
      chartBySeries(data, 'environment', 'Type Of Environment'),
      chartBySeries(data, 'archivelog', 'Archivelog Mode'),
      chartBySeries(data, 'disasterRecovery', 'Disaster Recovery'),
      chartBySeries(data, 'highAvailability', 'High Availability')
    )
  } else if (page === 'oracle') {
    final = _.concat(
      chartBySeries(data, 'environment', 'Type Of Environment'),
      chartBySeries(data, 'archivelog', 'Archivelog Mode'),
      chartBySeries(data, 'dataguard', 'Disaster Recovery'),
      chartBySeries(data, 'ha', 'High Availability')
    )
  }

  return final
}

const chartBySeries = (data, type, title) => {
  const series = _.groupBy(data, type)
  let seriesData = []
  let seriesFinal = []

  _.map(series, (value, key) => {
    seriesData.push({ name: key, value: value.length })
  })

  if (seriesData[0].name === 'true' || seriesData[0].name === 'false') {
    seriesData = _.orderBy(seriesData, ['name'], ['desc'])
  } else {
    seriesData = _.orderBy(seriesData, ['value'], ['desc'])
  }

  _.map(seriesData, item => {
    let name = ''
    if (item.name === 'true') {
      name = 'Yes'
    } else if (item.name === 'false') {
      name = 'No'
    } else {
      name = item.name
    }

    seriesFinal.push({
      name: name,
      data: [[title, item.value]]
    })
  })

  return seriesFinal
}
