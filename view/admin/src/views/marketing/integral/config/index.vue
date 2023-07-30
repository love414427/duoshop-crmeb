<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form
        ref="formValidate"
        v-loading="fullscreenLoading"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="160px"
        @submit.native.prevent
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="积分：" prop="integral_status">
              <el-radio-group
                v-model="formValidate.integral_status">
                <el-radio :label="0" class="radio">关闭</el-radio>
                <el-radio :label="1">开启</el-radio>
              </el-radio-group>
              <span class="label_tip">（指平台积分功能的开启或关闭。开启：积分功能正常启用；关闭：积分功能不可使用，且前端不展示）</span>
            </el-form-item>
          </el-col>
          <el-col v-if="formValidate.integral_status>0">
            <el-form-item label="积分抵用金额：" prop="integral_money">
              <el-input-number :min="0" v-model="formValidate.integral_money" placeholder="积分抵用金额" />
              <span class="label_tip">（指1积分抵用多少金额，单位： 元）</span>
            </el-form-item>
          </el-col>
          <el-col v-if="formValidate.integral_status>0">
            <el-form-item label="下单赠送积分比例：" prop="integral_order_rate">
              <el-input-number :min="0" v-model="formValidate.integral_order_rate" placeholder="请输入赠送比例" />
              <span class="label_tip">（指实际支付1 元赠送多少积分，单位： 分）</span>
            </el-form-item>
          </el-col>
          <el-col v-if="formValidate.integral_status>0">
            <el-form-item label="下单赠送积分冻结期：" prop="integral_freeze">
                <el-input-number :min="0" v-model="formValidate.integral_freeze" :precision="0" :step="1" placeholder="请输入冻结期限" />
                <span class="label_tip">（指下单所获赠送积分需冻结多少天后才可使用，单位：天；设置为0，即没有冻结期，积分冻结时间每20分钟更新一次）</span>
            </el-form-item>
          </el-col>
          <el-col v-if="formValidate.integral_status>0">
            <el-form-item label="积分清除时间设置：" prop="integral_clear_time">
                <el-input-number :min="0" v-model="formValidate.integral_clear_time" :precision="0" :step="1" placeholder="请输入冻结期限" />
                <span class="label_tip">（指累计积分的清除时间。单位：月；例如：设置为6，指每隔6个月清除前6个月的积分，比如6月30日，自动清除上一年7月1日-12月31日的积分。）</span>
            </el-form-item>
          </el-col>
           <el-col v-if="formValidate.integral_status>0">
            <el-form-item label="邀请好友赠送积分：" prop="integral_user_give">
              <el-input-number :min="0" v-model="formValidate.integral_user_give" :precision="0" :step="1" placeholder="请输入赠送积分数" />
              <span class="label_tip">（指邀请新人好友成功登录商城后，赠送给邀请人的积分数；单位：分）</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 积分说明-->
        <el-row v-if="formValidate.integral_status>0">
          <el-col :span="24">
            <el-form-item label="积分说明：">
              <vue-ueditor-wrap
                v-model="formValidate.rule"
                @beforeInit="addCustomDialog"
                :config="myConfig"
              ></vue-ueditor-wrap>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:30px;">
          <el-button v-if="formValidate.integral_status>0" :loading="loading" type="primary" class="submission" size="small" @click="preview">预览</el-button>
          <el-button :loading="loading" type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="Box" v-if="formValidate.integral_status>0">
      <el-dialog
        v-if="modals"
        :visible.sync="modals"
        title=""
        height="30%"
        custom-class="dialog-scustom"
        class="addDia"
      >
        <div class="agreement">
          <h3>积分说明</h3>
          <div class="content">
            <div v-html="formValidate.rule"></div>
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
import ueditorFrom from "@/components/ueditorFrom";
import VueUeditorWrap from "vue-ueditor-wrap";
import { mapState } from 'vuex'
import { getIntegralConfig, updateIntegralConfig } from "@/api/marketing";
import { roterPre } from "@/settings";
import SettingMer from '@/libs/settingMer';
import { getToken } from '@/utils/auth'

