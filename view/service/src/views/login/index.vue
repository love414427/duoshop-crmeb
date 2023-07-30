<template>
  <div class="page-account">
    <div class="page_wrapper">
      <div class="text">
        <div class="title">{{config.site_name || ''}}</div>
        <div class="info">让客户服务如此简单</div>
      </div>
      <div class="container containerSamll">
        <div class="index_from page-account-container">
          <div v-if="!isWeixin">
<!--            <div class="labelPic" @click="isWeixin = true">-->
<!--              <span class="iconfont iconerweima2" />-->
<!--            </div>-->
            <div class="page-account-top">
              <div class="page-account-top-logo">
                <span>客服登录</span>
              </div>
            </div>
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              autocomplete="on"
              label-position="left"
              @keyup.enter="handleLogin"
            >
              <el-form-item prop="account">
                <el-input
                  ref="account"
                  v-model="loginForm.account"
                  placeholder="用户名"
                  prefix-icon="el-icon-user"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  prefix-icon="el-icon-lock"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-form-item prop="code" class="captcha">
                <div class="captcha">
                  <el-input
                    ref="username"
                    v-model="loginForm.code"
                    style="width: 168px;"
                    prefix-icon="el-icon-message"
                    placeholder="验证码"
                    name="username"
                    type="text"
                    tabindex="3"
                    autocomplete="on"
                  />
                  <div class="imgs" @click="getCaptcha()">
                    <img :src="captchatImg">
                  </div>
                </div>
              </el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin"
              >登录
              </el-button>
            </el-form>
          </div>
          <div v-else>
