<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form ref="promoterForm" :model="promoterForm" :rules="rules" label-width="200px" class="demo-promoterForm">
        <el-form-item prop="extension_status">
          <span slot="label">
            <span>分销启用：</span>
            <el-tooltip class="item" effect="dark" content="商城分销功能开启关闭" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-radio-group v-model="promoterForm.extension_status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="extension_one_rate">
          <span slot="label">
            <span>一级返佣比例：</span>
            <el-tooltip class="item" effect="dark" content="订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="promoterForm.extension_one_rate" :precision="2" :step="0.1" :min="0" class="selWidth"></el-input-number>
          <span>%</span>
        </el-form-item>
        <el-form-item prop="extension_two_rate">
          <span slot="label">
            <span>二级返佣比例：</span>
            <el-tooltip class="item" effect="dark" content="订单交易成功后给上级返佣的比例0 ~ 100,例:5 = 反订单金额的5%" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="promoterForm.extension_two_rate" :precision="2" :step="0.1" :min="0" class="selWidth"></el-input-number>
          <span>%</span>
        </el-form-item>
        <el-form-item prop="extension_self" required>
            <span slot="label">
              <span>分销内购：</span>
            </span>
            <el-radio-group v-model="promoterForm.extension_self">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0" class="radio">关闭</el-radio>
            </el-radio-group>
            <div class="item-text">
                <span class="title">开启：</span>开启分销内购，分销员自己购买商品，享受一级返佣，上级享受二级返佣；
                <span class="title">关闭：</span>分销员自己购买商品没有返佣
            </div>
        </el-form-item>
        <el-form-item prop="extension_limit" required>
          <span slot="label">
            <span>分销限时开关：</span>
          </span>
          <el-radio-group v-model="promoterForm.extension_limit">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0" class="radio">关闭</el-radio>
          </el-radio-group>
          <div class="item-text">
            <span class="title">开启：</span>根据设置的分销绑定时段返佣；
            <span class="title">关闭：</span>默认永久绑定<span class="font-red">（此处不建议频繁修改，请谨慎操作）</span>
          </div>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <span>分销绑定时间设置：</span>
          </span>
          <el-input-number v-model="promoterForm.extension_limit_day" :step="1" :min="0"></el-input-number> 天
           <div class="item-text">
                指自绑定关系成功至自动解绑之间的天数，自动解绑后返佣按新绑定关系结算。<span class="font-red">（此处不建议频繁修改，请谨慎操作）</span>
          </div>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <span>佣金到账方式：</span>
          </span>
          <el-radio-group v-model="promoterForm.sys_extension_type">
                <el-radio :label="0">线下手动转账</el-radio>
                <el-radio :label="1" class="radio">自动到微信零钱</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm('promoterForm')">保存</el-button>
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
import { configApi, configUpdateApi, productCheckApi } from '@/api/promoter'
export default {
  name: 'Index',
  data() {
    return {
      promoterForm: {
        extension_self: 1,
        extension_limit_day: 0,
        extension_limit: 1,
        sys_extension_type: 0,
      },
      loading: false,
      rules: {
        extension_status: [
          { required: true, message: '请选择是否启用分销', trigger: 'change' }
        ],
        extension_one_rate: [
          { required: true, message: '请输入一级返佣比例', trigger: 'blur' }
        ],
        extension_two_rate: [
          { required: true, message: '请输入二级返佣比例', trigger: 'blur' }
        ],
        extension_self: [
          { required: true, message: '请选择是否开启分销内购', trigger: 'blur' }
        ],
        extension_limit: [
          { required: true, message: '请选择是否开启分销限时', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getDetal()
  },
  methods: {
    getDetal() {
      configApi().then(res => {
        this.promoterForm = res.data
        this.promoterForm.extension_status = Number(res.data.extension_status)
        this.promoterForm.extension_self = res.data.extension_self ? 1 : 0
        this.promoterForm.extension_limit = res.data.extension_limit ? 1 : 0;
        this.promoterForm.extension_limit_day = res.data.extension_limit_day ? res.data.extension_limit_day : 30;

      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          configUpdateApi(this.promoterForm).then(res => {
            this.loading = false
            this.$modalSure('提交成功，是否自动下架商户低于此佣金比例的商品').then(() => {
              productCheckApi().then(({ message }) => {
                this.$message.success(message)
              }).catch(({ message }) => {
                this.$message.error(message)
              })
            })
          }).catch((res) => {
            this.$message.error(res.message)
            this.loading = false
          })
        } else {
          return false
        }
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
    display: inline-block;
    margin-left: 30px;
    color: #606266;
    .title{
        font-weight: bold;
    }
  }
  .font-red{
      color: #ff4949;
  }
</style>
