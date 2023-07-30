<template>
<el-row :gutter="20" class="mb15">
    <el-col v-if="users" :xl="16" :lg="14" :md="12" :sm="24" :xs="24">
        <el-card class="box-card">
            <div class="acea-row row-between-wrapper mb20">
                <span class="header-title">成交用户</span>
                <div class="header-time">                  
                    <el-radio-group v-model="name" size="mini" @change="setTime(name)">
                        <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="user">
                <el-row style="background: #fff; height: 320px; padding: 0 20px; position: relative;">
                    <span class="grid-floating" style="position: absolute;">
                    访客-下单转化率：
                    <span class="grid-conversion-number">
                        {{ Math.floor(users.orderRate*100) }} %</span>
                    </span>
                    <span class="grid-floating">
                    下单-支付转化率：
                    <span class="grid-conversion-number">
                        {{ Math.floor(users.payOrderRate*100) }} %
                    </span>
                    </span>
                    <el-col :span="24">
                    <div class="grid-content">
                        <el-col :span="18" class="bg-color bg-blue">
                        <span class="grid-count">{{ users.visitUser }}</span>访客人数
                        </el-col>
                        <el-col :span="10" class="blue-trapezoid bg-trapezoid">
                        <span>访客</span>
                        </el-col>
                    </div>
                    </el-col>
                    <el-col :span="24">
                    <div class="grid-content">
                        <el-col :span="4" class="bg-color bg-green">
                        <span class="grid-count">{{ users.orderUser }}</span>下单人数
                        </el-col>
                        <el-col :span="4" class="bg-color bg-green">
                        <span class="grid-count">{{ users.payOrderPrice }}</span>下单金额
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
                        <span class="grid-count">{{ users.payOrderUser }}</span>支付人数
                        </el-col>
                        <el-col :span="4" class="bg-color bg-gray-dark">
                        <span class="grid-count">{{ users.payOrderPrice }}</span>支付金额
                        </el-col>
                        <el-col :span="4" class="bg-color bg-gray-dark">
                        <span class="grid-count">{{ users.userRate }}</span>客单价  
                        </el-col>
                        <el-col :span="2" class="bg-color bg-gray-dark" style="height: 100px;" />
                        <el-col :span="10" class="gray-dark-trapezoid bg-trapezoid">
                        <span>支付</span>
                        </el-col>
                    </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-col>
    <el-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
        <el-card class="box-card" style="height: 408px;">
            <div class="acea-row row-between-wrapper mb20" style="padding-bottom: 60px;">
                <span class="header-title">成交用户占比</span>
                <span class="header-time">
                    <el-radio-group v-model="nameRate" size="mini" @change="setTimeRate(nameRate)">
                        <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </span>
            </div>
            <el-row class="echart-btn">
              <el-button :class="rateType == 'price' ? 'active' : ''" @click.native="changeLabel('price')">金额</el-button>
              <el-button
                :class="rateType != 'price' ? 'active' : ''"
                @click.native="changeLabel('user')"
              >客户数</el-button>
            </el-row>
            <echarts-from ref="visitChart" height="100%" width="100%" :option-data="optionData" :styles="style" v-if="usersRate" />
        </el-card>
    </el-col>
