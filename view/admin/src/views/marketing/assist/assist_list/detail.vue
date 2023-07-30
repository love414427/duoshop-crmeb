<template>
  <el-dialog title="查看详情" center :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
    <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
      <el-table-column prop="uid" label="ID" min-width="80" />
      <el-table-column prop="nickname" label="用户名称" min-width="120" />
      <el-table-column label="用户头像" min-width="100">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 36px; height: 36px"
              :src="scope.row.avatar_img"
              :preview-src-list="[scope.row.avatar_img]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="参与时间" min-width="200" />
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
import { assistDetailApi } from '@/api/product'


export default {
  name: 'Info',
  props: {
    isShow: {
      type: Boolean,
      default: true
    },

  },
  data() {
    return {
      id: '',
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

    }
  },
  computed: {

  },
  methods: {
    // 列表
    getList(id) {
      this.id = id;
      this.listLoading = true;
      assistDetailApi(this.id,this.tableFrom)
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
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__title{
  font-weight: bold;
}
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
.labeltop{
  height: 280px;
  overflow-y: auto;
}
.title{
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfe6ec;
}
</style>
