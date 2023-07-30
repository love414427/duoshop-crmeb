<template>
  <div class="divBox">
    <div class="header clearfix">
      <div class="filter-container">
        <div class="demo-input-suffix acea-row">
          <el-form inline size="small">
            <el-form-item label="商品分类：">
              <el-cascader
                v-model="tableFrom.cate_id"
                class="selWidth"
                :options="merCateList"
                :props="props"
                clearable
                @change="getList(1)"
              />
            </el-form-item>
            <el-form-item label="商品搜索：">
              <el-input v-model="tableFrom.store_name" placeholder="请输入商品名称，关键字，产品编号" class="selWidth">
                <el-button slot="append" icon="el-icon-search" @keyup.enter.native="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData.data"
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        width="55"
      >
        <template slot-scope="scope">
          <el-radio v-model="templateRadio" :label="scope.row.product_id" @change.native="getTemplateRow(scope.row)">&nbsp</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="product_id"
        label="ID"
        min-width="50"
      />
      <el-table-column label="商品图" min-width="80">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 36px; height: 36px"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="store_name"
        label="商品名称"
        min-width="200"
      />
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
import { goodLstApi, categoryListApi } from '@/api/product'
import { roterPre } from '@/settings'
export default {
  name: 'GoodList',
  data() {

    return {
      props: {
        emitPath: false
      },
      templateRadio: 0,
      merCateList: [],
      merSelect: [],
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        cate_id: ''
      },
      multipleSelection: {},
      checked: []
    }
  },
  mounted() {
    this.getList('')
    this.getCategorySelect()
    form_create_helper.onOk(this.unloadHandler)
  },
  methods: {
    unloadHandler() {
      if (this.multipleSelection) {
        if (this.$route.query.field) {
          /* eslint-disable */
          if(this.multipleSelection.src && this.multipleSelection.id){
              form_create_helper.set(this.$route.query.field, this.multipleSelection)
          }
        }
      } else {
        this.$message.warning('请先选择商品')
      }
    },
    getTemplateRow(row){
      this.multipleSelection = {src:row.image,id: row.product_id}
    },
    // 商户分类；
    getCategorySelect() {
      categoryListApi().then(res => {
        this.merCateList = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      goodLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.checked = window.form_create_helper.get(this.$route.query.field)||[]
        this.tableData.data.forEach(item => {
          this.checked.forEach(element => {
            if (Number(item.product_id) === Number(element.id)) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              })
            }
          })
        })
        this.listLoading = false
      }).catch(res => {
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
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 219px !important;
  }
  .seachTiele{
    line-height: 35px;
  }
  .fr{
    float: right;
  }
</style>
