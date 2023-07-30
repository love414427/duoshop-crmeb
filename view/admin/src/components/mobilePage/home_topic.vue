<template>
    <div :style="{marginLeft:prConfig+'px',marginRight:prConfig+'px',marginTop:slider+'px',background:colorShow ? bgColor : 'transparent'}" :class="bgStyle?'':'pageOn'" class="page-count">
        <div class="home_topic">
            <div class="title-wrapper" :class="bgStyle?'':'presellOn'">
                <img src="@/assets/images/topic_title.png" alt="">
                <div class="right">进入专场 <span class="iconfont-diy iconjinru"></span></div>
            </div> 
             <!--单行展示-->
            <div class="mobile-page" v-if="isOne == 1">
                <div class="home_menu">
                    <div class="menu-item" v-for="(item,index) in vuexMenu" :key="index">
                        <div class="img-box">
                            <img :src="item.img" alt="" v-if="item.img">
                            <div class="empty-box" :class="conStyle?'':'pageOn'" v-else> <span class="iconfont-diy icontupian"></span> </div>
                        </div>     
                    </div>
                </div>
            </div>
            <!--多行展示-->
            <div class="mobile-page" v-else>
                <div class="list_menu">
                    <div class="item"  v-for="(item,index) in vuexMenu" :key="index" v-if="index<1">
                        <div class="img-box" >
                            <img :src="item.img" alt="" v-if="item.img">
                            <div class="empty-box" :class="conStyle?'':'pageOn'" v-else> <span class="iconfont-diy icontupian"></span> </div>
                        </div>
                    </div>
                </div>
            </div>        
            <div class="dot" :class="{ 'line-dot': pointerStyle === 0,'': pointerStyle === 1}" :style="{justifyContent: (dotPosition===1?'center':dotPosition===2?'flex-end':'flex-start')}" v-if="isOne>1 && pointerStyle<2">
                <div class="dot-item" style="background: #fff;"></div>
                <div class="dot-item"></div>
                <div class="dot-item"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'home_topic',
        cname: '专场',
        icon: 'iconzhuanti',
        configName: 'c_home_topic',
        type:1,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'topic', // 外面匹配名称
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
                    name:'topic',
                    timestamp: this.num,
                    setUp: {
                        tabVal: '0'
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
                    colorShow: {
                        title: '是否显示背景色',
                        val: true
                    },
                    bgColor: {
                        title: '背景颜色',
                        name: 'bgColor',
                        default: [{
                            item: '#fff'
                        }],
                        color: [
                            {
                                item: '#fff'
                            }

                        ]
                    },
                   
                    pointerStyle: {
                        title: '指示器样式',
                        name: 'pointerStyle',
                        type: 0,
                        list: [
                            {
                                val: '长条',
                                icon: 'iconSquarepoint'
                            },
                            {
                                val: '圆形',
                                icon: 'iconDot'
                            },
                            {
                                val: '无指示器',
                                icon: 'iconjinyong'
                            }
                        ]
                    },
                    txtStyle: {
                        title: '指示器位置',
                        type: 0,
                        list: [
                            {
                            val: '居左',
                            icon:'icondoc_left'
                            },
                            {
                            val: '居中',
                            icon:'icondoc_center'
                            },
                            {
                            val: '居右',
                            icon:'icondoc_right'
                            }
                        ]
                    },
                    prConfig: {
                        title: '背景边距',
                        val: 0,
                        min: 0
                    },
                    menuConfig: {
                        title: '最多可添加10张照片，建议宽度750px；鼠标拖拽左侧圆点可调整图片顺序',
                        maxList: 10,
                        list: [
                            {
                                img: '',
                                info: [
                                    {
                                        title: '标题',
                                        value: '',
                                        tips: '选填，不超过6个字',
                                        max: 4
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
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    }
                },
                vuexMenu: '',
                txtColor: '',
                boxStyle: '',
                slider: '',
                bgColor: '',
                isOne: 0,
                pointerStyle: 0,
                pageData: {},
                bgStyle:1,
                conStyle:1,
                colorShow:1,
                prConfig:0,
                dotPosition: 0,
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.pageData = this.$store.state.mobildConfig.defaultArray[this.num]
                this.setConfig(this.pageData)
            })
        },
        methods: {
            // 对象转数组
            objToArr(data) {
                let obj = Object.keys(data);
                let m = obj.map((key) => data[key]);
                return m;
            },
            setConfig (data) {
                if(!data) return;
                if(data.mbConfig){
                    this.pointerStyle = data.pointerStyle.type;
                    this.dotPosition = data.txtStyle.type;
                    this.colorShow = data.colorShow.val;
                    // this.boxStyle = data.rowStyle.type;
                    this.slider = data.mbConfig.val;
                    this.bgStyle = data.bgStyle.type;
                    this.conStyle = data.conStyle.type;
                    this.prConfig = data.prConfig.val;
                    this.bgColor = data.bgColor.color[0].item;
                    let list = this.objToArr(data.menuConfig.list);
                    this.isOne = list.length;
                    this.vuexMenu = list.splice(0, 6);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.pageOn{
    border-radius: 0!important;
}
.page-count{
    border-radius: 8px;
}
.home_topic{ 
    border-radius: 10px;
    .title-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
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
}
.list_menu{
    padding: 0 12px 12px;
    display: flex;
    flex-wrap: wrap;
    .item{
        margin-top: 12px;
        font-size: 11px;
        color: #282828;
        text-align: center;
        width: 100%;   
        .img-box{
             width: 100%;
             height: 130px;
             margin: 0 auto 5px auto;
             &.on{
                 border-radius: 50%;
                 img,.empty-box{
                      border-radius: 50%;
                 } 
             }
             img{
                width: 100%;
                height: 100%;
             }              
        }
            
    }       
    .icontupian{
        font-size: 16px;
    }    
}
    
.home_menu{
    padding: 0 12px 12px;
    display: flex;
    overflow: hidden;
    .menu-item{
        margin-top: 12px;
        width: 100%;
        .img-box{
            width: 100%;
            height: 130px;
     
            &.on{
                border-radius: 50%;
                img,.empty-box{
                    border-radius: 8px;
                }
            }      
        }            
        .box,img{
            width: 100%;
            height: 100%;
        }           
        .box{
            background: #D8D8D8;
        }           
        p{
             margin-top: 5px;
        }          
        &:nth-child(5n){
             margin-right: 0;
        }         
    }       
    &.on{
        .menu-item{
             margin-right: 51px;
            &:nth-child(5n){
                margin-right: 51px;
            }
                
            &:nth-child(4n){
                 margin-right: 0;
            }               
        }     
    }       
    .icontupian{
        font-size: 16px;
    }       
}
    
.dot {
    display: flex;
    align-items: center;
    justify-content: center;
    padding:0 10px 10px;
    .dot-item {
        width: 5px;
        height: 5px;
        background: #AAAAAA;
        border-radius: 50%;
        margin: 0 3px;
    }
    &.line-dot {
        .dot-item {
            width: 4px;
            height: 2px;
            background: #AAAAAA;
            margin: 0 3px;
            &:first-child{
                width: 8px;
            }
        }
    }
}
</style>
