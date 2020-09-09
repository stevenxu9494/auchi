<template>
  <div class="page">
    <van-sticky>
      <van-row class="header_nav">
        <van-col>
          <div class="logo">澳驰严选</div>
        </van-col>
        <van-col>
          <van-search class="index_header_search" placeholder="请输入搜索关键词" v-model="search_v" />
        </van-col>
        <van-col>
          <div class="loginBtn">登录</div>
        </van-col>
      </van-row>

      <!-- 滚动的Tab按钮列表 -->
      <van-tabs class="category_nav" title-active-color="red" v-model="activeName" @click="goodsDetail">
        <van-tab v-for="(item, index) in tabBtnList"  :key="index" :title="item.name" :name="item.name"></van-tab>
      </van-tabs>
    </van-sticky>

    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in banners" :key="index">
        <img v-lazy="image.banner_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 轮播图下广告 -->
    <van-row class="service_info">
      <van-col span="8">
        <!-- <i class="icon"></i> -->
        <span>🐕自营品牌</span>
      </van-col>
      <van-col span="8">
        <!-- <i class="icon"></i> -->
        <span>🐕正品保证</span>
      </van-col>
      <van-col span="8">
        <!-- <i class="icon"></i> -->
        <span>🐕24小时快速发货</span>
      </van-col>
    </van-row>

    <!-- 切换页面tab -->
    <div class="goodsListDiv">
      <h1>
        <label>好货优选</label>
        <span @click="toCategory">查看全部></span>
      </h1>
    </div>
    <van-grid :column-num="3" class="goodsList" :center = "false">
      <van-grid-item v-for="(value, index) in currentGoods" :key="index">
        <img :src=value.thumb_url alt="">
        <div> {{value.name}} </div>
      </van-grid-item>
    </van-grid>

    <!-- 吸底footer -->
    <footer_bar></footer_bar>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import footer_bar from './footer_bar'
export default {
  name: 'appIndex',
  data () {
    return {
      search_v: '',
      tabBtnList: [],
      banners: [],
      activeName: "奶粉",
      currentGoods: []
    }
  },
  components: {footer_bar},
  mounted() {
    this.goodsDetail()
  },
  methods: {
    async goodsDetail () {
      const data = await get('/index/index',{activeName: this.activeName})
      this.tabBtnList = data.newCategoryList
      this.banners = data.banner
      this.currentGoods = data.goodsList
    },
    toCategory () {
      this.$router.push('/category/' + this.activeName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.page {
  font-size: .22rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  .header_nav {
    background: #fff;
    .logo{      
      margin: .2rem 0 0 .15rem;
      width: 1.22rem;
      height: .5rem;
      line-height: .45rem;
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
    }
    .index_header_search {
      width: 3.8rem;
      border: 0;
      margin: .1rem 0 0 .1rem;
      padding:0;
    }
    .van-search__content {
      background: #ededed;
      border-radius: .15rem;
    }
    .loginBtn {
      margin: .14rem 0 0 .2rem;
      width: .8rem;
      height: .5rem;
      color: #f00;
      line-height: .5rem;
      text-align: center;
      border-radius: .1rem;
      border: 1px solid #f00;
    }
  }
  .banner {
    img {
    height:3rem;    
    width: 100%;
    }    
  }
  .service_info{
    text-align: center;
    height: .6rem;
    line-height: .6rem;
    // icon {

    // }
  }
  .goodsListDiv {
    clear:both;
    margin:.2rem 0;
    h1 {
      display: block;
      clear: both;
      margin: 0 0.2rem;
      height: .5rem;
      line-height: .5rem;
      font-weight:normal;
      label {
        float: left;       
        font-size: .3rem;
      }
      span {
        float: right;       
        font-size: .25rem;
        color:inherit;
        text-decoration: none;
      }
    }
  }
  .goodsList {
    img {
      width: 100%;
      height: 1.75rem;
    }
  }
}
</style>
