import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

export default (name, auth, config) => {
  const token = sessionStorage.getItem('token')

  const apiPrefix = store.getters.apiPrefix

  const baseApi = store.getters.getAPIServiceBaseURL
  const chartApi = store.getters.getChartServiceBaseUrl
  const repoApi = store.getters.getRepoServiceBaseUrl
  const thunderApi = store.getters.getOracleCloudInfraUrl

  let options = {}

  if (config) {
    options = config
  }

  if (name === 'login') {
    options.baseURL = baseApi
    store.dispatch('onLoading')
  } else if (name === 'baseApi') {
    options.baseURL = `${baseApi}${apiPrefix}`
  } else if (name === 'chartApi') {
    options.baseURL = `${chartApi}${apiPrefix}`
  } else if (name === 'repoApi') {
    options.baseURL = `${repoApi}`
  } else if (name === 'thunderApi') {
    options.baseURL = `${thunderApi}${apiPrefix}`
  }

  const instance = axios.create(options)

  if (auth) {
    instance.interceptors.request.use((request) => {
      request.headers.Authorization = `Bearer ${token}`
      return request
    })
  } else {
    instance.interceptors.request.use((request) => {
      return request
    })
  }

  if (name !== 'login') {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        try {
          await errorResponseHandler(error)
        } catch (handledError) {
          return Promise.reject(handledError)
        }
        return Promise.reject(error)
      }
    )
  }

  return instance
}
