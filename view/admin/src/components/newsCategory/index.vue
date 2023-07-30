<template>
  <div :style="{ height: scrollerHeight + 'px' || ''}">
    <div class="filter-container">
      <div class="container">
          <el-form :inline="true" size="small">
            <el-form-item label="图文搜索：" class="width100">
              <el-input v-model="formValidate.cate_name" @keyup.enter.native="userSearchs" placeholder="请输入内容" class="input-with-select" style="width: 400px;" @change="userSearchs">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" />
             </el-input>
            </el-form-item>
          </el-form>
      </div>
      <router-link :to="{path: roterPre + '/app/wechat/newsCategory/save'}" v-if="$route.path.indexOf('user') === -1">
        <el-button size="small" type="primary">添加图文</el-button>
      </router-link>
    </div>
    <div class="contentBox">
      <div id="content" ref="content" :style="{ top: contentTop + 'px' || '', width: contentWidth}">
        <vue-waterfall-easy ref="waterfall" :imgs-arr="imgsArr" :max-cols="maxCols" :reach-bottom-distance="30" @click="clickFn" @scrollReachBottom="getData">
          <div v-if="props.value.article.length!==0" slot-scope="props" class="img-info">
            <div v-for="(j, i) in props.value.article" :key="i">
              <div v-if="i === 0">
                <div class="news_pic" :style="{backgroundImage: 'url(' + (j.image_input) + ')',backgroundSize:'100% 100%'}" @mouseenter="mouseenterOut(j)" @mouseleave="mouseenterOver(j)">
                  <el-button v-show="props.value.article[i].isDel && isShow" type="success" circle icon="el-icon-edit" @click="clkk(props.value)" />
                  <el-button v-show="props.value.article[i].isDel && isShow" type="danger" circle icon="el-icon-delete" style="margin-top: 5px;" @click="del(props.value,'删除图文',i)" />
                  <el-button v-show="props.value.article[i].isDel && isShowSend" type="primary" icon="md-paper-plane" circle @click="send(props.value,'发送',i)">推送</el-button>
                </div>
                <span class="news_sp">{{ j.title }}</span>
              </div>
              <div v-else class="news_cent">
                <span v-if="j.synopsis" class="news_sp1">{{ j.title }}</span>
                <div v-if="j.image_input.length!==0" class="news_cent_img"><img :src="j.image_input"></div>
              </div>
            </div>
            <!--<p class="some-info">{{ props.value.wechat_news_id }}</p>-->
          </div>
          <div slot="waterfall-over" />
        </vue-waterfall-easy>
      </div>
    </div>
  </div>
</template>

