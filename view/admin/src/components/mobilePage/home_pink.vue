<template>
    <div style="padding: 0 10px;">
        <div class="home_pink" :class="bgStyle?'':'pinkOn'" :style="{background:bgColor,marginTop:mTop+'px'}">
            <div class="title-wrapper">
                <div class="left">
                    <img class="icon" src="@/assets/images/group_title.png" alt="">
                </div>
                <div class="right">超值团购<span class="iconfont-diy iconjinru"></span></div>
            </div>
            <div class="list-wrapper" :class="'colum'+isOne" v-if="isOne != 2">
                <div class="item" v-for="(item,index) in list" :key="index">
                    <div class="img-box">
                        <img v-if="item.img" :src="item.img" alt="">
                        <div v-else class="empty-box" :class="conStyle?'':'pinkOn'"><span class="iconfont-diy icontupian"></span></div>
                    </div>
                    <div class="info">
                        <div class="title line1" v-if="titleShow">{{item.name}}</div>
                        <div class="price">
                            <span class="label" :style="{background:txtBg,color:txtColor}" v-if="pinkShow">2人团</span>
                            <p class="num line1" :style="{color:txtColor}" v-if="priceShow">
                                <span>￥</span>
                                {{item.price}}
                            </p>
                        </div>
                    </div>
                    <div class="btn" v-if="bntShow">去拼团</div>
                </div>
            </div>
            <div class="list-wrapper colum2" v-else>
                <div class="item" v-for="(item,index) in list" :index="index" v-if="index<3" :class="conStyle?'':'presellOn'">
                    <div class="info">
                        <div class="title line1" v-if="titleShow">{{item.name}}</div>
                        <div class="price line1" v-if="priceShow">¥{{item.price}}</div>
                        <span class="box-btn" v-if="bntShow">去拼团<span class="iconfont-diy iconjinru"></span></span>   
                    </div>
                    <div class="img-box" :class="conStyle?'':'pinkOn'">
                        <img v-if="item.img" :src="item.img" alt="">
                        <div class="empty-box"><span class="iconfont-diy icontupian"></span></div>    
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'home_pink',
        cname: '拼团',
        icon: 'iconpintuan2',
        configName: 'c_home_pink',
        type:1,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'combination', // 外面匹配名称
        props: {
            index: {
                type: null
            },
            num: {
                type: null
            }
        },
        computed: {
            ...mapState('mobildConfig', ['defaultArray'])
        },
        watch: {
            pageData: {
                handler (nVal, oVal) {
                    this.setConfig(nVal)
                },
                deep: true
            },
            num: {
                handler (nVal, oVal) {
                    let data = this.$store.state.mobildConfig.defaultArray[nVal]
                    this.setConfig(data)

                },
                deep: true
            },
            'defaultArray': {
                handler (nVal, oVal) {
                    let data = this.$store.state.mobildConfig.defaultArray[this.num]
                    this.setConfig(data);
                },
                deep: true
            }
        },
        data () {
            return {
                // 默认初始化数据禁止修改
                defaultConfig: {
                    name: 'combination',
                    timestamp: this.num,
                    setUp: {
                        tabVal: '0'
                    },
                    priceShow: {
                        title: '是否显示价格',
                        val: true
                    },
                    bntShow: {
                        title: '是否显示按钮',
                        val: true
                    },
                    titleShow: {
                        title: '是否显示名称',
                        val: true
                    },
                    pinkShow: {
                        title: '是否显示拼团标签',
                        val: true
                    },
                    tabConfig: {
                        title: '展示样式',
                        tabVal: 0,
                        type: 1,
                        tabList: [
                            {
                                name: '单行展示',
                                icon: 'icondanhang'
                            },
                            {
                                name: '多行展示',
                                icon: 'iconduohang'
                            },
                            {
                                name: '板块模式',
                                icon: 'iconyangshi9'
                            }
                        ],
                        
                    },
                    txtColor: {
                        title: '文字背景色',
                        name: 'themeColor',
                        default: [{
                            item: 'rgba(255,68,68,0.1)'
                        }],
                        color: [
                            {
                                item: 'rgba(255,68,68,0.1)'
                            }

                        ]
                    },
                   bgStyle: {
                        title: '背景样式',
                        name: 'bgStyle',
                        type: 1,
                        list: [
                            {
                                val: '直角',
                                icon: 'iconPic_square'
                            },
                            {
                                val: '圆角',
                                icon: 'iconPic_fillet'
                            }
                        ]
                    },
                    conStyle: {
                        title: '内容样式',
                        name: 'conStyle',
                        type: 1,
                        list: [
                            {
                                val: '直角',
                                icon: 'iconPic_square'
                            },
                            {
                                val: '圆角',
                                icon: 'iconPic_fillet'
                            }
                        ]
                    },
                    bgColor: {
                        title: '背景颜色',
                        name: 'themeColor',
                        default: [{
                            item: '#fff'
                        }],
                        color: [
                            {
                                item: '#fff'
                            }
                        ]
                    },
                    themeColor: {
                        title: '主题风格',
                        name: 'themeColor',
                        default: [{
                            item: '#E93323'
                        }],
                        color: [
                            {
                                item: '#E93323'
                            }

                        ]
                    },
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    },
                },
                list: [
                    {
                        img: '',
                        name: '小米家用电饭煲',
                        price: '234',
                        num: '1234'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲',
                        price: '234',
                        num: '1234'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲',
                        price: '234',
                        num: '1234'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲',
                        price: '234',
                        num: '1234'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲',
                        price: '234',
                        num: '1234'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲',
                        price: '234',
                        num: '1234'
                    }
                ],
                txtColor: '',
                mTop: '',
                txtBg: '',
                pageData: {},
                priceShow: true,
                bntShow: true,
                titleShow: true,
                pinkShow: true,
                bgColor: '',
                conStyle:1,
                bgStyle:1,
                isOne: 0,
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.pageData = this.$store.state.mobildConfig.defaultArray[this.num]
                this.setConfig(this.pageData)
            })
        },
        methods: {
            setConfig (data) {
                if(!data) return
                if(data.mbConfig){
                    this.isOne = data.tabConfig.tabVal;
                    this.txtColor = data.themeColor.color[0].item;
                    this.mTop = data.mbConfig.val;
                    this.txtBg = data.txtColor.color[0].item;
                    this.priceShow = data.priceShow.val;
                    this.bntShow = data.bntShow.val;
                    this.titleShow = data.titleShow.val;
                    this.pinkShow = data.pinkShow.val;
                    this.bgColor = data.bgColor.color[0].item;
                    this.conStyle = data.conStyle.type;
                    this.bgStyle = data.bgStyle.type;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.pinkOn{
    border-radius: 0!important;
}
.line1{
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mobile-page{
    padding-top: 10px;
}
.home_pink{
    padding: 10px 8px;
    background: #fff;
    border-radius: 10px;
    .title-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            .icon{
                width: 60px;
                height: 15px;
            }                              
        } 
        .right{
            font-size: 12px;
            span{
                font-size: 8px;
            }
        }        
    }      
    .list-wrapper{
        display: flex;
        margin-top: 10px;
        .item{
            flex-shrink: 0;
            width: 95px;
            background: #fff;
            border-radius: 8px;
            margin: 0 10px 10px 0;
            .img-box{
                position: relative;
                width: 100%;
                height: 110px;
                img,.box{
                     width: 100%;
                    height: 100%;
                    border-radius:8px 8px 0px 0px;
                }                   
                .box{
                    background: #D8D8D8;
                }                   
                .num{
                    position: absolute;
                    left: 6px;
                    top: 6px;
                    width:70px;
                    height:16px;
                    line-height: 16px;
                    text-align: center;
                    background:rgba(0,0,0,0.1);
                    box-shadow:1px 1px 4px 0px rgba(0,0,0,0.06);
                    border-radius:8px;
                    color: #fff;
                    font-size: 12px;
                }                   
            }                
            .info{
                padding: 5px 0;
                .title{
                    font-size: 12px;
                    color: #282828;
                }                   
                .price{
                    display: flex;
                    align-items: center;
                    margin-top: 2px;
                    .label{
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        padding: 0 3px;
                        margin-right: 3px;
                        font-size:9px;
                        font-weight:400;
                        text-shadow:1px 1px 4px rgba(0,0,0,0.06);
                        color: #FF4444;
                        width: 46px;
                    }                        
                    .num{
                        color: #FF4444;
                        font-size: 14px;
                        font-weight: bold;
                        width: 40px;
                        span{
                            font-size: 12px;
                        }                            
                    }
                    p{
                        margin: 0;
                    }                        
                }      
            }                
            .btn{
                width:95px;
                height:24px;
                line-height: 24px;
                background: linear-gradient(90deg, #FF0000 0%, #FF5400 100%);
                border-radius: 12px;
                text-align: center;
                color: #fff;
                font-size: 10px;
            }
        }  
        &.colum0{
           overflow: hidden;
        }
        &.colum1{
            flex-wrap: wrap;
            justify-content: space-between;
           .item{
               width: 31.3%;
               &:nth-child(3n){
                   margin-right: 0!important;
               }
                .img-box{
                    width: 100%;
                }
           }
        } 
        &.colum2{
            overflow: hidden;
            display: block;
            .item{
                position: relative;
                background-size: cover;
                border-radius: 6px;
                width: 166px;
                padding: 11px 11px 15px;
                .img-box{
                    position: absolute;
                }
                .box-btn{
                    display: block;
                    margin-top: 3px;
                    color: #fff;
                    font-size: 12px;
                    font-weight: bold;
                    width: 55px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 8px;
                    span{
                        font-size: 8px;
                    }
                }
                .info{
                    background: transparent;
                    .title{
                        font-size: 15px;
                        color: #333333;
                        font-weight: bold;
                        line-height: 17px;
                    }
                    .price{
                        display: block;
                        font-size: 15px;
                        font-weight: bold;
                        margin-top: 4px;
                        color: #e93323;
                    }
                    
                }
                &:nth-child(1){
                    height: 190px;
                    float: left;
                    background-image: url("../../assets/images/c_presell_bg0.png");
                    .img-box{
                        width: 80px;
                        height: 80px;
                        right: 13px;
                        bottom: 8px;
                    }
                    .box-btn{
                        background: linear-gradient(90deg, #fd5d48 0%, #f63724 100%);
                    }
                }
                &:nth-child(2), &:nth-child(3){
                    float: right;
                    height: 90px;
                    margin-right: 0;
                    .img-box{
                        width: 60px;
                        height: 60px;
                        right: 5px;
                        bottom: 5px;
                    }
                    .title{
                        width: 75px;
                    }
                }
                &:nth-child(2){
                    background-image: url("../../assets/images/c_presell_bg2.png");
                    .box-btn{
                       background: linear-gradient(90deg, #fdca1a 0%, #f7b21f 100%);
                    }
                    .price{
                        color: #F4AB0B;
                    }
                }
                &:nth-child(3){
                     background-image: url("../../assets/images/c_presell_bg1.png");
                    .box-btn{
                       background: linear-gradient(90deg, #ffb052 0%, #fe961a 100%);
                    }
                    .price{
                        color: #FD8A00;
                    }
                }
                

            }
            
        }           
    }        
}
</style>
