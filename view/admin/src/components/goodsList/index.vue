<template>
  <div class="goodList">
    <el-form
      size="small" inline label-width="100px"
    >
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
            <el-input
              placeholder="请输入商品名称,关键字,编号"
              v-model="tableFrom.store_name"
              style="width: 240px"
              @keyup.enter.native="getList(1)"
            >
             <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
            </el-input>
          </el-form-item>       
    </el-form>
    <!-- :columns="liveStatus == false ? columns4 : columns5" -->
    <el-table
      ref="table"  
      @selection-change="changeCheckbox"
      :data="tableData.data"
      v-loading="loading"
    >
    <el-table-column type="selection" min-width="55" />
      <el-table-column
        prop="product_id"
        label="商品id"
        min-width="60"
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
    <div class="acea-row row-right page">
      
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
    <div class="footer" slot="footer" v-if="many === 'many' && !diy">
      <el-button
        type="primary"
        size="large"
        :loading="modal_loading"
        style="width: 100%;"
        @click="ok"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { categoryListApi, goodLstApi } from "@/api/product";

export default {
  name: "index",
  props: {
    is_new: {
      type: String,
      default: "",
    },
    diy: {
      type: Boolean,
      default: false,
    },
    isdiy: {
      type: Boolean,
      default: false,
    },
    ischeckbox: {
      type: Boolean,
      default: false,
    },
    liveStatus: {
      type: Boolean,
      default: false,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    datas: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      props: {
        emitPath: false
      },
			cateIds:[],
      modal_loading: false,
      merCateList: [],
      tableFrom: {
        cate_id: "",
        store_name: "",
        is_new: this.is_new,
        page: 1,
        limit: 15,
      },
      total: 0,
      modals: false,
      loading: false,
      tableData: {
        total: 0,
        data: []
      },
      currentid: 0,
      productRow: {},
      
      images: [],
      diyVal: [],
      many: "",
      idKey: "product_id",
      multipleSelectionAll: [],
      // multipleSelectionAll: window.form_create_helper.get(this.$route.query.field) || [],
      // idKey: "product_id",
    };
  },
  computed: {
    
  },
  created() {
    let radio = {
      width: 60,
      align: "center",
      render: (h, params) => {
        let id = params.row.id;
        let flag = false;
        if (this.currentid === id) {
          flag = true;
        } else {
          flag = false;
        }
        let self = this;
        return h("div", [
          h("Radio", {
            props: {
              value: flag,
            },
            on: {
              "on-change": () => {
                self.currentid = id;
                this.productRow = params.row;
                this.$emit("getProductId", this.productRow);
                if (this.productRow.id) {
                  if (this.$route.query.fodder === "image") {
                    /* eslint-disable */
                    let imageObject = {
                      image: this.productRow.image,
                      product_id: this.productRow.id,
                      name: this.productRow.name,
                    };
                    form_create_helper.set("image", imageObject);
                    form_create_helper.close("image");
                  }
                } else {
                  this.$message.warning("请先选择商品");
                }
              },
            },
          }),
        ]);
      },
    };

    let checkbox = {
      type: "selection",
      width: 60,
      align: "center",
    };
    let many = "";
    if (this.ischeckbox) {
      many = "many";
    } else {
      many = this.$route.query.type;
    }
    this.many = many;
    
  },
  mounted() {
    this.goodsCategory();
    this.getList('');
    // const checked =
    //     window.form_create_helper.get(this.$route.query.field).map((item) => {
    //       return {
    //         product_id: item.id,
    //         image: item.src,
    //       };
    //     }) || [];
    //   this.multipleSelectionAll = checked;
  },
  methods: {
		handleSelectAll () {
		  this.$refs.table.selectAll(false);
		},
    changeCheckbox(selection) {
      let images = [];
      selection.forEach(function (item) {
        let imageObject = {
          image: item.image,
          product_id: item.product_id,
          store_name: item.store_name,
          temp_id: item.temp_id
        };
        images.push(imageObject);
      });
      this.images = images;
      this.diyVal = selection;
      this.$emit("getProductDiy", selection);
    },
    // 商品分类；
    goodsCategory() {
      categoryListApi(1)
        .then((res) => {
          this.merCateList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },

     pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    // 列表
    getList(num) {
      let that = this
      that.loading = true;
      that.tableFrom.page = num ? num : that.tableFrom.page
      if (!that.liveStatus) {
        if (that.isLive) {
          that.tableFrom.is_live = 1;
        }
        goodLstApi(that.tableFrom)
          .then(async (res) => { 
            that.tableData.data = res.data.list;
            that.tableData.total = res.data.count;
            that.$nextTick(function () {
             that.setSelectRow(); //调用跨页选中方法
            });
            that.loading = false;
          })
          .catch((res) => {
            that.loading = false;
            that.$message.error(res.message);
          });
      } else {
        goodLstApi({
          is_show: "1",
          status: "1",
          live_id: this.datas.id,
          kerword: this.tableFrom.store_name,
          page: this.tableFrom.page,
          limit: this.tableFrom.limit,
        })
          .then(async (res) => {
            let data = res.data;
            data.list.forEach((el) => {
              el.image = el.cover_img;
            });
            this.tableData.data = data.list;
            this.tableData.total = res.data.count;
            this.loading = false;
          })
          .catch((res) => {
            this.loading = false;
            this.$message.error(res.message);
          });
      }
    },
   // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.table.clearSelection();
      for (var i = 0; i < this.tableData.data.length; i++) {
        if (selectAllIds.indexOf(this.tableData.data[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData.data[i], true);
        }
      }
    },
    ok() {
      if (this.images.length > 0) {
        if (this.$route.query.fodder === "image") {
          let imageValue = form_create_helper.get("image");
          form_create_helper.set("image", imageValue.concat(this.images));
          form_create_helper.close("image");
        } else {
          if(this.isdiy){
            this.$emit("getProductId", this.diyVal);
          }else {
            this.$emit("getProductId", this.images);
          }
        }
      } else {
        this.$message.warning("请先选择商品");
      }
    },
		treeSearchs(value){
			this.cateIds = value;
			this.tableFrom.page = 1;
			this.getList('');
		},
		// 表格搜索
    userSearchs() {
      this.tableFrom.page = 1;
      this.getList('');
    },
    clear() {
      this.productRow.id = "";
      this.currentid = "";
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  margin: 15px 0;
}

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

.tabform {
   .ivu-form-item {
    margin-bottom: 16px !important;
  }
}

.btn {
  margin-top: 20px;
  float: right;
}

.goodList {
   table {
    width: 100% !important;
  }
}
</style>
