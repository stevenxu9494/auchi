<template>
  <div id="login">
    <div class="loginBox">
      <div class="auth-form">
        <div class="pathfish">
          <img :src="imageUrl" alt="">
        </div>
        <van-icon name="close"
                  class="closeButton"
                  @click="close" />
        <van-tabs v-model="active"
                  animated>
          <van-tab title="登录">
            <!-- 账号密码登录 -->
            <van-cell-group>
              <van-field v-model="login_userName"
                         required
                         clearable
                         label="账号"
                         @click.stop="changeImage(0)"
                         placeholder="请输入账号" />
              <van-field v-model="login_password"
                         type="password"
                         label="密码"
                         placeholder="请输入密码"
                         required
                         @click.stop="changeImage(1)"
                         autocomplete />
              <van-field v-model="imgCaptcha"
                         center
                         clearable
                         maxlength="4"
                         placeholder="请输入验证码">
                <img class="verificationImage"
                     :src="captchaUrl"
                     alt=""
                     @click="getCaptcha"
                     slot="button">
              </van-field>
            </van-cell-group>
          </van-tab>
          <!-- 注册 -->
          <van-tab title="注册">
            <van-cell-group>
              <van-field v-model="register_userName"
                         clearable
                         label="账号"
                         placeholder="请输入账号"
                         required />
              <van-field v-model="register_pwd"
                         type="password"
                         label="密码"
                         placeholder="请输入密码"
                         required />
            </van-cell-group>
            <van-button type="info"
                        size="large"
                        style="margin-top:.3rem"
                        @click='register'>注册</van-button>
          </van-tab>
        </van-tabs>
        <!-- 第三方登录 -->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 5px' }">
          其他登陆方式
        </van-divider>
        <van-grid :column-num="2"
                  :border=false>
          <van-grid-item @click="thirdLogin(0)">
            <svg-icon iconClass="wechat" />
            <div class="title">微信登陆</div>
          </van-grid-item>
          <van-grid-item @click="thirdLogin(1)">
            <svg-icon iconClass="QQ" />
            <div class="title">QQ登录</div>
          </van-grid-item>
        </van-grid>
        <!-- 底部声明 -->
        <p class="agreement"> 温馨提示：<br>未注册的账号，登陆时将自动注册，且代表同意<a @click.stop="agreement(0)"
             class="agreement-box">用户协议</a>、<a @click.stop=agreement(1)
             class="agreement-box">隐私策略</a></p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import footer_bar from './footer_bar'
export default {
  name: 'login',
  data () {
    return {
      active: 0,
      imageUrl: require('../assets/normal.png'),
      register_userName: '',
      register_pwd: '',
      login_userName: '',
      login_password: '',
      imgCaptcha: '',
      captchaUrl: 'http://demo.itlike.com/web/xlmc/api/captcha'
    }
  },
  mounted () {
  },
  components: {footer_bar},
  methods: {
    close () {
      this.$router.back();
    },
    changeImage (index) {
      if (index == 0) {
        this.imageURL = require('../assets/greeting.png')
      } else if (index == 1) {
        this.imageURL = require('../assets/blindfold.png')
      } else {
        this.imageURL = require('../assets/normal.png')
      }
    },
    getCaptcha () {
      // // 获取验证码的标签
      this.captchaUrl ='http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date()
    },
    register () {

    },
    // 第三方验证
    thirdLogin (value) {
      if (value == 0) {
        this.$toast({
          message: "功能暂未开发",
          duration: 800
        });
      } else {
        this.$toast({
          message: "功能暂未开发",
          duration: 800
        });
      }
    },
  }
}
</script>

<style lang="less" scoped>
#login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    opacity: 0.95;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    .auth-form {
      position: relative;
      padding: 0.6rem;
      width: 7.95rem;
      max-width: 90%;
      font-size: 0.35rem;
      background-color: #fff;
      border-radius: 8px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      top: .3rem;
      left: 50%;
      width: 1.2rem;
      transform: translate(-50%, -70%);
      z-index: 1;
      @media screen and (max-width: 320px) {
        top: 0.15rem;
        transform: translate(-50%, -40%);
        width: 1.5rem;
      }
    }
    .closeButton {
      position: absolute;
      right: .3rem;
      top: 0.12rem;
    }
    .verificationImage {
      position: absolute;
      right: 0;
      width: 2.4rem;
      height: .9rem;
      margin-left: .9rem;
    }
    .switchLogin {
      margin-top: .3rem;
      font-size: 0.234rem;
    }
  }
}
.title {
  padding: 0.15rem;
  font-size: 0.15rem;
  color: grey;
}
.agreement {
  // margin-top: 1.667rem;
  line-height: .3rem;
  color: #767676;
  font-size: 0.26rem;
  .agreement-box {
    color: blue;
  }
}
</style>
