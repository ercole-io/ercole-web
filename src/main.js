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
import ClickCopy from 'vue-directive-copy'
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'

import CapitalizeFilter from './filters/capitalize.js'
import FormatDate from './filters/formatDate.js'
import FormatNumber from './filters/formatNumber.js'

import './assets/icons/material-design-webfonts/css/materialdesignicons.min.css'
import './assets/icons/font-awesome/css/all.min.css'
import 'animate.css'

Vue.component('default-layout', DefaultPage)
Vue.component('simple-layout', SimplePage)
Vue.component('error-layout', ErrorPage)

Vue.use(VueAsyncManager)
Vue.use(Buefy)
Vue.use(Chartkick.use(Chart))
Chartkick.options = {
  colors: [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgb(176, 101, 156)', // light purple
    'rgb(254, 188, 59)', // light orange
    'rgb(144, 190, 109)', // light green
    'rgb(253, 128, 128)', // light red
    'rgb(71, 172, 177)', // light blue
    'rgb(232, 221, 9)', // yellow
    'rgb(248, 150, 30)', // dark orange
    'rgb(139, 117, 215)', // dark purple
    'rgb(249, 65, 68)', // dark red
    'rgb(67, 170, 139)', // dark green
    'rgb(87, 117, 144)' // dark blue
  ].reverse()
}

Vue.use(SmartTable)
Vue.use(Vuelidate)
Vue.use(VTooltip)
Vue.use(ClickCopy)
Vue.use(vueFilterPrettyBytes)

Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('formatDate', FormatDate)
Vue.filter('formatNumber', FormatNumber)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
