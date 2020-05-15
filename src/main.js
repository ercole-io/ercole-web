import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import i18n from './i18n'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import SmartTable from 'vuejs-smart-table'

Vue.use(Buefy)
Vue.use(Chartkick.use(Chart))
Vue.use(SmartTable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
