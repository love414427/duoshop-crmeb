<template>
    <div class="hot_imgs">
        <div class="title" v-if="configData.title">
            {{configData.title}}
        </div>
        <div class="list-box">
            <draggable
                    class="dragArea list-group"
                    :list="configData.list"
                    group="peoples"
                    handle=".move-icon"
            >
                <div class="item" v-for="(item,index) in configData.list" :key="index" >
                    <div class="move-icon">
                        <span class="iconfont-diy icondrag"></span>
                    </div>
                    <div class="img-box" @click="modalPicTap(item,index)">
                        <img :src="item.img" alt="" v-if="item.img">
                        <div class="upload-box" v-else><i class="el-icon-camera-solid" style="font-size: 30px;" /></div>
                        <div class="delect-btn" @click.stop="bindDelete(item,index)" v-if="!configData.isCube"><span class="iconfont-diy icondel_1"></span></div>
                    </div>
                    <div class="info">
                        <div class="info-item" v-for="(infos, key) in item.info" :key="key">
                        <span>{{ infos.title }}</span>
                        <div class="input-box" @click="getLink(index, key, item.info)">
                            <el-select v-if="infos.select" v-model="infos.value" style="">
                            <el-option v-for="itm in linkList" :key="itm.value" :label="itm.label" :value="itm.value" />
                            </el-select>
                            <el-input
                            v-model="infos.value"
                            :readonly="key == item.info.length - 1 ? true : false"
                            :placeholder="infos.tips"
                            :maxlength="infos.max"
                            v-else
                            >
                            <el-button v-if="key == item.info.length - 1" slot="append" icon="el-icon-arrow-right"></el-button>
                            </el-input>
                        </div>
                        </div>
                    </div>
                </div>
            </draggable>
            <div>
                <el-dialog :visible.sync="modalPic" width="950px" title='上传图片'>
                    <uploadPictures :isChoice="isChoice" @getPic="getPic" :gridBtn="gridBtn" :gridPic="gridPic" v-if="modalPic"></uploadPictures>
                </el-dialog>
            </div>
        </div>
        <template v-if="configData.list">
            <div class="add-btn" v-if="configData.list.length < configData.maxList">
                <el-button plain style="width: 100%; height: 40px; border-color:#1890FF; color: #1890FF;" @click="addBox">添加板块</el-button>
            </div>
        </template>
        <linkaddress ref="linkaddres" @linkUrl="linkUrl"></linkaddress>
    </div>
</template>

