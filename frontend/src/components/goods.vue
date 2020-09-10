<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="navbarTop"
      :title=info.name
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 货物主视图 -->
    <div class="picture">
      <img :src="info.image_url" />
    </div>
    <!-- 主视图下广告 -->
    <div class="service-info">
      <div class="item">100%正品承诺</div>
      <div class="item">澳洲直邮</div>
      <div class="item">假一赔十</div>
    </div>
    <!-- 货物名称、品牌及价格 -->
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>品牌名称：{{info.brand}}</p>
        <p v-if="info.price !== 0" class="price">¥{{info.retail_price}}</p>
        <p v-else class="price">价格波动，请联系客服</p>
      </div>
    </div>
    <!-- 选择规格数量 -->
    <van-cell is-link @click="showPopup">请选择规格数量</van-cell>
    <!-- 货物详情图片展示 -->
    <div class="details" v-for="item in info.detail" :key="item">
      <img :src=item alt="" />
    </div>
    <!-- 吸底footer -->
    <van-goods-action class="bottom-fixed">
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 弹出层->货物规格数量选择 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }">
    </van-popup>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
export default {
  name: 'goods',
  data () {
    return {
      curItem: 0,
      info: {},
      show: false
    }
  },
  mounted () {
    this.curItem = this.$route.params.id
    this.getGoodsDetail()
  },
  methods: {
    async getGoodsDetail () {
      const data = await get('/goods/detailaction',{
        goodsId: this.curItem
      })
      this.info = data.info[0]
      this.info.detail = this.info.detail.split(',')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    showPopup() {
      this.show = true;
    }
  }
}
</script>

<style lang="less" scoped>
.picture {
  width:100%;
  img {
    width:100%;
  }
}
.service-info {
  padding-left: .15rem;
  width: 100%;
  height: .66rem;
  margin: 0 auto;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    background: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png') 0 center no-repeat;
    background-size: .1rem;
    padding-left: .15rem;
    display: flex;
    align-items: center;
    font-size: .22rem;
    color: #666;
  }
  div:nth-child(3){
    padding-right:0.22rem;
  }
}
.goods-info{
  width: 100%;
  height: 2.5rem;
  background: #fff;
  margin: 0 auto;
  border-bottom: 0.05rem solid #f4f4f4;
  .c{
    height: 100%;
    p{
      display: block;
      text-align: center;
    }
    p:nth-child(1) {
      font-size: 0.33rem;
      padding: -0.02rem;
    }
    p:nth-child(2) {
      font-size: 0.21rem;
      color: #999;
    }
    p:nth-child(3) {
      font-size: 0.32rem;
      color: #b4282d;
    }
  }
}
.details {
  img {
    width: 100%;
  }  
}
</style>
