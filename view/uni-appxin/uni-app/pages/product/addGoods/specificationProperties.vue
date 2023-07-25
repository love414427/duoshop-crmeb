<template>
	<view class="container">
		<view class="content_input">
			<view>规格名称</view>
			<view><input type="text" v-model="formData.template_name" placeholder="填写规格名称" placeholder-class="placeholderClass" /></view>
		</view>
		<view class="content_add" @click="addSingleSpecification">
			<text class="iconfont icon-tianjia1"></text>
			<span>添加规格属性</span>
		</view>
		<view v-if="formData.template_value.length > 0">
			<view v-for="(item, index) in formData.template_value" :key="index" class="content_message">
				<view class="content_message_title">
					<view class="title line1">{{item.value}}</view>
					<view>
						<span class="btn btn_del" @click="formData.template_value.splice(index,1)">删除</span>
						<span class="btn btn_edit" @click="editAttr(item,index)">编辑</span>
					</view>
				</view>
				<view class="content_message_content">
					<view v-for="(val, i) in item.detail" :key="i">
						{{val}}
					</view>
				</view>
			</view>
		</view>
		<view class="handle">
			<view class="handle_button" @click="submit">
				保存
			</view>
		</view>
		<specification-attr ref="increaseSpec" :specData="specData" @changeClose="close" @getData="getAttr"></specification-attr>
	</view>
</template>

<script>
import { navigateTo } from '../../../libs/uniApi.js';
import specificationAttr from '../components/specificationAttr.vue';
import { specificationAdd, specificationDetail, specificationUpdate } from "@/api/product";
export default {
	components: {
		specificationAttr
	},
	data() {
		return {
			mer_id: '',
			template_id: '',
			specData: {
				showpopup: false,
				name: '',
				detail: ''
			},
			formData: {
				template_name: '',
				template_value: []
			},
			index: '',
		};
	},
	onLoad(options) {
		this.mer_id = options.mer_id
		this.template_id = options.template_id
		if(this.template_id)this.getSpecData()
	},
	methods: {
		// 添加规格属性
		addSingleSpecification() {
			this.$set(this, 'index', "");
			this.$set(this.specData, 'showpopup', true);
			this.$refs.increaseSpec.resetData();
		},
		getAttr(data){
			if(this.index == ""){
				this.formData.template_value.push(data);
			}else{
				this.$set(this.formData.template_value, this.index-1, data);
			}
			
			this.$set(this.specData, 'showpopup', false);
		},
		close() {
			this.$set(this.specData, 'showpopup', false);
		},
		/*获取属性规格值*/
		getSpecData(){
			let that = this
			uni.showLoading({
				title: '',
				mask: true
			});
			specificationDetail(that.mer_id, that.template_id).then(res=>{
				uni.hideLoading();
				that.formData = res.data
			}).catch(err => {
				return that.$util.Tips({
					title: err
				});
			});
		},
		submit(){
			let that = this
			if (!that.formData.template_name) return that.$util.Tips({
				title: '请输入规格名称'
			});
			if (that.formData.template_value.length == 0) return that.$util.Tips({
				title: '请添加规格属性'
			});
			that.template_id ? specificationUpdate(that.mer_id,that.template_id,that.formData)
			.then(res=>{
				that.$util.Tips({
					title: res.message,
					icon: 'success'
				});
				uni.redirectTo({
					url: `/pages/product/addGoods/mulSpecification?mer_id=${that.mer_id}`
				})
			}).catch(err => {
				return that.$util.Tips({
					title: err
				});
			}) :
			specificationAdd(that.mer_id,that.formData).then(res=>{
				that.$util.Tips({
					title: res.message,
					icon: 'success'
				});
				uni.redirectTo({
					url: `/pages/product/addGoods/mulSpecification?mer_id=${that.mer_id}`
				})
			}).catch(err => {
				return that.$util.Tips({
					title: err
				});
			});
		},
		/*编辑*/
		editAttr(item,index){
			this.index = index+1
			this.$set(this.specData, 'showpopup', true);
			this.$set(this.specData, 'name', item.value);
			let str = "";
			for(var i=0; i<item.detail.length;i++){
				str+=item.detail[i]+"\n"
			}
			this.$set(this.specData, 'detail', str);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 20rpx;
	padding-bottom: 130rpx;
}
.content_input {
	padding: 32rpx 30rpx;
	box-sizing: border-box;
	margin: auto;
	width: 710rpx;
	height: 106rpx;
	background: #ffffff;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> view:nth-child(1) {
		font-size: 30rpx;
		color: #333333;
	}
	> view:nth-child(2) {
		text-align: right;
	}
}

.content_add {
	margin: auto;
	margin-top: 30rpx;
	width: 710rpx;
	height: 106rpx;
	background: #ffffff;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	.iconfont {
		font-size: 35rpx;
		margin-right: 10rpx;
		color: #e93323;
	}
	span {
		color: #e93323;
		font-size: 30rpx;
	}
}

.content_message {
	background: #ffffff;
	padding: 32rpx 20rpx 30rpx 20rpx;
	width: 710rpx;
	margin: auto;
	margin-top: 30rpx;
	border-radius: 10rpx;
	&_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 32rpx;
		>view:nth-child(1) {
			padding-left: 10rpx;
		}
		>view:nth-child(2) {
			padding-right: 10rpx;
		}
		.title{
			max-width: 460rpx;
		}
	}
	&_content {
		padding-top: 30rpx;
	
	}
	.btn {
		font-size: 26rpx;
		margin: 0 20rpx;
		position: relative;
	}
	.btn_del{
		color: #999999;
		&:after{
			content: "";
			display: inline-block;
			width: 1rpx;
			height: 18rpx;
			background-color: #BBBBBB;
			position: absolute;
			top: 11rpx;
			right: -20rpx;
		}
		
	}
	.btn_edit{
		margin-right: 10rpx;
		color: #E93323;
	}
}
.handle {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 126rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	&_button {
		width: 690rpx;
		height: 86rpx;
		background: #E93323;
		border-radius: 43rpx;
		font-size: 32rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.placeholderClass {
	color: #bbbbbb;
	font-size: 30rpx;
}
</style>
