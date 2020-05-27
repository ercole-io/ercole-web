import axios from 'axios'

const api = process.env.VUE_APP_API
const token = localStorage.getItem('token')

const instance = axios.create({
  baseURL: api,
  headers: { Authorization: `Bearer ${token}` }
})

export default instance
