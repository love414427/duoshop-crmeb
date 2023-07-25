<template>
	<view :style="viewColor">
		<view class='cash-withdrawal' :hidden='!loading'>
			<view class='nav acea-row  row-between-wrapper'>
				<view class='name'>提现至</view>
				<view class='input'>
					<view class="more-content" @click="goPay(currentTab)">
						<view class="more-content-left">
							<view class="type-icon" :style="[{backgroundColor: handlePayColor()}]">
								<view class="iconfont bankicon" :class="navList[currentTab]['icon']"></view>
							</view>
							<text>{{navList[currentTab]["name"]}}</text>
						 </view>
						 <view class="moreicon">
							<view class='iconfont icon-jiantou'></view>
						 </view>
					</view>
				</view>
			</view>
			<view class='wrapper'>
				<view :hidden='currentTab != 0' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>持卡人</view>
							<view class='input'><input placeholder='请输入持卡人姓名' placeholder-class='placeholder' name="real_name" v-model="real_name"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>卡号</view>
							<view class='input'><input type='number' placeholder='请填写卡号' placeholder-class='placeholder' name="bank_code" v-model="bank_code"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper' v-if="array.length>0">
							<view class='name'>银行</view>
							<view class='input'>
								<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
									<text class='Bank'>{{array[index]["name"]}}</text>
									<text class='iconfont icon-qiepian38'></text>
								</picker>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>支行信息</view>
							<view class='input'><input placeholder='请输入支行信息' placeholder-class='placeholder' name="bank_address" v-model="bank_address"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提现</view>
							<view class='input'><input :placeholder='"最低提现金额"+minPrice' placeholder-class='placeholder' name="extract_price"
								 type='digit' v-model="extract_price"></input></view>
						</view>
						<view class='tip mt25'>
							当前可提现金额: <text class="price">￥{{userInfo.brokerage_price}},</text>冻结佣金：￥{{userInfo.lock_brokerage}}
						</view>
						<view class='tip'>
							说明: 每笔佣金的冻结期为{{userInfo.broken_day}}天，到期后可提现
						</view>
						<view class="btn-submit">
							<button formType="submit" :disabled="load" class='bnt b-color' :class="load ? 'disabled' : ''" >提现</button>
						</view>
					</form>
				</view>
				<view :hidden='currentTab != 1' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view v-if="!sys_extension_type" class="">
							<view class='item acea-row row-between-wrapper'>
								<view class='name'>账号</view>
								<view class='input'><input placeholder='请填写您的微信账号' placeholder-class='placeholder' name="wechat"></input></view>
							</view>
							<view class='item acea-row row-between-wrapper'>
								<view class='name'>提现</view>
								<view class='input'><input :placeholder='"最低提现金额"+minPrice' placeholder-class='placeholder' name="extract_price"
									 type='digit' v-model="extract_price"></input></view>
							</view>
							<view class='item acea-row row-between-wrapper uploadItem'>
								<view class='name'>收款码</view>
								<view class='input upload acea-row row-middle'>
									<view class='picture' v-for="(item,index) in pics" :key="index">
										<image :src='item'></image>
										<text class='iconfont icon-guanbi1' @click='DelPic(index)'></text>
									</view>
									<view class='picture acea-row row-center-wrapper row-column' @click='uploadpic' v-if="pics.length < 1">
										<text class='iconfont icon-icon25201'></text>
										<view>上传图片</view>
									</view>
								</view>
							</view>

							<view class='tip mt25'>
								当前可提现金额: <text class="price">￥{{userInfo.brokerage_price}},</text>冻结佣金：￥{{userInfo.lock_brokerage}}
							</view>
							<view class='tip'>
								说明: 每笔佣金的冻结期为{{userInfo.broken_day}}天，到期后可提现
							</view>
							<button formType="submit" :disabled="load" class='bnt b-color' :class="load ? 'disabled' : ''" >提现</button>
						</view>
						<view v-else class="auto_arrival">
							<view class='tip'>当前可提现金额: <text class="price">￥{{userInfo.brokerage_price}}</text>
							</view>
							<view class='input'><input placeholder-class='placeholder1' name="extract_price"
								 type='digit' :placeholder="placeholderValue" @focus="placeholderValue = ''" v-model="extract_price"></input>
							</view>
							<view class="btn-submit">
							    <button formType="submit" :disabled="load" class='bnt b-color' :class="load ? 'disabled' : ''" >提现</button>
							</view>
						</view>

					</form>
				</view>
				<view :hidden='currentTab != 2' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>账号</view>
							<view class='input'><input placeholder='请填写您的支付宝账号' placeholder-class='placeholder' name="alipay_code"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提现</view>
							<view class='input'><input :placeholder='"最低提现金额"+minPrice' placeholder-class='placeholder' name="extract_price"
								 type='digit' v-model="extract_price"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper uploadItem'>
							<view class='name'>收款码</view>
							<view class='input upload acea-row row-middle'>
								<view class='picture' v-for="(item,index) in pics" :key="index">
									<image :src='item'></image>
									<text class='iconfont icon-guanbi1' @click='DelPic(index)'></text>
								</view>
								<view class='picture acea-row row-center-wrapper row-column' @click='uploadpic' v-if="pics.length < 1">
									<text class='iconfont icon-icon25201'></text>
									<view>上传图片</view>
								</view>
							</view>
						</view>
						<view class='tip mb25'>
							当前可提现金额: <text class="price">￥{{userInfo.brokerage_price}},</text>冻结佣金：￥{{userInfo.lock_brokerage}}
						</view>
						<view class='tip' v-if="userInfo.broken_day>0">
							说明: 每笔佣金的冻结期为{{userInfo.broken_day}}天，到期后可提现
						</view>
						<view class="btn-submit">
						    <button formType="submit" :disabled="load" class='bnt b-color' :class="load ? 'disabled' : ''" >提现</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<cash :payMode='pay_type' :pay_close="pay_close" @payClose="payClose" @onChangeFun="onChangeFun" :order_id="currentTab"></cash>
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
	import {
		extractCash,
		extractBank,
		getUserInfo,
		spreadInfo,
		getBankInfo
	} from '@/api/user.js';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import cash from '@/components/cash';
	import { configMap } from '@/utils';
	export default {
		components: {
			cash,
			authorize
		},
		data() {
			return {
				navList: [{
					    'id': '0',
					    'ids': 1,
						'name': '银行卡',
						'icon': 'icon-yinhangqia',
						'bg_color': '#FE960F'
					},
					{
						'id': '1',
						'ids': 2,
						'name': '微信',
						'icon': 'icon-weixin2',
						'bg_color': '#41B035'
					},
					{
						'id': '2',
						'ids': 3,
						'name': '支付宝',
						'icon': 'icon-icon34',
						'bg_color': '#00A9F2'
					}
				],
				currentTab: '0',
				extract_price: '',
				index: 0,
				array: [], //提现银行
				minPrice: 0.00, //最低提现金额
				userInfo: [],
				isClone: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				loading: true,
				load: false,
				pics: [], //收款码
				extract_pic: '',
				placeholderValue: '0.00',
				payColor: '',
				pay_close: false,
				real_name: '',
				bank_address: '',
				bank_code: '',
				pay_type: []
			};
		},
		computed: {
			...mapGetters(['isLogin','viewColor']),
			... configMap(['sys_extension_type', 'withdraw_type'])
		},
		watch: {
			withdraw_type: {
				handler(){
					this.loadType()
				},
				immediate: true
			}
		},
		onLoad() {
			if (this.isLogin) {
				this.getUserInfo();
				this.getUserExtractBank();
				this.getBankInfo();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		methods: {
			loadType(){
				this.pay_type = []
				let withdrawType = this.withdraw_type
				if (withdrawType.length > 0) {
					this.navList.map((value, index) => {
						withdrawType.map(val => {
							if (value.ids == val) {
								this.pay_type.push(value)
							}
						})
					})
				}
				this.currentTab = this.pay_type[0].id
			},
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserInfo();
				// this.getUserExtractBank();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/*获取之前提交过的银行卡信息*/
			getBankInfo(){
				let that = this;
				getBankInfo().then(res => {
					let info = res.data;
					console.log(info)
					that.real_name = info.real_name;
					that.bank_name = info.bank_name;
					that.bank_code = info.bank_code;
					that.bank_address = info.bank_address;
					
				});
			},
			getUserExtractBank: function() {
				let that = this;
				extractBank().then(res => {
					let array = res.data;
					that.$set(that, 'array', array);
				});
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				spreadInfo().then(res => {
					that.userInfo = res.data;
					that.minPrice = res.data.user_extract_min;
				});
			},
			swichNav: function(current) {
				this.currentTab = current;
				this.load = false;
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value;
			},
			handlePayColor: function() {
				let str = ''
				if (this.currentTab == 1) {
					str = '#41B035'
				} else if (this.currentTab == 2) {
					str = '#00A9F2'
				} else {
					str = '#FE960F '
				}
				return str
			},
			uploadpic: function() {
				let that = this;
				console.log('地方');
				that.$util.uploadImageOne('upload/image', function(res) {
					console.log(res);
					that.pics.push(res.data.path);
					that.$set(that, 'pics', that.pics);
					that.$set(that, 'extract_pic', that.pics[0])
				});
			},
			/**
			 * 删除图片
			 *
			 */
			DelPic: function(index) {
				let that = this,
					pic = this.pics[index];
				that.pics.splice(index, 1);
				that.$set(that, 'pics', that.pics);
			},
			subCash: function(e) {
				let that = this,
					value = e.detail.value;
				if(that.load) return;
				if (that.currentTab == 0) { //银行卡
					if (value.real_name.length == 0) return this.$util.Tips({
						title: '请填写持卡人姓名'
					});
					if (value.bank_code.length == 0) return this.$util.Tips({
						title: '请填写卡号'
					});
					// if (that.index == 0) return this.$util.Tips({
					// 	title: "请选择银行"
					// });
					value.extract_type = 'bank';
					value.bank_name = (that.array && that.array.length) ? that.array[that.index].name : '';
				} else if (that.currentTab == 1) { //微信
					value.extract_type = 'weixin';
					if(!this.sys_extension_type){
						value.extract_pic = that.extract_pic
						if (value.wechat.length == 0) return this.$util.Tips({
							title: '请填写微信号'
						});
						if (value.extract_pic.length == 0) return this.$util.Tips({
							title: '请上传收款码'
						});
					}
				} else if (that.currentTab == 2) { //支付宝
					value.extract_type = 'alipay';
					value.extract_pic = that.extract_pic
					if (value.alipay_code.length == 0) return this.$util.Tips({
						title: '请填写账号'
					});
					if (value.extract_pic.length == 0) return this.$util.Tips({
						title: '请上传收款码'
					});
				}
				if (value.extract_price.length == 0) return this.$util.Tips({
					title: '请填写提现金额'
				});
				if (Number(value.extract_price) < that.minPrice) return this.$util.Tips({
					title: '提现金额不能低于' + that.minPrice
				});
				value.extract_type = this.currentTab
				console.log(value, 'value')
				that.load = true;
				if(that.sys_extension_type && that.currentTab == 1)
				value = {extract_price: e.detail.value.extract_price, extract_type: 3}
				extractCash(value).then(res => {
					that.getUserInfo();
					that.load = false;
					that.$util.Tips({
						title: res.message,
						icon: 'success'
					});
					setTimeout(function(){
						// uni.navigateBack({
						// 	delta: 1,
						// })
						uni.navigateTo({
							url: '/pages/users/user_spread_user/index'
						});
					},1000)
				}).catch(err => {
					that.load = false;
					return that.$util.Tips({
						title: err
					});
				});
			},
			/**
			 * 打开支付组件
			 *
			 */
			goPay: function(pay_price) {
				this.$set(this, 'pay_close', true);
				// this.$set(this, 'pay_order_id', );

			},
			/**
			 * 关闭支付组件
			 *
			 */
			payClose: function() {
				this.pay_close = false;
			},
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
				this.currentTab = opt.type
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5 !important;
	}
    .mt25{
		margin-top: 25rpx;
	}
	.cash-withdrawal .nav {
		height: 130rpx;
		padding: 0 30rpx;
		font-size: 30rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	}
	.b-color{background-color: var(--view-theme);}
	.cash-withdrawal .nav .input {
		width: 505rpx;
		.more-content{
			display: flex;
			align-items: center;
			.more-content-left{
				width: 90%;
				.type-icon{
					display: inline-block;
					width: 56rpx;
					height: 56rpx;
					text-align: center;
					line-height: 56rpx;
					background-color: #FE960F;
					margin-right: 20rpx;
					border-radius: 50%;
					.bankicon{
						font-size: 36rpx;
						color: #FFFFFF;
					}
				}
			}
			.moreicon{
				width: 10%;
				text-align: right;
			}
		}
	}

	.cash-withdrawal .nav .item {
		font-size: 26rpx;
		flex: 1;
		text-align: center;
	}

	.cash-withdrawal .nav .item~.item {
		border-left: 1px solid #f0f0f0;
	}

	.cash-withdrawal .nav .item .iconfont {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #e93323;
		text-align: center;
		line-height: 37rpx;
		margin: 0 auto 6rpx auto;
		font-size: 22rpx;
		box-sizing: border-box;
	}

	.cash-withdrawal .nav .item .iconfont.on {
		background-color: #e93323;
		color: #fff;
		border-color: #e93323;
	}

	.cash-withdrawal .nav .item .line {
		width: 2rpx;
		height: 20rpx;
		margin: 0 auto;
		transition: height 0.3s;
	}

	.cash-withdrawal .nav .item .line.on {
		height: 39rpx;
	}

	.cash-withdrawal .wrapper .list {
		padding: 0 30rpx;
		background-color: #fff;
	}
	.cash-withdrawal .wrapper .list .item {
		border-bottom: 1px solid #eee;
		height: 107rpx;
		font-size: 30rpx;
		color: #333;

		&.uploadItem {
			border-bottom: none;
			height: auto;

			.name {
				height: 107rpx;
				;
			}
		}
	}

	.picture {
		width: 70px;
		height: 70px;
		margin: 0 0 17px 0;
		position: relative;
		font-size: 11px;
		color: #bbb;
		border: 0.5px solid #ddd;
		box-sizing: border-box;
		margin-top: 40rpx;

		uni-image,image {
			width: 100%;
			height: 100%;
			border-radius: 1px;
		}

		.icon-guanbi1 {
			font-size: 22px;
			position: absolute;
			top: -10px;
			right: -10px;
			color: #fc4141;
		}
	}

	.cash-withdrawal .wrapper .list .item .name {
		width: 130rpx;
	}

	.cash-withdrawal .wrapper .list .item .input {
		width: 505rpx;
	}

	.cash-withdrawal .wrapper .list .item .input .placeholder {
		color: #bbb;
	}
	.cash-withdrawal .placeholder1 {
		font-size: 46rpx;
	}
	.cash-withdrawal .wrapper .list .tip {
		font-size: 26rpx;
		color: #999;
		margin-bottom: 25rpx;
	}
   .cash-withdrawal .wrapper .list .btn-submit{
	   background-color: #F5F5F5;
	   margin: 0 -30rpx;
	   padding: 64rpx 30rpx;
   }
	.cash-withdrawal .wrapper .list .bnt {
		font-size: 32rpx;
		color: #fff;
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		border-radius: 50rpx;
		line-height: 90rpx;
		/deep/ &.disabled {
			background: #E3E3E3!important;
			pointer-events: none;
		}
	}



	.cash-withdrawal .wrapper .list .tip2 {
		font-size: 26rpx;
		color: #999;
		text-align: center;
		margin: 44rpx 0 20rpx 0;
	}

	.cash-withdrawal .wrapper .list .value {
		height: 135rpx;
		line-height: 135rpx;
		border-bottom: 1px solid #eee;
		width: 690rpx;
		margin: 0 auto;
	}

	.cash-withdrawal .wrapper .list .value input {
		font-size: 80rpx;
		color: #282828;
		height: 135rpx;
		text-align: center;
	}
	.cash-withdrawal .wrapper .list .value .placeholder2 {
		color: #bbb;
	}
	.price {
		color: var(--view-priceColor);
	}
	.Bank {
		display: block;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.auto_arrival{
		text-align: center;
		padding: 20rpx 0 0 0;
		.input{
			width: 100%;
			border-bottom: 1px solid #eee;
			margin-top: 10rpx;
			color: #999;
			height: 120rpx;
			/deep/uni-input,input{
				height: 120rpx;
				font-size: 40rpx;
			}
		}
	}
	 uni-toast.uni-mask{
		background-color: rgba(0,0,0,0.5) !important;
	}
</style>
