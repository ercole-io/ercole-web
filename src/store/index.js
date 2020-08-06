import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as config from './modules/config.js'
import * as loading from './modules/loading'
import * as errors from './modules/errors'
import * as auth from './modules/auth'
import * as dashboard from './modules/dashboard.js'
import * as hosts from './modules/hosts.js'
import * as alerts from './modules/alerts.js'
import * as licenses from './modules/licenses.js'
import * as charts from './modules/charts.js'
import * as clusters from './modules/clusters.js'
import * as technologies from './modules/technologies.js'
import * as databases from './modules/databases.js'
import * as oracle from './modules/oracle.js'
import * as oracleSegmentAdvisor from './modules/oracle-segment-advisor.js'
import * as oraclePatchAdvisor from './modules/oracle-patch-advisor.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    config,
    loading,
    errors,
    auth,
    dashboard,
    hosts,
    alerts,
    licenses,
    charts,
    clusters,
    technologies,
    databases,
    oracle,
    oracleSegmentAdvisor,
    oraclePatchAdvisor
  },
  plugins: [
    createPersistedState({
      key: 'persisted-data',
      paths: ['auth', 'alerts', 'technologies']
    })
  ]
})
