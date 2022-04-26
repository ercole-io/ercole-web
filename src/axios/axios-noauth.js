import axios from 'axios'
import store from '@/store/index.js'

const noauthInstance = axios.create()

noauthInstance.interceptors.request.use((config) => {
  store.dispatch('onLoading')
  return config
})

export default noauthInstance
