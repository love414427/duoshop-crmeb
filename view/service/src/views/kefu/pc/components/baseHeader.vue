<template>
  <div class="base-header">
    <div class="left-wrapper">
      <div class="user_info">
        <img :src="merchant.avatar">
        <span>{{ merchant.name }}</span> <span v-if="ServiceInfo" style="margin-left: 3px;"> - {{
          ServiceInfo.nickname
        }}</span>
        <div class="status-box">
          <div class="status" :class="isOnline ? 'on':'off'" @click.stop="setOnline">
            <span class="dot" />
            {{ isOnline ? '在线' : '下线' }}
          </div>

          <div v-show="onlinePop" class="online-down">
            <div class="item" @click.stop="changeOnline(true)"><span v-if="isOnline" class="iconfont iconduihao" /><i
              class="green"
            />在线
            </div>
            <div class="item" @click.stop="changeOnline(false)"><span
              v-if="!isOnline"
              class="iconfont iconduihao"
            /><i />下线
            </div>
          </div>
        </div>

      </div>
      <div class="out-btn" @click.stop="outLogin">退出登录</div>
    </div>
  </div>
</template>

<script>
import { merchantInfo } from '@/api/kefu'
import { roterPre } from '@/settings'
import Cookies from 'js-cookie'

export default {
  name: 'BaseHeader',
  props: {
    isOnline: Boolean
  },
  data() {
    return {
      merchant: {},
      onlinePop: false,
      ServiceInfo: null
    }
  },
  computed: {},
  watch: {
    $route() {
      const res = Cookies.get('ServiceInfo')
      if (res) {
        this.ServiceInfo = JSON.parse(res)
      }
    }
  },
  mounted() {
    merchantInfo().then(res => {
      this.merchant = res.data
    })
    document.addEventListener('click', () => {
      this.onlinePop = false
    })
    const res = Cookies.get('ServiceInfo')
    if (res) {
      this.ServiceInfo = JSON.parse(res)
    }
  },
  methods: {
    setOnline() {
      this.onlinePop = !this.onlinePop
    },
    changeOnline(type) {
      this.setOnline()
      if (this.isOnline != type) {
        this.$emit('online', type)
      }
    },
    // 退出登录
    outLogin() {
      this.$confirm('您确定退出登录当前账户吗？', {
        title: '退出登录确认'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        setTimeout(() => {
          location.href = `${roterPre}/login?redirect=${this.$route.fullPath}`
        }, 300)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-header
  z-index 99
  position relative
  display flex
  align-items center
  justify-content space-between
  height 66px
  padding 0 0 0 15px
  background: linear-gradient(270deg, #1890FF 0%, #3875EA 100%);
  color #fff
  flex-shrink 0

  .left-wrapper
    position relative
    display flex
    flex 1
    align-items center

    .search_box
      width 295px
      border-radius 17px
      overflow hidden

    .user_info
      display flex
      align-items center
      margin-left 10px

      img
        width 40px
        height 40px
        margin-right 10px
        border-radius 50%

      span
        font-size 16px

      .status-box
        position relative
        cursor pointer

      .status
        display flex
        align-items center
        padding 5px 10px
        margin-left 10px
        background #EAFFEB
        color: rgba(0, 0, 0, 0.65);
        border-radius 15px
        font-size 14px

        .dot
          width 6px
          height 6px
          margin-right 3px
          border-radius 50%
          background #48D452

        &.off
          background #F3F3F3

          .dot
            background #999999

      .online-down
        z-index 50
        position absolute
        font-size: 14px;
        left 0
        bottom -70px
        width 86px
        background #fff
        color #333
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
        border-radius: 5px;

        .item
          position relative
          display flex
          align-items center
          padding 7px 10px 7px 30px
          cursor pointer

          i
            width 10px
            height 10px
            margin-right 8px
            border-radius 50%
            background #999999

            &.green
              background #48D452

          .iconfont
            position absolute
            left 10px
            top 50%
            transform translateY(-50%)
            font-size 12px

    .out-btn
      position absolute
      right 30px
      top 50%
      transform translateY(-50%)
      width: 86px;
      height: 26px;
      line-height 28px
      text-align center
      background: #FFFFFF;
      border-radius: 16px;
      color #3875EA
      font-size 13px
      cursor pointer

  .right-menu
    display flex
    align-items center

    .menu-item
      position relative
      margin-right 30px
      font-size 14px
      font-weight 400
      cursor pointer

      &.on
        font-weight 600

        &::after
          position: absolute;
          left 0
          bottom -22px
          content ''
          width 100%
          height 2px
          background #fff
</style>
