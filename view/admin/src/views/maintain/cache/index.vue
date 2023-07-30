<template>
  <div class="divBox">
    <div class="box-card">
      <div class="clearfix card_container">
        <el-button size="small" type="primary" @click="clearCache(1)">清除全部缓存</el-button>
        <el-button size="small" type="primary" @click="clearCache(2)">清理商户缓存</el-button>
        <el-button size="small" type="primary" @click="clearCache(3)">清理配置缓存</el-button>
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
import { clearCacheApi } from '@/api/maintain'
export default {
  name: 'DataCache',
  data() {
    return {
      
    }
  },
  mounted() {
   
  },
  methods: {
  // 清除缓存
    clearCache(type) {
      return new Promise((resolve, reject) => {
        this.$confirm(`确定清除吗？清除后无法恢复请谨慎操作！`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          clearCacheApi({type: type})
          .then(({ message }) => {
            this.$message.success(message);
            
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.card_container{
margin-top: 150px;
text-align: center;
}
</style>
