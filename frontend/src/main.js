// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/rem'
import Vue from 'vue'
import App from './App'
import router from './router'

import { Button, Row, Col, Search, Tab, Tabs, Swipe, SwipeItem, Lazyload, Tabbar, TabbarItem, Grid, GridItem, Toast, Sticky, Notify, Sidebar, SidebarItem, GoodsAction, GoodsActionIcon, GoodsActionButton, NavBar, Popup, Cell } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Search).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Lazyload).use(Tabbar).use(TabbarItem).use(Grid).use(GridItem).use(Toast).use(Sticky).use(Notify).use(Sidebar).use(SidebarItem).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(NavBar).use(Popup).use(Cell)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
