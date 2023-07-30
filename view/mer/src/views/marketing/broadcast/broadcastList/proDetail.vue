<template>
  <div class="divBox">
    <el-dialog title="商品信息" :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
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
              :src=" FormData.cover_img"
            />
          </div>
          <div class="list sp">
            <label class="name">审核结果：</label>
            <span class="info">{{ FormData.status | liveReviewStatusFilter }}</span>
          </div>
          <div class="list sp100">
            <label class="name">备注：</label>
            <span class="info">
              <el-input v-model="FormData.mark" type="textarea" :rows="1" />
            </span>
          </div>
          <div class="list sp100 mt20">
            <el-button
              type="button"
              class="el-button el-button--primary el-button--medium"
              style="width: 100%;"
              :disabled="FormData.mark == ''"
              @click="handleRemarks()"
            >提交</el-button>
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
import { broadcastProDetailApi, broadcastProRemarksApi } from "@/api/marketing";

export default {
  name: "BroadcastProDetail",
  data() {
    return {
      dialogVisible: false,
      option: {
        form: {
          labelWidth: "150px",
        },
      },
      FormData: {
        product: { stock: "", image: "" },
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
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.loading = false;
        });
    },
    handleRemarks(id) {
      broadcastProRemarksApi(
        this.FormData.broadcast_goods_id,
        this.FormData.mark
      )
        .then((res) => {
          this.loading = false;
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.$emit("getList");
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.loading = false;
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
</style>
