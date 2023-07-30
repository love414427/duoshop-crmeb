<template>
    <div class="users">
        <el-card shadow="never">
            <div class="acea-row row-top">
                <div class="left" :style="colorStyle">
                    <div class="header" :class="userData.status==3?'bgColor':''">
                        <div class="top acea-row row-between-wrapper">
                            <div class="picTxt acea-row row-middle">
                                <div class="pictrue">
                                    <img src="../../../assets/images/f.png">
                                </div>
                                <div class="txt">
                                    <div class="name">用户昵称</div>
                                    <div class="num"><span>ID: 9438</span><img src="../../../assets/images/edit.png"></div>
                                </div>
                            </div>
                            <div class="acea-row row-middle">
                                <div class="news">
                                    <span class="iconfont iconshezhi"></span>
                                    <span class="iconfont iconliaotian"></span>
                                </div>
                            </div>
                        </div>
                         <div class="center acea-row row-around row-middle">
                            <div class="item">
                                <div class="num">0.00</div>
                                <div class="font">我的收藏</div>
                            </div>
                            <div class="item">
                                <div class="num">65749</div>
                                <div class="font">关注店铺</div>
                            </div>
                            <div class="item">
                                <div class="num">25</div>
                                <div class="font">浏览记录</div>
                            </div>
                            <div class="item">
                                <div class="num">40</div>
                                <div class="font">优惠券</div>
                            </div>
                        </div>
                    </div>             
                   <div class="wrapper">
                    <div class="orderCenter on">
                        <div class="title acea-row row-between-wrapper">
                            <div class="title-left">我的订单</div>
                            <div class="all">全部订单<span class="iconfont iconjinru"></span></div>
                        </div>
                        <div class="list acea-row row-around">
                            <div class="item">
                                <div class="iconfont" :class="order.dfk"></div>
                                <div>待付款</div>
                            </div>
                            <div class="item">
                                <div class="iconfont" :class="order.dfh"></div>
                                <div>待发货</div>
                            </div>
                            <div class="item">
                                <div class="iconfont" :class="order.dsh"></div>
                                <div>待收货</div>
                            </div>
                            <div class="item">
                                <div class="iconfont" :class="order.dpj"></div>
                                <div>待评价</div>
                            </div>
                            <div class="item">
                                <div class="iconfont" :class="order.sh"></div>
                                <div>售后/退款</div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel dotted" :class="current==1?'solid':''" @click="currentShow(1)">
                        <swiper :options="swiperOption" class="swiperimg" v-if="userData.my_banner.length">
                            <swiper-slide class="swiperimg" v-for="(item, index) in userData.my_banner" :key="index">
                                <img :src="item.pic" >
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                        <div v-else class="default">暂无广告数据</div>
                    </div>
                    <div class="orderCenter service dotted" :class="current==2?'solid':''" @click="currentShow(2)">
                        <div class="title acea-row row-between-wrapper">
                            <div>我的服务</div>
                        </div>
                        <div class="list acea-row">
                            <div class="item" v-for="(item,index) in userData.my_menus" :key="index" v-if="item.pic">
                                <div class="pictrue">
                                    <img :src="item.pic" v-if="item.pic && item.pic !=''">
                                    <span class="iconfont icontupian1" v-else></span>
                                </div>
                                <div>{{item.name?item.name:'服务名称'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="orderCenter">
                       <div class="menu-list">
                            <div class="item-text">
                                <div class="item-title"><span>平台</span>管理</div>
                                <div class="info">进入商户中心管理店铺</div>
                            </div>
                            <div class="picture">
                                <img src="../../../assets/images/plant_form.png">
                            </div>
                       </div>
                    </div>
                    <div v-if="copyright.status !== -1" class="copy-right">
                        <image class="img-copyright" :src="copyright.image" mode="widthFix"></image>
                        <div class="text">众邦科技提供技术支持</div>
                    </div>
                    <div v-else class="copy-right">
                        <div class="iconfont iconcrmeb1"></div>
                        <div class="text">众邦科技提供技术支持</div>
                    </div>
                   </div>   
                </div>
                <div class="right">
                    <div class="title">页面设置</div>
                    <div class="c_row-item acea-row row-top" v-if="current==1">
                        <el-col class="label" :span="4">
                            广告位：
                        </el-col>
                       <el-col :span="20" class="slider-box">
                            <div class="info">建议尺寸：750 * 138，拖拽图片可调整图片显示顺序哦，最多添加五张</div>
                            <uploadPic :listData="userData.my_banner" :type="2"></uploadPic>
                        </el-col>
                    </div>
                    <div v-if="current==2">
                        <div class="c_row-item acea-row row-top">
                            <el-col class="label" :span="4">
                                我的服务：
                            </el-col>
                            <el-col :span="20" class="slider-box">
                                <div class="info">建议尺寸：86 * 86px，拖拽图片可调整图片显示顺序哦</div>
                                <uploadPic :listData="userData.my_menus" :type="3"></uploadPic>
                            </el-col>
                        </div>
                    </div>
                    
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { getMember, memberSave } from "@/api/diy";
    import { getVersion } from "@/api/user";
    import uploadPic from './components/uploadPic'
    export default {
        name: 'users',
        components: {
            uploadPic
        },
        props: {
        },
        data () {
            return {
                swiperOption:{
                    //显示分页
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    //自动轮播
                    autoplay: {
                        delay: 2000,
                        //当用户滑动图片后继续自动轮播
                        disableOnInteraction: false,
                    },
                    //开启循环模式
                    loop: false
                },
                userData:{
                    my_banner:[],
                    my_menus:[],
                },
                current:1,
                colorStyle: '',
                order:{},
                copyright: {},
                order01:{dfk:'icondaifukuan-shengxianlv',dfh:'icondaifahuo-shengxianlv',dsh:'icondaishouhuo-shengxianlv',dpj:'icondaipingjia-shengxianlv',sh:'iconshouhou-tuikuan-shengxianlv'},
                order02:{dfk:'icondaifukuan-menghuanzi',dfh:'icondaifahuo-menghuanzi',dsh:'icondaishouhuo-menghuanzi',dpj:'icondaipingjia-menghuanzi',sh:'iconshouhou-tuikuan-menghuanzi'},
                order03:{dfk:'icondaifukuan-kejilan',dfh:'icondaifahuo-kejilan',dsh:'icondaishouhuo-kejilan',dpj:'icondaipingjia-kejilan',sh:'iconshouhou-tuikuan-kejilan'},
                order04:{dfk:'icondaifukuan-langmanfen',dfh:'icondaifahuo-langmanfen',dsh:'icondaishouhuo-langmanfen',dpj:'icondaipingjia-langmanfen',sh:'icona-shouhoutuikuan-langmanfen'},
                order05:{dfk:'icondaifukuan-yangguangcheng',dfh:'icondaifahuo-yangguangcheng',dsh:'icondaishouhuo-yangguangcheng',dpj:'icondaipingjia-yangguangcheng',sh:'iconshouhou-tuikuan1'},
                order06:{dfk:'icondaifukuan-zhongguohong',dfh:'icondaifahuo-zhongguohong',dsh:'icondaishouhuo-zhongguohong',dpj:'icondaipingjia-zhongguohong',sh:'iconshouhou-tuikuan-zhongguohong'}
            }
        },
        created() {
            this.getInfo();
            this.getVersion();
        },
        methods: {
            currentShow(type){
                this.current = type;
            },
            switchOrder(status){
                switch (status) {
                    case 1:
                        this.order = this.order01
                        break;
                    case 2:
                        this.order = this.order02
                        break;
                    case 3:
                        this.order = this.order03
                        break;
                    case 4:
                        this.order = this.order04
                        break;
                    case 5:
                        this.order = this.order05
                        break;
                    default:
                        this.order = this.order01
                        break
                }
            },
            orderStyle(e){
                this.switchOrder(e);
            },
            getInfo(){
                getMember().then(res=>{
                    this.colorStyle = res.data.theme.theme
                    this.userData.my_menus = res.data.my_menus
                    this.userData.my_banner = res.data.my_banner
                })
            },
            getVersion() {
                getVersion().then(res => {
                    this.copyright = res.data;
                });
                },
            onSubmit(){
                this.$emit('parentFun',true)
                memberSave(this.userData).then((res)=>{
                    this.$emit('parentFun',false)
                    this.$message.success(res.message);
                }).catch((err)=>{
                    this.$message.error(err.message);
                    this.$emit('parentFun',false)
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb{
        -webkit-box-shadow: inset 0 0 6px #ddd;
    }
    ::-webkit-scrollbar {
        width: 4px!important; /*对垂直流动条有效*/
    }
    .default{
        background-color: #fff;
        text-align: center;
        height: 55px;
        line-height: 50px;
        border-radius: 8px;
    }
    .wrapper{
        position: relative;
        top: -16px;
        padding: 0 10px;
    }
    .listB{
        width: 100%;
        background-color: #fff;
        border-radius: 6px;
        .item{
            padding-left: 12px;
            color: #333;
            font-size: 12px;
            img{
                width: 17px;
                height: 17px;
                display: block;
            }
            .text{
                width: 227px;
                border-bottom: 1px solid #EEEEEE;
                padding: 10px 12px 10px 0;
                .iconfont{
                    color: #8A8A8A;
                    font-size: 12px;
                }
            }
        }
    }
    .bgColor{
        background-color: unset;
        .top{
            .picTxt{
                .txt{
                    .name{
                        color: #333;
                    }
                }
            }
            .news{
                .iconfont{
                    color: #333;
                }
                .num{
                    background-color: var(--view-theme);
                    color: #fff;
                }
            }
            .iconerweima-xingerenzhongxin{
                color: #333;
            }
        }
        .center{
            color: rgba(51, 51, 51, 0.7);
            .num{
                color: #333;
            }
        }
    }
    .dotted{
        border:1px dashed #2d8cf0;
        cursor: pointer;
    }
    .solid{
        border:1px solid #2d8cf0;
    }
    .c_row-item{
        align-items: flex-start;
        .slider-box{
            .info{
                font-size: 13px;
                color: #999999;
            }
        }
    }
    .bottomB{
        width: 271px;
        height: 62px;
        background: #343A48;
        border-radius: 8px 8px 0px 0px;
        padding: 11px 15px 0 15px;
        margin: 18px auto 0 auto;
        color: #BBBBBB;
        font-size: 13px;
        z-index: 0;
        position: relative;
        .iconfont{
            font-size: 11px;
        }
        .vip{
            font-size: 13px;
            font-weight: bold;
            color: #F8D5A8;
            img{
                width: 18px;
                height: 18px;
                display: inline-block;
                vertical-align: middle;
                margin-right: 9px;
            }
        }
    }
    .member{
        background-image: url("../../../assets/images/user_vip.png");
        background-repeat: no-repeat;
        background-size: 100%;
        width: 270px;
        height: 48px;
        margin: -50px auto 0 auto;
        position: relative;
        z-index: 9;
        margin-bottom: 13px;
        padding: 8px 10px 0 37px;
        color: #AE5A2A;
        font-size: 12px;
        .renew{
            font-size: 12px;
            .iconjinru{
                font-size: 11px;
            }
        }
    }
    .carousel{
        .swiperimg{
            width: 100%;
            height: 63px;
            border-radius: 8px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
        }
    }
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
        bottom: 2px;
    }
    /deep/.swiper-pagination-bullet{
        width: 4px;
        height: 4px;
    }
    /deep/.swiper-pagination-bullet-active{
        background: #fff;
    }
    .users{
        .left {
            background: #F7F7F7;
            width: 310px;
            height: 550px;
            overflow-x: hidden;
            overflow-y: auto;
            padding-bottom: 1px;
            margin-right: 30px;
            border: 1px solid #eee;
            .center{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 10px 0;
                position: relative;
                z-index: 9;
                color: #fff;
                .num{
                    font-size: 15px;
                    font-weight: 600;
                }
                .font{
                    font-size: 12px;
                    color: rgba(255,255,255,.6);
                    margin-top: 3px;
                }
                .item{
                    width: 25%;
                    text-align: center;
                }
            }
            .header{
                background-color: var(--view-theme);
                background-image: url("../../../assets/images/user01.png");
                background-size: 100%;
                background-repeat: no-repeat;
                width: 100%;
                height: 135px;
                position: relative;
                .top{
                    padding: 17px 14px 0 14px;
                    .picTxt{
                        .pictrue{
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            margin-right: 10px;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .txt{
                            .name{
                                font-size: 12px;
                                color: #fff;
                                img{
                                    width: 40px;
                                    height: 15px;
                                    margin-left: 7px;
                                    vertical-align: middle;
                                }
                            }
                            .num{
                                font-size: 10px;
                                margin-top: 5px;
                                color: rgba(255,255,255,.6);
                                display: flex;
                                align-items: center;
                                img{
                                    width: 12px;
                                    height: 12px;
                                    margin-left: 5px;
                                }
                            }
                            .phone{
                                width: 86px;
                                height: 21px;
                                border-radius: 13px;
                                background-color: rgba(16, 55, 72, 0.2);
                                font-size: 11px;
                                color: #fff;
                                margin-top: 4px;
                                .iconfont{
                                    font-size: 11px;
                                }
                            }
                        }
                    }
                    .news{
                        position: relative;
                        margin-left: 10px;
                        top: -8px;
                        .iconfont{
                            font-size: 16px;
                            color: #fff;
                            display: inline-block;
                            margin-left: 12px;
                            &.iconliaotian{
                                transform: rotateY(180deg);
                            }
                        }
                        .num{
                            position: absolute;
                            width: 14px;
                            height: 14px;
                            background: #FFFFFF;
                            border-radius: 50%;
                            font-size: 9px;
                            color: var(--view-theme);
                            text-align: center;
                            line-height: 14px;
                            top:3px;
                            right: -4px;
                        }
                    }
                    .iconerweima-xingerenzhongxin{
                        font-size: 20px;
                        color: #fff;
                    }
                }
                .bottom{
                    background-image: url("../../../assets/images/member.png");
                    width: 310px;
                    height: 34px;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    position: absolute;
                    bottom: 0;
                    padding: 0 23px 0 50px;
                    font-size: 13px;
                    color: #905100;
                    .renew{
                        font-size: 12px;
                        .iconjinru{
                            font-size: 11px;
                        }
                    }
                }
            }
            .orderCenter{
                background: #FFFFFF;
                border-radius: 8px;
                margin-bottom: 10px;
                text-align: center;
                .title{
                    height: 36px;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px dashed #DDDDDD;
                    padding: 0 15px;
                    font-size: 13px;
                    color: #282828;
                    .all{
                        font-size: 12px;
                        color: #666666;
                        .iconfont{
                            font-size: 12px;
                            margin-left: 2px;
                        }
                    }
                }
                .list{
                    display: flex;
                    .item{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 20%;
                        height: 70px;
                        font-size: 12px;
                        color: #454545;
                        .iconfont{
                            font-size: 20px;
                            color: var(--view-theme);
                            img{
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
                &.service{
                    margin-top: 10px;
                    .title{
                        font-weight: bold;
                    }
                    .list{
                        .item{
                            width: 25%;
                            margin-bottom: 10px;
                            .pictrue{
                                width: 23px;
                                height: 23px;
                                margin: 0 auto 8px auto;
								font-size: 12px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
        .right{
            width: 540px;
            /deep/.ivu-radio-wrapper{
                font-size: 13px;
                margin-right: 20px;
            }
            .title{
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                position: relative;
                font-weight: bold;
                &:before{
                    content: '';
                    position: absolute;
                    width: 2px;
                    height: 14px;
                    background: #1890FF;
                    top:50%;
                    margin-top: -7px;
                    left:-8px;
                }
            }
            .c_row-item{
                margin-top: 24px;
            }
        }
    }
    .menu-list{
        background: #fff;
        border-radius: 6px;
        padding: 12px 15px 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-text{
            text-align: left;
        }
        .item-title{
            font-size: 16px;
            color: #282828;
            font-weight: bold;
            span{
                color: #FFC552;
            }
        }
        .info{
            margin-top: 7px;
            color: #666666;
            font-size: 10px;
        }
        .picture{
            width: 90px;
            height: 54px;
            img{
                max-width: 100%;
            }
        }
    }
    .copy-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #CCCCCC;
        font-size: 11px;
        .img-copyright{
            width: 60px;
            height: 30px;
        }
        .iconfont{
            font-size: 30px;
        }
    }
</style>
