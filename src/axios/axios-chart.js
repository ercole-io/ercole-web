import axios from 'axios'
import errorResponseHandler from '../helpers/errorHandler.js'
import store from '../store/index.js'

const chartInstance = axios.create()

chartInstance.interceptors.request.use(config => {
  config.baseURL = store.getters.getChartServiceBaseUrl

  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  if (store.dispatch('offLoading')) {
    store.dispatch('onLoading')
  }
  return config
})

chartInstance.interceptors.response.use(response => {
  if (store.dispatch('onLoading')) {
    store.dispatch('offLoading')
  }
  return response
}, errorResponseHandler)

export default chartInstance
