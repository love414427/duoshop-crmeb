<template>
  <el-dialog
    title="商品详情"
    :visible.sync="dialogVisible"
    width="375px"
    :show-close="false"
    top="6vh"
    :before-close="handleClose"
  >
    <div slot="title" class="title-box">商品详情</div>
    <div class="goods_detail" style="height: 600px;">
      <el-scrollbar style="height:100%">
        <div style="width: 375px">
          <div class="swiper-box">
            <el-carousel indicator-position="outside" autoplay>
              <el-carousel-item v-for="(item,index) in goodsInfo.slider_image" :key="index">
                <div class="demo-carousel"><img :src="item" alt=""></div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="goods_info">
            <div class="number-wrapper">
              <div class="price"><span>¥</span>{{ goodsInfo.price }}</div>
            </div>
            <div class="name">{{ goodsInfo.store_name }}</div>
            <div class="msg">
              <div class="item">市场价:￥{{ goodsInfo.ot_price }}</div>
              <div class="item">库存:{{ goodsInfo.stock }}</div>
              <div class="item">销量:{{ goodsInfo.sales }}</div>
            </div>
          </div>
          <div class="con-box">
            <div class="title-box">商品介绍</div>
            <div v-if="goodsInfo.content" class="content" v-html="goodsInfo.content.content" />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import { productDetails } from '@/api/kefu'
export default {
  name: 'GoodsDetail',
  data() {
    return {
      value2: 0,
      dialogVisible: false,
      goodsInfo: {
       content: {}
      }
    }
  },
  mounted() {
    // this.getInfo()
  },
  methods: {
    openBox(id) {
      this.dialogVisible = true
      this.getInfo(id)
    },
    getInfo(id) {
      productDetails(id).then(res => {
        this.goodsInfo = res.data
      })
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
.content{
  width: 100%;
  img{
    max-width: 100%!important;
    display: block;
  }
}
</style>
<style lang="scss" scoped>
>>> .el-dialog{
  overflow-x: hidden;
}
>>> .el-dialog__body{
  padding: 0 !important;
}
/deep/ .el-dialog__header{
  padding: 0;
}
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
.title-box{
  height:46px;
  line-height: 46px;
  background: #fff;
  text-align: center;
  color: #333;
  font-size: 16px;
}
.goods_detail{
  overflow: hidden;
  .swiper-box{
    // height: 375px;
    .demo-carousel{
      width: 375px;
      height: 375px;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .goods_info{
    padding: 15px;
    background: #fff;
    .number-wrapper{
      display: flex;
      align-items: center;
      
      .price{
        color: #FF3838;
        font-size: 25px;
        span{
          font-size: 15px;
        }
      }
      .old-price{
        font-size: 15px;
        margin-left: 10px;
        color: #333333;
      }
     
    }
    .name{
      font-size: 16px;
      color: #333;
    }
    .msg{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .item{
        color: #999999;
        font-size: 14px;
      }
    }
  }
  .con-box{
    margin-top: 10px;
    padding-bottom: 20px;
    
  }
}
</style>
