<template>
    <div class="mobile-page">
        <div class="home-hot" :style="{marginTop:slider+'px',background:boxColor}">
            <!--多行展示-->
            <div v-if="isOne" class="bd">
               <div class="item" v-for="(item,index) in hotList" :key="index">
                    <div class="left">
                        <div>
                            <div class="title">{{item.info[0].value}}</div>
                            <div class="des">{{item.info[1].value}}</div>
                        </div>
                    </div>
                    <div class="img-box">
                        <img :src="item.img" alt="" v-if="item.img">
                        <div class="empty-box on" v-else><span class="iconfont-diy icontupian"></span></div>
                    </div>
                </div>
            </div>
            <!--单行展示-->
            <div v-else class="bd">
                <div class="item one_item" v-for="(item,index) in hotList" :key="index">
                    <div class="left">
                        <div>
                            <div class="title">{{item.info[0].value}}</div>
                            <div class="des">{{item.info[1].value}}</div>
                        </div>
                    </div>
                    <div class="img-box">
                        <img :src="item.img" alt="" v-if="item.img">
                        <div class="empty-box on" v-else><span class="iconfont-diy icontupian"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'home_hot',
        cname: '推荐组',
        icon:'icontuijianzu',
        configName: 'c_home_hot',
        type: 0,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'activeParty', // 外面匹配名称
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
                    name: 'activeParty',
                    timestamp: this.num,
                    setUp: {
                        tabVal: '0'
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
                            }
                        ]
                    },
                    menuConfig: {
                        title: '最多可添加4个板块，图片建议尺寸140 * 140px；鼠标拖拽左侧圆点可 调整版块顺序',
                        maxList: 4,
                        list: [
                            {
                                img: '',
                                info: [
                                    {
                                        title: '标题',
                                        value: '首发新品',
                                        tips: '选填，不超过4个字',
                                        max: 4
                                    },
                                    {
                                        title: '简介',
                                        value: '新品抢先购',
                                        tips: '选填，不超过6个字',
                                        max: 6
                                    },
                                    {
                                        title: '链接',
                                        value: '',
                                        tips: '请输入链接',
                                        max: 100
                                    }
                                ]

                            },
                            {
                                img: '',
                                info: [
                                    {
                                        title: '标题',
                                        value: '热门榜单',
                                        tips: '选填，不超过4个字',
                                        max: 4
                                    },
                                    {
                                        title: '简介',
                                        value: '剁手必备指南',
                                        tips: '选填，不超过20个字',
                                        max: 20
                                    },
                                    {
                                        title: '链接',
                                        value: '',
                                        tips: '请输入链接',
                                        max: 100
                                    }
                                ]

                            },
                            {
                                img: '',
                                info: [
                                    {
                                        title: '标题',
                                        value: '精品推荐',
                                        tips: '选填，不超过4个字',
                                        max: 4
                                    },
                                    {
                                        title: '简介',
                                        value: '发现品质好物',
                                        tips: '选填，不超过20个字',
                                        max: 20
                                    },
                                    {
                                        title: '链接',
                                        value: '',
                                        tips: '请输入链接',
                                        max: 100
                                    }
                                ]

                            },
                            {
                                img: '',
                                info: [
                                    {
                                        title: '标题',
                                        value: '促销单品',
                                        tips: '选填，不超过4个字',
                                        max: 4
                                    },
                                    {
                                        title: '简介',
                                        value: '惊喜折扣价',
                                        tips: '选填，不超过20个字',
                                        max: 20
                                    },
                                    {
                                        title: '链接',
                                        value: '',
                                        tips: '请输入链接',
                                        max: 100
                                    }
                                ]
                            }
                        ]
                    },
                    themeColor: {
                        title: '主题颜色',
                        name: 'themeColor',
                        default: [{
                            item: '#fc3c3e'
                        }],
                        color: [
                            {
                                item: '#fc3c3e'
                            }

                        ]
                    },
                    bgColor: {
                        title: '标签背景颜色',
                        name: 'bgColor',
                        default: [
                            {
                                item: '#F62C2C'
                            },
                            {
                                item: '#F96E29'
                            }
                        ],
                        color: [
                            {
                                item: '#F62C2C'
                            },
                            {
                                item: '#F96E29'
                            }
                        ]
                    },
                    boxColor: {
                        title: '背景颜色',
                        name: 'boxColor',
                        default: [{
                            item: '#ffe5e3'
                        }],
                        color: [
                            {
                                item: '#f5f5f5'
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
                slider: '',
                hotList: [],
                txtColor: '',
                bgColor: [],
                pageData: {},
                boxColor:'',
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
                    this.slider = data.mbConfig.val;
                    this.hotList = data.menuConfig.list;
                    this.txtColor = data.themeColor.color[0].item;
                    this.bgColor = data.bgColor.color;
                    this.boxColor = data.boxColor.color[0].item;
                    this.isOne = data.tabConfig.tabVal;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .home-hot{
        padding: 5px 0;
        margin: 0 10px;
        background: #FFE5E3;
        border-radius: 12px;
        .hd{
            display: flex;
            align-items: center;
            .txt{
                margin-right: 10px;
                color: #FC3C3E;
                font-size: 16px;
                font-weight: bold;
            }
               
            .color-txt{
                width: 110px;
                height: 18px;
                border-radius: 13px 0 13px 0;
                color: #fff;
                text-align: center;
                font-size: 11px;
                box-shadow: 3px 1px 1px 1px rgba(255,203,199,.8);
            }
                
        }   
        .bd{
            display: flex;
            flex-wrap: wrap;
            .item{
                display: flex;
                width: 49%; 
                margin-right: 2%;
                padding: 10px;
                height: 78px;
                background: #fff;
                border-radius:8px;
                justify-content: space-between;              
                &:nth-child(2n){
                    margin-right: 0;
                }
                &:nth-child(1){
                    .des{
                        color: rgba(143, 187, 232, 1);
                    }
                }
                &:nth-child(2){
                    .des{
                        color: rgba(215, 151, 183, 1);
                    }
                }
                &:nth-child(3){
                    margin-top: 10px;
                    .des{
                        color: rgba(196, 155, 209, 1);
                    }
                }
                &:nth-child(4){
                    margin-top: 10px;
                    .des{
                        color: rgba(163, 191, 149, 1);
                    }
                }
               
                .left{
                    width: 75px;
                    display: flex;
                    align-items: center;
                    .title{
                        font-size: 14px;
                        font-weight: bold;
                    }
                        
                    .des{
                        font-size: 10px;
                        margin-top: 5px;
                    }
                        
                    .link{
                        width:56px;
                        height:18px;
                        padding: 0 10px;
                        margin-top: 3px;
                        background:linear-gradient(90deg,#4BC4FF,#207EFF 100%);
                        border-radius:9px;
                        color: #fff;
                        font-size: 13px;
                    }
                        
                 }
                
                .img-box{
                    width: 60px;
                    height: 60px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                        
                    .box{
                        width: 100%;
                        height: 100%;
                        background: #D8D8D8;
                    }
                        
                }
                    
                 &.one_item{
                    width: 23.5%;
                    height: 110px;
                    margin-right: 2%;
                    display: block;
                    margin-top: 0;
                    &:nth-child(4n){
                        margin-right: 0;
                    }
                    .left{
                        display: block;
                        width: 100%;
                        .des{
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow:ellipsis;
                        }
                    }
                    .img-box{
                        width: 50px;
                        height: 50px;
                        display: block;
                        margin: 8px auto 0;
                    }
                    
                }
                   
            }
               
        }
            
    }
        
</style>
