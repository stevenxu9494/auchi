import Vue from 'vue'
import Router from 'vue-router'
import appIndex from '@/components/appIndex'
import category from '@/components/category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'appIndex',
      component: appIndex
    },
    {
      path: '/category/:cate',
      name: 'category',
      component: category
    }
  ]
})
