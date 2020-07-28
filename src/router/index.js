import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { lazy } from 'vue-async-manager'

const title = 'Ercole - '

const Login = () => import('@/views/auth/Login.vue')
const Dashboard = lazy(() => import('@/views/Dashboard.vue'))
const Hosts = lazy(() => import('@/views/hosts/Hosts.vue'))
const HostsDetails = lazy(() => import('@/views/hosts/HostsDetails.vue'))
const Databases = lazy(() => import('@/views/databases/Databases.vue'))
const Middleware = lazy(() => import('@/views/middleware/Middleware.vue'))
const LicensesCompliance = lazy(() =>
  import('@/views/licenses/LicensesCompliance.vue')
)
const LicensesList = lazy(() => import('@/views/licenses/LicensesList.vue'))
const Hypervisors = lazy(() => import('@/views/hypervisors/Hypervisors.vue'))
const Cluster = lazy(() => import('@/views/hypervisors/Cluster.vue'))
const Engineered = lazy(() => import('@/views/engineered/Engineered.vue'))
const Alerts = lazy(() => import('@/views/alerts/Alerts.vue'))
const Settings = lazy(() => import('@/views/settings/Settings.vue'))
const InternalServer = lazy(() => import('@/views/Errors/InternalServer.vue'))
const Unauthorized = lazy(() => import('@/views/Errors/Unauthorized.vue'))
const NotFound = lazy(() => import('@/views/Errors/NotFound.vue'))

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
    path: '/licenses/compliance',
    name: 'licenses-compliance',
    component: LicensesCompliance,
    meta: {
      label: 'Licenses Compliance',
      title: `${title}Licenses Compliance`,
      breadcrumb: [{ name: 'Licenses Compliance' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/licenses/list',
    name: 'licenses-list',
    component: LicensesList,
    meta: {
      label: 'Licenses List',
      title: `${title}Licenses List`,
      breadcrumb: [{ name: 'Licenses List' }]
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
    path: '/hypervisors/cluster/:clustername',
    name: 'cluster-details',
    component: Cluster,
    props: true,
    meta: {
      label: 'Cluster Details',
      title: `${title}Cluster Details`,
      breadcrumb: [
        { name: 'Hypervisors', link: '/hypervisors' },
        { name: 'Cluster Details' }
      ]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/engineered-systems',
    name: 'engineered-systems',
    component: Engineered,
    meta: {
      label: 'Engineered Systems',
      title: `${title}Engineered Systems`,
      breadcrumb: [{ name: 'Engineered Systems' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/alerts/:type?/:flag?',
    name: 'alerts',
    component: Alerts,
    props: true,
    meta: {
      label: 'Alerts',
      title: `${title}Alerts`,
      breadcrumb: [{ name: 'Alerts' }]
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
    path: '/500',
    name: '500',
    component: InternalServer,
    meta: {
      title: `${title}500 Internal Server Error`,
      layout: 'error'
    }
  },
  {
    path: '/401',
    name: '401',
    component: Unauthorized,
    meta: {
      title: `${title}401 Unauthorized`,
      layout: 'error'
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      title: `${title}404 Page Not Found`,
      layout: 'error'
    }
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
  next()
})

function verifyAuth(to, from, next) {
  const token = localStorage.getItem('token')
  if (token && store.getters.isLoggedIn) {
    next()
  } else {
    store.dispatch('logout')
  }
}

export default router
