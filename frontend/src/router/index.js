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
import order from '@/components/order'
import myAddress from '@/components/myAddress'
import addAddress from '@/components/addAddress'
import editAddress from '@/components/editAddress'

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
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: myAddress
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: editAddress,
      props: (route) => ({ content: route.query.content}) 
    }
  ]
})



//路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (JSON.parse(getLocalStore('userInfo')!="{}")){
//       let userInfo = JSON.parse(getLocalStore('userInfo'))
//       if (userInfo.token) {
//           next()
//       } else {
//           next({
//               path: '/login'
//           })
//       }
//     }else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//       next()
//   }
// })

export default router
