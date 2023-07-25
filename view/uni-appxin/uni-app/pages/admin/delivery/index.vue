<template>
	<view class="deliver-goods" :style="viewColor">
		<header>
			<view class="order-num acea-row row-between-wrapper">
				<view class="num line1">订单号：{{ delivery.order_sn }}</view>
				<view class="name line1">
					<span class="iconfont icon-yonghu2"></span>{{ delivery.user && delivery.user.nickname }}
				</view>
			</view>
			<view class="address">
				<view class="name">
					{{ delivery.real_name }}<span class="phone">{{ delivery.user && delivery.user_phone }}</span>
				</view>
				<view>{{ delivery.user_address }}</view>
			</view>
			<view class="line">
				<image :src="`${domain}/static/images/line.jpg`" />
			</view>
		</header>
		<view class="wrapper">
			<view class="item acea-row row-between-wrapper">
				<view>发货方式</view>
				<view class="mode acea-row row-middle row-right">
					<view class="goods" :class="active === index ? 'on' : ''" v-for="(item, index) in types" :key="index" @click="changeType(item, index)">
						<span class="iconfont icon-xuanzhong2"></span>{{ item.title }}
					</view>
				</view>
			</view>
			<block v-if="logistics.length>0">
				<view class="list">	
					<block v-if="delivery_type == 1">
						<view class="item acea-row row-between-wrapper">
							<view>快递公司</view>
							<view class="select-box">
								<picker class="pickerBox" @change="bindPickerChange" :value="seIndex" :range="logistics" range-key="label">
									<view class="uni-input">{{logistics[seIndex].label}}</view>
								</picker>
							</view>
						</view>
						<view class="item acea-row row-between-wrapper">
							<view>快递单号</view>
							<input type="text" placeholder="填写快递单号" v-model="delivery_id" class="mode" />
							<!-- #ifdef MP -->
							<text class="iconfont icon-xiangji" @click="scanCode"></text>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<text v-if="isWeixin" class="iconfont icon-xiangji" @click="scanCode"></text>
							<!-- #endif -->
						</view>
					</block>
					<block v-if="delivery_type == 4">
						<view class="item acea-row row-between-wrapper">
							<view>快递公司</view>
							<view class="select-box">
								<picker class="pickerBox" @change="bindPickerChange" :value="seIndex" :range="logistics" range-key="label">
									<view class="uni-input">{{logistics[seIndex].label}}</view>
								</picker>
							</view>
						</view>
						<view class="item acea-row row-between-wrapper" v-if="expTemp.length > 0 && delivery_type == 4">
							<view>电子面单</view>
							<div style="display: flex;align-items: center;">
								<picker class="pickerBox" @change="bindTempChange" :value="expIndex" :range="expTemp" range-key="title">
									<view class="uni-input input-inline">{{expTemp[expIndex].title}}</view>
								</picker>
								<div class="look" @click="previewImage">预览</div>
							</div>	
						</view>
						<view class="item acea-row row-between-wrapper">
							<view>寄件人姓名</view>
							<input type="text" placeholder="填写寄件人姓名" v-model="from_name" class="mode" />
						</view>
						<view class="item acea-row row-between-wrapper">
							<view>寄件人电话</view>
							<input type="text" placeholder="填写寄件人电话" v-model="from_tel" class="mode" />
						</view>
						<view class="item acea-row row-between-wrapper">
							<view>寄件人地址</view>
							<input type="text" placeholder="填写寄件人地址" v-model="from_addr" class="mode" />
						</view>
					</block>
				</view>
			</block>
			<view class="list" v-if="delivery_type == 2">
				<view class="item acea-row row-between-wrapper">
					<view>送货人姓名</view>
					<input type="text" placeholder="填写送货人姓名" maxlength="10" v-model="to_name" class="mode" />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view>送货人电话</view>
					<input type="text" placeholder="填写送货人电话" v-model="to_phone" class="mode" />
				</view>
			</view>
			<block v-if="delivery_type == 5">
				<view class="item acea-row row-between-wrapper">
					<view>发货点</view>
					<view class="select-box">
						<picker class="pickerBox" @change="bindStoreChange" :value="storeIndex" :range="storeList" range-key="label">
							<view class="uni-input">{{storeList[storeIndex] && storeList[storeIndex].label}}</view>
						</picker>
					</view>
				</view>
				<view class="item acea-row row-between-wrapper">
					<view>包裹重量</view>
					<input type="number" placeholder="填写包裹重量" v-model="cargo_weight" class="mode" />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view>配送备注</view>
					<input type="textarea" placeholder="填写配送备注" v-model="mark" class="mode textarea" />
				</view>
			</block>
			<view class="list">
				<view class="item acea-row row-between-wrapper">
					<view>发货备注</view>
					<input type="textarea" placeholder="填写发货备注" v-model="remark" class="mode textarea" />
				</view>
			</view>
			<block v-if="(delivery.orderProduct) && ((delivery.orderProduct.length > 1) || (delivery.orderProduct.length==1 && delivery.orderProduct[0]['refund_num']>1)) && activity_type != 2">
				<view class="item acea-row row-between-wrapper">
					<view>分单发货</view>
					<view class="mode acea-row row-middle row-right">
						<view class="goods" :class="curSplit === item.key ? 'on' : ''" v-for="(item, index) in splitList" :key="index" @click="changeSplit(item, index)">
							<span class="iconfont icon-xuanzhong2"></span>{{ item.title }}
						</view>
					</view>
				</view>
				<block v-if="curSplit">
					<view v-for="(item, index) in delivery.orderProduct">
						<view class="pro_list acea-row">
							<view class="checkbox" @tap.stop="checkedChange(item)">
								<text v-if="item.checked" class="iconfont icon-xuanzhong1"></text>
								<text v-else class="iconfont icon-weixuanzhong"></text>											
							</view>							
							<view v-if="item.cart_info && item.cart_info.product" class="picture">
								<image :src="item.cart_info.product.image"></image>	
							</view>
							<view class="info" v-if="item.cart_info && item.cart_info.product">
								<view class="name line2">{{item.cart_info.product.store_name}}</view>
								<view class="info_sku" v-if="item.cart_info && item.cart_info.productAttr">{{item.cart_info.productAttr.sku}}</view>
								<view class="info_price" v-if="item.cart_info && item.cart_info.productAttr">￥<text>{{item.cart_info.productAttr.price}}</text></view>
								<view class='carnum acea-row row-center-wrapper'>
									<view class="reduce" :class="item.numSub ? 'on' : ''" @click.stop='subCart(item)'>-</view>
									<view class='num'>{{item.split_num}}</view>
									<view class="plus" :class="item.numAdd ? 'on' : ''" @click.stop='addCart(item)'>+</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</block>
			<block v-if="!curSplit">
				<view class="pro_count" v-if="delivery.orderProduct">
					<view class="title">共{{delivery.orderProduct.length}}件商品</view>
					<view v-for="(item, index) in delivery.orderProduct">
						<view class="pro_list acea-row">						
							<view v-if="item.cart_info && item.cart_info.product" class="picture">
								<image :src="item.cart_info.product.image"></image>	
							</view>
							<view class="info pro_info" v-if="item.cart_info && item.cart_info.product">
								<view class="name line2">{{item.cart_info.product.store_name}}</view>
								<view class="info_sku" v-if="item.cart_info && item.cart_info.productAttr">{{item.cart_info.productAttr.sku}}</view>
							</view>
							<view class="pro_price" v-if="item.cart_info && item.cart_info.productAttr">
								<view class="info_price">￥{{item.cart_info.productAttr.price}}</view>
								<view class="info_num">x{{item.product_num}}</view>
								<view class="refund_num" v-if="item.product_num-item.refund_num>0">{{item.product_num-item.refund_num}}件{{item.is_refund==1?'退款中' : item.is_refund==2 ? '已退款' : item.is_refund==3?'全部退款':''}}</view>
							</view>
						</view>
					</view>
					<view class="footer">
						共{{delivery.orderProduct.length}}件商品，已支付<text> ￥{{delivery.pay_price}} </text>（运费￥{{delivery.pay_postage}}）
					</view>
				</view>
			</block>
		</view>
		<view style="height:5.4rem;"></view>
		<view class="confirm_btn"><view class="confirm" @click="saveInfo">确认提交</view></view>	
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
		getAdminOrderDetail,
		setAdminOrderDelivery,
		orderExportTemp,
		orderDeliveryInfo,
		getTempAndDelivery,
		getDeliveryStoreLst
	} from "@/api/admin";
	import { mapGetters } from "vuex";
	import { expressList } from "@/api/order";
	import { checkPhone } from '@/utils/validate.js';
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		name: "GoodsDeliver",
		components: {},
		props: {},
		data: function() {
			return {
				types: [{
						type: 1,
						title: "发货"
					},
					{
						type: 2,
						title: "送货"
					},
					{
						type: 3,
						title: "无需物流"
					}
				],
				splitList: [
					{
						title: '开启',
						key: 1
					},
					{
						title: '关闭',
						key: 0
					}
				],
				curSplit: 0,
				curExpress: 1,
				active: 0,
				order_id: "",
				delivery: {
					user: {}
				},
				logistics: [],
				delivery_type: 1,
				delivery_name: "",
				to_phone: '', //送货人电话
				to_name: '', //送货人姓名
				remark: "",
				mark: "",
				cargo_weight: 0,
				delivery_id: "",
				mer_config_temp_id: "",
				mer_from_com: "",
				seIndex: 0,
				storeIndex: 0,
				merId: "",
				expIndex:0,
				expTemp:[], // 快递模板
				from_name:'', // 发货人名称	
				from_tel:'',  // 发货人电话	
				from_addr:"", // 发货人地址	
				fictitious_content: '',
				isTemp: false,
				isDelivery: false,
				is_virtual: 0,
				splitProducts: [],
				storeList: [],
				activity_type: 0,
				domain: HTTP_REQUEST_URL,
				// #ifdef H5
				isWeixin: this.$wechat.isWeixin()
				// #endif
			};
		},
		watch: {
			"$route.params.oid": function(newVal) {
				let that = this;
				if (newVal != undefined) {
					that.order_id = newVal;
					that.getIndex();
				}
			}
		},
		computed: mapGetters(['viewColor']),
		onLoad: function(option) {
			this.order_id = option.id;
			this.merId = option.merId
			this.getIndex();
			this.expressList();
			this.orderDeliveryInfo();
		},
		methods: {
			// 扫描快递单号一维码
			scanCode() {
				// #ifdef MP
				let that = this;
				uni.scanCode({
					scanType: ['barCode'],
					success(res) {
						let code = res.result.split(",")
						that.delivery_id = code.length == 1 ? code[0] : code[1];
					}
				})
				// #endif
				// #ifdef H5
				if (this.$wechat.isWeixin()) {
					this.$wechat.wechatEvevt('scanQRCode', {
						needResult: 1,
						scanType: ['barCode']
					}).then(res => {
						let code = res.resultStr.split(",")
						that.delivery_id = code.length == 1 ? code[0] : code[1];
					});
				}
				// #endif
			},
			// 预览图片
			previewImage(){
				uni.previewImage({
					urls: [this.expTemp[this.expIndex].pic],
					success:function(){},
					fail:function(error){}
				});
			},
			// 是否开启电子面单和同城配送
			isOpenDeliveryTemp(is_virtual){
				let that = this
				getTempAndDelivery(that.merId).then(
					res => {
						if(is_virtual == 1){
							that.delivery_type = 3
							that.types = [
								{type: 3,title: "虚拟发货"}
							]
						}else{
							if(res.data.crmeb_serve_dump == 1){
								that.types.push({type: 4,title: "电子面单"})
							}
							if(res.data.delivery_status == 1){
								that.types.push({type: 5,title: "同城配送"})
							}
						}
					},
					error => {
						that.$util.Tips({
							title: error
						})
					}
				);
			},
			//获取电子面单默认数据
			getDump(){
				let that = this;
				that.expTemp.forEach((val,index) =>{
					if(val.temp_id == that.mer_config_temp_id){
						that.expIndex = index;
						return;
					}
				})
			},
			 //获取门店列表
			getStoreList() {
			    getDeliveryStoreLst(this.merId).then((res) => {
					this.storeList = res.data
			    }).catch((error) => {
			        this.$util.Tips({
			        	title: error
			        })
			    })
			},
			changeType: function(item, index) {
				this.active = index;
				this.delivery_type = item.type;
				this.delivery_name = "";
				this.delivery_id = "";
				if(item.type == 5){
					this.getStoreList()
				}
			},
			changeSplit: function(item, index) {
				this.curSplit = item.key;
			},
			getIndex: function() {
				let that = this;
				getAdminOrderDetail(that.merId,that.order_id).then(
					res => {
						res.data.orderProduct.forEach((goods, j) => {
							goods.checked = true
							goods.split_num = goods.refund_num
						})
						that.delivery = res.data;
						that.activity_type = res.data.activity_type;
						that.is_virtual = res.data.is_virtual;
						that.isOpenDeliveryTemp(that.is_virtual);
					},
					error => {
						that.$util.Tips({
							title: error
						})
					}
				);
			},
			expressList: function() {
				let that = this;
				expressList().then(
					res => {
						that.logistics = res.data;
						that.getExpTemp(res.data[0].value)
					},
					error => {
						that.$util.Tips({
							title: error
						})
					}
				);
			},
			/*选择分单商品*/
			checkedChange(item) {
				item.checked = !item.checked;
			},
			/*获取分单商品*/
			getSplitProduct() {
				let that = this;
				let data = [];
				that.delivery.orderProduct.map((item) => {
					if(item.checked){
						data.push({id:item.order_product_id,num:item.split_num})
					}
				})
				return data;
			},
			subCart(item) {
				if(item.split_num > 1){
					item.split_num--
				}
			},
			addCart(item) {
				if(item.split_num < item.refund_num){
					item.split_num++
				}
			},
			async saveInfo() {
				let that = this,
				delivery_type = that.delivery_type,
				delivery_name = that.logistics[that.seIndex].value,
				delivery_id = that.delivery_id,
				save = {};
				save.delivery_name = delivery_name
				save.delivery_type = delivery_type
				save.is_split = that.curSplit
				if(that.curSplit){
					that.splitProducts = that.getSplitProduct()
					if(that.splitProducts.length == 0){
						return this.$util.Tips({
							title: '请选择分单商品'
						})
					}
				}
				save.split = that.splitProducts;
				if(delivery_type==1){
					if (!delivery_id) {
						return this.$util.Tips({
							title: '请填写快递单号'
						})
					}
					save.delivery_id = delivery_id
					that.setInfo(save);
				}
				if(delivery_type == 2){
					if (!that.to_name) {
						return this.$util.Tips({
							title: '请填写送货人姓名'
						})
					}
					if (!that.to_phone) {
						return this.$util.Tips({
							title: '请填写送货人手机号码'
						})
					}
					if (!(/^1[3456789]\d{9}$/.test(that.to_phone))) {
						return this.$util.Tips({
							title: '请填写正确的手机号码'
						})
					}
					save.delivery_name = that.to_name;
					save.delivery_id = that.to_phone;
					that.setInfo(save);
				}
				if(delivery_type == 3){
					save.remark = that.remark;
					that.setInfo(save);
				}
				if(delivery_type==4){
					if (!that.from_name) {
						return this.$util.Tips({
							title: '请填写寄件人姓名'
						})
					}
					if (!that.from_tel) {
						return this.$util.Tips({
							title: '请填写寄件人手机号码'
						})
					}
					if (!(/^1[3456789]\d{9}$/.test(that.from_tel))) {
						return this.$util.Tips({
							title: '请填写正确的手机号码'
						})
					}
					if (!that.from_addr) {
						return this.$util.Tips({
							title: '请填写寄件人地址'
						})
					}
					if(that.expTemp.length==0){
						return this.$util.Tips({
							title: '请选择电子面单'
						})
					}
					save.from_name = that.from_name
					save.from_tel = that.from_tel
					save.from_addr = that.from_addr
					save.temp_id = that.expTemp[that.expIndex].temp_id
					that.setInfo(save);
				}
				if(delivery_type == 5){
					save.station_id = that.storeList[that.storeIndex].value
					save.cargo_weight = that.cargo_weight;
					save.mark = that.mark;
					that.setInfo(save);
				}
			},
			setInfo: function(item) {
				let that = this;
				setAdminOrderDelivery(that.merId,that.order_id,item).then(
					res => {
						that.$util.Tips({
							title: res.message,
							icon: 'success',
							mask: true
						})
						let type = that.is_virtual ? 4 : 3
						setTimeout(res => {	
							uni.redirectTo({
								url:`/pages/admin/orderList/index?types=${type}&merId=${that.merId}`
							})
						}, 1000)
					},
					error => {
						that.$util.Tips({
							title: error
						})
					}
				);
			},
			bindPickerChange(e) {
				this.seIndex = e.detail.value
				this.getExpTemp(this.logistics[e.detail.value].value)
			},
			bindTempChange(e) {
				this.expIndex = e.detail.value
			},
			bindStoreChange(e){
				this.storeIndex = e.detail.value
			},
			getExpTemp(code){
				orderExportTemp({
					com: code
				}).then(res=>{
					this.expTemp = res.data.data
				})
			},
			// 获取订单打印默认配置
			orderDeliveryInfo(){
				let that = this
				orderDeliveryInfo(that.merId).then(
					res => {
						that.from_name = res.data.mer_from_name;
						that.from_tel = res.data.mer_from_tel;
						that.from_addr = res.data.mer_from_addr;
						that.mer_config_temp_id = res.data.mer_config_temp_id;
						that.mer_from_com = res.data.mer_from_com
					},
					error => {
						that.$util.Tips({
							title: error
						})
					}
				)
			}
		}
	};
