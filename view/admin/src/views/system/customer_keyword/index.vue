<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="add">添加关键字</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="service_reply_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="keyword"
          label="关键字"
          min-width="150"
        />
        <el-table-column
          prop="status"
          label="回复类型"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.type == '1'">文字消息</span>
            <span v-if="scope.row.type == '2'">图片消息</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否显示"
          min-width="100"
        >
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
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.service_reply_id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableData.limit"
          :current-page="tableData.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--添加编辑弹窗-->
    <el-dialog
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :title="message_id ? '编辑' : '添加'"
        height="30%"
        custom-class="dialog-scustom"
        class="addDia"
      >
          <div class="box-card right ml50">
            <el-form
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              label-width="100px"
              class="mt20"
              @submit.native.prevent
            >
              <el-form-item label="关键字：" prop="val">
                <div class="arrbox">
                  <el-tag
                    v-for="(item, index) in labelarr"
                    :key="index"
                    type="success"
                    closable
                    class="mr5"
                    :disable-transitions="false"
                    @close="handleClose(item)"
                  >{{ item }}</el-tag>
                  <el-input
                    v-model="val"
                    size="mini"
                    class="arrbox_ip"
                    placeholder="输入后回车"
                    style="width: 90%;"
                    @change="addlabel"
                  />
                </div>
              </el-form-item>
              <el-form-item label="规则状态：">
                <el-radio-group v-model="formValidate.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="消息类型：" prop="type">
                <el-select
                  v-model="formValidate.type"
                  placeholder="请选择规则状态"
                  style="width: 90%;"
                >
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                </el-select>
              </el-form-item>
              <el-form-item v-if="formValidate.type == '1'" label="规则内容：" prop="content">
                <el-input
                  type="textarea"
                  v-model="formValidate.content"
                  placeholder="请填写规则内容"
                  style="width: 90%;"
                />
              </el-form-item>
              <el-form-item
                v-if="formValidate.type == '2'"
                label="图片地址："
                prop="src"
              >
                <div class="acea-row row-middle">
                 <div class="upLoadPicBox" title="750*750px" @click="modalPicTap">
                    <div v-if="formValidate.content" class="pictrue">
                      <img :src="formValidate.content">
                    </div>
                    <div v-else class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div >
            <div style="text-align: right;">
              <el-button
                type="primary"
                class="ml50"
                :loading="loading"
                @click="submenus('formValidate')"
              >保存并发布</el-button>
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
import { replyListApi, replyDeleteApi, replyStatusApi, replyAddApi, replyEditApi } from '@/api/systemForm'
import { roterPre } from '@/settings'
import { getToken } from "@/utils/auth";
export default {
  name: 'CustomerKeyword',
  data() {
    const validateContent = (rule, value, callback) => {
      if (this.formValidate.type == "1") {
        if (this.formValidate.content == "") {
          callback(new Error("请填写规则内容"));
        } else {
          callback();
        }
      }
    };
    const validateSrc = (rule, value, callback) => {
      if (
        this.formValidate.type == "2" &&
        this.formValidate.content == ""
      ) {
        callback(new Error("请上传图片"));
      } else {
        callback();
      }
    };
    const validateVal = (rule, value, callback) => {
      if (this.labelarr.length == 0) {
        callback(new Error("请输入后回车"));
      } else {
        callback();
      }
    };
    return {
      roterPre: roterPre,
      tableData: {
        page: 1,
        limit: 20,
        data: [],
        total: 0,
        indexNum: 0
      },
      typeList: [
        {label: '文字消息', value: 1},
        {label: '图片消息', value: 2}
      ],
      listLoading: true,
      loading: false,
      message_id: '',
      val: "",
      dialogVisible: false,
      formValidate: {
        status: 1,
        type: 1,
        content: "",
        keyword: "",
      },
      ruleValidate: {
        val: [{ required: true, validator: validateVal, trigger: "blur" }],
        type: [
          { required: true, message: "请选择消息类型", trigger: "change" }
        ],
        content: [
          { required: true, validator: validateContent, trigger: "blur" }
        ],
      },
      labelarr: [],
      myHeaders: { "X-Token": getToken() }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onchangeIsShow(row) {
      replyStatusApi(row.service_reply_id, row.status).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 列表
    getList() {
      this.listLoading = true
      replyListApi(this.tableData.page, this.tableData.limit).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableData.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableData.limit = val
      this.getList()
    },
    // 点击商品图
    modalPicTap() {
      const _this = this;
      this.$modalUpload(function(img) {
        _this.formValidate.content = img[0];
        
      });
    },
    handleClose(tag) {
      const index = this.labelarr.indexOf(tag);
      this.labelarr.splice(index, 1);
    },
    addlabel() {
      const count = this.labelarr.indexOf(this.val);
      if (count === -1 && this.val != "") {
        this.labelarr.push(this.val);
      }
      this.val = "";
    },
    // 保存
    submenus(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          this.formValidate.keyword = this.labelarr.join(",");
          this.message_id ? 
            replyEditApi(this.message_id, this.formValidate)
              .then(async res => {
                this.loading = false;
                this.dialogVisible = false;
                this.$message.success(res.message);
                this.getList()
              }).catch(res => {
                this.loading = false;
                this.$message.error(res.message);
              })
            : replyAddApi(this.formValidate)
                .then(async res => {
                    this.loading = false;
                    this.dialogVisible = false;
                    this.getList()
                  }).catch(res => {
                    this.loading = false;
                    this.$message.error(res.message);
                });
        }
      });
    },
    // 保存成功操作
    operation() {
      this.$confirm("继续添加吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setTimeout(() => {
            this.$refs["formValidate"].resetFields();
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            this.$router.push({ path: `${roterPre}/systemForm/customer_keyword` });
          }, 500);
        });
    },
    // 创建
    add(){
      this.message_id = "";
      this.dialogVisible = true
      this.formValidate = {
        status: 1,
        content: "",
        keyword: "",
        type: ""
      };
      this.labelarr =  [];
    },
    // 编辑
    edit(row) {
      this.message_id = row.service_reply_id
      this.dialogVisible = true
      const info = row || null;
      this.formValidate = {
        status: info.status,
        content: info.content,
        keyword: info.keyword,
        type: info.type
      };
      this.labelarr = info.keyword.split(",") || [];
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除该关键字').then(() => {
        replyDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
