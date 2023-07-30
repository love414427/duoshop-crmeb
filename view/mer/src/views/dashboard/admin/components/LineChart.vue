<template>
  <div :class="className" :style="{height:height,width:width}" />
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
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { orderApi } from "@/api/dashboard";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      default: "lately7"
    }
  },
  data() {
    return {
      chart: null,
      horizontalAxis: [],
      PaymentAmount: [],
      orderNumber: [],
      user: []
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    },
    date: {
      deep: true,
      handler(val) {
        this.date = val;
        const params = { date: this.date };
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
    },
    getOrderData(params) {
      const that = this;
      orderApi(params)
        .then(res => {
          if (res.status === 200) {
            that.horizontalAxis.splice(0, that.horizontalAxis.length);
            that.PaymentAmount.splice(0, that.PaymentAmount.length);
            that.orderNumber.splice(0, that.orderNumber.length);
            that.user.splice(0, that.user.length);
            res.data.map(item => {
              that.horizontalAxis.push(item.day);
              that.PaymentAmount.push(item.pay_price);
              that.orderNumber.push(item.total);
              that.user.push(item.user);
            });
            const horizontalAxis = that.horizontalAxis;
            const PaymentAmount = that.PaymentAmount;
            console.log(PaymentAmount);
            const orderNumber = that.orderNumber;
            const user = that.user;
            that.chart.setOption({
              xAxis: {
                data: horizontalAxis,
                axisLine: {
                  lineStyle: {
                    color: "#606266"
                  }
                },
                boundaryGap: false,
                axisTick: {
                  show: false
                },
                axisLabel: {
                  interval: 0
                }
              },
              grid: {
                left: 50,
                right: 50,
                bottom: 20,
                top: 70,
                containLabel: true
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross"
                },
                padding: [5, 10]
              },
              yAxis: [
                {
                  name: "订单/支付人数",
                  max: parseFloat(this.arrayMax(orderNumber)) + 5,
                  type: "value",
                  axisLabel: {
                    formatter: "{value}"
                  }
                },
                {
                  name: "支付金额",
                  type: "value",
                  max: parseFloat(this.arrayMax(PaymentAmount)) + 50,
                  min: this.arrayMin(PaymentAmount),
                  splitLine: {
                    show: false
                  }
                }
              ],
              legend: {
                data: ["订单数", "支付人数", "支付金额"],
                left: 10
              },
              series: [
                {
                  name: "订单数",
                  markPoint: {
                    data: [{ type: "max", name: "峰值" }]
                  },
                  itemStyle: {
                    normal: {
                      color: "#5b8ff9",
                      lineStyle: {
                        color: "#5b8ff9",
                        width: 2
                      }
                    }
                  },
                  smooth: false,
                  type: "line",
                  data: orderNumber,
                  animationDuration: 2800,
                  animationEasing: "cubicInOut"
                },

                {
                  name: "支付人数",
                  smooth: false,
                  type: "line",

                  markPoint: {
                    data: [{ type: "max", name: "峰值" }]
                  },
                  itemStyle: {
                    normal: {
                      color: "#5d7092",
                      lineStyle: {
                        color: "#5d7092",
                        width: 2
                      },
                      areaStyle: {
                        color: "rgba(255,255,255,.4)"
                      }
                    }
                  },
                  data: user,
                  animationDuration: 2800,
                  animationEasing: "quadraticOut"
                },
                {
                  name: "支付金额",
                  yAxisIndex: 1,
                  smooth: false,
                  type: "line",
                  markPoint: {
                    data: [{ type: "max", name: "峰值" }]
                  },
                  itemStyle: {
                    normal: {
                      color: "#5ad8a6",
                      lineStyle: {
                        color: "#5ad8a6",
                        width: 2
                      },
                      areaStyle: {
                        color: "rgba(255,255,255,.4)"
                      }
                    }
                  },
                  data: PaymentAmount,
                  animationDuration: 2800,
                  animationEasing: "quadraticOut"
                }
              ]
            });
          }
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    setOptions({ expectedData, actualData, payer } = {}) {},
    arrayMin(arrs) {
      var min = arrs[0];
      for (var i = 1, ilen = arrs.length; i < ilen; i += 1) {
        if (arrs[i] < min) {
          min = arrs[i];
        }
      }
      return min;
    },
    arrayMax(arrs) {
      var max = arrs[0];
      for (var i = 1, ilen = arrs.length; i < ilen; i++) {
        if (Number(arrs[i]) > max) {
          max = arrs[i];
        }
      }
      return max;
    }
  }
};
</script>
