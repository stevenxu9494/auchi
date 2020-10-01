<template>
  <div id="my">
    <!-- 标题 -->
    <van-nav-bar title="个人中心"
                 :fixed=true
                 :border=false
                 style="height:.75rem" />
    <!-- 头像和昵称 -->
    <van-cell-group style="margin-top:.72rem">
      <van-cell style="background-color: #3bba63;color:#FFF;"
                label-class="labelClass"
                is-link
                center>
        <template slot="title">
          <!-- 已登录状态 -->
          <div class="personMsg"
               v-if="userInfo.h5_token"
               @click="goToPage('userCenter')">
            <img class="iconImage"
                 :src="user_image.login_icon"
                 alt="">
            <div class="sex"
                 v-if="userInfo.sex">
              <img :src="userInfo.sex=='1'?user_image.female:user_image.male"
                   alt="">
            </div>
            <div class="personInfo"
                 v-if="userInfo.h5_token">
              <span>{{userInfo.nickname}}</span>
              <span>账号：{{userInfo.username}}</span>
            </div>
          </div>
          <!-- 未登录状态 -->
          <div class="personMsg"
               v-if="!userInfo.h5_token">
            <img class="iconImage"
                 :src="user_image.noLogin_icon"
                 alt="">
            <div class="personInfo"
                 v-if="!userInfo.h5_token">
              <div @click="goToPage('login')">立即登录</div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 订单相关-->
    <van-cell-group>
      <van-cell title="我的订单"
                icon="label"
                value="查看全部订单"
                is-link
                @click="goTomyOrder(-1)">
      </van-cell>
      <van-grid :border=false>
        <van-grid-item v-for="(order,index) in orderData"
                       :key="index"
                       :icon="order.icon"
                       :text="order.title"
                       @click="goTomyOrder(index)" />
      </van-grid>
    </van-cell-group>
    <!-- 优惠券、收货地址 -->
    <van-cell-group style="margin-top:0.1rem">
      <van-cell title="我的优惠券"
                icon="gold-coin"
                :value="userInfo.h5_token?'2':''"
                @click="goToPage('couponList')"
                is-link />
      <van-cell title="我的收货地址"
                icon="todo-list"
                is-link
                @click="goToPage('myAddress')" />
    </van-cell-group>
    <!-- 客服、意见反馈 -->
    <van-cell-group style="margin-top:0.08rem">
      <!-- 联系客服 -->
      <van-cell title="联系客服"
                icon="phone"
                value="客服时间07:00-22:00"
                is-link
                @click="onFeedBack" />
      <!-- 意见反馈 -->
      <van-cell title="意见反馈"
                icon="comment-circle"
                is-link
                @click="onFeedBack" />
    </van-cell-group>
    <!-- 当前版本 -->
    <div class="version">当前版本：1.0.0</div>
    <!-- 吸底footer -->
    <footer_bar></footer_bar>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import footer_bar from './footer_bar'
import { getLocalStore } from '../config/global'
export default {
  name: 'my',
  data () {
    return {
      // 头像
      user_image: {
        login_icon: require('../assets/mine/defaultImg.jpeg'),
        noLogin_icon: require('../assets/login/grey.jpg'),
        female: require('../assets/mine/female.png'),
        male: require('../assets/mine/male.png')
      },
      // 用户信息
      userInfo: {},
      // 订单状态
      orderData: [
        { icon: 'cart-circle-o', title: '待支付' },
        { icon: 'gift-o', title: '待收货' },
        { icon: 'smile-comment-o', title: '待评价' },
        { icon: 'cash-back-record', title: '售后/退款' }
      ],
    }
  },
  mounted () {
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    console.log(this.userInfo.h5_token)
  },
  computed: {
  },
  components: {footer_bar},
  methods: {
    goToPage (name) {
      this.$router.push({ name });
    },
    goTomyOrder (index) {
      // if (index !== 3) {
      //   return this.$router.push({ name: "myOrder", params: { active: index + 1 } });
      // }
      // 跳转到售后退款界面
      this.$toast({
        message: "功能暂未实现",
        duration: 1500
      })
    },
    // 意见反馈
    onFeedBack () {
      this.$toast({
        message: "功能暂未实现",
        duration: 1500
      })
    },
  }
}
</script>

<style lang="less" scoped>
#my {
  width: 100%;
  background-color: #f5f5f5;
  margin-bottom: .9rem;
  .version {
    margin: 0 auto;
    text-align: center;
    font-size: 0.18rem;
    background-color: #ffffff;
    height: .6rem;
    color: grey;
    line-height: .6rem;
  }
  .van-nav-bar--fixed {
    background-color: #3bba63;
  }
  .van-nav-bar__title {
    color: white;
  }
  .personMsg {
    display: flex;
    align-items: center;
    .sex {
      position: absolute;
      top: 1.05rem;
      left: 1.14rem;
      width: 0.03rem;
      height: 0.03rem;
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }

    .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 0.24rem;
    }
  }

  .van-cell__left-icon {
    color: #45c763;
    font-size: 0.36rem;
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(0.6rem, 0, 0);
    opacity: 0;
  }
}
</style>
