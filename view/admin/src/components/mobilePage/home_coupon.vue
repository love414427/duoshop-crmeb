<template>
    <div v-if="themeColor" :style="{padding:'0 '+prConfig+'px',marginTop:mTOP+'px'}">
        <div class="home_coupon" :class="bgStyle===0?'':'couponOn'">
            <div class="title-wrapper">
                <span>领优惠券</span>
                <div class="right">查看更多 <span class="iconfont-diy iconjinru"></span></div>
            </div>
            <div>
                <div class="coupon" v-if="style == 0">
                    <div class="item" :class="'item'+style">
                        <div class="top" :style="{color:`${themeColor.item}`}">
                            <div class="num"><span>￥</span>10</div>
                            <div class="txt">满100元可用</div>
                        </div>
                        <div class="coupon-btn" :style="{background:`${themeColor.item}`}"><span>立即领取</span></div>
                    </div>
                    <div class="item gary" :class="'item'+style">
                        <div class="top">
                            <div class="num"><span>￥</span>50</div>
                            <div class="txt">满100元可用</div>
                        </div>
                        <div class="coupon-btn"><span>已领取</span></div>
                    </div>
                    <div class="item" :class="'item'+style">
                        <div class="top" :style="{color:`${themeColor.item}`}">
                            <div class="num"><span>￥</span>50</div>
                            <div class="txt">满100元可用</div>
                        </div>
                        <div class="coupon-btn" :style="{background:`${themeColor.item}`}"><span>立即领取</span></div>
                    </div>
                </div>
                <div class="coupon" v-if="style == 1">
                    <div class="item" :class="'item'+style" :style="{background:`${themeColor.item}`}">
                        <div class="left" :style="{color:`${themeColor.item}`}">
                            <div class="num"><span>￥</span>50</div>
                            <div class="txt">满100元可用</div>
                        </div>
                        <div class="right">立<br>即<br>领<br>取</div>
                    </div>
                    <div class="item gary" :class="'item'+style">
                        <div class="left" :style="{color:`${themeColor.item}`}">
                            <div class="num"><span>￥</span>50</div>
                            <div class="txt">满100元可用</div>
                        </div>
                        <div class="right">立<br>即<br>领<br>取</div>
                    </div>
                    <div class="item" :class="'item'+style" :style="{background:`${themeColor.item}`}">
                        <div class="left" :style="{color:`${themeColor.item}`}">
                            <div class="num"><span>￥</span>50</div>
                            <div class="txt">满100元可用</div>
                        </div>
                        <div class="right">立<br>即<br>领<br>取</div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'home_coupon',
        cname: '优惠券',
        configName: 'c_home_coupon',
        icon: 'iconyouhuiquan2',
        type:1,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'coupon', // 外面匹配名称
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
                    name: 'coupon',
                    timestamp: this.num,
                    tabConfig: {
                        title: '展示样式',
                        tabVal: 0,
                        type: 1,
                        tabList: [
                            {
                                name: '样式一',
                                icon: 'iconyangshiyi'
                            },
                            {
                                name: '样式二',
                                icon: 'iconyangshier'
                            },  
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
                    prConfig: {
                        title: '背景边距',
                        val: 0,
                        min: 0
                    },
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    }
                },
                pageData: {},
                themeColor: [],
                mTOP: 0,
                style: 0,
                bgStyle:0,
                prConfig:0
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
                    this.style = data.tabConfig && data.tabConfig.tabVal || 0;
                    this.mTOP = data.mbConfig.val;
                    this.themeColor = data.themeColor && data.themeColor.color[0];
                    this.bgStyle = data.bgStyle.type;
                    this.prConfig = data.prConfig.val;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.couponOn{
    border-radius: 10px;
}
.home_coupon{
    background: #FFFFFF;
    .title-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 13px;
        border-radius: 10px 10px 0 0;
        span{
            font-size: 12px;
        }  
        .right{
            color: #999999;
            font-size: 12px;
            span{
                font-size: 8px;
            }
        }     
    }   
}
.coupon{
    display: flex;
    align-items: center;
    padding: 5px 0 15px 10px; 
    overflow: hidden;
    .item0{
        margin-right: 14px;
        width: 130px;
        height: 97px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: end;
        .top{
            text-align: center;
            position: absolute;
            top: 0;
            left: 5px;
            width: 120px;
            height: 62px;
            background-image: url("../../assets/images/coupon-bg.png");
            background-size: 100% 100%;
            .num{
                margin: 8px 0 2px;
                font-size: 26px;
                font-weight: bold;
                span{
                    font-weight: normal;
                    font-size: 14px;
                }
            }
            .txt{
                font-size: 12px;
            }
        }
        .coupon-btn{
            width: 130px;
            height: 80px;
            text-align: center; 
            font-size: 14px;
            display: flex;
            align-items: end;
            justify-items: center;
            border-radius: 12px;
            span{
                display: inline-block;
                color: #ffffff;
                width: 100%;
                padding-bottom: 10px;
            }

        }
        &.gary{
            .coupon-btn{
                background: #BBBBBB;
            }
            
            .top{
                color: #BBBBBB;
            }
        }

    }
    .item1{
        flex-shrink: 0;
        position: relative;
        width: 122px;
        height: 64px;
        color: #fff;
        border-radius: 10px 7px 7px  10px;
        margin-right: 12px;
        &::before {
            position: absolute;
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            left: -4px;
            top: 26px;
        }
        .left{
            float: left;
            width: 98px;
            height: 64px;
            background-color: #f7f7f7;
            border-radius: 7px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .num{
                font-size: 24px;
                font-weight: bold;
                span{
                    font-size: 12px;
                }
            }    
            .txt{
                font-size: 12px;
            }     
        }          
        .right{
            float: right;
            width: 23px;
            height: 64px;
            border-radius: 7px;
            position: relative;
            right: 0;
            top: 0;
            z-index: 0;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
        &.gary{
            background: #D8D8D8;
            .left{
                background: #f7f7f7;
            }
        }     
    }
}      
</style>
