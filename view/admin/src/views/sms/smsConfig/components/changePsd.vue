<template>
  <div class="login-container">
    <el-row type="flex">
      <el-col :span="24">
        <el-form ref="formInline" size="small" :model="formInline" :rules="ruleInline" class="login-form" autocomplete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">短信账户密码修改</h3>
          </div>
          <el-form-item>
            <div style="text-align: left;">用户名： {{ username }}</div>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formInline.password"
              placeholder="请输入新密码"
              prefix-icon="el-icon-lock"
              :type="passwordType"
              tabindex="1"
              autocomplete="off"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="formInline.phone"
              placeholder="请输入您的手机号"
              prefix-icon="el-icon-phone-outline"
            />
          </el-form-item>
          <el-form-item prop="code" class="captcha">
            <div class="acea-row" style="flex-wrap: nowrap;">
              <el-input
                v-model="formInline.code"
                placeholder="验证码"
                type="text"
                tabindex="1"
                autocomplete="off"
                prefix-icon="el-icon-message"
                style="width: 90%"
              />
              <el-button size="small" :disabled=!this.canClick @click="cutDown">{{cutNUm}}</el-button>
            </div>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click="handleSubmit('formInline')">确认修改</el-button>
          <el-button :loading="loading" style="width:100%;margin:0" @click="goback('formInline')">&nbsp;返回&nbsp;</el-button>
        </el-form>
      </el-col>
    </el-row>
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
import { changePsdApi } from '@/api/sms'
import { captchaApi } from '@/api/setting'
export default {
  name: 'changePsd',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      captchatImg: '',
      cutNUm: '获取验证码',
      canClick: true,
      username: '',
      formInline: {
        account: '',
        password: '',
        code: ''
      },
      ruleInline: {
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  created() {
    var _this = this
    document.onkeydown = function(e) {
      const key = window.event.keyCode
      if (key === 13) {
        _this.handleSubmit('formInline')
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 短信验证码
    cutDown() {
      if (this.formInline.phone) {
        if (!this.canClick) return
        this.canClick = false
        this.cutNUm = 60
        captchaApi(this.formInline.phone).then(async res => {
          this.$message.success(res.message)
        }).catch(res => {
          this.$message.error(res.message)
        })
        const time = setInterval(() => {
          this.cutNUm--
          if (this.cutNUm === 0) {
            this.cutNUm = '获取验证码'
            this.canClick = true
            clearInterval(time)
          }
        }, 1000)
      } else {
        this.$message.warning('请填写手机号!')
      }
    },
    handleSubmit(name) {
      this.loading = true;
      this.$refs[name].validate((valid) => {
        if (valid) {
          changePsdApi(this.formInline).then(async res => {
            this.loading = false;
            this.$message.success(res.message)
            this.$emit('change-success')
          }).catch(res => {
            this.$message.error(res.message)
          })
        } else {
          return false
        }
      })
    },
    goback(){
      this.loading = true;
      this.$emit('change-success')
    }
  }
}
</script>
<style lang="scss" scoped>
  .title{
    text-align: center;
  }
  .captcha{
    display: flex;
    align-items: flex-start;
  }
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .imgs{
    img{
      height: 36px;
    }
  }
  .login-form {
    flex: 1;
    padding: 32px 0;
    text-align: center;
    width: 384px;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    /deep/.svg-icon {
      vertical-align: 0.3em;
    }
  }

</style>
