<template>
  <div>
    <el-row >
      <el-col v-bind="grid">
        <div class="Nav">
          <div class="input">
            <el-input v-model="filterText" placeholder="选择分类" prefix-icon="el-icon-search" style="width: 100%;" clearable />
          </div>
          <div class="trees-coadd">
            <div class="scollhide">
              <div class="trees">
                <el-tree ref="tree" :data="treeData2" :filter-node-method="filterNode" :props="defaultProps">
                  <div slot-scope="{ node, data}" class="custom-tree-node" @click.stop="handleNodeClick(data)">
                    <div>
                      <span>{{ node.label }}</span>
                      <span v-if="data.space_property_name" style="font-size: 11px;color: #3889b1">（{{ data.attachment_category_name }}）</span>
                    </div>
                    <span class="el-ic">
                      <i class="el-icon-circle-plus-outline" @click.stop="onAdd(data.attachment_category_id)" />
                      <!--                      <svg-icon-->
                      <!--                        icon-class="danyuan"-->
                      <!--                        title="添加管理单元"-->
                      <!--                        class="icon-space"-->
                      <!--                      />-->
                      <i v-if="data.space_id!='0' && (!data.children || data.children == 'undefined') && data.attachment_category_id" class="el-icon-edit" title="修改" @click.stop="onEdit(data.attachment_category_id)" />
                      <!--                      <svg-icon-->
                      <!--                        icon-class="detail"-->
                      <!--                        title="查看该空间详情"-->
                      <!--                        class="icon-space"-->
                      <!--                      />-->
                      <i v-if="data.space_id!='0' && (!data.children || data.children == 'undefined') && data.attachment_category_id" class="el-icon-delete" title="删除分类" @click.stop="() => handleDelete(data.attachment_category_id)" />
                    </span>
                  </div>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col v-bind="grid2" class="colLeft">
        <div v-loading="loading" class="conter">
          <div class="bnt">
            <el-button v-if="params !== '/merchant/config/picture'" size="small" type="primary" class="mb10 mr10" @click="checkPics(true)">使用选中图片</el-button>
            <el-upload class="upload-demo mr10 mb15" :action="fileUrl" :on-success="handleSuccess" :headers="myHeaders" :show-file-list="false" multiple>
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button type="success" size="small" @click.stop="onAdd(0)">添加分类</el-button>
            <el-button type="error" size="small" class="mr10" :disabled="checkPicList.length===0" @click.stop="editPicList('图片')">删除图片</el-button>
            <el-input v-model="tableData.attachment_name" placeholder="请输入图片名称搜索" style="width: 230px;" @keyup.enter.native="getFileList(1)" size="small">
              <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getFileList(1)" />
            </el-input>
            <el-select v-model="sleOptions.attachment_category_name" placeholder="图片移动至" class="mb15" size="small">
              <el-option :label="sleOptions.attachment_category_name" :value="sleOptions.attachment_category_id" style="max-width: 560px;height:200px;overflow: auto;background-color:#fff">
                <el-tree ref="tree2" :data="treeData2" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleSelClick" />
              </el-option>
            </el-select>
          </div>
          <div class="pictrueList acea-row mb15">
            <div v-show="isShowPic" class="imagesNo">
              <i class="el-icon-picture" style="font-size: 60px;color: rgb(219, 219, 219);" />
              <span class="imagesNo_sp">图片库为空</span>
            </div>
            <div class="conters">
              <div v-for="(item, index) in pictrueList.list" :key="index" class="gridPic">
                <p class="number" v-if="item.num>0">
                  <el-badge class="item" :value="item.num">
                    <a href="#" class="demo-badge"></a>
                  </el-badge>
                </p>
                <img v-lazy="item.attachment_src" :class="item.isSelect ? 'on': '' " @click="changImage(item, index, pictrueList.list)" />
                <div style="display: flex;align-items: center;justify-content: space-between">
                  <el-input v-model="item.attachment_name" v-if="editId === item.attachment_id"></el-input>
                  <p class="name" style="width: 80%" v-else>{{item.attachment_name}}</p>
                  <i class="el-icon-edit" @click="handleEdit(item.attachment_id,item.attachment_name)" />
                </div>
              </div>
            </div>
          </div>
          <div class="block">
            <el-pagination :page-sizes="[12, 20, 40, 60]" :page-size="tableData.limit" :current-page="tableData.page" layout="total, sizes, prev, pager, next" :total="pictrueList.total" @size-change="handleSizeChange" @current-change="pageChange" />
          </div>
        </div>
      </el-col>
    </el-row>
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
  formatLstApi,
  attachmentCreateApi,
  attachmentUpdateApi,
  picNameEditApi,
  attachmentDeleteApi,
  attachmentListApi,
  picDeleteApi,
  categoryApi
} from "@/api/system";
import { getToken } from "@/utils/auth";
import SettingMer from "@/libs/settingMer";

