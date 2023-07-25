<template>
  <view>
    <view class="order-index" ref="container">
      <view class="header">
		  <div class="header_count">
			  <swiper
			  	indicator-dots="true"
			  	:circular="circular"
			  	indicator-color="#E4E4E4"
			  	indicator-active-color="#E93323"
			  	previous-margin="0"
			  	next-margin="0"
			  	:current="swiperCur"
			  	@change="swiperChange"
			  >
			  	<block>
			  		<swiper-item :class="{ active: 0 == swiperCur }">
			  			<view class="slide-navigator">
			  				<view class="item" hover-class='none' @click="jumpAddGoods">
			  					<image mode='widthFix' class="image" src="../static/images/product_add.png"></image>
			  					<text class="text">添加商品</text>
			  				</view>
			  				<navigator class="item" :url="`/pages/product/goodsOnSale/index?mer_id=${mer_id}&type=1`" hover-class='none'>
			  				  <image mode='widthFix' class="image" src="../static/images/product_sales.png"></image>
			  				  <text class="text">在售商品</text>
			  				</navigator>
			  				<navigator class="item" :url="`/pages/product/goodsOnSale/index?mer_id=${mer_id}&type=3`" hover-class='none'>
			  				  <image mode='widthFix' class="image" src="../static/images/product_out.png"></image>
			  				  <text class="text">售罄商品</text>
			  				</navigator>
			  				<navigator class="item" :url="`/pages/product/goodsOnSale/index?mer_id=${mer_id}&type=5`" hover-class='none'>
			  				  <image mode='widthFix' class="image" src="../static/images/product_recycle.png"></image>
			  				  <text class="text">回收站</text>
			  				</navigator>
			  				<navigator class="item" :url="`/pages/product/storeClassification/index?mer_id=${mer_id}`" hover-class='none'>
			  				  <image mode='widthFix' class="image" src="../static/images/product_cate.png"></image>
			  				  <text class="text">店铺分类</text>
			  				</navigator>		
			  			</view>
					</swiper-item>
			  		<swiper-item :class="{ active: 1 == swiperCur }">
			  			<view class="slide-navigator">
			  				<navigator class="item" :url="`/pages/product/addGoods/freightTemplate?mer_id=${mer_id}`" hover-class='none'>
			  				  <image mode='widthFix' class="image" src="../static/images/product_freight.png"></image>
			  				  <text class="text">运费模板</text>
			  				</navigator>
			  				<navigator class="item" :url="`/pages/product/addGoods/mulSpecification?mer_id=${mer_id}`" hover-class='none'>
			  				  <image mode='widthFix' class="image" src="../static/images/product_specification.png"></image>
			  				  <text class="text">规格模板</text>
			  				</navigator>
			  			</view>		
			  		</swiper-item>
			  	</block>
			  </swiper>
		  </div>
      </view>
      <view class="wrapper">
        <view class='product_list acea-row row-between-wrapper'>
          <block v-for="(item,index) in productList" :key="index"> 
              <view class='item'>
				<view class='image'>
				  <image :src='item.image'></image>
				  <text v-if="item.spec_type == 1" class="spec">多规格</text>
				</view>
				<view class='text'>
				  <view class='name'>
					  <text v-if="item.is_gift_bag" class="font-org">礼包</text>
					  <text class="text_name acea-row line1">{{item.store_name}}</text>
				   
				  </view>
				  <view class="sales">
				    <text class="num">库存: {{item.stock}}</text>
				    <text class="num">销量: {{item.sales}}</text>
				  </view>
				  <view class='money-wrap'>
				    <text class='price font-color'>￥{{item.price}}</text>
				    <text class='ot_price'>￥{{item.ot_price}}</text>
				  </view>
				</view>  
			  </view>		  
            <view class="operation acea-row row-between-wrapper">
              <view></view>
              <view class="acea-row row-middle">
                <view v-if="item.is_show == 1 && item.status == 1" class="bnt" @tap.stop="handleShelves(item,0)">下架</view>
                <view v-if="item.is_show == 0 && item.status == 1" class="bnt" @tap.stop="handleShelves(item),1">上架</view>
				<view @click="editGoods(item)" class="bnt">编辑</view>
				<navigator :url="'/pages/admin/goods_details/index?product_id='+item.product_id+'&product_type=0'" class="bnt" hover-class='none'>预览</navigator>
				<view class="bnt" v-if="item.is_show == 0" @tap.stop="handleRecycle(item,index)">删除</view>
				<view class="bnt bnt_recommend" v-if="item.is_show == 1" @tap.stop="handleRecommend(item)">{{item.is_good ? '取消推荐' : '店铺推荐'}}</view>
              </view>
            </view>
          </block>
        </view>
      </view>
      <Loading :loaded="loaded" :loading="loading"></Loading>
    </view>
  </view>
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
import {
  productLstApi, productDeleteApi, productOffApi, productRecommendApi
} from "@/api/product";
import Loading from '@/components/Loading/index.vue';
import { navigateTo, navigateBack, serialize, setStorage, getStorage, removeStorage, Toast, Modal,} from '../../../libs/uniApi.js';
export default {
  name: 'productList',
  components: {
    Loading,
  },
  data() {
    return {
      current: "",
      where: {
        page: 1,
        limit: 20
      },
      loaded: false,
      loading: false,
      mer_id: '',
      productList: [],
	  swiperCur: 0,
	  circular: true,
    }
  },
  onLoad(options) {
  	this.mer_id = options.mer_id;
    this.getList(this.mer_id);
  },
  methods: {
		// 跳转添加商品界面
		jumpAddGoods() {
			const data = getStorage('addGoodsFormData');
			if(data && data.product_id){
				let waitDeleteData = ['addGoodsFormData', 'singleSpecification', 'attrValue', 'modifyPriceData', 'addGoodsSecoundData', 'goodsDis', 'editGoodsDetils'];
				waitDeleteData.forEach(item => {
					if(getStorage(item)) {
						removeStorage(item);
					}
				})
			}
			navigateTo(1, '/pages/product/addGoods/index', { mer_id: this.mer_id });
		},
	// swiper
	swiperChange(e) {
		let { current, source } = e.detail;
		if (source === 'touch') {
			//根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			this.swiperCur = e.detail.current;
		}
	},
    getList: function(mer_id) {
      var that = this;
      if(that.loading || that.loaded) return;
      that.loading = true;
      productLstApi(mer_id, that.where).then(
        res => {
          that.loading = false;
          that.loaded = res.data.list.length < that.where.limit;
          that.productList.push.apply(that.productList, res.data.list);
          that.where.page = that.where.page + 1;
        },
        error => {
          that.$util.Tips({
            title: error.msg
          })
        }
      );
    },
    editGoods(item) {
      let waitDeleteData = [
        'addGoodsFormData',
        'singleSpecification',
        'attrValue',
        'modifyPriceData',
        'addGoodsSecoundData',
        'goodsDis',
        'editGoodsDetils',
        'canChange',
        'canChangeSecound'
      ];
      waitDeleteData.forEach(item => {
        if(getStorage(item)) {
          removeStorage(item);
        }
      });
      navigateTo(1, '/pages/product/addGoods/index', { mer_id: item.mer_id, product_id: item.product_id });
    },
    handleRecycle(item, index) {
      let that = this;
			Modal('温馨提示', `商品"${item.store_name}"将被加入回收站，请问是否继续?`).then(res => {
				productDeleteApi(that.mer_id, item.product_id)
					.then(res => {
					 that.$util.Tips({
						title: res.message,
						icon: 'success'
					 }, () => {
							that.productList.splice(index, 1);
						});
					})
					.catch(rej => {
						Toast(`${rej}, 加入回收站失败`);
					});
			});
    },
    //下架 0
    handleShelves(item, status) {
      let that = this;
      if(status == 0) {
        uni.showModal({
          content: '确定要下架该商品么？',
          success: function(res) {
            if(res.confirm) {
              that.onAndOff(item, 0)
              uni.showToast({
                title: '下架成功',
                icon: 'none'
              })
            } else if(res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      } else {
        that.onAndOff(item, 1)
      }
    },
    //上下架
    onAndOff(item, status) {
      let that = this;
      productOffApi(that.mer_id, item.product_id, { status: status }).then((res) => {
        that.$util.Tips({
          title: res.message,
          icon: 'success'
        }, () => {
         that.$set(item,'is_show', item.is_show == 0 ? 1 : 0);
        });
      }).catch(err => {
        return that.$util.Tips({
          title: err
        });
      });
    },
    //设置推荐
    handleRecommend(item) {
      let that = this
      let is_good = item.is_good ? 0 : 1
      productRecommendApi(that.mer_id, item.product_id, { is_good: is_good }).then((res) => {
        that.$util.Tips({
          title: res.message,
          icon: 'success'
        }, () => {
		  that.$set(item,'is_good', item.is_good == 0 ? 1 : 0);
        });
      }).catch(err => {
        return that.$util.Tips({
          title: err
        });
      });
    },
    more(index) {
      this.current = index
    },
  },
  onReachBottom() {
    this.getList(this.mer_id)
  }
}
</script>

<style scoped lang="scss">
page{
	background-color: #F5F5F5;
}
.order-index{
	background-image: url('data:image/png;base64,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');
	background-repeat: no-repeat;
	background-size: 100%;
}
.popupn {
  position: fixed;
  width: 100%;
  text-align: center;
  top: 0;
  left: 0;
  background: transparent;
  height: 90rpx;
  line-height: 90rpx;
  z-index: 5;
  .spin {
    display: block;
    transform: rotate(180deg);
    font-size: 36rpx;
  }
  .title {
    max-width: 560rpx;
    margin: 0 auto;
    position: relative;
    display: inline;
    padding: 10rpx 30rpx 10rpx 50rpx;
    background-color: rgba(0,0,0,.25);
    border-radius: 30rpx;
    color: #FFFFFF;
  }
  .iconfont {
    display: inline-block;
    position: relative;
    top: 4rpx;
    right: 0;
  }
  .mer_logo {
    width: 34rpx;
    height: 34rpx;
    position: relative;
    top: 6rpx;
    right: 10px;
  }
  .mer_name {
    display: inline-block;
    max-width: 650rpx;
  }
  .invoice-content {
    background-color: #ffffff;
  }
}

/deep/.uni-swiper-slides{
	inset: 0!important;
}
uni-swiper,swiper{
	height: 200rpx;
}
.header {
  padding-top: 40rpx;
  margin: 0 20rpx;
  .header_count{
	  width: 710rpx;
	  padding: 30rpx 30rpx 0;
	  background: #ffffff;
	  border-radius: 10rpx;
	  position: relative;
  }
  .item {
	 display: inline-block;
	 width: 130rpx;
	 text-align: center;
    .image {
      width: 84rpx;
      height: 84rpx;
    }
    .text {
      display: block;
      text-align: center;
      color: #666666;
      font-size: 24rpx;
      margin-top: 18rpx;
    }
  }
}
/deep/.uni-swiper-slides{
	width: 650rpx;
}
/deep/.uni-swiper-dot{
	width: 15rpx;
	height: 5rpx;
}
/deep/.uni-swiper-dots-horizontal .uni-swiper-dot{
	margin-right: 0;
}
.product_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 0 20rpx;
  .item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 30rpx 20rpx;
    border-radius: 0;
    margin-bottom: 0;
    background: #ffffff;
    margin-top: 30rpx;
    border-radius: 10rpx 10rpx 0 0;
    .image,image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 16rpx;
      position: relative;
      .spec {
        color: #ffffff;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 16rpx 0 16rpx 0;
        text-align: center;
        font-size: 18rpx;
        display: inline-block;
        width: 84rpx;
        line-height: 30rpx;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      uni-image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 16rpx;
      }
    }
    .text {
      position: relative;
      flex: 1;
      min-width: 0;
      padding: 10rpx 10rpx 20rpx 30rpx;
      .name {
        color: #282828;
        font-size: 30rpx;
        font-family: "PingFang SC";
		display: flex;
		align-items: center;
      }
	   .text_name{
	  		  display: inline-block;
	  		  max-width: 400rpx;
	  	  }
	  	  .font-org{
	  		  background-color: #FC8327;
	  	
	  		  display: inline-block;
	  		  color: #fff;
	  		  font-size: 16rpx;
	  		  text-align: center;
	  		  border-radius: 5rpx;
	  		  padding: 0 4rpx;
	  		  line-height: 28rpx;
	  		  margin-right: 8rpx;
	  	  }
      .money-wrap {
        margin-top: 20rpx;
        .price {
          font-size: 30rpx;
          display: inline-block;
          margin-right: 15rpx;
        }
        .ot_price {
          color: #bebebe;
          font-size: 26rpx;
          text-decoration: line-through;
        }
      }
      .sales {
        margin-top: 20rpx;
        color: #868686;
        font-size: 22rpx;
        .num {
          display: inline-block;
          margin-right: 20rpx;
        }
      }
    }
  }
  .operation {
    padding: 20upx 30upx;
    background: #ffffff;
    width: 100%;
    border-radius: 0 0 10rpx 10rpx; 
    .bnt {
      font-size: 26rpx;
      color: #999999;
      width: 120rpx;
      height: 58rpx;
      border-radius: 30rpx;
      border: 1px solid #999999;
      text-align: center;
      line-height: 58rpx;
      ~ .bnt {
        margin-left: 18rpx;
      }
	  &.bnt_recommend{
	  	width: 160rpx;
	  	color: #ffffff;
	  	background: linear-gradient(135deg, #FD6523 0%, #E93323 100%);
		border-color: transparent;
	  }
    }
  }
}
</style>
