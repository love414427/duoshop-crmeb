<template>
  <view class="quality-recommend" :style="viewColor">
	 <view class="quality_header">
		<view class="slider-banner swiper">
			<view class="swiper">
				<swiper indicator-dots="true" :autoplay="autoplay" :interval="interval" :duration="duration"
				 indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
					<block v-for="(item,index) in imgUrls" :key="index">
						<swiper-item>
							<image :src="item.pic" class="slide-image"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
	 </view>
    <view class="recommend_count">
		<view class="title acea-row">
		  <view class="name"> {{ name }}</view>
		  <text>{{ desc }}</text>
		</view>
		<view class="recommend_goods">
			<block v-for="(item,index) in recommendList" :key="index" v-if="index < 3">
				<view class="list"  @click="goDetail(item)">
					<view class="picture">
						<image :src="item.image"></image>
					</view>
					<view class="name line1">{{item.store_name}}</view>
				</view>

			</block>
		</view>
	</view>
    <view class="wrapper">
    	<GoodList :bastList="goodsList" :is-sort="false" :isLogin='isLogin'></GoodList>
    	<view class="txt-bar" v-if="goodsList.length>0 && !isScroll">我是有底线的~</view>
    </view>
	<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
import emptyPage from '@/components/emptyPage.vue'
import GoodList from "@/components/goodList";
import { getIndexData } from '@/api/api.js';
import { getGroomList,getHotBanner } from "@/api/store";
import { goShopDetail } from '@/libs/order.js'
import {initiateAssistApi} from '@/api/activity.js';
import util from "@/utils/util";
import { mapGetters } from "vuex";
import authorize from '@/components/Authorize';

const typeData = {
	best:{
		desc:'新品抢先购',
		name:'精品推荐'
	},
	hot:{
		desc:'剁手必备指南',
		name:'热门榜单'
	},
	new:{
		desc:'发现品质好物',
		name:'首页新品'
	},
	good:{
		desc:'惊喜折扣价',
		name:'推荐单品'
	},
}

