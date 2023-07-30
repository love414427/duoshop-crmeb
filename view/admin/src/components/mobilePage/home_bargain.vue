<template>
    <div class="mobile-page">
        <div class="home_bargain" :class="bgStyle===0?'bargainOn':''" :style="{marginTop:`${mTop}px`}">
            <div :style="{background:`${themeColor}`}" :class="bgStyle===0?'bargainOn':''" class="bargin_count">
                <div class="title-bar" :class="bgStyle===0?'bargainOn':''">
                    <div class="title-left">
                        <img src="@/assets/images/assist_title.png" alt="">
                        <div class="avatar-wrapper">
                            <img src="@/assets/images/ren1.png" alt="">
                            <img src="@/assets/images/ren2.png" alt="">
                        </div>
                        <p class="num">1234人助力成功</p>
                    </div>
                    <div class="right">更多 <span class="iconfont-diy iconjinru"></span></div>
                </div>
                <div class="list-wrapper" :class="'colum'+isOne" v-if="isOne != 2">
                    <div class="item" v-for="(item,index) in list" :key="index" :class="conStyle?'':'bargainOn'">
                        <div class="img-box">
                            <img v-if="item.img" :src="item.img" alt="">
                            <div class="empty-box" :class="conStyle?'':'bargainOn'" v-else>
                                <span class="iconfont-diy icontupian"></span>
                            </div>
                            <div class="box-num" v-if="joinShow">{{item.num}}人参与</div>
                        </div>
                        <div class="con-box" v-if="barginShow || priceShow || bntShow || titleShow" :class="conStyle?'':'bargainOn'">
                            <div class="con-desc">
                                <div class="title line1" v-if="titleShow">{{item.store_name}}</div>
                                <div class="price">
                                    <span v-if="barginShow" :style="'color:'+priceColor" class="price-name">助力价</span>
                                    <p :style="'color:'+priceColor" v-if="priceShow">￥<span class="price-label">{{item.price}}</span></p>
                                </div>
                            </div>
                            <div v-if="bntShow && bgColor.length > 0" class="btn" :class="conStyle?'':'bargainOn'" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">发起助力</div>
                        </div>
                    </div>
                </div>
                <div class="list-wrapper colum2" v-else :class="bgStyle===0?'bargainOn':''">
                    <div class="item" v-for="(item,index) in list" :index="index" v-if="index<3" :class="conStyle?'':'bargainOn'">
                        <div class="info" v-if="titleShow || priceShow || bntShow">
                            <div class="title line1" v-if="titleShow">{{item.store_name}}</div>
                            <div class="price line1" :style="'color:'+priceColor" v-if="priceShow">¥{{item.price}}</div>
                            <span class="box-btn" v-if="bntShow" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">去助力<span class="iconfont-diy iconjinru"></span></span>   
                        </div>
                        <div class="img-box">
                            <img v-if="item.img" :src="item.img" alt="">
                            <div class="empty-box" :class="conStyle?'':'bargainOn'"><span class="iconfont-diy icontupian"></span></div>    
                        </div>    
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'home_bargain',
        cname: '助力',
        icon:'iconzhuli',
        configName: 'c_home_bargain',
        type:1,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'bargain', // 外面匹配名称
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
                    name: 'bargain',
                    timestamp: this.num,
                    setUp: {
                        tabVal: "0"
                    },
                    // numConfig: {
                    //     val: 3
                    // },
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
                    barginShow: {
                        title: '是否显示助力标签',
                        val: true
                    },
                    joinShow: {
                        title: '是否显示参与标签',
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
                    bgColor: {
                        title: '按钮背景色',
                        name: 'bgColor',
                        default: [
                            {
                                item: '#FF0000'
                            },
                            {
                                item: '#FF5400'
                            }
                        ],
                        color: [
                            {
                                item: '#FF0000'
                            },
                            {
                                item: '#FF5400'
                            }

                        ]
                    },
                    themeColor: {
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
                    priceColor: {
                      title: '主题颜色',
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
                    mbCongfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    }
                },
                bgColor: [],
                themeColor: '',
                priceColor: '',
                mTop: '',
                list: [
                    {
                        img: '',
                        store_name: '双耳戴头式无线...',
                        price: '234',
                        num: 1245
                    },
                    {
                        img: '',
                        store_name: '双耳戴头式无线...',
                        price: '234',
                        num: 1245
                    },
                    {
                        img: '',
                        store_name: '双耳戴头式无线...',
                        price: '234',
                        num: 1245
                    },
                    {
                        img: '',
                        store_name: '双耳戴头式无线...',
                        price: '234',
                        num: 1245
                    },
                    {
                        img: '',
                        store_name: '双耳戴头式无线...',
                        price: '234',
                        num: 1245
                    },
                    {
                        img: '',
                        store_name: '双耳戴头式无线...',
                        price: '234',
                        num: 1245
                    }
                ],
                priceShow: true,
                bntShow: true,
                titleShow: true,
                barginShow: true,
                joinShow: true,
                pageData: {},
                bgStyle:1,
                isOne: 0,
                conStyle:1,
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
                if(data.mbCongfig){
                    this.isOne = data.tabConfig.tabVal;
                    this.bgColor = data.bgColor.color;
                    this.themeColor = data.themeColor && data.themeColor.color[0].item;
                    this.priceColor = data.priceColor && data.priceColor.color[0].item;
                    this.mTop = data.mbCongfig.val;
                    this.priceShow = data.priceShow.val;
                    this.titleShow = data.titleShow.val;
                    this.barginShow = data.barginShow.val;
                    this.joinShow = data.joinShow.val;
                    this.conStyle = data.conStyle.type;
                    this.bgStyle = data.bgStyle.type;
                    this.bntShow = data.bntShow.val;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.bargainOn{
    border-radius: 0!important;
    .list-wrapper{
        border-radius: 0!important;
    }
}
.line1{
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.home_bargain{
    width: 100%;
    padding: 0 10px;
    border-radius: 10px;
    .bargin_count{
       border-radius: 10px; 
    }
    .title-bar{
        border-radius: 10px 10px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        .title-left{
            width: 300px;
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 15px;
        }  
        .right{
            font-size: 12px;
            color: #282828;
            width: 50px;
            span{
                font-size: 8px;
                display: inline-block;
            }
        } 
        .avatar-wrapper{
            display: flex;
            align-items: center;
            margin-left: 14px;
                img{
                    width: 15px;
                    height: 15px;
                    margin-left: -5px;
                    border: 1px solid #fff;
                    border-radius: 50%;
                }                    
            }               
            .num{
                margin-left: 3px;
                color: #999;
                font-size:13px;
            }    
    }       
    .list-wrapper{
        display: flex;
        width: 100%;
        padding: 0 10px 10px;
        border-radius: 0 0 10px 10px;
        .item{
            flex-shrink: 0;
            width: 110px;
            border-radius:8px 8px 0px 0px;
            overflow: hidden;
            margin: 0 10px 10px 0;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.08);
             border-radius:0 0 8px 8px;
            .empty-box{
                border-radius: 6px 6px 0 0!important;
            }
            .img-box{
                width: 100%;
                height: 105px;
                position: relative;
                img,.box{
                    width: 100%;
                    height: 100%;
                }  
                .box-num{
                    padding: 2px 6px;
                    border-radius: 8px;
                    background: rgba(0, 0, 0, 0.35);
                    color: #fff;
                    text-align: center;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    font-size: 11px;
                }  
            }     
            .con-box{
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #fff;
                .con-desc{
                    padding: 5px 6px 0;
                }
                .title{
                    font-size: 13px;
                    color: #333;
                    line-height: 16px;
                }
                .price{
                    display: flex;
                    color: #E93323;
                    width: 100%;
                    margin-top: 2px;
                    p{
                        font-size: 10px;
                        margin: 0;
                        padding: 0;
                        .price-label{
                            font-size: 12px;
                            font-weight: bold;
                         }
                    }   
                    
                    .price-name{
                        font-size: 11px;
                        display: inline-block;
                        width: 45px;
                        height: 17px;
                        text-align: center;
                        line-height: 16px;
                        background: #ffeae5;
                        border-radius: 2px;
                        color: #E93323;
                        font-weight: bold;
                    }      
                }    
                .btn{
                    width: 100%;
                    height: 26px;
                    line-height: 26px;
                    background: linear-gradient(90deg, #ff0000 0%, #ff5400 100%);
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                    border-radius: 0 0 8px 8px;
                    margin-top: 6px;
                }   
            }
        } 
         &.colum0{
           overflow: hidden;
           .item{
               margin-bottom: 0;
           }
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
            .btn{
                border-radius: 12px!important;
                width: 93px!important;
                margin-bottom: 5px;
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
                margin-right: 0;
                &:nth-child(1),&:nth-child(3){
                    margin-bottom: 0;
                }
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
