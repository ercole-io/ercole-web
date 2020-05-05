import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Oracle from '@/views/Oracle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Ercole - Dashboard'
    }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/oracle',
    name: 'oracle',
    component: Oracle,
    meta: {
      title: 'Ercole - Oracle'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
