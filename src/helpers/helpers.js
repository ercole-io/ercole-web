import moment from 'moment'
import _ from 'lodash'

// INIT: Manage som localstorage data //
export const setLocalStorageAuth = payload => {
  localStorage.setItem('token', payload.token)
  localStorage.setItem('username', payload.username)
  const expirationTime = moment(payload.expiration * 1000).format()
  localStorage.setItem('expiration', expirationTime)
}

export const clearLocalStorageAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('expiration')
}
// END: Manage som localstorage data //

export const capitalize = value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const checkAlertIcon = severity => {
  if (severity === 'INFO') {
    return { iconType: 'is-info', icon: 'information' }
  } else if (severity === 'WARNING') {
    return { iconType: 'is-warning', icon: 'alert' }
  } else if (severity === 'CRITICAL') {
    return { iconType: 'is-danger', icon: 'information' }
  }
}

export const mapBooleanIcon = value => {
  const yesValue = ['check-circle', 'is-success', 'yes']
  const noValue = ['minus-circle', 'is-danger', 'no']
  return value ? yesValue : noValue
}

export const mapTechType = dbs => {
  if (dbs && dbs.oracle) {
    if (dbs.oracle && dbs.oracle.database) {
      if (dbs.oracle.database && dbs.oracle.database.databases) {
        if (
          dbs.oracle.database.databases &&
          dbs.oracle.database.databases.length > 0
        ) {
          return 'Oracle Database'
        } else {
          return '-'
        }
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  } else {
    return '-'
  }
}

export const mapClustStatus = clust => {
  if (
    clust &&
    (clust.hacmp ||
      clust.oracleClusterware ||
      clust.sunCluster ||
      clust.veritasClusterServer)
  ) {
    return mapBooleanIcon(true)
  } else {
    return mapBooleanIcon(false)
  }
}

export const verifyHostDateRange = (date, startDate, endDate) => {
  const dateToCheck = moment(date).format('YYYY-MM-DD')
  return moment(dateToCheck).isBetween(startDate, endDate)
}

export const returnAlertsByTypeDate = (alerts, type, startDate, endDate) => {
  return _.filter(alerts, val => {
    if (
      verifyHostDateRange(val.date, startDate, endDate) &&
      val.alertStatus !== 'ACK'
    ) {
      return val.alertCategory === type
    }
  })
}

export const formatDatepickerDate = (date = null) => {
  if (date) {
    return new Date(
      moment(date)
        .utc()
        .set({ hour: 23, minute: 59, second: 59 })
        .toISOString()
    )
  }

  return null
}

// INIT: Functions to use for filter data by keys and autocomplete inputs //
export const organizeKeysBeforeFilter = keys => {
  const organizeFilters = _.pickBy(keys, _.identity)

  const filtersToApply = []
  _.forEach(organizeFilters, (val, key) => {
    filtersToApply.push({
      Field: key,
      Values: [val]
    })
  })

  return filtersToApply
}

Array.prototype.filterByKeys = function(info) {
  return this.filter(item => {
    return info.every(i => {
      return i.Values.indexOf(item[i.Field]) > -1
    })
  })
}

export const prepareDataForAutocomplete = (data, toFilter) => {
  let filteredValues = []

  _.map(data, val => {
    filteredValues.push(val[toFilter])
  })

  filteredValues = _.uniqBy(filteredValues)
  filteredValues = _.orderBy(filteredValues, [], ['asc'])

  return filteredValues
}

export const returnAutocompleteData = (text, data, toFilter) => {
  return prepareDataForAutocomplete(data, toFilter).filter(value => {
    return value.toString().indexOf(text) >= 0
  })
}
// END: Functions to use for filter data by keys and autocomplete inputs //
