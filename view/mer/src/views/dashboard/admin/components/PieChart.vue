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
require("echarts/theme/shine"); // echarts theme
import resize from "./mixins/resize";
import { customerRatioApi } from "@/api/dashboard";

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
      default: "300px"
    },
    amount: {
      type: Boolean,
      default: true
    },
    date: {
      type: String,
      default: "lately7"
    }
  },
  data() {
    return {
      chart: null,
      newData: "",
      oldData: "",
      Comment: []
    };
  },
  watch: {
    amount: {
      deep: true,
      handler(val) {
        this.amount = val;
        this.getTurnoverRatio();
      }
    },
    date: {
      deep: true,
      handler(val) {
        this.date = val;
        // this.getTurnoverRatio();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {});
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getTurnoverRatio() {
      let that = this;
      customerRatioApi({ date: this.date }).then(res => {
        if(res.status === 200) {
          that.orderCustomer = res.data;
          that.newData = that.amount ? res.data.newTotalPrice : res.data.newUser;
          that.oldData = that.amount ? res.data.oldTotalPrice : res.data.oldUser;
          that.chart = echarts.init(that.$el, "shine");
          that.chart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              bottom: 0,
              left: "5%",
              data: ["新用户", "老用户"]
            },
            series: [{
              name: that.amount ? "金额" : "客户数",
              type: "pie",
              // roseType: "radius",
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "20",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [{
                value: that.newData,
                name: "新用户",
                itemStyle: { color: "#6394F9" }},
              { value: that.oldData,
                name: "老用户",
                itemStyle: { color: "#EFAE23" }}
              ],
              animationEasing: "cubicInOut",
              animationDuration: 2600
            }]
          });
        }
      })
        .catch(res => {
          that.$message.error(res.message);
        });
    }
  }
};
</script>
