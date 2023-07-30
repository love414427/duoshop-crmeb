<template>
  <div>
    <div class="divBox">
      <el-card v-if="isShowList" class="box-card">
        <div slot="header" class="clearfix">
          <div v-if="!accountInfo.info" class="demo-basic--circle acea-row row-middle">
            <span style="color: red;">平台未登录一号通！</span>
          </div>
          <div v-else class="acea-row header-count row-middle">

            <div class="header-extra">
              <div class="mb-5"><span>采集次数</span></div>
              <div>
                <div>{{ copy.num || 0 }}</div>
                <el-button size="small" type="primary" class="mt3" :disabled="copy.open != 2" @click="mealPay('copy')">套餐购买</el-button>
              </div>
            </div>
            <div class="header-extra">
              <div class="mb-5"><span>面单打印次数</span> </div>
              <div>
                <div>{{ dump.num || 0 }}</div>
                <el-button size="small" type="primary" class="mt3" :disabled="dump.open != 1" @click="mealPay('dump')">套餐购买</el-button>
              </div>
            </div>
          </div>

        </div>
      </el-card>
    </div>
    <el-card class="ivu-mt">
      <table-list v-if="isShowList" ref="tableLists" :copy="copy" :dump="dump" :account-info="accountInfo" />
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
import tableList from './tableList'
import { serveInfoApi } from '@/api/setting'
import { roterPre } from '@/settings'
export default {
  name: 'SmsConfig',
  components: { tableList },
  data() {
    return {
      roterPre: roterPre,
      imgUrl: require('@/assets/images/ren.png'),
      spinShow: false,
      isShowList: false, // 登录之后列表
      smsAccount: '',
      accountInfo: {},
      dump: {}, // 电子面单打印
      copy: {} // 商品采集
    }
  },
  created() {
    this.getServeInfo()
  },
  methods: {
    onOpen(val) {
      this.$refs.tableLists.onOpenIndex(val)
    },
    mealPay(val) {
      this.$router.push({ path: this.roterPre + '/setting/sms/sms_pay/index', query: { type: val }})
    },
    // 平台用户信息
    getServeInfo() {
      this.spinShow = true
      serveInfoApi().then(async res => {
        const data = res.data
        this.isShowList = true
        this.dump = {
          num: data.export_dump_num,
          open: data.crmeb_serve_dump
        }
        this.copy = {
          num: data.copy_product_num,
          open: data.copy_product_status
        }
        this.spinShow = false
        this.smsAccount = data.account
        this.accountInfo = data
      }).catch(res => {
        this.$message.error(res.message)
        this.isShowLogn = true
        this.isShowList = false
        this.spinShow = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    $cursor: #1890ff;
    .header-count{
        float: right;
    }
    .dashboard-workplace-header-tip-desc{
      display: block;
    span{
      font-size: 12px;
      color: $cursor;
      cursor: pointer;
      display: inline-block;
    }
  }
  .dashboard-workplace-header-extra{
    width: auto;
    min-width: 400px;
  }
    .dashboard{
        width: auto;
        min-width: 300px;
    }
    .header-extra{
        border-right: 1px solid #E9E9E9;
        text-align: center;
        padding: 0 18px;
        &:last-child{
            border: none;
        }
    }
    .page-account-top-tit{
        font-size: 21px;
        color: #1890FF;
    }
    .dashboard-workplace{
        &-header{
            &-avatar{
                width: 64px;
                height: 64px;
                border-radius: 50%;
                margin-right: 16px;
            }
            &-tip{
                display: inline-block;
                vertical-align: middle;
                &-title{
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }
                &-desc{
                    color: #808695;
                }
            }
            &-extra{
                .ivu-col{
                    p{
                        text-align: right;
                    }
                    p:first-child{
                        span:first-child{
                            margin-right: 4px;
                        }
                        span:last-child{
                            color: #808695;
                        }
                    }
                    p:last-child{
                        font-size: 22px;
                    }
                }
            }
        }
    }
</style>
