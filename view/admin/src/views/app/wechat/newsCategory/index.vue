<template>
  <div class="divBox">
    <el-card class="box-card">
      <news-category :is-show="isShow" />
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
import newsCategory from '@/components/newsCategory/index'
export default {
  name: 'NewsCategoryIndex',
  components: {
    newsCategory
  },
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>

</style>
