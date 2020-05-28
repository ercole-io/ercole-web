import axios from 'axios'
import store from '../store/index.js'

const api = process.env.VUE_APP_API

const authInstance = axios.create({
  baseURL: `${api}/user`
})

authInstance.interceptors.request.use(config => {
  store.dispatch('onLoading')
  return config
})

export default authInstance
