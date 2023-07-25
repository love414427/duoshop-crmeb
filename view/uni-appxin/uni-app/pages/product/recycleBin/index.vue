<template>
	<view class="container">
		<view class="search"><search></search></view>
		<shop-item  v-for="(item, index) in shopList" :key="index" :itemObject="item" @handleMethod="handleMethod"></shop-item>
	</view>
</template>

<script>
import shopItem from '../components/shopItem.vue';
import search from '../components/search.vue';
import { productLstApi, productDestory, productRestore } from 'api/product.js';
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
			shopList: [],
			selectMenuId: 5
		};
	},
	onLoad(opt) {
		this.merId = opt.mer_id;
		this.initData();
	},
	// 下拉到底部
	onReachBottom() {
		this.where.page++;
		this.initData('concat');
	},
	methods: {
		initData(type) {
			productLstApi(this.merId, { ...this.where, type: this.selectMenuId }).then(res => {
				if (type == 'concat') {
					this.shopList = this.shopList.concat(res.data.list);
				} else {
					this.shopList = res.data.list;
				}
				// 给每一个列表项,添加可用功能
				this.shopList.forEach(item => {
					this.$set(item, 'handleList', [
						{
							id: 1,
							label: '删除'
						},
						{
							id: 2,
							label: '还原'
						}
					]);
				});
			});	
		},
		// 彻底删除
		handleProductDestory(obj, index) {
			Modal('温馨提示', `商品"${obj.store_name}", 将被彻底删除，请问是否继续`).then(() => {
				productDestory(this.merId, obj.product_id).then(res => {
					this.$util.Tips({ title: res.message, icon: 'success' });
					this.shopList.splice(index, 1);
				})
			})
		},
		// 还原
		handleProductRestore(obj, index) {
			Modal('温馨提示', `商品"${obj.store_name}"，将被还原，请问是否继续`).then(() => {
				productRestore(this.merId, obj.product_id).then(res => {
					this.$util.Tips({ title: res.message, icon: 'success' });
					this.shopList.splice(index, 1);
				})
			})
		},
		
		handleMethod(item, obj, index) {
			if(item.id == 1) {
				this.handleProductDestory(obj, index);
				return;
			}
			
			if(item.id == 2) {
				this.handleProductRestore(obj, index);
			}
			
			console.log(item, obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.search {
	padding: 30rpx 25rpx;
	background: #fff;
}
</style>