</el-row>
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
import {
    merchantUserApi,
    userRateApi
} from '@/api/home'
import echartsFrom from '@/components/echarts/index'
export default {
    name: 'User',
    components: {
        echartsFrom
    },
    data() {
        return {
            fullWidth: document.body.clientWidth,
            style: {
                height: '200px'
            },
            name: 'lately30',
            users: null,
            nameRate: 'lately30',
            nameVal: 'lately30',
            usersRate: {},
            rateType: 'price',
            optionData: {},
            fromList: {
                title: '选择时间',
                custom: true,
                fromTxt: [
                    // {
                    //     text: '今天',
                    //     val: 'today'
                    // },
                    // {
                    //     text: '昨天',
                    //     val: 'yesterday'
                    // },
                    {
                        text: '近一周',
                        val: 'lately7'
                    },
                    {
                        text: '近30天',
                        val: 'lately30'
                    },
                    {
                        text: '近一个月',
                        val: 'month'
                    },
                    {
                        text: '近一年',
                        val: 'year'
                    }
                ]
            }
        }
    },
    mounted() {
        this.getList('lately30')
        this.getRate('lately30')
    },
    created() {
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize(event) {
            this.fullWidth = document.body.clientWidth
        },
        setTime(val) {
            this.getList(val)
        },
        getList(val) {
            merchantUserApi({
                date: val
            }).then(res => {
                this.users = res.data
            }).catch(res => {
                this.$message.error(res.message)
            })
        },
        setTimeRate(val) {
            this.getRate(val)
        },
        changeLabel(val){
            this.rateType = val
            this.getRate(this.nameVal)
        },
        changeRate() {
            this.getRate(this.nameVal)
        },
        getRate(val) {
            userRateApi({
                date: val
            }).then(res => {
                if(res.status === 200){
                    let seriesData = []
                    this.usersRate = res.data
                    this.rateType === 'price' ? seriesData = [{
                        value: this.usersRate.newTotalPrice,
                        name: '新用户',
                        itemStyle: {
                            normal: {
                                color: '#6394F9'
                            }
                        }
                    }, {
                        value: this.usersRate.oldTotalPrice,
                        name: '老用户',
                        itemStyle: {
                            normal: {
                                color: '#EFAE23'
                            }
                        }
                    }] : seriesData = [{
                        value: this.usersRate.newUser,
                        name: '新用户',
                        itemStyle: {
                            normal: {
                                color: '#6394F9'
                            }
                        }
                    }, {
                        value: this.usersRate.oldUser,
                        name: '老用户',
                        itemStyle: {
                            normal: {
                                color: '#EFAE23'
                            }
                        }
                    }]
                    this.optionData = {
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            bottom: 0,
                            left: '2%',
                            data: ['新用户', '老用户']
                        },
                        series: [{
                            name: this.rateType === 'price' ? '金额' : '客户数',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            data: seriesData,
                            label: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    }
                    }
            }).catch(res => {
                this.$message.error(res.message)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card__body {
    position: relative;
}
/deep/.el-radio-button__inner{
  padding: 0;
  width: 62px;
  line-height: 25px;
}
.box-card {
    box-shadow: none;
}
.echart-btn {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 80px;
    left: 0;
    .el-button {
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
            bottom: -4px;
        }
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
.sp1 {
    margin-left: 10px;
    overflow: auto;
    margin-top: -9px;
}
.sp2 {
    margin-top: 66px;
    margin-left: 10px;
    overflow: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.orderUser {
    position: relative;
    top: -6px;
    display: flex;
    white-space: normal;
}
.payOrderUser {
    position: relative;
    top: -16px;
}
.user {
    &-visitUser {
        width: 55%;
        height: 84px;
        background: rgba(99, 149, 250, 0.1);
        padding: 18px 0 18px 17px;
        box-sizing: border-box;

        &-ti {
            width: 285px;
            height: 84px;
            background: #5B8FF9;
            -webkit-transform: perspective(5em) rotateX(-20deg);
            transform: perspective(5em) rotateX(-20deg);
            margin-left: -104px;
            margin-top: 8px;
            text-align: center;
            line-height: 70px;
            color: #fff;
            font-size: 14px;
        }
    }

    &-orderUser {
        width: 55%;
        height: 84px;
        background: rgba(99, 218, 171, 0.1);
        padding: 18px 0 18px 17px;
        box-sizing: border-box;

        &-ti {
            width: 180px;
            height: 90px;
            background: #5AD8A6;
            -webkit-transform: perspective(7em) rotateX(-20deg);
            transform: perspective(7em) rotateX(-30deg);
            margin-left: -52px;
            margin-top: 6px;
            text-align: center;
            line-height: 71px;
            color: #fff;
            font-size: 14px;
        }

        &-change {
            height: 83px;
            width: 128px;
            border-bottom: 1px solid #D8D8D8;
            border-top: 1px solid #D8D8D8;
            margin-left: -19px;
        }

        &-changeduan {
            height: 83px;
            /*width: 5%;*/
            border-bottom: 1px solid #D8D8D8;
            border-top: 1px solid #D8D8D8;
            margin-left: -19px;
        }
    }

    &-payOrderUser {
        width: 55%;
        height: 84px;
        background: rgba(101, 119, 152, 0.1);
        padding: 18px 0 18px 17px;
        box-sizing: border-box;

        &-ti {
            width: 109px;
            height: 80px;
            background: #5D7092;
            -webkit-transform: perspective(7em) rotateX(-20deg);
            transform: perspective(3em) rotateX(-15deg);
            margin-left: -18px;
            margin-top: 12px;
            text-align: center;
            line-height: 61px;
            color: #fff;
            font-size: 14px;
        }
    }
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
.bg-blue {
  background-color: #eff4fe;
}
.bg-green {
  background-color: #effbf6;
}
.bg-gray-dark {
  background-color: #eff1f4;
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
.header-title{
    font-weight: bold;
    font-size: 16px;
    color: #000000;
}
</style>
