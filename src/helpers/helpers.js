import moment from 'moment'

export const setLocalStorageAuth = payload => {
  localStorage.setItem('token', payload.token)
  localStorage.setItem('username', payload.username)
  const expirationTime = moment(payload.expiration * 1000).format()
  localStorage.setItem('expiration', expirationTime)
}

export const clearLocalStorageAuth = () => {
  localStorage.clear()
}

export const capitalize = value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
