<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;margin:20px 0;">
      <div class="panel-title">
        <el-col :span="12">
          <span>支付订单</span>
        </el-col>
        <el-col :span="12" class="align-right">
          <el-radio-group v-model="time3" size="mini" @change="getCurrentData(time3)">
            <el-radio-button v-for="item in timeList1" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-col>
      </div>
      <line-chart ref="lineChart" :chart-data="lineChartData" :date="time3" />
    </el-row>
    <el-row :gutter="20" class="panel-warp" style="height: 380px;">
      <el-col :xs="24" :sm="24" :lg="16">
        <el-row class="panel-title" style="background: #fff;padding: 20px;">
          <el-col :span="12">
            <span>成交用户</span>
          </el-col>
          <el-col :span="12" class="align-right">          
            <el-radio-group v-model="time1" size="mini" @change="getCustomerData(time1)">
              <el-radio-button v-for="item in timeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <div class="chart-wrapper">
          <el-row style="background: #fff; height: 360px; padding: 0 20px; position: relative;">
            <span class="grid-floating" style="position: absolute;">
              访客-下单转化率：
              <span
                class="grid-conversion-number"
              >{{ orderCustomer.orderRate ? Math.floor(orderCustomer.orderRate*100)  : '0.00' }}%</span>
            </span>
            <span class="grid-floating">
              下单-支付转化率：
              <span
                class="grid-conversion-number"
              >{{ orderCustomer.payOrderRate ? Math.floor(orderCustomer.payOrderRate*100) : '0.00' }}%</span>
            </span>
            <el-col :span="24">
              <div class="grid-content">
                <el-col :span="18" class="bg-color bg-blue">
                  <span class="grid-count">{{ orderCustomer.visitUser }}</span> 访客人数
                </el-col>
                <el-col :span="10" class="blue-trapezoid bg-trapezoid">
                  <span>访客</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content">
                <el-col :span="4" class="bg-color bg-green">
                  <span class="grid-count">{{ orderCustomer.orderUser }}</span>下单人数                   
                </el-col>
                <el-col :span="4" class="bg-color bg-green">
                  <span class="grid-count">{{ orderCustomer.orderPrice }}</span>下单金额     
                </el-col>
                <el-col :span="8" class="bg-color bg-green" style="height: 100px;" />
                <el-col :span="10" class="green-trapezoid bg-trapezoid">
                  <span>下单</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content">
                <el-col :span="4" class="bg-color bg-gray-dark">
                  <span class="grid-count">{{ orderCustomer.payOrderUser }}</span>
                  支付人数
                </el-col>
                <el-col :span="4" class="bg-color bg-gray-dark">
                  <span class="grid-count">{{ orderCustomer.payOrderPrice }}</span>支付金额                  
                </el-col>
                <el-col :span="4" class="bg-color bg-gray-dark">
                  <span class="grid-count">{{ orderCustomer.userRate }}</span>客单价                  
                </el-col>
                <el-col :span="2" class="bg-color bg-gray-dark" style="height: 100px;" />
                <el-col :span="10" class="gray-dark-trapezoid bg-trapezoid">
                  <span>支付</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-row class="panel-title" style="background: #fff;padding: 20px 20px 50px;">
          <el-col :span="8">
            <span>用户统计</span>
          </el-col>
          <el-col :span="16" class="align-right">
            <el-radio-group v-model="time2" size="mini" @change="getCustomerRatioData(time2)">
              <el-radio-button v-for="item in timeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
            <el-row class="pieChart-switch">
              <el-button :class="isAmount ? 'active' : ''" @click.native="chooseAmount">金额</el-button>
              <el-button
                :class="!isAmount ? 'active' : ''"
                @click.native="chooseCustomers"
              >客户数</el-button>
            </el-row>
          </el-col>
        </el-row>
        <div class="chart-wrapper">
          <pie-chart ref="pieChart" :amount="isAmount" :date="time2" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 商品支付排行 -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="margin-bottom:30px;"
      >
        <el-row class="panel-title" style="background: #fff;">
          <el-col :span="8">
            <span>商品支付排行</span>
          </el-col>
          <el-col :span="16" class="align-right">           
            <el-radio-group v-model="rankingTime1" size="mini" @change="getRankingData(rankingTime1)">
              <el-radio-button v-for="item in timeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <div class="grid-title-count">
          <el-row class="grid-title">
            <el-col :span="4">排名</el-col>
            <el-col :span="16">名称</el-col>
            <el-col :span="4">支付数</el-col>
          </el-row>
        </div>
        <div class="grid-list-content">
          <el-row v-for="(list, index) in commodityPaymentList" :key="index" class="grid-count">
            <el-col :span="4" class="grid-list">
              <span :class="'gray'+index" class="navy-blue">{{ index+1 }}</span>
            </el-col>
            <el-col class="grid-list" :span="16">
              <img :src="list.picSrc" alt>
              <span>{{ list.name }}</span>
            </el-col>
            <el-col class="grid-list" :span="4">{{ list.count }}</el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 访客 -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="margin-bottom:30px;"
      >
        <el-row class="panel-title" style="background: #fff;">
          <el-col :span="8">
            <span>商品访客排行</span>
          </el-col>
          <el-col :span="16" class="align-right">          
            <el-radio-group v-model="rankingTime2" size="mini" @change="getVisitorRankingData(rankingTime2)">
              <el-radio-button v-for="item in timeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <div class="grid-title-count">
          <el-row class="grid-title">
            <el-col :span="4">排名</el-col>
            <el-col :span="16">名称</el-col>
            <el-col :span="4">访问数</el-col>
          </el-row>
        </div>
        <div class="grid-list-content">
          <el-row v-for="(list, index) in visitorRankingList" :key="index" class="grid-count">
            <el-col :span="4" class="grid-list">
              <span :class="'gray'+index" class="navy-blue">{{ index+1 }}</span>
            </el-col>
            <el-col class="grid-list" :span="16">
              <img :src="list.image" alt>
              <span>{{ list.store_name }}</span>
            </el-col>
            <el-col class="grid-list" :span="4">{{ list.total }}</el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 加购 -->
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="margin-bottom:30px;"
      >
        <el-row class="panel-title" style="background: #fff;">
          <el-col :span="8">
            <span>商品加购排行</span>
          </el-col>
          <el-col :span="16" class="align-right">          
            <el-radio-group v-model="rankingTime3" size="mini" @change="getProductPlusData(rankingTime3)">
              <el-radio-button v-for="item in timeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <div class="grid-title-count">
          <el-row class="grid-title">
            <el-col :span="4">排名</el-col>
            <el-col :span="16">名称</el-col>
            <el-col :span="4">加购数</el-col>
          </el-row>
        </div>
        <div class="grid-list-content">
          <el-row v-for="(list, index) in productPlusList" :key="index" class="grid-count">
            <el-col :span="4" class="grid-list">
              <span :class="'gray'+index" class="navy-blue">{{ index+1 }}</span>
            </el-col>
            <el-col class="grid-list" :span="16">
              <img :src="list.image" alt>
              <span>{{ list.store_name }}</span>
            </el-col>
            <el-col class="grid-list" :span="4">{{ list.total }}</el-col>
          </el-row>
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
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import {
  customerApi,
  rankingApi,
  visitorRankingApi,
  ProductPlusApi
} from '@/api/dashboard'
import { getBaseInfo } from '@/api/user'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    payer: [100, 120, 98, 130, 150, 140, 180]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
    payer: [150, 90, 98, 130, 150, 140, 180]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
    payer: [150, 90, 98, 130, 150, 140, 180]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    payer: [150, 90, 98, 130, 150, 140, 180]
  },
  followers: {
    expectedData: [150, 90, 98, 130, 150, 140, 180],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    payer: [130, 140, 141, 142, 145, 150, 160]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      value1: '',
      value2: '',
      time1: 'lately30',
      time2: 'lately30',
      time3: 'lately30',
      rankingTime1: 'year',
      rankingTime2: 'year',
      rankingTime3: 'year',
      lineChartData: lineChartData.newVisitis,
      isAmount: true,
      timeList: [
        { value: 'lately7', label: '近7天' },
        { value: 'lately30', label: '近30天' },
        { value: 'month', label: '本月' },
        { value: 'year', label: '本年' }
      ],
      timeList1: [
        { value: 'lately7', label: '近7天' },
        { value: 'lately30', label: '近30天' },
        { value: 'month', label: '本月' },
        { value: 'year', label: '本年' }
      ],
      commodityPaymentList: [],
      visitorRankingList: [],
      productPlusList: [],
      orderCustomer: {}
    }
  },
  activated() {
    this.getUserMessage()
  },
  mounted() {
    this.getUserMessage()
    this.getCurrentData() // 支付订单
    this.getCustomerData(this.time1) // 成交客户
    this.getCustomerRatioData() // 成交客户占比
    this.getRankingData(this.rankingTime1) // 商品支付排行
    this.getVisitorRankingData(this.rankingTime2) // 商品访客排行
    this.getProductPlusData(this.rankingTime3) // 商品加购排行
  },
  methods: {
    chooseAmount() {
      if (this.isAmount) {
        return
      } else {
        this.isAmount = true
      }
    },
    chooseCustomers() {
      if (this.isAmount) {
        this.isAmount = false
      } else {
        return
      }
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getCurrentData() {
      this.$refs.lineChart.getOrderData({ date: this.time3 })
    },
    getCustomerData(date) {
      const params = { date: date }
      customerApi(params)
        .then(res => {
          if (res.status === 200) {
            this.orderCustomer = res.data
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    getCustomerRatioData() {
      this.$refs.pieChart.getTurnoverRatio()
    },
    getRankingData(date) {
      const params = { date: date }
      rankingApi(params)
        .then(res => {
          if (res.status === 200) {
            this.commodityPaymentList.length = 0
            res.data.map(item => {
              this.commodityPaymentList.push({
                name: item.cart_info.product.store_name,
                picSrc: item.cart_info.product.image,
                count: item.total
              })
            })
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 商品访客排行
    getVisitorRankingData(date) {
      const params = { date: date }
      visitorRankingApi(params)
        .then(res => {
          if (res.status === 200) {
            this.visitorRankingList = res.data
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 商品加购排行
    getProductPlusData(date) {
      const params = { date: date }
      ProductPlusApi(params)
        .then(res => {
          if (res.status === 200) {
            this.productPlusList = res.data
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    getUserMessage() {
      getBaseInfo().then(res => {
        const resData = res.data
        console.log(resData)
        if (
          !resData.mer_avatar ||
          !resData.mer_banner ||
          !resData.mer_info ||
          !resData.mer_address
        ) {
          this.$alert(
            '您好，请前往左侧菜单【设置】-【商户信息】完善商户基础信息',
            {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({
                  name: 'ModifyStoreInfo'
                })
              }
            }
          )
        }
        let marginRemain = window.localStorage.getItem('marginRemain');
        this.$store.commit("user/SET_MARGIN_STATUS", resData.margin_remind_status);
        if(resData.margin_remind_status){
          if(marginRemain == 0){
            this.$confirm('店铺保证金不足，为保证您正常使用，请尽快去补缴！', '提示', {
            confirmButtonText: '去补缴',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.localStorage.setItem('marginRemain', 1);
            this.$router.push({
              name: 'ModifyStoreInfo'
            })
          }).catch(() => {
             window.localStorage.setItem('marginRemain', 1);     
          });
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$textColor: #8d8d8d;
.align-right {
  text-align: right;
}
/deep/.el-radio-button__inner{
  padding: 0;
  width: 62px;
  line-height: 25px;
}
.dashboard-editor-container {
  padding: 0 10px 10px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    margin-bottom: 20px;
    height: 330px;
  }
}
.panel-title {
  padding: 20px;
  color: #000;
  overflow: hidden;
  font-weight: bold;
  line-height: 36px;
}
.grid-content {
  margin-bottom: 2px;
  height: 100px;
  line-height: 30px;
  color: #2b2d2c;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  .bg-color {
    padding: 20px;
  }
  .grid-count {
    display: block;
    font-weight: bold;
    font-size: 16px;
  }
}
.grid-floating {
  position: absolute;
  right: 0;
  font-size: 13px;
  font-weight: bold;
  z-index: 5;
  line-height: 35px;
  &:before {
    content: "";
    display: inline-block;
    width: 85px;
    height: 1px;
    background: #d8d8d8;
    position: absolute;
    top: 15px;
    left: -90px;
  }
  .grid-conversion-number {
    display: inline-block;
    width: 45px;
  }
  &:nth-child(1) {
    top: 85px;
  }
  &:nth-child(2) {
    top: 188px;
    &:before {
      width: 150px;
      left: -155px;
    }
  }
}
/deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  color: #fff;
  background-color: #6394F9;
  border-color: #6394F9;
  -webkit-box-shadow: -1px 0 0 0 #6394F9;
  box-shadow: -1px 0 0 0 #6394F9; 
}
.grid-title-count {
  background: #fff;
}
.select-icon-date {
  opacity: 0.6;
}
.grid-title {
  font-weight: bold;
  padding: 20px 0;
  margin: 0 20px;
  font-size: 14px;
  border-bottom: 1px solid #EBEEF5;
}
.bg-blue {
  background-color: #eff4fe;
}
.bg-green {
  background-color: #effbf6;
}
.bg-gray-dark {
  background-color: #eff1f4;
}
.grid-list-content {
  background: #fff;
  padding: 15px;
  height: 388px;
  overflow: hidden;
  .el-row {
    margin-bottom: 6px;
    border-bottom: 1px solid #EBEEF5;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-list {
    padding: 13px;
    &:first-child {
      span {
        display: block;
        width: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        border-radius: 100%;
        -webkit-border-radius: 100%;
        font-size: 12px;
        &.navy-blue {
          background: #D0D0D0;
        }
        &.gray0 {
          background: #EBCA80;
        }
        &.gray1 {
          background: #ABB4C7;
        }
        &.gray2 {
          background: #CCB3A0;
        }
      }
    }
    &:nth-child(2) {
      position: relative;
      padding-left: 50px;
      span {
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      img {
        width: 30px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 7px;
        border-radius: 2px;
      }
    }
    &:last-child {
      font-size: 13px;
      color: #000000;
    }
  }
}
.pieChart-switch {
  font-size: 0;
  position: absolute;
  top: 80px; 
}
.pieChart-switch .el-button {
  display: inline-block;
  line-height: 22px;
  color: #000000;
  text-align: center;
  font-size: 14px;
  padding: 0;
  border: none;
  position: relative;
  margin: 0 15px;
  &:hover,&:focus{
    background: transparent;
  }
  &.active{
    color: #6394F9;
    &::after{
      content: "";
      display: inline-block;
      width: 100%;
      height: 2px;
      background: #6394F9;
      position: absolute;
      left: 0;
      bottom: -2px;
    }
  }

}
/deep/ .align-right .el-input__inner {
  border: none;
  padding: 0 5px;
  width: 92px;
  color: $textColor;
}
.bg-trapezoid {
  position: absolute;
  left: 40%;
  top: 0;
  span {
    position: absolute;
    width: 50px;
    text-align: center;
  }
}
.blue-trapezoid {
  border-top: 100px solid #6395fa;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  span {
    color: #fff;
    top: -62px;
    left: 50%;
    margin-left: -30px;
  }
  &:hover {
    border-top-color: rgba(109, 156, 252, 1);
  }
}
.green-trapezoid {
  border-top: 400px solid #63daab;
  border-left: 75px solid transparent;
  border-right: 75px solid transparent;
  top: -265px;
  span {
    color: #fff;
    top: -103px;
    left: 50%;
    margin-left: -30px;
  }
  &:hover {
    border-top-color: rgba(109, 227, 180, 1);
  }
}
.gray-dark-trapezoid {
  border-top: 670px solid #657798;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  top: -510px;
  span {
    color: #fff;
    top: -125px;
    left: 50%;
    margin-left: -24px;
  }
  &:hover {
    border-top-color: rgba(123, 143, 179, 1);
  }
}
@media (max-width: 1800px) {
  .blue-trapezoid {
    border-top: 150px solid #6395fa;
    border-left-width: 70px;
    border-right-width: 70px;
    span {
      top: -109px;
    }
  }
  .green-trapezoid {
    border-top-width: 316px;
    border-left-width: 80px;
    border-right-width: 80px;
    top: -180px;
    span {
      top: -94px;
    }
  }
  .gray-dark-trapezoid {
    border-top-width: 545px;
    border-left-width: 90px;
    border-right-width: 90px;
    top: -443px;
    span {
      top: -72px;
    }
  }
}
@media (max-width: 1600px) {
  .blue-trapezoid {
    border-top: 150px solid #6395fa;
    border-left: 45px solid transparent;
    border-right: 45px solid transparent;
  }
  .green-trapezoid {
    border-top-width: 440px;
    border-left-width: 58px;
    border-right-width: 58px;
    top: -233px;
    span {
      top: -170px;
    }
  }
  .gray-dark-trapezoid {
    border-top-width: 455px;
    border-left-width: 60px;
    border-right-width: 60px;
    top: -332px;
    span {
      top: -85px;
    }
  }
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
