<!--
 * @Author: 极客James
 * @Motto: 求知若渴,虚心若愚
 * @Github: https://github.com/Geek-James/ddBuy
 * @掘金: https://juejin.im/user/5c4ebc72e51d4511dc7306ce
 * @LastEditTime : 2019-12-24 14:01:13
 * @Description: 我的->我的优惠券
 * @FilePath: /ddBuy/src/views/mine/Children/CouponList.vue
 -->
<template>
  <div id="couponList">
    <van-nav-bar title="我的优惠券"
                 :fixed=true
                 :border=false
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:.8rem" />
    <!--优惠券列表-->
    <van-coupon-list :coupons="coupons"
                     style="margin-top:.8rem"
                     input-placeholder="请输入520auchi兑换"
                     @exchange="onExchange" />

  </div>

</template>

<script type="text/javascript">
/* eslint-disable */
export default {
  data () {
    return {
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
      }]
    }
  },
  components: {

  },
  methods: {
    // 返回到上个界面
    onClickLeft () {
      this.$router.go(-1);
    },

    onExchange (code) {
      // 兑换优惠券
      if (code == '520auchi') {
        this.coupons.push(this.coupons[0]);
      }
    }
  }
}
</script>

<style lang="less" scoped>
#couponList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__title {
    color: black;
  }
  .van-icon {
    color: #dedede;
  }
}
</style>
