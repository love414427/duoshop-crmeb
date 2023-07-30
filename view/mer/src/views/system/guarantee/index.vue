<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form @submit.native.prevent inline>
            <el-form-item label="服务名称：" class="mr10">
              <el-input
                v-model="tableFrom.keyword"
                placeholder="请输入服务名称搜索"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="add">添加服务说明模板</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" :row-class-name="tableRowClassName" @rowclick.stop="closeEdit">
        <el-table-column prop="guarantee_template_id" label="ID" min-width="150" />
        <el-table-column prop="template_name" label="服务名称" min-width="200" />
        <el-table-column prop="guarantee_info" label="服务条款" min-width="200">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.template_value" v-if="scope.row.template_value" :key="index">
              <span v-if="item.value && item.value.guarantee_name">{{ index+1 }}. {{ item.value.guarantee_name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" align="center" label="排序" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.index === tabClickIndex">
              <el-input v-model.number="scope.row['sort']" type="number" maxlength="300" size="mini" autofocus @blur="inputBlur(scope)" />
            </span>
            <span v-else @dblclick.stop="tabClick(scope.row)">{{ scope.row['sort'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" min-width="90">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="不显示"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="创建时间" min-width="150" prop="create_time" />
        <el-table-column label="操作" min-width="80" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row.guarantee_template_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.guarantee_template_id, scope.$index)">删除</el-button>
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
    <!--添加服务说明模板-->
    <guarantee-service ref="serviceGuarantee" @get-list="getList" />

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
import { guaranteeLstApi, guaranteeDeleteApi,
  guaranteeSortApi, guaranteeStatusApi } from '@/api/product'
import guaranteeService from '@/components/serviceGuarantee/index'
export default {
  name: 'ProductGuarantee',
  components: {
    guaranteeService
  },
  data() {
    return {
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        page: 1,
        limit: 20,
        date: '',
        keyword: ''
      },
      timeVal: [],
      props: {},
      tabClickIndex: ''
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    // 添加明细原因 row 当前行 column 当前列
    tabClick(row) {
      this.tabClickIndex = row.index
    },
    // 失去焦点初始化
    inputBlur(scope) {
      if (!scope.row.sort || scope.row.sort < 0)scope.row.sort = 0
      guaranteeSortApi(scope.row.guarantee_template_id, { sort: scope.row.sort })
        .then((res) => {
          this.closeEdit()
        })
        .catch((res) => {
        })
    },
    closeEdit() {
      this.tabClickIndex = null
    },
    handleCloseItems(tag) {
      this.termsService.splice(this.termsService.indexOf(tag), 1)
      this.formValidate.template_value = []
      this.termsService.map(item => {
        this.formValidate.template_value.push(item.guarantee_id)
      })
    },
    add() {
      this.$refs.serviceGuarantee.add()
    },
    // 修改显示状态
    onchangeIsShow(row) {
      guaranteeStatusApi(row.guarantee_template_id, { status: row.status })
        .then(({ message }) => {
          this.$message.success(message)
          this.getList('')
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
    // 编辑
    handleEdit(id) {
      this.$refs.serviceGuarantee.handleEdit(id)
      this.$refs.serviceGuarantee.loading = false
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      guaranteeLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch((res) => {
          this.listLoading = false
          this.$message.error(res.message)
        })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        guaranteeDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message)
            this.getList('')
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
