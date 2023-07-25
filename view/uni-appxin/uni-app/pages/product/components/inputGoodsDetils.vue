<template>
	<view class="input_content">
		<view class="input_content_textarea">
			<textarea v-model="prodectContent.store_name" :placeholder="title" placeholder-class="placeholderStyle" :maxlength="maxLength"/>
			<view><text v-if="prodectContent.store_name">{{prodectContent.store_name.length}}</text><text v-else>0</text>/{{maxLength}}</view>

		</view>

		<view class="input_content_photo">
			<view class="input_content_photo_adPh" v-for="(item, index) in prodectContent.imageList" :key="index">
				<image :src="item" class="myimg2 photos"></image> 
				<view class="input_content_photo_adPh_jiao" @click="deleteImage(index)"><image src="../static/images/close.png" mode=""></image></view>
			</view>
			<view v-if="isUpload" class="input_content_photo_adPh" @click="clk">
				<view><image src="../static/images/creamer.png" mode="widthFix"></image></view>
				<view>添加图片</view>
			</view>
		</view>

		<view class="input_content_describe" v-if="isShowDescribe">
			<view class="input_content_describe_title">
				<view class="input_content_describe_title_msg">商品简介</view>
				<view class="input_content_describe_title_num">
					<text v-if="prodectContent.store_info">{{prodectContent.store_info.length}}</text>
					<text v-else>0</text>/200
				</view>
			</view>
			<view class="input_content_describe_textarea"><textarea v-model="prodectContent.store_info" value="" placeholder="请填写商品简介" placeholderClass="placeholderClass"  maxlength="200"/></view>
		</view>

		<view class="input_content_keyword" v-if="isShowDescribe">
			<view class="input_content_keyword_label">关键字</view>
			<view class="input_content_keyword_value"><input v-model="prodectContent.keyword" type="text" value="" placeholder="填写关键字" /></view>
		</view>
		<avatar @upload="doUpload" @getName="getImgName" quality="1" ref="avatar" selWidth="250upx" selHeight="250upx"></avatar>
	</view>
</template>

<script>
import { chooseImage } from '../../../libs/uniApi.js';
import { TOKENNAME, HTTP_REQUEST_URL } from '../../../config/app.js';
import avatar from "@/components/yq-avatar/yq-avatar.vue";
import store from '@/store';

export default {
	components: {
		avatar
	},
	props: {
		isShowDescribe: {
			type: Boolean,
			default: false
		},
		isMultiple: {
			type: Boolean,
			default: true
		},
		maxLength: {
			type: Number,
			default: 12
		},
		title: {
			type: String,
			default: ''
		},
		prodectContent: { 
			type: Object,
			default: ()=>{return {imageList: []}}
		}
	},
	data() {
		return {
			uploadImg: this.prodectContent.imageList,
			isUpload: true,
			imgName: ""
		};
	},
	watch: {
		prodectContent: {
			handler(val) {
				this.$emit('getProductContent', val);
			},
			deep: true
		},
		uploadImg: {
			handler(val) {
				if(this.isMultiple){
					this.isUpload = val.length<6?true : false
				}else{
					this.isUpload = val.length <1?true : false
				}
			},
			deep: true
		}
	},
	mounted() {
		
	},
	methods: {
		handleChooseImage() {
			let that = this;
			that.$util.uploadImageOne('upload/image', function (res) {
			  that.uploadImg.push(res.data.path);
			  that.$set(that.prodectContent,'imageList',that.uploadImg);
			});
		},
		clk() {
			let avatar = this.$refs.avatar;
			avatar.fChooseImg(1,{selWidth: '350upx', selHeight: '350upx', inner: true});
		},
		doUpload(rsp) {
			console.log(rsp);
			let that = this
			uni.uploadFile({
				url: HTTP_REQUEST_URL + '/api/upload/image/field',
				filePath: rsp.path,
				name: 'field',
				formData: {
					'filename': rsp.path,
					'name': that.imgName
				},
				header: {
					// #ifdef MP
					"Content-Type": "multipart/form-data",
					// #endif
					[TOKENNAME]: 'Bearer ' + store.state.app.token
				},
				success: (uploadFileRes) => {
					console.log(uploadFileRes.data);
					let imgData = JSON.parse(uploadFileRes.data)
					that.prodectContent.imageList.push(imgData.data.path)
				},
				complete(res) {
					console.log(res)
				}
			});		
		},
		getImgName(name){
			this.imgName = name
		},
		// 删除图片
		deleteImage(index) {
			this.prodectContent.imageList.splice(index, 1);
			this.uploadImg = this.prodectContent.imageList
		}
	}
};
</script>

<style lang="scss" scoped>
.input_content {
	background: #fff;
	padding: 20rpx 40rpx 40rpx 30rpx;
	width: 710rpx;
	margin: auto;
	box-sizing: border-box;
	border-radius: 10rpx;
	&_textarea {
		border-bottom: 1px solid #eeeeee;
		padding-bottom: 19rpx;
		textarea {
			height: 114rpx;
		}
		> view {
			text-align: right;
			color: #666666;
			font-size: 24rpx;
		}
	}

	&_photo {
		margin-top: 41rpx;
		display: flex;
		flex-wrap: wrap;
		.photos{
			width: 156rpx;
			height: 156rpx;
		}
		&_adPh {
			position: relative;
			width: 156rpx;
			height: 156rpx;
			border: 1px solid #dddddd;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-radius: 8rpx;
			margin-right: 30rpx;
			margin-bottom: 30rpx;
			> image {
				height: 100%;
				margin: auto;
			}
			> view:nth-child(1) {
				height: 37rpx;
				margin-bottom: 16rpx;
				display: flex;
				justify-content: center;
				image {
					width: 45rpx;
					display: block;
				}
			}

			> view:nth-child(2) {
				text-align: center;
				color: #bbbbbb;
				font-size: 24rpx;
			}

			&_jiao {
				position: absolute;
				top: -14rpx;
				right: -14rpx;
				width: 40rpx;
				height: 40rpx;
				background: #e93323;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				image {
					width: 16rpx;
					height: 16rpx;
				}
			}
		}
	}
	&_describe {
		border-top: 1px solid #eeeeee;
		padding-top: 30rpx;
		padding-bottom: 47rpx;
		border-bottom: 1px solid #eeeeee;
		&_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			&_msg {
				color: #333333;
				font-size: 30rpx;
			}
			&_num {
				color: #666666;
				font-size: 24rpx;
			}
		}

		&_textarea {
			border-radius: 10px;
			margin-top: 20rpx;
			height: 180rpx;
			background: #f5f5f5;
			padding: 20rpx;
			textarea {
				font-size: 28rpx;
			}
		}
	}

	&_keyword {
		padding-top: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 30rpx;
		&_value {
			flex: 1;
			margin-left: 30rpx;
			input {
				width: 100%;
				text-align: right;
			}
		}
	}
}

.placeholderClass {
	color: #bbbbbb;
	font-size: 28rpx;
}
</style>
