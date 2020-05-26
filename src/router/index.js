import Vue from 'vue'
import VueRouter from 'vue-router'

const title = 'Ercole - '

const Login = () => import('@/views/auth/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Hosts = () => import('@/views/hosts/Hosts.vue')
const HostsDetails = () => import('@/views/hosts/HostsDetails.vue')
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
    name: 'hosts-home',
    component: Hosts,
    meta: {
      title: `${title}Hosts`,
      breadcrumb: [{ name: 'Hosts' }]
    },
    beforeEnter: verifyAuth
  },
  {
    path: '/hosts/details/:hostID',
    name: 'hosts-details',
    component: HostsDetails,
    props: true,
    meta: {
      title: `${title}Host Details`,
      breadcrumb: [{ name: 'Hosts', link: '/hosts' }, { name: 'Host Details' }]
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
