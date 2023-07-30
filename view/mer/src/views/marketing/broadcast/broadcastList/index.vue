<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="状态：">
              <el-radio-group v-model="tableForm.status_tag" type="button" @change="getList">
                <el-radio-button label>全部</el-radio-button>
                <el-radio-button label="0">待审核</el-radio-button>
                <el-radio-button label="1">已审核</el-radio-button>
                <el-radio-button label="-1">审核失败</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="width100">
              <el-input
                v-model="tableForm.keyword"
                placeholder="请输入直播商品名称/ID"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList"
              >
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList" />
              </el-input>
            </el-form-item>
          </el-form>
          <router-link :to=" { path:`${roterPre}` + '/marketing/broadcast/addProduct' } ">
            <el-button size="small" type="primary">添加直播商品</el-button>
          </router-link>
          <el-button size="small" type="success" @click="batchAdd">批量添加直播商品</el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column label="序号" min-width="60">
          <template scope="scope">
            <span>{{ scope.$index+(tableForm.page - 1) * tableForm.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goods_id" label="商品ID" min-width="60" />
        <el-table-column prop="name" label="商品名称" min-width="150" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.cover_img" :preview-src-list="[scope.row.cover_img]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="原价" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.product ? scope.row.product.price : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="直播价" min-width="150" />
        <el-table-column label="库存" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.product && scope.row.product.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableForm.status_tag !== 1" key="3" label="审核状态" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.status | liveReviewStatusFilter }}</span>
            <span v-if="scope.row.status === -1" style="display: block; font-size: 12px;">原因 {{ scope.row.error_msg }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否上架" min-width="100">
          <template v-if="scope.row.status === 2" slot-scope="scope">
            <el-switch
              v-model="scope.row.is_mer_show"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="160" />
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="onProDetails(scope.row.broadcast_goods_id)"
            >详情</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleUpdate(scope.row.broadcast_goods_id)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.broadcast_goods_id, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableForm.limit"
          :current-page="tableForm.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--详情-->
    <details-from ref="ProDetail" @getList="getList" />
    <!--添加直播商品-->
    <batch-add ref="batchAdd" @get-list="getList" />
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
import { broadcastProListApi, changeProDisplayApi, updateBroadcastApi, broadcastProDeleteApi } from '@/api/marketing'
import { roterPre } from '@/settings'
import detailsFrom from './proDetail'
import batchAdd from '../batchAdd/index'
import { destoryApi, productDeleteApi } from '@/api/product'
export default {
  name: 'BroadcastProList',
  components: { detailsFrom, batchAdd },
  data() {
    return {
      Loading: false,
      roterPre: roterPre,
      listLoading: true,
      broadcast_goods_id: '',
      dialogVisible: false,

      tableData: {
        data: [],
        total: 0
      },
      tableForm: {
        page: 1,
        limit: 20,
        status_tag: this.$route.query.status ? this.$route.query.status : '',
        keyword: '',
        broadcast_goods_id: this.$route.query.id ? this.$route.query.id : ''
      },
      broadcast_goods_id: this.$route.query.id ? this.$route.query.id : '',
      liveRoomStatus: ''
    }
  },
  watch: {
    broadcast_goods_id(newName, oldName) {
      this.getList('')
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 批量添加直播商品
    batchAdd() {
      this.$refs.batchAdd.dialogVisible = true
      this.$refs.batchAdd.getList([])
    },
    // 详情
    onProDetails(id) {
      this.broadcast_goods_id = id
      this.$refs.ProDetail.dialogVisible = true
      this.$refs.ProDetail.getData(id)
    },
    // 编辑
    handleUpdate(id) {
      this.$modalForm(updateBroadcastApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSureDelete().then(
        () => {
          broadcastProDeleteApi(id)
            .then(({ message }) => {
              this.$message.success(message)
              this.tableData.data.splice(idx, 1)
              this.getList()
            })
            .catch(({ message }) => {
              this.$message.error(message)
            })
        }
      )
    },
    handleSizeChangeIssue(val) {
      this.tableFormIssue.limit = val
      this.getIssueList()
    },
    // 列表
    getList() {
      this.listLoading = true
      console.log(this.tableForm)
      broadcastProListApi(this.tableForm)
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
      this.tableForm.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableForm.limit = val
      this.getList()
    },
    // 修改状态
    onchangeIsShow(row) {
      changeProDisplayApi(row.broadcast_goods_id, { is_show: row.is_mer_show })
        .then(({ message }) => {
          this.$message.success(message)
          this.getList()
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.modalbox {
  /deep/.el-dialog {
    min-width: 550px;
  }
}
.selWidth {
  width: 400px;
}
.seachTiele {
  line-height: 35px;
}
.fa {
  color: #0a6aa1;
  display: block;
}
.sheng {
  color: #ff0000;
  display: block;
}
</style>
