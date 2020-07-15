import axios from 'axios'
import store from '../store/index.js'

const authInstance = axios.create()

authInstance.interceptors.request.use(config => {
  config.baseURL = `${store.getters.getAPIServiceBaseURL}/user`
  store.dispatch('onLoading')
  return config
})

export default authInstance
