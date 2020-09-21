<template>
  <div id="my">
    <!-- 标题 -->
    <van-nav-bar title="个人中心"
                 :fixed=true
                 :border=false
                 style="height:.75rem;color:white;" />
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
      userInfo: {}
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
  .van-nav-bar {
    background-color: #3bba63;
    font-size: 0.18rem;
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
