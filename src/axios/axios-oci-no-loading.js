import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

const oracleCloudInstance = axios.create()

oracleCloudInstance.interceptors.request.use((config) => {
  config.baseURL = store.getters.getOracleCloudInfraUrl

  return config
})

oracleCloudInstance.interceptors.response.use((response) => {
  return response
}, errorResponseHandler)

export default oracleCloudInstance
