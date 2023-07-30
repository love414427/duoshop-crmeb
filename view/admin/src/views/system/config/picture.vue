<template>
  <div class="divBox">
    <el-card class="box-card">
      <upload-index></upload-index>
    </el-card>
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
  name: 'Picture',
  components: { UploadIndex },
  data() {
    return {
    }
  },
  methods: {
  }

}
</script>

<style scoped>

</style>
