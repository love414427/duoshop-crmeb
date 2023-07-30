<template>
  <el-card class="box-card" style="height: 346px">
    <div class="acea-row row-between-wrapper mb20">
      <span class="header-title">商户销售额占比</span>
      <span class="header-time">
        <el-dropdown>
          <span class="el-dropdown-link curP">
            <i class="el-icon-date mr5" />{{ name }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,i) in fromList.fromTxt" :key="i" @click.native="setTime(item.val, item.text)">{{ item.text }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <echarts-from :option-data="optionData" :styles="style" v-if="merchantRate.length"/>
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
import { merchantRateApi } from '@/api/home'
import echartsFrom from '@/components/echarts/index'
import { fromList } from '@/libs/constants.js'
export default {
  name: 'MerchantRate',
  components: { echartsFrom },
  data() {
    return {
      style: { height: '281px' },
      merchantRate: [],
      optionData: {},
      fromList: fromList,
      name: '最近30天'
    }
  },
  mounted() {
    this.getList('lately30')
  },
  methods: {
    setTime(val, text) {
      this.name = text
      this.getList(val)
    },
    getList(val) {
      merchantRateApi({ date: val }).then(res => {
        if(res.status === 200){
            this.merchantRate = res.data.list
            const legend = []
            const series = []
            const colors = ['#5AD8A6', '#5B8FF9', '#F6BD16', '#5D7092', '#C6C6C6']
            this.merchantRate.map((item, i) => {
            legend.push(item.category_name)
            series.push({ value: item.pay_price, name: item.category_name, itemStyle: { normal: { color: colors[i] }}})
            })
            this.optionData = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legend
            },
            series: [
                {
                name: '访问来源',
                type: 'pie',
                radius: '65%',
                center: ['60%', '65%'],
                data: series,
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
            }
            }
      }).catch(res => {
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .curP{
    cursor: pointer;
  }
  .header{
    &-title{
      font-size: 16px;
      color: #000000;
      font-weight:500;
    }
    &-time{
      font-size:12px;
      color: #000000;
      opacity: 0.45;
    }
  }
</style>
