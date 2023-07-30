<template> 
  <div class="divBox"> 
    <el-card class="box-card">
       <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="100px">
            <el-form-item label="套餐类型：" clearable>
                  <el-select
                    v-model="tableFrom.type"
                    placeholder="请选择套餐类型"
                    clearable
                    @change="getList('')"
                  >
                    <el-option value="0" label="固定套餐">固定套餐</el-option>
                    <el-option value="1" label="搭配套餐">搭配套餐</el-option>
                  </el-select>
                </el-form-item>
              
                <el-form-item label="套餐状态：">
                  <el-select
                    placeholder="请选择"
                    v-model="tableFrom.status"
                    clearable
                    @change="getList('')"
                  >
                    <el-option value="" label="全部">全部</el-option>
                    <el-option value="1" label="上架">上架</el-option>
                    <el-option value="0" label="下架">下架</el-option>
                  </el-select>
                </el-form-item>
              
                <el-form-item label="套餐搜索：">
                  <el-input
                    style="width: 200px"
                    placeholder="请输入套餐名称"
                    v-model="tableFrom.title"
                    @keyup.enter.native="getList('')"
                  />
                </el-form-item>              
          </el-form>
          </div>
        </div>
      <el-table v-loading="loading" :data="tableData.data" style="width: 100%" size="small">
       <el-table-column label="ID" prop="discount_id" min-width="80"/>
       <el-table-column label="套餐名称" prop="title" min-width="120">

       </el-table-column>
       <el-table-column label="套餐类型" min-width="120">
          <template slot-scope="scope">
          {{ scope.row.type == 0 ? "固定套餐" : "搭配套餐" }}
          </template>
       </el-table-column>
       <el-table-column label="显示状态" min-width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
       </el-table-column>
        <el-table-column label="限时" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.start_time == 0">不限时</div>
            <div v-else>
              <div>起：{{ scope.row.start_time || "--" }}</div>
              <div>止：{{ scope.row.stop_time || "--" }}</div>
            </div>
          </template>
        </el-table-column>
        
         <el-table-column label="创建时间" prop="create_time" min-width="120" />
          
         <el-table-column label="剩余数量" min-width="120">
          <template slot-scope="scope">
            {{scope.row.is_limit?scope.row.limit_num:'不限量'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row.discount_id)">查看</el-button>

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
    <!--详情-->
    <el-dialog title="套餐详情" center :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
    <div v-loading="dialogLoading">
      <div class="box-container">
        <div class="title">基本信息：</div>
        <div class="acea-row">
          <div class="list sp"><label class="name">套餐名称：</label>{{ formValidate.title }}</div>         
          <div class="list sp100" v-if="formValidate.type == 1">
            <label class="name">套餐主商品：</label>
            <!-- -->
            <div >
              <el-table :data="specsMainData" border class="tabNumWidth" size="mini">
                <el-table-column
                  prop="store_name"
                  label="商品名称"
                  min-width="200">
                    <template slot-scope="scope">
                      <div class="product-data">
                        <img v-if="scope.row.product" class="image" :src="scope.row.product.image" />
                        <div>{{ scope.row.product.store_name }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="参与规格" min-width="80">
                      <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.attr" :key="index">
                          {{ item.sku }} | {{ item.price }}
                        </div>
                    </template>
                  </el-table-column> 
              </el-table>
            </div>
            
          </div>
          <!--搭配套餐-->
          <div class="list sp100">
            <label class="name">{{formValidate.type == 1 ? '套餐搭配商品：' : '套餐商品：'}} </label>
            <div class="labeltop">
              <el-table :data="specsData" border class="tabNumWidth" size="mini" height="260">
                <el-table-column
                  prop="store_name"
                  label="商品名称"
                  min-width="200">
                    <template slot-scope="scope">
                      <div class="product-data">
                        <img v-if="scope.row.product" class="image" :src="scope.row.product.image" />
                        <div>{{ scope.row.product.store_name }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="参与规格" min-width="80">
                      <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.attr" :key="index">
                          {{ item.sku }} | {{ item.price }}
                        </div>
                    </template>
                  </el-table-column>                
              </el-table>
            </div>
          </div>
        </div>
        <div class="title" style="margin-top: 20px;">套餐活动信息：</div>
        <div class="acea-row">
          <div class="list sp100"><label class="name">活动日期：</label> 
            <span v-if="formValidate.is_time">{{formValidate.time[0] + '-' + formValidate.time[1]}}</span>
            <span v-else>不限时</span>
          </div>  
          <div class="list sp"><label class="name">套餐数量：</label>{{ formValidate.is_limit ? formValidate.limit_num: "不限量" }}</div> 
          
          <div class="list sp"><label class="name">显示状态：</label>{{ formValidate.status === 1 ? "显示" : "不显示" }}</div>
          <div class="list sp"><label class="name">创建时间：</label>{{ formValidate.create_time }}</div>
        </div>
      </div>
      </div>
    </el-dialog> 
  </div>
</template>

<script>
import { mapState } from "vuex";
import { discountsList, discountsChangeStatus, discountsGetDetails } from "@/api/marketing";
import { formatDate } from "@/utils/validate";
import { roterPre } from '@/settings'
export default {
  name: "Discounts",
  filters: {
    formatDate(time) {
      if (time !== 0) {
        let date = new Date(time * 1000);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
  },
  data() {
    return {
      loading: false,
      dialogLoading: false,
      roterPre: roterPre,
      dialogVisible: false,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        status: "",
        title: "",
        page: 1,
        type: "",
        limit: 15,
      },
      specsMainData: [],
      specsData: [],
      formValidate: {
        title: "", //套餐名称
        type: 0, //套餐类型
        image: "", //套餐主图
        is_time: 0, //是否限时
        is_limit: 0, //限量1/不限量0
        limit_num: 0, //限量
        link_ids: [], //参与用户标签
        time: [], //套餐时间
        sort: 0, //排序
        free_shipping: 1, //是否包邮
        status: 1,
        products: [],
      },
    };
  },
  computed: {
  },
  created() {
    this.getList('');
  },
  methods: {
    // 查看
    handleDetail(id) {
      this.dialogVisible = true;
      this.dialogLoading = true;
      discountsGetDetails(id).then((res) => {
        this.formValidate = res.data;
        this.formValidate.time = res.data.time || [];   
        this.dialogLoading = false;  
        for (let i = 0; i < res.data.discountsProduct.length; i++) {
          const element = res.data.discountsProduct[i];
          element.attr= [];
          const attrArr = element['product'] && element['product']['attrValue'] || [];
            for (let j = 0; j < attrArr.length; j++) {
              const attr = attrArr[j];
              if (attr.productSku) {
                element.attr.push(attr) 
              } 
            }
          if (element.type == 1) {
            this.specsMainData.push(element);
          } else {
            this.specsData.push(element);
          }
        }
      });
    },
   
    // 列表
    getList(num) {
      this.loading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      discountsList(this.tableFrom)
        .then(async (res) => {
           this.tableData.data = res.data.list;
           this.tableData.total = res.data.count;
           this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
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

    // 修改是否显示
    onchangeIsShow(row) {
      discountsChangeStatus(row.discount_id,row.status)
        .then(async (res) => {
          this.$message.success(res.message);
          this.getList('');
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.getList('');
        });
    },
  },
};
</script>

<style scoped lang="scss">
.tabBox_img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
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
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;
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
  max-height: 280px;
  min-height: 120px;
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
.product-data {
  display: flex;
  align-items: center;

  .image {
    width: 50px !important;
    height: 50px !important;
    margin-right: 10px;
  }
}
</style>
