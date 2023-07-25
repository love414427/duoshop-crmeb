<template>
	<view :style="viewColor">
		<view class="CommissionRank">
		    <view class="header">
		      <view class="rank" v-if="position">您目前的排名第<text class="num">{{position }}</text>名</view>
		      <view class="rank" v-else>您目前暂无排名</view>
		    </view>
		    <view class="wrapper">
		      <view class="nav acea-row row-around">
		        <view class="item" :class="active == index ? 't-color' : ''" v-for="(item,index) in navList" :key="index" @click="switchTap(index)">
		          {{ item }}
		        </view>
		      </view>
		      <view class="list">
		      <view class="item acea-row row-between-wrapper" v-for="(item,index) in rankList" :key="index">
		        <view class="num" v-if="index <= 2">
		          <image :src="`${domain}/static/images/medal0${index+1}.png`"></image>
		        </view>
		        <view class="num" v-else>
		        {{index+1}}
		        </view>
		        <view class="picTxt acea-row row-between-wrapper">
		          <view class="pictrue"><image :src="item.avatar ? item.avatar : '/static/images/f.png'"></image></view>
		          <view class="text line1">{{item.nickname}}</view>
		        </view>
		        <view class="people p-color">￥{{item.count}}</view>
		      </view>
		    </view>
		    </view>
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
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { getBrokerageRank } from '@/api/user.js';
	import { mapGetters } from "vuex";
	 import authorize from '@/components/Authorize';
	export default {
		components: {
			authorize,
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				navList: ["周排行", "月排行"],
				active: 0,
				rankList:[],
				page:1,
				limit:10,
				loadend:false,
				loading:false,
				loadTitle:'加载更多',
				type:'week',
				position:0,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin','viewColor','keyColor']),
		onLoad(){
			if(this.isLogin){
				 this.getBrokerageRankList();
			}else{
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		methods: {
			 onLoadFun:function(){
					this.isShowAuth = false;
			    this.getBrokerageRankList();
			  },
			// 授权关闭
			authColse:function(e){
				this.isShowAuth = e
			},
			switchTap:function(index){
				this.active = index;
				this.type = index ? 'month': 'week';
				this.page = 1;
				this.loadend = false;
				this.$set(this,'rankList',[]);
			    this.getBrokerageRankList();
			  },
			  getBrokerageRankList:function(){
			      if(this.loadend) return;
			      if(this.loading) return;
				  this.loading = true;
				  this.loadTitle = '';
			      getBrokerageRank({
			        page:this.page,
			        limit:this.limit,
			        type:this.type
			      }).then(res=>{
			        let list = res.data.list;
			        let loadend = list.length < this.limit;
			        this.rankList.push.apply(this.rankList, list);
					this.loading = false;
					this.loadend = loadend;
					this.loadTitle = loadend ? '😕我也是有底线的':'加载更多';
					this.$set(this,'rankList',this.rankList);
					this.position = res.data.position;
			      }).catch(err=>{
					  this.loading = false;
					  this.loadTitle = '加载更多';
			      })
			    }
		},
		 onReachBottom: function () {
			this.page++;
		    this.getBrokerageRankList();
		  }
	}
</script>

<style scoped lang="scss">
	.CommissionRank .header {
	  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAFYCAMAAAA7uIkNAAAARVBMVEVHcEz9xgD5tQD6uwD9xAD/ygD3sAD9wgD9wwD9xQD8wAD3qwD9mAT/xyb+igL6ogD+0D7/tiH/pRz/tQX/dAD/+OH/5Zhuw8b0AAAACnRSTlMA////2v//Onaspq/3NAAAIABJREFUeNrsnYmCqjgUROca47yOYr/R/v9vHSALNxuEzWaposFGZVGPReWC8M8/EARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBGf37779//vz5+vq6tpKNiPRIfW/9WP0MvE3QzimvGb+SLFXNfgM+3jjoyJgDe2ivqNeZZTroHvQN83hDoe2SfpVL6wrkoS2iTnIt1T4P5qHNoH6V6wvIQ8d29YTL4x2HfktrZHVkeWibrMvf0heIh07COoiHzsU6iIc+1TbdBusgHvpAHeYqt6UrajXQSiFma6zD4qHVQgzJrQoWDx03scPioROmmMDiATy0RPOU5D6ETAMdPcX4whEG0GlgR4iHTgU7HB46FexweOhUsDcn9fjCJwidBPYWeFRpoEL9kQcQypJQEexXeQxhxxM0mGOOAjvarNDxQ3sIPD5TKKejwY42K3SOHINEA53N2u1+Vny4UFCP4cc9UtDb4YYzixmGa0uo0UDZHOMz7lNOA49/jur+dUmuG5qsUGftCR/vbilDP7HHyczBzIekPz61Z/OhYLm5b2e3XDs1mqxQponqYeKTxem2D1BkveH3Zibv3kI8fCPqKbE14usBg4dsaqce1ihIxiWMUsT/NNYp7fkUrBv53Acub4dI8LD2K0fUZ4f4XV6YSCWXIG7EE4+99WiNlkP8eT7lMvONgcGfnvYku5Rpo1KyPUge4qkkE28hSm7T/k7R9yCmPO3vhBLNyfXlOXfs7YHDeyASN/qodes1F6chL4PYEq4nhamJL5dN4H2V0WI9dZAhhrYbJLIyxaD7WwOKvyFEwfZi3K13X7QcO3//ud1yqb3lXwE9hMGft41KQViglCH6bU4KszMlajrcWr3tQsEtJSuRUYWUoqJ/+NzgHztztFjPGWRIpp052VHPWDyen37odvxcqHhquxVAoDltRcY37mztO2h59tUPu+ThbzxG7zcdrGOGFk7J8bj+jwrN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");
	  background-repeat: no-repeat;
	  background-color: var(--view-theme);
	  width: 100%;height: 344rpx;background-size: 100% 100%;
	  }
	.CommissionRank .header .rank {font-size: 33rpx;color: #fff;position: absolute;top: 160rpx;left: 48rpx;}
	.CommissionRank .header .rank .num {font-size: 51rpx;font-weight: bold;margin: 0 10rpx;}
	.CommissionRank .wrapper {width: 710rpx;background-color: #fff;border-radius: 20rpx;margin: -76rpx auto 0 auto;}
	.CommissionRank .wrapper .nav {height: 99rpx;border-bottom: 2.5rpx solid #f3f3f3;font-size: 30rpx;font-weight: bold;color: #999;line-height: 99rpx;}
	.CommissionRank .wrapper .nav .item.t-color {border-bottom: 4rpx solid var(--view-theme); color: var(--view-theme)}
	.p-color{color: var(--view-priceColor);}
	.CommissionRank .wrapper .list {padding: 0 30rpx;}
	.CommissionRank .wrapper .list .item {border-bottom: 1px solid #f3f3f3;height: 101rpx;font-size: 28rpx;}
	.CommissionRank .wrapper .list .item .num {color: #666;width: 70rpx;}
	.CommissionRank .wrapper .list .item .num image {width: 34rpx;height: 40rpx;display: block;}
	.CommissionRank .wrapper .list .item .picTxt {width: 350rpx;}
	.CommissionRank .wrapper .list .item .picTxt .pictrue {width: 68rpx;height: 68rpx;}
	.CommissionRank .wrapper .list .item .picTxt .pictrue image {width: 100%;height: 100%;display: block;border-radius: 50%;}
	.CommissionRank .wrapper .list .item .picTxt .text {width: 262rpx;color: #333;}
	.CommissionRank .wrapper .list .item .people {width: 175rpx;text-align: right;}
</style>
