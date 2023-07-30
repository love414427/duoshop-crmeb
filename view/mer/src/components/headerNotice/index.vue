<template>
  <div class="header-notice right-menu-item">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-badge v-if="count > 0" is-dot class="item" :value="count">
          <i class="el-icon-message-solid"></i>
        </el-badge>
        <span v-else class="item">
          <i class="el-icon-message-solid"></i>
        </span>
      </span>
      <el-dropdown-menu slot="dropdown" placement="top-end">
        <el-dropdown-item class="clearfix">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-card v-if="messageList.length > 0" class="box-card">
              <div slot="header" class="clearfix">
                <span>消息</span>
<!--                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
              </div>
              <router-link
                v-for="(item, i ) in messageList" :key="i" class="text item_content"
                :to="{path: roterPre + '/station/notice/' + item.notice_log_id}"
                @click.native="HandleDelete(i)"
              >
                <el-badge is-dot class="item"></el-badge>&nbsp;{{ item.notice_title }}
              </router-link>
            </el-card>
            <div v-else class="ivu-notifications-container-list">
              <div class="ivu-notifications-tab-empty">
                <div class="ivu-notifications-tab-empty-text">目前没有通知</div>
                <img src="https://file.iviewui.com/iview-pro/icon-no-message.svg" class="ivu-notifications-tab-empty-img" alt="">
              </div>
            </div>

          </el-tabs>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { unreadCountApi, stationNewsList } from '@/api/system'
import { roterPre } from "@/settings";
export default {
  name: 'headerNotice',
  data() {
    return {
      activeName: 'second',
      messageList: [],
      needList: [],
      count: 0,
      tabPosition: 'right',
      roterPre: roterPre,

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goDetail(item){
      item.is_read = 1;
      console.log(this.$router)
      this.$router.push({
        path: this.roterPre + "/station/notice",
        query: {id: item.notice_log_id}
      });
    },
    // 列表
    getList() {
      stationNewsList({is_read: 0}).then(res => {
        this.messageList = res.data.list
        this.count = res.data.count;
      }).catch(res => {
      })
    },
    HandleDelete(i){
      this.messageList.splice(i,1)
    }


  }
}
</script>

<style lang="scss" scoped>
.header-notice{
  position: relative;
  cursor: pointer;
}
.el-badge{
  line-height: 20px;
}
/deep/ .el-tabs__nav{
  float: none;
  width: 200px;
  margin: 0 auto;
}
/deep/ .el-tabs__item{
  width: 50%;
  text-align: center;
}
/deep/ .el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
  background-color: #f8f8f9;
  color: #46a6ff;
}
.el-popper{
  padding: 0;
}
.el-dropdown-menu__item{
  background-color: #f8f8f9;
  padding: 0;
}
.text {
  font-size: 14px;
}

.item_content {
  border-bottom: 1px solid #e8eaec;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  padding: 0 20px;
}
/deep/ .el-card__body{
  padding: 20px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 300px;
}
/deep/ .el-tabs__header{
  margin: 0;
}
/deep/ .el-card__header{
  color: #2d8cf0;
  padding: 10px 20px;
}
.el-icon-message-solid{
  color: #2d8cf0;
  cursor: pointer;
  font-size: 16px;
  &:focus{
    outline:0;
  }
}
.redtip{
  position: absolute;
  transform: translateX(-50%);
  transform-origin: 0 center;
  top: 9px;
  right: -16px;
  height: 15px;
  min-width: 15px;
  border-radius: 100%;
  background: #ed4014;
  z-index: 10;
  box-shadow: 0 0 0 1px #fff;
  color: #fff;
  text-align: center;
  line-height: 15px;
  font-size: 8px;
}
.ivu-notifications-container {
  max-height: 400px;
  overflow: auto;
  min-width: 100px;
  width: 300px;
}
.ivu-notifications-item {
  border-bottom: 1px solid #e8eaec;
  cursor: pointer;
  -webkit-transition: background-color .2s ease-in-out;
  transition: background-color .2s ease-in-out;
  text-align: left;
  background-color: #f8f8f9;
}
.ivu-row-flex{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.ivu-notifications-item-icon{
  float: left;
  position: relative;
  display: block;
  width: 16.66666667%;
}
.ivu-avatar {
  display: inline-block;
  text-align: center;
  background: #ccc;
  color: #fff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
}
.ivu-avatar.ivu-avatar-icon {
  font-size: 18px;
}
.ivu-icon {
  display: inline-block;
  font-family: Ionicons;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  text-rendering: optimizeLegibility;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: -.125em;
  text-align: center;
  font-size: 18px;
}
.ivu-avatar .ivu-icon {
  position: relative;
  top: -1px;
}
.ivu-notifications-item-content{
  display: block;
  width: 83.33333333%;
}
.ivu-notifications-item-title {
  margin-bottom: 4px;
}
.ivu-notifications-item-title h4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #515a6e;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  margin: 8px 0;
}
.ivu-notifications-tab-empty {
  text-align: center;
  padding: 64px 0;
  width: 300px;
}
.ivu-notifications-tab-empty {
  text-align: center;
  padding: 64px 0;
}
.ivu-notifications-tab-empty-text {
  color: #808695;
}
.ivu-notifications-tab-empty-img {
  display: inline-block;
  height: 64px;
}
</style>