export default {
  computed: mapGetters(['isLogin','uid','viewColor']),
  name: "HotNewGoods",
  components: {
        GoodList,
		emptyPage,
        authorize,
  },
  props: {},
  data: function() {
    return {
      imgUrls: [],
      goodsList: [],
	  recommendList: [],
      name: "",
	  hotData:[],
	  loaded:false,
      desc: "",
	  type:0,
	  autoplay:true,
	  circular:false,
	  interval: 3000,
	  duration: 500,
	  page:1,
	  limit:8,
	  isScroll:true,
	  isAuto: false, //没有授权的不会自动授权
	  isShowAuth: false, //是否隐藏授权
    };
  },
  /**
   * 用户点击右上角分享
   */
  // #ifdef MP
  onShareAppMessage: function() {
	  let that = this;
  	wx.showShareMenu({
  	      withShareTicket: true,
  	      menus: ['shareAppMessage', 'shareTimeline']
  	    })
  	return {
  		title: that.name || '',
  		path: 'pages/columnGoods/HotNewGoods/index?type='+that.type,
  	}
  },
  onShareTimeline: function() {
	  let that = this;
	  return {
  		title:  that.name || '',
  		  query: {
  		    type: that.type
  		  },
  		  imageUrl: ''
  		}
  },
  // #endif
  onLoad: function(option) {
	this.type = option.type
    this.getIndexGroomList();
	this.getHotBanner();
	getIndexData().then(res=>{
		this.hotData = res.data.hot;
	}).finally(e=>{
		this.loaded = true;
		this.titleInfo();
	});
  },
  watch:{
	name(n){
		uni.setNavigationBarTitle({
			title:n||'加载中'
		})
	}
  },
  methods: {
    titleInfo: function() {
      if(!this.loaded){
      	this.name = '';
      	this.desc = '';
      }else{
      	let name = (typeData[this.type]||{}).name || '精品推荐';
		let url = this.$route ? this.$route.fullPath : ('/' + util.getNowUrl());
      	this.hotData.forEach(data=>{
      		if(data.url == url) name = data.title;
      	})
      	this.name = name;
      	this.desc = (typeData[this.type]||{}).desc || '新品抢先购';
      }
    },
    getIndexGroomList: function() {
	  if(!this.isScroll) return
      let that = this;
      let type = this.type;
      getGroomList(type,{
				page:this.page,
				limit:this.limit
			}).then(res => {
            that.goodsList = that.goodsList.concat(res.data.list);
			if(this.page == 1)that.recommendList = that.goodsList.splice(0,3);
		    that.isScroll = res.data.list.length>=that.limit
		    that.page++
        })
        .catch(function(res) {
          that.$util.Tips({ title: res });
        });
    },
	getHotBanner(){
		let that = this
		getHotBanner(this.type).then(res=>{
			that.imgUrls = res.data;
		})
	},
	// 微信登录回调
	onLoadFun: function(e) {
		this.isShowAuth = false
	},
	// 授权关闭
	authColse: function(e) {
		this.isShowAuth = e
	},
	goDetail(item){
		goShopDetail(item, this.uid).then(res => {
		if (this.isLogin) {
			initiateAssistApi(item.activity_id).then(res => {
				let id = res.data.product_assist_set_id;
				uni.hideLoading();
				uni.navigateTo({
					url: '/pages/activity/assist_detail/index?id=' + id
				});
			}).catch((err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			});
		} else {
            this.isAuto = true;
            this.isShowAuth = true
		}
	})
	}
  },
	onReachBottom() {
		this.getIndexGroomList()
	}
};
</script>
<style lang="scss">
	/deep/ .empty-box{
		background-color: #f5f5f5;
	}
	.quality_header{
		position: relative;
		padding: 30rpx 20rpx 0;
		&::before{
			content: "";
			display: block;
			width: 100%;
			height: 180rpx;
			background: var(--view-theme);
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 0 0 20rpx 20rpx;
			z-index: 0;
		}
	}

	.swiper,swiper,swiper-item,.slide-image{
		width: 100%;
		height: 300rpx;
		border-radius: 16rpx;
		z-index: 20;
	}
	/deep/.swiper .uni-swiper-dot{
		width: 8rpx;
		height: 8rpx;
		border-radius: 100%;
		background-color: rgba(0,0,0,.3)!important;
	}
	/deep/.swiper .uni-swiper-dot-active{
		width: 18rpx;
		background-color: #E93323!important;
		border-radius: 4rpx;
		margin-top: -4rpx;
	}
	.quality-recommend {
		background: #F5F5F5;
	}
	.recommend_goods{
		padding: 30rpx 0;
		display: flex;

		.list{
			width: 210rpx;
			margin-right: 20rpx;
			&:last-child{
				margin-right: 0;
			}
			.picture,image{
				width:210rpx;
				height: 210rpx;
				border-radius: 16rpx;
			}
			.name{
				font-size: 26rpx;
				color: #282828;
				margin-top: 14rpx;
				padding: 0 4rpx;
			}
		}
	}
	.recommend_count{
		min-height: 416rpx;
		background-size: 100%;
		background-color: #fff;
		background-repeat: no-repeat;
		margin: 30rpx auto 0;
		width: 710rpx;
		padding: 0 20rpx;
		border-radius: 16rpx;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsYAAAGGCAMAAABPBrd2AAACIlBMVEUAAAD//f3/////7fr86en86en86ur/6+z86+z57u718fH86en76+v18PD48PD37u787e367u728fH86en47+/28fH38PD86en86Oj48fH/6ur57e737u/67e318vL86en67Oz67u/67O347e347Oz37+/08/P57O328PD57+/18vT38PD17u777O347u7/6Or57O347+/77O337vD47u727u/57u787Oz57e356+z47+/96uv57u757u727/D67+/17vD57+/77Oz57e376Oj37O/37+/57e357e/57+/67vD38fH67fD87Oz87O357Oz47+/28PD57Oz57e/67e347+/57O347+/95+n76+377Oz57+/47u/67ez86On76+z96+396ur67e397e3+7Oz86ur57e387Oz/6Oj84uH57e386Ob/6+z67O/85ef67Oz47Ov57u765ef/5en/6+385eT74uX+6ur/4+r84+f66+v87e756en65+L84uX67Oz67Ov57e385+n55OX85+f75ub639727Of85+r44eP/5ez87Oz+7Oz+6Of85On47u776ej56uX/4ef87e325+X96e376Oj+5eb76un+7+/+7e366Ob+4OD96+z57Oz86ej66+386Of/3+b+4eX76Of87u786ef75+b76en66un+3uP66ef86Oj/6ur76Of86en76eX66Ob+5+X67On/5uv77OpN2oM2AAAAtnRSTlMABgMJwrm/DK0OEbeyQSE6qlonuz41MsXAJMaLSn0TvXpVpoaDOBaTRF4ZRimiHsaVTqQcPC5qsH+OH69tcS9QLG+oYrUbKmVIUlcYU52biGAVdGZ3TJBcxKCzaGN2x7aZwzGesceYlsbGTcbENsNyj5nGx8bGxcfHxmpKx8fDQ0abw8PDv8bHwsPIt7+/x3aWyMeQyMeaxm64u6fGqZ6Bx57HxZK8x6KOhsaKdr+NesiFx8jHwiKj4TAAAIlHSURBVHjatJnBrtJAFIaN0WjcGRdN2PkCduPOB9HVxA1Jm7rqWKCmdUOUyKJJSZWF1wTRsEATifCA/ufMGYYOt1aMfv+cM2emQwv0b+3FGyc8/vH57pvSsEMkZbLbUNvURY0GkFs0TVPPmhlT91D6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');
		.title {
			padding: 20rpx 0;
			align-items: flex-end;
			.name{
				font-size:32rpx;
				color: #282828;
				font-weight: bold;
				margin-right: 20rpx;
			}
			text{
				font-size: 24rpx;
				color: #666666;
			}


		}
	}
	.wrapper{
		margin-top: 30rpx;
		padding: 0 20rpx;
	}
	.txt-bar{
		padding: 20rpx 0;
		text-align: center;
		font-size: 26rpx;
		color: #666;
		background-color: #f5f5f5;
	}
</style>
