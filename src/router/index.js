import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Hosts from '@/views/Hosts.vue'
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
    path: '/hosts',
    name: 'hosts',
    component: Hosts,
    meta: {
      title: 'Ercole - hosts'
    }
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
