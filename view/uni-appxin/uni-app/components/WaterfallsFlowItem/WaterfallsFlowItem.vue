<template>
    <view v-if="type == 0" class="wf-item-page wf-page0" :style="viewColor">
		<view class='pictrue'>
			<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
			<view v-if="item.stock == 0" class="sell_out">已售罄</view>
			<view v-if="item.border_pic" :style="{ backgroundImage: `url(${item.border_pic})` }" class="border-picture"></view>
		</view> 
		<view class="text">
			<view class='name line2'>{{item.store_name}}</view>			
			<view class="acea-row row-middle">
				<view class='money'>￥<text class='num'>{{item.price}}</text></view>				
			</view>
			<view v-if="item.show_svip_info && item.show_svip_info.show_svip_price && item.svip_price" class="acea-row row-middle svip">
				<text class='vip-money'>￥{{item.svip_price}}</text>
				<view class="vipImg">
					<image src="/static/images/svip.png"></image>
				</view>
			</view>
			<view class="item_tags">
				<text v-if="item.product_type == 0 && item.merchant.type_name" class="font-bg-red b-color">{{item.merchant.type_name}}</text>
				<text v-else-if="item.product_type == 0 && item.merchant.is_trader" class="font-bg-red b-color">自营</text>
				<text v-if="item.product_type != 0" :class="'font_bg-red type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</text>
				<text class="tags_item ticket" v-if="item.issetCoupon">领券</text>
				<text class="tags_item delivery" v-if="item.delivery_free == 1">包邮</text>
			</view>
		</view>
    </view>
	<view v-else-if="type == 1" class="wf-page1" :style="viewColor">
		<view class='pictrue'>
			<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
			<view v-if="item.stock == 0" class="sell_out">已售罄</view>
			<view v-if="item.border_pic" :style="{ backgroundImage: `url(${item.border_pic})` }" class="border-picture"></view>
		</view>
		<view class='text'>
			<view class='name line2'>{{item.store_name}}</view>
			<view class='money'>
				￥<text class='num'>{{item.price}}</text>	
			</view>
			<view v-if="item.show_svip_info.show_svip && item.show_svip_info.show_svip_price" class="acea-row row-middle svip">
				<text class='vip-money'>￥{{item.svip_price}}</text>
				<view class="vipImg">
					<image src="/static/images/svip.png"></image>
				</view>
			</view>
			<view class="item_tags acea-row">
				<text v-if="item.merchant.type_name && item.product_type == 0" class="font-bg-red b-color">{{item.merchant.type_name}}</text>
				<text v-else-if="item.merchant.is_trader && item.product_type == 0" class="font-bg-red b-color">自营</text>
				<text v-if="item.product_type != 0" :class="'font_bg-red type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</text>
				<text class="tags_item ticket" v-if="item.issetCoupon">领券</text>
				<text class="tags_item delivery" v-if="item.delivery_free == 1">包邮</text>
			</view>
			<view class="score">{{item.rate}}评分 {{item.reply_count}}条评论</view>
			<view class="company" v-if="item.merchant" @click.stop="goShop(item.merchant.mer_id)">
				<text class="line1">{{item.merchant.mer_name}}</text>
				<view class="flex" v-if="isStore != '1'">
					进店
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</view>
		<!-- 返佣 -->
		<block v-if="item.max_extension>0 && (item.product_type == 0 || item.product_type == 2)">
			<view class="foot-bar">
				<text class="iconfont icon-fenxiang"></text>
				最高赚 ¥{{item.max_extension}}
			</view>
		</block>
	</view>	
</template>

<script>
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
import {mapGetters} from "vuex";
export default {
	components:{easyLoadimage},
	computed: mapGetters(['viewColor']),
    props: {
			item: {
				type: Object,
				require: true
			},
		type: {
			type: Number,
			default: 0
		},
		isStore: {
			type: [String, Number],
			default: '1'
		},
		isLogin: {
			type: Boolean,
			require: false
		}
  },
	data(){
		return {
		}
	},
	methods: {
		goShop(id) {
			this.$emit('goShop', id);
		},
		authOpen(){
			this.$emit('authOpen');
		},
		followToggle(item){
			this.$emit('followToggle', item);
		}
	}	
}

