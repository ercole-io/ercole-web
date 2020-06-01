import store from '../store/index.js'

const errorResponseHandler = error => {
  if (error.config.errorHandle === false) {
    return Promise.reject(error)
  }

  if (error.response) {
    store.dispatch('offLoading')
    if (error.response.status === 401) {
      // show alert message and then logout
      store.dispatch('logout')
    }
    if (error.response.status === 422) {
      // resolver this error
    }
    if (error.response.status === 500) {
      // resolver this error
    }
  }
}

export default errorResponseHandler