<!--            <div class="labelPic" @click="isWeixin = false">-->
<!--              <span class="iconfont iconzhanghaomima" />-->
<!--            </div>-->
            <div class="page-account-top">
              <div class="page-account-top-logo">
                <span>微信扫码登录</span>
              </div>
            </div>
            <div ref="qrcode" class="erweima" />
          </div>
        </div>
      </div>
      <div v-if="version.status == -1" class="record_number">Copyright {{ version.year }} <a :href="`http://${version.url}`" target="_blank">{{ version.url }}</a></div>
      <div v-else class="record_number">Copyright {{ version.Copyright }}</div>
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
import { captchaApi, scanLogin, scanLoginCheck, config, version } from '@/api/kefu'
import QRCode from 'qrcodejs2'
import { setToken } from '@/utils/auth'
import Cookies from 'js-cookie'
// import '@/assets/js/canvas-nest.min'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6) {
          callback(new Error('请输入不少于6位数的密码'))
        } else {
          callback()
        }
      }
    }
    return {
      fullWidth: document.body.clientWidth,
      swiperOption: {
        pagination: {
          el: '.pagination'
        },
        autoplay: {
          enabled: true,
          disableOnInteraction: false,
          delay: 3000
        }
      },
      captchatImg: '',
      loginLogo: '',
      swiperList: [],
      loginForm: {
        account: '',
        password: '',
        key: '',
        code: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      isWeixin: false,
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      scanKey: '',
      scanTimer: null,
      config: Cookies.get('ser_config') || {},
      version: {}
    }
  },
  watch: {
    $route: {
      fullWidth(val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          this.timer = true
          const that = this
          setTimeout(function() {
            // 打印screenWidth变化的值
            that.timer = false
          }, 400)
        }
      },
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
    // isWeixin(n) {
    //   this.scanTimer && clearInterval(this.scanTimer)
    //   if (n) {
    //     scanLogin().then(res => {
    //       this.scan = res.data.key
    //       new QRCode(this.$refs.qrcode, {
    //         text: res.data.qrcode,
    //         width: 179,
    //         height: 179
    //       })
    //       this.scanTimer = setInterval(() => {
    //         scanLoginCheck(this.scan).then(res => {
    //           if (res.data.status === 200) {
    //             clearInterval(this.scanTimer)
    //             this.$store.commit('user/SET_TOKEN', res.data.result.token)
    //             Cookies.set('ServiceInfo', res.data.result.admin)
    //             setToken(res.data.result.token)
    //             this.$router.push({
    //               path: this.redirect || '/',
    //               query: this.otherQuery
    //             })
    //           }
    //         })
    //       }, 2000)
    //     })
    //   }
    // }
  },
  created() {
    const _this = this
    document.onkeydown = function(e) {
      if (_this.$route.path.indexOf('login') !== -1) {
        const key = window.event.keyCode
        if (key === 13) {
          _this.handleLogin()
        }
      }
    }
    window.addEventListener('resize', this.handleResize)
  },
  mounted() {
    this.getCaptcha()
    config().then(res => {
      this.config = res.data
      Cookies.set('ser_config', res.data)
    })
    this.getVersion();
  },
  methods: {
    getCaptcha() {
      captchaApi()
        .then(({ data }) => {
          this.captchatImg = data.captcha
          this.loginForm.key = data.key
        })
        .catch(() => {
          this.$message.error('请求失败')
        })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
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
    handleLogin() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(res => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(error => {
              this.loginForm.code = ''
              this.$message.error(error.message || '请求失败')
              this.loading = false
              this.getCaptcha()
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleResize(event) {
    },
    getVersion() {
        version().then(res => {
            this.version = res.data;
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-md: 768px;
$font-size-base: 14px;
$animation-time: 0.3s;
$animation-time-quick: 0.15s;
$transition-time: 0.2s;
$ease-in-out: ease-in-out;
$subsidiary-color: #808695;
.page-account {
  align-items: center;
  height: 100vh;
  overflow: auto;
  .record_number{
    padding-right: 30px;
    text-align: right;
    position: absolute;
    width: 100%;
    bottom: 30px;
    color: #666666;
    font-size: 13px;
    z-index: 300;
  }
  .page_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    margin: 0 auto;

    .text {
      width: 400px;
      height: 400px;
      color: #ffffff;
      position: relative;
      top: 100px;

      .title {
        font-size: 36px;
        font-weight: bold;
      }

      .info {
        font-size: 30px;
        margin-top: 20px;
      }

    }
  }

  &-container {
    flex: 1;
    padding: 32px 0;
    text-align: center;
    width: 360px;
    margin: 0 auto;

    &-result {
      width: 100%;
    }
  }

  &-tabs {
    .ivu-tabs-bar {
      border-bottom: none;
    }

    .ivu-tabs-nav-scroll {
      text-align: center;
    }

    .ivu-tabs-nav {
      display: inline-block;
      float: none;
    }
  }

  &-top {
    padding: 32px 0;

    &-logo {
      img {
        max-height: 75px;
      }
    }

    &-desc {
      font-size: $font-size-base;
      color: $subsidiary-color;
    }
  }

  &-auto-login {
    margin-bottom: 24px;
    text-align: left;

    a {
      float: right;
    }
  }

  &-other {
    margin: 24px 0;
    text-align: left;

    span {
      font-size: $font-size-base;
    }

    img {
      width: 24px;
      margin-left: 16px;
      cursor: pointer;
      vertical-align: middle;
      opacity: 0.7;
      transition: all $transition-time $ease-in-out;

      &:hover {
        opacity: 1;
      }
    }
  }

  .ivu-poptip,
  .ivu-poptip-rel {
    display: block;
  }

  &-register {
    float: right;

    &-tip {
      text-align: left;

      &-title {
        font-size: $font-size-base;
      }

      &-desc {
        white-space: initial;
        font-size: $font-size-base;
        margin-top: 6px;
      }
    }
  }

  &-to-login {
    text-align: center;
    margin-top: 16px;
  }

  &-header {
    text-align: right;
    position: fixed;
    top: 16px;
    right: 24px;
  }
}

.labelPic {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;

  .iconfont {
    font-size: 33px;
    color: #265BED;
  }
}

.erweima {
  width: 179px;
  height: 179px;
  border: 1px solid #E5E5E6;
  margin: 0 auto;
  padding: 0;
  background: #fff;

  /deep/ img, /deep/ canvas {
    width: 100%;
    height: 100%;
  }
}

@media (min-width: $screen-md) {
  .page-account {
    background-image: url("../../assets/images/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .page-account-container {
    padding: 32px 0 24px 0;
    position: relative;
  }
}

.page-account {
  display: flex;
}

.page-account .code {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-account .code .pictrue {
  height: 40px;
}

.swiperPross {
  border-radius: 6px 0px 0px 6px;
  overflow: hidden;
}

.swiperPross,
.swiperPic,
.swiperPic img {
  width: 510px;
  height: 100%;
}

.swiperPic img {
  width: 100%;
  height: 100%;
}

.container {
  height: 370px;
  padding: 0;
  /*overflow: hidden;*/
  border-radius: 6px;
  z-index: 1;
  display: flex;
  // position: relative;
  // left: 300px;
}

.containerSamll {
  width: 360px;
  background: #fff;
}

.index_from {
  padding: 0 40px 32px 40px;
  height: 370px;
  box-sizing: border-box;
}

.page-account-top {
  padding: 40px 0 30px;
  box-sizing: border-box !important;
  display: flex;
  justify-content: center;
  color: #000;
  font-size: 22px;
  font-weight: bold;
}

.page-account-container {
  border-radius: 0px 6px 6px 0px;
}

.btn {
  background: linear-gradient(
      90deg,
      rgba(25, 180, 241, 1) 0%,
      rgba(14, 115, 232, 1) 100%
  ) !important;
}
</style>

<style lang="scss" scoped>
.captcha {
  display: flex;
  align-items: flex-start;
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.imgs {
  img {
    height: 36px;
  }
}

.login-form {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;

  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
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

  /deep/ .svg-icon {
    vertical-align: 0.3em;
  }
}

.thirdparty-button {
  position: absolute;
  right: 0;
  bottom: 6px;
}
</style>
