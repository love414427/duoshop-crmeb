<template>
	<view class="container">
		<!-- 图片展示部分 -->
		<view class="container_qualifications" v-if="urlList.length">
			<view class="container_qualifications_title">
				<span class="margin_r">{{storeData.storeName}}</span>
				<span>网店经营者资质信息</span>
			</view>
			<view class="image_list">
				<!-- <view v-for="(item, index) in urlList" :key="index"><image :src="item" mode="widthFix"></image></view> -->
				<jyf-parser :domain='domain' :html="content" ref="article" :tag-style="tagStyle"></jyf-parser>
			</view>
			<view class="bottom_tip">
				注：以上信息，由商家依据《电子商务法》规定发布公示。如需进一步核实，可联系商家客服咨询。
			</view>
		</view>
		<!-- 输入验证码部分 -->
		<view class="container_vercode" v-else>
			<view class="container_vercode_title"><text>输入验证码查看证件信息</text></view>
			<view class="container_vercode_content" >
				<view class="container_vercode_content_heightfix" >
					<view class="container_vercode_content_input">
						<input type="text" v-model="verCodeValue" placeholder="请输入验证码">
					</view>
					<!-- <view class="container_vercode_content_vercode" @click="getVerCodeImage" :style="{'background-image': `url(${captchaData.captcha})`}"> -->
					<view class="container_vercode_content_vercode" @click="getVerCodeImage">
						<image :src="captchaData.captcha" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="container_vercode_button"><view class="button" @click="submitCaptChaData">确定</view></view>
		</view>
	</view>
</template>

<script>
import { getCaptcha, storeCertificate } from '@/api/store.js';
import { navigateTo, Toast, setStorage } from '@/libs/uniApi.js';
import parser from "@/components/jyf-parser/jyf-parser";
import { HTTP_REQUEST_URL } from '@/config/app';
export default {
	components:{
		"jyf-parser": parser,
	},
	onLoad(opt) {
		this.storeData = opt;
		this.getVerCodeImage();
	},
	data() {
		return {
			storeData: {},
			captchaData: {},
			verCodeValue: '',
			urlList: [],
			tagStyle: {
				img: 'width:100%;display:block;'
			},
			content: '',
			domain: HTTP_REQUEST_URL,
		};
	},
	methods:{
		// 发送图片验证码，并请求资质图片列表
		submitCaptChaData() {
			if(this.verCodeValue) {
				storeCertificate({merId: this.storeData.mer_id, key: this.captchaData.key, code: this.verCodeValue}).then(res => {
					if(res.status == 200 && res.message == 'success') {
					
						this.urlList = res.data;
						this.content = '';
						let imgTap = '';
						this.urlList.forEach(item => {
							imgTap+=this.setImgTap(item);
						})
						this.content = `<p>${imgTap}</p>`;
						console.log(this.content);
					} 
				}).catch(rej => {
					Toast(rej);
					this.getVerCodeImage();
					this.verCodeValue = '';
				})
			} else {
				Toast('请输入验证码');
			}
		},
		// 
		setImgTap(url) {
			return `<img style="width:auto;height:auto;max-width:100%;margin-bottom:15px" src="${url}"></img>`
		},
		// 获取图片验证码
		getVerCodeImage() {
			getCaptcha().then(res => {
				if (res.status == 200 && res.message == 'success') {
					this.captchaData = res.data;
					console.log(this.captchaData);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container_vercode {
	&_title {
		text-align: center;
		padding: 30px 0;
	}
	&_content {
		width: 70%;
		height: 40px;
		margin: auto;
		margin-bottom: 20px;
		&_heightfix {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 4px;
			overflow: hidden;
			border: 1px solid rgba(0, 0, 0, 0.1);
			max-height: 34px;
		}
		
		&_input {
			flex: 1;
			box-sizing: border-box;
			input {
				font-size: 12px;
				padding: 0 20px;
			}
		}
		&_vercode {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				display: block;
				width: 100%;
			}
		}
	}
	&_button {
		.button {
			margin: auto;
			width: 70%;
			background: #e93323 !important;
			border-radius: 4px;
			padding: 12px;
			text-align: center;
			color: #fff;
			font-size: 12px;
		}
	}
}
.container_qualifications {
	&_title {
		padding: 10px;
		text-align: center;
		span:nth-child(1) {
			font-weight: bold;
		}
	}
	.image_list {
		view {
			width: 90%;
			margin: auto;
			image {
				width: 100%;
			}
		}
	}
	.bottom_tip {
		padding: 10px 0;
		width: 90%;
		margin: auto;
		line-height: 20px;
	}
}
.margin_r {
	margin-right: 8px;
}
</style>
