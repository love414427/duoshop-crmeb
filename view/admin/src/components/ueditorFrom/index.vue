<template>
  <div>
    <vue-ueditor-wrap v-model="contents" :config="myConfig" style="width: 90%;" @beforeInit="addCustomDialog" />
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
import VueUeditorWrap from 'vue-ueditor-wrap'
import { roterPre } from '@/settings'
import SettingMer from '@/libs/settingMer'
import { getToken } from '@/utils/auth'
export default {
  name: 'Index',
  components: { VueUeditorWrap },
  scrollerHeight: {
    content: String,
    default: ''
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    const url = SettingMer.https + '/upload/image/0/file?ueditor=1&token=' + getToken()
    return {
      contents: this.content,
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        elementPathEnabled: false,
        wordCount: false,
        enableAutoSave: false,
        UEDITOR_HOME_URL: '/UEditor/',
        'serverUrl': url,
        'imageUrl': url,
        'imageFieldName': 'file',
        imageUrlPrefix: '',
        'imageActionName': 'upfile',
        'imageMaxSize': 2048000,
        'imageAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      }
    }
  },
  watch: {
    content: function(val) {
      this.contents = this.content
      // this.$emit('input', val)
    },
    contents: function(val) {
      this.$emit('input', val)
    }
  },
  created() {
  },
  methods: {
    // 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI('test-dialog', function(editor, uiName) {
        // 创建 dialog
        const dialog = new window.UE.ui.Dialog({
          // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
          iframeUrl: roterPre + '/setting/uploadPicture?field=dialog',
          // 需要指定当前的编辑器实例
          editor: editor,
          // 指定 dialog 的名字
          name: uiName,
          // dialog 的标题
          title: '上传图片',
          // 指定 dialog 的外围样式
          cssRules: 'width:1000px;height:620px;padding:20px;'
        })
        this.dialog = dialog
        var btn = new window.UE.ui.Button({
          name: 'dialog-button',
          title: '上传图片',
          cssRules: `background-image: url(@/assets/images/icons.png);background-position: -726px -77px;`,
          onclick: function() {
            // 渲染dialog
            dialog.render()
            dialog.open()
          }
        })
        return btn
      }, 37)
    }
  }
}
</script>

<style scoped>

</style>
