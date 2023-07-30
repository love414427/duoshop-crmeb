<template>
    <div class="search-box" :style="{background: `${bgColor[0].item}`,marginTop:`${slider}px`,paddingLeft:`${prConfig}px` }" v-if="bgColor.length>0">
        <img :src="logoUrl" alt="" v-if="logoUrl">
        <div class="box" :class="{on:rollStyle,center:txtPosition}"><i class="el-icon-search" />搜索商品</div>
        <span class="iconfont iconliaotian" :style="'color:'+iconColor"></span>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'search_box',
        cname: '搜索框',
        icon: 'iconsousuokuang',
        configName: 'c_search_box',
        type:0,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'headerSerch', // 外面匹配名称
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
                    name: 'headerSerch',
                    timestamp: this.num,
                    setUp: {
                        tabVal: '0'
                    },
                    bgColor: {
                        title: '背景颜色',
                        name: 'bgColor',
                        color: [
                            {
                                item: '#FFFFFF'
                            }
                        ]
                    },
                    iconColor: {
                        title: '消息图标颜色',
                        name: 'themeColor',
                        color: [
                            {
                                item: '#282828'
                            }
                        ]
                    },
                    boxStyle: {
                        title: '边框样式',
                        name: 'boxStyle',
                        type: 0,
                        list: [
                            {
                                val: '圆角',
                                icon:'iconPic_fillet'
                            },
                            {
                                val: '直角',
                                icon:'iconPic_square'
                            }
                        ]
                    },
                    txtStyle: {
                        title: '文本位置',
                        name: 'txtStyle',
                        type: 0,
                        list: [
                            {
                                val: '居左',
                                icon:'icondoc_left'
                            },
                            {
                                val: '居中',
                                icon:'icondoc_center'
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
                    hotWords: {
                        list: [
                            {
                                val: ''
                            }
                        ]
                    },
                    logoConfig:{
                        type: 1,
                        header: '设置logo',
                        title: '建议尺寸254*90px',
                        url: ''
                    }
                },
                // tabVal: '',
                bgColor: [],
                iconColor: [],
                rollStyle: '',
                txtPosition: '',
                slider: '',
                pageData: {},
                prConfig:0,
                logoUrl:''
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
                    this.bgColor = data.bgColor.color;
                    this.iconColor = data.iconColor && data.iconColor.color[0].item;
                    this.rollStyle = data.boxStyle.type;
                    this.txtPosition = data.txtStyle.type;
                    this.slider = data.mbConfig.val;
                    this.logoUrl = data.logoConfig.url;
                    this.prConfig = data.prConfig.val;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.search-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 10px 10px 10px 0;
    cursor: pointer;
    img{
         width: 66px;
        height: 33px;
        margin-right: 10px;
    }
    .iconfont{
        margin-left: 13px;
        font-size: 18px;
        position: relative;
        &::after{
            content: '8';
            width: 11px;
            height: 11px;
            color: #fff;
            background: #E93323;
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: -3px;
            right: -3px;
            font-size: 1px;
        }
    }  
    .box{
        flex: 1;
        height: 30px;
        line-height: 30px;
        color: #999;
        font-size: 12px;
        padding-left: 10px;
        background: #EDEDED;;
        border-radius:15px;
        i{
            font-size: 14px;
            position: relative;
            right: 3px;
            top: .5px;
        }
       
        &.on{
            border-radius: 0;
        }
            
        &.center{
            text-align: center;
            padding-left: 0;
        }
            
    }
        
}
    
</style>
