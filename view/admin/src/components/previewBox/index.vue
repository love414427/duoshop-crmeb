<template>
  <div class="goods_detail">
    <div class="goods_detail_wrapper" :class="(previewKey || goodsId) ? 'on' : ''">
      <iframe v-if="previewKey" :src="'/pages/admin/goods_details/index?preview_key='+previewKey+'&inner_frame=1'" style="width: 100%;height:600px;" frameborder="0" />
      <iframe v-if="goodsId" :src="'/pages/admin/goods_details/index?product_id='+goodsId+'&product_type='+productType+'&inner_frame=1'" style="width: 100%;height:600px;" frameborder="0" />
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
  name: 'PreviewBox',
  props: {
    goodsId: {
      type: String | Number,
      default: ''
    },
    productType: {
      type: String | Number,
      default: ''
    },
    previewKey: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    getProListUrl() {

    }
  }
}
</script>

<style scoped lang="scss">
.goods_detail {
  .goods_detail_wrapper {
    z-index: 200;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    background: #F0F2F5;
    &.on{
        position: fixed;
    }
  }
}
</style>
