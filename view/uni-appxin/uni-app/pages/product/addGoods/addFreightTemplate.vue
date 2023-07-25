<template>
	<view class="container">	
		<view class="freight_template">
			<view class="freight_template_name">
				<view class="freight_template_name_con">
					<view class="freight_template_name_con_label">运费模板名称</view>
					<view class="freight_template_name_con_value">
						<input type="text" v-model="billingData.name" placeholder="填写模板名称" placeholder-class="inputClass_template_name" />
					</view>
				</view>
			</view>		
			<view class="freight_description">
				<view class="freight_description_title">运费说明</view>
				<view class="freight_description_textarea"><textarea v-model="billingData.info" placeholder="填写运费说明" placeholder-class="textarea_class" /></view>
			</view>		
		</view>
		<view class="billing_method">
			<view class="billing_method_title">计费方式</view>
			<view class="billing_method_radio">
				<radio-group @change="changeType" v-model="billingData.type" class="radioContainer">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in billing.list" :key="item.value">
							<radio :value="item.value" :checked="item.value == billingData.type" />
						<view>{{ item.label }}</view>
					</label>
				</radio-group>
			</view>
		</view>

		<view class="regional_freight" @click="goDistributionArea">
			<view class="regional_freight_label">配送区域及运费</view>
			<view class="regional_freight_value">
				<span>去编辑</span>
				<span class="iconfont">&#xe6bd;</span>
			</view>
		</view>

		<tip message="默认全国，开启时指定区域不配送时无效"></tip>

		<view class="free_shipping">
			<view class="free_shipping_item">
				<view class="free_shipping_item_label">指定包邮</view>
				<view class="free_shipping_item_value"><switch @change="switchChange" :checked="billingData.appoint == 1" color="#E93323" style="transform:scale(0.7)" /></view>
			</view>

			<view class="free_shipping_item" @click="goarcelArea" v-if="billingData.appoint == 1">
				<view class="free_shipping_item_label">包邮区域</view>
				<view class="free_shipping_item_value">
					<span>去编辑</span>
					<span class="iconfont">&#xe6bd;</span>
				</view>
			</view>
		</view>

		<view class="free_shipping mt30">
			<view class="billing_method width100">
				<view class="billing_method_title">指定区域不配送</view>
				
				<view class="billing_method_radio">
					<radio-group @change="changeArea" v-model="billingData.undelivery" class="radioContainer">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in billing.specifiedArea" :key="item.value">
							<view><radio :value="item.value" :checked="item.value == billingData.undelivery" /></view>
							<view>{{ item.label }}</view>
						</label>
					</radio-group>
				</view>
			</view>

			<view class="free_shipping_item" v-if="billingData.undelivery == '1'" @click="selectArea">
				<view class="free_shipping_item_label">自定义</view>
				<view class="free_shipping_item_value">
					<span>{{allReadySelect.length ? allReadySelect.map(val=> val.name).join(',') : '请选择不配送区域'}}</span>
					<span class="iconfont">&#xe6bd;</span>
				</view>
			</view>
		</view>
		<tip message="开启时，仅支持以上添加的配送区域"></tip>
		<view class="handle"><view class="handle_button" @click="save">保存</view></view>
		<uni-popup ref="area_popup" type="bottom"><areas @handleGetSelectArea="handleGetSelectArea" :allReadySelect="allReadySelect" @close="close"></areas></uni-popup>
		<distribution-area ref="distributionArea" :freightData="billingData.region" :popup="popup" @changeClose="closeDistribution" @getData="getData"></distribution-area>
		<parcel-area ref="parcelArea" :parcelData="billingData.free" :popup="popup" @changeClose="closeParcel" @getData="getFreeData"></parcel-area>
	</view>
</template>

