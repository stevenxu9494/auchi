/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import state from '@/store/state';
import { getLocalStore } from '@/config/global'

// 引入二级组件
import appIndex from '@/components/appIndex'
import category from '@/components/category'
import cart from '@/components/cart'
import my from '@/components/my'
import goods from '@/components/goods'
import login from '@/components/login'

Vue.use(Router)

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return {
            x: 0,
            y: 0
        }
    }
  },
  // 路由
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
      component: my,
      meta: {
        requireAuth: true
      }
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

let userInfo = JSON.parse(getLocalStore('userInfo'))

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
      if (userInfo.token) {
          next()
      } else {
          next({
              path: '/login'
          })
      }
  } else {
      next()
  }
})

export default router
