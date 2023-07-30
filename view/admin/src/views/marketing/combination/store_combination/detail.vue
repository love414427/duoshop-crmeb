<template>
  <el-dialog
    title="查看详情"
    :visible.sync="dialogVisible"
    width="700px"
    v-if="dialogVisible"
  >
    <el-table
      v-loading="listLoading"
      :data="tableData.data"
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="uid" label="ID" min-width="80" />
      <el-table-column prop="nickname" label="用户名称" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.is_initiator == 1" class="initiator">团长</span
          ><span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户头像" min-width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.avatar" class="demo-image__preview">
            <el-image
              style="width: 36px; height: 36px"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]"
            />
          </div>
          <img v-else src="../../../../assets/images/f.png" alt="" style="width: 36px; height: 36px; vertical-align: top;">
        </template>
      </el-table-column>
      <el-table-column label="订单编号" min-width="100">
        <template slot-scope="scope">
          <span> {{ scope.row.orderInfo && scope.row.orderInfo.order_sn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" min-width="90">
        <template slot-scope="scope">
          <span> {{ scope.row.orderInfo && scope.row.orderInfo.pay_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" min-width="90">
        <template slot-scope="scope">
          <span
            v-if="scope.row.orderInfo && scope.row.orderInfo.status == -1"
            class="refuned"
          >
            已退款</span
          >
          <span v-else class="unrefuned">未退款</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block mb20">
      <el-pagination
        :page-sizes="[20, 40, 60, 80]"
        :page-size="tableFrom.limit"
        :current-page="tableFrom.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
  </el-dialog>
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
import { combinationDetailApi } from "@/api/marketing";

export default {
  name: "Info",
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: "",
      loading: false,
      dialogVisible: false,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
      },
    };
  },
  computed: {},
  methods: {
    // 列表
    getList(id) {
      this.id = id;
      this.listLoading = true;
      combinationDetailApi(this.id, this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList(this.id);
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList(this.id);
    },
  },
};
</script>

<style scoped lang="scss">
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
  color: #606266;
}
.box-container .list .blue {
  color: #1890ff;
}
.box-container .list.image {
  margin: 20px 0;
  position: relative;
}
.box-container .list.image img {
  position: absolute;
  top: -20px;
}
.labeltop {
  height: 280px;
  overflow-y: auto;
}
.title {
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
}
.initiator {
  color: red;
  border: 1px solid red;
  text-align: center;
  display: inline-block;
  margin-right: 4px;
  padding: 0 2px;
  height: 16px;
  line-height: 16px;
}
.refuned {
  color: #f56c6c;
}
.unrefuned {
  color: #409eff;
}
</style>
