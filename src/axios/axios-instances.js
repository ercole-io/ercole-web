import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

export default (name, auth, config) => {
  const token = localStorage.getItem('token')

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
    options.baseURL = baseApi
  } else if (name === 'chartApi') {
    options.baseURL = chartApi
  } else if (name === 'repoApi') {
    options.baseURL = repoApi
  } else if (name === 'thunderApi') {
    options.baseURL = thunderApi
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
      (error) => {
        console.log(error)
        return Promise.reject(errorResponseHandler(error))
      }
    )
  }

  return instance
}
