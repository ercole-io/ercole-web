import Vue from 'vue'
import Vuex from 'vuex'

import * as loading from './modules/loading'
import * as errors from './modules/errors'
import * as auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    errors,
    auth
  }
})
