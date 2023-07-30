<template>
    <div style="padding: 0 10px 10px;">
        <div class="mobile-page"  :style="[{'background':bg},{marginTop:cSlider+'px'}]" :class="bgStyle===0?'':'pageOn'">
            <div class="title-box">
                <span><img class="icon" src="@/assets/images/broadcast_title.png" alt="" /></span>
                <span>进入频道<span class="iconfont-diy iconjinru"></span></span>
            </div>
            <div class="live-wrapper-a live-wrapper-c" v-if="listStyle == 0">
                <div class="live-item-a"  v-for="(item,index) in live" :key="index">
                    <div class="img-box">
                        <div class="empty-box on">
                            <span class="iconfont-diy icontupian"></span>
                        </div>
                        <div class="label bgblue" v-if="item.type==1">
                            <span class="txt"><span class="iconfont-diy iconweikaishi" style="margin-right: 5px"></span>预告</span>
                            <span class="msg">7/29 10:00</span>
                        </div>
                        <div class="label bggary" v-if="item.type==0">
                            <span class="iconfont-diy iconyijieshu" style="margin-right: 5px"></span>回放
                        </div>
                        <div class="label bgred" v-if="item.type==2">
                            <span class="iconfont-diy iconzhibozhong" style="margin-right: 5px"></span>直播中
                        </div>
                    </div>    
                </div>
            </div>
            <div class="live-wrapper-a" v-if="listStyle == 1">
                <div class="live-item-a"  v-for="(item,index) in live" :key="index">
                    <div class="img-box">
                        <div class="empty-box on">
                            <span class="iconfont-diy icontupian"></span>
                        </div>
                        <div class="label bgblue" v-if="item.type==1">
                            <span class="txt"><span class="iconfont-diy iconweikaishi" style="margin-right: 5px"></span>预告</span>
                            <span class="msg">7/29 10:00</span>
                        </div>
                        <div class="label bggary" v-if="item.type==0">
                            <span class="iconfont-diy iconyijieshu" style="margin-right: 5px"></span>回放
                        </div>
                        <div class="label bgred" v-if="item.type==2">
                            <span class="iconfont-diy iconzhibozhong" style="margin-right: 5px"></span>直播中
                        </div>
                    </div>
                    <div class="info">
                        <div class="title">直播标题直播标题直播标 题直播标题</div>
                        <div class="people">
                            <span>樱桃小丸子</span>
                        </div>
                        <div class="goods-wrapper">
                            <template v-if="item.goods.length>0">
                                <div class="goods-item" v-for="(goods,index) in item.goods" :key="index" >
                                    <img :src="goods.img" alt="">
                                    <span>￥{{goods.price}}</span>
                                </div>
                            </template>
                            <template v-else>
                                <div class="empty-goods" >
                                    暂无商品
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <!--双列-->
            <div class="live-wrapper-b" v-if="listStyle == 2">
                <div class="live-item-b"  v-for="(item,index) in live" :key="index">
                    <div class="img-box">
                        <div class="empty-box on">
                            <span class="iconfont-diy icontupian"></span>
                        </div>
                        <div class="label bgblue" v-if="item.type==1">
                            <span class="txt"><span class="iconfont-diy iconweikaishi" style="margin-right: 5px"></span>预告</span>
                            <span class="msg">7/29 10:00</span>
                        </div>
                        <div class="label bggary" v-if="item.type==0">
                            <span class="iconfont-diy iconyijieshu" style="margin-right: 5px"></span>回放
                        </div>
                        <div class="label bgred" v-if="item.type==2">
                            <span class="iconfont-diy iconzhibozhong" style="margin-right: 5px"></span>直播中
                        </div>
                    </div>
                    <div class="info">
                        <div class="title">直播标题直播标题直播标 题直播标题</div>
                        <div class="people">
                            <span>樱桃小丸子</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'wechat_live',
        cname: '小程序直播',
        configName: 'c_wechat_live',
        type: 1, // 0 基础组件 1 营销组件 2工具组件
        defaultName: 'liveBroadcast', // 外面匹配名称
        icon: 'iconxiaochengxuzhibo3',
        props: {
            index: {
                type: null,
                default: -1
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
                    name: 'liveBroadcast',
                    timestamp: this.num,
                    bg: {
                        title: '背景色',
                        name: 'bg',
                        default: [{
                            item: '#fff'
                        }],
                        color: [
                            {
                                item: '#fff'
                            }
                        ]
                    },
                    listStyle: {
                        title: '列表样式',
                        name: 'listStyle',
                        type: 0,
                        list: [
                            {
                                val: '单行',
                                icon: 'icondanhang'
                            },
                            {
                                val: '多行',
                                icon: 'iconduohang'
                            },
                            {
                                val: '双排',
                                icon: 'iconlianglie'
                            }
                        ]
                    },
                    bgStyle: {
                        title: '背景样式',
                        name: 'bgStyle',
                        type: 0,
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
                    }
                },
                live: [
                    {
                        title: '直播中',
                        name: 'playBg',
                        type: 2,
                        color: '',
                        icon: 'iconzhibozhong',
                        goods: []
                    },
                    {
                        title: '回放',
                        name: 'endBg',
                        type: 0,
                        color: '',
                        icon: 'iconyijieshu',
                        goods: [
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            },
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            },
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            }
                        ]
                    },
                    {
                        title: '预告',
                        name: 'notBg',
                        type: 1,
                        color: '',
                        icon: 'iconweikaishi',
                        goods: [
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            },
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            }
                        ]
                    },
                     {
                        title: '直播中',
                        name: 'playBg',
                        type: 2,
                        color: '',
                        icon: 'iconzhibozhong',
                        goods: [
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            },
                            {
                                img: 'http://admin.crmeb.net/uploads/attach/2020/05/20200515/4f17d0727e277eb86ecc6296e96c2c09.png',
                                price: '199'
                            }
                        ]
                    },
                ],
                cSlider: '',
                confObj: {},
                pageData: {},
                listStyle: 0,
                bgStyle:0,
                bg:'',
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
                    this.cSlider = data.mbConfig.val;
                    this.listStyle = data.listStyle.type;
                    this.bg = data.bg.color[0].item;
                    this.bgStyle = data.bgStyle.type;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .mobile-page{
        background: #f5f5f5;
        font-size: 12px;
    }
    .pageOn{
        border-radius: 8px!important;
    }    
    .live-wrapper-a{
        padding: 5px 10px 0;
        margin-top: 6px;
        .live-item-a{
            display: flex;
            position: relative;
            margin-bottom: 10px;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            .img-box{
                position: relative;
                width: 170px;
                height: 136px;
                border-radius: 8px 0 0 8px;
                overflow: hidden;
            }
                
            .info{
                flex: 1;
                padding: 8px 5px;
                border-radius: 0px 8px 8px 0;
                overflow: hidden;
                .title{
                    color: #333333;
                    font-size: 14px;
                }
                    
                .people{
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    margin-top: 15px;
                    color: #666666;
                    img{
                        width: 32px;
                        height: 32px;
                        margin-right: 5px;
                        border-radius: 50%;
                    }     
                }
                .goods-wrapper{
                    margin-top: 10px;
                    display: flex;
                    .goods-item{
                        position: relative;
                        width: 48px;
                        height: 48px;
                        margin-right: 8px;
                        &:nth-child(3n){
                            margin-right: 0;
                        }
                         
                        img{
                            width: 100%;
                            height: 100%;
                        }
                            
                        span{
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            color: #fff;
                            font-size: 12px;
                        }    
                    }      
                }  
            }      
        }      
        &.live-wrapper-c{
            display: flex;
            overflow: hidden;
            .live-item-a{
                margin-right: 10px;
                width: 140px;
                height: 112px;
                flex-shrink: 0;
                .img-box{
                    width: 100%;
                    height: 112px;
                    border-radius: 8px 8px 0 0;
                }  
                .info{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .left{
                        width: 60%;
                    }     
                }   
            }     
        }      
    }
    .live-wrapper-b{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px 10px 0;
        .live-item-b{
            display: flex;
            flex-direction: column;
            width: 165px;
            margin-bottom: 10px;
            border-radius: 8px;
            overflow: hidden;
            .img-box{
                position: relative;
                height: 137px;
            }
                
            .info{
                width: 100%;
                padding: 10px;
                background-color: #fff;
                .people{
                    display: flex;
                    align-items: center;
                    margin-top: 8px;
                    color: #666666;
                    img{
                        width: 32px;
                        height: 32px;
                        margin-right: 5px;
                        border-radius: 50%;
                    }
                        
                }
                    
            }
                
        }
            
    }
        

    .iconfont-diy{
        font-size: 12px;
    }
        
    .icontupian{
        font-size: 24px;
    }
        
    .bggary{
        background: linear-gradient(270deg, #999999 0%, #666666 100%);
    }
        
    .bgred{
        background: linear-gradient(270deg, #F5742F 0%, #FF1717 100%);
    }
        
    .empty-goods{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 48px;
        color: #fff;
        background: #B2B2B2;
        font-size: 12px;
    }
        
    .label{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 76px;
        height: 17px;
        line-height: 17px;
        border-radius: 8px 0px 8px 0;
        color: #fff;
        font-size: 12px;
        &.bgblue{
            justify-content: inherit;
            width: 110px;
            background: rgba(0,0,0,0.36);
            overflow: hidden;
            .txt{
                width: 48px;
                height: 100%;
                text-align: center;
                margin-right: 5px;
                background: linear-gradient(270deg, #2FA1F5 0%, #0076FF 100%);
            }     
        }     
        &.bggary{
            width: 54px;
        }        
    }    
    .title-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 0;
        font-size: 16px;
        .icon{
            width: 66px;
            height: 16px;
        }
        span{
            font-size: 12px;
            .iconfont{
                font-size: 8px;
            }
        }    
    }
        
</style>
