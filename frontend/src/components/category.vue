<template>
  <div>
    <van-search class="index_header_search" placeholder="请输入搜索关键词" v-model="search_v" />
    <!-- 吸底footer -->
    <footer_bar></footer_bar>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import footer_bar from './footer_bar'
export default {
  name: 'category',
  data () {
    return {
      search_v: "",
      curNav: ""
    }
  },
  mounted () {
    this.curNav = this.$route.params.cate
  },
  components: {footer_bar},
}
</script>

<style>

</style>
