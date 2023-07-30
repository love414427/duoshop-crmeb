<template>
  <div class="divBox">
    <el-dialog v-if="dialogVisible" title="商品信息" :visible.sync="dialogVisible" width="700px">
      <div v-loading="loading">
        <div class="box-container">
          <div class="list sp">
            <label class="name">商品名称：</label>
            <span class="info">{{ FormData.name }}</span>
          </div>

          <div class="list sp">
            <label class="name">直播价：</label>
            <span class="info">{{ FormData.price }}</span>
          </div>
              <div class="list sp">
            <label class="name">库存：</label>
            <span v-if="FormData.product" class="info">{{ FormData.product.stock }}</span>
          </div>
          <div class="list sp100 image">
            <label class="name">商品图：</label>
            <img
              v-if="FormData.product"
              style="max-width: 150px; height: 80px;"
              :src=" FormData.product.image"
            />
          </div>
          <div class="list sp">
            <label class="name">审核结果：</label>
            <span class="info">{{ FormData.status | liveReviewStatusFilter }}</span>
          </div>
          <div v-if="isEdit" class="list">
            <label class="name">排序：</label>
            <el-input
              v-model.number="FormData.sort"
              type="number"
              placeholder="请输入序号"
              class="selWidth"
              size="small"
              style="padding-right: 0;"
            />
            <el-button size="small" type="primary" style="width: 80px;" @click="handleSort">确定</el-button>
          </div>
          <div v-else class="list sp">
            <label class="name">排序：</label>
            <span class="info">{{ FormData.sort }}</span>
          </div>
        </div>
      </div>
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
  import { broadcastProDetailApi, broadcastProSortApi } from '@/api/marketing'

export default {
  name: "BroadcastProDetail",
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      option: {
        form: {
          labelWidth: "150px",
        },
      },
      FormData: {
        sort: 0
      },
      loading: false,
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      broadcastProDetailApi(id)
        .then((res) => {
          this.FormData = res.data;
          this.loading = false;
          console.log(this.FormData);
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.loading = false;
        });
    },
    // 排序
    handleSort() {
      broadcastProSortApi(this.FormData.broadcast_goods_id,{sort:this.FormData.sort})
        .then((res) => {
          console.log(this.FormData)
          this.dialogVisible=false
          this.$emit("getList");
          this.$message.success(res.message)
        })
        .catch((res) => {
          this.$message.error(res.message)

        });
    },
  },
};
</script>

<style scoped>
.box-container {
  overflow: hidden;
}
.box-container .list {
  float: left;
  line-height: 40px;
}
.box-container .sp {
  width: 50%;
}
.box-container .sp3 {
  width: 33.3333%;
}
.box-container .sp100 {
  width: 100%;
}
.box-container .list .name {
  display: inline-block;
  width: 150px;
  text-align: right;
  color: #606266;
}
.box-container .list .blue {
  color: #1890ff;
}
.box-container .list.image {
  margin-bottom: 40px;
}
.box-container .list.image img {
  position: relative;
  top: 40px;
}
.el-textarea {
  width: 400px;
}
/deep/ .el-input__inner{
  padding-right: 0;
}
</style>
