<template>
<div :style="{padding:'0 '+prConfig+'px',marginTop:slider+'px'}">
    <div class="mobile-page">
        <div class="home_plant" :class="bgStyle?'':'plantOn'" :style="{marginTop:slider+'px'}">
             <div class="title-wrapper" :class="bgStyle?'':'plantOn'">
                <img src="@/assets/images/plant_title.png" alt="">
                <div class="right">好物分享 <span class="iconfont-diy iconjinru"></span></div>
            </div>  
             
            <div class="list-wrapper" :class="'colum'+isOne">
                <div class="item" v-for="(item,index) in list" :index="index">
                    <div class="img-box">
                        <div class="mask" :class="conStyle?'':'plantOn'"></div>
                        <img v-if="item.image" :src="item.image" alt="">
                        <div class="empty-box" :class="conStyle?'':'plantOn'"><span class="iconfont-diy icontupian"></span></div>
                    </div>
                    <div class="info">
                        <div class="title line1" v-if="titleShow">{{item.store_name}}</div>
                        <div class="author" v-if="avatarShow || nicknameShow">
                            <div class="acea">
                                <img v-if="avatarShow" src="@/assets/images/ren1.png" alt="">
                                <span v-if="nicknameShow">{{item.nickname}}</span>
                            </div>
                            <div class="likes" v-if="isOne == 1">
                                <span class="iconfont-h5 " :class="item.iconfont"></span>
                                {{item.likes}}
                            </div>
                        </div>
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
        name: 'home_plant',
        cname: '种草社区',
        configName: 'c_home_plant',
        icon: 'iconzhongcaoshequ1',
        type: 1, // 0 基础组件 1 营销组件 2工具组件
        defaultName: 'plantList', // 外面匹配名称
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
                    name: 'plantList',
                    timestamp: this.num,
                    setUp: {
                        tabVal: '0'
                    },
                    productList: {
                        title:'推荐组',
                        list:[]
                    },
             
                    titleShow: {
                        title: '是否显示标题',
                        val: true
                    },
                    avatarShow: {
                        title: '是否显示头像',
                        val: true
                    },
                    nicknameShow: {
                        title: '是否显示昵称',
                        val: true
                    },
                    tabConfig: {
                        title: '展示样式',
                        tabVal: 0,
                        type: 1,
                        tabList: [
                            {
                                name: '单行模式',
                                icon: 'icondanhang'
                            },
                            {
                                name: '双排模式',
                                icon: 'iconduohang'
                            }
                        ],
                        
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
                    prConfig: {
                      title: '背景边距',
                      val: 10,
                      min: 0
                    },
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    },
                    // numConfig: {
                    //     val: 6
                    // }
                },
                navlist: [],
                imgStyle: '',
                txtColor: '',
                slider: '',
                tabCur: 0,
                list: [],
                activeColor: '',
                fontColor: '',
                labelColor:'',
                pageData: {},
                titleShow: true,
                avatarShow: true,
                nicknameShow: true,
                isOne: 0,
                conStyle:1,
                bgStyle:1,
                prConfig:0,
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
                    this.avatarShow = data.avatarShow.val;
                    this.nicknameShow = data.nicknameShow.val;
                    this.tabCur = data.tabConfig.tabCur || 0;
                    let productList = data.productList.list || [];
                    this.prConfig = data.prConfig.val;
                    this.conStyle = data.conStyle.type;
                    this.bgStyle = data.bgStyle.type;
                    if(productList.length){
                        this.list = productList;
                    }else {
                        this.list = [
                            {
                                image: '',
                                store_name: '西安首家线下体验店',
                                nickname: '国宝小熊猫',
                                avatar: '',
                                iconfont: 'icon-shoucang',
                                likes: '1.5w'
                          
                            },
                            {
                                image: '',
                                store_name: '西安首家线下体验店',
                                nickname: '国宝小熊猫',
                                avatar: '',
                                iconfont: 'icon-shoucang1',
                                likes: '215'
                            },
                            {
                                image: '',
                                store_name: '西安首家线下体验店',
                                nickname: '国宝小熊猫',
                                avatar: '',
                                iconfont: 'icon-shoucang1',
                                likes: '1.5w'
                            },
                              {
                                image: '',
                                store_name: '西安首家线下体验店',
                                nickname: '国宝小熊猫',
                                avatar: '',
                                iconfont: 'icon-shoucang',
                                likes: '215'
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
.plantOn{
    border-radius: 0!important;
}
.line1{
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.home_plant{ 
    border-radius: 10px;
    .title-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 13px;
        background: linear-gradient(180deg, rgba(249, 126, 59, 0.2) 0%, rgba(249, 126, 59, 0.2) 1%, rgba(249, 126, 59, 0) 100%);
        background-image: url("../../assets/images/plant_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
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
        background-color: #fff;
        .item{
            width: 140px;
            margin: 0 10px 8px 0;
            position: relative;
            .img-box{
                position: relative;
                width: 140px;
                height: 140px;
                .mask{
                    display: block;
                    width: 140px;
                    height: 140px;
                    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10;
                    border-radius: 6px;
                }
                img,.box{
                    width: 100%;
                    height: 100%;
                    border-radius:10px 10px 0px 0px;
                }                  
                .box{
                    background: #D8D8D8;
                }                                  
            }               
            .info{
                padding: 8px 6px;
                color: #ffffff;
                font-size: 12px;
                border-radius: 0px 0px 10px 10px;
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 0;
                z-index: 11;
                .author{
                    margin-top: 3px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .acea,.likes{
                        display: flex;
                        align-items: center;
                        .icon-shoucang1{
                            color: #E93323;
                            margin-right: 3px;
                        }
                    }
                    .likes{
                        color: #999;
                    }
                    img{
                        width: 17px;
                        height: 17px;
                        border-radius: 100%;
                    }
                    span{
                        margin-left: 3px;
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
               width: 49%;
               margin: 0 1% 8px 0;
               &:nth-child(2n){
                   margin-right: 0!important;
               }
                .img-box{
                    width: 100%;
                    height: 160px;
                    .mask{
                        width: 100%;
                        height: 160px;
                    }
                }
                .info{
                    position: static;
                    color: #282828;
                    .title{
                        font-weight: bold;
                    }
                    .avatar{
                        width: 23px;
                        height: 23px;
                    }
                }
           }
        }         
    }        
}
    
</style>
