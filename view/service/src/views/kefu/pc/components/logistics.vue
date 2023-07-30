<template>
  <div>
    <div class="logistics acea-row row-top">
      <div class="logistics_img"><img src="@/assets/images/expressi.jpg"></div>
      <div class="logistics_cent">
        <span>物流公司：{{ logisticsName ? orderDetail.delivery_type : orderDetail.delivery_name }}</span>
        <span>物流单号：{{ orderDetail.delivery_id }}</span>
      </div>
    </div>
    <div class="acea-row row-column-around trees-coadd">
      <div class="scollhide">
        <el-timeline>
          <el-timeline-item v-for="(item,i) in result" :key="i">
            <p class="time" v-text="item.time" />
            <p class="content" v-text="item.status" />
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
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
export default {
  name: 'Logistics',
  props: {
    orderDetail: {
      type: Object,
      default: null
    },
    result: {
      type: Array,
      default: () => []
    },
    logisticsName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss" scoped>
  .title{
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 14px;
  }
  .description{
    &-term {
      display: table-cell;
      padding-bottom: 10px;
      line-height: 20px;
      width: 50%;
      font-size: 12px;
    }
  }
  .logistics{
    align-items: center;
    padding: 10px 0px;
    .logistics_img{
      width: 45px;
      height: 45px;
      margin-right: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .logistics_cent{
      span{
        display: block;
        font-size: 12px;
      }
    }
  }
  .trees-coadd{
    width: 100%;
    height: 400px;
    border-radius: 4px;
    overflow: hidden;
    .scollhide{
      width: 100%;
      height: 100%;
      overflow: auto;
      margin-left: 18px;
      padding: 10px 0 10px 0;
      box-sizing: border-box;
      .content{
        font-size: 12px;
      }
      .time{
        font-size: 12px;
        color: #2d8cf0;
      }
    }
  }
  .scollhide::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

</style>
