import store from '../store/index.js'
import router from '../router/index.js'

const errorResponseHandler = (error) => {
  if (error.response) {
    store.dispatch('offLoading')

    if (error.response.status === 401) {
      router.push('/401')
    } else if (error.response.status === 500) {
      router.push('/500')
    } else if (error.response.status === 404) {
      router.push('/404')
    } else if (error.response.status === 403) {
      return Promise.reject(error)
    } else {
      router.push('/error')
    }
  }

  return Promise.reject(error)
}

export default errorResponseHandler
