<template>
    <div :style="{marginTop:slider+'px',background:bgColor}">
        <div class="page-shop" :style="{marginLeft:prConfig+'px',marginRight:prConfig+'px'}" :class="bgStyle?'':'shopOn'">
        <div v-if="titleUrl" class="title-count">
            <img :src="titleUrl">
        </div>
        <!--多行展示-->
        <div class="mobile-page" v-if="isOne">
            <div class="shop-list">
                <div v-for="(item, index) in shopList" class="list">
                    <img v-if="item.avatar" :src="item.avatar">
                    <div v-else class="empty-box"><span class="iconfont-diy icontupian"></span></div>
                </div>
            </div>
        </div>
        <!--单行展示-->
        <div class="mobile-page" v-else>
            <div class="home-shop" v-for="(item, index) in shopList">
                <div class="shop-info" :style="{background:bgColor.item}" :class="bgStyle?'':'shopOn'">
                    <img class="bgImg" :src="item.bgPic" :class="bgStyle?'':'shopOn'">
                    <div class="shop-title">
                        <img v-if="item.avatar" :src="item.avatar">
                        <div v-else class="empty-box"><span class="iconfont-diy icontupian"></span></div>
                        <div class="shop-name">{{item.name}}</div>
                        <div class="store-type":style="{background:themeColor}">自营</div>
                    </div>
                </div>
                <div class="shop-product" :class="bgStyle?'':'shopOn'">
                   <div v-for="(itm, idx) in item.proList" class="item">
                        <img v-if="itm.image" :src="item.image">
                        <div class="empty-box"><span class="iconfont-diy icontupian"></span></div>
                        <div class="info">
                            <div v-if="titleShow" class="name">{{itm.store_name}}</div>
                            <div v-if="priceShow" class="price" :style="{color:themeColor}">¥ <span>{{itm.price}}</span></div>
                        </div>
                    </div>     
                </div>
            </div>  
        </div>
        <div class="shop-more">更多店铺<span class="iconfont iconjinru"></span></div>    
    </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'home_shop',
        cname: '品牌好店',
        icon: 'icondianpujie',
        configName: 'c_home_shop',
        type:0,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'shopList', // 外面匹配名称
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
                    name:'shopList',
                    timestamp: this.num,
                    setUp: {
                        tabVal: "0"
                    },
                    logoConfig:{
                        type: 1,
                        header: '标题图片',
                        title: '最多可添加1张，图片建议尺寸242*48px',
                        url: ''
                    },
                    numConfig: {
                        val:4,
                        title: '店铺数量'
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
                                name: '多行模式',
                                icon: 'iconduohang'
                            }
                        ]
                    }, 
                    titleShow: {
                      title: '是否显示商品名称',
                      val: true
                    },
                    priceShow: {
                      title: '是否显示价格',
                      val: true
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
                    prConfig: {
                        title: '背景边距',
                        val: 0,
                        min: 0
                    },
                    themeColor: {
                        title: '主题风格',
                        name: 'themeColor',
                        default: [{
                            item: '#333333'
                        }],
                        color: [
                            {
                                item: '#333333'
                            }

                        ]
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
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    }
                },
                boxStyle: '',
                bgColor: '',
                themeColor: '',
                slider: 0,
                isOne: 0,
                pageData: {},
                bgStyle:0,
                prConfig:0,
                titleUrl: "",
                titleShow: true,
                priceShow: true,
                shopList:[
                    {
                        name:'小米商城',
                        avatar:'http://mer1.crmeb.net/uploads/def/20210427/27ea72a7517c8a3e322122a0c8fca30a.png',
                        bgPic:'http://mer1.crmeb.net/uploads/def/20210427/a88fb560fd8b83e3a1944f1e09069b7e.jpg',
                        proList:[
                            {
                                image: "",
                                store_name: "无线蓝牙耳机",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "苹果新款平板",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "蒸汽手持熨斗",
                                price: '1299.00'
                            }
                        ]
                    },
                    {
                        name:'小米商城',
                        avatar:'http://mer1.crmeb.net/uploads/def/20210427/27ea72a7517c8a3e322122a0c8fca30a.png',
                        bgPic:'http://mer1.crmeb.net/uploads/def/20210427/a88fb560fd8b83e3a1944f1e09069b7e.jpg',
                        proList:[
                            {
                                image: "",
                                store_name: "无线蓝牙耳机",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "苹果新款平板",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "蒸汽手持熨斗",
                                price: '1299.00'
                            }
                        ]
                    },
                    {
                        name:'小米商城',
                        avatar:'http://mer1.crmeb.net/uploads/def/20210427/27ea72a7517c8a3e322122a0c8fca30a.png',
                        bgPic:'http://mer1.crmeb.net/uploads/def/20210427/a88fb560fd8b83e3a1944f1e09069b7e.jpg',
                        proList:[
                            {
                                image: "",
                                store_name: "无线蓝牙耳机",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "苹果新款平板",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "蒸汽手持熨斗",
                                price: '1299.00'
                            }
                        ]
                    },
                    {
                        name:'小米商城',
                        avatar:'http://mer1.crmeb.net/uploads/def/20210427/27ea72a7517c8a3e322122a0c8fca30a.png',
                        bgPic:'http://mer1.crmeb.net/uploads/def/20210427/a88fb560fd8b83e3a1944f1e09069b7e.jpg',
                        proList:[
                            {
                                image: "",
                                store_name: "无线蓝牙耳机",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "苹果新款平板",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "蒸汽手持熨斗",
                                price: '1299.00'
                            }
                        ]
                    }
                   
                ],
               
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
                    this.slider = data.mbConfig.val;
                    this.bgStyle = data.bgStyle.type;
                    this.prConfig = data.prConfig.val;
                    this.bgColor = data.bgColor.color[0].item;
                    this.themeColor = data.themeColor.color[0].item;
                    this.isOne = data.tabConfig.tabVal;
                    this.titleUrl = data.logoConfig.url;
                    this.shopList =  (data.shopList && data.shopList.length > 0) ? data.shopList : this.shopList;
                    this.titleShow = data.titleShow.val;
                    this.priceShow = data.priceShow.val;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.shopOn{
    border-radius: 0!important;
}
.page-shop{
    border-radius: 8px;
}
.home-shop{
    margin-bottom: 10px;
    .shop-info{
        position: relative;
        width: 100%;
        height: 100px;
        border-radius: 8px 8px 0 0;
        .bgImg{
            width: 100%;
            height: 100%;
            border-radius: 8px 8px 0 0;
        }
        .shop-title{
            position: absolute;
            top: 10px;
            left: 10px;
            background: #fff;
            font-weight: bold;
            display: flex;
            align-items: center;
            max-width: 60%;
            border-radius: 12px;
            padding: 3px 9px;
            .empty-box{
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-right: 4px;
                border-radius: 50%;
            }
             img{
                width: 18px;
                height: 18px;  
                margin-right: 4px;
                border-radius: 50%;  
            }
            .store-type{
                font-size: 10px;
                color: #fff;
                background-color: #e93323;
                padding: 0 5px;
                line-height: 19px;
                height: 19px;
                margin-left: 20px;
                border-radius: 14px;
            }
            .shop-name{
                font-size: 14px;
            }
        }
    }
    .shop-product{
        display: flex;
        background: #fff;
        padding: 10px 10px 0;
        border-radius: 0 8px 8px 0;
        .item{
            width: 31.3%;
            margin: 0 3.05% 10px 0;
            &:nth-child(3n) {
                margin-right: 0;
            }
            .empty-box{
                width: 100%;
                height: 107px;
                .icontupian{
                    font-size: 30px;
                }
            }
            .info{   
                padding: 8px 9px 0;
                text-align: center;
                font-weight: bold;
                .name{
                   font-size: 14px;
                    color: #282828;
                }
                .price{
                    color: #E93323;
                    font-size: 12px;
                    margin-top: 5px;
                    span{
                        font-size: 15px;
                    }
                }

            }
        }
    }
}
.shop-list{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .list{
        width: 23.5%;
        margin: 0 2% 10px 0;
        background-color: #FEFEFF;
        border-radius: 6px;
        height: 70px;
        &:nth-child(4n){
            margin-right: 0;
        }
        .empty-box,img{
            width: 100%;
            height: 70px;
        }
    }
}
.shop-more{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 13px 0;
    color: #999999;
    font-size: 13px;
    .iconfont{
        font-size: 8px;
        margin-left: 3px;
    }
}

.title-count{
    text-align: center;
    padding: 10px 0;
    img{
        max-width: 100%;
        height: 80px;
    }
}
</style>
