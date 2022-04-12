import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { lazy } from 'vue-async-manager'
import i18n from '@/i18n.js'

const title = 'Ercole - '
const lang = localStorage.getItem('lang')
i18n.locale = lang

const EmptyRouterView = () =>
  import(/* webpackPreload: true */ '@/views/Empty-Router-View.vue')
const Login = () => import(/* webpackPreload: true */ '@/views/auth/Login.vue')
const Dashboard = lazy(() =>
  import(/* webpackPreload: true */ '@/views/Dashboard.vue')
)
const Hosts = lazy(() =>
  import(/* webpackPreload: true */ '@/views/hosts/Hosts.vue')
)
const HostsDetails = lazy(() =>
  import(/* webpackPreload: true */ '@/views/hosts/HostsDetails.vue')
)
const Databases = lazy(() =>
  import(/* webpackPreload: true */ '@/views/databases/Databases.vue')
)
const Oracle = lazy(() =>
  import(/* webpackPreload: true */ '@/views/databases/oracle/Oracle.vue')
)
const ADDM = lazy(() =>
  import(/* webpackPreload: true */ '@/views/databases/oracle/ADDM.vue')
)
const SegmentAdvisor = lazy(() =>
  import(
    /* webpackPreload: true */ '@/views/databases/oracle/Segment-Advisor.vue'
  )
)
const PatchAdvidor = lazy(() =>
  import(
    /* webpackPreload: true */ '@/views/databases/oracle/Patch-Advidor.vue'
  )
)
const MySQL = lazy(() =>
  import(/* webpackPreload: true */ '@/views/databases/mysql/MySQL.vue')
)
const Middleware = lazy(() =>
  import(/* webpackPreload: true */ '@/views/middleware/Middleware.vue')
)
const LicensesContracts = lazy(() =>
  import(/* webpackPreload: true */ '@/views/licenses/LicensesContracts.vue')
)
const LicensesCompliance = lazy(() =>
  import(/* webpackPreload: true */ '@/views/licenses/LicensesCompliance.vue')
)
const LicensesUsed = lazy(() =>
  import(/* webpackPreload: true */ '@/views/licenses/LicensesUsed.vue')
)
const Hypervisors = lazy(() =>
  import(/* webpackPreload: true */ '@/views/hypervisors/Hypervisors.vue')
)
const Cluster = lazy(() =>
  import(/* webpackPreload: true */ '@/views/hypervisors/Cluster.vue')
)
const Engineered = lazy(() =>
  import(/* webpackPreload: true */ '@/views/engineered/Engineered.vue')
)
const Alerts = lazy(() =>
  import(/* webpackPreload: true */ '@/views/alerts/Alerts.vue')
)
const Repository = lazy(() =>
  import(/* webpackPreload: true */ '@/views/repository/Repository.vue')
)
const Settings = lazy(() =>
  import(/* webpackPreload: true */ '@/views/settings/Settings.vue')
)
const InternalServer = lazy(() =>
  import(/* webpackPreload: true */ '@/views/Errors/InternalServer.vue')
)
const Unauthorized = lazy(() =>
  import(/* webpackPreload: true */ '@/views/Errors/Unauthorized.vue')
)
const NotFound = lazy(() =>
  import(/* webpackPreload: true */ '@/views/Errors/NotFound.vue')
)
const GeneralError = lazy(() =>
  import(/* webpackPreload: true */ '@/views/Errors/GeneralError.vue')
)
// const CloudRecommendations = lazy(() =>
//   import(/* webpackPreload: true */ '@/views/cloud/Recommendations.vue')
// )
const ProfileConfigurations = lazy(() =>
  import(/* webpackPreload: true */ '@/views/cloud/ProfileConfigurations.vue')
)
const ErcoleRecommendations = lazy(() =>
  import(/* webpackPreload: true */ '@/views/cloud/ErcoleRecommendations.vue')
)

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: `${title}Login`,
      layout: 'simple',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: `${title}Dashboard`,
    },
    beforeEnter: verifyAuth,
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
          label: i18n.t('menu.hosts'),
          title: `${title}${i18n.t('menu.hosts')}`,
          breadcrumb: [{ name: i18n.t('menu.hosts') }],
        },
        beforeEnter: verifyAuth,
      },
      {
        path: '/details/:hostname/:dbname?',
        name: 'hosts-details',
        component: HostsDetails,
        props: true,
        meta: {
          // label: 'Host Details',
          title: `${title}${i18n.t('menu.hosts')}`,
          breadcrumb: [
            { name: i18n.t('menu.hosts'), link: '/hosts' },
            { name: '' },
          ],
        },
        beforeEnter: verifyAuth,
      },
    ],
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
          label: i18n.t('menu.databases'),
          title: `${title}${i18n.t('menu.databases')}`,
          breadcrumb: [{ name: i18n.t('menu.databases') }],
        },
        beforeEnter: verifyAuth,
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
              label: i18n.t('menu.oracle'),
              title: `${title}${i18n.t('menu.oracle')}`,
              breadcrumb: [
                { name: i18n.t('menu.databases'), link: '/databases' },
                { name: i18n.t('menu.oracle') },
              ],
            },
            beforeEnter: verifyAuth,
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
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.addm')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.addm'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.addm') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/segment-advisor',
                name: 'segment-advisor',
                component: SegmentAdvisor,
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.segAdvisor'
                  )}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.segAdvisor'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.segAdvisor') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/patch-advisor',
                name: 'patch-advisor',
                component: PatchAdvidor,
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.patAdvisor'
                  )}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.patAdvisor'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.patAdvisor') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
            ],
          },
        ],
      },
      {
        path: '/mysql',
        component: EmptyRouterView,
        children: [
          {
            path: '',
            name: 'mysql',
            component: MySQL,
            meta: {
              label: i18n.t('menu.mysql'),
              title: `${title}${i18n.t('menu.mysql')}`,
              breadcrumb: [
                { name: i18n.t('menu.databases'), link: '/databases' },
                { name: i18n.t('menu.mysql') },
              ],
            },
            beforeEnter: verifyAuth,
          },
        ],
      },
    ],
  },
  {
    path: '/middleware',
    name: 'middleware',
    component: Middleware,
    meta: {
      label: 'Middleware',
      title: `${title}Middleware`,
      breadcrumb: [{ name: 'Middleware' }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/licenses/contract',
    name: 'licenses-contract',
    component: LicensesContracts,
    meta: {
      label: i18n.t('menu.licAgreements'),
      title: `${title}${i18n.t('menu.licAgreements')}`,
      breadcrumb: [{ name: i18n.t('menu.licAgreements') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/licenses/compliance',
    name: 'licenses-compliance',
    component: LicensesCompliance,
    meta: {
      label: i18n.t('menu.licCompliance'),
      title: `${title}${i18n.t('menu.licCompliance')}`,
      breadcrumb: [{ name: i18n.t('menu.licCompliance') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/licenses/used/:partNumber?',
    name: 'licenses-used',
    component: LicensesUsed,
    props: true,
    meta: {
      label: i18n.tc('menu.licUsed'),
      title: `${title}${i18n.tc('menu.licUsed')}`,
      breadcrumb: [{ name: i18n.tc('menu.licUsed') }],
    },
    beforeEnter: verifyAuth,
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
          label: i18n.t('menu.hypervisors'),
          title: `${title}${i18n.t('menu.hypervisors')}`,
          breadcrumb: [{ name: i18n.t('menu.hypervisors') }],
        },
        beforeEnter: verifyAuth,
      },
      {
        path: '/cluster/:clustername',
        name: 'cluster-details',
        component: Cluster,
        props: true,
        meta: {
          // label: 'Cluster Details',
          title: `${title}${i18n.t('menu.hypervisors')}`,
          breadcrumb: [
            { name: i18n.t('menu.hypervisors'), link: '/hypervisors' },
            { name: '' },
          ],
        },
        beforeEnter: verifyAuth,
      },
    ],
  },
  {
    path: '/engineered-systems',
    name: 'engineered-systems',
    component: Engineered,
    meta: {
      label: i18n.t('menu.engSystems'),
      title: `${title}${i18n.t('menu.engSystems')}`,
      breadcrumb: [{ name: i18n.t('menu.engSystems') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/alerts',
    name: 'alerts',
    component: Alerts,
    meta: {
      label: i18n.t('menu.alerts'),
      title: `${title}${i18n.t('menu.alerts')}`,
      breadcrumb: [{ name: i18n.t('menu.alerts') }],
    },
    beforeEnter: verifyAuth,
  },
  // {
  //   path: '/cloud-recommendations',
  //   name: 'cloud-recommendations',
  //   component: CloudRecommendations,
  //   meta: {
  //     label: i18n.t('menu.recommendations'),
  //     title: `${title}${i18n.t('menu.recommendations')}`,
  //     breadcrumb: [{ name: i18n.t('menu.recommendations') }],
  //   },
  // },
  {
    path: '/profile-configurations',
    name: 'profile-configurations',
    component: ProfileConfigurations,
    meta: {
      label: i18n.t('menu.profileConfig'),
      title: `${title}${i18n.t('menu.profileConfig')}`,
      breadcrumb: [{ name: i18n.t('menu.profileConfig') }],
    },
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: ErcoleRecommendations,
    meta: {
      label: i18n.t('menu.recommendations'),
      title: `${title}${i18n.t('menu.recommendations')}`,
      breadcrumb: [{ name: i18n.t('menu.recommendations') }],
    },
  },
  {
    path: '/repository',
    name: 'repository',
    component: Repository,
    meta: {
      label: i18n.t('menu.repository'),
      title: `${title}${i18n.t('menu.repository')}`,
      breadcrumb: [{ name: i18n.t('menu.repository') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      label: 'Settings',
      title: `${title}Settings`,
      breadcrumb: [{ name: 'Settings' }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/500',
    name: '500',
    component: InternalServer,
    meta: {
      title: `${title}500 Internal Server Error`,
      layout: 'error',
    },
  },
  {
    path: '/401',
    name: '401',
    component: Unauthorized,
    meta: {
      title: `${title}401 Unauthorized`,
      layout: 'error',
    },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      title: `${title}404 Page Not Found`,
      layout: 'error',
    },
  },
  {
    path: '/error',
    name: 'error',
    component: GeneralError,
    meta: {
      title: `Error`,
      layout: 'error',
    },
  },
  {
    path: '*',
    redirect: {
      name: '404',
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
})

router.beforeEach((to, from, next) => {
  if (
    to.name !== 'login' &&
    to.name !== '401' &&
    to.name !== '404' &&
    to.name !== '500'
  ) {
    localStorage.setItem('historyPage', to.path)
  }

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
