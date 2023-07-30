<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="896px"
      :before-close="handleClose"
    >
      <upload-index v-if="visible" :is-more="isMore" @getImage="getImage"/>
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
import UploadIndex from '@/components/uploadPicture/index.vue'
export default {
  name: 'UploadFroms',
  components: { UploadIndex },
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
    },
    getImage(img) {
      this.callback(img)
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
