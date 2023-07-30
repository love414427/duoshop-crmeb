<template>
  <div class="page-container">
    <div class="bg-img">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="search-box">
      <img :src="logoUrl" alt="" v-if="logoUrl" mode="widthFix" />
      <div class="box">{{ hotWord }}<i class="el-icon-search" /></div>
      <span class="iconfont iconliaotian"></span>
    </div>
    <!--选项卡-->
    <div class="menus">
      <div class="item on">推荐 <span></span></div>
      <div class="item line1" v-for="(item, index) in list" :key="index">{{ item.info[0].value }} <span></span></div>
      <div class="category">
        <span class="iconfont icon-shouye_xidingfenlei"></span>
      </div>
    </div>
    <!--轮播图-->
    <div class="banner">
      <img :src="imgSrc" alt="" v-if="imgSrc" />
      <div class="empty-box" v-else>
        <span class="iconfont-diy icontupian"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'home_comb',
  cname: '组合组件',
  icon: 'icontupianmofang',
  configName: 'c_home_comb',
  type: 0, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'homeComb', // 外面匹配名称
  props: {
    index: {
      type: null,
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
      handler(nVal, oVal) {
        this.setConfig(nVal);
      },
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
        name: 'homeComb',
        timestamp: this.num,
        tabConfig: {
          title: '选择样式',
          tabVal: 0,
          type: 1,
          tabList: [
            {
              name: '搜索框',
              icon: 'iconsousuo',
              count: 1,
            },
            {
              name: '选项卡',
              icon: 'iconfenleidaohang',
              count: 2,
            },
            {
              name: '轮播图',
              icon: 'icontupian',
              count: 3,
            },
          ],
        },
        hotWords: {
          list: [
            {
              val: '兰蔻小黑瓶',
            },
          ],
        },
        logoConfig: {
          type: 1,
          header: '设置logo',
          title: '建议上传大小：宽152px，高60px',
          url: '',
        },
        titleConfig: {
          title: '显示时间',
          value: '',
          place: '设置搜索热词显示时间',
          max: 5000,
          unit: '秒',
        },
        // 图片列表
        swiperConfig: {
          title: '最多可添加10张图片，建议宽度750*345px；鼠标拖拽左侧圆点可调整图片顺序',
          maxList: 10,
          isSmall: true,
          list: [
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '今日推荐',
                  tips: '选填，不超过10个字',
                  max: 10,
                },
                {
                  title: '链接',
                  value: '',
                  tips: '请输入链接',
                  max: 100,
                },
              ],
            },
          ],
        },
        listConfig: {
          title: '最多可添加1张图片，建议尺寸750*345px；',
          maxList: 100,
          isSmall: true,
          list: [
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '美妆',
                  tips: '选填，不超过4个字',
                  max: 4,
                },
                {
                  select: true,
                  title: '链接',
                  value: '',
                  tips: '请选择链接',
                  max: 100,
                },
              ],
            },
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '奢品',
                  tips: '选填，不超过4个字',
                  max: 4,
                },
                {
                  select: true,
                  title: '链接',
                  value: '',
                  tips: '请选择链接',
                  max: 100,
                },
              ],
            },
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '店庆券',
                  tips: '选填，不超过4个字',
                  max: 4,
                },
                {
                  select: true,
                  title: '链接',
                  value: '',
                  tips: '请选择链接',
                  max: 100,
                },
              ],
            },
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '女装',
                  tips: '选填，不超过4个字',
                  max: 4,
                },
                {
                  select: true,
                  title: '链接',
                  value: '',
                  tips: '请选择链接',
                  max: 100,
                },
              ],
            },
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '运动',
                  tips: '选填，不超过4个字',
                  max: 4,
                },
                {
                  select: true,
                  title: '链接',
                  value: '',
                  tips: '请选择链接',
                  max: 100,
                },
              ],
            },
            {
              img: '',
              info: [
                {
                  title: '标题',
                  value: '双十一',
                  tips: '选填，不超过4个字',
                  max: 4,
                },
                {
                  select: true,
                  title: '链接',
                  value: '',
                  tips: '请选择链接',
                  max: 100,
                },
              ],
            },
          ],
        },
      },
      // tabVal: '',
      pageData: {},
      logoUrl: '',
      hotWord: '',
      imgSrc: '',
      style: 0,
      list: [],
      curIndex: 0,
      bgUrl: '',
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
      if (data) {
        this.list = data.listConfig.list;
        this.logoUrl = data.logoConfig.url;
        this.hotWord = data.hotWords.list[0].val;
        this.imgSrc = data.swiperConfig.list.length ? data.swiperConfig.list[0].img : '';
        this.style = data.tabConfig.tabVal;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page-container {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  backdrop-filter: blur(95px);
  filter: blur(30rpx);
  padding-bottom: 10px;
  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;
    filter: blur(30rpx);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transform: scale(1.2);
      filter: blur(30px);
    }
  }
}
.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 10px 10px 0;
  cursor: pointer;
  img {
    width: 66px;
    margin-right: 10px;
  }
  .iconfont{
    margin-left: 13px;
    font-size: 18px;
    position: relative;
    color: #fff;
    &::after{
      content: '8';
      width: 11px;
      height: 11px;
      background: #fff;
      color: #E93323;
      border-radius: 50%;
      text-align: center;
      position: absolute;
      top: -3px;
      right: -3px;
      font-size: 1px;
    }
  }  
  .box {
    flex: 1;
    height: 30px;
    line-height: 30px;
    color: #999;
    font-size: 12px;
    padding-left: 10px;
    background: #fff;
    border-radius: 15px;
    position: relative;
    i {
      font-size: 14px;
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }
}
.capsule {
  width: 80px;
  height: 30px;
  margin-left: 7px;
  opacity: 0.8;
  img {
    width: 80px;
    height: 30px;
  }
}
.menus {
  width: 100%;
  height: 46px;
  padding: 0 20px 0 15px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  .category {
    width: 20px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 12px;
    span {
      font-size: 18px;
    }
  }
  .item {
    position: relative;
    float: left;
    margin-right: 15px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    height: 46px;
    line-height: 46px;
    // width: 60px;
    &.on {
      font-size: 15px;
      span {
        display: block;
        position: absolute;
        left: 50%;
        bottom: 5px;
        width: 16px;
        height: 2px;
        transform: translateX(-50%);
        background: #fff;
      }
    }
  }
}
.banner {
  width: 100%;
  height: 150px;
  margin-top: 10px;
  padding: 0 10px;
  &.on {
    margin-top: -160px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    &.doc {
      border-radius: 0;
    }
  }
  .empty-box {
    height: 150px;
  }
}
.bg {
  width: 100%;
  height: 160px;
}
</style>
