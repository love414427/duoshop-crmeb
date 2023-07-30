<template>
  <div class="right-wrapper">
    <template>
      <div v-if="user" class="user-wrapper">
        <div class="user">
          <div v-if="user.user" class="avatar">
            <img v-lazy="user.user.avatar" alt="">
          </div>
          <div class="name line1">{{ user.user.nickname }}</div>
          <div class="label">
            <template v-if="user.user.user_type === 'routine'">
              <span class="label routine">小程序</span>
            </template>
            <template v-if="user.user.user_type === 'h5'">
              <span class="label H5">WEB</span>
            </template>
            <template v-if="user.user.user_type === 'wechat'">
              <span class="label wechat">公众号</span>
            </template>
            <template v-if="user.user.user_type === 'apple'">
              <span class="label pc">APP</span>
            </template>
          </div>
        </div>
        <div class="user-info">
          <div class="item">
            <span>手机号: </span>
            {{ user.user.phone || '暂无' }}
          </div>
          <div class="item">
            <span>备　注: </span>
            <template v-if="!showText">
              <div v-if="!user.mark" class="item-mark" @click="showTextFn">请输入</div>
              <div v-else style="word-wrap: break-word;" @click="showTextFn">{{ user.mark }}</div>
            </template>
            <ElInput v-if="showText" ref="input" v-model="user.mark" type="textarea" :rows="4" @blur="changeMark" />
          </div>
        </div>
        <div class="user-info">
          <div class="item">
            <span>推荐人: </span>
            <template v-if="user.user.spread">{{ user.user.spread.nickname }}</template>
            <template v-else>暂无</template>
          </div>
          <div class="item">
            <span>余　额: </span>
            {{ user.user.now_money }}
          </div>
          <div class="item">
            <span>推广员: </span>{{ user.user.is_promoter ? '是' : '否' }}
          </div>
          <div class="item">
            <span>生　日: </span>
            {{ user.user.birthday | getDay }}
          </div>
        </div>
      </div>
      <empty v-else status="2" msg="暂无用户信息" />
    </template>
  </div>
</template>

<script>
import {
  changeMark
} from '@/api/kefu'
import empty from '../../components/empty'
import dayjs from 'dayjs'

export default {
  name: 'RightMenu',
  components: {
    empty
  },
  filters: {
    getDay(val) {
      if (val) {
        return dayjs(val).format('YYYY年M月D日')
      }
      return '未知'
    }
  },
  props: {
    user: {}
  },
  data() {
    return {
      mark: '',
      showText: false,
      limit: 10,
      page: 1
    }
  },
  methods: {
    showTextFn() {
      this.showText = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    changeMark() {
      this.showText = false
      changeMark(this.user.uid, this.user.mark).then(res => {
        this.$message.success('设置成功')
      }).catch(e => {
        this.$message.error('设置失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right-wrapper {
  width: 280px;
  height: 100%;
  overflow-y: auto;

  .user-wrapper {
    padding: 0 8px;

    .user {
      display: flex;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ECECEC;

      .avatar {
        width: 42px;
        height: 42px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .name {
        max-width: 150px;
        margin-left: 10px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
      }

      .label {
        margin-left: 5px;
        font-size: 12px;
        border-radius: 2px;
        padding: 2px 5px;

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
          color: #6440c2;
        }
      }
    }
  }
}

.routine {
  color: #3875EA;
  background: #d8e5ff;
}

.user-info {
  padding: 15px 0 0px;
  border-bottom: 1px solid #ECECEC;

  .item {
    display: flex;
    align-items: baseline;
    margin-bottom: 15px;
    font-size: 14px;
    color: #333;

    .item-mark {
      color: #999;
    }

    .el-textarea, div {
      width: 70%;
    }

    span {
      width: 45px;
      font-size: 13px;
      color: #666;
      text-align: right;
      margin-right: 5px;
    }
  }

  .label-list {
    position: relative;
    display: flex;

    span {
      width: 70px;
      font-size: 13px;
      color: #666;
    }

    .con {
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      .label-item {
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 5px;
        color: #1890FF;
        font-size: 13px;
        background: rgba(24, 144, 255, 0.1);
      }
    }

    .right-icon {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}

.order-wrapper {
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .tab-head {
    display: flex;
    align-items: center;
    height: 46px;
    border-bottom: 1px solid #ECECEC;

    .tab-item {
      position: relative;
      flex: 1;
      text-align: center;
      font-size: 14px;
      cursor: pointer;

      &.active {
        color: #1890FF;
        font-size: 15px;
        font-weight: 600;

        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: -12px;
          width: 100%;
          height: 2px;
          background: #1890FF;
        }
      }
    }
  }

  .search-box {
    padding: 0 8px;
    margin-top: 12px;

    /deep/ .el-input__inner {
      border-radius: 17px;
    }
  }

  .order-list {
    padding: 0 8px;
    margin-top: 10px;
  }

  .order-item {
    margin-bottom: 18px;

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      padding: 0 10px;
      background: #F5F5F5;
      font-size: 13px;

      .left {
        display: flex;
        align-items: center;
        color: #1890FF;

        .font-box {
          margin-right: 8px;

          .iconfont {
            font-size: 18px;
          }
        }
      }
    }

    .goods-list {
      max-height: 156px;
      overflow: hidden;

      &.auto {
        max-height: none;
      }

      .goods-item {
        display: flex;
        margin-top: 15px;

        .img-box {
          width: 60px;
          height: 60px;

          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 2px;
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 180px;
          margin-left: 10px;
          font-size: 14px;

          .sku {
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }

  .more-box {
    text-align: right;
    color: #1890FF;
    font-size: 13px;
    padding-right: 10px;

    span {
      cursor: pointer;
    }
  }

  .order-info {
    margin-top: 15px;

    .info-item {
      margin-bottom: 5px;
      font-size: 13px;

      span {
        display: inline-block;
        width: 70px;
        text-align: right;
      }
    }
  }

  .btn-wrapper {
    margin-top: 10px;

    .btn {
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.goods-wrapper {
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .goods-tab {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    border-bottom: 1px solid #ECECEC;

    .tab-item {
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      cursor: pointer;

      &.active {
        color: #1890FF;

        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #1890FF;
        }
      }
    }
  }

  .search-box {
    margin-top: 10px;
    padding: 0 8px;

    /deep/ .el-input__inner {
      border-radius: 17px;
    }
  }

  .list-wrapper {
    padding: 0 8px;

    .list-item {
      display: flex;
      margin-top: 15px;

      .img-box {
        width: 60px;
        height: 60px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 180px;
        margin-left: 10px;
        font-size: 14px;

        .sku {
          font-size: 12px;
          color: #999999;

          span {
            margin-right: 10px;
          }
        }

        .price {
          display: flex;
          justify-content: space-between;
          color: #FF0000;

          .push {
            color: #1890FF;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.label-box {
  > > > .ivu-modal-header {
    padding: 0;
    border: 0;
    background: #fff;
    height: 50px;
    border-radius: 6px;
  }

  .label-head {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 13px;
    color: #333333;
    border-bottom: 1px solid #F0F0F0;
  }
}
</style>
