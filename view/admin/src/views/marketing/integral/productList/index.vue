<template>
  <div class="divBox">
    <el-card class="box-card">
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
          <el-form-item label="上架状态：" prop="status">
            <el-select
              v-model="tableFrom.is_used"
              placeholder="请选择"
              class="filter-item selWidth"
              clearable
              @change="getList(1)"
            >
              <el-option label="上架" :value="1" />
              <el-option label="下架" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品搜索：">
            <el-input
              v-model="tableFrom.keyword"
              placeholder="请输入商品名称/ID"
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
      <router-link :to="{ path: `${roterPre}` + '/marketing/integral/addProduct' }">
        <el-button size="small" type="primary">添加积分商品</el-button>
      </router-link>
      <el-button size="small" type="success" @click="quickAdd()">快速添加</el-button>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        class="mt20"
        size="small"
        highlight-current-row
      >
        <el-table-column prop="product_id" label="ID" min-width="50" />
        <el-table-column min-width="100" label="商品图片">
          <template slot-scope="scope">
            <el-image style="width: 36px; height: 36px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品标题" min-width="150" />
        <el-table-column prop="ot_price" label="兑换积分" min-width="100" />
        <el-table-column prop="price" label="兑换金额" min-width="100" />
        <el-table-column prop="stock" label="库存" min-width="80" />
        <el-table-column prop="sales" label="已兑换数量" min-width="100" />
        <el-table-column prop="create_time" min-width="200" label="创建时间" />
        <el-table-column prop="sort" min-width="120" label="排序" />
        <el-table-column label="状态" min-width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_used"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{ path: `${roterPre}` + '/marketing/integral/orderList?id=' + scope.row.product_id }">
              <el-button type="text" size="small" class="mr10">兑换记录</el-button>
            </router-link>
            <router-link :to="{ path: `${roterPre}` + '/marketing/integral/addProduct/' + scope.row.product_id }">
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
             <router-link :to="{ path: `${roterPre}` + '/marketing/integral/addProduct/' + scope.row.product_id + '?type=2' }">
              <el-button type="text" size="small" class="mr10">复制</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.product_id, scope.$index)">删除</el-button>
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
    <!--快速添加商品-->
    <goods-list ref="goodsList" @getProduct="getProduct"></goods-list>
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
import { integralProList, integralProDeleteApi, integralProductStatusApi } from '@/api/marketing';
import { roterPre } from '@/settings';
import timeOptions from '@/utils/timeOptions';
import goodsList from './goodsList'
export default {
  name: 'integralProduct',
  components: {goodsList},
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
        is_used: '',
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
    quickAdd(){
      this.$refs.goodsList.dialogVisible = true;
    },
    getProduct(row){
      this.$router.push({ path: this.roterPre + `/marketing/integral/addProduct/${row.id}?type=1` });
    },
    onchangeTime(e) {
     this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.tableFrom.page = 1;
      this.getList()
    },
    reset(formName) {
      this.timeVal = [];
      this.tableFrom = {
        page: 1,
        limit: 20,
        keyword: '',
        is_used: '',
        date: '',
      };
      this.getList('');
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSureDelete(`删除积分商品后将无法恢复，请谨慎操作!`).then(() => {
        integralProDeleteApi(id)
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
      integralProList(this.tableFrom)
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
      integralProductStatusApi(row.product_id, row.is_used)
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
