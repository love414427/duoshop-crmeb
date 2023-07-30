<template>
  <div class="divBox">
    <el-card class="box-card">
        <div class="container">
          <el-form size="small" inline label-width="100px">
            <el-form-item label="文件类型：">
                <el-select
                  v-model="tableFrom.type"
                  clearable
                  filterable
                  placeholder="请选择"
                  class="selWidth"
                  @change="exportFileList(1)"
                >
                  <el-option
                    v-for="item in fileTypeList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
            </el-form-item>
          </el-form>
        </div>
      <div v-loading="loading">
        <el-table
          v-loading="loading"
          :data="tableData.data"
          style="width: 100%"
          size="mini"
          class="table"
          highlight-current-row
        >
          <el-table-column label="文件名" prop="name" min-width="200" />
          <el-table-column label="操作者名称" prop="admin_id" min-width="80" />
          <el-table-column label="生成时间" prop="create_time" min-width="180" />
          <el-table-column label="类型" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.status | exportOrderStatusFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 1 "
                type="text"
                size="small"
                class="mr10"
                @click="downLoad(scope.row.path)"
              >下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-sizes="[10, 20, 30]"
            :page-size="tableFrom.limit"
            :current-page="tableFrom.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="pageChange"
          />
        </div>
      </div>
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
import { exportFileLstApi, excelFileType } from "@/api/order";
export default {
  name: "FileList",
  data() {
    return {
      fileVisible: false,
      loading: false,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 10,
        type: ''
      },
      fileTypeList: [
        {name: '订单',value: 'order'},
        {name: '流水记录',value: 'financial'},
        {name: '发货单',value: 'delivery'},
        {name: '导入记录',value: 'importDelivery'},
        {name: '账单信息',value: 'exportFinancial'},
        {name: '用户搜索',value: 'searchLog'}
      ]
    };
  },
  mounted() {
   this.exportFileList('')
   this.getFileType();
  },
  methods: {
    exportFileList(num) {
      this.loading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      exportFileLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.listLoading = false;
        });
    },
    //获取文件类型
    getFileType(){
        excelFileType().then((res) => {
          this.fileTypeList = res.data
        })
    
    },
    // 下载
    downLoad(path) {
      window.open(path)
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.exportFileList('');
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page;
      this.exportFileList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.exportFileList('');
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 16px;
  color: #17233d;
  font-weight: 500;
  font-size: 14px;
}
.description {
  &-term {
    display: table-cell;
    padding-bottom: 10px;
    line-height: 20px;
    width: 50%;
    font-size: 12px;
  }
}
</style>
