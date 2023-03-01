import axios from 'axios'
// import store from '@/store/index.js'

const requestConfigSSO = axios.create()

requestConfigSSO.interceptors.request.use((config) => {
  // store.dispatch('onLoading')
  return config
})

export default requestConfigSSO
