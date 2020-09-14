/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import appIndex from '@/components/appIndex'
import category from '@/components/category'
import cart from '@/components/cart'
import my from '@/components/my'
import goods from '@/components/goods'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'appIndex',
      component: appIndex
    },
    {
      path: '/category/:name',
      name: 'category',
      component: category
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: goods
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
