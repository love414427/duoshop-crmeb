<template>
  <div class="divBox">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button size="small" type="primary" @click="onAdd"
            >添加店铺类型
          </el-button>
        </div>
        <el-table
          v-loading="listLoading"
          :data="tableData.data"
          style="width: 100%"
          size="small"
          highlight-current-row
          class="switchTable"
        >
          <el-table-column prop="mer_type_id" label="ID" min-width="60" />
          <el-table-column
            prop="type_name"
            label="店铺类型名称"
            min-width="200"
          />
          <el-table-column prop="type_name" label="店铺保证金" min-width="200">
            <template slot-scope="scope">
              <span class="spBlock">{{
                scope.row.is_margin ? scope.row.margin + "元" : "无"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type_info"
            label="店铺类型要求"
            min-width="300"
          />
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="150"
          />
          <el-table-column
            prop="update_time"
            label="最新修改时间"
            min-width="150"
          />
          <el-table-column
            label="操作"
            min-width="280"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                >详情
              </el-button>
              <el-button type="text" size="small" @click="onEdit(scope.row)"
                >编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row.mer_type_id, scope.$index)"
                >删除
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="handleMark(scope.row.mer_type_id)"
                >备注
              </el-button>
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
    <el-dialog
      :title="isEdit ? '编辑店铺类型' : '添加店铺类型'"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      :append-to-body="append"
    >
      <el-form
        ref="formValidate"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="店铺类型名称：" prop="type_name">
          <el-input
            v-model="formValidate.type_name"
            maxlength="5"
            placeholder="请输入店铺类型名称"
          />
        </el-form-item>
        <el-form-item label="店铺类型要求：">
          <el-input type="textarea" v-model="formValidate.type_info" />
        </el-form-item>
        <el-form-item label="店铺保证金：">
          <el-radio-group v-model="formValidate.is_margin">
            <el-radio :label="0">无</el-radio>
            <el-radio :label="1">有</el-radio>
          </el-radio-group>
          <div v-if="formValidate.is_margin == 1" class="input_inline">
            <el-input v-model="formValidate.margin" placeholder="请输入单位" />
            单位：元
          </div>
        </el-form-item>
        <el-form-item label="店铺权限：" prop="auth">
          <el-tree
            ref="tree"
            :data="permissions"
            show-checkbox
            node-key="value"
            ::default-checked-keys="formValidate.auth || []"
            @hook:mounted="$refs.tree.setCheckedKeys(formValidate.auth || [])"
            @check="
              [
                (formValidate.auth = $refs.tree.getCheckedKeys()),
                $refs.formValidate.validateField('auth'),
              ]
            "
          ></el-tree>
        </el-form-item>
        <el-form-item label="其它说明：">
          <el-input type="textarea" v-model="formValidate.description" />
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button
            v-if="!isEdit"
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmit('formValidate')"
            >提交
          </el-button>
          <el-button
            v-else
            type="primary"
            class="submission"
            size="small"
            @click="handleUpdate('formValidate')"
            >提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 详情 -->

    <el-dialog
      title="店铺详情"
      :visible.sync="dialogDetailVisible"
      width="600px"
      :before-close="handleDetailClose"
      :append-to-body="append"
    >
      <el-form
        ref="formDetailValidate"
        class="formValidate mt20"
        :model="formDetailValidate"
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="店铺类型名称：" prop="type_name">
          <span>
            {{
              formDetailValidate.type_name
                ? formDetailValidate.type_name
                : "暂无数据"
            }}
          </span>
        </el-form-item>
        <el-form-item label="店铺类型要求：">
          {{
            formDetailValidate.type_info
              ? formDetailValidate.type_info
              : "暂无数据"
          }}</el-form-item
        >
        <el-form-item label="店铺保证金：">
          {{
            formDetailValidate.margin ? formDetailValidate.margin : "暂无数据"
          }}</el-form-item
        >
        <el-form-item label="店铺权限：">
          <el-tree
            ref="treeDetail"
            :data="formDetailValidate.options"
            :props="{ label: 'title' }"
          ></el-tree>
        </el-form-item>
        <el-form-item label="其它说明：">
          {{
            formDetailValidate.description
              ? formDetailValidate.description
              : "暂无数据"
          }}</el-form-item
        >

        <el-form-item label="创建时间：">
          {{
            formDetailValidate.create_time
              ? formDetailValidate.create_time
              : "暂无数据"
          }}</el-form-item
        >

        <el-form-item label="最新修改时间："
          >{{
            formDetailValidate.update_time
              ? formDetailValidate.update_time
              : "暂无数据"
          }}
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 详情 -->
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
import {
  storeTypeLstApi,
  storeTypeCreateApi,
  storeTypeUpdateApi,
  storeTypeDeleteApi,
  storeJurisdictionApi,
  merchantTypeMarkForm,
  merchantTypeMarkApi,
} from "@/api/merchant";
import { fromList } from "@/libs/constants.js";
import { roterPre } from "@/settings";
import SettingMer from "@/libs/settingMer";
import Cookies from "js-cookie";

export default {
  name: "MerchantList",
  data() {
    return {
      //详情弹框
      dialogDetailVisible: false,
      formDetailValidate: {},
      detailTypeId: "",

      fromList: fromList,
      roterPre: roterPre,
      listLoading: true,
      append: true,
      permissions: [], //店铺类型
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
      },
      formValidate: {
        type_name: "",
        type_info: "",
        is_margin: 1,
        margin: 0,
        auth: [],
        description: "",
      },
      ruleValidate: {
        type_name: [
          { required: true, message: "请输入店铺类型名称", trigger: "blur" },
        ],
        auth: [
          { required: true, message: "请选择店铺权限", trigger: "change" },
        ],
      },
      dialogVisible: false,
      isEdit: false,
      typeId: "",
      cccc: "",
      props: {
        multiple: true,
        expandTrigger: "hover",
        emitPath: false,
      },
    };
  },
  mounted() {
    this.getList("");
  },
  methods: {
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      storeTypeLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
          this.jurisdiction();
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList("");
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList(1);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 添加
    onAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      // this.jurisdiction();
      this.formValidate = {
        type_name: "",
        type_info: "",
        is_margin: 1,
        margin: 0,
        description: "",
        auth: [],
      };
      this.$refs.tree && this.$refs.tree.setCheckedKeys([]);
    },
    //获取权限
    jurisdiction() {
      storeJurisdictionApi().then((res) => {
        function loadData(lst) {
          lst.forEach((v) => {
            v.value = v.id;
            v.label = v.title;
            delete v.id;
            delete v.title;
            if (v.children) {
              if (!v.children.length) {
                delete v.children;
              } else {
                loadData(v.children);
              }
            }
          });
          return lst;
        }

        this.permissions = loadData(res.data);
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          storeTypeCreateApi(this.formValidate)
            .then(async (res) => {
              this.$message.success(res.message);
              this.dialogVisible = false;
              this.getList("");
            })
            .catch((res) => {
              this.$message.error(res.message);
            });
        } else {
          return false;
        }
      });
    },
    // 编辑
    onEdit(row) {
      this.isEdit = true;
      this.dialogVisible = true;
      this.typeId = row.mer_type_id;
      this.formValidate = {
        type_name: row.type_name,
        type_info: row.type_info,
        is_margin: row.is_margin || 0,
        margin: row.margin || 0,
        auth: row.auth_ids,
        description: row.description,
      };
      this.$refs.tree && this.$refs.tree.setCheckedKeys(row.auth_ids);
      // this.jurisdiction();
    },
    //详情关闭
    handleDetailClose() {
      this.dialogDetailVisible = false;
      this.getList();
    },
    // 详情
    handleDetail(row) {
      this.dialogDetailVisible = true;
      this.detailTypeId = row.mer_type_id;
      this.getDetail();
    },
    getDetail() {
      merchantTypeMarkApi(this.detailTypeId).then((res) => {
        this.formDetailValidate = res.data;
      });
    },

    handleUpdate(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          storeTypeUpdateApi(this.typeId, this.formValidate)
            .then(async (res) => {
              this.$message.success(res.message);
              this.dialogVisible = false;
              this.getList("");
            })
            .catch((res) => {
              this.$message.error(res.message);
            });
        } else {
          return false;
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$modalSure("确定删除该店铺类型吗").then(() => {
        storeTypeDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList("");
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    // 备注
    handleMark(id) {
      // console.log(id,'9999999');
      this.$modalForm(merchantTypeMarkForm(id)).then(() => this.getList());
    },
  },
};
</script>

<style scoped lang="scss">
.input_inline {
  /deep/ .el-input {
    width: 200px;
    margin-right: 5px;
  }
}
</style>
