<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="auth acea-row row-between-wrapper">
        <div class="acea-row row-middle">
          <i class="el-icon-share iconIos blue" />
          <div v-if="status === -1 || status === -9" class="text">
            <div>体验时间剩余 {{ dayNum }}天</div>
            <div class="code">到期后后台将不能正常使用，如果您对我们的系统满意，请支持正版！</div>
          </div>
          <div v-else-if="status === 2" class="text">
            <div>体验时间剩余 {{ dayNum }}天</div>
            <div class="code red">审核未通过</div>
          </div>
          <div v-else-if="status === 1" class="text">
            <div>商业授权</div>
            <div class="code">授权码：{{ authCode }}</div>
          </div>
          <div v-else-if="status === 0" class="text">
            <div>体验时间剩余 {{ dayNum }}天</div>
            <div class="code blue">授权申请已提交，请等待审核</div>
          </div>
        </div>
        <div>
          <el-button v-if="status === 1" @click="toCrmeb()">进入官网</el-button>
          <el-button v-else-if="status === -1 || status === -9" type="primary" @click="applyAuth">申请授权</el-button>
          <el-button v-else-if="status === 2" type="primary" @click="applyAuth">重新申请</el-button>
          <el-button v-else-if="status === 0" class="grey">审核中</el-button>
        </div>
      </div>
    </el-card>
    <el-card v-if="copyrightStatus != 1 && status == 1" class="box-card" style="margin-top: 15px;">
      <div class="auth acea-row row-between-wrapper">
        <div class="acea-row row-middle"> 
          <i class="el-icon-s-help iconIos blue" />
          <div  class="text">
            <div>去版权服务</div>
            <div class="code">购买之后可以设置</div>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="isTemplate = true; title='去版权'">去版权</el-button>
        </div>
      </div>
    </el-card>
    <el-card v-if="copyrightStatus == 1 && status == 1" style="margin-top: 15px;">
      <div class="auth acea-row row-between-wrapper">
        <div class="acea-row row-middle">
          <span class="iconfont iconbanquan iconIos blue"></span>
          <div class="acea-row row-middle">
            <span class="update">修改授权信息:</span>
            <el-input style="width: 460px" v-model="copyrightText" />
          </div>
        </div>
        <el-button type="primary" @click="saveCopyRight">保存</el-button>
      </div>
      <div class="authorized" @click="modalPicTap()">
        <div>
          <span class="update">上传授权图片:</span>
        </div>
        <div class="uploadPictrue" v-if="authorizedPicture">
          <img v-lazy="authorizedPicture" />
        </div>
        <div class="upload" v-else>
          <div class="iconfont">+</div>
        </div>
      </div>
      <span class="prompt">建议尺寸：宽290px*高100px</span>
    </el-card>
    <!--<el-dialog
      :visible.sync="dialogVisible"
      scrollable
      footer-hide
      closable
      title="申请商业授权"
      :z-index="1"
      width="640px"
      :before-close="cancel"
    >
      <div class="article-manager">
        <el-form
          ref="formItem"
          :model="formItem"
          label-width="100px"
          :rules="ruleValidate"
        >
          <el-form-item label="企业名称：" prop="company_name" label-for="company_name">
            <el-input v-model="formItem.company_name" placeholder="请填写您的企业名称" />
          </el-form-item>
          <el-form-item label="企业域名：" prop="domain_name" label-for="domain_name">
            <el-input v-model="formItem.domain_name" placeholder="注：区分二级域名，申请通过后只能使用当前提交的域名" />
          </el-form-item>
          <el-form-item label="订单号：" label-for="order_id" prop="order_id">
            <el-input
              v-model="formItem.order_id"
              placeholder="请输入您在淘宝或小程序购买的源码订单号"
              class="customer"
            >
              <a slot="append" target="_blank" href="http://www.crmeb.com/home/grant/applyauthorize.html">联系客服获取订单号</a>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号：" label-for="phone" prop="phone">
            <el-input v-model="formItem.phone" type="number" placeholder="负责人电话" />
          </el-form-item>
          <el-form-item label="验证码：" label-for="captcha" prop="captcha">
            <div class="acea-row row-middle code">
              <el-input v-model="formItem.captcha" placeholder="验证码" class="input" />
              <img
                :src="captchs"
                class="pictrue"
                @click="captchsChang"
              >
            </div>
          </el-form-item>
          <el-button type="primary" :loading="loading" class="submit" @click="handleSubmit('formItem')">提交</el-button>
        </el-form>
      </div>
    </el-dialog>-->
     <el-dialog
      v-if="isTemplate"
      v-model="isTemplate"
      :visible.sync="isTemplate"
      :before-close="handleClose"
      width="440px"
      :title="title"
      close-on-click-modal
      class="mapBox"
      custom-class="dialog-scustom"
      style="padding: 0;"
    >  
     <iframe :src="iframeUrl+'&inner_frame=1'" style="width:400px;height:600px;" frameborder="0" />
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
import { authTypeApi, getAuthApi, authApplyApi, saveCrmebCopyRight, applyAuthApi, getCrmebCopyRight } from '@/api/maintain'
export default {
  name: 'Index',
  data() {
    return {
      formItem: {
        company_name: '',
        domain_name: '',
        order_id: '',
        phone: '',
        captcha: ''
      },
      ruleValidate: {
        company_name: [
          { required: true, message: '请填写您的企业名称', trigger: 'blur' }
        ],
        domain_name: [
          { required: true, message: '请输入域名，格式：baidu.com', trigger: 'blur' }
        ],
        order_id: [
          { required: true, message: '请输入您在淘宝或小程序购买的源码订单号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入负责人电话', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      status: -1,
      dayNum: 0,
      captchs: 'http://authorize.crmeb.net/api/captchs/',
      authCode: '',
      loading: false,
      isTemplate: false,
      iframeUrl: '',
      copyright: '',
      copyrightText: '',
      authorizedPicture: '', // 版权图片
      modalPic: false,
      copyrightStatus: 0,
      title: '去版权'
    }
  },
  mounted() {
    this.getAuth()
    this.getAuthData()
    this.captchsChang()
    window.addEventListener("message", e=>{
      if(e.data.event == 'onCancel'){
        this.handleClose(); 
      }
    })
  },
  methods: {
    captchsChang() {
      this.captchs = this.captchs + Date.parse(new Date())
    },
    cancel() {
      this.dialogVisible = false
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          authApplyApi(this.formItem).then(res => {
            this.$message.success(res.message)
            this.loading = false
            this.dialogVisible = false
            this.getAuth()
          }).catch(res => {
            this.loading = false
            this.captchsChang()
            this.$message.error(res.message)
          })
        } else {
          return false
        }
      })
    },
    getAuth() {
      authTypeApi().then(res => {
        const data = res.data || {}
        this.authCode = data.authCode || ''
        this.status = data.status === undefined ? -1 : data.status
        this.dayNum = data.day || 0   
      })
    },  
    getAuthData() {
      getAuthApi().then(res => {
        const data = res.data || {}
        this.copyrightStatus = res.data.status
        if(res.data.status == -1){
          this.iframeUrl = res.data.url
        }else{
          this.copyrightText = res.data.copyright_context || ''
          this.authorizedPicture = res.data.copyright_image || ''
        } 
      })
    },
    // 申请授权
    applyAuth() {
      applyAuthApi().then(res => {
        this.iframeUrl = res.data.url
        this.isTemplate = true
        this.title = "申请授权"
      })
    },
    //保存版权信息
    saveCopyRight() {
      saveCrmebCopyRight({
        copyright_context: this.copyrightText,
        copyright_image: this.authorizedPicture,
      }).then((res) => {
        return this.$message.success(res.message)
      }).catch(({ message }) => {
        this.$message.error(message);
      });
    },
    // 选择图片
    modalPicTap() {
      const _this = this;
      this.$modalUpload(function (img) {  
        _this.authorizedPicture = img[0];   
      });
    },
    toCrmeb() {
      window.open('http://www.crmeb.com')
    },
    handleClose(){
      this.isTemplate = false
      this.getAuthData();
    }
  }
}
</script>