<script>
    import vuedraggable from 'vuedraggable'
    import uploadPictures from '@/components/uploadPicture';
    import linkaddress from '@/components/linkaddress';
    import { getPageLink } from '@/api/diy';
    export default {
        name: 'c_menu_list',
        props: {
            configObj: {
                type: Object
            },
            configNme: {
                type: String
            },
            index: {
                type: null
            },
            isRub: {
                type: Boolean,
				default: false
            }
        },
        components: {
            draggable: vuedraggable,
            linkaddress,
            uploadPictures
        },
        data () {
            return {
                defaults: {},
                configData: {},
                menus: [],
                linkList: [],
                list: [
                    {
                        title: 'aa',
                        val: ''
                    }
                ],
                modalPic: false,
                isChoice: '单选',
                gridBtn: {
                    xl: 4,
                    lg: 8,
                    md: 8,
                    sm: 8,
                    xs: 8
                },
                gridPic: {
                    xl: 6,
                    lg: 8,
                    md: 12,
                    sm: 12,
                    xs: 12
                },
                activeIndex: 0,
                indexLast: 0,
                lastObj: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.defaults = this.configObj
                this.configData = this.configObj[this.configNme]
                if (this.configData && this.configData.isSmall) this.getPageLinks();
            })
        },
        watch: {
            configObj: {
                handler (nVal, oVal) {
                    this.defaults = nVal
                    this.configData = nVal[this.configNme]
                },
                deep: true
            }
        },
        methods: {
            linkUrl(e){
                this.configData.list[this.activeIndex].info[this.indexLast].value = e
                if(this.defaults.name == "pictureCube"){
                    this.defaults.picStyle.picList[this.defaults.picStyle.tabVal].link = e
                }
            },
            getLink (index,key,item){
                this.indexLast = item.length-1
                if(key != item.length-1){
                    return
                }
                this.activeIndex = index
                this.$refs.linkaddres.modals = true
            },
            addBox () {
                if (this.configData.list.length == 0) {
                    this.lastObj.img = '';
                    this.lastObj.info[0].value = '';
                    this.lastObj.info[1].value = '';
                    this.configData.list.push(this.lastObj)
                } else {
                    let obj = JSON.parse(JSON.stringify(this.configData.list[this.configData.list.length - 1]))
                    obj.img = '';
                    obj.info[0].value = '';
                    obj.info[1].value = '';
                    this.configData.list.push(obj)
                }
            },
            // 点击图文封面
            modalPicTap (item, index) {
                let _this = this;
                _this.$modalUpload(function(img) {
                    item.img = img[0]
                    if(_this.isRub)_this.getPic(img[0])   
                })   
            },
            // 添加自定义弹窗
            addCustomDialog (editorId) {
                window.UE.registerUI('test-dialog', function (editor, uiName) {
                    let dialog = new window.UE.ui.Dialog({
                        iframeUrl: '/admin/widget.images/index.html?fodder=dialog',
                        editor: editor,
                        name: uiName,
                        title: '上传图片',
                        cssRules: 'width:1200px;height:500px;padding:20px;'
                    });
                    this.dialog = dialog;
                    // 参考上面的自定义按钮
                    var btn = new window.UE.ui.Button({
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
            },
            // 获取图片信息
            getPic (pc) {
                this.$nextTick(() => {
                    this.configData.list[this.activeIndex].img = pc;
                    let data = this.defaults.menuConfig
                    if(data && data.isCube){
                        console.log('kkkkkkkkkkk11',data.list[0].info[0].value);
                        this.defaults.picStyle.picList.splice(this.defaults.picStyle.tabVal, 1, {
                            image:pc,
                            link:data.list[0].info[0].value
                        });
                    }
                    this.modalPic = false;
                })
            },
            onBlur (){
                let data = this.defaults.menuConfig
                console.log('kkkkkkkkkkk22',data.list[0].info[0].value);
                this.defaults.picStyle.picList[this.defaults.picStyle.tabVal].link = data.list[0].info[0].value
            },
            // 删除
            bindDelete (item, index) {
                if (this.configData.list.length == 1) {
                    this.lastObj = this.configData.list[0]
                }
                this.configData.list.splice(index, 1)
            },
            /*微页面链接*/
            getPageLinks() {
                getPageLink()
                .then((res) => {
                    this.linkList = res.data;
                })
                .catch((res) => {
                    this.$message.error(res.message);
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .hot_imgs{
        margin-bottom: 20px;
        .title{
            padding: 13px 0;
            color: #999;
            font-size: 12px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
            
        .list-box{
            .item{
                position: relative;
                display: flex;
                margin-top: 20px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
                .move-icon{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 80px;
                    cursor: move;
                }
                   
                .img-box{
                    position: relative;
                    width: 70px;
                    height: 70px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                    
                        
                }                
                .info{
                    flex: 1;
                    margin-left: 22px;
                    .info-item{
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        span{
                            width: 40px;
                            font-size: 13px;
                        } 
                        .input-box{
                            flex: 1;
                           /deep/.ivu-input{
                               font-size: 13px!important
                           } 
                        }
                    }                
                }
                    
                .delect-btn{
                    position: absolute;
                    right: -7px;
                    top: -12px;
                    .iconfont-diy{
                        font-size: 25px;
                        color: #999;
                    }
                        
                }
                    
        }       
        .add-btn{
            margin-top: 10px;
        }
    }
  
    .upload-box{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f7f7f7;
        font-size: 12px;
        color: #cccccc;
        .iconfont{
            font-size: 16px;
        }
    } 
    .iconfont-diy{
        color: #DDDDDD;
        font-size: 28px;
    }
        
</style>
