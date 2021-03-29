import axios from 'axios'
import errorResponseHandler from '../helpers/errorHandler.js'
import store from '../store/index.js'

const chartInstance = axios.create()

chartInstance.interceptors.request.use(config => {
  config.baseURL = store.getters.getChartServiceBaseUrl

  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

chartInstance.interceptors.response.use(response => {
  return response
}, errorResponseHandler)

export default chartInstance
