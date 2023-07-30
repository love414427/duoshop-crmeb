<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="70%"
      :before-close="handleClose"
      class="dia"
    >
      <news-category v-if="visible" />
      <!--<span slot="footer" class="dialog-footer" />-->
    </el-dialog>
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
import newsCategory from '@/components/newsCategory/index.vue'
export default {
  name: 'NewsCategoryFrom',
  components: { newsCategory },
  data() {
    return {
      visible: false,
      callback: function() {}
    }
  },
  watch: {
    // show() {
    //   this.visible = this.show
    // }
  },
  methods: {
    handleClose() {
      this.visible = false
    }
    // getImage(img) {
    //   this.callback(img)
    //   this.visible = false
    // }
  }
}
</script>

<style scoped lang="scss">
  .dia{
    /deep/ .el-dialog {
     height: 100%;
    }
    /deep/ .el-dialog__body{
      height: 700px !important;
    }
  }
</style>
