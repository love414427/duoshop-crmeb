<template>
  <div>
    <div v-if="psInfo" class="acea-row row-middle">
      <div class="avatar mr15"><div class="block"><el-avatar :size="50" :src="psInfo.avatar ? psInfo.avatar : moren"></el-avatar></div></div>
      <div class="dashboard-workplace-header-tip">
        <p class="dashboard-workplace-header-tip-title" v-text="psInfo.nickname || '-'" />
        <div class="dashboard-workplace-header-tip-desc">
          <span class="dashboard-workplace-header-tip-desc-sp">消费次数: {{ psInfo.pay_num }}次</span>
          <span class="dashboard-workplace-header-tip-desc-sp">总消费金额: {{ psInfo.pay_price }}元</span>
           <span v-if="psInfo.is_svip" class="dashboard-workplace-header-tip-desc-sp">会员到期时间: {{ psInfo.svip_endtime }}</span>
        </div>
      </div>
    </div>
    <el-row align="middle" :gutter="10" class="ivu-mt mt20">
      <el-col :span="4">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @select="changeType"
        >
          <el-menu-item v-for="(item, index) in list" :key="index" :name="item.val" :index="item.val">
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-table v-loading="loading" :data="tableData.data" class="tabNumWidth" ref="table" size="mini">
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.key"
            :label="item.title"
            width="item.minWidth"
          />
          <el-table-column v-if="type === '3'" label="有效期" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row ? scope.row.start_time + '-' + scope.row.end_time: '' | filterEmpty}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-sizes="[6, 12, 18, 24]"
            :page-size="tableFrom.limit"
            :current-page="tableFrom.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="pageChange"
          />
        </div>
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
import { userOrderApi, userCouponApi } from '@/api/user'
export default {
  name: 'UserDetails',
  props: {
    uid: {
      type: Number,
      default: null
    },
    row: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      moren: require("@/assets/images/f.png"),
      loading: false,
      columns: [],
      Visible: false,
      list: [
        { val: '0', label: '消费记录' },
        { val: '3', label: '持有优惠券' }
      ],
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 6
      },
      psInfo: null,
      type: '0'
    }
  },
  mounted() {
    if (this.uid) {
      this.getHeader()
      this.getInfo('0')
    }
  },
   beforeUpdate(){
    this.$nextTick(() =>{
      this.$refs['table'].doLayout();
    })
  },
  methods: {
    changeType(key) {
      this.type = key
      this.tableFrom.page = 1
      this.getInfo(key)
    },
    getInfo(key) {
      this.loading = true
      switch (key) {
        case '0':
          userOrderApi(this.uid, this.tableFrom).then(res => {
            this.tableData.data = res.data.list
            this.tableData.total = res.data.count
            this.columns = [
              {
                title: '订单ID',
                key: 'order_id',
                minWidth: 250
              },
              {
                title: '收货人',
                key: 'real_name',
                minWidth: 90
              },
              {
                title: '商品数量',
                key: 'total_num',
                minWidth: 80
              },
              {
                title: '商品总价',
                key: 'total_price',
                minWidth: 90
              },
              {
                title: '实付金额',
                key: 'pay_price',
                minWidth: 90
              },
              {
                title: '交易完成时间',
                key: 'pay_time',
                minWidth: 160
              }
            ]
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
          break
        case '3':
          userCouponApi(this.uid, this.tableFrom).then(res => {
            this.tableData.data = res.data.list
            this.tableData.total = res.data.count
            this.columns = [
              {
                title: '优惠券名称',
                key: 'coupon_title',
                minWidth: 120
              },
              {
                title: '面值',
                key: 'coupon_price',
                minWidth: 120
              },
              {
                title: '最低消费额',
                key: 'use_min_price',
                minWidth: 120
              },
              {
                title: '兑换时间',
                key: 'use_time',
                minWidth: 120
              }
            ]
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
          break
      }
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getInfo(this.type)
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getInfo(this.type)
    },
    getHeader() {
      this.psInfo = this.row
    }
  }
}
</script>

<style scoped lang="scss">
  .avatar{
    width: 60px;
    height: 60px;
    margin-left: 18px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .dashboard-workplace {
    &-header {
      &-avatar {
        /*width: 64px;*/
        /*height: 64px;*/
        /*border-radius: 50%;*/
        margin-right: 16px;
        font-weight: 600;
      }

      &-tip {
        width: 82%;
        display: inline-block;
        vertical-align: middle;
        margin-top: -12px;
        &-title {
          font-size: 13px;
          color: #000000;
          margin-bottom: 12px;
        }

        &-desc {
          &-sp {
            width: 32%;
            color: #17233D;
            font-size: 13px;
            display: inline-block;
          }
        }
      }

      &-extra {
        .ivu-col {
          p {
            text-align: right;
          }

          p:first-child {
            span:first-child {
              margin-right: 4px;
            }

            span:last-child {
              color: #808695;
            }
          }

          p:last-child {
            font-size: 22px;
          }
        }
      }
    }
  }
</style>
