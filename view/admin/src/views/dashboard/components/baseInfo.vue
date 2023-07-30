<template>
<div class="box-card statistics">
    <el-row :gutter="18" v-if="statisticsData" class="panel-group">
        <el-col :span="6" class="content">
            <div class="card-panel">
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        <span class="card-order">新增用户</span>
                        <span class="card-date">今日</span>
                    </div>
                    <count-to
                    :start-val="0"
                    :end-val="statisticsData.today.userNum"
                    :duration="3000"
                    class="card-panel-num"
                    />
                    <div class="card-panel-compared"> 
                        周环比：
                        <i :class="Number(statisticsData.lastWeekRate.userNum)>=0?'up':'down'">
                            {{ statisticsData.lastWeekRate.userNum ? (statisticsData.lastWeekRate.userNum*100*1000/1000).toFixed(2) : 0.00 }}%</i>
                        <i :class="Number(statisticsData.lastWeekRate.userNum)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" />
                    </div>  
                    <div class="card-panel-date">
                        <span class="date_text">昨日数据</span>
                        <span class="date_num">{{ statisticsData.yesterday.userNum }}</span>              
                    </div>
                </div>
            </div>      
        </el-col>
        <el-col :span="6" class="content">
            <div class="card-panel">
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        <span class="card-order">浏览量</span>
                        <span class="card-date">今日</span>
                    </div>
                    <count-to
                    :start-val="0"
                    :end-val="statisticsData.today.visitNum"
                    :duration="3000"
                    class="card-panel-num"
                    />
                    <div class="card-panel-compared"> 
                    周环比：
                        <i :class="Number(statisticsData.lastWeekRate.visitNum)>=0?'up':'down'">{{ statisticsData.lastWeekRate.visitNum ? (statisticsData.lastWeekRate.visitNum*100*1000/1000).toFixed(2) : 0.00 }}%</i>
                        <i :class="Number(statisticsData.lastWeekRate.visitNum)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" />
                     </div> 
                    <div class="card-panel-date">
                        <span class="date_text">昨日数据</span>
                        <span class="date_num">{{ statisticsData.yesterday.visitNum }}</span>              
                    </div> 
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="content">
            <div class="card-panel">
                <div class="card-panel-description">
                    <div class="card-panel-text">
                    <span class="card-order">访客数</span>
                    <span class="card-date">今日</span>
                    </div>
                    <count-to
                    :start-val="0"
                    :end-val="statisticsData.today.visitUserNum"
                    :duration="3000"
                    class="card-panel-num"
                    />
                    <div class="card-panel-compared"> 
                        周环比：
                        <i :class="Number(statisticsData.lastWeekRate.visitUserNum)>=0?'up':'down'">
                            {{ statisticsData.lastWeekRate.visitUserNum ? (statisticsData.lastWeekRate.visitUserNum*100*1000/1000).toFixed(2) : 0.00 }}%</i>
                        <i :class="Number(statisticsData.lastWeekRate.visitUserNum)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" />
                    </div>
                    <div class="card-panel-date">
                        <span class="date_text">昨日数据</span>
                        <span class="date_num">{{ statisticsData.yesterday.visitUserNum }}</span>              
                    </div>  
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="content" style="border:none">
            <div class="card-panel">
                <div class="card-panel-description">
                    <div class="card-panel-text">
                    <span class="card-order">店铺数</span>
                    <span class="card-date">今日</span>
                    </div>
                    <count-to
                    :start-val="0"
                    :end-val="statisticsData.today.storeNum"
                    :duration="3000"
                    class="card-panel-num"
                    />
                    <div class="card-panel-compared"> 
                        周环比：
                        <i :class="Number(statisticsData.lastWeekRate.storeNum)>=0?'up':'down'">
                        {{ statisticsData.lastWeekRate.storeNum ? (statisticsData.lastWeekRate.storeNum*100*1000/1000).toFixed(2) : 0.00 }}%</i>
                        <i :class="Number(statisticsData.lastWeekRate.storeNum)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" />
                    </div>
                    <div class="card-panel-date">
                        <span class="date_text">昨日数据</span>
                        <span class="date_num">{{ statisticsData.yesterday.storeNum }}</span>              
                     </div>  
                </div>    
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="18" class="panel-group-count">
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/product/examine' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-shangpinguanli" style="color: #5CC7C1;"></span>
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
        <router-link :to=" { path:`${roterPre}` + '/promoter/user' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-fenxiaoguanli" style="color: #B27FEB;"></span>
            <span class="panel-text">分销管理</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/setting/sms/sms_config/index' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-duanxinpeizhi" style="color: #F0AA0B;"></span>
            <span class="panel-text">一号通</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/cms/article' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-wenzhangguanli" style="color: #5CC7C1;"></span>
            <span class="panel-text">文章管理</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/marketing/coupon/list' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-youhuiquan" style="color: #EF9B6F;"></span>
            <span class="panel-text">优惠券</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="3" class="card-panel-item">
        <router-link :to=" { path:`${roterPre}` + '/systemForm/Basics/system_tabs' } ">
          <div class="card-panel-count">
            <span class="iconfont icon-xitongshezhi" style="color: #F0AA0B;"></span>
            <span class="panel-text">系统设置</span>
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
import { roterPre } from '@/settings'
import {
    statisticsApi
} from '@/api/home'
export default {
    name: 'BaseInfo',
    components: {
     CountTo
    },
    data() {
        return {
            statisticsData: null,
            roterPre: roterPre,
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getdate() {
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var strDate = date.getDate()

            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
            }
            var currentdate = year + ' 年 ' + month + ' 月 ' + strDate + ' 日 '
            return currentdate
        },
        getList() {
            this.listLoading = true
            statisticsApi(this.tableFrom).then(res => {
                if(res.status === 200){
                    this.statisticsData = res.data
                }
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.statistics {
  min-width: 700px;
  margin-top: 10px;
}

.up,
.el-icon-caret-top {
  color: #F5222D;
  font-size: 12px;
  opacity: 1 !important;
}
.down,
.el-icon-caret-bottom {
  color: #39C15B;
  font-size: 12px;
  opacity: 1;
}
.header {
  &-title {
    font-size: 16px;
    color: #000000;
    font-weight: 500;
  }
  &-time {
    font-size: 12px;
    color: #8C8C8C;
  }
}
.card-panel {
  cursor: pointer;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  color: #8C8C8C;
  background: #fff;
  position: relative;
}
.card-panel-description {
  padding: 0 20px;
  margin-top: 19px;
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
.card-panel-compared {
    margin: 15px 0;
}
.card-panel-date{
    border-top: 1px solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
  }
.content {
    &-is {
        opacity: 1%;
    }

    &-title {
        font-size: 14px;
        color: #000000;
        margin-bottom: 5px;
    }

    &-time {
        font-size: 12px;
        color: #8C8C8C;
        margin-bottom: 5px;
    }

    &-number {
        font-size: 30px;
    }
    .content-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
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
</style>
