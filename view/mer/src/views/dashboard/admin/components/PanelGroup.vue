<template>
  <div class="panel-container">
    <el-row :gutter="18" class="panel-group">    
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              <span class="card-order">支付金额</span>
              <span class="card-date">今日</span>
            </div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.payPrice"
              :duration="3000"
              class="card-panel-num"
            />
            <div class="card-panel-compared"> 
              周环比：
              <span :class="{'isdecline':mainData.lastWeekRate.payPrice<0}">
                {{ mainData.lastWeekRate.payPrice ? (mainData.lastWeekRate.payPrice*100).toFixed(2) : 0.00 }}%
              </span>
            </div>  
          </div>
          <div class="card-panel-date">
            <span class="date_text">昨日数据</span>
            <span class="date_num">{{ mainData.yesterday.payPrice }}</span>              
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              <span class="card-order">支付人数</span>
              <span class="card-date">今日</span>
            </div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.payUser"
              :duration="3200"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              周环比：
              <span :class="{'isdecline':mainData.lastWeekRate.payUser<0}">
                {{ mainData.lastWeekRate.payUser ? (mainData.lastWeekRate.payUser*100).toFixed(2) : 0.00 }}%
              </span>
            </div>
          </div>
          <div class="card-panel-date">
            <span class="date_text">昨日数据</span>
            <span class="date_num">{{ mainData.yesterday.payUser }}</span>           
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">             
              <span class="card-order">访客</span>
              <span class="card-date">今日</span>
            </div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.visitNum"
              :duration="3600"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              周环比：
              <span :class="{'isdecline':mainData.lastWeekRate.visitNum<0}">
                {{ mainData.lastWeekRate.visitNum ? mainData.lastWeekRate.visitNum*100 : 0.00 }}%
              </span>
            </div>           
          </div>
          <div class="card-panel-date">
            <span class="date_text">昨日数据</span>
            <span class="date_num">{{ mainData.yesterday.visitNum }}</span>             
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('followers')">
          <div class="card-panel-description">
            <div class="card-panel-text">             
              <span class="card-order">关注店铺</span>
              <span class="card-date">今日</span>
            </div>
            <count-to
              :start-val="0"
              :end-val="mainData.today.likeStore"
              :duration="3600"
              class="card-panel-num"
            />
            <div class="card-panel-compared">
              周环比：
              <span :class="{'isdecline':mainData.lastWeekRate.likeStore<0}">
                {{ mainData.lastWeekRate.likeStore ? (mainData.lastWeekRate.likeStore*100).toFixed(2) : 0.00 }}%</span>
            </div>            
          </div>
          <div class="card-panel-date">
            <span class="date_text">昨日数据</span>
            <span class="date_num">{{ mainData.yesterday.likeStore }}</span>            
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="18" class="panel-group-count">
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/product/list' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-shangpinguanli" style="color: #57D1A0;"></span>
            <span class="panel-text">商品管理</span>
          </div>
        </router-link>           
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/user/list' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-yonghuguanli" style="color: #69C0FD;"></span>
            <span class="panel-text">用户管理</span>
          </div>
        </router-link>  
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/order/list' } "> 
          <div class="card-panel-count">
            <span class="iconfont icon-dingdanguanli" style="color: #EF9B6F;"></span>
            <span class="panel-text">订单管理</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/accounts/capitalFlow' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-caiwuguanli" style="color: #B27FEB;"></span>
            <span class="panel-text">财务管理</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/setting/sms/sms_config/index' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-yihaotong" style="color: #EFB32C;"></span>
            <span class="panel-text">一号通</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/marketing/coupon/list' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-youhuiquan" style="color: #5CC7C1;"></span>
            <span class="panel-text">优惠券</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/systemForm/modifyStoreInfo' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-xitongshezhi" style="color: #EFB32C;"></span>
            <span class="panel-text">系统设置</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/accounts/transManagement' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-daochuwenjian" style="color: #EF9B6F;"></span>
            <span class="panel-text">转账记录</span>
          </div>
        </router-link>
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
import CountTo from "vue-count-to";
import { mainDataApi } from "@/api/dashboard";
import { roterPre } from '@/settings'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: "",
      value2: "",
      decline: 1,
      mainData: {
        yesterday: {},
        today: {},
        lastWeekRate: {}
      },
      today: {},
      lastWeekRate: {},
      yesterday: {},
      roterPre: roterPre,
    };
  },
  components: {
    CountTo
  },
  mounted() {
    this.getMainData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    getMainData() {
      mainDataApi()
        .then(res => {
          if (res.status === 200) {
            this.mainData = res.data;
          }
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$textColor: #8d8d8d;
.panel-container {
  // background: #fff;
  .panel-title {
    padding: 20px 20px 0 20px;
  }
}
.el-input__inner {
  border: none !important;
}
.align-right {
  text-align: right;
}
.panel-group {
  .card-panel {
    cursor: pointer;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    color: #8C8C8C;
    background: #fff;
    position: relative;
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      padding: 0 20px;
      margin: 19px 0;
      .card-panel-text {
        line-height: 18px;     
        margin-bottom: 12px;
        font-weight: normal;
        align-items: center;
        justify-content: space-between;
        display: flex;
        .card-order{
          color: #303133;
          font-size: 16px;
        }
        .card-date{
          border: 1px solid #6394F9;
          border-radius: 3px;
          color: #6394F9;
          background: #F4F7FF;
          text-align: center;
          line-height: 20px;
          width: 38px;
        }
      }
      .card-panel-num {
        font-size: 30px;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .card-panel-compared {
    margin: 15px 0;
    span {
      color: red;
      margin-left: 5px;
      i {
        display: inline-block;
        border: 5px solid transparent;
        border-bottom: 5px solid red;
        position: relative;
        bottom: 1px;
        left: 5px;
      }
      &.isdecline {
        color: green;
        i {
          border-bottom: none;
          border-top: 5px solid green;
        }
      }
    }
  }
  .card-panel-date{
    border-top: 1px solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 20px;
  }
}
.panel-group-count{
  margin-top: 18px;
  .card-panel-item{
    float: left;
  }
  .card-panel-count{
    background-color: #ffffff;
    border-radius: 4px;
    // width: 90%;
    height: 104px;
    text-align: center;
    padding-top: 20px;
    span{
      display: block;
    }
    .iconfont{
      font-size: 27px;
    }
    .panel-text{
      font-size: 14px;
      color: #303133;
      margin-top: 15px;
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
@media only screen and (min-width: 768px) {
  .el-col-sm-4-8 {
    width: 20%;
  }
}

@media only screen and (min-width: 992px) {
  .el-col-md-4-8 {
    width: 20%;
  }
}

@media only screen and (min-width: 1200px) {
  .el-col-lg-4-8 {
    width: 20%;
  }
}

@media only screen and (min-width: 1920px) {
  .el-col-xl-4-8 {
    width: 20%;
  }
}
</style>
