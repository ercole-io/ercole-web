import store from '../store/index.js'
import router from '../router/index.js'

export const errorHandler = err => {
  store.dispatch('offLoading')
  if (err === 401) {
    store.dispatch('logout')
  }
  if (err === 404) {
    router.replace('/404')
  }
}
