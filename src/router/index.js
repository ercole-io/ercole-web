import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { lazy } from 'vue-async-manager'

const title = 'Ercole - '

const EmptyRouterView = () => import('@/views/Empty-Router-View.vue')
const Login = () => import('@/views/auth/Login.vue')
const Dashboard = lazy(() => import('@/views/Dashboard.vue'))
const Hosts = lazy(() => import('@/views/hosts/Hosts.vue'))
const HostsDetails = lazy(() => import('@/views/hosts/HostsDetails.vue'))
const Databases = lazy(() => import('@/views/databases/Databases.vue'))
const Oracle = lazy(() => import('@/views/databases/oracle/Oracle.vue'))
const ADDM = lazy(() => import('@/views/databases/oracle/ADDM.vue'))
const SegmentAdvisor = lazy(() =>
  import('@/views/databases/oracle/Segment-Advisor.vue')
)
const PatchAdvidor = lazy(() =>
  import('@/views/databases/oracle/Patch-Advidor.vue')
)
const Middleware = lazy(() => import('@/views/middleware/Middleware.vue'))
const LicensesAgreement = lazy(() =>
  import('@/views/licenses/LicensesAgreement.vue')
)
const LicensesCompliance = lazy(() =>
  import('@/views/licenses/LicensesCompliance.vue')
)
const LicensesUsed = lazy(() => import('@/views/licenses/LicensesUsed.vue'))
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
    component: EmptyRouterView,
    children: [
      {
        path: '',
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
        path: '/details/:hostname/:dbname?',
        name: 'hosts-details',
        component: HostsDetails,
        props: true,
        meta: {
          // label: 'Host Details',
          title: `${title}Host Details`,
          breadcrumb: [{ name: 'Hosts', link: '/hosts' }, { name: '' }]
        },
        beforeEnter: verifyAuth
      }
    ]
  },
  {
    path: '/databases',
    component: EmptyRouterView,
    children: [
      {
        path: '',
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
        path: '/oracle',
        component: EmptyRouterView,
        children: [
          {
            path: '',
            name: 'oracle',
            component: Oracle,
            meta: {
              label: 'Oracle',
              title: `${title}Oracle`,
              breadcrumb: [
                { name: 'Databases', link: '/databases' },
                { name: 'Oracle' }
              ]
            },
            beforeEnter: verifyAuth
          },
          {
            path: '',
            component: EmptyRouterView,
            children: [
              {
                path: '/addm',
                name: 'addm',
                component: ADDM,
                meta: {
                  label: 'Oracle: ADDM',
                  title: `${title}Oracle: ADDM`,
                  breadcrumb: [
                    { name: 'Databases', link: '/databases' },
                    { name: 'Oracle', link: '/oracle' },
                    { name: 'ADDM' }
                  ]
                },
                beforeEnter: verifyAuth
              },
              {
                path: '/segment-advisor',
                name: 'segment-advisor',
                component: SegmentAdvisor,
                meta: {
                  label: 'Oracle: Segment Advisor',
                  title: `${title}Oracle: Segment Advisor`,
                  breadcrumb: [
                    { name: 'Databases', link: '/databases' },
                    { name: 'Oracle', link: '/oracle' },
                    { name: 'Segment Advisor' }
                  ]
                },
                beforeEnter: verifyAuth
              },
              {
                path: '/patch-advisor',
                name: 'patch-advisor',
                component: PatchAdvidor,
                meta: {
                  label: 'Oracle: Patch Advisor',
                  title: `${title}Oracle: Patch Advisor`,
                  breadcrumb: [
                    { name: 'Databases', link: '/databases' },
                    { name: 'Oracle', link: '/oracle' },
                    { name: 'Patch Advisor' }
                  ]
                },
                beforeEnter: verifyAuth
              }
            ]
          }
        ]
      }
    ]
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
    path: '/licenses/agreement',
    name: 'licenses-agreement',
    component: LicensesAgreement,
    meta: {
      label: 'Licenses Agreement',
      title: `${title}Licenses Agreement`,
      breadcrumb: [{ name: 'Licenses Agreement' }]
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
    path: '/licenses/used',
    name: 'licenses-used',
    component: LicensesUsed,
    meta: {
      label: 'Licenses Used',
      title: `${title}Licenses Used`,
      breadcrumb: [{ name: 'Licenses Used' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/hypervisors',
    component: EmptyRouterView,
    children: [
      {
        path: '',
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
        path: '/cluster/:clustername',
        name: 'cluster-details',
        component: Cluster,
        props: true,
        meta: {
          // label: 'Cluster Details',
          title: `${title}Cluster Details`,
          breadcrumb: [
            { name: 'Hypervisors', link: '/hypervisors' },
            { name: '' }
          ]
        },
        beforeEnter: verifyAuth
      }
    ]
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
    path: '/alerts',
    name: 'alerts',
    component: Alerts,
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
