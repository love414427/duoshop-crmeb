<template>
	<view class="container">
		<view class="title">
			<view class="search"><search></search></view>
		</view>
		<shop-item isShowImg v-for="(item, index) in shopList" :key="index"  :itemObject="item" @handleMethod="handleMethod"></shop-item>
	</view>
</template>

<script>
import shopItem from '../components/shopItem.vue';
import search from '../components/search.vue';
import { productLstApi, productDeleteApi } from 'api/product.js';
import { Toast, Modal } from 'libs/uniApi.js';
export default {
	components: {
		shopItem,
		search
	},
	data() {
		return {
			merId: '',
			where: {
				page: 1,
				limit: 15
			},
			shopList: []
		};
	},
	// 下拉到底部
	onReachBottom() {
		this.where.page++;
		this.initData('concat');
	},
	onLoad(opt) {
		this.merId = opt.mer_id;
		this.initData();
	},
	onShow() {
		
	},
	methods: {
		initData(type) {
			productLstApi(this.merId, { ...this.where, type: 5 }).then(res => {
				if (type == 'concat') {
					this.shopList = this.shopList.concat(res.data.list);
				} else {
					this.shopList = res.data.list;
				}
				// 给每一个列表项,添加可用功能
				this.shopList.forEach(item => {
					this.$set(item, 'handleList', [
						// {
						// 	id: 1,
						// 	label: '编辑'
						// },
						{
							id: 2,
							label: '加入回收站'
						}
					]);
				});
			});	
		},
		// 加入回收站
		addToRecycleBin(obj) {
			Modal('温馨提示', `商品"${obj.store_name}"将被加入回收站，请问是否继续?`).then(res => {
				productDeleteApi(this.merId, obj.product_id)
					.then(res => {
						this.initData();
						Toast('已加入回收站');
					})
					.catch(rej => {
						Toast(`${rej}, 加入回收站失败`);
					});
			});
		},
		
		handleMethod(item, obj) {
			if (item.id == 2) {
				this.addToRecycleBin(obj);
				return;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	background: #fff;
}
.search {
	padding: 30rpx 25rpx;
}
</style>
