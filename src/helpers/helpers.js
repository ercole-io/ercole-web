export const setLocalStorageAuth = token => {
  localStorage.setItem('token', token)
}

export const clearLocalStorageAuth = () => {
  localStorage.removeItem('token')
}
