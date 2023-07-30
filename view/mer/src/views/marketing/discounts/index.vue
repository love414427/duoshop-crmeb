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
                <el-form-item style="display: block;">
                  <el-button
                    type="primary"
                    @click="add"
                    class="mr10" >添加套餐</el-button>
                </el-form-item>   
              
          </el-form>
          </div>
        </div>
      <el-table v-loading="loading" :data="tableData.data" style="width: 100%">
       <el-table-column label="ID" prop="discount_id" min-width="80"/>
       <el-table-column label="套餐名称" prop="title" min-width="120">

       </el-table-column>
       <el-table-column label="套餐类型" min-width="120">
          <template slot-scope="scope">
          {{ scope.row.type == 0 ? "固定套餐" : "搭配套餐" }}
          </template>
       </el-table-column>
       <el-table-column label="上架状态" min-width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
       </el-table-column>
        <el-table-column label="限时" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.is_time == 0">不限时</div>
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
            <router-link
              :to="{path: roterPre + '/marketing/discounts/create/' + scope.row.discount_id}"
            >
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.discount_id, scope.$index)">删除</el-button>

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
import { mapState } from "vuex";
import { discountsList, discountsChangeStatus, discountsDelete } from "@/api/marketing";
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
      roterPre: roterPre,
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
    };
  },
  computed: {
  },
  created() {
    this.getList('');
  },
  methods: {
    // 添加
    add() {
      this.$router.push({ path: `${roterPre}/marketing/discounts/create` });
    },

    // 一键复制
    copy(row) {
      this.$router.push({
        name: "create",
        query: {
          id: row.id,
          copy: 1,
        },
      });
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除该套餐').then(() => {
        discountsDelete(id)
          .then(({
            message
          }) => {
            this.$message.success(message)
            this.tableData.data.splice(idx, 1)
          })
          .catch(({
            message
          }) => {
            this.$message.error(message)
          })
      })
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
      discountsChangeStatus(row.discount_id,row.is_show)
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
</style>
