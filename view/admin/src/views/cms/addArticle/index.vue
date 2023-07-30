<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn mb20" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">文章信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="标题：" prop="title" label-for="title">
              <el-input v-model="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="作者：" prop="author" label-for="author">
              <el-input v-model="formValidate.author" placeholder="请输入" maxLength="32" element-id="author" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="文章分类：" label-for="cid" prop="cid">
              <el-select v-model="formValidate.cid" clearable placeholder="请选择" ref="configSelect" class="mb15" style="width: 90%">
                <el-option
                  :label="sleOptions.title"
                  :value="sleOptions.article_category_id"
                  style="width: 560px;height:200px;overflow: auto;background-color:#fff"
                >
                  <el-tree
                    ref="tree2"
                    :data="treeData"
                    :props="defaultProps"
                    highlight-current
                    @node-click="handleSelClick"
                  />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="文章简介：" prop="synopsis" label-for="synopsis">
              <el-input v-model="formValidate.synopsis" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="图文封面：" prop="image_input">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.image_input" class="pictrue"><img :src="formValidate.image_input"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">文章内容</span>
          <el-divider />
        </div>
        <el-form-item label="文章内容：" prop="content">
          <!-- <ueditor-from v-model="formValidate.content" :content="formValidate.content"/> -->
          <vue-ueditor-wrap v-model="formValidate.content" :config="myConfig" style="width: 90%;" @beforeInit="addCustomDialog" />
        </el-form-item>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否显示：">
              <el-radio-group v-model="formValidate.status">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
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
import { articleCategoryApi, articleAddApi, articleDetailApi, articleEditApi } from '@/api/cms'
// import ueditorFrom from '@/components/ueditorFrom'
import VueUeditorWrap from "vue-ueditor-wrap";
import SettingMer from '@/libs/settingMer';
import { getToken } from '@/utils/auth'
import { roterPre } from '@/settings'
export default {
  name: 'EditArticle',
  components: { VueUeditorWrap},
  data() {
    const url = SettingMer.https + '/upload/image/0/file?ueditor=1&token=' + getToken()
    const validateUpload = (rule, value, callback) => {
      if (this.formValidate.image_input) {
        callback()
      } else {
        callback(new Error('请上传图文封面'))
      }
    }
    const validateUpload2 = (rule, value, callback) => {
      if (!this.formValidate.cid) {
        callback(new Error('请选择文章分类'))
      } else {
        callback()
      }
    }
    return {
       myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器
        enableAutoSave: false,
        UEDITOR_HOME_URL: '/UEditor/',
        'serverUrl': url,
        'imageUrl': url,
        'imageFieldName': 'file',
        imageUrlPrefix: '',
        'imageActionName': 'upfile',
        'imageMaxSize': 2048000,
        'imageAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      },
      roterPre: roterPre,
      sleOptions: {
        title: '',
        article_category_id: ''
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      list: [],
      treeData: [],
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      formValidate: {
        cid: '',
        title: '',
        author: '',
        image_input: '',
        content: '',
        synopsis: '',
        url: '',
        is_hot: 0,
        is_banner: 0,
        status: 0
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        cid: [
          { required: true, validator: validateUpload2, trigger: 'change' }
        ],
        image_input: [
          { required: true, validator: validateUpload, trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ]
      },
      tempRoute: {}
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getDetails()
      } else {
        this.formValidate = {
          title: '',
          author: '',
          image_input: '',
          content: '',
          synopsis: '',
          url: '',
          is_hot: 0,
          is_banner: 0,
          status: 0
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    this.getList()
    if (this.$route.params.id) {
      this.setTagsViewTitle()
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `${roterPre}/cms/article` })
    },
    // 所有分类
    getList() {
      articleCategoryApi().then(res => {
        this.treeData = res.data 
        // this.sleOptions = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.image_input = img[0]
      }, tit)
    },
    // 分类点击
    handleSelClick(node) {
      this.formValidate.cid = node.article_category_id
      this.sleOptions = {
        title: node.title,
        article_category_id: node.article_category_id,
        
      }
      this.$refs.configSelect.blur();
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            articleEditApi(this.formValidate, this.$route.params.id).then(async res => {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({ path: `${roterPre}/cms/article` })
              }, 500)
            }).catch(res => {
              this.$message.error(res.message)
            })
          } else {
            articleAddApi(this.formValidate).then(async res => {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({ path: `${roterPre}/cms/article` })
              }, 500)
            }).catch(res => {
              this.$message.error(res.message)
            })
          }
        } else {
          return false
        }
      })
    },
    // 文章详情
    getDetails() {
      articleDetailApi(this.$route.params.id ? this.$route.params.id : 0).then(async res => {
        const news = res.data
        this.sleOptions.title = news.articleCategory.title
        this.sleOptions.article_category_id = news.articleCategory.article_category_id
        this.formValidate = {
          cid: news.articleCategory.article_category_id,
          title: news.title,
          author: news.author,
          image_input: news.image_input,
          content: news.content.content,
          synopsis: news.synopsis,
          url: news.url,
          is_hot: news.is_hot,
          is_banner: news.is_banner,
          status: news.status
        }
      }).catch(res => {
        this.loading = false
        this.$message.error(res.message)
      })
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.$route.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    // 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI(
        "test-dialog",
        function(editor, uiName) {
          // 创建 dialog
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/image?field=dialog",
            editor: editor,
            name: uiName,
            title: "上传图片",
            cssRules: "width:1200px;height:500px;padding:20px;"
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "dialog-button",
            title: "上传图片",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;`,
            onclick: function() {
              // 渲染dialog
              dialog.render();
              dialog.open();
            }
          });
          return btn;
        },
        37
      );
      window.UE.registerUI(
        "video-dialog",
        function(editor, uiName) {
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/video?fodder=video",
            editor: editor,
            name: uiName,
            title: "上传视频",
            cssRules: "width:800px;height:420px;padding:10px 20px 20px;"
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "video-button",
            title: "上传视频",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -320px -20px;`,
            onclick: function() {
              // 渲染dialog
              dialog.render();
              dialog.open();
            }
          });
          return btn;
        },
        38
      );
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-pagination__jump{
  margin-left: 0;
}
/deep/.el-tree-node__content{
  height: 34px;
  font-weight: normal;
}
</style>
