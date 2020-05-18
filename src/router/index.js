import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Hosts from '@/views/hosts/Hosts.vue'
import HostsHome from '@/views/hosts/HostsHome.vue'
import HostsDetails from '@/views/hosts/HostsDetails.vue'
import Oracle from '@/views/Oracle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Ercole - Login',
      layout: 'simple'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Ercole - Dashboard'
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/hosts',
    component: Hosts,
    children: [
      {
        path: '',
        name: 'hosts-home',
        component: HostsHome,
        meta: {
          title: 'Ercole - Hosts'
        },
        beforeEnter: verifyAuth
      },
      {
        path: 'details/:hostID',
        name: 'hosts-details',
        component: HostsDetails,
        props: true,
        meta: {
          title: 'Ercole - Hosts Details'
        },
        beforeEnter: verifyAuth
      }
    ]
  },
  {
    path: '/oracle',
    name: 'oracle',
    component: Oracle,
    meta: {
      title: 'Ercole - Oracle'
    },
    beforeEnter: verifyAuth
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

function verifyAuth(to, from, next) {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
}

export default router
