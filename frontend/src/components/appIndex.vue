<template>
  <div>
    <van-row>
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
    <van-tabs>
      <van-tab v-for="index in 8"  :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'appIndex',
  data () {
    return {
      search_v: '',
      tabBtnList: []
    }
  },
  mounted() {

  },
  methods() {
    async goodsDetail => {
      const data = await get('/goods/detailaction', {
        id: this.id,
        openId: this.openId
      })
      console.log(data)
      this.info = data.info
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.logo{
  font-size: .22rem;
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
  font-size: .22rem;
  border-radius: .1rem;
  border: 1px solid #f00;
}
</style>
