<template>
	<view class="content">
		<view class="rank_header" :style="{ 'background-image': `url(${domain}/static/images/rank_header.png)`}">
			<view class="cate_name">
				<text class="name line1">
					<text class="title_icon icon_left" :style="{ 'background-image': `url(${domain}/static/images/rank-title.png)`}"></text>
					{{(active == 0 || !cate_name) ? '热销TOP总榜单' : `${cate_name}热卖榜`}}
					<text class="title_icon icon_right" :style="{ 'background-image': `url(${domain}/static/images/rank-title.png)`}"></text>
				</text>
			</view>
			<view class="scroll_box">
				<scroll-view scroll-x="true" style="white-space: nowrap; vertical-align: middle;" show-scrollbar="false" :scroll-into-view="scrollInto">
					<view class="scroll_item" v-for="(item,index) in categoryList" :key="item.store_category_id" :id="`cate${item.store_category_id}`"
						@click="checkActive(index,item)"
						:class="active == item.store_category_id ? 'scroll_item_active' : ''">{{item.cate_name}}
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="rank_list pad30">
			<view class='item acea-row' v-for="(item,index) in spuTopList" :key="item.spu_id" @click="godDetail(item)">
				<view class="rank" :class="'rank'+index"
				:style="{'color': index<3 ? '#CE8F21' : '#986561'}">
				{{index < 9 ? '0'+(index+1) : index+1}}
				</view>
				<view class='pictrue on'>
					<image :src='item.image' class="on"></image>
				</view>
				<view class='goods-msg pad16 acea-row row-column row-between'>
					<text class="name line2">{{item.store_name}}</text>
					<view v-if="item.sales>0" class="list"><text class="iconfont icon-goumai"></text>{{item.sales>10000 ? (item.sales/10000)+'万' : item.sales}}人买过</view>
					<view class="mt-18 acea-row row-bottom">
						<BaseMoney :money="item.price" symbolSize="26" integerSize="36" decimalSize="28"
							incolor="E93323" weight />
						<BaseMoney :money="item.ot_price" symbolSize="22" integerSize="22" decimalSize="22"
							incolor="999999" class="ml-16" line />
					</view>
				</view>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import { spuTop,spuTopList } from '@/api/activity.js';
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		data() {
			return {
				categoryList: [{
					store_category_id: 0,
					cate_name: '总榜'
				}],
				cate_name: "",
				spuTopList: [],
				active: 0,
				pro_top_banner: 'https://zhongbang-1257983696.cos.ap-beijing.myqcloud.com/uploads/def/20220801/383c0026840f70a9b4e33a43c6bd3341.png',
				scrollInto: '',
				domain: HTTP_REQUEST_URL,
			}
		},
		onLoad(option) {
			this.spuTop(option.cate_id || 0)
		},
		methods: {
			spuTop(cate_id) {
				spuTop().then(res => {
					this.categoryList = [...this.categoryList, ...res.data]
					this.cate_name = this.getCate(cate_id,this.categoryList) || ''
					this.$nextTick(() => {
						this.getSpuTopList(cate_id)
						this.active = cate_id && this.cate_name ? cate_id : 0
						this.scrollInto = `cate${cate_id}`;
					});
				})
			},
			getSpuTopList(cate_id) {
				cate_id = this.cate_name ? cate_id : 0
				spuTopList({
					cate_pid: cate_id
				}).then(res => {
					this.spuTopList = (res.data[0] && res.data[0]['list']) || []
				})
			},
			checkActive(index, item) {
				this.active = item.store_category_id;
				this.cate_name = item.cate_name
				this.spuTopList = [];
				this.getSpuTopList(item.store_category_id)
			},
			// 去商品详情页
			godDetail(item) {
				uni.navigateTo({
					url: "/pages/goods_details/index?id=" + item.product_id
				})
			},
			// 获取第一次进来的默认分类名称
			getCate(id,arr){
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].store_category_id == id) {
						return arr[i]['cate_name']
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background: #171717;
		min-height: 100vh;
	}
	.rank_header {
		background-size: cover;
		height: 270rpx;
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		z-index: 9999;
		background-color: #171717;
		.cate_name{
			text-align: center;
			position: relative;
			top: 80rpx;
			.name{
				color: #FFE9BE;
				font-weight: bold;
				font-size: 44rpx;
				padding: 0 64rpx;
				position: relative;
				display: inline-block;
				.title_icon{
					content: "";
					display: inline-block;
					width: 38rpx;
					height: 58rpx;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 0;
					&.icon_left{
						left: 0;
					}
					&.icon_right{
						right: 0;
						transform: rotateY(180deg);
					}
				}	
			}
		}
	}
	.header {
		position: relative;
		z-index: 6;
		display: flex;
		align-items: center;
		padding-right: 34rpx;
		height: 43px;
		padding-left: 33rpx;
		.head-menu {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			height: 27px;
			width: 70px;
			border-radius: 13px;
			.icon-xiangzuo {
				font-size: 32rpx;
				color: #FFFFFF;
			}
			.iconfont {
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				flex: 1;
				text-align: center;
				color: #fff;
				box-sizing: border-box;
				&.icon-xiangzuo {
					border-right: 1px solid #fff;
				}
			}
		}
	}
	.head-menu {
		display: flex;
		align-items: center;
		height: 54rpx;
		width: 140rpx;
		background: transparent;
		border: 1px solid rgba(151, 151, 151, 0.2);
		border-radius: 27rpx;
		position: relative;
		z-index: 9999;
		&:after {
			content: '';
			position: absolute;
			width: 1px;
			height: 26rpx;
			background-color: #EAEAEA;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		.iconfont {
			flex: 1;
			text-align: center;
			color: #fff;
			box-sizing: border-box;
		}
	}
	.scroll_box {
		width: 750rpx;
		line-height: 50rpx;
		padding-left: 32rpx;
		margin-top: 140rpx;
	}
	.scroll_item {
		display: inline-block;
		font-size: 28rpx;
		color: #6D6D6D;	
		&:last-child {
			margin-right: 40rpx;
		}	
	}
	.scroll_item_active {
		font-weight: 500;
		position: relative;
		text-align: center;
		color: #fff;
		&::after{
			content: "";
			display: block;
			margin: 10rpx auto 0;
			width: 80%;
			height:4rpx;
			border-radius: 2rpx;
			background: #fff;
		}
	}
	.scroll_item~.scroll_item {
		margin-left: 40rpx;
	}
	.rank_list {
		padding-top: 270rpx;
		padding-bottom: 32rpx;
		.item {
			border-radius: 16rpx;
			background: #fff;
			margin-top: 30rpx;
			padding: 28rpx 30rpx 32rpx;
			position: relative;
			.rank {
				position: absolute;
				top: 0;
				left: 20rpx;
				width: 50rpx;
				height: 61rpx;
				display: flex;
				justify-content: center;
				line-height: 61rpx;
				font-size: 30rpx;
				z-index: 10;
				background-size: 100% 100%;
				background-image: url('@/pages/activity/static/images/rank_num.png');
				font-family: '黑体';
				font-weight: bold;
				&.rank0,&.rank1,&.rank2{
					background-image: url('@/pages/activity/static/images/rank.png');
				}
			}
			.name {
				width: 382rpx;
				height: 76rpx;
				line-height: 38rpx;
				color: #282828;
				font-weight: 500;
				font-size: 32rpx;
			}
		}
		.mt-18 {
			margin-top: 18rpx;
		}
		.ot_price {
			font-weight: 300;
			color: #6D6D6D;
			padding-left: 16rpx;
		}
		.goods-msg {
			flex: 1;
			margin-left: 20rpx;
			.list{				
				background: #FDF8EE;
				border-radius: 6rpx;
				line-height: 57rpx;				
				color: #666666;
				font-size: 26rpx;
				padding: 0 12rpx;
				.iconfont{
					color: #FFB31C;
					margin-right: 12rpx;
				}
			}
		}
		.pictrue {
			width: 240rpx;
			height: 240rpx;
			position: relative;
			flex: 1;
			image {
				width: 100%;
				height: 100%;
				border-radius: 12rpx 0 0 12rpx;
			}
		}
	}
</style>
