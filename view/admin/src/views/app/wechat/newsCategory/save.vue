<template>
  <div class="divBox">
    <el-card class="box-card">
      <router-link :to="{path:roterPre+'/app/wechat/newsCategory'}">
        <el-button size="mini" class="mr20 mb20" icon="el-icon-back">返回</el-button>
      </router-link>
      <el-row type="flex" :gutter="24" class="save_from">
        <el-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
          <div v-for="(item, i) in data" :key="i">
            <div v-if="i === 0" :class="{ checkClass:i === current}" @click="onSubSave(i)" @mouseenter="isDel=true" @mouseleave="isDel=false">
              <div class="news_pic" :style="{backgroundImage: 'url(' + (item.image_input ? item.image_input : baseImg) + ')',backgroundSize:'100% 100%'}">
                <el-button v-show="isDel" type="danger" circle icon="el-icon-delete" @click="del(i)" />
              </div>
              <span class="news_sp">{{ item.title }}</span>
            </div>
            <div v-else class="news_cent" :class="{ checkClass:i === current}" @click="onSubSave(i)">
              <span class="news_sp1">{{ item.title }}</span>
              <div class="news_cent_img ivu-mr-8"><img :src="item.image_input ? item.image_input : baseImg"></div>
              <el-button type="danger" circle icon="md-trash" @click="del(i)" />
            </div>
          </div>
          <div class="acea-row row-center-wrapper">
            <el-button icon="ios-download-outline" class="mt20" type="primary" @click="handleAdd">添加图文</el-button>
          </div>
        </el-col>
        <el-col :xl="18" :lg="18" :md="12" :sm="24" :xs="24">
          <el-form
            ref="saveForm"
            class="saveForm"
            :model="saveForm"
            label-width="100px"
            :rules="ruleValidate"
            @submit.native.prevent
          >
            <el-row :gutter="24">
              <el-col :span="24" class="ml40">
                <el-form-item label="标题：" prop="title">
                  <el-input
                    v-model="saveForm.title"
                    style="width: 60%;"
                    type="text"
                    placeholder="请输入文章标题"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="ml40">
                <el-form-item label="作者：" prop="author">
                  <el-input
                    v-model="saveForm.author"
                    style="width: 60%;"
                    type="text"
                    placeholder="请输入作者名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="ml40">
                <el-form-item label="摘要：" prop="synopsis">
                  <el-input
                    v-model="saveForm.synopsis"
                    style="width: 60%;"
                    type="textarea"
                    placeholder="请输入摘要"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="ml40">
                <el-form-item label="图文封面：" prop="image_input">
                  <div class="upLoadPicBox" @click="modalPicTap('单选')">
                    <div v-if="saveForm.image_input" class="pictrue"><img :src="saveForm.image_input"></div>
                    <div v-else class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="正文：" prop="content">
                  <ueditor-from v-model="saveForm.content" :content="saveForm.content" />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="ml40">
                <el-form-item>
                  <el-button type="primary" class="submission" @click="subFrom('saveForm')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
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
import ueditorFrom from '@/components/ueditorFrom'
import { wechatNewsAddApi, wechatNewsInfotApi, wechatNewsUpdateApi } from '@/api/app'
import { roterPre } from '@/settings'
export default {
  name: 'Save',
  components: { ueditorFrom },
  data() {
    const validateUpload = (rule, value, callback) => {
      if (this.saveForm.image_input) {
        callback()
      } else {
        callback(new Error('请上传图文封面'))
      }
    }
    return {
      roterPre: roterPre,
      ruleValidate: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        image_input: [
          { required: true, validator: validateUpload, trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入正文', trigger: 'change' }
        ],
        synopsis: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' }
        ]
      },
      isChoice: '单选',
      dragging: null,
      isDel: false,
      msg: '',
      count: [],
      baseImg: require('../../../../assets/images/bjt.png'),
      saveForm: {
        title: '',
        author: '',
        synopsis: '',
        image_input: '',
        content: ''
      },
      current: 0,
      data: [
        {
          title: '',
          author: '',
          synopsis: '',
          image_input: '',
          content: ''
        }
      ],
      uploadList: [],
      modalPic: false,
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8
      }
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.info()
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.info()
    }
  },
  methods: {
    modalPicTap() {
      const _this = this
      _this.$modalUpload(function(img) {
        _this.saveForm.image_input = img[0]
      })
    },
    // 添加图文按钮
    handleAdd() {
      if (!this.check()) return false
      const obj = {
        title: '',
        author: '',
        synopsis: '',
        image_input: '',
        content: ''
      }
      this.data.push(obj)
    },
    // 点击模块
    onSubSave(i) {
      this.current = i
      this.data.map((item, index) => {
        /* eslint-disable */
        if (index === this.current){
          this.saveForm = this.data[this.current];
        }
      })
    },
    // 删除
    del (i) {
      if (i === 0) {
        this.$message.warning('不能再删除了');
      } else {
        this.data.splice(i, 1);
        this.saveForm = {};
      }
    },
    // 详情
    info () {
      wechatNewsInfotApi(this.$route.params.id).then(async res => {
        let info = res.data;
        this.data = info.article
        this.data.map(item => {
          item.content = item.content.content
        })
        this.saveForm = this.data[this.current]
      }).catch(res => {
        this.$message.error(res.message);
      })
    },
    // 提交数据
    subFrom (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = [this.saveForm]
          data = this.current === '' ? data : this.data
          this.$route.params.id ? wechatNewsUpdateApi(this.$route.params.id,this.data).then(async res => {
            this.$message.success(res.message);
            setTimeout(() => {
              this.$router.push({ path: `${roterPre}/app/wechat/newsCategory` });
            }, 500);
          }).catch(res => {
            this.$message.error(res.message);
          }) : wechatNewsAddApi([this.saveForm]).then(async res => {
            this.$message.success(res.message);
            setTimeout(() => {
              this.$router.push({ path: `${roterPre}/app/wechat/newsCategory` });
            }, 500);
          }).catch(res => {
            this.$message.error(res.message);
          })
        } else {
          return false;
        }
      })
    },
    check () {
      for (let index in this.data){
        if(!this.data[index].title){
          this.$message.warning('请输入文章的标题');
          return false;
        }
        else if(!this.data[index].author){
          this.$message.warning('请输入文章的作者');
          return false;
        }
        else if(!this.data[index].synopsis){
          this.$message.warning('请输入文章的摘要');
          return false;
        }
        else if(!this.data[index].image_input){
          this.$message.warning('请输入文章的图文封面');
          return false;
        }
        else if(!this.data[index].content){
          this.$message.warning('请输入文章的内容');
          return false;
        }else{
          return true
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .btndel{
    position: absolute;
    z-index: 111;
    width: 20px !important;
    height: 20px !important;
    left: 46px;
    top: -4px;
  }
  .save_from{
    .el-button--danger{
      background:#FFF !important;
      color: #999 !important;
      border:1px solid  #eee !important;
    }
    .el-button--danger:hover{
      background:#FF5D5F !important;
      border:1px solid #fff !important;
      color: #fff !important;
    }
  }
  .picBox{
    display: inline-block;
    cursor: pointer;
  }
  .checkClass{
    border: 1px dashed #0091FF !important;
  }
  .checkClass2{
    border: 1px solid #0091FF !important;
  }
  .submission{
    width:10%;
    margin-left:27px;
  }
  .cover{
    width: 60px;
    height: 60px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .Refresh{
    font-size: 12px;
    color: #1890FF;
    cursor: pointer;
    line-height: 35px;
    display: inline-block;
  }
  .news_pic{
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    background-size: 100%;
    background-position: center center;
    border-radius: 5px 5px 0 0;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .news_sp{
    font-size: 12px;
    color: #000000;
    background: #fff;
    width: 100%;
    line-height: 21px;
    padding: 7px 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    border-bottom: 1px dashed #eee;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .news_cent{
    width: 100%;
    height: auto;
    background: #fff;
    border-bottom: 1px dashed #eee;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    .news_sp1{
      font-size: 12px;
      color: #000000;
      width: 71%;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 19px;
    }
    .news_cent_img{
      width: 81px;
      height: 46px;
      border-radius: 6px;
      overflow: hidden;
    }
    img{
      width: 100%;
      height: 100%;
    }

  }

</style>
