<template>
    <div class="box" v-if="configData">
		<WangEditor
		  :content="configData.val"
		  @editorContent="getEditorContent"
		  style="width: 100%; height: 60%"
		></WangEditor>
    </div>
</template>

<script>
    import WangEditor from "@/components/wangEditor/index.vue";
    import SettingMer from '@/libs/settingMer';
    import { getToken } from '@/utils/auth'

    export default {
        name: 'c_page_ueditor',
        props: {
            configObj: {
                type: Object
            },
            configNme: {
                type: String
            }
        },
        components: { WangEditor },
        data () {
          const url = SettingMer.https + '/upload/image/0/file?ueditor=1&token=' + getToken()
            return {
                myConfig: {
                    autoHeightEnabled: false, // 编辑器不自动被内容撑高
                    initialFrameHeight: 350, // 初始容器高度
                    initialFrameWidth: '100%', // 初始容器宽度
                    UEDITOR_HOME_URL: '/UEditor/',
                    'serverUrl': url,
                    'imageUrl': url,
                    'imageFieldName': 'file',
                    imageUrlPrefix: '',
                    'imageActionName': 'upfile',
                    'imageMaxSize': 2048000,
                    'imageAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
                },
                description: '',
                defaults: {},
                configData:{}
            }
        },
        created () {
            this.defaults = this.configObj
            this.configData = this.configObj[this.configNme]
        },
        watch: {
            configObj: {
                handler (nVal, oVal) {
                    this.defaults = nVal
                    this.configData = nVal[this.configNme]
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
			getEditorContent(data) {
			  this.configData.val = data;
			},
            // 添加自定义弹窗
            addCustomDialog (editorId) {
                window.UE.registerUI('test-dialog', function (editor, uiName) {
                    // 创建 dialog
                    let dialog = new window.UE.ui.Dialog({
                        iframeUrl: '/admin/admin/widget.images/index.html?fodder=dialog',
                        editor: editor,
                        name: uiName,
                        title: '上传图片',
                        cssRules: 'width:1200px;height:500px;padding:20px;'
                    });
                    this.dialog = dialog;
                    let btn = new window.UE.ui.Button({
                        name: 'dialog-button',
                        title: '上传图片',
                        cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;`,
                        onclick: function () {
                            // 渲染dialog
                            dialog.render();
                            dialog.open();
                        }
                    });
                    return btn;
                }, 37);
                window.UE.registerUI('video-dialog', function (editor, uiName) {
                    let dialog = new window.UE.ui.Dialog({
                        iframeUrl: '/admin/admin/widget.video/index.html?fodder=video',
                        editor: editor,
                        name: uiName,
                        title: '上传视频',
                        cssRules: 'width:1000px;height:500px;padding:20px;'
                    });
                    this.dialog = dialog;
                    let btn = new window.UE.ui.Button({
                        name: 'video-button',
                        title: '上传视频',
                        cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -320px -20px;`,
                        onclick: function () {
                            // 渲染dialog
                            dialog.render();
                            dialog.open();
                        }
                    });
                    return btn;
                }, 38);
            }
        }
    }
</script>

<style scoped>

</style>
