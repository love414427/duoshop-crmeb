<template>
	<view class="container">
		<view class="title">
			<view class="search">
				<view class="title_search">
					<span class="iconfont">&#xe67d;</span>
					<form @submit="search" report-submit="true">
						<input type="text" :name="where.keyword" v-model="where.keyword" placeholder="搜索商品" confirm-type='search'/>
					</form>		
				</view>
			</view>
			<view class="longTab">
				<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation class="menu" :scroll-left="tabLeft" show-scrollbar="true">
					<view
						class="longItem"
						:style="'width:' + isWidth + 'px'"
						:data-index="index"
						:class="index === tabClick ? 'click' : ''"
						v-for="(item, index) in menuList"
						:key="index"
						:id="'id' + index"
						@click="selectMenu(item, index)"
					>
						{{ item.name }}
					</view>
					<view v-if="menuList.length" class="underlineBox" :style="'transform:translateX(' + isLeft + 'px);width:' + isWidth + 'px'">
						<view class="underline bg-color-white"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view v-if="shopList.length">
			<block v-for="(item, index) in shopList" :key="index">
				<view class="shop_list">
					<view class="shop_list_item">
						<view class="shop_list_item_shop">
							<view class="shop_list_item_shop_image">
								<image :src="item.image"></image>
								<text v-if="item.spec_type == 1" class="spec">多规格</text>
							</view>
							<view class="shop_list_item_shop_con">
								<view class="shop_list_item_shop_con_title line1">{{ item.store_name }}</view>
								<view class="shop_list_item_shop_con_message">
									<span>库存：{{ item.stock }}</span>
									<span>销量：{{ item.sales }}</span>
								</view>
								<view class="shop_list_item_shop_con_price">
									<span>￥{{ item.price }}</span>
									<del>￥{{ item.ot_price }}</del>
								</view>
							</view>
						</view>
						<view class="shop_list_item_handle">
							<view v-if="item.is_show == 1 && item.status == 1 && type != 5" class="shop_button" @click="upperShelfAndLowerShelf(item, index)">下架</view>
							<view v-if="item.is_show == 0 && item.status == 1 && type != 5" class="shop_button" @click="upperShelfAndLowerShelf(item, index)">上架</view>
							<view class="shop_button" v-if="type != 1 && type != 3" @click="handleDelete(item, index)">删除</view>
							<view class="shop_button" v-if="type == 5" @click="reduction(item, index)">恢复</view>
							<navigator :url="`/pages/product/addGoods/index?mer_id=${merId}&product_id=${item.product_id}`" v-if="type != 5" class="shop_button" hover-class="none">编辑</navigator>
						</view>
					</view>
				</view>
			</block>
		</view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
	</view>
</template>

<script>

import { productLstApi, productTitle, productDeleteApi, productOffApi, productRestore, productDestory } from 'api/product.js';

import Loading from '@/components/Loading/index.vue';

import { Toast, Modal, navigateTo,getStorage,  removeStorage } from 'libs/uniApi.js';

