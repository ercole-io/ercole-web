import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as loading from './modules/loading'
import * as errors from './modules/errors'
import * as auth from './modules/auth'
import * as dashboard from './modules/dashboard.js'
import * as hosts from './modules/hosts.js'
import * as alerts from './modules/alerts.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    errors,
    auth,
    dashboard,
    hosts,
    alerts
  },
  plugins: [
    createPersistedState({
      key: 'persisted-data',
      paths: ['auth']
    })
  ]
})