const defaultObj = {
  integral_status: 1,
  integral_user_give: 0.1,
  integral_freeze: 1,
  integral_clear_time: 6,
  integral_order_rate: 0,
  integral_money: 0,
  rule: "",
};
export default {
  name: "ProductProductAdd",
  components: { ueditorFrom, VueUeditorWrap },
  data() {
    const url = SettingMer.https + '/upload/image/0/file?ueditor=1&token=' + getToken()
    return {
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: "100%", // 初始容器宽度
        UEDITOR_HOME_URL: '/UEditor/',
        'serverUrl': url,
        'imageUrl': url,
        'imageFieldName': 'file',
        imageUrlPrefix: '',
        'imageActionName': 'upfile',
        'imageMaxSize': 2048000,
        'imageAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      },
      roterPre: roterPre,
      fullscreenLoading: false,
      formValidate: Object.assign({}, defaultObj),
      loading: false,
      modals: false,
      ruleValidate: {
        integral_status: [
          { required: true, message: "请选择是否开启积分功能", trigger: "blur" }
        ],
        integral_money: [
          { required: true, message: "请输入积分抵用金额", trigger: "blur" }
        ],
        integral_order_rate: [
          { required: true, message: "请输入下单赠送积分比例", trigger: "blur" }
        ],
        integral_freeze: [
          { required: true, message: "请输入下单赠送积分冻结期", trigger: "blur" }
        ],
        integral_clear_time: [
          { required: true, message: "请输入积分清除时间", trigger: "blur" }
        ],
        integral_user_give: [
          { required: true, message: "请输入邀请好友赠送积分数", trigger: "blur" }
        ]
      },

    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
      this.getInfo();
  },
  methods: {
    // 详情
    getInfo() {
      this.fullscreenLoading = true;
      getIntegralConfig()
        .then(async res => {
          this.formValidate = res.data
          this.fullscreenLoading = false;
        })
        .catch(res => {
          this.fullscreenLoading = false;
          this.$message.error(res.message);
        });
    },
    preview(){
      this.modals = true;
    },
    
    // 提交 
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          this.loading = true;
          updateIntegralConfig(this.formValidate)
                .then(async res => {
                  this.fullscreenLoading = false;
                  this.$message.success(res.message);
                  this.loading = false;
                })
                .catch(res => {
                  this.fullscreenLoading = false;
                  this.loading = false;
                  this.$message.error(res.message);
                });
        } 
      });
    },
    // 表单验证
    validate(prop, status, error) {
      if (status === false) {
        this.$message.warning(error);
      }
    },
// 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI(
        "test-dialog",
        function(editor, uiName) {
          // 创建 dialog
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/image?field=dialog",
            editor: editor,
            name: uiName,
            title: "上传图片",
            cssRules: "width:1200px;height:500px;padding:20px;"
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "dialog-button",
            title: "上传图片",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;`,
            onclick: function() {
              // 渲染dialog
              dialog.render();
              dialog.open();
            }
          });
          return btn;
        },
        37
      );
      window.UE.registerUI(
        "video-dialog",
        function(editor, uiName) {
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/video?fodder=video",
            editor: editor,
            name: uiName,
            title: "上传视频",
            cssRules: "width:600px;height:420px;padding:10px 20px 20px;"
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "video-button",
            title: "上传视频",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -320px -20px;`,
            onclick: function() {
              // 渲染dialog
              dialog.render();
              dialog.open();
            }
          });
          return btn;
        },
        38
      );
    }
  }
};
</script>
<style scoped lang="scss">
.label_tip{
    display: inline-block;
    margin-left: 20px;
    color: #282828;
}
.selWidth {
  width: 100%;
}
.selWidthd {
  width: 300px;
}
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
.iview-video-style {
  width: 40%;
  height: 180px;
  border-radius: 10px;
  background-color: #707070;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.iconv {
  color: #fff;
  line-height: 180px;
  display: inherit;
  font-size: 26px;
  position: absolute;
  top: -74px;
  left: 50%;
  margin-left: -25px;
}
.iview-video-style .mark {
  position: absolute;
  width: 100%;
  height: 30px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.uploadVideo {
  margin-left: 10px;
}
.perW50 {
  width: 50%;
}
.submission {
  margin-left: 10px;
}
.btndel {
  position: absolute;
  z-index: 1;
  width: 20px !important;
  height: 20px !important;
  left: 46px;
  top: -4px;
}

</style>
