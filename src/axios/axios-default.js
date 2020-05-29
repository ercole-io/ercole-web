import axios from 'axios'
import store from '../store/index.js'

const api = process.env.VUE_APP_API
const token = localStorage.getItem('token')

const defaultInstance = axios.create({
  baseURL: api,
  headers: { Authorization: `Bearer ${token}` }
})

defaultInstance.interceptors.request.use(config => {
  if (store.dispatch('offLoading')) {
    store.dispatch('onLoading')
  }
  return config
})

defaultInstance.interceptors.response.use(config => {
  if (store.dispatch('onLoading')) {
    store.dispatch('offLoading')
  }
  return config
})

export default defaultInstance
