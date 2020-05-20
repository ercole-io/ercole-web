import axios from 'axios'

const instance = axios.create({
  baseURL: ' http://dev.ercole.io/api/user'
})

export default instance
