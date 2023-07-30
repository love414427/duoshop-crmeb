<template>
  <div class="divBox">
    <el-card class="box-card mb20">
      <div class="container">
        <el-form ref="tableFrom" :model="tableFrom" size="small" label-width="90px" :inline="true">
          <el-form-item label="创建时间：" prop="date">
            <el-date-picker
              v-model="timeVal"
              value-format="yyyy/MM/dd"
              align="right"
              unlink-panels
              format="yyyy/MM/dd"
              size="small"
              type="daterange"
              placement="bottom-end"
              placeholder="自定义时间"
              class="selWidth"
              :picker-options="pickerOptions"
              @change="onchangeTime"
            />
          </el-form-item>
          <el-form-item label="活动状态：" prop="status">
            <el-select
              v-model="tableFrom.status"
              placeholder="请选择"
              class="filter-item selWidth"
              clearable
              @change="getList(1)"
            >
              <el-option label="未开始" :value="0" />
              <el-option label="进行中" :value="1" />
              <el-option label="已结束" :value="-1" />
            </el-select>
          </el-form-item>
          <el-form-item label="活动搜索：">
            <el-input
              v-model="tableFrom.keyword"
              placeholder="请输入活动名称/关键字"
              class="selWidth"
              clearable
              @keyup.enter.native="getList(1)"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="getList(1)">查询</el-button>
            <el-button size="small" @click="reset('tableFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <router-link :to="{ path: `${roterPre}` + '/marketing/border/add' }">
        <el-button size="small" type="primary">添加活动边框</el-button>
      </router-link>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        class="mt20"
        size="small"
        highlight-current-row
      >
        <el-table-column prop="activity_id" label="ID" min-width="50" />
        <el-table-column prop="activity_name" label="活动名称" min-width="120" />
        <el-table-column min-width="100" label="活动边框">
          <template slot-scope="scope">
            <el-image style="width: 36px; height: 36px" :src="scope.row.pic" />
          </template>
        </el-table-column>
        <el-table-column min-width="200" label="活动日期">
          <template slot-scope="{ row }">
            <div>
              {{ row.start_time }} - {{ row.end_time }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="活动状态" min-width="90">
          <template slot-scope="{ row }">
            <el-tag type="danger" v-if="row.status == 0">未开始</el-tag>
            <el-tag v-if="row.status == 1">进行中</el-tag>
            <el-tag type="info" v-if="row.status == -1">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否开启" min-width="90">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="120" />
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{ path: `${roterPre}` + '/marketing/border/add/' + scope.row.activity_id }">
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.activity_id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
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
import { borderList, borderDelete, borderStatusApi } from '@/api/marketing';
import { roterPre } from '@/settings';
import timeOptions from '@/utils/timeOptions';
export default {
  name: 'HoneyList',
  components: {},
  data() {
    return {
      props: { multiple: false, emitPath: false },
      Loading: false,
      dialogVisible: false,
      roterPre: roterPre,
      listLoading: true,
      receiveType: 0,
      id: '',
      categoryList: [],
      labelList: [],
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: '',
        status: '',
        date: '',
      },
      type: 0,
      isShow: false,
      pickerOptions: timeOptions,
      timeVal: [],
    };
  },
  mounted() {
    this.getList(1);
  },
  methods: {
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join('-') : '';
      this.getList(1);
    },
    reset(formName) {
      this.timeVal = [];
      this.tableFrom = {
        page: 1,
        limit: 20,
        keyword: '',
        status: '',
        date: '',
      };
      this.getList('');
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSureDelete(`删除活动后将无法恢复，请谨慎操作!`).then(() => {
        borderDelete(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList('');
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num || this.tableFrom.page;
      borderList(this.tableFrom)
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
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList('');
    },
    // 修改状态
    onchangeIsShow(row) {
      borderStatusApi(row.activity_id, row.is_show)
        .then(({ message }) => {
          this.$message.success(message);
          this.getList('');
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.modalbox {
  /deep/.el-dialog {
    min-width: 550px;
  }
}
.selWidth {
  width: 250px !important;
}
.container {
  min-width: 821px;
}
.selWidth {
  width: 100%;
}
.dialogBox {
  box-sizing: border-box;
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
  }
}
</style>
