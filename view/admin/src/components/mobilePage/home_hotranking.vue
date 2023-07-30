<template>
  <div>
    <div class="mobile-page" :style="{ marginTop: slider + 'px' }">
      <div class="title-wrapper">
        <span class="title">
          <img  src="@/assets/images/rank_title.png" alt=""  />
        </span>
        <div class="right">更多<span class="iconfont-diy iconjinru"></span></div>
      </div>
      <div class="home_product">
        <div class="list-wrapper">
          <div class="item" :class="bgStyle===0?'rankOn':''" v-for="(item, index) in list" :key="index">
            <div class="item-product">
              <div class="left_count" :class="conStyle?'':'rankOn'">
                <div class="item-left">
                  <div class="img-box" :class="conStyle?'':'rankOn'">
                    <img v-if="item.productList[0].img" :src="item.productList[0].img" alt="" />
                    <div v-else class="empty-box">
                      <span class="iconfont-diy icontupian"></span>
                    </div>
                    <span class="rank-num">01</span>
                  </div>
                </div>
                <div class="rank_cate">
                  <span>{{item.cate_name}}</span>
                </div>
              </div>
              <div class="item-right">
                <div class="img-box">
                  <img v-if="item.productList[1].img" :src="item.productList[1].img" alt="" />
                  <div v-else class="empty-box">
                    <span class="iconfont-diy icontupian"></span>
                  </div>
                  <span class="rank-num">02</span>
                </div>
                <div class="img-box">
                  <img v-if="item.productList[2].img" :src="item.productList[2].img" alt="" />
                  <div v-else class="empty-box">
                    <span class="iconfont-diy icontupian"></span>
                  </div>
                  <span class="rank-num">03</span>
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
import { mapState } from 'vuex';
export default {
  name: 'home_hotranking',
  cname: '热卖排行榜',
  configName: 'c_home_hotranking',
  icon: 'iconremaipaihang',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'hotRanking', // 外面匹配名称
  props: {
    index: {
      type: null,
      default: -1,
    },
    num: {
      type: null,
    },
  },
  computed: {
    ...mapState('mobildConfig', ['defaultArray']),
  },
  watch: {
    pageData: {
      handler(nVal, oVal) {},
      deep: true,
    },
    num: {
      handler(nVal, oVal) {
        let data = this.$store.state.mobildConfig.defaultArray[nVal];
        this.setConfig(data);
      },
      deep: true,
    },
    defaultArray: {
      handler(nVal, oVal) {
        let data = this.$store.state.mobildConfig.defaultArray[this.num];
        this.setConfig(data);
      },
      deep: true,
    },
  },
  data() {
    return {
      // 默认初始化数据禁止修改
      defaultConfig: {
        name: 'hotRanking',
        timestamp: this.num,
        setUp: {
          tabVal: '0',
        },
        setUp: {
          tabVal: '0',
        },
        cateConfig: {
          title: '鼠标拖拽左侧圆点可调整分类顺序',
          maxList: 3,
          activeValue: [],
          isLive: false,
          isRank: true,
          list: [
            {
              title: '',
              value: '',
              id: '',
              cate: [],
              tips: '请选择分类',
            },
            {
              title: '',
              value: '',
              id: '',
              cate: [],
              tips: '请选择分类',
            },
            {
              title: '',
              value: '',
              cate: [],
              id: '',
              tips: '请选择分类',
            },
          ],
        },
        mbConfig: {
          title: '页面间距',
          val: 0,
          min: 0,
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
      },
      curIndex: 1,
      categoryList: [],
      list: [
        {
          cate_name: '化妆品榜',
          productList: [
            {
              img: '',
              store_name: '娇韵诗菁纯甄颜精华浓缩眼部精华',
              price: '1,250.78',
              ot_price: '1,600.00',
            },
            {
              img: '',
              store_name: '娇韵诗菁纯甄颜精华浓缩眼部精华',
              price: '1,250.78',
              ot_price: '1,600.00',
            },
            {
              img: '',
              store_name: '娇韵诗菁纯甄颜精华浓缩眼部精华',
              price: '1,250.78',
              ot_price: '1,600.00',
            },
          ],
        },
        {
          cate_name: '运动潮牌榜',
          productList: [
            {
              img: '',
              store_name: '娇韵诗菁纯甄颜精华浓缩眼部精华',
              price: '1,250.78',
              ot_price: '1,600.00',
            },
            {
              img: '',
              store_name: '娇韵诗菁纯甄颜精华浓缩眼部精华',
              price: '1,250.78',
              ot_price: '1,600.00',
            },
            {
              img: '',
              store_name: '娇韵诗菁纯甄颜精华浓缩眼部精华',
              price: '1,250.78',
              ot_price: '1,600.00',
            },
          ],
        },
      ],
      slider: 0,
      bgStyle:1,
      conStyle:1,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.pageData = this.$store.state.mobildConfig.defaultArray[this.num];
      this.setConfig(this.pageData);
    });
  },
  methods: {
    setConfig(data) {
      if (!data) return;
      if (data.mbConfig) {
        this.slider = data.mbConfig.val;
        this.categoryList = data.cateConfig.list;
        this.conStyle = data.conStyle.type;
        this.bgStyle = data.bgStyle.type;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.rankOn{
  border-radius: 0!important;
}
.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
  .title{
    display: flex;
    align-items: center;
  }
  img{
    width: 60px;
    height: 15px;
  }  
  .right{
    font-size: 12px;
    color: #282828;
    span{
      font-size: 8px;
      display: inline-block;
    }
  } 
}
.home_product {
  padding-left: 15px;
  .list-wrapper {
    display: flex;
    overflow: hidden;
    .item {
      width: 212px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      margin-right: 10px;
      flex-shrink: 0;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 37px;
        .name {
          color: #3a3a3a;
          font-size: 12px;
        }
        .icon-more {
          color: #ccc;
        }
      }
      .item-product {
        display: flex;
        justify-content: space-between;
        .left_count{
          width: 115px;
          background: #FFF6F5;
          border-radius: 5px;
          display: block;
          text-align: center;
          padding-bottom: 8px;
          .rank_cate{
            margin-top: 5px;
            color: #E93323;
            font-weight: bold;
            position: relative;
            padding: 0 18px;
            display: inline-block;
            &::before,&::after{
              content: '';
              display: inline-block;
              width: 11px;
              height: 15px;
              background-image: url('../../assets/images/rank_cate.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              position: absolute;
            }
            &::before{
              left: 0;
            }
            &::after{
              right: 0;
              transform: rotateY(180deg);
            }
          }
        }
        .item-left {
          width: 115px;
          height: 115px;
          display: flex;
          align-items: center;
          justify-content: center;
          .img-box {
            background: #fff;
            width: 100px;
            height: 100px;
            position: relative;
            border-radius: 5px;
            .rank-num {
              width: 25px;
              height: 30px;
              background-image: url('../../assets/images/rank_num.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              position: absolute;
              top: 0px;
              left: 5px;
              text-align: center;
              line-height: 30px;
              color: #CE8F21;
              font-size: 16px;
              font-family: '黑体';
              font-weight: bold;
            }
            img {
              width: 156px;
              height: 156px;
            }
            .empty-box {
              background: #fff;
            }
          }
          
        }
        .item-right {
          width: 62px;
          .img-box {
            background: #fff;
            width: 62px;
            height: 62px;
            position: relative;
            &:first-child{
              margin-bottom: 10px;
            }
            .rank-num {
              width: 15px;
              height: 18px;
              background-image: url('../../assets/images/rank_num.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              position: absolute;
              top: 0px;
              left: 4px;
              text-align: center;
              line-height: 18px;
              color: #CE8F21;
              font-size: 8px;
              font-family: '黑体';
              font-weight: bold;
            }
            img {
              width: 62px;
              height: 62px;
            }
            .empty-box {
              background: #fff;
            }
            &:nth-child(2) {
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
