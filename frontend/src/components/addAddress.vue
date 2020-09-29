<template>
  <div id="addAddress">
    <van-nav-bar title="新建地址"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <van-address-edit :area-list="areaList"
                      show-postal
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      save-button-text="保存"
                      @save="onSave"
                      style="margin-top:.66rem;" />
  </div>
</template>

<script>
/* eslint-disable */
import { get, post } from '../utils/index'
import { setLocalStore, getLocalStore } from '../config/global'
import areaList from '../assets/area.js'
export default {
  data () {
    return {
      areaList: areaList,
      searchResult: [],
      userInfo: {},
      myaddresses: []
    }
  },
  components: {
  },
  mounted() {
    this.userInfo = JSON.parse(getLocalStore('userInfo'))
    this.myaddresses = JSON.parse(getLocalStore('shippingAddress'))
  },
  methods: {
    // 1.返回上级界面
    onClickLeft () {
      this.$router.go(-1);
    },
    // 2. 保存
    async onSave (content) {
      let addressID = this.addressID().toString();
      content['id'] = addressID;
      content['address'] = content.province + content.city + content.county + content.addressDetail;
      const data = await post('/address/saveAction',{
        content: content,
        userId: this.userInfo.id
      })
      if (data) {
        this.$toast.success('新建地址成功');
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
    // 3. 生成不重复的id
    addressID () {
      var lastUuid = 0;
      return (new Date()).getTime() * 1000 + (lastUuid++) % 1000;
    }
  }
}
</script>

<style lang="less" scoped>
#addAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  .van-address-edit {
    .van-address-edit__buttons {
      button {
        .van-button {
          background-color: #45c763;
        }
      }
    }
  }
}
</style>
