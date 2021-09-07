import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

const repoServiceInstance = axios.create()

repoServiceInstance.interceptors.request.use(config => {
  config.baseURL = store.getters.getRepoServiceBaseUrl

  store.dispatch('onLoading')
  return config
})

repoServiceInstance.interceptors.response.use(response => {
  store.dispatch('offLoading')
  return response
}, errorResponseHandler)

export default repoServiceInstance
