<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160" @change="onChangeTabbars" class="footer" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category/奶粉" icon="search" dot>分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart" badge="5">购物车</van-tabbar-item>
      <van-tabbar-item to="/my" icon="friends">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'footer_bar',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onChangeTabbars (index) {
      console.log({ type: 'primary', message: index });
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
      /*height: 60px;*/
  padding-bottom: env(safe-area-inset-bottom);

  position: fixed;
  bottom: 0;
  background-color: #FFFFFF;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);

  van-tabbar-item{
      /*display: inline-block;*/
      display: block;
      width: 91.7%;
      height: 47px;
      margin: 7px 16px 6px 15px;
      background-color: #008CD6;
      border-radius: 5px;
      border: none;
      font-size: 18px;
      color: white;
      letter-spacing: 0.2px;
      text-align: center;
  }
}
</style>
