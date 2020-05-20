import Vue from 'vue'
import VueRouter from 'vue-router'

const title = 'Ercole - '

const Login = () => import('@/views/auth/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Hosts = () => import('@/views/hosts/Hosts.vue')
const HostsHome = () => import('@/views/hosts/HostsHome.vue')
const HostsDetails = () => import('@/views/hosts/HostsDetails.vue')
const Oracle = () => import('@/views/Oracle.vue')

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
          title: `${title}Hosts`
        },
        beforeEnter: verifyAuth
      },
      {
        path: 'details/:hostID',
        name: 'hosts-details',
        component: HostsDetails,
        props: true,
        meta: {
          title: `${title}Hosts Details`
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
      title: `${title}Oracle`
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
