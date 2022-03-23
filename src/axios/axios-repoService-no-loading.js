import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

const repoServiceInstance = axios.create()

repoServiceInstance.interceptors.request.use((config) => {
  config.baseURL = store.getters.getRepoServiceBaseUrl

  return config
})

repoServiceInstance.interceptors.response.use((response) => {
  return response
}, errorResponseHandler)

export default repoServiceInstance
