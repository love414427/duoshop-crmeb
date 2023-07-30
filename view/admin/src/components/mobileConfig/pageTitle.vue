<template>
    <div class="box">
        <div class="c_row-item" v-if="this.$route.query.type !==2">
            <el-col class="label" :span="4">
                模板名称
            </el-col>
            <el-col :span="19" class="slider-box">
                <el-input v-model="name" placeholder="选填不超过15个字" maxlength="15" @change="changName" />
            </el-col>
        </div>
        <div class="c_row-item">
            <el-col class="label" :span="4">
                页面标题
            </el-col>
            <el-col :span="19" class="slider-box">
                <el-input v-model="value" placeholder="选填不超过30个字" maxlength="30" @change="changVal" />
            </el-col>
        </div>
        <div class="c_row-item acea-row row-top">
            <el-col class="label" :span="4">
                背景设置
            </el-col>
            <el-col :span="19" class="slider-box">
                <div class="acea-row row-between row-top color">
                    <el-checkbox v-model="bgColor" @change="bgColorTap">背景色</el-checkbox>
                    <el-color-picker v-model="colorPicker" @change="colorPickerTap(colorPicker)" />
                </div>
                <div class="acea-row row-between row-top color">
                    <el-checkbox v-model="bgPic" @change="bgPicTap">背景图</el-checkbox>
                    <el-radio-group v-model="tabVal" type="button" @change="radioTap">
                        <el-radio :label="index" v-for="(item,index) in picList" :key="index">
                            <span class="iconfont-diy" :class="item"></span>
                        </el-radio>
                    </el-radio-group>
                </div>
                <div v-if="bgPic">
                    <div class="title">建议尺寸：690 * 240px</div>
                    <div class="boxs" @click="modalPicTap">
                        <img :src="bgPicUrl" alt="" v-if="bgPicUrl">
                        <div class="upload-box" v-else><i class="iconfont iconjiahao" style="font-size:30px;" />添加图片</div>
                        <div class="replace" v-if="bgPicUrl">更换图片</div>
                        <!--<span class="iconfont-diy icondel_1" @click.stop="bindDelete" v-if="bgPicUrl"></span>-->
                    </div>
                </div>
            </el-col>
        </div>
        <div>
            <el-dialog :visible.sync="modalPic" width="950px" title='上传背景图'>
                <uploadPictures :isChoice="isChoice" @getPic="getPic" :gridBtn="gridBtn" :gridPic="gridPic" v-if="modalPic"></uploadPictures>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import uploadPictures from '@/components/uploadPicture';
    export default {
        name: "pageTitle",
        components: {
            uploadPictures
        },
        data(){
            return {
                value:'',
                name:'',
                isShow:true,
                picList:['icondantu','iconpingpu','iconlashen'],
                bgColor: false,
                bgPic: false,
                tabVal:'0',
                colorPicker: '#f5f5f5',
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
                bgPicUrl:''
            }
        },
        created() {
            let state = this.$store.state.mobildConfig;
            this.value = state.pageTitle
            this.name = state.pageName
            this.isShow = state.pageShow?true:false
            this.bgColor = state.pageColor?true:false
            this.bgPic = state.pagePic?true:false
            this.colorPicker = state.pageColorPicker
            this.tabVal = state.pageTabVal
            this.bgPicUrl = state.pagePicUrl
        },
        methods:{
            // 点击图文封面
            modalPicTap () {
                const _this = this;
                this.$modalUpload(function (img) {  
                    _this.bgPicUrl = img[0];   
                    _this.$store.commit('mobildConfig/UPPICURL',_this.bgPicUrl)
                });
            },
            bindDelete () {
                this.bgPicUrl = '';
            },
            getPic (pc) {
                this.$nextTick(() => {
                    this.bgPicUrl = pc.att_dir;
                    this.modalPic = false;
                    this.$store.commit('mobildConfig/UPPICURL',pc.att_dir)
                })
            },
            colorPickerTap(colorPicker){
                this.$store.commit('mobildConfig/UPPICKER',colorPicker)
            },
            radioTap(val){
                this.$store.commit('mobildConfig/UPRADIO',val)
            },
            changVal(val){
                this.$store.commit('mobildConfig/UPTITLE',val)
            },
            changName(val){
                this.$store.commit('mobildConfig/UPNAME',val)
            },
            changeState(val){
                this.$store.commit('mobildConfig/UPSHOW',val)
            },
            bgColorTap(val){
                this.$store.commit('mobildConfig/UPCOLOR',val)
            },
            bgPicTap(val){
                this.$store.commit('mobildConfig/UPPIC',val)
            }
        }
    }
</script>

<style scoped lang="scss">
.upload-box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 80px;
    height: 80px;
    background: #f7f7f7;
    font-size: 12px;
    color: #cccccc;
}
/deep/ .el-radio {
        display: inline-block;
        height: 32px;
        line-height: 30px;
        margin: 0;
        padding: 0 15px;
        color: #515a6e;
        transition: all .2s ease-in-out;
        cursor: pointer;
        border: 1px solid #dcdee2;
        border-left: 0;
        background: #fff;
        position: relative;
        &:first-child {
            border-radius: 4px 0 0 4px;
            border-left: 1px solid #dcdee2;
        }
        .el-radio__input{
            display: inline-block;
            margin-right: 4px;
            white-space: nowrap;
            position: relative;
            line-height: 1;
            vertical-align: middle;
            cursor: pointer;
            width: 0;
            margin-right: 0;
        }
        >span{
            margin-left: 0;
        }
        .el-radio__inner {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .el-radio__label{
            padding-left: 0;
        }
    }    
.slider-box .title{
    color: #999999;
    font-size: 13px;
    margin-bottom: 5px;
}
.c_row-item{
    padding: 0 15px;
    margin-top: 22px;
}
.slider-box .color{
    margin-bottom: 15px;
}
.boxs{
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    position: relative;
    .replace{
        background: rgba(0,0,0,0.4);
        border-radius: 0 0 6px 6px;
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        color: #fff;
        font-size: 12px;
        text-align: center;
        height: 24px;
        line-height: 24px;
    }
        
    .iconfont-diy{
        position: absolute;
        top: -15px;
        right: -8px;
        font-size: 25px;
        color: #999;
    }       
    img{
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }
}
    
        
</style>
