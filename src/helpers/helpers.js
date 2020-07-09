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
    return { iconType: 'is-info', icon: 'info-circle' }
  } else if (severity === 'WARNING') {
    return { iconType: 'is-warning', icon: 'exclamation-triangle' }
  } else if (severity === 'CRITICAL') {
    return { iconType: 'is-danger', icon: 'exclamation-circle' }
  }
}
