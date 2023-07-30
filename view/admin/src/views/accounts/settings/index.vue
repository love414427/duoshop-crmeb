<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form ref="settingForm" :model="settingForm" :rules="rules" label-width="200px" class="demo-promoterForm">       
        <el-form-item prop="extract_minimum_line">
          <span slot="label">
            <span>商户最低提现金额：</span>
            <el-tooltip class="item" effect="dark" content="指商户的余额至少大于该金额部分，才可以提现，设置为0时默认商户余额可以全部提现" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="settingForm.extract_minimum_line" :precision="2" :step="0.1" :min="0" class="selWidth"></el-input-number>
          <span>（单位： 元）</span>
        </el-form-item>
        <el-form-item prop="extract_minimum_num">
          <span slot="label">
            <span>商户每笔最小提现额度：</span>
            <el-tooltip class="item" effect="dark" content="指商户的每次申请转账最小的金额；设置为0时默认不限制最小额度" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="settingForm.extract_minimum_num" :precision="2" :step="0.1" :min="0" class="selWidth"></el-input-number>
          <span>（单位： 元）</span>
        </el-form-item>
        <el-form-item prop="extract_maxmum_num">
          <span slot="label">
            <span>商户每笔最高提现额度：</span>
            <el-tooltip class="item" effect="dark" content="商户每次提现申请的最高额度，设置0时默认不限制" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="settingForm.extract_maxmum_num" :precision="2" :step="0.1" :min="0" class="selWidth"></el-input-number>
          <span>（单位： 元）</span>
        </el-form-item>
        <el-form-item prop="mer_lock_time" label="商户余额冻结期：">           
          <el-input-number v-model="settingForm.mer_lock_time"  :step="1" :min="0" class="selWidth"></el-input-number>
          <span>（单位： 天），冻结期：仅针对线下转账模式，指用户支付成功后多少天，商户余额可解冻；设置为0，即无冻结期。</span>
        </el-form-item>
        <el-form-item prop="open_wx_combine" required>
          <span slot="label">
            <span>开启自动分账：</span>
          </span>
          <el-radio-group v-model="settingForm.open_wx_combine">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0" class="radio">关闭</el-radio>
          </el-radio-group>
          <div class="item-text">
            <div v-if="settingForm.open_wx_combine">
              <span class="title">开启说明：</span>
              <div>系统已对接微信电商收付通，开启此功能时，请注意以下事项：</div>
              <div>第一步：请在微信公众号后台开通电商收付通；</div>
              <div>第二步：请在<span class="color_blue">平台后台 - 设置-支付配置-微信服务商支付配置</span>做相应参数配置，配置好后，请在此处开启该自动分账；</div>
              <div>第三步：需子商户在<span class="color_blue">商户后台-财务-申请分账商户</span> -提交资料-审核完成；</div>
              <div>以上步骤全部完成后，用户通过微信所支付的金额，会在用户确认收货后15天自动到子商户号。通过余额支付、支付宝支付的金额请前往<span class="color_blue">财务-账单管理</span>查看，需子商户申请转账，平台审核并线下转账。</div>
            </div>
            <div v-else>
              <span class="title">关闭说明：</span>
              <div>关闭自动分账时，系统默认启用线下手动转账模式， 指后台显示账单及子商户实时结算的余额，子商户需要申请转账，平台审核通过后，线下转账给子商户。</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="open_wx_sub_mch" required>
          <span slot="label">
            <span>开启子商户入驻：</span>
          </span>
          <el-radio-group v-model="settingForm.open_wx_sub_mch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0" class="radio">关闭</el-radio>
          </el-radio-group> 
          <div class="item-text">
            <div>
              <span class="title">注意：</span>
              <div>此处开启子商户入驻是指针对开启自动分账模式，需在微信支付商户后台开启&lt;电商收付通&gt;，与商城的商户入驻功能无关；如不使用自动分账，此处也不需要开启。</div>
            </div>
          </div>         
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm('settingForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
import { getSettingApi, updateSettingApi } from '@/api/accounts'
export default {
  name: 'Index',
  data() {
    return {
      settingForm: {
        open_wx_combine: 0,
        open_wx_sub_mch: 0,
        extract_minimum_line: 0,
        extract_minimum_num: 1,
        extract_maxmum_num: 0,
        mer_lock_time: 0
      },
      status: 0,
      loading: false,
      rules: {
        open_wx_combine: [
          { required: true, message: '请选择是否开启自动分账', trigger: 'change' }
        ],
        open_wx_sub_mch: [
          { required: true, message: '请选择是否开启子商户入驻', trigger: 'change' }
        ],
        extract_minimum_line: [
          { required: true, message: '请输入商户最低提现金额', trigger: 'blur' }
        ],
        extract_minimum_num: [
          { required: true, message: '请输入每笔最小提现额度', trigger: 'blur' }
        ],
        extract_maxmum_num: [
          { required: true, message: '请输入商户每笔最高提现金额', trigger: 'blur' }
        ],
        mer_lock_time: [
          { required: true, message: '请输入商户余额冻结期', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getDetal()
  },
  methods: {
    getDetal() {
      getSettingApi().then(res => {
        this.settingForm = res.data
        this.settingForm.open_wx_combine = Number(res.data.open_wx_combine)
        this.status = res.data.open_wx_combine
        this.settingForm.open_wx_sub_mch = Number(res.data.open_wx_sub_mch)

      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.loading = true
          if((that.status == 0 && that.settingForm.open_wx_combine == 1)){ 
                 that.$confirm('开启自动分账后将自动关闭所有未入驻微信子商户的商家', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                 }).then(() => {
                    that.submit()
                 }).catch(() => {
                    that.loading = false
                    that.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            }else{
                that.submit()    
            }                  
        }else{
            return false
        }
      })
    },
    //提交
    submit(){
        updateSettingApi(this.settingForm).then(res => {
            this.loading = false
            this.$message.success(res.message)
        }).catch((res) => {
            this.$message.error(res.message)
            this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 300px;
  }
  .item-text{
    color: #606266;
    .title{
        font-weight: bold;
    }
    .color_blue{
        color: #1890ff;
    }
  }
  .font-red{
      color: #ff4949;
  }
</style>
