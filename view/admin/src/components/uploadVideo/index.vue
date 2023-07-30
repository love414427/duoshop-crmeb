<template>
  <div>
    <div class="mt20 ml20">
      <el-input v-model="videoLink" placeholder="请输入视频链接" style="width: 300px;" />
      <input ref="refid" type="file" style="display:none" @change="zh_uploadFile_change">
      <el-button type="primary" icon="ios-cloud-upload-outline" class="ml10" @click="zh_uploadFile">{{ videoLink ? '确认添加' : '上传视频' }}</el-button>
      <el-progress v-if="upload.videoIng" :stroke-width="20" :percentage="progress" :text-inside="true" style="margin-top: 20px;" />
      <div v-if="formValidate.video_link" class="iview-video-style">
        <video style="width:100%;height: 100%!important;border-radius: 10px;" :src="formValidate.video_link" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
        <div class="mark" />
        <i class="iconv el-icon-delete" @click="delVideo" />
      </div>
    </div>
    <div class="mt50 ml20">
      <el-button type="primary" @click="uploads">确认</el-button>
    </div>
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
import { productGetTempKeysApi } from '@/api/product'
import '../../../public/UEditor/dialogs/internal'
export default {
  name: 'Vide11o',
  props: {
    isDiy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      upload: {
        videoIng: false // 是否显示进度条；
      },
      progress: 20, // 进度条默认0
      videoLink: '',
      formValidate: {
        video_link: ''
      }
    }
  },
  methods: {
    // 删除视频；
    delVideo() {
      const that = this
      that.$set(that.formValidate, 'video_link', '')
    },
    zh_uploadFile() {
      if (this.videoLink) {
        this.formValidate.video_link = this.videoLink
      } else {
        this.$refs.refid.click()
      }
    },
    zh_uploadFile_change(evfile) {
      const that = this
      const suffix = evfile.target.files[0].name.substr(evfile.target.files[0].name.indexOf('.'))
      if (suffix !== '.mp4') {
        return that.$message.error('只能上传MP4文件')
      }
      productGetTempKeysApi().then(res => {
        that.$videoCloud.videoUpload({
          type: res.data.type,
          evfile: evfile,
          res: res,
          uploading(status, progress) {
            that.upload.videoIng = status
            console.log(status, progress)
          }
        }).then(res => {
          that.formValidate.video_link = res.url || res.data.src
          that.$message.success('视频上传成功')
          that.progress = 100
          that.upload.videoIng = false
        }).catch(res => {
          that.$message.error(res)
        })
      })
    },
    uploads() {
      if (!this.formValidate.video_link && !this.videoLink) {
        return this.$message.error('您还没有上传视频！')    
      } else if (this.videoLink != "" && !this.formValidate.video_link) {
        return this.$message.error('请点击确认添加按钮！')  
      }
     if(this.isDiy){
        this.$emit('getVideo',this.formValidate.video_link)
      }else if(nowEditor){
        nowEditor.dialog.close(true)
        nowEditor.editor.setContent("<video src='" + this.formValidate.video_link + "' controls='controls'></video>", true)
      }
    }
  }
}
</script>

<style scoped>
    .iview-video-style{
        width: 40%;
        height: 180px;
        border-radius: 10px;
        background-color: #707070;
        margin-top: 10px;
        position: relative;
        overflow: hidden;
    }
    .iview-video-style .iconv{
        color: #fff;
        line-height: 180px;
        width: 50px;
        height: 50px;
        display: inherit;
        font-size: 26px;
        position: absolute;
        top: -74px;
        left: 50%;
        margin-left: -25px;
    }
    .iview-video-style .mark{
        position: absolute;
        width: 100%;
        height: 30px;
        top: 0;
        background-color: rgba(0,0,0,.5);
        text-align: center;
    }
  .mt50{
    margin-top: 50px;
  }
</style>
