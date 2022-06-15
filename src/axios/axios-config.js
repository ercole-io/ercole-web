import axios from 'axios'
import store from '@/store/index.js'

const requestConfig = axios.create()

requestConfig.interceptors.request.use((config) => {
  store.dispatch('onLoading')
  return config
})

export default requestConfig
