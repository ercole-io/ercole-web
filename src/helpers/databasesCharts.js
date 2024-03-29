import _ from 'lodash'
import i18n from '@/i18n.js'

export const mountDatabasesChart = (data, page) => {
  let final

  if (page === 'databases') {
    final = _.concat(
      chartBySeries(data, 'type', i18n.t('common.charts.tyepDatabases')),
      chartBySeries(data, 'environment', i18n.t('common.charts.typeEnv')),
      chartBySeries(data, 'archivelog', i18n.t('common.charts.archivelog')),
      chartBySeries(
        data,
        'disasterRecovery',
        i18n.t('common.charts.disasterRecovery')
      ),
      chartBySeries(
        data,
        'highAvailability',
        i18n.t('common.charts.highAvailability')
      )
    )
  } else if (page === 'oracle') {
    final = _.concat(
      chartBySeries(data, 'environment', i18n.t('common.charts.typeEnv')),
      chartBySeries(data, 'archivelog', i18n.t('common.charts.archivelog')),
      chartBySeries(
        data,
        'dataguard',
        i18n.t('common.charts.disasterRecovery')
      ),
      chartBySeries(data, 'ha', i18n.t('common.charts.highAvailability')),
      chartBySeries(data, 'version', 'DB Version')
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

  if (seriesData && seriesData[0]) {
    if (seriesData[0].name === 'true' || seriesData[0].name === 'false') {
      seriesData = _.orderBy(seriesData, ['name'], ['desc'])
    } else {
      seriesData = _.orderBy(seriesData, ['value'], ['desc'])
    }
  }

  _.map(seriesData, (item) => {
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
      data: [[title, item.value]],
    })
  })

  return seriesFinal
}
