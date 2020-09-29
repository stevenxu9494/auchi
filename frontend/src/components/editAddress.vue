<template>
  <div id="editAddress">
    <van-nav-bar title="修改地址"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <van-address-edit :area-list="areaList"
                      show-postal
                      show-delete
                      show-set-default
                      show-search-result
                      :addressInfo="addressInfo"
                      :search-result="searchResult"
                      @save="onSave"
                      @delete="onDelete"
                      style="margin-top:.66rem" />
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import areaList from '../assets/area.js'
import { setLocalStore, getLocalStore } from '../config/global'
export default {
  data () {
    return {
      areaList: areaList,
      addressInfo: {},
      userInfo: {},
      myaddresses: [],
      searchResult: []
    }
  },
  mounted () {
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    this.addressInfo =this.$attrs['content']
    this.myaddresses = JSON.parse(getLocalStore('shippingAddress'))
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
    async onSave (content) {
      content['address'] = content.province + content.city + content.county + content.addressDetail;
      const data = await post('/address/saveAction',{
        content: content,
        userId: this.userInfo.id
      })
      if (data) {
        this.$toast.success('修改地址成功');
        // 数据本地化
        if (this.myaddresses.length != 0) {
          if (content.isDefault) {
            for (let i =0; i < this.myaddresses.length; i++) {
              this.myaddresses[i].isDefault = false
            }
            setLocalStore('shippingAddress', [...this.myaddresses, content])
          }
          setLocalStore('shippingAddress', [...this.myaddresses, content])
        } else {
          setLocalStore('shippingAddress', [
          content])
        }
        this.$router.back();
      } else {
        this.$toast.fail('新建地址失败');
      }
    },
    async onDelete () {
      const data = await post('/address/deleteAction',{
        userId: this.userInfo.id,
        addressId: this.addressInfo.id
      })
      if (data) {
        this.$router.back();
      }
    }
  }
}
</script>

<style lang="less" scoped>
#editAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
}
</style>