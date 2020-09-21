<template>
  <div>
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar class="navbarTop"
        :title=info.name
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
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
    <div v-if="intro" class="details">
      <div v-for="item in info.detail" :key="item">
        <img :src=item alt="" />
      </div>
    </div>
    <div v-else class="details">
      <p>暂无介绍~</p>
    </div>
    <!-- 吸底footer -->
    <van-goods-action class="bottom-fixed" route>
      <van-goods-action-icon v-if="collectFlag" icon="star" text="已收藏" color="#ff5000" @click="collect"/>
      <van-goods-action-icon v-else icon="star" text="未收藏" color="#C0C0C0" @click="collect"/>
      <van-goods-action-icon to="/cart" icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="showPopup" />
      <van-goods-action-button type="danger" text="立即购买" @click="showPopup" />
    </van-goods-action>
    <!-- 弹出层->货物规格数量选择 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '35%' }">
      <div class="top">
        <div class="left">
          <img :src="info.thumb_url" alt="">
        </div>
        <div class="right">
          <div>
            <p>{{info.name}}</p>
            <p v-if="info.price !== 0" class="price">¥{{info.retail_price}}</p>
            <p v-else class="price">价格波动，请联系客服</p>
            <p>请选择数量</p>
            <div class="count">
              <div class="cut" @click="reduce">-</div>
              <input type="text" class="number" v-model="number" disabled="false">
              <div class="add" @click="add">+</div>
            </div>
          </div>
        </div>
      </div>
      <van-goods-action class="bottom-fixed" route>
        <van-goods-action-icon v-if="collectFlag" icon="star" text="已收藏" color="#ff5000" @click="collect"/>
        <van-goods-action-icon v-else icon="star" text="未收藏" color="#C0C0C0" @click="collect"/>
        <van-goods-action-icon to="/cart" icon="cart-o" text="购物车" />
        <van-goods-action-button @click="addCart" type="warning" text="加入购物车" />
        <van-goods-action-button @click="buy" type="danger" text="立即购买" />
      </van-goods-action>
    </van-popup>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import { getLocalStore } from '../config/global'
export default {
  name: 'goods',
  data () {
    return {
      curItem: 0,
      info: {},
      show: false,
      intro: false,
      number: 0,
      collectFlag: false,
      userInfo: {}
    }
  },
  mounted () {
    this.curItem = this.$route.params.id
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    this.getGoodsDetail()
  },
  methods: {
    async getGoodsDetail () {
      const data = await get('/goods/detailaction',{
        goodsId: this.curItem,
        userId: this.userInfo.id
      })
      this.info = data.info[0]
      console.log(this.info)
      this.collectFlag = data.collected
      this.number = data.number
      this.info.detail = this.info.detail.split(',')
      if (this.info.detail[0] !== "") {
        this.intro = true
      }
    },
    onClickLeft () {
      this.$router.back();
    },
    showPopup() {
      this.show = !this.show;
    },
    add () {
      this.number += 1
    },
    reduce () {
      if (this.number > 1) {
        this.number -= 1
      } else {
        return false
      }
    },
    async collect () {
      if(this.collectFlag == false) {
        this.collectFlag = !this.collectFlag
        const data = await post('/goods/collection',{
        goodsId: this.curItem,
        userId: this.userInfo.id
      })
        if (data) {
          this.$toast.success('收藏成功');
        }
      }else {
        this.collectFlag = !this.collectFlag
        const data = await post('/goods/collection',{
        goodsId: this.curItem,
        userId: this.userInfo.id
      })
        if (data) {
          this.$toast.success('取消收藏');
        }
      }
    },
    buy () {
      if (this.show) {
        if (this.number == 0) {
          this.$toast({message: '请选择商品数量',
                      forbidClick: true});
        }
      }
    },
    async addCart () {
      if (this.show) {
        if (this.number == 0) {
          this.$toast({message: '请选择商品数量',
                      forbidClick: true});
          return false
        }else {
          const data = await post('/cart/addCart',{
            goodsId: this.curItem,
            userId: this.userInfo.id,
            goodsName: this.info.name, 
            retailPrice: this.info.retail_price, 
            number: this.number, 
            thumbUrl: this.info.thumb_url, 
            imageUrl: this.info.image_url,
            checked: true
          })
          if (data) {
            this.$toast.success('成功加入购物车');
          } else {
            this.$toast.fail('加入购物车失败');
          }
        }
      }else {
        this.show = !this.show
      }
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
  height: 3rem;
  background: #fff;
  margin: 0 auto;
  border-bottom: 0.05rem solid #f4f4f4;
  .c{
    height: 100%;
    p{
      padding: .2rem .2rem 0 .2rem;
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
  p {
    font-size: .5rem;
    text-align: center;
  }
}
.top{
  display: flex;
  // margin-bottom: 35rpx;
  position: relative;
  .left{
    float: left;
    height: 2.2rem;
    width: 2.2rem;
    margin-right: 30rpx;
    img{
      padding-top: .4rem;
      float: left;
      height: 2.2rem;
      width: 2.2rem;
    }
  }
  .right{
    flex: 1;
    display: flex;
    align-items: flex-end;
    padding: .5rem .5rem 0 0 ;
    p{
      width: 100%;
      font-size: .22rem;
      line-height: .28rem;
    }
    p:nth-child(2){
      color: #b4282d;
    }
    .count{
      width: 3rem;
      height: .55rem;
      line-height: .55rem;
      display: flex;
      border: .01rem solid #ccc;
      margin-top: 0.2rem;
      div{
        font-size: .3rem;
        width: 1rem;
        text-align: center;
      }
      input{
        font-size: .3rem;
        flex: 1;
        width: 100%;
        text-align: center;
      }
    }
  }
}
.b{
  padding: .22rem;
  p {
    font-size:.22rem;
  }
  .count{
    width: 3rem;
    height: .55rem;
    line-height: .55rem;
    display: flex;
    border: .01rem solid #ccc;
    margin-top: 0.2rem;
    div{
      font-size: .3rem;
      width: 1rem;
      text-align: center;
    }
    input{
      font-size: .3rem;
      flex: 1;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