export default {
  name: "Upload",
  props: {
    isMore: {
      type: String,
      default: "1"
    },
    setModel: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      params: "",
      sleOptions: {
        attachment_category_name: "",
        attachment_category_id: ""
      },
      list: [],
      grid: {
        xl: 8,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 24
      },
      grid2: {
        xl: 16,
        lg: 16,
        md: 16,
        sm: 16,
        xs: 24
      },
      filterText: "",
      treeData: [],
      treeData2: [],
      defaultProps: {
        children: "children",
        label: "attachment_category_name"
      },
      classifyId: 0,
      myHeaders: { "X-Token": getToken() },
      tableData: {
        page: 1,
        limit: 12,
        attachment_category_id: 0,
        order: "",
        attachment_name: ""
      },
      pictrueList: {
        list: [],
        total: 0
      },
      isShowPic: false,
      checkPicList: [],
      ids: [],
      checkedMore: [],
      checkedAll: [],
      selectItem: [],
      editId: "", // 记录id
      editName: "" // 记录保存前名字
    };
  },
  computed: {
    fileUrl() {
      return (
        SettingMer.https +
        `/upload/image/${this.tableData.attachment_category_id}/file`
      );
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    let that = this;
    this.params = this.$route && this.$route.path ? this.$route.path : "";
    if(this.$route && this.$route.query.field === "dialog")
      import("../../../public/UEditor/dialogs/internal");
    this.getList();
    this.getFileList("");
    if (that.$route) {
      form_create_helper.onOk(function(){
        that.checkPics()
      })
    }
  },
  methods: {
    // 搜索分类
    filterNode(value, data) {
      if(!value) return true;
      return data.attachment_category_name.indexOf(value) !== -1;
    },
    // 所有分类
    getList() {
      const data = {
        attachment_category_name: "全部图片",
        attachment_category_id: 0
      };
      formatLstApi()
        .then(res => {
          this.treeData = res.data;
          this.treeData.unshift(data);
          this.treeData2 = [...this.treeData];
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    // 编辑图片名称
    handleEdit(id, name) {
      if(id === this.editId) {
        if(this.editName !== name) {
          if(!name.trim()) {
            this.$message.warning("请先输入图片名称");
            return;
          }
          picNameEditApi(id, {
            attachment_name: name
          }).then(() => this.getFileList(""));
          this.editId = "";
        } else {
          this.editId = "";
          this.editName = "";
        }
      } else {
        this.editId = id;
        this.editName = name;
      }
    },
    // 添加分类
    onAdd(id) {
      const config = {};
      if(Number(id) > 0) config.formData = { pid: id };
      this.$modalForm(attachmentCreateApi(), config).then(({ message }) => {
        // this.$message.success(message)
        this.getList();
      });
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(attachmentUpdateApi(id)).then(() => this.getList());
    },
    // 删除
    handleDelete(id) {
      this.$modalSure().then(() => {
        attachmentDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList();
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    handleNodeClick(data) {
      this.tableData.attachment_category_id = data.attachment_category_id;
      this.selectItem = [];
      this.checkPicList = [];
      this.getFileList("");
    },
    // 上传成功
    handleSuccess(response) {
      if(response.status === 200) {
        this.$message.success("上传成功");
        this.getFileList("");
      } else {
        this.$message.error(response.message);
      }
    },
    // 文件列表
    getFileList(num) {
      this.loading = true;
      this.tableData.page = num ? num : this.tableData.page;
      attachmentListApi(this.tableData)
        .then(async res => {
          this.pictrueList.list = res.data.list;
          console.log(this.pictrueList.list);
          if(this.pictrueList.list.length) {
            this.isShowPic = false;
          } else {
            this.isShowPic = true;
          }
          if(
            this.$route &&
            this.$route.query.field &&
            this.$route.query.field !== "dialog"
          )
            this.checkedMore =
              window.form_create_helper.get(this.$route.query.field) || [];
          this.pictrueList.total = res.data.count;
          this.loading = false;
        })
        .catch(res => {
          this.$message.error(res.message);
          this.loading = false;
        });
    },
    pageChange(page) {
      this.tableData.page = page;
      this.selectItem = [];
      this.checkPicList = [];
      this.getFileList("");
    },
    handleSizeChange(val) {
      this.tableData.limit = val;
      this.getFileList("");
    },
    // 选中图片
    changImage(item, index, row) {
      if(!item.isSelect) {
        item.isSelect = true;
        this.selectItem.push(item);
        this.checkPicList.push(item.attachment_src);
        this.ids.push(item.attachment_id);
      } else {
        // this.checkPicList.push(item.attachment_src)
        item.isSelect = false;
        var index = this.ids.indexOf(item.attachment_id);
        if(index > -1) this.ids.splice(index, 1);
        // this.ids = []
        this.selectItem.forEach((o, i) => {
          if(o.attachment_id == item.attachment_id) {
            this.selectItem.splice(i, 1);
          }
        });
        this.checkPicList.map((el, index) => {
          if(el == item.attachment_src) {
            this.checkPicList.splice(index, 1);
          }
        });
      }
      if(
        !this.$route ||
        this.$route.fullPath !== "/merchant/config/picture" ||
        this.$route.query.field === "dialog"
      ) {
        this.pictrueList.list.map((el, i) => {
          if(el.isSelect) {
            this.selectItem.filter((el2, j) => {
              if(el.attachment_id == el2.attachment_id) {
                el.num = j + 1;
              }
            });
          } else {
            el.num = 0;
          }
        });
      }
      console.log(this.pictrueList.list);
    },
    // 点击使用选中图片
    checkPics(isButton) {
      if(this.checkPicList.length) {
        if(this.$route) {
          if(this.$route.query.type === "1") {
            if(this.checkPicList.length > 1)
              return this.$message.warning("最多只能选一张图片");
            /* eslint-disable */
            form_create_helper.set(
              this.$route.query.field,
              this.checkPicList[0]
            );
            if(isButton)form_create_helper.close(this.$route.query.field);
          }
          if(this.$route.query.type === "2") {
            this.checkedAll = [...this.checkedMore, ...this.checkPicList];
            form_create_helper.set(
              this.$route.query.field,
              Array.from(new Set(this.checkedAll))
            );
            form_create_helper.close(this.$route.query.field);
          }
          if(this.$route.query.field === "dialog") {
            let str = "";
            for(let i = 0; i < this.checkPicList.length; i++) {
              str += '<img src="' + this.checkPicList[i] + '">';
            }
            /* eslint-disable */
            nowEditor.editor.execCommand("insertHtml", str);
            nowEditor.dialog.close(true);
          }
        } else {
          console.log(this.isMore, this.checkPicList.length);
          if(this.isMore === "1" && this.checkPicList.length > 1) {
            return this.$message.warning("最多只能选一张图片");
          }
          console.log(this.checkPicList);
          this.$emit("getImage", this.checkPicList);
        }
      } else {
        this.$message.warning("请先选择图片");
      }
    },
    // 删除图片
    editPicList(tit) {
      const ids = {
        ids: this.ids
      };
      this.$modalSure().then(() => {
        picDeleteApi(ids)
          .then(({ message }) => {
            this.$message.success('删除成功');
            this.getFileList("");
            this.checkPicList = [];
            this.spliceDeleteList();
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
     // 去除选中数组中删除掉的元素
    spliceDeleteList(){
      this.selectItem.map((el, i) => {
        this.ids.filter((el2, j) => {
          if (el.attachment_id == el2) {
           this.selectItem.splice(i, 1);
          }
        });
      });
    },
    // 移动分类点击
    handleSelClick(node) {
      if(this.ids.length) {
        this.sleOptions = {
          attachment_category_name: node.attachment_category_name,
          attachment_category_id: node.attachment_category_id
        };
        this.getMove();
      } else {
        this.$message.warning("请先选择图片");
      }
    },
    getMove() {
      categoryApi(this.ids, this.sleOptions.attachment_category_id)
        .then(async res => {
          this.$message.success(res.message);
          this.clearBoth();
          this.getFileList("");
        })
        .catch(res => {
          this.clearBoth();
          this.$message.error(res.message);
        });
    },
    clearBoth() {
      this.sleOptions = {
        attachment_category_name: "",
        attachment_category_id: ""
      };
      this.checkPicList = [];
      this.ids = [];
    }
  }
};
</script>

<style scoped lang="scss">
.selectTreeClass {
  background: #d5e8fc;
}

.treeBox {
  width: 100%;
  height: 100%;
}

.upload-demo {
  display: inline-block !important;
}

.tree_w {
  padding: 20px 30px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  color: #4386c6;

  div {
    span {
      width: 100px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.custom-tree-node > div > span {
  display: inline-block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-ic {
  display: none;

  i,
  span {
    /*padding: 0 14px;*/
    font-size: 18px;
    font-weight: 600;
  }

  .svg-icon {
    color: #4386c6;
  }
}

.el-tree-node__content {
  height: 38px;
}

.el-tree-node__expand-icon {
  color: #428bca;
  /*padding: 10px 10px 0px 10px !important;*/
}

.el-tree-node__content:hover .el-ic {
  color: #428bca !important;
  display: inline-block;
}

.el-tree-node__content:hover {
  font-weight: bold;
}
 /deep/ .el-tree-node:focus > .el-tree-node__content {
  background-color: #F5F7FA!important;
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  :hover {
  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
    cursor: default;
  }

  /*background-color: #3998d9;*/
  .custom-tree-node {
    font-weight: bold;
  }

  .el-tree-node__expand-icon {
    font-weight: bold;
  }
}

.el-dialog__body {
  .upload-container .image-preview .image-preview-wrapper img {
    height: 100px;
  }

  .el-dialog .el-collapse-item__wrap {
    padding-top: 0px;
  }

  .spatial_img {
    .el-collapse-item__wrap {
      margin-bottom: 0;
      padding-top: 0px;
    }
  }

  .upload-container .image-preview .image-preview-wrapper {
    width: 120px;
  }

  .upload-container .image-preview .image-preview-action {
    line-height: 100px;
    height: 100px;
  }
}

.trees-coadd {
  min-width: 100%;
  border-radius: 4px;
  overflow-x: auto;
  position: relative;

  .scollhide {
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 10px 0 10px 0;
    box-sizing: border-box;

    .trees {
      width: 100%;
      max-height: 374px;
    }
  }

  .scollhide::-webkit-scrollbar {
    display: none;
  }
}

.conters {
  display: flex;
  flex-wrap: wrap;
}

.gridPic {
  margin-right: 20px;
  margin-bottom: 10px;
  width: 110px;
  height: 150px;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 110px;
    display: block;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #515a6e;
    font-size: 12px;
  }
  .number {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
  }
  .demo-badge {
    width: 42px;
    height: 42px;
    background: transparent;
    border-radius: 6px;
    display: inline-block;
  }
  /deep/ .el-badge__content {
    position: absolute;
    transform: translateX(50%);
    top: -10px;
    right: 0;
    height: 20px;
    border-radius: 10px;
    min-width: 20px;
  }
}

.conter {
  width: 99%;
  height: 100%;

  .bnt {
    width: 100%;
    padding: 0 13px 10px 15px;
    box-sizing: border-box;
  }

  .pictrueList {
    padding-left: 15px;
    width: 100%;

    el-image {
      width: 100%;
      border: 2px solid #fff;
    }

    .on {
      border: 2px solid #5fb878;
    }
  }

  .imagesNo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 65px auto;

    .imagesNo_sp {
      font-size: 13px;
      color: #dbdbdb;
      line-height: 3;
    }
  }
}
</style>
