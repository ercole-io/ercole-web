import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { lazy } from 'vue-async-manager'
import i18n from '@/i18n.js'

const title = 'Ercole - '
const lang = localStorage.getItem('lang')
i18n.locale = lang

const lazyRouteBuilder = (path) => {
  return lazy(() => import(/* webpackPreload: true */ `@/views/${path}`))
}
const routeBuilder = (path) => {
  return () => import(/* webpackPreload: true */ `@/views/${path}`)
}

const EmptyRouterView = routeBuilder('Empty-Router-View.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login/:code?',
    name: 'login',
    component: routeBuilder('auth/Login.vue'),
    meta: {
      title: `${title}Login`,
      layout: 'simple',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: lazyRouteBuilder('Dashboard.vue'),
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
        component: lazyRouteBuilder('hosts/Hosts.vue'),
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
        component: lazyRouteBuilder('hosts/HostsDetails.vue'),
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
        component: lazyRouteBuilder('databases/Databases.vue'),
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
            component: lazyRouteBuilder('databases/oracle/Oracle.vue'),
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
                component: lazyRouteBuilder('databases/oracle/ADDM.vue'),
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
                component: lazyRouteBuilder(
                  'databases/oracle/Segment-Advisor.vue'
                ),
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
                component: lazyRouteBuilder(
                  'databases/oracle/Patch-Advidor.vue'
                ),
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
              {
                path: '/dba-role',
                name: 'dba-role',
                component: lazyRouteBuilder('databases/oracle/DB-Grants.vue'),
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
                    { name: i18n.t('menu.dbGrants') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/patch',
                name: 'patch',
                component: lazyRouteBuilder('databases/oracle/Patch.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.patch')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.patch'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.patch') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/options',
                name: 'options',
                component: lazyRouteBuilder('databases/oracle/Options.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.options')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.options'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.options') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/tablespaces',
                name: 'tablespaces',
                component: lazyRouteBuilder('databases/oracle/Tablespaces.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.tablespaces'
                  )}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.tablespaces'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.tablespaces') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/backups',
                name: 'backups',
                component: lazyRouteBuilder('databases/oracle/Backups.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.backups')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.backups'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.backups') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/services',
                name: 'services',
                component: lazyRouteBuilder('databases/oracle/Services.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.services')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.services'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.services') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/dbgrowth',
                name: 'dbgrowth',
                component: lazyRouteBuilder('databases/oracle/DbGrowth.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.dbgrowth')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.dbgrowth'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.dbgrowth') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/schemas',
                name: 'schemas',
                component: lazyRouteBuilder('databases/oracle/Schemas.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.schemas')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.schemas'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.schemas') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/pdbs',
                name: 'pdbs',
                component: lazyRouteBuilder('databases/oracle/Pdbs.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.pdbs')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.pdbs'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.pdbs') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/cpu-time',
                name: 'cpu-time',
                component: lazyRouteBuilder('databases/oracle/CpuTime.vue'),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t('menu.cpu-time')}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.cpu-time'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.cpu-time') },
                  ],
                },
                beforeEnter: verifyAuth,
              },
              {
                path: '/partitioning',
                name: 'partitioning',
                component: lazyRouteBuilder(
                  'databases/oracle/Partitionings.vue'
                ),
                meta: {
                  label: `${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.partitionings'
                  )}`,
                  title: `${title}${i18n.t('menu.oracle')}: ${i18n.t(
                    'menu.partitionings'
                  )}`,
                  breadcrumb: [
                    { name: i18n.t('menu.databases'), link: '/databases' },
                    { name: i18n.t('menu.oracle'), link: '/oracle' },
                    { name: i18n.t('menu.partitionings') },
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
            component: lazyRouteBuilder('databases/mysql/MySQL.vue'),
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
      {
        path: '/microsoft',
        component: EmptyRouterView,
        children: [
          {
            path: '',
            name: 'microsoft',
            component: lazyRouteBuilder('databases/microsoft/Microsoft.vue'),
            meta: {
              label: i18n.t('menu.microsoft'),
              title: `${title}${i18n.t('menu.microsoft')}`,
              breadcrumb: [
                { name: i18n.t('menu.databases'), link: '/databases' },
                { name: i18n.t('menu.microsoft') },
              ],
            },
            beforeEnter: verifyAuth,
          },
        ],
      },
      {
        path: '/postgresql',
        component: EmptyRouterView,
        children: [
          {
            path: '',
            name: 'postgresql',
            component: lazyRouteBuilder('databases/postgresql/PostgreSql.vue'),
            meta: {
              label: i18n.t('menu.postgresql'),
              title: `${title}${i18n.t('menu.postgresql')}`,
              breadcrumb: [
                { name: i18n.t('menu.databases'), link: '/databases' },
                { name: i18n.t('menu.postgresql') },
              ],
            },
            beforeEnter: verifyAuth,
          },
        ],
      },
      {
        path: '/mongodb',
        component: EmptyRouterView,
        children: [
          {
            path: '',
            name: 'mongodb',
            component: lazyRouteBuilder('databases/mongodb/MongoDB.vue'),
            meta: {
              label: i18n.t('menu.mongodb'),
              title: `${title}${i18n.t('menu.mongodb')}`,
              breadcrumb: [
                { name: i18n.t('menu.databases'), link: '/databases' },
                { name: i18n.t('menu.mongodb') },
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
    component: lazyRouteBuilder('middleware/Middleware.vue'),
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
    component: lazyRouteBuilder('licenses/LicensesContracts.vue'),
    meta: {
      label: i18n.t('menu.licContracts'),
      title: `${title}${i18n.t('menu.licContracts')}`,
      breadcrumb: [{ name: i18n.t('menu.licContracts') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/licenses/compliance',
    name: 'licenses-compliance',
    component: lazyRouteBuilder('licenses/LicensesCompliance.vue'),
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
    component: lazyRouteBuilder('licenses/LicensesUsed.vue'),
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
        component: lazyRouteBuilder('hypervisors/Hypervisors.vue'),
        meta: {
          label: i18n.t('menu.hypervisors'),
          title: `${title}${i18n.t('menu.hypervisors')}`,
          breadcrumb: [{ name: i18n.t('menu.hypervisors') }],
        },
        beforeEnter: verifyAuth,
      },
      {
        path: '/hypervisors/:clustername',
        name: 'cluster-details',
        component: lazyRouteBuilder('hypervisors/Cluster.vue'),
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
    path: '/exadata',
    name: 'exadata',
    component: lazyRouteBuilder('exadata/Exadata.vue'),
    meta: {
      label: i18n.t('menu.exadata'),
      title: `${title}${i18n.t('menu.exadata')}`,
      breadcrumb: [{ name: i18n.t('menu.exadata') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/alerts',
    name: 'alerts',
    component: lazyRouteBuilder('alerts/Alerts.vue'),
    meta: {
      label: i18n.t('menu.alerts'),
      title: `${title}${i18n.t('menu.alerts')}`,
      breadcrumb: [{ name: i18n.t('menu.alerts') }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/cloud-advisor',
    component: EmptyRouterView,
    children: [
      {
        path: '/cloud-advisor/oracle',
        component: EmptyRouterView,
        children: [
          {
            path: '/cloud-advisor/oracle/profile-configurations',
            name: 'oracle-profile-configurations',
            component: lazyRouteBuilder('cloud/ProfileConfig.vue'),
            meta: {
              label: i18n.t('menu.profileConfig'),
              title: `${title}${i18n.t('menu.profileConfig')}`,
              breadcrumb: [
                { name: i18n.t('menu.cloudAdvisor') },
                { name: i18n.t('menu.oracle') },
                { name: i18n.t('menu.profileConfig') },
              ],
            },
          },
          {
            path: '/cloud-advisor/oracle/recommendations',
            name: 'oracle-recommendations',
            component: lazyRouteBuilder('cloud/Recommendations.vue'),
            meta: {
              label: i18n.t('menu.recommendations'),
              title: `${title}${i18n.t('menu.recommendations')}`,
              breadcrumb: [
                { name: i18n.t('menu.cloudAdvisor') },
                { name: i18n.t('menu.oracle') },
                { name: i18n.t('menu.recommendations') },
              ],
            },
          },
        ],
      },
      {
        path: '/cloud-advisor/aws',
        component: EmptyRouterView,
        children: [
          {
            path: '/cloud-advisor/aws/profile-configurations',
            name: 'aws-profile-configurations',
            component: lazyRouteBuilder('cloud/ProfileConfig.vue'),
            meta: {
              label: i18n.t('menu.profileConfig'),
              title: `${title}${i18n.t('menu.profileConfig')}`,
              breadcrumb: [
                { name: i18n.t('menu.cloudAdvisor') },
                { name: i18n.t('menu.aws') },
                { name: i18n.t('menu.profileConfig') },
              ],
            },
          },
          {
            path: '/cloud-advisor/aws/recommendations',
            name: 'aws-recommendations',
            component: lazyRouteBuilder('cloud/Recommendations.vue'),
            meta: {
              label: i18n.t('menu.recommendations'),
              title: `${title}${i18n.t('menu.recommendations')}`,
              breadcrumb: [
                { name: i18n.t('menu.cloudAdvisor') },
                { name: i18n.t('menu.aws') },
                { name: i18n.t('menu.recommendations') },
              ],
            },
          },
        ],
      },
      {
        path: '/cloud-advisor/azure',
        component: EmptyRouterView,
        children: [
          {
            path: '/cloud-advisor/azure/profile-configurations',
            name: 'azure-profile-configurations',
            component: lazyRouteBuilder('cloud/ProfileConfig.vue'),
            meta: {
              label: i18n.t('menu.profileConfig'),
              title: `${title}${i18n.t('menu.profileConfig')}`,
              breadcrumb: [
                { name: i18n.t('menu.cloudAdvisor') },
                { name: i18n.t('menu.azure') },
                { name: i18n.t('menu.profileConfig') },
              ],
            },
          },
          // {
          //   path: '/cloud-advisor/azure/recommendations',
          //   name: 'azure-recommendations',
          //   component: lazyRouteBuilder('cloud/Recommendations.vue'),
          //   meta: {
          //     label: i18n.t('menu.recommendations'),
          //     title: `${title}${i18n.t('menu.recommendations')}`,
          //     breadcrumb: [
          //       { name: i18n.t('menu.cloudAdvisor') },
          //       { name: i18n.t('menu.azure') },
          //       { name: i18n.t('menu.recommendations') },
          //     ],
          //   },
          // },
        ],
      },
    ],
  },
  {
    path: '/repository',
    name: 'repository',
    component: lazyRouteBuilder('repository/Repository.vue'),
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
    component: lazyRouteBuilder('settings/Settings.vue'),
    meta: {
      label: 'Settings',
      title: `${title}Settings`,
      breadcrumb: [{ name: 'Settings' }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/users',
    name: 'users',
    component: lazyRouteBuilder('profile/Users.vue'),
    meta: {
      label: 'Users',
      title: `${title}Users`,
      breadcrumb: [{ name: 'Users' }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/groups',
    name: 'groups',
    component: lazyRouteBuilder('profile/Groups.vue'),
    meta: {
      label: 'Groups',
      title: `${title}Groups`,
      breadcrumb: [{ name: 'Groups' }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/roles',
    name: 'roles',
    component: lazyRouteBuilder('profile/Roles.vue'),
    meta: {
      label: 'Roles',
      title: `${title}Roles`,
      breadcrumb: [{ name: 'Roles' }],
    },
    beforeEnter: verifyAuth,
  },
  {
    path: '/500',
    name: '500',
    component: lazyRouteBuilder('Errors/InternalServer.vue'),
    meta: {
      title: `${title}500 Internal Server Error`,
      layout: 'error',
    },
  },
  {
    path: '/401',
    name: '401',
    component: lazyRouteBuilder('Errors/Unauthorized.vue'),
    meta: {
      title: `${title}401 Unauthorized`,
      layout: 'error',
    },
  },
  {
    path: '/404',
    name: '404',
    component: lazyRouteBuilder('Errors/NotFound.vue'),
    meta: {
      title: `${title}404 Page Not Found`,
      layout: 'error',
    },
  },
  {
    path: '/error',
    name: 'error',
    component: lazyRouteBuilder('Errors/GeneralError.vue'),
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
  const token = sessionStorage.getItem('token')
  if (token && store.getters.isLoggedIn) {
    next()
  } else {
    store.dispatch('logout')
  }
}

export default router
