<template>
	<view>
		<view class="pouponCount" :class="specData.showpopup==true?'on':''">
			<button class='iconfont icon-guanbi' @tap="close"></button>
			<view class="container_content">
				<view class="specifications">
					<textarea v-model="specData.name" maxlength="20" placeholder="输入规格名称,例如:尺码" placeholder-class="textPlaceHolder" />
					<view><text v-if="specData.name">{{specData.name.length}}</text><text v-else>0</text>/20</view>
				</view>		
				<view class="specification_properties">
					<view class="specification_properties_title">规格属性</view>
					<view class="specification_properties_textarea">
						<textarea v-model="specData.detail" placeholder="请填写规格属性，例如:大码中码小码，使用换行符换行" placeholder-class="propertiesPlaceholder" />
					</view>		
					<view class="tip">
						<text class="iconfont">&#xe688;</text>
						<text>每行只能填一个规格属性，多个请换行输入</text>
					</view>
				</view>
			</view>
			<view class="handle"><button class="handle_button" :disabled="loading" @click="save">保存</button></view>
		</view>	
		<view class='mask' catchtouchmove="true" :hidden='specData.showpopup==false' @tap='close'></view>
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
	export default {
		props: {			
			specData: {
				type: Object,
				default: function() {
					return {
						showpopup: false,
						name: '',
						detail: ''
					};
				}
			},
		
		},
		data() {
			return {
				specification: [],
				name: this.names,
				detail: this.details,
				loading: false
			}
		},
		watch: {
		},
		onLoad(option) {
			
		},
		onShow(){
			
		},
		methods: {
			close(){
				this.$emit('changeClose')
			},
			resetData(){
				this.$set(this.specData, "name", "");
				this.$set(this.specData, "detail", "");
			},
			save(){
				let that = this
				if (!that.specData.name) return that.$util.Tips({
					title: '请输入规格名称'
				});
				if (!that.specData.detail) return that.$util.Tips({
					title: '请输入规格属性'
				});
				let detail = that.specData.detail.split(/[(\r\n)\r\n]+/);
				that.loading = true;
				detail.forEach((item,index)=>{
				      if(!item){
				          detail.splice(index,1);//删除空项
				      }
				})
				this.$emit('getData',{value: that.specData.name, detail: detail});
				that.loading = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pouponCount {
		padding-top: 60rpx;
		padding-bottom: 130rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 77;
		border-radius: 16rpx 16rpx 0 0;
		padding-bottom: 20rpx;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
	}
	.pouponCount.on {
		transform: translate3d(0, 0, 0);
	}
	.pouponCount .icon-guanbi {
		position: absolute;
		right: 30rpx;
		color: #8a8a8a;
		font-size: 35rpx;
		top: 20rpx;
	}
	.container_content {
		width: 710rpx;
		background: #fff;
		margin: 0 auto 90rpx;
		.specifications {
			padding: 32rpx 20rpx 30rpx 20rpx;
			textarea {
				height: 122rpx;
			}
			> view {
				text-align: right;
				color: #666666;
				font-size: 24rpx;
				border-bottom: 1px solid #eeeeee;
				padding-bottom: 19rpx;
			}
		}
	
		.specification_properties {
			&_title {
				padding: 0rpx 19rpx 20rpx 19rpx;
			}
	
			&_textarea {
				height: 180rpx;
				padding: 0 19rpx 20rpx 19rpx;
				textarea {
					width: 100%;
					height: 100%;
					background: #f5f5f5;
					padding: 21rpx 35rpx 0 20rpx;
				}
			}
	
			.tip {
				color: #e93323;
				font-size: 22rpx;
				display: flex;
				align-items: center;
				padding: 10rpx 40rpx 40rpx 40rpx;
				> span:nth-child(1) {
					margin-right: 10rpx;
				}
			}
		}
	}
	
	.handle {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 126rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		&_button {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 32rpx;
			width: 690rpx;
			height: 86rpx;
			background: #E93323;
			border-radius: 43rpx;
		}
	}
	
	.textPlaceHolder {
		font-size: 30rpx;
		color: #bbbbbb;
	}
	
	.propertiesPlaceholder {
		color: #bbbbbb;
		font-size: 28rpx;
	}
	</style>
</style>