export default {
	components: {
		Loading
	},
	data() {
		return {
			type: 1,
			tabClick: 0,
			tabLeft: 0,
			isLeft: 0, //导航栏下划线位置
			isWidth: 0, //每个导航栏占位
			childIndex: 0,
			menuList: [],
			merId: '',
			shopList: [],
			loaded: false,
			loading: false,
			where: {
				page: 1,
				limit: 15,
				keyword: '',
			},
			
			canNotReade: true
		};
	},
	created() {
		var that = this;
		// 获取设备宽度
		uni.getSystemInfo({
			success(e) {
				that.isWidth = e.windowWidth / 5;
			}
		});
	},

	onLoad(opt) {
		this.merId = opt.mer_id;
		this.getProductTitle();
		this.$set(this, 'type', opt.type ? Number(opt.type) : 1);
		this.initData();
	},
	onShow() {},
	// 下拉到底部
	onReachBottom() {
		this.initData();
	},
	methods: {
		initData() {
			var that = this;
			if (that.loading || that.loaded) return;
			that.loading = true;
			productLstApi(this.merId, { ...this.where, type: this.type }).then(
				res => {
					that.loading = false;
					that.loaded = res.data.list.length < that.where.limit;
					that.shopList.push.apply(that.shopList, res.data.list);
					that.where.page = that.where.page + 1;
				},
				error => {
					that.$util.Tips({
						title: error.msg
					});
				}
			);
		},
		search(){
			let that = this;
			that.loading = that.loaded = false;
			that.where.page = 1;
			that.shopList = [];
			that.initData();
		},
		// 获取列表头部
		getProductTitle() {
			productTitle(this.merId).then(res => {
				this.menuList = res.data;
				let clickIndex = 1;
				this.menuList.forEach((item, index) => {
					if (item.type == this.type) {
						clickIndex = index;
					}
				});
				this.setMenuLeft(clickIndex);
			});
		},
		// 点击列表头部
		selectMenu(item, index) {
			this.type = item.type;
			this.loading = this.loaded = false;
			this.where.page = 1;
			this.shopList = [];
			this.setMenuLeft(index);
		},
		/*导航栏移动位置*/
		setMenuLeft(index) {
			this.childIndex = 0;
			if (this.menuList.length > 5) {
				var tempIndex = index - 2;
				tempIndex = tempIndex <= 0 ? 0 : tempIndex;
				let tabLeft = (index - 2) * this.isWidth; //设置下划线位置
				this.$nextTick(function() {
					this.$set(this, 'tabLeft', tabLeft);
				});
			}
			this.tabClick = index; //设置导航点击了哪一个
			this.isLeft = index * this.isWidth; //设置下划线位置
			this.initData();
		},
		//还原
		reduction(item, index) {
			Modal('温馨提示', `商品"${item.store_name}"，将被还原，请问是否继续`).then(() => {
				productRestore(this.merId, item.product_id).then(res => {
					this.$util.Tips({ title: res.message, icon: 'success' });
					this.shopList.splice(index, 1);
				});
			});
		},
		editGoods(item) {
			console.log(item);
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
				if (getStorage(item)) {
					removeStorage(item);
				}
			});
			navigateTo(1, '/pages/product/addGoods/index', { mer_id: this.merId, type: 'edit', product_id: item.product_id, type: 'edit' });
		},
		// 加入回收站
		handleDelete(item, index) {
			item.is_del == 1
				? Modal('温馨提示', `商品"${item.store_name}"将被删除，请问是否继续?`).then(res => {
						productDestory(this.merId, item.product_id)
							.then(res => {
								this.shopList.splice(index, 1);
								Toast('删除成功');
							})
							.catch(rej => {
								Toast(`${rej}`);
							});
				  })
				: Modal('温馨提示', `商品"${item.store_name}"将被加入回收站，请问是否继续?`).then(res => {
						productDeleteApi(this.merId, item.product_id)
							.then(res => {
								this.shopList.splice(index, 1);
								Toast('已加入回收站');
							})
							.catch(rej => {
								Toast(`${rej}, 加入回收站失败`);
							});
				  });
		},
		// 上架下架
		upperShelfAndLowerShelf(obj, index) {
			let status = obj.is_show == 1 ? 0 : 1;
			productOffApi(this.merId, obj.product_id, { status: status })
				.then(res => {
					this.$util.Tips({ title: res.message, icon: 'success' });
					this.shopList.splice(index, 1);
				})
				.catch(err => {
					return this.$util.Tips({
						title: err
					});
				});
		},
		handleMethod(item, obj, index) {
			if (item.id == 1) {
				this.upperShelfAndLowerShelf(obj, index);
				return;
			}
			if (item.id == 2) {
				this.addToRecycleBin(obj, index);
				return;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
.longTab {
	display: flex;
	width: 100%;
	/* #ifdef H5 */
	padding-bottom: 20rpx;
	/* #endif */
	/* #ifdef MP */
	padding-top: 12rpx;
	padding-bottom: 12rpx;
	/* #endif */
	.longItem {
		height: 50upx;
		display: inline-block;
		line-height: 50upx;
		text-align: center;
		font-size: 30rpx;
		color: #282828;
		max-width: 160rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		overflow-x: scroll;
		overflow-y: hidden;
		/*解决ios上滑动不流畅*/
		-webkit-overflow-scrolling: touch;

		&.click {
			font-weight: bold;
			font-size: 30rpx;
			color: #e93323;
			.underline {
				opacity: 1;
			}
		}
	}

	.underlineBox {
		height: 3px;
		width: 20%;
		display: flex;
		align-content: center;
		justify-content: center;
		transition: 0.5s;

		.underline {
			width: 60rpx;
			height: 4rpx;
			background-color: #e93323;
		}
	}
}
.title_search {
	background: #f5f5f5;
	border-radius: 30rpx;
	height: 60rpx;
	padding-left: 60rpx;
	position: relative;
	.iconfont {
		position: absolute;
		top: 50%;
		margin-top: -14rpx;
		left: 30rpx;
		font-size: 28rpx;
	}
	input {
		height: 60rpx;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
}
.shop_button {
	margin-left: 18rpx;
	padding: 0 34rpx;
	height: 60rpx;
	border: 1px solid #c7c7c7;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30rpx;
	font-size: 26rpx;
	color: #999999;
}
.shop_list {
	margin-top: 20rpx;
	padding: 0 20rpx;

	&_item {
		padding: 30rpx;
		background: #ffffff;
		border-radius: 10px;
		margin-bottom: 20rpx;
		&_shop {
			display: flex;
			&_image,
			uni-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 16rpx;
				position: relative;
				image {
					width: 150rpx;
					height: 150rpx;
				}
			}
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
			&_con {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				padding-bottom: 12rpx;

				&_title {
					font-size: 28rpx;
					color: #282828;
					max-width: 500rpx;
					padding-top: 4rpx;
				}
				&_message {
					margin-top: 15rpx;
					font-size: 22rpx;
					color: #868686;
					> span:nth-child(1) {
						display: inline-block;
						margin-right: 20rpx;
					}
				}

				&_price {
					margin-top: 10rpx;
					> span {
						display: inline-block;
						margin-right: 7rpx;
						font-size: 30rpx;
						color: #e93323;
					}
					> del {
						color: #bebebe;
						font-size: 26rpx;
					}
				}
			}
		}
		&_handle {
			display: flex;
			justify-content: flex-end;
			> view {
				margin-left: 18rpx;
				padding: 0 34rpx;
				height: 60rpx;
				border: 1px solid #c7c7c7;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}
	}
}
</style>
