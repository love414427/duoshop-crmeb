<template>
  <el-card class="box-card" style="box-shadow: none;">
    <div class="acea-row row-between-wrapper mb20">
      <span class="header-title">用户数据</span>
      <span class="header-time">
        <el-radio-group v-model="name" size="mini" @change="setTime(name)">
          <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val" >{{item.text}}</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <echarts-from
      :option-data="optionData"
      :styles="style"
      height="100%"
      width="100%"
      v-if="!listLoading"
    />
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
import { userDataApi } from "@/api/home";
import echartsFrom from "@/components/echarts/index";
export default {
  name: "UserData",
  components: { echartsFrom },
  data() {
    return {
      style: { height: "400px" },
      optionData: {},
      name: "lately30",
      listLoading: false,
      fromList: {
        title: "选择时间",
        custom: true,
        fromTxt: [
          { text: "近7天", val: "lately7" },
          { text: "近30天", val: "lately30" },
          { text: "本月", val: "month" }
        ]
      }
    };
  },
  mounted() {
    this.getList("lately30");
  },
  methods: {
    setTime(val, text) {
      this.getList(val);
    },
    getList(val) {
      userDataApi({ date: val })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            const userData = res.data;
            const visitList = [];
            const newUserList = [];
            const userList = [];
            const timer = [];
            userData.map(item => {
              newUserList.push(item.new);
              userList.push(item.total);
              visitList.push(item.visit);
              timer.push(item.day);
            });
            const seriesData = [
              {
                name: "新用户",
                type: "line",
                stack: "用户量",
                itemStyle: {
                  normal: {
                    color: "#5AD8A6",
                    lineStyle: {
                      color: "#5AD8A6"
                    }
                  }
                },
                data: newUserList,
                smooth: false
              },
              {
                name: "访问用户",
                type: "line",
                stack: "用户量",
                itemStyle: {
                  normal: {
                    color: "#5D7092",
                    lineStyle: {
                      color: "#5D7092"
                    }
                  }
                },
                data: visitList,
                smooth: false
              },
              {
                name: "累计用户",
                type: "line",
                stack: "用户量",
                yAxisIndex: 1,
                itemStyle: {
                  normal: {
                    color: "#5B8FF9",
                    lineStyle: {
                      color: "#5B8FF9"
                    }
                  }
                },
                data: userList,
                smooth: false
              }
            ];
            this.optionData = {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "#6a7985"
                  }
                }
              },
              legend: {
                x: "1px",
                y: "10px",
                data: ["新用户", "访问用户", "累计用户"]
              },
              grid: {
                left: "0%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },

              axisLine: {
                show: false
              },
              xAxis: [
                {
                  type: "category",
                  boundaryGap: true,
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: {
                      color: "#D7DDE4"
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  axisLabel: {
                    interval: 0,
                    rotate: 40,
                    textStyle: {
                      color: "#7F8B9C"
                    }
                  },
                  data: Array.from(new Set(timer))
                }
              ],
              yAxis: [
                {
                  name: "新/访",
                  type: "value",
                  inverse: false,
                  boundaryGap: ["0", "0.1"],
                  // splitLine: {
                  //   show: false
                  // }
                },
                {
                  name: "累计用户",
                  type: "value",
                  // minInterval: 1,
                  max: this.arrayMax(userList) + 40,
                  min: this.arrayMin(userList) - 10,
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: seriesData
            };
            this.listLoading = false;
          }
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
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
        if (arrs[i] > max) {
          max = arrs[i];
        }
      }
      return max;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  color: #fff;
  background-color: #6394F9;
  border-color: #6394F9;
  -webkit-box-shadow: -1px 0 0 0 #6394F9;
  box-shadow: -1px 0 0 0 #6394F9; 
}
.header-title{
  font-size: 16px;
  font-weight: bold;
}
</style>