<style scoped lang="scss">
  .auth {
    padding: 9px 16px 9px 10px;
  }
  .auth .iconIos {
    font-size: 40px;
    margin-right: 10px;
    color: #001529;
  }
  .auth .text {
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
  }
  .auth .price{
    color: red;
    font-size: 18px;
  }
  .auth .text .code {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 5px;
  }
  .auth .blue {
    color: #1890FF !important;
  }
  .auth .red {
    color: #ED4014 !important;
  }
  .grey {
    background-color: #999999;
    border-color: #999999;
    color: #fff;
  }
.update {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.85);
  padding-right: 12px;
}
.prompt {
  margin-left: 152px;
  font-size: 12px;
  font-weight: 400;
  color: #999999;
}
.code .input .ivu-input {
  border-radius: 4px 0 0 4px !important;
}
.code .pictrue {
  height: 32px;
  width: 17%;
}
.submit {
  width: 100%;
}
.code .input {
   width: 83%;
}
.authorized {
  display: flex;
  margin-left: 60px;
  margin-bottom: 14px;
  .upload {
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    border: 1px solid #DDDDDD;
  }
}
.upload .iconfont {
  text-align: center;
  line-height: 60px;
}
.uploadPictrue {
  width: 60px;
  height: 60px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}
.uploadPictrue img {
  width: 100%;
  height: 100%;
}
.customer {
  border-right: 0;
}
.customer a {
  font-size: 12px;
}
.ivu-input-group-prepend, .ivu-input-group-append {
   background-color: #fff;
}
.ivu-input-group .ivu-input {
  border-right: 0 !important;
}
</style>
