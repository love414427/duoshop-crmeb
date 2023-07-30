<template>
<el-card class="box-card" style="box-shadow: none;"> 
    <el-row v-loading="listLoading">
        <el-col v-if="statisticsData" v-bind="grid">
            <div>
                <div class="title mb15">当日订单金额</div>
                <div class="price">￥<i>{{ statisticsData.todayPrice }}</i></div>
            </div>
            <echarts-from v-if="statisticsData" key="1" ref="visitChart" height="100%" width="100%" :option-data="optionData" :styles="style" />
        </el-col>
        <el-col v-if="orderData" v-bind="grid" class="bl">
            <div class="title mb15 pl25">数据统计</div>
            <div class="pl25">
                <div class="toDay">
                    <span class="toDay-title spBlock mb10">当日订单数</span>
                    <span class="toDay-number spBlock mb10">{{ orderData.orderNum }}</span>
                    <span class="toDay-time spBlock">日同比：<i class="content-is" :class="Number(orderData.orderRate)>=0?'up':'down'">{{ Math.floor(orderData.orderRate*100) }}%</i><i :class="Number(orderData.orderRate)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" /></span>
                    <echarts-from v-if="orderData" key="2" ref="visitChart" height="100%" width="100%" :option-data="optionDataOrder" :styles="styleToday" />
                    <span class="toDay-title spBlock mb10">当月订单数</span>
                    <span class="toDay-number spBlock mb10">{{ orderData.monthOrderNum }}</span>
                    <span class="toDay-time spBlock">月同比：<i class="content-is" :class="Number(orderData.monthRate)>=0?'up':'down'">{{ Math.floor(orderData.monthRate*100) }}%</i><i :class="Number(orderData.monthRate)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" /></span>
                </div>
                <div class="toDay" style="border: none;">
                    <span class="toDay-title spBlock mb10">当日支付人数</span>
                    <span class="toDay-number spBlock mb10">{{ orderUserData.orderNum }}</span>
                    <span class="toDay-time spBlock">日同比：<i class="content-is" :class="Number(orderUserData.orderRate)>=0?'up':'down'">{{ Math.floor(orderUserData.orderRate*100) }}%</i><i :class="Number(orderData.orderRate)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" /></span>
                    <echarts-from v-if="orderUserData" key="3" ref="visitChart" height="100%" width="100%" :option-data="optionOrderUser" :styles="styleToday" />
                    <span class="toDay-title spBlock mb10">当月支付人数</span>
                    <span class="toDay-number spBlock mb10">{{ orderUserData.monthOrderNum }}</span>
                    <span class="toDay-time spBlock">月同比：<i class="content-is" :class="Number(orderUserData.monthRate)>=0?'up':'down'">{{ Math.floor(orderUserData.monthRate*100) }}%</i><i :class="Number(orderUserData.monthRate)>=0?'el-icon-caret-top':'el-icon-caret-bottom'" /></span>
                </div>
            </div>
        </el-col>
    </el-row>
