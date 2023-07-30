<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20"  :model="formValidate" label-width="100px" @submit.native.prevent>
        <el-col :span="24">
          <el-form-item>
            <h3 class="title">分销等级规则</h3>
            <ueditor-from v-model="formValidate.agree" :content="formValidate.agree" style="width: 100%"/>
          </el-form-item>
        </el-col>
        <el-form-item style="margin-top:30px;">
          <el-button type="primary" class="submission" size="small" @click="previewProtol">预览</el-button>
          <el-button type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="Box">
      <el-dialog
        v-if="modals"
        :visible.sync="modals"
        title=""
        height="30%"
        custom-class="dialog-scustom"
        class="addDia"
      >
        <div class="agreement">
          <h3>佣金说明</h3>
          <div class="content">
            <div v-html="formValidate.agree"></div>
          </div>
        </div>
      </el-dialog>
    </div>
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
import ueditorFrom from '@/components/ueditorFrom'

import {
  getBrokerageApi,
  updateBrokerageApi
} from '@/api/promoter'
export default {
  name: 'Eextension',
  components: { ueditorFrom },
  data() {
    return {
      modals: false,
      props: {
        emitPath: false
      },
      formValidate: {
        agree: '',
      },
      content: '',
      fullscreenLoading: false,
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.fullscreenLoading = true
      getBrokerageApi('sys_brokerage').then(res => {
        const info = res.data
        this.formValidate = {
          agree: info.sys_brokerage,
        }
        this.fullscreenLoading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.fullscreenLoading = false
      })
    },

    // 提交
    handleSubmit(name) {
      if(this.formValidate.agree === '' || !this.formValidate.agree){
        this.$message.warning("请输入协议信息！");
        return
      }else{
        updateBrokerageApi('sys_brokerage', this.formValidate).then(async res => {
          this.fullscreenLoading = false
          this.$message.success(res.message)
        }).catch(res => {
          this.fullscreenLoading = false
          this.$message.error(res.message)
        })

      }

    },
    previewProtol(){
      this.modals = true;
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-scustom,.addDia{
  min-width: 400px;
  height: 900px;
  .el-dialog{
    width: 400px;
  }
  h3{
    color: #333;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    margin: 0;
  }
}
.title{
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  width: 90%;
}
.agreement{
  width: 350px;
  margin: 0 auto;
  box-shadow: 1px 5px 5px 2px rgba(0,0,0,.2);
  padding: 26px;
  border-radius: 15px;
  .content{
    height: 600px;
    overflow-y:scroll;
    /deep/ p{
      font-size: 13px;
      line-height: 22px;
    }
  }
  /deep/ img{
    max-width: 100%;
  }
  p{
    text-align: justify;
  }
}
/*css主要部分的样式*/
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track{
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
  background-color: transparent;
  border-radius: 3px;
}

</style>



