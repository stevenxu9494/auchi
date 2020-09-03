import Vue from 'vue'
import Router from 'vue-router'
import appIndex from '@/components/appIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'appIndex',
      component: appIndex
    }
  ]
})
