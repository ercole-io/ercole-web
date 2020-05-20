import axios from 'axios'
import store from '../store/index.js'

const instance = axios.create({
  baseURL: ' http://dev.ercole.io/api/user'
})

instance.interceptors.request.use(config => {
  store.dispatch('onLoading')
  return config
})

instance.interceptors.response.use(config => {
  if (store.getters['loadingStatus']) {
    store.dispatch('offLoading')
  }
  return config
})

export default instance
