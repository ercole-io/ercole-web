import axios from 'axios'
import errorResponseHandler from '@/helpers/errorHandler.js'
import store from '@/store/index.js'

const defaultInstance = axios.create()

defaultInstance.interceptors.request.use(config => {
  config.baseURL = store.getters.getAPIServiceBaseURL

  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

defaultInstance.interceptors.response.use(response => {
  return response
}, errorResponseHandler)

export default defaultInstance
