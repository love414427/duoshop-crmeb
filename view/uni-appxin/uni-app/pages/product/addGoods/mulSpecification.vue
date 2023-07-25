<template>
	<view class="container">
		<view class="title">
			<view class="search_box"><search holder="请输入规格名称" @getList="getSpecList"></search></view>
			<view class="administration" @click="handleAdministration">{{ administrationFlag ? '完成' : '管理' }}</view>
		</view>

		<select-form :platformClassification="selectFormList" @handleJumpLogic="handleJumpLogic"></select-form>

		<view class="finish" v-if="administrationFlag">
			<view @click="selectAll">
				<span :class="{ 'select': allSelect }">
					<span v-if="allSelect" class="iconfont">&#xe646;</span>
				</span>
				<span>全选({{ selectNum }})</span>
			</view>
			<view @click="subDel">删除</view>
		</view>

		<view class="handle" v-else><view class="handle_button" @click="newSpecifications">新增规格</view></view>
	</view>
</template>

<script>
import { navigateTo } from '../../../libs/uniApi.js';
import search from '../components/search.vue';
import selectForm from '../components/selectForm.vue';
import { specificationLst, specificationDel } from "@/api/product";
export default {
	components: {
		search,
		selectForm
	},
	data() {
		return {
			allSelect: false, // 全选按钮
			administrationFlag: false,
			selectNum: 0,
			mer_id: '',
			where: {
				page: 1,
				limit: 999
			},
			selectFormList: [
	
			]
		};
	},
	watch: {
		selectFormList: {
			handler(val) {
				console.log(val);
				this.selectNum = val.filter(item => item.select).length;
				if(this.selectNum == val.length) {
					this.allSelect = true;
				} else {
					this.allSelect = false;
				}
			},
			deep: true
		}
	},
	onLoad(options) {
		this.mer_id = options.mer_id
		this.getSpecList('')
	},
	methods: {
		// 点击列表项
		handleJumpLogic(item) {
			console.log(item);
			uni.navigateTo({
				url: `/pages/product/addGoods/specificationProperties?mer_id=${item.mer_id}&template_id=${item.attr_template_id}`
			})
		},
		//新增规格
		newSpecifications() {
			uni.navigateTo({
				url: `/pages/product/addGoods/specificationProperties?mer_id=${this.mer_id}`
			})
		},
		//全选
		selectAll() {
			this.allSelect = !this.allSelect;	
			if(this.allSelect) {
				this.selectFormList.forEach(item => {
					this.$set(item, 'select', true);
				});
			} else {
				this.selectFormList.forEach(item => {
					this.$set(item, 'select');
				});
			}
		},
		handleAdministration() {
			this.administrationFlag = !this.administrationFlag;
			if (this.administrationFlag) {
				this.selectFormList.forEach(item => {
					this.$set(item, 'select', false);
				});
			} else {
				this.selectFormList.forEach(item => {
					this.$delete(item, 'select');
				});
			}
		},
		/*删除*/
		subDel(){
			let that = this
			let type_id = []
			that.selectFormList.forEach(item=>{
				if(item.select){
					type_id.push(item.attr_template_id)
				}
			})
			if(type_id.length == 0){
				return that.$util.Tips({
					title: '请选择规格'
				});
			}else{
				specificationDel(that.mer_id,{
					ids:type_id,
				}).then(res=>{
					that.$util.Tips({
						title: res.message,
						icon: 'success'
					});
					that.where.page = 1;
					that.selectFormList = [];
					that.getSpecList('');
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			}
		},
		/*获取规格列表*/
		getSpecList(keyword){
			let that = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			specificationLst(that.mer_id, { ...that.where, keyword: keyword }).then(
			  res => {
				uni.hideLoading();
				that.selectFormList = res.data.list;
				// that.where.page = that.where.page + 1;
				that.selectFormList.forEach((item, i) => {
					that.$set(item, 'label', item.template_name);
					that.$set(item, 'id', item.attr_template_id);
					that.$set(item, 'mer_id', item.mer_id);
					that.$set(item, 'jumpLogic', true);
					that.$set(item, 'type', 'select');
					that.$set(item, 'select', false);
					if(!that.administrationFlag)that.$delete(item, 'select');
				})
			  },
			  error => {
			    that.$util.Tips({
			      title: error.msg
			    })
			  }
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 130rpx;
}
.title {
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 40rpx 30rpx 35rpx;
	.search_box {
		flex: 1;
		margin-right: 35rpx;
	}
}

.administration {
	color: #000000;
	font-size: 30rpx;
}

.handle {
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 750rpx;
	height: 126rpx;
	background: #ffffff;
	&_button {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 32rpx;
		width: 690rpx;
		height: 86rpx;
		background: #e93323;
		border-radius: 43rpx;
	}
}

.finish {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 126rpx;
	background: #ffffff;
	> view:nth-child(1) {
		display: flex;
		align-items: center;
		>span:nth-child(1) {
			width: 38rpx;
			height: 38rpx;
			border: 1px solid #cccccc;
			border-radius: 50%;
			display: inline-block;
			margin-right: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	> view:nth-child(2) {
		width: 180rpx;
		height: 70rpx;
		border: 1px solid #e93323;
		border-radius: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #e93323;
	}
}
	.select {
		background: #E93323;
		border: none !important;
	
		.iconfont {
			color: #fff;
			font-size: 24rpx;
		}
	}
</style>
