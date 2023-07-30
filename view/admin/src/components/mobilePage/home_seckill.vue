<template>
  <div style="padding: 0 10px;">
    <div class="seckill-box" :class="bgStyle?'':'seckillOn'" :style="{background:bgColor,marginTop:mTOP+'px'}">
      <div class="hd">
        <div class="left">
          <img class="icon" src="@/assets/images/spike_title.png" alt="" />
          <div class="time">
            <span class="text" :style="{ background: countDownColor }">距结束</span>
            <span class="num">17:32:45</span>
          </div>
        </div>
        <div class="right">更多惊喜<span class="iconfont-diy iconjinru"></span></div>
      </div>
      <div class="list-wrapper" :class="'colum'+isOne" v-if="isOne != 2">
        <div  class="list-item" v-for="(item, index) in list" :index="index" :class="conStyle?'':'seckillOn'">
          <div class="img-box">
            <img :src="item.img" alt="" v-if="item.img" />
            <div class="empty-box" :class="conStyle?'':'seckillOn'"><span class="iconfont-diy icontupian"></span></div>
          </div>
          <div class="info">
            <div class="title line1" v-if="titleShow">{{ item.name }}</div>
            <div v-if="progressShow" class="label" :style="{ borderColor: themeColor, color: themeColor }">20%</div>
            <div class="price">
              <span class="num-label" :style="{ color: themeColor }">￥</span>
              <span class="num" :style="{ color: themeColor }">{{item.price}}</span>
              <span v-if="priceShow" class="ot_price">￥{{item.ot_price}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list-wrapper colum2" v-else>
        <div  class="list-item" v-for="(item, index) in list" :index="index" v-if="index<3" :class="conStyle?'':'seckillOn'">
         <div class="info">
            <div class="title line1" v-if="titleShow">{{item.name}}</div>
            <div class="price line1" v-if="priceShow">¥{{item.price}}</div>
            <span class="box-btn">去抢购<span class="iconfont-diy iconjinru"></span></span>   
            </div>
            <div class="img-box">
              <img v-if="item.img" :src="item.img" alt="">
            <div class="empty-box" :class="conStyle?'':'seckillOn'"><span class="iconfont-diy icontupian"></span></div>    
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: 'home_seckill',
        cname: '秒杀',
        configName: 'c_home_seckill',
        icon: 'iconmiaosha2',
        type:1,// 0 基础组件 1 营销组件 2工具组件
        defaultName:'seckill', // 外面匹配名称
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
                    this.setConfig(nVal);
                },
                deep: true
            },
            num: {
                handler (nVal, oVal) {
                    let data = this.$store.state.mobildConfig.defaultArray[nVal];
                    this.setConfig(data);
                },
                deep: true
            },
            defaultArray: {
                handler (nVal, oVal) {
                    let data = this.$store.state.mobildConfig.defaultArray[this.num];
                    this.setConfig(data);
                },
                deep: true
            }
        },
        data () {
            return {
                // 默认初始化数据禁止修改
                defaultConfig: {
                    name: 'seckill',
                    timestamp: this.num,
                    setUp: {
                      tabVal: '0'
                    },
                    countDownColor: {
                        title: '倒计时背景色',
                        name: 'countDownColor',
                        default: [
                            {
                                item: '#e93323'
                            }
                        ],
                        color: [
                            {
                                item: '#e93323'
                            }
                        ]
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
                    bgColor: {
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
                    priceShow: {
                      title: '是否显示原价',
                      val: true
                    },
                    progressShow: {
                      title: '是否显示进度条',
                      val: true
                    },
                    titleShow: {
                      title: '是否显示名称',
                      val: true
                    },
                    // 页面间距
                    mbConfig: {
                        title: '页面间距',
                        val: 0,
                        min: 0
                    }
                },
                list: [
                    {
                        img: '',
                        name: '小米家用电饭煲小米家用电饭煲',
                        price: '234',
                        ot_price: '300'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲小米家用电饭煲',
                        price: '177',
                        ot_price: '300'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲小米家用电饭煲',
                        price: '177',
                        ot_price: '300'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲小米家用电饭煲',
                        price: '234',
                        ot_price: '300'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲小米家用电饭煲',
                        price: '234',
                        ot_price: '300'
                    },
                    {
                        img: '',
                        name: '小米家用电饭煲小米家用电饭煲',
                        price: '234',
                        ot_price: '300'
                    }
                ],
                mTOP: 0,
                countDownColor: '',
                themeColor: '',
                pageData: {},
                priceShow:true,
                progressShow:true,
                titleShow:true,
                isOne: 0,
                bgColor: '',
                conStyle:1,
                bgStyle:1,
            };
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
                  this.isOne = data.tabConfig.tabVal;
                  this.mTOP = data.mbConfig.val;
                  this.countDownColor = data.countDownColor.color[0].item;
                  this.themeColor = data.themeColor.color[0].item;
                  this.priceShow = data.priceShow.val;
                  this.progressShow = data.progressShow.val;
                  this.titleShow = data.titleShow.val;
                  this.bgColor = data.bgColor.color[0].item;
                  this.conStyle = data.conStyle.type;
                  this.bgStyle = data.bgStyle.type;
                  
                }
            }
        }
    };
