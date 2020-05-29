import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAsyncManager from 'vue-async-manager'

import Buefy from 'buefy'
import './assets/scss/app.scss'

import Default from './layouts/Default.vue'
import Simple from './layouts/Simple.vue'

import i18n from './i18n'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import SmartTable from 'vuejs-smart-table'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import CapitalizeFilter from './filters/capitalize.js'

Vue.component('default-layout', Default)
Vue.component('simple-layout', Simple)

Vue.use(VueAsyncManager)
Vue.use(Buefy)
Vue.use(Chartkick.use(Chart))
Vue.use(SmartTable)
Vue.use(Vuelidate)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

Vue.filter('capitalize', CapitalizeFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
