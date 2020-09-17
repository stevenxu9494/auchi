/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
// import getters from './getters'

// import CreatePersistedState from 'vuex-persistedstate'

// vuex-persistedstate默认持久化所有state 若不需要全部则把需要持久化的数据放到reducer里 比如 showHttpLoading、unionId 需要持久化 userCode不需要则不需要加入

// const vuexPersisted = new CreatePersistedState({
//     key: 'VuexPersisted',
//     storage: window.cookies, // 可选择 localStorage、sessionStorage、cookie 看需求 
//     reducer: state => ({
//       // loading
//       userInfo: state.userInfo,
//     //   // unionId
//     //   unionId: state.unionId,
//     })
// })

Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations,
    actions,
    // getters,
    // plugins: [vuexPersisted]
})