import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import { getView } from 'utils/tools.js'
// const getView = (viewName) => () => import(`views/${viewName}/index.vue`);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: getView('Index')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: getView('Home')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(route => {
  NProgress.done()
})

export default router
