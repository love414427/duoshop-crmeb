<template>
  <div class="divBox">
    <el-dialog title="批量添加直播商品" :visible.sync="dialogVisible" width="900px" v-if="dialogVisible" custom-class="customHeight">
      <el-button size="small" type="success" @click="selectGoods">选择商品</el-button>
      <div class="container">
          <div class="table-cont">
            <el-table
              v-loading="listLoading"
              :data="tableData.data"
              style="width: 100%"
              size="mini"
              highlight-current-row
              :row-key="(row) => { return row.product_id }"
            >
              <el-table-column prop="product_id" label="ID" min-width="50" />
              <el-table-column label="商品名称" min-width="200">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.store_name"
                  />
                </template>
              </el-table-column>
              <el-table-column label="商品图" min-width="80">
                <template slot-scope="scope">
                  <div class="upLoadPicBox" @click="modalPicTap('1','duo',scope.$index)">
                    <div v-if="scope.row.image" class="pictrue tabPic">
                      <img :src="scope.row.image" />
                    </div>
                    <div v-else class="upLoad tabPic">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="直播价" min-width="80" />
              <el-table-column label="库存" min-width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.stock }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" class="mr10" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        <el-button size="small"  type="primary" style="width: 80px; margin-top: 30px;" @click="submit">提交</el-button>
      </div>
    </el-dialog>
    <!--选择商品-->
    <select-goods ref="selectGoods" @get-goods="getList"/>
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
  import { batchAddBroadcastGoodsApi } from "@/api/marketing";
  import selectGoods from './goodsList'
  export default {
    name: "GoodList",
    components: { selectGoods },
    data() {
      return {
        dialogVisible: false,
        listLoading: true,
        tableData: {
          data: [],
          total: 0,
        },
        tableFrom: {
          page: 1,
          limit: 3,
          status_tag: 1,
          keyword: "",
        },
        checked: [],
        broadcast_room_id: "",
      };
    },
    mounted() {

    },
    methods: {
      // 批量添加直播商品
      selectGoods(){
        this.$refs.selectGoods.dialogVisible = true
        this.$refs.selectGoods.getList(this.tableData.data,1);
      },
      // 删除
      handleDelete(idx) {
        this.tableData.data.splice(idx, 1)
      },
      // 提交
      submit(){
        let goodsList = this.filtersArr(this.tableData.data)
        batchAddBroadcastGoodsApi({goods:goodsList}).then((res) => {
          this.$message.success(res.message);
          this.dialogVisible=false;
          this.$emit('get-list')
        }).catch((res) => {
            this.$message.error(res.message);
          });
      },
      // 过滤id
      filtersArr(arr) {
        var newcurrentDateItemList = arr.map((item,index) =>{
          return Object.assign({},{'product_id':item.product_id,'name':item.store_name,'cover_img':item.image,'price':item.price})
        })
        return newcurrentDateItemList
      },
      // 点击商品图
      modalPicTap(tit, num, i) {
        const _this = this;
        const attr = [];
        this.$modalUpload(function (img) {
          _this.tableData.data[i].image = img[0];
        }, tit);
      },
      // 列表
      getList(data) {
        this.tableData.data = data
        this.tableData.total = data.length;
        this.listLoading = false;
      },
      pageChange(page) {
        this.tableForm.page = page
        this.getList()
      },
      handleSizeChange(val) {
        this.tableForm.limit = val
        this.getList()
      },
    },
  };
</script>

<style scoped lang="scss">
  .container{
    margin-top: 30px;
    text-align: right;
  }
  .customHeight{
    height: 800px;
  }
  .table-cont{
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
