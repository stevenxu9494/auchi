<template>
  <div>
    <!-- 搜索 -->
    <van-search class="index_header_search" placeholder="请输入搜索关键词" v-model="search_v" />

    <!-- 侧边导航 -->
    <van-sidebar class="categoryNav" v-model="activeKey" @change="onChangeSidebar">
      <van-sidebar-item v-for="(value, index) in tabBtnList" :key="index" :title="value.name"></van-sidebar-item>
    </van-sidebar>

    <!-- 右边九宫格 -->
    <van-grid class="goodsList" :column-num="3" :center = "false">
      <van-grid-item v-for="(value, index) in currentGoods" :key="index" class="gridItem" @click="toGoods(value.goods_id)">
        <img :src=value.thumb_url alt="">
        <div class="van-multi-ellipsis--l2"> {{value.name}} </div>
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
  name: 'category',
  data () {
    return {
      search_v: "",
      curNav: "",
      activeKey: 0,
      tabBtnList:[],
      currentGoods:[]
    }
  },
  mounted () {
    this.curNav = this.$route.params.name
    this.getGoodsList()
  },
  components: {footer_bar},
  methods: {
    async getGoodsList () {
      const data = await get('/category/currentaction',{activeName: this.curNav})
      this.tabBtnList = data.category
      for (let i=0; i< this.tabBtnList.length; i++) {
        const categoryName = this.tabBtnList[i].name
        if (categoryName == this.curNav) {
          this.activeKey = i
        }
      }
      this.currentGoods = data.goodsList
    },
    onChangeSidebar (index) {
      this.curNav = this.tabBtnList[index].name
      this.getGoodsList()
    },
    toGoods (id) {
      this.$router.push({
        name: "goods",
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.categoryNav {
  float: left;
}
.goodsList {
  flex: 1;
  .gridItem {
    width: 33.33%;
    img {
    width: 100%;
    height: 1.45rem;
    }
    div {
      font-size: 0.22rem;
    }
  }  
}
</style>
