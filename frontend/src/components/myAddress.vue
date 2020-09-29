<template>
  <div id="myAddress">
    <!--导航栏-->
    <van-nav-bar title="我的地址"
                 left-arrow
                 right-text="添加"
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"
                 @click-right="onAdd"></van-nav-bar>
    <!-- 没有数据的占位图 -->
    <div class="noDataPlaceHold"
         v-show="shippingAddress.length<1">
      <img src="../assets/order/noAddress.png"
           alt="">
      <span class="desc" style="font-size: .22rem;">还没有地址，快去添加一个吧~</span>
    </div>
    <!-- 联系人 -->
    <van-address-list v-model="chosenAddressId"
                      :list="shippingAddress"
                      default-tag-text="默认"
                      @add="onAdd"
                      @edit="onEdit"
                      @select="onBackAddress"
                      style="margin-top: .66rem;"
                      add-button-text="添加新地址">
    </van-address-list>
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
      chosenAddressId: 0,
      shippingAddress: []
    }
  },
  mounted() {
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    this.getAddressList ()
  },
  computed: {
  },
  methods: {
    async getAddressList () {
      const data = await get('/address/getListAction',{
        userId: this.userInfo.id
      })
      if (data) {
        var result = data.data.map(o=>{return{
          isDefault: o.is_default,
          address: o.address,
          addressDetail: o.address_detail,
          city: o.city,
          country: o.country,
          county: o.county,
          id: o.id,
          tel: o.mobile,
          name: o.name,
          postalCode: o.postal_code,
          province: o.province,
          userId: o.user_id,
          }});
        this.shippingAddress = result
      }
    },
    onClickLeft () {
      this.$router.back();
    },
    onAdd () {
      this.$router.push({ path: '/addAddress'});
    },
    onEdit (item, index) {
      this.$router.push({ path: '/editAddress', query: {
        content: item
      }});
    },
    // 路由返回
    onBackAddress (item, index) {
      // 发布通知到订单界面修改值
      PubSub.publish('CHOOSE_USER_ADDRESS', item);
      // 返回到上一个界面
      this.$router.back();
    }
  },
}
</script>

<style lang="less" scoped>
#myAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 55%;
      height: 20%;
    }
    .desc {
      color: grey;
      font-size: 0.18rem;
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
  .van-address-list__add {
    bottom: .3rem;
  }
  .van-button {
    left: 15%;
    width: 70%;
    border-radius: .6rem;
    background-color: #45c763;
    border: none;
  }
}
</style>