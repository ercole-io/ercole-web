import axios from 'axios'
import store from '../store/index.js'

const api = process.env.VUE_APP_API
const token = localStorage.getItem('token')

const defaultInstance = axios.create({
  baseURL: api,
  headers: { Authorization: `Bearer ${token}` }
})

defaultInstance.interceptors.request.use(config => {
  store.dispatch('onLoading')
  return config
})

export default defaultInstance
