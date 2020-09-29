<template>
  <div id="order">
    <!-- 头部导航 -->
    <van-nav-bar title="填写订单"
                 left-arrow
                 :fixed=true
                 @click-left="onClickLeft" />
    <!-- 选择收货地址 -->
    <van-contact-card :type="address_type"
                      add-text="选择收货地址"
                      :name="address_name"
                      :tel="address_phone"
                      @click="chooseAddress"
                      style="margin-top:.85rem" />
    <!-- 商品缩略图 -->
    <van-cell-group>
      <div class="wrapper"
           @click="goToGoodsList">
        <div class="productImageWrapper"
             ref="productImageWrapper">
          <ul class="imageWrapper"
              ref="imageWrapper">
            <li ref="subWrapper"
                style="display:inline"
                v-for="(item,index) in goodsThumbUrl"
                :key="index">
              <img :src="item"
                   alt="">
            </li>
          </ul>
        </div>
      </div>
    </van-cell-group>
    <!-- 支付方式选择 -->
    <van-radio-group v-model="radio">
      <van-cell-group title="选择支付方式">
        <van-cell clickable
                  @click="radio = '1'">
          <template slot="title">
            <img src="../assets/order/wx.png"
                 alt=""
                 width="25px"
                 height="25px"
                 style=" vertical-align: middle;padding-right:5px">
            <span>微信支付</span>
          </template>
          <van-radio slot="right-icon"
                     name="1"
                     checked-color="#07c160" />
        </van-cell>
        <van-cell clickable
                  @click="radio = '2'">
          <template slot="title">
            <img src="../assets/order/zfb.png"
                 alt=""
                 width="25px"
                 height="25px"
                 style=" vertical-align: middle;padding-right:5px">
            <span>支付宝</span>
          </template>
          <van-radio slot="right-icon"
                     name="2"
                     checked-color="#07c160" />
        </van-cell>
        <van-cell clickable
                  @click="radio = '3'">
          <template slot="title">
            <img src="../assets/order/hb.png"
                 alt=""
                 width="25px"
                 height="25px"
                 style=" vertical-align: middle;padding-right:5px">
            <span>花呗</span>
          </template>
          <van-radio slot="right-icon"
                     name="3"
                     checked-color="#07c160" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <!-- 优惠券及积分满减 -->
    <van-cell-group style="margin-top: 0.18rem">
      <van-coupon-cell :coupons="coupons"
                       :chosen-coupon="chosenCoupon"
                       @click="showList = true" />

      <van-cell>
        <!-- 优惠券列表 -->
        <van-popup v-model="showList"
                   position="bottom">
          <van-coupon-list :coupons="coupons"
                           :chosen-coupon="chosenCoupon"
                           @change="onChange"
                           @exchange="onExchange" />
        </van-popup>
        <span slot="title">使用积分支付<br /><b>￥8.00</b></span>
        <van-switch v-model="checked"
                    slot="right-icon"
                    @input="onInput"
                    active-color="#07c160" />
      </van-cell>
    </van-cell-group>
    <!-- 备注 -->
    <van-cell-group style="margin-top: 0.18rem">
      <van-field label="备注"
                 type="textarea"
                 v-model="cutomerMessage"
                 placeholder="选填：告诉我们您的个性需求"
                 rows="1"
                 autosize
                 is-link />
    </van-cell-group>
    <!-- 商品金额 -->
    <van-cell-group style="margin-top: 0.18rem">
      <van-cell title="商品总金额">
        <div class="money">￥{{allPrice}}</div>
      </van-cell>
      <van-cell title="快递费">
        <div class="money">0.00</div>
      </van-cell>
      <van-cell title="积分"
                v-show="isShowPreferential">
        <div class="integralToMoney">-￥8.00</div>
      </van-cell>
    </van-cell-group>

    <!-- 提交订单 -->
    <van-submit-bar :price="actualPrice"
                    label="实付"
                    button-text="支付"
                    @submit="onSubmit" />
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import { getLocalStore } from '../config/global'
import PubSub from 'pubsub-js'
export default {
  data () {
    return {
      userInfo: {},
      address: {},
      address_type: 'add',    // 添加收货地址
      address_name: null,     // 收货人姓名
      address_phone: null,    // 收货人手机号
      goodsThumbUrl: [],      // 下单货物
      radio: '1',             // 支付方式
      allPrice: 0,            // 总价
      showList: false,        // 展示优惠券
      checked: false,         // 积分兑换开关
      cutomerMessage: "",     // 顾客留言
      isShowPreferential: false,
      coupons: [{             // 优惠券信息  
        available: 1,
        condition: '无使用门槛',
        reason: '',
        value: 150,
        name: '新人优惠好礼',
        startAt: 1549104000,
        endAt: 1614592000,
        valueDesc: '1.5',
        unitDesc: '元'
      }, {                      // 优惠券信息     
        available: 1,
        condition: '无使用门槛',
        reason: '',
        value: 200,
        name: '开业酬宾',
        startAt: 1549104000,
        endAt: 1614592000,
        valueDesc: '2',
        unitDesc: '元'
      }],
      chosenCoupon: -1,
    }
  },
  mounted () {
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    this.getOrderList ()
    // 订阅发布的通知
    PubSub.subscribe('CHOOSE_USER_ADDRESS', (msg, data) => {
      console.log(data)
      if (msg == 'CHOOSE_USER_ADDRESS') {
        // 修改卡片类型
        this.address_type = 'edit';
        this.address_name = data.name;
        this.address_phone = data.tel;
        this.address_id = data.id;
      }
    });
  },
  methods: {
    // 1. init order data
    async getOrderList () {
      const data = await get('/order/detailAction',{
        userId: this.userInfo.id
      })
      this.goodsThumbUrl = data.thumbUrl
      this.allPrice = data.allprice
    },
    // 2.返回到上个界面
    onClickLeft () {
      this.$router.back();
    },
    // 3. 选择地址
    chooseAddress () {
      this.$router.push('/myAddress');
    },
    // 4. TODO - 订单完成页
    goToGoodsList () {
      this.$router.push('/orderGoodsList');
    },
    // 选择优惠券
    onChange (index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    // 优惠券兑换
    onExchange (code) {
      this.coupons.push(coupon);
    },
    // 5. TODO - 支付页面
    onSubmit () {
      console.log()
      this.$toast({message: '支付功能暂未开发',
                      forbidClick: true});
    },
    // 6.switch开关
    onInput (checked) {
      this.isShowPreferential = !this.isShowPreferential;
    }
  },
  computed: {
    actualPrice () {
      let finalPrice = this.allPrice
      if (this.chosenCoupon > -1 && this.checked == false) {
        const couponDiscount = this.coupons[this.chosenCoupon].value /100
        return (finalPrice - couponDiscount) * 100
      } else if (this.checked && this.chosenCoupon == -1) {
        const integralCoupon = 8.00
        return (finalPrice - 8.00) * 100
      } else if (this.checked && this.chosenCoupon > -1) {
        const couponDiscount = this.coupons[this.chosenCoupon].value /100
        const integralCoupon = 8.00
        return (finalPrice - couponDiscount - 8.00) * 100
      }
      return finalPrice * 100
    }
  },
}
</script>

<style lang="less" scoped>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin-bottom: 1.5rem;
  .wrapper {
    height: 1.2rem;
    width: 100%;
    position: relative;
    .productImageWrapper {
      display: flex;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: start;
      height: 1.2rem;
      width: 80%;
      overflow: hidden;
      padding-top: .15rem;
      padding-left: .15rem;
      .imageWrapper {
        flex-wrap: nowrap;
        img {
          height: .9rem;
          width: .9rem;
        }
      }
    }
    .productCount {
      right: 0.03rem;
      top: .15rem;
      position: absolute;
      color: grey;
    }
  }

  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(.6rem, 0, 0);
    opacity: 0;
  }
}
</style>