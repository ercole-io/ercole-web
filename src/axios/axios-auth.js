import axios from 'axios'
import store from '../store/index.js'

const instance = axios.create({
  baseURL: ' http://dev.ercole.io/api/user'
})

instance.interceptors.request.use(config => {
  store.dispatch('onLoading')
  return config
})

export default instance
