<template>
  <div class="cart">
    <!-- 购物车头部 -->
    <!--头部区域-->
    <header class="titleWrapper">
      <span style="font-size: .3rem;">购物车</span>
      <div class="clearCart"
           :style="selectedGoodsCount==0?'color:grey':'color:#45c763'"
           @click="clearCart"
           v-show="isShowEmptyCart">清空</div>
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
      <!-- 购物车有数据 -->
      <div  class="contentWrapper"
            v-show="isShowEmptyCart">
        <div class="contentWrapperList"
             v-for="(goods,index) in cartList"
             :key="index">
          <section>
            <div class="shopCartListCon">
              <div class="left">
                <a href="javaScript:;"
                   class="cartCheckBox"
                   :checked="Listids[index]"
                   @click.stop="changeColor(index, goods.goods_id)"></a>
              </div>
              <div class="center">
                <img :src="goods.thumb_url">
              </div>
              <div class="right">
                <a>{{goods.goods_name}}</a>
                <div class="bottomContent">
                  <p class="shopPrice">￥{{goods.retail_price}}</p>
                  <div class="shopDeal">
                    <span @click="reduceGoods(index, goods.goods_id, goods.number, goods.user_id)">-</span>
                    <input type="number"
                           disabled
                           v-model="goods.number">
                    <span @click="addGoods(index, goods.goods_id, goods.number, goods.user_id)">+</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- 提交订单 -->
        <van-submit-bar :price="allPrice"
                        :button-text="submitBarText"
                        @submit="onSubmit"
                        :disabled="!(selectedGoodNum>0)"
                        v-show="isShowEmptyCart">
          <van-checkbox v-model="isCheckedAll"
                        checked-color='#45c763'>全选</van-checkbox>
        </van-submit-bar>
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
import { getLocalStore } from '../config/global'
import footer_bar from './footer_bar'
export default {
  name: 'my',
  data () {
    return {
      selectedGoodsCount: 0,
      selectedGoodNum: 0, 
      cartList: [],
      userInfo: {},
      Listids: [],
      allcheck: false
    }
  },
  mounted () {
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    this.getCartList ()
  },
  components: {footer_bar},
  methods: {
    // 1. 清空购物车
    clearCart () {
      this.$dialog.confirm({
          title: '温馨提示',
          message: '确定删除所有商品吗?'
        }).then(async () => {
          // on confirm 确认删除
          const data = await post('/cart/removeAll',{
            userId: this.userInfo.id
          })
          if (data) {
            this.$toast.success('删除成功');
            this.cartList = []
            this.Listids = []
          } else {
            this.$toast.fail('删除失败');
          }
        }).catch(() => {
          // on cancel
        });
    },
    // 2. 选择商品转变颜色
    changeColor (index, id) {
      if (this.Listids[index]) {
        this.cartList[index].checked = ! this.cartList[index].checked
        this.$set(this.Listids, index, false)
        console.log(this.cartList)
      } else {
        this.cartList[index].checked = ! this.cartList[index].checked
        this.$set(this.Listids, index, id)
        console.log(this.cartList)
      }
    },
    // 3. 页面初始化
    async getCartList () {
      const data = await get('/cart/cartList',{
        userId: this.userInfo.id
      })
      if (data) {
        this.cartList = data.data
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked) {
            this.$set(this.Listids, i, this.cartList[i].goods_id)
          } else {
            this.$set(this.Listids, i, false)
          }
        }
      } else {
        this.isShowEmptyCart = true
      }
    },
    // 4. 全选
    allCheck () {
      // 先清空选择
      this.Listids = []
      if (this.allcheck) {
        this.allcheck = false
      } else {
        this.allcheck = true
        // 全部选择
        for (let i = 0; i < this.cartList.length; i++) {
          const element = this.cartList[i]
          this.Listids.push(element.goods_id)
        }
      }
    },
    onSubmit () {

    },
    // 5. 增加数量
    addGoods (index, goods_id, number, user_id) {
      this.cartList[index].number ++
    },
    // 6. 减少数量
    reduceGoods (index, goods_id, number, user_id) {
      if (this.cartList[index].number == 1) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '确定删除该商品吗?'
        }).then(async () => {
          // on confirm 确认删除
          const data = await post('/cart/removeCart',{
            goodsId: goods_id,
            userId: user_id
          })
          if (data) {
            this.$toast.success('删除成功');
            this.cartList.splice(index, 1)
            this.Listids.splice(index, 1)
          } else {
            this.$toast.fail('删除失败');
          }
        }).catch(() => {
          // on cancel
        });
      } else if (this.cartList[index].number > 1) {
        this.cartList[index].number --
      }
    },
    // 7. 更新后台数据
    async update () {

    }
  },
  computed: {
    // 1. 结算数量
    submitBarText () {
      let count = 0
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.Listids[i]) {
          count += parseInt(this.cartList[i].number)
        }
      }
      this.selectedGoodNum = count
      return `结算` + (count ? `(${count})` : '');
    },
    // 2. 实时查看是否全选
    isCheckedAll: {
      get () {
        let number = 0
        for (let i = 0; i < this.Listids.length; i++) {
          if (this.Listids[i]) {
            number++
          }
        }
        if (number == this.cartList.length && number !== 0) {
          this.allcheck = true
          return true
        } else {
          this.allcheck = false
          return false
        }
      },
      set (value) {
        let isCheckedAll = !value;
        this.Listids = []
        console.log(this.Listids)
        if (this.allcheck) {
          this.allcheck = false
        } else {
          this.allcheck = true
          // 全部选择
          for (let i = 0; i < this.cartList.length; i++) {
            const element = this.cartList[i]
            this.Listids.push(element.goods_id)
          }
        }
      }
    },
    // 3. 实时计算总价
    allPrice () {
      let Price = 0
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          Price += this.cartList[i].retail_price * this.cartList[i].number
        }
      }
      return Price * 100
    },
    // 4.是否显示空购物车样式
    isShowEmptyCart () {
      let isshow = false;
      if (this.totalCount > 0) {
        isshow = true;
      }
      return isshow;
    },
    // 5.计算Cart的数量
    totalCount () {
      return Object.keys(this.cartList).length;
    },
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
