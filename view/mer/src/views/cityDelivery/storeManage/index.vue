<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" inline>         
            <div>
              <el-form-item label="是否开启：">
                <el-select
                  v-model="tableFrom.status"
                  placeholder="请选择"
                  class="filter-item selWidth mr20"
                  clearable
                  @change="getList(1)"
                >
                  <el-option v-for="item in applyStatus" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="配送方：">
                <el-select
                  v-model="tableFrom.type"
                  placeholder="请选择"
                  class="filter-item selWidth mr20"
                  clearable
                  @change="getList(1)"
                >
                  <el-option v-for="item in deliveryPoint" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="发货点名称：">  
                <el-input v-model="tableFrom.station_name" placeholder="请输入发货点名称" class="selWidth" size="small" @keyup.enter.native="getList(1)">
                  <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
                </el-input>
              </el-form-item>  
              <el-form-item label="关键字：">
                <el-input v-model="tableFrom.keyword" placeholder="请输入联系人姓名或电话" class="selWidth" size="small" @keyup.enter.native="getList(1)">
                  <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
                </el-input>
              </el-form-item> 
            </div>
          </el-form>
          <el-button size="small" type="primary" @click="add">添加发货点</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column label="序号" prop="station_id" min-width="50" />
        <el-table-column prop="station_name" label="发货点名称" min-width="100" />
        <el-table-column prop="type" label="配送方" min-width="100" >
        <template slot-scope="scope">
          <span >
              {{(scope.row.type==1) ? '达达' : 'UU'}}
            </span>
        </template>
        </el-table-column>
        <el-table-column prop="contact_name" label="联系人姓名" min-width="60" />
        <el-table-column prop="phone" label="联系人电话" min-width="100" />
        <el-table-column label="是否开启" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="是"
              inactive-text="否"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="100" />
        <el-table-column label="操作" min-width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.station_id)">编辑</el-button>
            <el-button type="text" size="small" @click="onRemark(scope.row.station_id)">备注</el-button>
            <el-button type="text" size="small" @click="onDetails(scope.row.station_id)">详情</el-button>
            <el-button type="text" size="small" @click="onDelete(scope.row.station_id,scope.$index)">删除</el-button>
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
    <!--添加门店-->
    <add-store :mapKey="mapKey" :keyUrl="keyUrl" :deliveryType="delivery_type" @getList="getList" ref="addStore" />
    <!--详情-->
    <el-dialog
      v-if="dialogVisible"
      title="发货点详情"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <div v-loading="loading">
        <div class="description">
          <div class="acea-row">
            <div class="description-term">商户名称：{{ storeDetail.merchant && storeDetail.merchant.mer_name }}</div>
            <div class="description-term">发货点名称：{{ storeDetail.station_name }}</div>
            <div class="description-term">配送方：{{ (storeDetail.type==1) ? '达达' : 'UU' }}</div>
            <div class="description-term">联系电话：{{ storeDetail.phone }}</div>
            <div class="description-term">配送品类：{{ storeDetail.business && storeDetail.business.label }}</div>

            <div class="description-term">发货点联系人：{{ storeDetail.contact_name }}</div>
            <div class="description-term">发货点联系电话：{{ storeDetail.phone }}</div>
            <div class="description-term">经纬度：{{ storeDetail.lat }},{{ storeDetail.lng }}</div>
            <div class="description-term">详细地址：{{ storeDetail.station_address }}</div>
            <div class="description-term">是否显示：{{ storeDetail.status == 1 ? '显示' : '不显示' }}</div>
            <div class="description-term">备注：{{ storeDetail.mark || '无' }}</div>
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
import { deliveryStoreLst, deliveryStoreDetail, deliveryStoreRemark, deliveryStoreStatus, getConfigApi, deliveryStoreDelete } from '@/api/systemForm'
import addStore from './addStore'
export default {
  components: {
    addStore
  },
  data() {
    return {
      dialogVisible: false,
      storeDetail: {},
      tableData: {
        data: [],
        total: 0
      },
      mapKey: "",
      keyUrl: "",
      listLoading: true,
      loading: true,
      tableFrom: {
        keyword: '',
        status: '',
        station_name: '',
        page: 1,
        limit: 20
      },
      applyStatus: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      deliveryPoint:[
        {value:1,label:"达达"},
        {value:2,label:"UU"}
      ],

      delivery_type: 1,
    }
  },
  mounted() {
    this.getMapKey()
    this.getList(1)
  },
  methods: { 
    // 添加门店
    add() {
      this.$refs.addStore.addStore()
    },
    // 编辑门店
    onEdit(id) {
      this.$refs.addStore.getDetails(id);
    },
    // 获取KEY值
    getMapKey() {
      getConfigApi().then(res => {
          this.mapKey = res.data.tx_map_key
          const keys = res.data.tx_map_key
          this.keyUrl = `https://apis.map.qq.com/tools/locpicker?type=1&key=${keys}&referer=myapp`
          this.delivery_type = res.data.delivery_type
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      deliveryStoreLst(this.tableFrom)
        .then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch(res => {
          this.$message.error(res.message)
          this.listLoading = false
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
    // 详情
    onDetails(id) {
      this.dialogVisible = true
      deliveryStoreDetail(id)
        .then(res => {
          this.storeDetail = res.data
          this.loading = false
        })
        .catch(res => {
          this.$message.error(res.message)
          this.loading = false
        })
    },
    // 备注
    onRemark(id) {
      this.$modalForm(deliveryStoreRemark(id)).then(() => this.getList(''))
    },
    // 删除
    onDelete(id,idx) {
      this.$modalSureDelete('确定删除该门店').then(
        () => {
          deliveryStoreDelete(id)
            .then(({ message }) => {
              this.$message.success(message)
              this.tableData.data.splice(idx, 1)
            })
            .catch(({ message }) => {
              this.$message.error(message)
            })
        }
      )
    },
    // 是否开通
    onchangeIsShow(row) {
      deliveryStoreStatus(row.station_id, { status: row.status })
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

<style lang="scss" scoped>
.description{
  &-term {
    display: table-cell;
    padding-bottom: 10px;
    line-height: 20px;
    width: 100%;
    font-size: 12px;
  }
}
</style>
