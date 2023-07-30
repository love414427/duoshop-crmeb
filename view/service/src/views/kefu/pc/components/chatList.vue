<template>
  <div class="chatList">
    <div class="tab-head">
      <ElInput
        v-model="keyword"
        prefix-icon="el-icon-search"
        placeholder="搜索用户名称"
        size="mini"
        @keydown.enter.native="submit"
      />
    </div>
    <div
      v-infinite-scroll="handleScroll"
      class="scroll-box"
      :infinite-scroll-disabled="loading || loaded"
      style="height:100%"
    >
      <div v-show="loading" style="text-align: center;margin-bottom: 10px;">
        <i class="el-icon-loading" />
      </div>
      <template v-if="userList.length>0">
        <div
          v-for="(item,index) in userList"
          :key="index"
          class="chat-item"
          :class="{active:curId == item.service_user_id}"
          @click="selectUser(item)"
        >
          <div class="avatar">
            <img v-lazy="item.user && item.user.avatar" alt="">
            <div class="status" :class="{off:item.is_online == 0}" />
          </div>
          <div class="user-info">
            <div class="hd" v-if="item.user">
              <span class="name line1">{{ item.user.nickname }}</span>
              <template v-if="item.user.user_type === 'routine'">
                <span class="label">小程序</span>
              </template>
              <template v-if="item.user.user_type === 'h5'">
                <span class="label H5">WEB</span>
              </template>
              <template v-if="item.user.user_type === 'wechat'">
                <span class="label wechat">公众号</span>
              </template>
              <template v-if="item.user.user_type === 'apple'">
                <span class="label pc">APP</span>
              </template>
            </div>
            <div v-if="item.last" class="bd line1">
              <template v-if="item.last.msn_type === 1">{{ item.last.msn }}</template>
              <template v-if="item.last.msn_type === 2">[表情]</template>
              <template v-if="item.last.msn_type === 3">[图片]</template>
              <template v-if="item.last.msn_type === 4">[商品]</template>
              <template v-if="item.last.msn_type === 5 || item.last.msn_type === 6">[订单]</template>
            </div>
          </div>
          <div class="right-box">
            <div v-if="item.last" class="time">{{ item.last.create_time | toDay }}</div>
            <div v-if="item.service_unread > 0 && curId != userList[0].service_user_id" class="num">
              <ElBadge :value="item.service_unread">
                <a href="#" class="demo-badge" />
              </ElBadge>
            </div>
          </div>
        </div>
      </template>
      <empty v-if="loaded && !userList.length" msg="暂无用户列表" status="1" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { record } from '@/api/kefu'
import empty from '../../components/empty'

export default {
  name: 'ChatList',
  components: {
    empty
  },
  filters: {
    toDay: function(value) {
      if (!value) return ''
      return dayjs(value).format('M月D日 HH:mm')
    }
  },
  data() {
    return {
      keyword: '',
      userList: [],
      curId: '',
      page: 1,
      limit: 15,
      loaded: false,
      loading: false,
    }
  },
  mounted() {

    this.getList()
  },
  methods: {
    
    submit() {
      this.page = 1
      this.loaded = false
      this.loading = false
      this.getList()
    },
    updateChatList() {
      const page = 1
      const limit = (this.page - 1) * this.limit
      this.getList({ page, limit })
    },
    getList(update) {
      if (!update && this.loaded) return
      if (!update && this.loading) return
      if (!update) {
        this.loading = true
      }
      record({
        page: update ? update.page : this.page,
        limit: update ? update.limit : this.limit,
        keyword: this.keyword
      }).then(res => {
        const data = res.data.list
        if (update) {
          this.userList = data  
        } else {
          this.loaded = data.length < this.limit
          this.userList = this.page == 1 ? data : this.userList.concat(data)
          if (!this.curId && data.length > 0) {
            this.$emit('active', data[0])
          }
          this.page++
          this.loading = false
        }
        // this.curId = this.userList.length > 0 ? this.userList[0].service_user_id : ''
      })
    },
    // 选择用户
    selectUser(item) {
      if (this.curId == item.service_user_id) return
      item.service_unread = 0
      this.curId = item.service_user_id
      this.$emit('active', item)
    },
    handleScroll() {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
.chatList {
  display: flex;
  flex-direction: column;
  width: 320px;
  // height: 100%;
  border-right: 1px solid #ECECEC;

  .tab-head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    flex-shrink: 0;
    font-size: 14px;
    color: #000000;

    .el-input {
      width: 295px;
    }

    /deep/ .el-input__inner {
      border-radius: 15px;
    }

  }

  .scroll-box {
    flex: 1;
    width: 320px;
    height: 500px;
    overflow-y: scroll;

    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .chat-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 10px;
      height: 74px;
      box-sizing: border-box;
      border-left: 3px solid transparent;
      cursor: pointer;

      &.active {
        background: #EFF0F1;
        border-left: 3px solid #1890FF;
      }

      .avatar {
        position: relative;
        width: 40px;
        height: 40px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .status {
          position: absolute;
          right: 3px;
          bottom: 0;
          width: 8px;
          height: 8px;
          background: #48D452;
          border: 1px solid #fff;
          border-radius: 50%;

          &.off {
            background: #999999;
          }
        }
      }

      .user-info {
        width: 155px;
        margin-left: 12px;
        margin-top: 5px;
        font-size: 16px;

        .hd {
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.65);

          .name {
            max-width: 67%;
          }

          .label {
            margin-left: 5px;
            color: #3875EA;
            font-size: 12px;
            background: #D8E5FF;
            border-radius: 2px;
            padding: 1px 5px;

            &.H5 {
              background: #FAF1D0;
              color: #DC9A04;
            }

            &.wechat {
              background: rgba(64, 194, 73, 0.16);
              color: #40C249;
            }

            &.pc {
              background: rgba(100, 64, 194, 0.16);
              color: #6440C2;
            }
          }
        }

        .bd {
          margin-top: 3px;
          font-size: 12px;
          color: #8E959E;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .right-box {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        color: #8E959E;

        .time {
          font-size: 12px;
        }

        .num {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>