</script>

<style lang="scss" scoped>
	/*发货*/
	.uni-input{
		display: block;
		width: 400rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.input-inline{
		width: auto;
	}
	.deliver-goods header {
		width: 100%;
		background-color: #fff;
		margin-top: 10upx;
	}
	.deliver-goods header .order-num {
		padding: 0 30upx;
		border-bottom: 1px solid #f5f5f5;
		height: 67upx;
	}
	.deliver-goods header .order-num .num {
		width: 430upx;
		font-size: 26upx;
		color: #282828;
		position: relative;
	}
	.deliver-goods header .order-num .num:after {
		position: absolute;
		content: '';
		width: 1px;
		height: 30upx;
		background-color: #ddd;
		top: 50%;
		margin-top: -15upx;
		right: 0;
	}
	.deliver-goods header .order-num .name {
		width: 260upx;
		font-size: 26upx;
		color: #282828;
		text-align: center;
	}
	.deliver-goods header .order-num .name .iconfont {
		font-size: 35upx;
		color: #477ef3;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.deliver-goods header .address {
		font-size: 26upx;
		color: #868686;
		background-color: #fff;
		padding: 30upx;
	}
	.look{
		margin-left: 20rpx;
		color: #1890FF;
	}
	.deliver-goods header .address .name {
		font-size: 34upx;
		color: #282828;
		margin-bottom: 10upx;
	}
	.deliver-goods header .address .name .phone {
		margin-left: 40upx;
	}
	.deliver-goods header .line {
		width: 100%;
		height: 3upx;
	}
	.deliver-goods header .line image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.deliver-goods .wrapper {
		width: 100%;
		background-color: #fff;
	}
	.deliver-goods .wrapper .item {
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30upx;
		min-height: 96upx;
		font-size: 28rpx;
		color: #282828;
		position: relative;
	}
	.deliver-goods .wrapper .item .mode {
		width: 480upx;
		height: 100%;
		text-align: right;
	}
	.deliver-goods .wrapper .item .mode .iconfont {
		font-size: 30upx;
		margin-left: 13upx;
	}
	.deliver-goods .wrapper .item .mode .goods~.goods {
		margin-left: 30upx;
	}
	.deliver-goods .wrapper .item .mode .goods {
		color: #bbb;
		margin: 10rpx 0;
	}
	.deliver-goods .wrapper .item .mode .goods.on {
		color: #477ef3;
	}
	.deliver-goods .wrapper .item .icon-up {
		position: absolute;
		font-size: 35upx;
		color: #2c2c2c;
		right: 30upx;
	}
	.deliver-goods .wrapper .item select {
		direction: rtl;
		padding-right: 60upx;
		position: relative;
		z-index: 2;
	}
	.deliver-goods .wrapper .item input::placeholder {
		color: #bbb;
	}
	.deliver-goods .confirm_btn {
		position: fixed;
		bottom: 0;
		padding: 20rpx 30rpx;
		background: #fff;
		width: 100%;
	}
	.deliver-goods .confirm {
		font-size: 32upx;
		color: #fff;
		width: 100%;
		height: 90upx;
		background-color: #477ef3;
		text-align: center;
		line-height: 90upx;
		border-radius: 60rpx;
	}
	.select-box {
		flex: 1;
		height: 100%;
		.pickerBox {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100%;
			height: 100%;
			text-align: right;
			position: relative;
			// padding-right: 30rpx;
			.iconfont{
				font-size: 28rpx;
				color: #bbb;
				position: absolute;
				right: 0;
				top: 10rpx;
			}
		}
	}
	.pro_list{
		width: 100%;
		padding: 20rpx 30rpx;
		position: relative;
		align-items: center;
		border-bottom: 1px solid #f0f0f0;
		justify-content: space-between;
	}
	.pro_list .checkbox{
		width: 60rpx;
		.icon-xuanzhong1{
			color: var(--view-theme);
		}
	}
	.pro_list .picture{
		width: 180rpx;
		height: 180rpx;
	}
	/deep/.pro_list .picture image{
		width: 180rpx;
		height: 180rpx;
		border-radius: 6rpx;
	}
	.pro_count .title{
		padding: 20rpx 30rpx;
		line-height: 50rpx;
		border-bottom: 1px solid #EEEEEE;
	}
	.pro_list .info{
		width: 420rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.pro_list .pro_info{
		width: 360rpx;
	}
	.pro_list .info_num{
		color: #ff9600;
		margin-top: 10rpx;
	}
	.pro_list .refund_num{
		margin-top: 10rpx;
		font-size: 24rpx;
	}
	.pro_list .pro_price{
		text-align: right;
	}
	.pro_list .info .name{
		line-height: 46rpx;
	}
	.pro_list .info .carnum{
		height: 47rpx;
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}
	.pro_list .info .carnum view{
		border: 1px solid #a4a4a4;
		min-width: 66rpx;
		text-align: center;
		height: 100%;
		line-height: 46rpx;
		font-size: 28rpx;
		color: #a4a4a4;
	}
	.pro_list .info .carnum .reduce{
		border-right: 0;
		border-radius: 3rpx 0 0 3rpx;
	}
	.pro_list .info .carnum .reduce.on {
		border-color: #e3e3e3;
		color: #dedede;
	}
	.pro_list .info .carnum .plus {
		border-left: 0;
		border-radius: 0 3rpx 3rpx 0;
	}
	.pro_list .info .carnum .num {
		color: #282828;
	}
	.pro_list .info .info_sku{
		color: #868686;
		font-size: 24rpx;
		margin-top: 6rpx;
	}
	.pro_list .pro_info .info_sku{
		margin-top: 20rpx;
	}
	.pro_list .info .info_price{
		margin-top: 30rpx;
	}
	.footer{
		padding: 20rpx 30rpx;
		text-align: right;
		line-height: 50rpx;
		text{
			color: #ff9600;
		}
	}
</style>
