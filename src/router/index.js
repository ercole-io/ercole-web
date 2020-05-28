import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

const title = 'Ercole - '

const Login = () => import('@/views/auth/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Hosts = () => import('@/views/hosts/Hosts.vue')
const HostsDetails = () => import('@/views/hosts/HostsDetails.vue')
const Databases = () => import('@/views/databases/Databases.vue')
const Middleware = () => import('@/views/middleware/Middleware.vue')
const Licenses = () => import('@/views/licenses/Licenses.vue')
const Hypervisors = () => import('@/views/hypervisors/Hypervisors.vue')
const Engineered = () => import('@/views/engineered/Engineered.vue')
const Systems = () => import('@/views/systems/Systems.vue')
const Notifications = () => import('@/views/notifications/Notifications.vue')
const Settings = () => import('@/views/settings/Settings.vue')
const NotFound = () => import('@/views/Errors/NotFound.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: `${title}Login`,
      layout: 'simple'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: `${title}Dashboard`
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/hosts',
    name: 'hosts',
    component: Hosts,
    meta: {
      label: 'Hosts',
      title: `${title}Hosts`,
      breadcrumb: [{ name: 'Hosts' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/hosts/details/:hostname',
    name: 'hosts-details',
    component: HostsDetails,
    props: true,
    meta: {
      label: 'Host Details',
      title: `${title}Host Details`,
      breadcrumb: [{ name: 'Hosts', link: '/hosts' }, { name: 'Host Details' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/databases',
    name: 'databases',
    component: Databases,
    meta: {
      label: 'Databases',
      title: `${title}Databases`,
      breadcrumb: [{ name: 'Databases' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/middleware',
    name: 'middleware',
    component: Middleware,
    meta: {
      label: 'Middleware',
      title: `${title}Middleware`,
      breadcrumb: [{ name: 'Middleware' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/licenses',
    name: 'licenses',
    component: Licenses,
    meta: {
      label: 'Licenses',
      title: `${title}Licenses`,
      breadcrumb: [{ name: 'Licenses' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/hypervisors',
    name: 'hypervisors',
    component: Hypervisors,
    meta: {
      label: 'Hypervisors',
      title: `${title}Hypervisors`,
      breadcrumb: [{ name: 'Hypervisors' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/engineered',
    name: 'engineered',
    component: Engineered,
    meta: {
      label: 'Engineered',
      title: `${title}Engineered`,
      breadcrumb: [{ name: 'Engineered' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/systems',
    name: 'systems',
    component: Systems,
    meta: {
      label: 'Systems',
      title: `${title}Systems`,
      breadcrumb: [{ name: 'Systems' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {
      label: 'Notifications',
      title: `${title}Notifications`,
      breadcrumb: [{ name: 'Notifications' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      label: 'Settings',
      title: `${title}Settings`,
      breadcrumb: [{ name: 'Settings' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: {
      name: '404'
    }
  },
  {
    path: '/',
    redirect: '/dashboard'
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
  if (to.name !== 'dashboard') {
    store.dispatch('onLoading')
  }
  next()
})

router.beforeResolve((to, from, next) => {
  if (to.name === 'dashboard' || to.name === 'login') {
    store.dispatch('offLoading')
  }
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
