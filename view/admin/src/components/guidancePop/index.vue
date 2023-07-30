<template>
  <div v-if="info" style="color: #999999;" class="s-guidance">
    {{ info }}
    <el-popover
      placement="top-start"
      v-if="image"
      trigger="hover">
      <div class="s-guidance-pop">
        <div v-if="url">
          <div>更多详情请查看：</div>
          <a :href="url">{{ url }}</a>
        </div>
        <img :src="image" alt="示例">
      </div>
      <span slot="reference" style="color: #2d8cf0;">查看示例</span>
    </el-popover>
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
import pathToRegexp from 'path-to-regexp'
import {roterPre} from '@/settings'

export default {
  name: 'guidancePop',
  props: ['url', 'image', 'info'],
  data() {
    return {};
  }
}
</script>

<style>
.s-guidance-pop img {
  height: 270px;
  vertical-align: middle;
}

.s-guidance-pop a, .s-guidance span {
  color: #2d8cf0;
  cursor: pointer;
}
</style>