<script>
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import vueWaterfallEasy from 'vue-waterfall-easy'
import { newsListApi, wechatNewsdeleteApi } from '@/api/app'
import { userNewsApi } from '@/api/user'
import { roterPre } from '@/settings'
export default {
  name: 'NewsCategory',
  components: {
    vueWaterfallEasy
  },
  props: {
    scrollerHeight: {
      type: String,
      default: '100%'
    },
    contentTop: {
      type: String,
      default: '184'
    },
    contentWidth: {
      type: String,
      default: '97%'
    },
    maxCols: {
      type: Number,
      default: 7
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isShowSend: {
      type: Boolean,
      default: false
    },
    userIds: {
      type: String,
      default: ''
    },
    wechatIds: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      roterPre: roterPre,
      isDel: false,
      imgsArr: [],
      group: 0, // 当前加载的加载图片的次数
      fetchImgsArr: [], // 存放每次滚动时下一批要加载的图片的数组
      orderData: {},
      gridPic: {
        xl: 6,
        lg: 8,
        md: 8,
        sm: 24,
        xs: 24
      },
      grid: {
        xl: 8,
        lg: 8,
        md: 8,
        sm: 24,
        xs: 24
      },
      formValidate: {
        cate_name: '',
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 发送图文消息
    send(row, tit, num) {
      this.$modalSure('发送图文消息').then(() => {
        userNewsApi({ ids: this.wechatIds, news_id: row.wechat_news_id }).then(({ message }) => {
          this.$message.success(message)
          this.$parent.handleClose()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    clickFn(event, { index, value }) {
      event.preventDefault()
      if (event.target.tagName.toLowerCase() === 'div') {
        this.$emit('getCentList', value)
      }
    },
    // 删除
    del(row) {
      this.$modalSure().then(() => {
        wechatNewsdeleteApi(row.wechat_news_id).then(({ message }) => {
          this.$message.success(message)
          this.$nextTick(() => {
            this.imgsArr = []
          })
          this.formValidate.page = 1
          this.getData()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    // 删除成功
    // submitModel () {
    //     if (this.delfromData.title === '删除图文') {
    //         // this.imgsArr.splice(this.delfromData.num, 1)
    //         this.$nextTick(() => {
    //             this.imgsArr = [];
    //         })
    //         this.formValidate.page = 1;
    //         this.getData();
    //     }
    // },
    // 编辑
    clkk(item) {
      this.$router.push({ path: `${roterPre}/app/wechat/newsCategory/save/` + item.wechat_news_id })
    },
    // 鼠标移进
    mouseenterOut(item) {
      this.$set(item, 'isDel', true)
    },
    // 鼠标移出
    mouseenterOver(item) {
      this.$set(item, 'isDel', false)
    },
    // 搜索
    userSearchs() {
      this.$nextTick(() => {
        this.imgsArr = []
      })
      this.formValidate.page = 1
      this.getData()
    },
    // 瀑布流数据
    getData() {
      newsListApi(this.formValidate).then(async res => {
        if (res.data.list.length === 0) { // 模拟已经无新数据，显示 slot="waterfall-over"
          this.imgsArr = []
          this.$nextTick(() => {
            this.$refs.waterfall.waterfallOver()
          })
        } else {
          const num = Math.ceil(res.data.count / this.formValidate.limit) + 1
          res.data.list.map((item) => {
            item.isDel = false
          })
          this.imgsArr = this.imgsArr.concat(res.data.list) || []
          this.formValidate.page++
          if (this.formValidate.page === num) { // 模拟已经无新数据，显示 slot="waterfall-over"
            this.$refs.waterfall.waterfallOver()
            return
          }
        }
      }).catch(res => {
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .contentBox{
    height: 100%;
    width: 100%;
    position: static;
    #content {
      position: absolute;
      top: 280px;
      bottom: 0;
      width: 86%;
      /*height 1000px;*/
    }
  }
  .contentBox{
    .vue-waterfall-easy-scroll::-webkit-scrollbar {
      display: none;
    }
  }
  .contentBox{
    .vue-waterfall-easy-scroll {
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .some-info{
    padding: 7px;
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Refresh{
    font-size: 12px;
    color: #1890FF;
    cursor: pointer;
    line-height: 35px;
    display: inline-block;
  }
  .news_pic{
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    // background-size: contain!important;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 5px 5px 0 0;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .news_sp{
    font-size: 12px;
    color: #000000;
    background: #fff;
    width: 100%;
    height: 38px;
    line-height: 38px;
    padding: 0 12px;
    box-sizing: border-box;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .news_cent{
    width: 100%;
    height: auto;
    background: #fff;
    border-top: 1px dashed #eee;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    .news_sp1{
      font-size: 12px;
      color: #000000;
      width: 60%;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      line-height: 15px;
    }
    .news_cent_img{
      width: 81px;
      height: 46px;
      border-radius: 6px;
      overflow :hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .news_pic{
    .el-button--danger{
      background:#FFF !important;
      color: #999 !important;
      border:1px solid  #eee !important;
    }
    .el-button--danger:hover{
      background:#FF5D5F !important;
      border:1px solid #fff !important;
      color: #fff !important;
    }
  }
  /deep/.vue-waterfall-easy-container .vue-waterfall-easy{
    position: static!important;
  }
</style>
