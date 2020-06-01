import store from '../store/index.js'
import router from '../router/index.js'

const errorResponseHandler = error => {
  if (error.config.errorHandle === false) {
    return Promise.reject(error)
  }

  if (error.response) {
    store.dispatch('offLoading')
    if (error.response.status === 401) {
      router.push('/401')
    }
    if (error.response.status === 500) {
      router.push('/500')
    }
  }
}

export default errorResponseHandler