<script>
import tip from '../components/tip.vue';
import areas from '../components/areas.vue';
import distributionArea from '../components/distributionArea.vue';
import parcelArea from '../components/parcelArea.vue';
import { navigateTo, getStorage, Toast } from '../../../libs/uniApi.js';
import { templateCreate, templateDetail, templateUpdate } from 'api/product.js';
export default {
	components: {
		tip,
		areas,
		distributionArea,
		parcelArea
	},
	data() {
		return {
			mer_id: '',
			shipping_id: '',
			billingData: {
				name: '', // 运费模板名称
				type: 0, // 计费方式 0数量 1重量 2体积
				appoint: 0, // 开启指定包邮，0关闭 1开启
				undelivery: 0, // 开启指定区域不配送 0关闭 1开启
				info: '', // 运费说明
				sort: '', // 排序
				region: [], //配送区域信息
				undelives: {city_id: []}, // 不配送区域
				free: []
			},
			popup: {
				show: false,
				showParael: false
			},
			
			allReadySelect: [], // 已选地址信息
			billing: {
				list: [
					{
						value: '0',
						label: '按件数'
					},
					{
						value: '1',
						label: '按重量'
					},
					{
						value: '2',
						label: '按体积'
					}
				],
				specifiedArea: [
					{
						value: '1',
						label: '自定义'
					},
					{
						value: '2',
						label: '开启'
					},
					{
						value: '0',
						label: '关闭'
					}
				]
			}
			
		};
	},
	watch: {
		billingData: {
			handler(val) {
				console.log(val);
			},
			deep: true
		}
	},
	onLoad(opt) {
		this.mer_id = opt.mer_id;
		this.shipping_id = opt.shipping_id;
		if(this.shipping_id) this.getShippingData();
	},
	methods: {
		//获取运费模板详情
		getShippingData(){
			let that = this
			uni.showLoading({
				title: '加载中'
			});
			templateDetail(that.mer_id,that.shipping_id)
				.then(res => {
					uni.hideLoading();
					let data = res.data
					that.billingData = data;
					that.getCityList(that.billingData.region);
					that.getCityList(that.billingData.free);
					if(that.billingData.undelives && that.billingData.undelives.city_name.length > 0){
						that.allReadySelect = that.billingData.undelives.city_name
						that.billingData.undelives['city_id'] = that.billingData.undelives.city_name.map(val => val.id);
					}else{
						that.billingData.undelives['city_id'] = [0]
					}
				})
				.catch(res => {
					that.$util.Tips({
						title: res
					});
				});
		},
		//获取city_id
		getCityList(arr){
			if(arr.length > 0){
				arr.forEach((value,i)=>{
					if(!Array.isArray(value['city_id'])){
						value['city_id'] = []
						value['city_name'].forEach((v,j)=>{
							if(v.length == 0){
								value['city_id'] = [0]
							}else{
								value['city_id'].push(v.id)
							}
						})
					}
				})
				return arr;
			}
		},
		changeType(e) {
			this.billingData.type = e.detail.value;
		},
		changeArea(e) {
			this.billingData.undelivery = e.detail.value;
		},
		// 打开选择地址的弹框
		selectArea() {
			this.$refs.area_popup.open();
		},
		// 关闭选择地址弹框
		close() {
			this.$refs.area_popup.close();
		},
		// 获取选择的地址数据
		handleGetSelectArea(item) {
			if(!this.billingData.undelives)this.billingData.undelives = {}
			this.billingData.undelives['city_id'] = item.map(val => val.id);
			this.allReadySelect = item;
			console.log(this.billingData.undelives)
			this.$refs.area_popup.close();
		},
		// 指定包邮开关
		switchChange(e) {
			if(e.target.value) {
				this.billingData.appoint = 1
			} else {
				this.billingData.appoint = 0
			}
		},
		getData(data){
			this.$set(this.billingData, 'region', data);
			this.$set(this.popup, 'show', false);
		},
		getFreeData(data){
			this.$set(this.billingData, 'free', data);
			this.$set(this.popup, 'showParael', false);
		},
		// 保存
		save() {
			let that = this;
			let postData = {
				...this.billingData
			};
			if (!postData.name) return that.$util.Tips({
				title: '请输入模板名称'
			});
			if (!postData.info) return that.$util.Tips({
				title: '请输入运费说明'
			});
			if (postData.region.length == 0) return that.$util.Tips({
				title: '请编辑配送区域及运费'
			});
			if (postData.appoint == 1 && postData.free.length== 0) return that.$util.Tips({
				title: '请编辑包邮区域'
			});
			if (postData.undelivery == 1 && !postData.undelives) return that.$util.Tips({
				title: '请编辑不包邮区域'
			});
			that.shipping_id ? 
			templateUpdate(that.mer_id, that.shipping_id, postData).then(res => {
				that.$util.Tips({
					title: res.message,
					icon: 'success'
				});
				setTimeout(()=>{
					uni.redirectTo({
						url: `/pages/product/addGoods/freightTemplate?mer_id=${that.mer_id}`
					})
				},1000)
				
			}).catch(rej => {
				Toast(rej);
			}) :
			templateCreate(this.mer_id, postData).then(res => {
				that.$util.Tips({
					title: res.message,
					icon: 'success'
				});
				uni.redirectTo({
					url: `/pages/product/addGoods/freightTemplate?mer_id=${that.mer_id}`
				})
				
			}).catch(rej => {
				Toast(rej);
			})
			
		},
		// 打开配送区域及运费
		goDistributionArea() {
			console.log(this.billingData.region)
			this.$set(this.popup, 'show', true);
			this.$refs.distributionArea.initListData();
		},
		//关闭弹窗
		closeDistribution(){
			this.$set(this.popup, 'show', false);
		},
		// 打开指定包邮
		goarcelArea() {	
			this.$set(this.popup, 'showParael', true);	
			this.$refs.parcelArea.initParcelData();
		},
		//关闭弹窗
		closeParcel(){
			this.$set(this.popup, 'showParael', false);
		},
	
	}
};
</script>

<style lang="scss" scoped>
@import './scss/freightTemplate.scss';
</style>
