import moment from 'moment'

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
