<template>
  <div class="divBox">
    <el-card class="box-card FromData">
      <div class="auth acea-row row-between-wrapper">
        <div class="acea-row row-middle">
          <span class="el-icon-s-opportunity"></span>
          <div class="text">
            <div>体验时间剩余 {{dayNum}}天</div>
            <div class="code">到期后后台将不能正常使用，如果您对我们的系统满意，请支持正版！</div>
          </div>
        </div>
        <el-button type="primary" @click="isTemplate = true">申请授权</el-button>
      </div> 
    </el-card>
     <el-dialog
      v-if="isTemplate"
      v-model="isTemplate"
      :visible.sync="isTemplate"
      :before-close="handleClose"
      width="400px"
      title="商业授权"
      close-on-click-modal
      class="mapBox"
      custom-class="dialog-scustom"
    >
      <iframe :src="iframeUrl+'&inner_frame=1'" style="width:400px;margin-left:-20px;height:600px;" frameborder="0" />
    </el-dialog>
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
import { mapGetters } from 'vuex'
import SettingMer from "@/libs/settingMer";
import { roterPre } from '@/settings'
import { authTypeApi } from "@/api/maintain";
export default {
  name: 'CopyRight',
  data() {
    return {
      dayNum: 0,
      isTemplate: false,
      roterPre: roterPre,
      iframeUrl: '',
      BaseURL: SettingMer.httpUrl
    }
  },
  mounted() {
    this.iframeUrl ='https://shop.crmeb.net/html/index.html?url='+this.BaseURL+'&product=mer&venrsion=2.0&label='
    this.getAuth()
  },
  created() {

  },
  methods: {
    getAuth() {
      authTypeApi()
        .then(res => {
          this.dayNum = res.data.day;
        })
    },
    handleClose(){
      this.isTemplate = false
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon-s-opportunity{
  color: #1890ff;
  font-size: 40px;
  margin-right: 10px;
}
</style>
