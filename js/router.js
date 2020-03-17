import Vue from '../libs/vue.esm.browser.js'
import VueRouter from '../libs/vue-router.esm.browser.js'
Vue.use(VueRouter)

import home from '../public/views/home.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name:"home",
      path: '/', 
      component: home
    },
  ]
});