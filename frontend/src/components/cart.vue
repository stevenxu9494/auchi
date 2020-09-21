<template>
  <div class="cart">
    <!-- 购物车头部 -->
    <!--头部区域-->
    <header class="titleWrapper">
      <span style="font-size: .3rem;">购物车</span>
      <div class="clearCart"
           :style="selectedGoodsCount==0?'color:grey':'color:#45c763'"
           @click="clearCart"
           v-show="isShowEmptyCart">购物车空空滴~</div>
    </header>
    <!-- 购物车没有商品 -->
    <div class="cartWrapper">
      <!-- 购物车为空 -->
      <div class="emptyCart"
           v-show="!isShowEmptyCart">
        <img src="../assets/cart/empty.png"
             alt="">
        <div class="title">购物车空空滴~</div>
        <router-link to="/"
                     class="goHome">去逛逛</router-link>
      </div>
      <!-- 猜你喜欢 -->
      <van-divider :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }">
        猜你喜欢
      </van-divider>
    </div>
    <!-- 吸底footer -->
    <footer_bar></footer_bar>
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import footer_bar from './footer_bar'
export default {
  name: 'my',
  data () {
    return {
      isShowEmptyCart: false,
      selectedGoodsCount: 0
    }
  },
  mounted () {
  },
  components: {footer_bar},
  methods: {
    clearCart () {

    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .titleWrapper {
    width: 100%;
    height: .78rem;
    background: #fff;
    -webkit-background-size: 0.03rem 1.32rem;
    background-size: 0.03rem 1.32rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titleWrapper .clearCart {
    position: absolute;
    right: 0.09rem;
    font-size: 0.24rem;
  }
  .disableClearCart {
    color: grey;
  }
  .cartWrapper {
    width: 100%;
    height: 100rem;
    margin-top: .78rem;
    font-size: .3rem;
    @media screen and (min-width: 300px) and(max-width: 374px) {
      .van-submit-bar {
        bottom: .9rem;
      }
    }
    @media screen and (min-width: 375px) and(max-width: 420px) {
      .van-submit-bar {
        bottom: .81rem;
      }
    }
    @media screen and (min-width: 420px) and(max-width: 1024px) {
      .van-submit-bar {
        bottom: .42rem;
      }
    }
    .emptyCart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        padding-top: .6rem;
        width: 50%;
        height: 2.4rem;
        margin: 0 auto;
      }
      .title {
        text-align: center;
        padding: 0.15rem;
      }
      .goHome {
        margin-top: .6rem;
        color: white;
        background-color: #45c763;
        text-align: center;
        margin: 0 auto;
        padding: 0.15rem;
        width: 1.5rem;
        height: .3rem;
        line-height: .3rem;
        border-radius: .3rem;
      }
    }
    .contentWrapper {
      padding-top: 0.15rem;
      section {
        background-color: #ffffff;
        .shopCartListCon {
          display: flex;
          height: 1.8rem;
          border-bottom: 0.0015rem solid #e0e0e0;
          margin-bottom: 0.21rem;
          padding: 0.15rem 0;
          justify-content: center;
          align-items: center;
          .left {
            flex: 1;
            display: flex;
            a {
              display: inline-block;
              margin-top: 0.24rem;
              margin-left: 0.15rem;
            }
            .cartCheckBox {
              background: url("../assets/cart/shop-icon.png") no-repeat;
              background-size: .75rem 1.5rem;
              width: .3rem;
              height: .3rem;
            }
            .cartCheckBox[checked] {
              background-position: -.36rem 0;
            }
          }
          .center {
            flex: 3;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            flex: 6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 0.15rem;
            margin-right: 0.15rem;
            position: relative;
            a {
              height: .66rem;
              line-height: .36rem;
              overflow: hidden;
              margin-bottom: 0.09rem;
              font-size: 0.24rem;
              color: #000;
            }
          }
        }
        .bottomContent {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .shopPrice {
            font-size: 0.24rem;
          }
          .shopDeal span {
            display: inline-block;
            width: .3rem;
            height: .36rem;
            line-height: .36rem;
            text-align: center;
            float: left;
          }
          .shopDeal input {
            float: left;
            width: .6rem;
            height: .36rem;
            text-align: center;
            margin: 0 0.06rem;
            font-size: 0.24rem;
            background-color: #f5f5f5;
            border: 0;
          }
        }
      }
    }
  }
  .van-checkbox {
    margin-left: 0.15rem;
  }
}
</style>
