<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" :class="'leftBar'+sidebarWidth" />
    <div :class="['leftBar'+sidebarWidth, needTagsView ? 'hasTagsView' : '']" class="main-container">
    <!-- <div :class="{hasTagsView:needTagsView}" class="main-container"> -->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
          <!--保证金提醒-->
        <div v-if="marginStatus == 1" class="remained-main">
          <div class="remained">  
            <span class="el-icon-warning"></span>
            <div class="remained-text">店铺保证金金额不足，为避免影响您正常经营，请尽快补缴，否则{{days[0]=='-' ? '店铺无法正常开启' : days+'后会自动关闭店铺！' }}</div>
            <div class="pay-btn" @click="goPay">[立即补缴]</div>
          </div>
        </div>
      </div>
      <app-main />
    </div>
    <copy-right />
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
// import RightPanel from '@/components/rightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import copyRight from '@/components/copyright'
import ResizeMixin from './mixin/ResizeHandler'
import { getBaseInfo } from '@/api/user'
import { intervalTime } from '@/utils'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    // RightPanel,
    Settings,
    Sidebar,
    TagsView,
    copyRight
  },
  mixins: [ResizeMixin],
   data() {
    return {
     marginStatus: 0,
     days: 0
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      sidebarWidth: state => state.user.sidebarWidth,
      sidebarStyle: state => state.user.sidebarStyle,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile', 
      }
    }
  },
  watch: {

  },
  mounted() {
    getBaseInfo().then(res => {
      const resData = res.data
      if(resData.margin_remind_status){
        this.days = intervalTime((Date.parse(new Date()))/1000,resData.margin_remind_status);
        this.marginStatus = 1
      }else{
        this.marginStatus = 0
      }
    })
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    goPay(){
      this.$router.push({
        name: 'ModifyStoreInfo'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
  left: 210px;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
.remained-main{
  background: #F0F2F5;
  padding-bottom: 10px;
  .remained{
    background-color: #fef0f0;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    transition: opacity .2s;
    font-size: 13px;
    border: 1px solid #FB6A6A;
    margin: 0 10px;
    .remained-text{
      line-height: 18px;
      color: #282828;
    }
    .el-icon-warning{
      color:#f56c6c;
      font-size: 20px;
      margin-right: 5px;
    }
    .pay-btn{
      margin-left: 5px;
      color:#f56c6c;
      cursor: pointer;
    }
  }
}
</style>
