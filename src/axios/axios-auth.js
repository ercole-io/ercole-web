import axios from 'axios'
// import store from '../store/store'

const instance = axios.create({
  baseURL: ' http://dev.ercole.io/api/user'
})

export default instance
