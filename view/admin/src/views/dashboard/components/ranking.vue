<template>
  <el-card class="box-card" style="height: 346px">
    <div class="acea-row row-between-wrapper mb20">
      <span class="header-title" v-text="merTitle" />
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
    <div v-for="(item, index) in merchantData" :key="index" class="acea-row row-middle mb20">
      <span class="circle mr10" :class=" index < 3 ? 'circlelan' : 'circlehui'" v-text="index + 1" />
      <span class="name mr10" v-text="merTitle === '商品销量排行' ? item.cart_info.product.store_name : item.mer_name" />
      <div class="progress mr5">
        <el-progress :percentage="Number(item.rate*100)" />
      </div>
      <span v-text="item.total" />
    </div>
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
import { fromList } from '@/libs/constants.js'
export default {
  name: 'Ranking',
  props: {
    merchantData: {
      type: Array,
      default: () => []
    },
    merTitle: {
      type: String,
      default: ''
    },
    xAxisData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fromList: fromList,
      name: '最近30天'
    }
  },
  methods: {
    setTime(val, text) {
      this.name = text
      this.$emit('getList', val)
    }
  }
}
</script>

<style scoped lang="scss">
  .curP{
    cursor: pointer;
  }
  .acea-row{
    /deep/ .el-progress-bar{
      padding-right: 0 !important;
    }
    /deep/ .el-progress__text{
      opacity: 0;
      display: none !important;
    }
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
  .circle{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
    line-height: 18px;
    text-align: center;
  }
  .circlelan{
    background: #314659;
    color: #fff;
  }
  .circlehui{
    background: #D9D9D9;
    color: #fff;
  }
  .progress{
    width: 50%;
  }
  .name{
    font-size: 14px;
    width: 25%;
    text-overflow :ellipsis;
    white-space :nowrap;
    overflow : hidden;
  }
</style>
