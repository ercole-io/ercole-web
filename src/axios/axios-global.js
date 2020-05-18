import axios from 'axios'

const baseURL = process.env.VUE_APP_API

const globalInstance = axios.create({
  baseURL: baseURL
})

globalInstance.interceptors.request.use(config => {
  return config
})

globalInstance.interceptors.response.use(config => {
  return config
})

export default globalInstance
