import axios from 'axios'
import errorResponseHandler from '../helpers/errorHandler.js'
import store from '../store/index.js'

const api = process.env.VUE_APP_API

const defaultInstance = axios.create({
  baseURL: api
})

defaultInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  if (store.dispatch('offLoading')) {
    store.dispatch('onLoading')
  }
  return config
})

defaultInstance.interceptors.response.use(response => {
  if (store.dispatch('onLoading')) {
    store.dispatch('offLoading')
  }
  return response
}, errorResponseHandler)

export default defaultInstance