</el-card>
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
    statisticsOrderApi,
    statisticsOrderNumApi,
    statisticsOrderUserApi
} from '@/api/home'
import echartsFrom from '@/components/echarts/index'
import echarts from 'echarts'
export default {
    name: 'ToDay',
    components: {
        echartsFrom
    },
    data() {
        return {
            style: {
                height: '200px'
            },
            styleToday: {
                height: '130px'
            },
            legendData: ['今天', '昨天'],
            seriesData: [],
            timer: [],
            grid: {
                xl: 12,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            statisticsData: {},
            orderData: {},
            orderUserData: {},
            optionData: {},
            listLoading: false,
            optionDataOrder: {},
            optionOrderUser: {}
        }
    },
    beforeDestroy() {
        if (this.visitChart) {
            this.visitChart.dispose()
            this.visitChart = null
        }
    },
    mounted() {
        this.getList()
        this.getOrder()
        this.getOrderUser()
    },
    methods: {
        getList() {
            this.listLoading = true
            statisticsOrderApi().then(res => {
              if(res.status === 200){
                this.statisticsData = res.data
                const dataList = this.statisticsData.order.filter(item => {
                  return (item.yesterday !== 0 || item.today !== 0)
                })
                dataList.unshift({
                  time: '00:00',
                  today: 0,
                  yesterday: 0
                })
                const seriesData = [{
                  name: '今天',
                  type: 'line',
                  stack: '订单额',
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                          offset: 0,
                          color: '#fff'
                        },
                          {
                            offset: 0.5,
                            color: '#fff'
                          },
                          {
                            offset: 1,
                            color: '#fff'
                          }
                        ]
                      )
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#5B8FF9',
                      lineStyle: {
                        color: '#5B8FF9'
                      }
                    }
                  },
                  data: dataList.map(item => {
                    return Number(item.today)
                  }),
                  smooth: true
                },
                  {
                    name: '昨天',
                    type: 'line',
                    stack: '订单额',
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [{
                            offset: 0,
                            color: '#fff'
                          },
                            {
                              offset: 0.5,
                              color: '#fff'
                            },
                            {
                              offset: 1,
                              color: '#fff'
                            }
                          ]
                        )
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#5D7092',
                        lineStyle: {
                          color: '#5D7092'
                        }
                      }
                    },
                    data: dataList.map(item => {
                      return Number(item.yesterday)
                    })
                  }
                ]
                this.optionData = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    x: '1px',
                    y: '10px',
                    data: this.legendData
                  },
                  grid: {
                    left: '0%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: [{
                    boundaryGap: false,
                    data: dataList.map(item => {
                      return item.time
                    }),
                    axisLine: {
                      show: false
                    },
                    show: false
                  }],
                  yAxis: {
                    show: false
                  },
                  series: seriesData
                }
                this.listLoading = false
              }
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        },
        getOrder() {
            statisticsOrderNumApi().then(res => {
                if(res.status === 200){
                  this.orderData = res.data
                  const dataList = this.orderData.today.filter(item => {
                    return item.total !== 0
                  })
                  dataList.unshift({
                    time: '00:00',
                    total: 0
                  })
                  const seriesData = [{
                    name: '今天',
                    type: 'line',
                    stack: '订单额',
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [{
                            offset: 0,
                            color: '#5B8FF9'
                          },
                            {
                              offset: 0.5,
                              color: '#fff'
                            },
                            {
                              offset: 1,
                              color: '#fff'
                            }
                          ]
                        )
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#5B8FF9',
                        lineStyle: {
                          color: '#5B8FF9'
                        }
                      }
                    },
                    data: dataList.map(item => {
                      return item.total
                    }),
                    smooth: true
                  }]
                  this.optionDataOrder = {
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'cross',
                        label: {
                          backgroundColor: '#6a7985'
                        }
                      }
                    },
                    legend: {
                      x: '1px',
                      y: '10px',
                      data: ['今天']
                    },
                    grid: {
                      left: '0%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    axisLine: {
                      show: false
                    },
                    xAxis: [{
                      type: 'category',
                      boundaryGap: false,
                      data: dataList.map(item => {
                        return item.time
                      }),
                      axisLine: {
                        show: false
                      },
                      show: false
                    }],
                    yAxis: {
                      show: false
                    },
                    series: seriesData
                  }
                }
            }).catch(res => {
                this.$message.error(res.message)
            })
        },
        getOrderUser() {
            statisticsOrderUserApi().then(res => {
                if(res.status === 200){
                    this.orderUserData = res.data
                    const dataList = this.orderUserData.today.filter(item => {
                        return item.total !== 0
                    })
                    dataList.unshift({
                        time: '00:00',
                        total: 0
                    })
                    const seriesData = [{
                        name: '今天',
                        type: 'line',
                        stack: '人数',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                            offset: 0,
                                            color: '#5B8FF9'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#fff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#fff'
                                        }
                                    ]
                                )
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#5B8FF9',
                                lineStyle: {
                                    color: '#5B8FF9'
                                }
                            }
                        },
                        data: dataList.map(item => {
                            return item.total
                        }),
                        smooth: true
                    }]
                    this.optionOrderUser = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            x: '1px',
                            y: '10px',
                            data: ['今天']
                        },
                        grid: {
                            left: '0%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        axisLine: {
                            show: false
                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: dataList.map(item => {
                                return item.time
                            }),
                            axisLine: {
                                show: false
                            },
                            show: false
                        }],
                        yAxis: {
                            show: false
                        },
                        series: seriesData
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
.up,
.el-icon-caret-top,
.content-is {
    color: #F5222D;
    font-size: 12px;
    opacity: 1!important;

    &.down {
        color: #39C15B;
    }
}

.down,
.el-icon-caret-bottom .content-is {

    font-size: 12px;
    opacity: 1 !important;
}

.el-icon-caret-bottom {
    color: #39C15B;
}

.bl {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.toDay {
    width: 49%;
    display: inline-block;

    &-title {
        font-size: 14px;
    }

    &-number {
        font-size: 20px;
    }

    &-time {
        font-size: 12px;
        color: #8C8C8C;
        margin-bottom: 5px;
    }
}

.title {
    font-size: 16px;
    color: #000000;
    font-weight: 600;
}

.price {
    i {
        font-style: normal;
        font-size: 21px;
        color: #000;
    }
}
</style>
