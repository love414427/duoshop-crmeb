<template>
  <div class="divBox">
    <table-list v-if="isShowList" />
    <!-- <login-from v-if="isShowLogn" @on-changes="onChangeReg" @on-Login="onLogin" />
    <register-from v-if="isShowReg" @on-change="logoup" />
    <change-psd v-if="isShowChangePsd" ref="changePsd" @change-success="changeSuccess"/>
    <change-signature v-if="isShowChangeSign" ref="changeSignature" @change-success="changeSuccess"/> -->
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
import tableList from './components/tableList'
import loginFrom from './components/loginFrom'
import registerFrom from './components/register'
import changePsd from './components/changePsd'
import changeSignature from './components/changeSignature'
import { logoutApi, smsNumberApi } from '@/api/sms'
import { mapGetters } from 'vuex'
export default {
  name: 'SmsConfig',
  components: { tableList, loginFrom, registerFrom, changePsd, changeSignature },
  data() {
    return {
      fullscreenLoading: false,
      smsAccount: '',
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      spinShow: false,
      isShowLogn: false,
      isShowChangePsd: false,
      isShowChangeSign: false,
      isShow: false,
      isShowReg: false,
      isShowList: false,
      amount: 0,
      numbers: 0,
      sendTotal: 0
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  mounted() {
    this.isShowList = true
  },
  methods: {
    // 剩余条数
    getNumber() {
      smsNumberApi().then(async res => {
        const data = res.data
        this.numbers = data.number
        this.sendTotal = data.send_total
        this.amount = data.number + data.send_total
        this.smsAccount = data.account
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 登录跳转
    onLogin() {
      const url = this.$route.query.url
      if (url) {
        this.$router.replace(url)
      } else {
        this.isShowLogn = false
        this.isShow = false
        this.isShowReg = false
        this.isShowList = true
      }
    },
    // 查看是否登录
    onIsLogin() {
      this.fullscreenLoading = true
      this.$store.dispatch('user/isLogin').then(async res => {
        const data = res.data
        this.isShowLogn = !data.status
        this.isShowList = data.status
        if (data.status) {
          this.smsAccount = data.info
        }
        this.fullscreenLoading = false
      }).catch(res => {
        this.fullscreenLoading = false
        this.isShowLogn = true
        this.$message.error(res.message)
      })
    },
    // 退出登录
    signOut() {
      logoutApi().then(async res => {
        this.isShowLogn = true
        this.isShowList = false
        this.$store.dispatch('user/isLogin')
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 立即注册
    onChangeReg() {
      this.isShowLogn = false
      this.isShow = false
      this.isShowReg = true
    },
    // 立即登录
    logoup() {
      this.isShowLogn = true
      this.isShow = false
      this.isShowReg = false
    },
    // 修改密码
    changePsd() {
      this.isShowChangePsd = true
      this.isShowList = false
      this.$nextTick(() => {
        this.$refs.changePsd.username = this.smsAccount
      })
    },
    // 修改成功
    changeSuccess(){
      let that = this
      that.isShowChangePsd = false
      that.isShowChangeSign = false
      that.isShowList = true

    },
    // 修改签名
    changeSignature(){
      this.isShowChangeSign = true
      this.isShowList = false
      this.$nextTick(() => {
        this.$refs.changeSignature.username = this.smsAccount
      })
    }
  }
}
</script>

<style scoped lang="scss">
  $cursor: #1890ff;
  .content{
    justify-content: space-between;
  }
  .rR{
    text-align: center;
    font-size: 22px;
    display: block;
  }
  .dashboard-workplace-header-tip {
    display: inline-block;
    vertical-align: middle;
  }
  .dashboard-workplace-header-tip-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .dashboard-workplace-header-tip-desc{
    /*line-height: 0 !important;*/
    display: block;
    span{
      font-size: 12px;
      color: $cursor;
      cursor: pointer;
      display: inline-block;
    }
  }
  .dashboard-workplace-header-extra{
    width: auto!important;
    min-width: 400px;
  }
  .pfont{
    font-size: 12px;
    color: #808695;
  }
</style>
