<template>
    <div class="mobile-page paddingBox" :style="{marginTop:slider+'px'}">
        <div class="home_presell" :class="bgStyle?'':'presellOn'">
             <div class="title-wrapper" :class="bgStyle?'':'presellOn'">
                <img src="@/assets/images/presell_title.png" alt="">
                <div class="right">进去逛逛 <span class="iconfont-diy iconjinru"></span></div>
            </div>  
             
            <div class="list-wrapper" :class="'colum'+isOne" v-if="isOne != 2">
                <div class="item" v-for="(item,index) in list" :index="index">
                    <div class="img-box">
                        <img v-if="item.image" :src="item.image" alt="">
                        <div class="empty-box" :class="conStyle?'':'presellOn'"><span class="iconfont-diy icontupian"></span></div>
                        <span class="box-bg" v-if="presellShow" :class="conStyle?'':'presellOn'">火热预定中</span>
                    </div>
                    <div class="info">
                        <div class="price line1" :style="'color:'+themeColor" v-if="priceShow"><span>预售价:</span>¥{{item.price}}</div>
                        <div class="title line1" v-if="titleShow">{{item.store_name}}</div>
                    </div>
                </div>
            </div>
            <div class="list-wrapper colum2" v-else>
                <div class="item" v-for="(item,index) in list" :index="index" v-if="index<3" :class="conStyle?'':'presellOn'">
                    <div class="info">
                        <div class="title line1" v-if="titleShow">{{item.store_name}}</div>
                        <div class="price line1" :style="'color:'+themeColor" v-if="priceShow">¥{{item.price}}</div>
                        <span class="box-btn" v-if="presellShow">去预定<span class="iconfont-diy iconjinru"></span></span>   
                    </div>
                    <div class="img-box">
                        <img v-if="item.image" :src="item.image" alt="">
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
        name: 'home_presell',
        cname: '预售',
        configName: 'c_home_presell',
        icon: 'iconyushou1',
        type: 1, // 0 基础组件 1 营销组件 2工具组件
        defaultName: 'presellList', // 外面匹配名称
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
                    name: 'presellList',
                    timestamp: this.num,
                    setUp: {
                        tabVal: '0'
                    },
                    productList: {
                        title:'预售',
                        list:[]
                    },
             
                    titleShow: {
                        title: '是否显示名称',
                        val: true
                    },
                    priceShow: {
                        title: '是否显示价格',
                        val: true
                    },
                    presellShow: {
                        title: '是否显示预售标签',
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
                    themeColor: {
                        title: '主题风格',
                        name: 'themeColor',
                        default: [
                            {
                                item: '#E93323'
                            }
                        ],
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
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    },
                },
                navlist: [],
                txtColor: '',
                slider: '',
                tabCur: 0,
                list: [],
                activeColor: '',
                fontColor: '',
                themeColor: '',
                pageData: {},
                titleShow: true,
                priceShow: true,
                presellShow: true,
                isOne: 0,
                conStyle:1,
                bgStyle:1,
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
                    this.navlist = data.tabConfig.list;
                    this.isOne = data.tabConfig.tabVal;
                    this.slider = data.mbConfig.val;
                    this.titleShow = data.titleShow.val;
                    this.priceShow = data.priceShow.val;
                    this.presellShow = data.presellShow.val;
                    this.themeColor = data.themeColor && data.themeColor.color[0].item;
                    this.tabCur = data.tabConfig.tabCur || 0;
                    let productList = data.productList.list || [];
                    this.conStyle = data.conStyle.type;
                    this.bgStyle = data.bgStyle.type;
                    if(productList.length){
                        this.list = productList;
                    }else {
                        this.list = [
                            {
                                image: '',
                                store_name: '小米便携式蓝牙音响',
                                price: '59.00'
                          
                            },
                            {
                                image: '',
                                store_name: '小米便携式蓝牙音响',
                                price: '59.00'
                            },
                            {
                                image: '',
                                store_name: '小米便携式蓝牙音响',
                                price: '60.00'
                            },
                              {
                                image: '',
                                store_name: '小米便携式蓝牙音响',
                                price: '60.00'
                            },
                              {
                                image: '',
                                store_name: '小米便携式蓝牙音响',
                                price: '60.00'
                            },
                              {
                                image: '',
                                store_name: '小米便携式蓝牙音响',
                                price: '60.00'
                            }
                        ];
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
p{
    margin: 0;
    padding: 0;
    line-height: 1.5;
}
.presellOn{
    border-radius: 0!important;
}
.line1{
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.home_presell{ 
    border-radius: 10px;
    padding-bottom: 10px;
    background-color: #fff;
    .title-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(180deg, rgba(249, 126, 59, 0.2) 0%, rgba(249, 126, 59, 0.2) 1%, rgba(249, 126, 59, 0) 100%);
        background-image: url("../../assets/images/presell_bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        padding: 10px 13px;
        border-radius: 10px 10px 0 0;
        img{
            width: 60px;
            height: 15px;
        }  
        .right{
            font-size: 12px;
            color: #282828;
            span{
                font-size: 8px;
            }
        }     
    }    
    .list-wrapper{
        display: flex;
        padding: 0 8px;

        margin-top: 10px;
        .item{
            width: 107px;
            margin: 0 10px 8px 0;
            .img-box{
                position: relative;
                width: 107px;
                height: 107px;
                img,.box{
                    width: 100%;
                    height: 100%;
                    border-radius:10px 10px 0px 0px;
                }                  
                .box{
                    background: #D8D8D8;
                }                    
                .label{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width:46px;
                    height:22px;
                    border-radius:10px 0px 10px 0px;
                    color: #fff;
                    font-size: 13px;
                    text-align: center;
                    line-height: 22px;
                }
                .box-bg{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    text-align: center;
                    width: 82px;
                    height: 23px;
                    line-height: 23px;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAAAqCAMAAACN4OndAAAAmVBMVEUAAAD/dy37mij/eiz+hCv+fSz8kyn+gCz9hyv9jSr9iir8kCn8lin7lyj7mij7mij7mij7mij7mij7mij7mij7mij7mSj7mij7mij7mij7mSj7mij7mij7mij+gSz7mij7mij7mij7mij7mij/dy37mij7mCj/eyz+fiz+gSv8kCn9jCr9hiv9iSr8lCn8kin+hCv8lin9jiqx53KQAAAAJHRSTlMA8fHx8fHx8fHx8fHx8cdMjnpvNBgN59vYrp9eKfXt4tGUP76oKK8EAAABeklEQVRYw82Z126DQBBFx6S3xRQ3wDXZkJ7Y//9xgVm2GQXJIZHveWEfj0YczUpLA5cTzZniomaxOG24ZK6ZK+aGOVfc1twxwW9YhqR5aFE2PCmema+KN+adeWV2uxfms+ajZrt9NMhDET9blT21enitW1bd07JebS3FX2glXVZllxbzP1oTUqQja+WLabq0fK/+WkNSTOPGqj2tI/zzG2IyOdNWAClOiVnXp8YBIMXxJk2LUFSnubaCSDEYN19tBZSilCttBZRiFaO2AkpRykJb4aRYj0pb4aQohd04OCmKkbWCSXE1ImuFkmKQkmOFkmJIrhVIijPyrEBSDH0rkBSjyiiMjBVKisNIyMBYIaU4M1ZIKdqNg5RibqyQUkyMFVCKEzJWQClm1gooxdBa4aS4JGuFk2LkWMGkGLj3K5gUY3c7o6Q4IdcKJcXEswJJMSbPCiPFiHwrhBTnOe1ZAaR4X9C+1dFTFDk5DHrQfjVQHPhqMBZZnJDLN9Y/g30cqDDDAAAAAElFTkSuQmCC);
                    background-repeat: no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-size: 12px; 
                    border-radius: 0 0 0 6px;   
                }                   
            }               
            .info{
                padding: 5px 0;
                background: #fff;
                border-radius: 0px 0px 10px 10px;
                .title{
                    font-size: 13px;
                    color: #282828;
                    margin-top: 3px;
                }                    
                .old-price{
                    color: #aaa;
                    font-size: 13px;
                    text-decoration: line-through;
                }                   
                .price{
                    display: flex;
                    align-items: center;
                    color: #E93323;
                    font-weight: bold;
                    span{
                        font-size: 10px;
                        font-weight: normal;
                    }                        
                }                   
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
