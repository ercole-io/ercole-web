import axios from 'axios'

const api = process.env.VUE_APP_API
const token = localStorage.getItem('token')

const defaultInstance = axios.create({
  baseURL: api,
  headers: { Authorization: `Bearer ${token}` }
})

export default defaultInstance
