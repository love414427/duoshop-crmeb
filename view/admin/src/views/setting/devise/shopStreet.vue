<template>
    <div class="goodClass">
        <el-card :bordered="false" dis-hover shadow="never">
            <div class="list acea-row row-top">
                <div class="left">
                    <div class="item">
                        <div v-if="image == '01'" class="pictrue"><img src="../../../assets/images/sort01.jpg"></div>
                        <div v-if="image == '11'" class="pictrue"><img src="../../../assets/images/sort11.jpg"></div>
                        <div v-if="image == '02'" class="pictrue"><img src="../../../assets/images/sort02.jpg"></div>
                        <div v-if="image == '12'" class="pictrue"><img src="../../../assets/images/sort12.jpg"></div>
                        <div v-if="image == '03'" class="pictrue"><img src="../../../assets/images/sort03.jpg"></div>
                        <div v-if="image == '13'" class="pictrue"><img src="../../../assets/images/sort13.jpg"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="title">页面设置</div>
                    <div class="c_row-item acea-row row-top">
                        <el-col class="label" :span="6">
                            是否显示距离：
                        </el-col>
                       <el-col :span="18" class="slider-box">
                          <el-switch v-model="shopData.isShowDistance" :active-value="1" :inactive-value="0" @change="getPicUrl"/>
                        </el-col> 
                    </div>
                    <div class="c_row-item acea-row row-top">
                        <el-col class="label" :span="6">
                            页面风格：
                        </el-col>
                       <el-col :span="18" class="slider-box">
                            <el-radio-group v-model="shopData.status" @change="getPicUrl">
                                <el-radio :label="1">样式1</el-radio>
                                <el-radio :label="2">样式2</el-radio>
                                <el-radio :label="3">样式3</el-radio>
                            </el-radio-group>
                        </el-col>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { colorChange, getColorChange } from "@/api/diy";
    export default {
        name: 'goodClass',
        props: {
        },
        data () {
            return {      
                image: "01",
                activeStyle:'-1',
                shopData: {
                    isShowDistance: 1,
                    status: 1
                }
                
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo (){
                getColorChange().then(res=>{
                    this.activeStyle = res.data.status?res.data.status-1:0
                    this.shopData = {
                        isShowDistance: res.data.mer_location,
                        status: res.data.store_street_theme ? res.data.store_street_theme : 1
                    }
                    this.getPicUrl();
                })
            },
            //图片地址
            getPicUrl(){
                if(this.shopData.isShowDistance == 0){
                    this.image = this.shopData.status == 1 ? "01" : this.shopData.status == 2 ? "02" : "03"
                }else{
                    this.image = this.shopData.status == 1 ? "11" : this.shopData.status == 2 ? "12" : "13"
                }
            },
            selectTap (index) {
                this.activeStyle = index;
            },
            onSubmit (num){
                this.$emit('parentFun',true)
                let data = {
                    mer_location: this.shopData.isShowDistance,
                    store_street_theme: this.shopData.status
                }
                colorChange(data).then(res=>{
                    this.$emit('parentFun',false)
                    this.$message.success(res.message);
                }).catch((err)=>{
                    this.$message.error(err.message);
                    this.$emit('parentFun',false)
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .goodClass{
        .title{
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            position: relative;
            padding-left: 11px;
            font-weight: bold;
            &:after{
                position: absolute;
                content: ' ';
                width: 2px;
                height: 14px;
                background-color: #1890FF;
                left:0;
                top:3px;
            }
        }
        .list{
            .item{
                width: 304px;
                margin-top: 20px;
                cursor: pointer;
                .pictrue{
                    width: 100%;
                    height: 526px;
                    border: 1px solid #EEEEEE;
                    border-radius: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }
                .name{
                    font-size: 13px;
                    color: rgba(0, 0, 0, 0.85);
                    margin-top: 26px;
                    text-align: center;
                }
                &.on{
                    .pictrue{
                        border: 2px solid #1890FF;
                    }
                    .name{
                        color: #1890FF;
                    }
                }
            }
        }
    }
    .left {
        background: #F7F7F7;
        width: 310px;
        height: 550px;
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: 1px;
        margin-right: 30px;
        border: 1px solid #eee;      
    }
    .right{
        width: 540px;
    }
    .c_row-item{
        margin-top: 24px;
        .slider-box{
            .info{
                font-size: 13px;
                color: #999999;
            }
        }
    }
</style>
