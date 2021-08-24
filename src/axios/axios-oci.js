import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

const oracleCloudInstance = axios.create()

oracleCloudInstance.interceptors.request.use(config => {
  config.baseURL = store.getters.getOracleCloudInfraUrl

  // const token = localStorage.getItem('token')
  // config.headers.Authorization = `Bearer ${token}`

  store.dispatch('onLoading')
  return config
})

oracleCloudInstance.interceptors.response.use(response => {
  store.dispatch('offLoading')
  return response
}, errorResponseHandler)

export default oracleCloudInstance