</script>

<style scoped lang="scss">
.seckillOn{
  border-radius: 0!important;
}
.line1{
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.seckill-box{
    padding: 15px 10px;
    background: #fff;
    border-radius: 10px;
    .hd{
      display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            img{
              width: 60px;
              height: 15px;
            }         
            .time{
                display: flex;
                align-items: center;
                margin-left: 5px;
                border: 1px solid #E93323;
                border-radius: 2px;
                span{
                  font-size: 11px;
                  text-align: center;
                  line-height: 16px;
                  padding: 1px 4px;
                }
                .text{
                  color: #fff;
                  background: #E93323;
                }
                .num{
                  color: #E93323;
                }                 
                        
            }              
        } 
        .right{
            font-size: 12px;
            span{
              font-size: 8px;
            }
        }          
    }   
    .list-wrapper{
        display: flex;
        margin-top: 8px;
        .list-item{
          flex-shrink: 0;
          width: 95px;
          margin: 0 10px 10px 0;
          background: #ffffff;
          border-radius: 6px 6px 0 0;
          .img-box{
              position: relative;
              width: 100%;
              height: 110px;
              img,.box{
                width: 100%;
                height: 100%;
                border-radius:8px;
              }               
              .box{
                background: #D8D8D8;
              }              
          }       
          .title{
            margin-top: 5px;
            font-size: 14px;
            color: #282828;
            padding: 0 3px;
          } 
           .label{
              width: 100%;
              height: 9px;
              line-height: 9px;
              background: #FFDCD9;
              border-radius: 8px;
              color: #fff;
              font-size: 10px;
              text-align: center;
              position: relative;
              margin-top: 5px;
              &::before{
                content: "";
                display: inline-block;
                width: 26%;
                height: 9px;
                background: linear-gradient(90deg, #FF0000 0%, #FF5400 100%);
                border-radius: 6px;
                position: absolute;
                top: 0;
                left: 0;
              }
            }        
            .price{
                display: flex;
                padding: 0 3px;
                margin-top: 5px;
                .num-label{
                  color: #FF4444;
                  font-size: 11px;
                  font-weight:600;
                  margin: 1px 2px 0;
                }    
                .num{
                  color: #FF4444;
                  font-size: 14px;
                  font-weight:600;
                }  
                .ot_price{
                  text-decoration: line-through;
                  font-size: 11px;
                  color: #CCCCCC;
                  margin-left: 3px;
                }   
            }    
        } 
        &.colum0{
           overflow: hidden;
        }
        &.colum1{
            flex-wrap: wrap;
            justify-content: space-between;
           .list-item{
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
            .list-item{
                position: relative;
                background-size: cover;
                border-radius: 6px;
                width: 166px;
                padding: 11px 11px 15px;
                margin-right: 0;
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
