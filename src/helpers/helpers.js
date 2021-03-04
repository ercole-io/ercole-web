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

export const mapDbs = dbs => {
  if (dbs) {
    if (dbs.database) {
      if (dbs.database.databases.length > 0) {
        return _.map(dbs.database.databases, dbName => dbName.name)
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
    return true
  } else {
    return false
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
      moment
        .utc(date)
        .set({ hour: 23, minute: 59, second: 59 })
        .format('YYYY-MM-DDTHH:mm:ssZ')
    )
  } else {
    return null
  }
}

// INIT: Functions to use for filter data by keys //
export const organizeKeysBeforeFilter = keys => {
  const organizeFilters = _.pickBy(keys, _.identity)

  const filtersToApply = []
  _.forEach(organizeFilters, (val, key) => {
    filtersToApply.push({
      Field: key,
      Values: [checkBoolean(val)]
    })
  })

  return filtersToApply
}

export const filterByKeys = (data, keys) => {
  let advancedSearch = _.filter(data, item => {
    return _.every(keys, i => {
      let field = i.Field

      let hostValue =
        typeof i.Values[0] === 'string' ? i.Values[0].toUpperCase() : null
      let fieldValue =
        typeof item[field] === 'string' ? item[field].toUpperCase() : null
      let fieldValueZero =
        item[field] && typeof item[field][0] === 'string'
          ? item[field][0].toUpperCase()
          : null

      let result =
        _.indexOf(i.Values, item[field]) > -1 ||
        _.inRange(item[field], i.Values[0][0], i.Values[0][1] + 0.1) ||
        _.find(item[field], val => _.indexOf(i.Values, val) > -1) ||
        _.includes(fieldValueZero, hostValue) ||
        _.includes(fieldValue, hostValue)

      return result
    })
  })

  return advancedSearch
}
// END: Functions to use for filter data by keys //

// INIT: Prepare and filter data for autocomplete inputs //
export const prepareDataForAutocomplete = (data, toFilter) => {
  let filteredValues = []

  _.map(data, val => {
    if (_.isArray(val[toFilter])) {
      _.map(val[toFilter], value => {
        filteredValues.push(value)
      })
    } else {
      filteredValues.push(val[toFilter])
    }
  })

  filteredValues = _.uniqBy(filteredValues)
  filteredValues = _.orderBy(filteredValues, [], ['asc'])

  return filteredValues
}

export const returnAutocompleteData = (text, data, toFilter) => {
  return prepareDataForAutocomplete(data, toFilter).filter(value =>
    searchByChar(value, text)
  )
}

export const simpleAutocompleteData = (text, data) => {
  return _.filter(data, value => searchByChar(value, text))
}

const searchByChar = (value, text) => {
  if (value) {
    return (
      value
        .toString()
        .toLowerCase()
        .indexOf(text.toLowerCase()) >= 0
    )
  }
}

const checkBoolean = val => {
  if (val === 'true') {
    return true
  } else if (val === 'false') {
    return false
  } else {
    return val
  }
}
// END: Prepare and filter data for autocomplete inputs //
