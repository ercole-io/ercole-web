import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAsyncManager from 'vue-async-manager'

import Buefy from 'buefy'
import './assets/scss/app.scss'

import DefaultPage from './layouts/Default.vue'
import SimplePage from './layouts/Simple.vue'
import ErrorPage from './layouts/Error.vue'

import i18n from './i18n'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import SmartTable from 'vuejs-smart-table'
import Vuelidate from 'vuelidate'
import VTooltip from 'v-tooltip'

import CapitalizeFilter from './filters/capitalize.js'
import FormatDate from './filters/formatDate.js'

Vue.component('default-layout', DefaultPage)
Vue.component('simple-layout', SimplePage)
Vue.component('error-layout', ErrorPage)

Vue.use(VueAsyncManager)
Vue.use(Buefy)
Vue.use(Chartkick.use(Chart))
Chartkick.options = {
  colors: [
    'rgb(249, 65, 68)',
    'rgb(243, 114, 44)',
    'rgb(248, 150, 30)',
    'rgb(249, 199, 79)',
    'rgb(144, 190, 109)',
    'rgb(67, 170, 139)',
    'rgb(87, 117, 144)',
    'rgb(0, 63, 92)'
  ]
}

Vue.use(SmartTable)
Vue.use(Vuelidate)
Vue.use(VTooltip)

Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('formatDate', FormatDate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
