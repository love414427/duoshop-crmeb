<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      title="订单核销"
      :visible.sync="dialogVisible"
      width="900px"
    >
      <div class="container">
          <el-form label-width="80px" size="small">
            <el-form-item v-if="!isColum" label="核销码：">
              <el-input v-model="code" placeholder="请输入核销码查询订单号和商品" class="selWidth" size="small" @keyup.enter.native="searchOrder" /> 
              <el-button size="small" type="primary" @click="searchOrder">搜索</el-button>         
            </el-form-item>
            <el-form-item label="订单号：">
              <span>{{orderData.order_sn}}</span>
            </el-form-item>
          </el-form>
          <div style="margin-top: 20px;">
            <el-table
              ref="multipleSelection"
              :data="productList"
              tooltip-effect="dark"
              size="mini"
              :row-key="(row) => { return row.product_id }"
              @selection-change="handleSelectionChange"
              :header-cell-style="{background:'#F0F5FF'}"
            >
            <el-table-column align="center" type="selection" :reserve-selection="true" min-width="50"/>
            <el-table-column align="center" label="商品信息" min-width="200">
              <template slot-scope="scope">
                <div class="acea-row" style="align-items: center;">
                  <div class="demo-image__preview">
                    <el-image :src="scope.row.cart_info.product.image" :preview-src-list="[scope.row.cart_info.product.image]" />
                  </div>
                  <span class="priceBox" style="width: 150px;">{{scope.row.cart_info.product.store_name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="规格" min-width="80">
              <template slot-scope="scope">
                <span class="priceBox">{{scope.row.cart_info.productAttr.sku}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单金额" min-width="80">
              <template slot-scope="scope">
                <span class="priceBox">{{scope.row.cart_info.productAttr.price}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" min-width="80">
              <template slot-scope="scope">
                <span class="priceBox">待核销</span>
              </template>
            </el-table-column> 
            <el-table-column align="center" prop="product_num" label="总数" min-width="80" />                 
            <el-table-column label="待核销数量" align="center" min-width="120">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row['refund_num']"
                  type="number"
                  :min="0"
                  :max="scope.row.max_num"
                  class="priceBox"
                  @change="limitNum(scope.row)"
                />  
              </template>
            </el-table-column>
          </el-table>
          </div>
        </div> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取消</el-button>
          <el-button type="primary" @click="handleCancellation" size="small">核销</el-button>
        </span>    
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
import { orderCancellationApi, goCancellationApi  } from '@/api/order'

export default {
  name: 'OrderCancellate',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      code: '',
      order_id: "",
      orderData: "",
      multipleSelection: [],
      ids: [],
      isColum: false,
      productList: []
    }
  },
  methods: {
    searchOrder() {
      if(!this.code){
        return this.$message.warning('输入核销码!')
      }
      this.productDetails(this.code)
    },
    handleCancellation() {
      if(!this.code){
        return this.$message.warning('输入核销码!')
      }
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择核销商品!')
      }
      const data = []
      this.multipleSelection.map((item) => {
        data.push({id:item.order_product_id,num:item.refund_num})
      })
      goCancellationApi(this.order_id,{verify_code: this.code,data: data}).then(res => {
         this.$message.success(res.message)
         this.dialogVisible = false
         this.$emit('getList','')
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    productDetails(code) {
      this.code = code
      this.loading = true
      orderCancellationApi(code).then(res => {
        this.orderData = res.data
        this.order_id = res.data.order_id
        this.productList = res.data.orderProduct
        this.productList.forEach((item, index)=>{
          item.max_num = item.refund_num
        })
        this.loading = false
      }).catch(({ message }) => {
        this.loading = false
        this.$message.error(message)
      })
    },
     // 选择商品
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    limitNum(row){
      if(row.refund_num > row.max_num){
        row.refund_num = row.max_num
      }else if(row.refund_num < 1){
        row.refund_num = 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
.selWidth{
  width: 330px;
}
.title{
  margin-bottom: 16px;
  color: #17233d;
  font-weight: 500;
  font-size: 14px;
}
</style>
