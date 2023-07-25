<template>
	<view class="container">
		<view class="storeClassContent">
			<view class="storeClassContent_item" v-for="(item, index) in storeClassList" :key="index">
				<view class="storeClassContent_item_father" @click.stop="selectStoreClass(item)" @longtap.stop="deleteItem(item,index)">
					<view class="storeClassContent_item_father_label">
						<button class="iconfont" :class="selectStoreClassId == item.store_category_id ? 'icon-jian' : 'icon-tianjia1'"></button>
						<span>{{ item.cate_name }}</span>
					</view>
					<view class="storeClassContent_item_father_right">
						<span class="iconfont icon-bianji" @click.stop="edit(item)"></span>
					</view>
				</view>
				<view class="storeClassContent_item_child" v-if="selectStoreClassId == item.store_category_id">
					<view class="storeClassContent_item_child_item" v-for="(val, i) in item.children" :key="i" @longtap="deleteItem(val,i)">
						<span>{{ val.cate_name }}</span>
						<span class="iconfont icon-bianji" @click.stop="edit(val)"></span>
					</view>
				</view>
			</view>

			<view class="storeClassContent_tip">
				<text class="iconfont icon-duoshanghupc-shuomingdanchuang"></text>
				<span>长按分类标题可删除</span>
			</view>
		</view>
		<view class="handle_bottom"><navigator :url="`/pages/product/storeClassification/addStoreClass?mer_id=${mer_id}`" class="handle_bottom_button">添加分类</navigator></view>
	</view>
</template>

<script>
import { Modal, Toast } from '../../../libs/uniApi.js';
import { storeClassifyLst, storeClassifyDel } from "@/api/product";
export default {
	data() {
		return {
			selectStoreClassId: 1,
			mer_id: '',
			storeClassList: []
		};
	},
	onLoad(options) {
		this.mer_id = options.mer_id
		this.getStoreClassification()
	},
	onShow: function() {
		
	},
	methods: {
		deleteItem(item,index) {
			let that = this
			Modal('温馨提示', `"${item.cate_name}"将被删除，请问是否继续`).then(() => {
				storeClassifyDel(that.mer_id, item.store_category_id).then(res => {
					that.$util.Tips({
						title: res.message,
						icon: 'success'
					});
					that.getStoreClassification()				
				}).catch(res => {
					return that.$util.Tips({
						title: res
					});
				});
				// Toast('删除成功');
			})
		},
		selectStoreClass(item) {
			if (item.store_category_id == this.selectStoreClassId) {
				this.selectStoreClassId = '';
				return;
			}
			this.selectStoreClassId = item.store_category_id;
		},
		/*获取店铺分类*/
		getStoreClassification(){
			var that = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			storeClassifyLst(this.mer_id).then(
			  res => {
				uni.hideLoading();
			    that.storeClassList = res.data;
			  },
			  error => {
			    that.$util.Tips({
			      title: error.msg
			    })
			  }
			);
		},
		/*编辑*/
		edit(item){
			uni.navigateTo({
				url: `/pages/product/storeClassification/addStoreClass?mer_id=${this.mer_id}&pid=${item.store_category_id}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
</style>
