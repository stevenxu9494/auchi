<template>
  <div>
    <h1>这是我的页面</h1>
    <!-- 吸底footer -->
    <footer_bar></footer_bar>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import footer_bar from './footer_bar'
export default {
  name: 'my',
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {footer_bar},
}
</script>

<style lang="less" scoped>

</style>