</script>
<style lang="scss" scoped>
.wf-item-page {
	background: #fff;
	overflow: hidden;
	border-radius: 16rpx;
	padding-bottom: 20rpx;
}
.wf-page0 .coupon{
	background:rgba(255,248,247,1);
	border:1px solid rgba(233,51,35,1);
	border-radius:4rpx;
	font-size:20rpx;
	margin-left: 18rpx;
	padding: 1rpx 4rpx;
}
.wf-page0 .pictrue{
	width: 100%!important;
	height: 345rpx;
	position: relative;
	/deep/image,/deep/.easy-loadimage,uni-image{
		height: 345rpx;
		border-radius: 16rpx 16rpx 0 0;
	}
	.border-picture {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 16rpx 16rpx 0 0;
		background: center/cover no-repeat;
	}
}
 .loadfail-img{
		width: 100%;
    height: 360rpx;
}
.svip{
	margin: 5rpx 0 15rpx;
}
.vip-money {
	color: #282828;
	font-size: 22rpx;
	margin-left: 6rpx;
	font-weight: bold;
}
.vipImg {
	width: 65rpx;
	height: 28rpx;
	margin-left: 4rpx;
	image {
		width: 100%;
		height: 100%;
		display: block;
	}
}
.wf-page0 .name {
	color: #282828;
	margin: 20rpx 0 10rpx 0;
	font-size: 13px;
	overflow:hidden; 
	text-overflow: ellipsis; 
	display: -webkit-box; 
	-webkit-line-clamp: 2; 
	-webkit-box-orient: vertical;
	text-align: left;
}
.wf-page0 .text{
	padding: 0 20rpx;
}	
.wf-page0 .money {
	font-size: 20rpx;
	font-weight: bold;
	color: var(--view-priceColor);
}
.b-color {
	background-color: var(--view-theme);
	border: 1px solid var(--view-theme);
}
.wf-page0 .money .num {
	font-size: 34rpx;
}
.wf-page1 .wf-item{
	.name{
		font-size: 13px;
		overflow:hidden; 
		text-overflow: ellipsis; 
		display: -webkit-box; 
		-webkit-line-clamp: 2; 
		-webkit-box-orient: vertical;
		text-align: left;
	}
}
.wf-page1 .pictrue {
	position: relative;
	height: 345rpx;
	width: 100%!important;
	/deep/image,/deep/.easy-loadimage,uni-image{
		height: 345rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
	.border-picture {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background: center/cover no-repeat;
	}
	
}
.sell_out {
	display: flex;
	width: 150rpx;
	height: 150rpx;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	background: rgba(0,0,0,.6);
	color: #fff;
	font-size: 30rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -75rpx 0 0 -75rpx;
	&::before{
		content: "";
		display: block;
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		border: 1px dashed #fff;
		position: absolute;
		top: 5rpx;
		left: 5rpx;
	}
}
.loading-img{
	height: 345rpx;
  max-height: 360rpx;
}
.wf-page1 .text {
	padding: 20rpx 17rpx 26rpx 17rpx;
	font-size: 30rpx;
	color: #222;
}
.wf-page1 .text .money {
	display: flex;
	align-items: center;
	font-size: 26rpx;
	font-weight: bold;
	margin-top: 8rpx;
	color: var(--view-priceColor);
}
.wf-page1 .text .money .num {
	font-size: 34rpx;
}
.item_tags{
	margin-top: 8rpx;
	display: flex;
}
.item_tags .tags_item {
	display: flex;
	font-size: 20rpx;
	text-align: center;
	border-radius: 5rpx;
	padding: 0 4rpx;
	height: 28rpx;
	align-items: center;
	justify-content: center;
	margin-right: 8rpx;
}
.item_tags .tags_item.ticket{
	color: var(--view-theme);
	border: 1px solid var(--view-theme);
}
.item_tags .tags_item.delivery{
	color: #FF9000;
	border: 1px solid #FF9000;
}
.wf-page1 .text .money .ticket-big {
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 163rpx;
	padding: 0 6rpx;
	height: 28rpx;
	margin-left: 10rpx;
	background-image: url(~static/images/yh.png);
	background-size: 100% 100%;
	font-size: 20rpx;
	font-weight: normal;
}
.wf-page1 .text .score {
	margin-top: 10rpx;
	color: #737373;
	font-size: 20rpx;
}
.wf-page1 .text .company {
	display: flex;
	align-items: center;
	color: #737373;
	font-size: 20rpx;
	margin-top: 10rpx;
	.line1{
		max-width: 200rpx;
	}
	.flex {
		display: flex;
		align-items: center;
		margin-left: 10rpx;
		color: #282828;
		.iconfont {
			font-size: 16rpx;
			margin-top: 4rpx;
		}
	}
}
.foot-bar {
	width: 100%;
	height: 52rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: linear-gradient(-90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	border-radius: 0px 0px 16rpx 16rpx;
	color: #fff;
	font-size: 24rpx;
	.icon-fenxiang {
		font-size: 24rpx;
		margin-right: 10rpx;
	}
}
</style>
