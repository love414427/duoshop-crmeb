<template>
	<view class="container">
		<view class="step_one" v-if="step == 1">
			<view class="input_content">
				<view class="input_content_textarea">
					<textarea v-model="setFormData.store_name" placeholder="请输入商品名称" placeholder-class="placeholderStyle" maxlength="60" />
					<view>
						<text v-if="setFormData.store_name">{{ setFormData.store_name.length }}</text>
						<text v-else>0</text>
						/60
					</view>
				</view>
				<view class="photo_count">
					<text class="photo_size">建议：图片尺寸为750*750px</text>
					<view class="input_content_photo">
						<view class="input_content_photo_adPh" v-for="(item, index) in setFormData.imageList" :key="index">				
							<image :src="item" class="myimg2 photos"></image>  			
							<view class="input_content_photo_adPh_jiao" @click="deleteImage(index)"><image src="../static/images/close.png" mode=""></image></view>
						</view>
						<view v-if="setFormData.imageList.length < 9" class="input_content_photo_adPh addBtn" @click="clk">
							<view><image src="../static/images/creamer.png" mode="widthFix"></image></view>
							<view>添加图片</view>
						</view>
					</view>
				</view>
			
				<view class="input_content_describe">
					<view class="input_content_describe_title">
						<view class="input_content_describe_title_msg">商品简介</view>
						<view class="input_content_describe_title_num">
							<text v-if="setFormData.store_info">{{ setFormData.store_info.length }}</text>
							<text v-else>0</text>
							/200
						</view>
					</view>
					<view class="input_content_describe_textarea">
						<textarea v-model="setFormData.store_info" value="" placeholder="请填写商品简介" placeholderClass="placeholderClass" maxlength="200" />
					</view>
				</view>

				<view class="input_content_keyword">
					<view class="input_content_keyword_label">关键字</view>
					<view class="input_content_keyword_value"><input v-model="setFormData.keyword" type="text" value="" placeholder="填写关键字" /></view>
				</view>
			</view>

			<view class="popup_group">
				<view class="popup_group_item" @click="selectPlatform">
					<view class="popup_group_item_label">平台分类</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<span v-if="setFormData.cate_name" class="popup_group_item_message_value">{{ setFormData.cate_name }}</span>
							<span v-else>请选择平台分类</span>
						</view>
						<view><span class="iconfont">&#xe6bd;</span></view>
					</view>
				</view>

				<view class="popup_group_item" @click="selectStoreClass">
					<view class="popup_group_item_label">店铺分类</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<span v-if="setFormData.mer_cate_name" class="popup_group_item_message_value">{{ setFormData.mer_cate_name }}</span>
							<span v-else>请选择店铺分类</span>
						</view>
						<view><span class="iconfont">&#xe6bd;</span></view>
					</view>
				</view>

				<view class="popup_group_item" @click="selectBrand">
					<view class="popup_group_item_label">商品品牌</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<text v-if="setFormData.brand_name" class="popup_group_item_message_value line1">{{ setFormData.brand_name }}</text>
							<text v-else>请选择商品品牌</text>
						</view>
						<view><text class="iconfont">&#xe6bd;</text></view>
					</view>
				</view>

				<view class="popup_group_item">
					<view class="popup_group_item_label">商品单位</view>
					<view class="popup_group_item_value"><input v-model="setFormData.unit_name" type="text" placeholder="请填写商品单位" /></view>
				</view>
			</view>

			<view class="popup_group">
				<view class="radio">
					<view class="radio_label ">规格选择</view>
					<radio-group class="select_group flex_start" @change="specificationsRadioChange($event)">
						<label class="radio_select" v-for="(val, i) in specificationsRadioList" :key="val.value">
							<view><radio :value="val.value" :checked="val.value == setFormData.spec_type" /></view>
							<view>{{ val.name }}</view>
						</label>
					</radio-group>
				</view>

				<view class="popup_group_item" @click="selectSpecification" v-if="setFormData.spec_type == 1">
					<view class="popup_group_item_label">选择规格</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<span v-if="setFormData.specifica" class="popup_group_item_message_value">{{ setFormData.specifica }}</span>
							<span v-else>去选择</span>
						</view>
						<view><span class="iconfont">&#xe6bd;</span></view>
					</view>
				</view>

				<view class="popup_group_item" @click="setSpecifica" v-if="setFormData.spec_type == 0">
					<view class="popup_group_item_label">价格设置</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<span v-if="setFormData.setSpecificaValue" class="popup_group_item_message_value">{{setFormData.setSpecificaValue}}</span>
							<span v-else>去设置</span>
						</view>
						<view><span class="iconfont">&#xe6bd;</span></view>
					</view>
				</view>
				<view class="popup_group_item" @click="setSpecifica" v-if="setFormData.spec_type == 1 && setFormData.specifica">
					<view class="popup_group_item_label">价格设置</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<span v-if="setFormData.setSpecificaValue2" class="popup_group_item_message_value">{{setFormData.setSpecificaValue2}}</span>
							<span v-else>去设置</span>
						</view>
						<view><span class="iconfont">&#xe6bd;</span></view>
					</view>
				</view>
			</view>

			<view class="popup_group">
				<view v-if="deliveryType.length == 2" class="radio">
					<view class="radio_label ">送货方式</view>
					<checkbox-group class="select_group flex_start" @change="deliveryWayChange">
						<label class="radio_select" v-for="(val, i) in deliveryFreeList" :key="val.value">
							<view><checkbox :value="val.value" :checked="setFormData.delivery_way.includes(val.value)" /></view>
							<view>{{ val.name }}</view>
						</label>
					</checkbox-group>
				</view>

				<view class="popup_group_item" v-if="setFormData.delivery_way.includes('2')">
					<view class="popup_group_item_label">是否包邮</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<switch :checked="setFormData.delivery_free == '1'" color="#E93323" style="transform:scale(0.8)" @change="deliveryFreeChange" />
						</view>
					</view>
				</view>

				<view class="popup_group_item" v-if="setFormData.delivery_way.includes('2') && setFormData.delivery_free == 0" @click="tempIdSelect">
					<view class="popup_group_item_label">运费模板</view>
					<view class="popup_group_item_value">
						<view class="popup_group_item_message">
							<span v-if="setFormData.tempName" class="popup_group_item_message_value">{{ setFormData.tempName }}</span>
							<span v-else>请选择运费模板</span>
						</view>
						<view><span class="iconfont">&#xe6bd;</span></view>
					</view>
				</view>
			</view>
			<view class="handle"><view class="handle_button" @click="handleNextStep">下一步</view></view>
		</view>

		<view class="step_two" v-if="step == 2"><secound :resetKey="secoundModel" :product_id="product_id" :merId="merId" @lastStep="lastStep"></secound></view>

		<!-- 选择平台分类弹框 -->
		<uni-popup ref="select_platform" type="bottom">
			<platfrom @close="closePlatfrom" :classifiedData="platformClassificationData" @getPlatData="getPlatData"></platfrom>
		</uni-popup>

		<!-- 选择店铺分类弹框 -->
		<uni-popup ref="select_store" type="bottom">
			<store-classification :classifiedData="merchantClassification" :mer_id="merId" @handleGetSelectArea="handleGetSelectStore" @close="merchantClose"></store-classification>
		</uni-popup>

		<uni-popup ref="select_popup" type="bottom">
			<linkage-assembly
				selectProductTitle="选择品牌"
				:form="setFormData"
				:classifiedData="brand"
				:selectProductItem="productItem"
				@getLinkageData="getLinkageData"
				@multipleList="multipleList"
				@close="handleClose"
			></linkage-assembly>
		</uni-popup>

		<uni-popup ref="tempId" type="bottom">
			<linkage-assembly
				selectProductTitle="选择运费模板"
				:form="setFormData"
				:classifiedData="classified['temp_id']"
				:selectProductItem="productItem"
				:mer_id="merId"
				@getLinkageData="getTempIdData"
				@multipleList="multipleList"
				@close="$refs.tempId.close()"
				@scrolltolower="scrolltolower"
			></linkage-assembly>
		</uni-popup>
		<uni-popup ref="attr" type="bottom"><attr @close="$refs.attr.close()" :mer_id="merId" :attrList="classified['attr']" @selectAttr="selectAttr"></attr></uni-popup>
		<avatar @upload="doUpload" @getName="getImgName" quality="1" ref="avatar" selWidth="250upx" selHeight="250upx"></avatar>
	</view>
</template>

<script>
import inputGoodsDetils from '../components/inputGoodsDetils.vue';
import linkageAssembly from '../components/linkageAssembly.vue';
import { navigateTo, serialize, setStorage, getStorage, Toast, removeStorage, Loading, hideLoading } from '../../../libs/uniApi.js';
import { categoryBrandlist, categorySelect, categoryList, attrList, templateList, productDetail, getDeliveryType } from '@/api/product.js';
import attr from '../components/attr.vue';
import platfrom from '../components/platform.vue';
import storeClassification from '../components/store_classification.vue';
import secound from './secound.vue';
import avatar from "@/components/yq-avatar/yq-avatar.vue";
import {TOKENNAME, HTTP_REQUEST_URL} from '@/config/app.js';
import store from '@/store';
export default {
	components: {
		inputGoodsDetils,
		linkageAssembly,
		attr,
		platfrom, // 选择平台分类组件
		storeClassification,
		secound,
		avatar
	},
	data() {
		return {
			step: 1,
			setFormData: {
				imageList: [],
				specification: '',
				image: '', //主图
				slider_image: '', // 轮播图
				store_name: '', // 商品名
				store_info: '', // 简介
				keyword: '', // 关键字
				brand_id: '', // 品牌id
				brand_name: '', // 品牌名称
				cate_id: '', // 平台分类
				cate_name: '', // 平台名称
				mer_cate_id: '', // 店铺分类
				mer_cate_name: '', // 店铺分类名称
				unit_name: '', // 商品单位
				spec_type: '0', // 0.单规格 1：多规格
				attr: [], // 商品规格
				specifica: '', // 商品规格名称
				setSpecificaValue: '', // 价格设置提示
				setSpecificaValue2: '',
				delivery_way: [], // 配送方式 1 到店核销 2 快递配送
				delivery_free: '1', // 是否包邮 0不包邮 1包邮
				temp_id: '', // 运费模板ID
				tempName: '' // 运费模板名称
			},
			popupContainerKey: false,
			productItem: {} || [],
			selectProductTitle: '选择平台分类',
			specificationsRadioList: [
				{
					value: '0',
					name: '单规格'
				},
				{
					value: '1',
					name: '多规格'
				}
			],
			specifications: [
				{
					id: 5,
					label: '规格选择',
					type: 'radio',
					model: 'spec_type',
					inforValue: '0',
					radioList: [
						{
							value: '0',
							name: '单规格'
						},
						{
							value: '1',
							name: '多规格'
						}
					]
				},
				{
					id: 7,
					label: '选择规格',
					type: 'select',
					model: 'attr',
					singleColumn: true,
					value: '',
					DoNotShow: true,
					holder: '去选择',
					jumpLogic: true // 是否为需要特数处理，执行跳转逻辑
				},
				{
					id: 6,
					label: '商品规格',
					type: 'select',
					value: '',
					holder: '去设置',
					jumpLogic: true, // 是否为需要特数处理，执行跳转逻辑
					DoNotShow: true
				}
			],
			deliveryType: [],
			deliveryFreeList: [
				{
					value: '1',
					name: '到店核销'
				},
				{
					value: '2',
					name: '快递配送'
				}
			],
			merId: '',
			product_id: '', // 商品Id
			isUpload: true,
			templateListPage: {
				page: 1,
				limit: 10000
			},
			// 分类数据容器
			classified: {
				cate_id: [],
				mer_cate_id: [],
				brand_id: [],
				attr: [],
				temp_id: []
			},
			platformClassificationData: [], // 平台分类数据
			merchantClassification: [], // 店铺分类
			brand: [], // 品牌分类
			specificationClassification: [], // 规格分类
			selectEdAttr: [], // 当前选择的多规格选项规格
			canChange: true,
			secoundModel: false,
			resetKey: false,
			imgName: ""
		};
	},
	onLoad(opt) {
		this.merId = opt.mer_id;
		this.product_id = opt.product_id;
		this.getDeliveryType();
		this.initData();
		if (this.product_id) {
			this.initDataEditData();
		}
	},
	onShow() {
		this.setFormData.setSpecificaValue = '';
		this.setFormData.setSpecificaValue2 = '';
		if(getStorage('singleSpecification')) {
			this.setFormData.setSpecificaValue = '点击修改价格';
		} else {
			this.setFormData.setSpecificaValue = '';
		}
		if(getStorage('attrValue')) {
			this.setFormData.setSpecificaValue2 = '点击修改价格';
		} else {
			this.setFormData.setSpecificaValue2 = '';
		}
		if(this.step == 2) {
			this.secoundModel = !this.secoundModel;
		}	
	},

	watch: {
		setFormData: {
			handler(val) {
				console.log(val);
				setTimeout(()=>{
					setStorage('addGoodsFormData', this.setFormData);
				});
			
			},
			deep: true
		},
		'setFormData.imageList'(val) {
			this.setFormData.image = val.length ? val[0] : '';
			this.setFormData.slider_image = val.length ? serialize(val).splice(1) : [];
		}
	},
	methods: {
		// 获取数据
		async initData() {
			if (getStorage('addGoodsFormData')) {
				this.setFormData = getStorage('addGoodsFormData');
				this.selectEdAttr = getStorage('modifyPriceData');
			}
			// 获取品牌
			this.brand = (await categoryBrandlist(this.merId)).data;
			// 获取商户分类
			this.merchantClassification = (await categorySelect(this.merId)).data;
			// 获取平台分类
			this.platformClassificationData = (await categoryList(this.merId)).data;
			// 数据回显
		},
		//获取送货方式信息
		getDeliveryType(){
			let that = this
			getDeliveryType(that.merId).then(
			res => {
			  that.deliveryType = res.data.delivery_way.map(String);
			  if (!that.product_id) that.setFormData.delivery_way = that.deliveryType;
			  if (that.deliveryType.length == 2) {
			    that.deliveryFreeList = [
			        { value: '1', name: '到店核销' },
			        { value: '2', name: '快递配送' }
			    ]
			  } else {
			    if (that.deliveryType.length == 1 && that.deliveryType[0] == '1') {
			        that.deliveryFreeList = [{ value: '1', name: '到店核销' }]
			    } else {
			        that.deliveryFreeList = [{ value: '2', name: '快递配送' }]
			    }
			  }
			},
			error => {
			  that.$util.Tips({
				title: error.msg
			  })
			}
		  );
		},

		// 查询详情数据
		initDataEditData() {
			Loading();
			this.setFormData = {
				imageList: [],
				specification: '',
				image: '', //主图
				slider_image: '', // 轮播图
				store_name: '', // 商品名
				store_info: '', // 简介
				keyword: '', // 关键字
				brand_id: '', // 品牌id
				brand_name: '', // 品牌名称
				cate_id: '', // 平台分类
				cate_name: '', // 平台名称
				mer_cate_id: '', // 店铺分类
				mer_cate_name: '', // 店铺分类名称
				unit_name: '', // 商品单位
				spec_type: '0', // 0.单规格 1：多规格
				attr: [], // 商品规格
				specifica: '', // 商品规格名称
				setSpecificaValue: '', // 价格设置提示
				setSpecificaValue2: '', // 价格设置提示
				delivery_way: [], // 配送方式 1 到店核销 2 快递配送
				delivery_free: '0', // 是否包邮 0不包邮 1包邮
				temp_id: '', // 运费模板ID
				tempName: '' // 运费模板名称
			};
			
			if(getStorage('editGoodsDetils')) {
				removeStorage('editGoodsDetils');
			}		
			productDetail(this.merId, this.product_id).then(res => {
				setStorage('editGoodsDetils', res.data);
				let editGoodsDetils = res.data;
					Object.keys(this.setFormData).forEach(item => {
						this.setFormData[item] = editGoodsDetils[item];
					});
					this.setFormData.product_id = this.product_id;
					this.setFormData.imageList = [...(this.setFormData.image ? [this.setFormData.image] : []), ...this.setFormData.slider_image];
					this.setFormData.cate_name = editGoodsDetils.storeCategory.cate_name; // 平台分类回显
					this.setFormData.mer_cate_name = editGoodsDetils.merCateId ? editGoodsDetils.merCateId.map(item => item.category && item.category.cate_name).join(',') : '';
					this.setFormData.brand_name = editGoodsDetils.brand ? editGoodsDetils.brand.brand_name : '';
					// 多规格
					if(this.setFormData.spec_type == 1) {
						if(editGoodsDetils.attr.length) {
							this.setFormData.specifica = '点击修改规格'
						}	
						if(editGoodsDetils.attrValue.length) {
							this.setFormData.setSpecificaValue2 = '点击修改价格'
						}					
					}
					if (editGoodsDetils.spec_type == 0) {
						setStorage('singleSpecification', editGoodsDetils.attrValue[0]);
						if(editGoodsDetils.attrValue.length) {
							this.setFormData.setSpecificaValue = '点击修改价格'
						}		
					}
					setStorage('attrValue', editGoodsDetils.attrValue);
					editGoodsDetils.temp && (this.setFormData.tempName = editGoodsDetils.temp.name);
					setStorage('canChange', true);
					hideLoading();
			});
		},
		// 选择图片
		handleChooseImage() {
			let that = this;
			that.$util.uploadImageOne('upload/image', function(res) {
				that.setFormData.imageList.push(res.data.path);
				
			});
		},
		clk() {
			let avatar = this.$refs.avatar;
			avatar.fChooseImg(1,{selWidth: '350upx', selHeight: '350upx', inner: true});
		},
		doUpload(rsp) {
			let that = this
			console.log(rsp);
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
					that.setFormData.imageList.push(imgData.data.path)
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
			this.setFormData.imageList.splice(index, 1);
		},
		// 选择平台分类
		selectPlatform() {
			this.$refs.select_platform.open();
		},
		// 关闭频台分类
		closePlatfrom() {
			this.$refs.select_platform.close();
		},
		// 获取平台类数据
		getPlatData(item, taplist) {
			this.setFormData.cate_id = item.value;
			this.setFormData.cate_name = item.label;
			this.$refs.select_platform.close();
		},
		// 选择店铺分类
		selectStoreClass() {
			this.$refs.select_store.open();
		},
		// 关闭店铺分类
		merchantClose() {
			this.$refs.select_store.close();
		},

		// 获取已选择得店铺数据
		handleGetSelectStore(item) {
			this.setFormData.mer_cate_id = item.map(val => val.value);
			console.log(item);
			this.setFormData.mer_cate_name = item.map(val => val.label).join(',');
			this.$refs.select_store.close();
		},

		// 获取品牌分类弹框
		selectBrand() {
			this.$refs.select_popup.open();
		},
		// 获取品牌分类数据
		getLinkageData(item) {
			this.setFormData.brand_id = item[0].value;
			this.setFormData.brand_name = item[0].label;
			this.$refs.select_popup.close();
		},
		// 获取多选数据
		multipleList(data, model) {
			if (model == 'mer_cate_id') {
				this.platformClassification[1].value = data.map(item => item.label).join('，');
				this.platformClassification[1].allreadySelect = data;
				this.setFormData.mer_cate_id = data.map(item => item.value);
			}
		},
		// popup弹框中返回数据结束
		// 关闭弹框
		close() {
			this.$refs.select_popup.close();
		},
		// 拼接字符串
		getLinkDataOfRecursion(arr, child = 'children', key = 'value') {
			let str = '';
			let id = '';
			arr.forEach(item => {
				str = item.label;
				id = item.value;
			});
			// str = str.slice(0, str.length - 1);
			return { str, id };
		},

		// 获取默认值，给表单对象赋值
		formInitData(value, model) {
			this.setFormData[model] = value;
		},
		// 选项的单选框change事件触发
		// model 为表单数据
		handleRadioChange(value, item) {
			this.setFormData[item.model] = value;
		},
		// 选择规格部分（新）
		// 选择规格radio
		specificationsRadioChange(e) {
			this.setFormData.spec_type = e.detail.value;
		},
		// 选择规格弹窗
		selectSpecification() {
			attrList(this.merId, { page: 1, limit: 10000 }).then(res => {
				this.specificationClassification = res.data.list;
				this.classified['attr'] = this.specificationClassification;
				this.specificationClassification.forEach(item => {
					this.$set(item, 'value', item.attr_template_id);
					this.$set(item, 'label', item.template_name);
					this.$refs.attr.open();
				});
			});
		},
		// 多规格时，选择属性
		selectAttr(item) {
			if (getStorage('attrValue')) {
				removeStorage('attrValue');
			}
			this.setFormData.specifica = item.template_name;
			this.setFormData.attr = [];
			this.setFormData.attr = this.setFormData.attr.concat(item.template_value);
			this.selectEdAttr = item; // 存储选择的数据，跳转时使用
			this.$refs.attr.close();
		},
		// 前往设置多规格界面
		setSpecifica() {
			// specification 为规格 0为单规格 1为多规格
			if (this.setFormData.spec_type == 0) {
				navigateTo(1, '/pages/product/addGoods/singleSpecification');
				return;
			}
			if (this.setFormData.spec_type == 1) {
				let queryData = serialize(this.selectEdAttr);
				setStorage('modifyPriceData', queryData);
				navigateTo(1, '/pages/product/addGoods/modifyPrice');
				return;
			}
		},
		// 选择规格部分（新）结束
		// switch切换
		switchChange(value, item) {
			if (item.model == 'delivery_free') {
				if (value) {
					this.setFormData[item.model] = '1';
				} else {
					this.setFormData[item.model] = '0';
				}
			}
		},
		// 多选切换
		checkChange(value, item) {
			this.setFormData[item.model] = value;
			if (item.model == 'delivery_way') {
				if (value.includes('2')) {
					this.transport[1].DoNotShow = false;
				} else {
					this.transport[1].DoNotShow = true;
				}
				console.log(this.transport[1]);
			}
		},

		handleClose() {
			this.$refs.select_popup.close();
		},
		// 送货方式选择
		deliveryWayChange(obj) {
			this.setFormData.delivery_way = obj.detail.value;
		},
		// 是否包邮选择
		deliveryFreeChange(val) {
			if (val.detail.value) {
				this.setFormData.delivery_free = '1';
			} else {
				this.setFormData.delivery_free = '0';
			}
		},
		// 选择运费模板
		tempIdSelect() {
			this.getTemplateList();
		},
		// 请求运费模板列表
		getTemplateList() {
			templateList(this.merId, this.templateListPage).then(res => {
				res.data.list.forEach(item => {
					this.$set(item, 'value', item.shipping_template_id);
					this.$set(item, 'label', item.name);
				});
				this.classified['temp_id'] = res.data.list;
				this.$refs.tempId.open();
			});
		},
		// 内部scroll-view滑动到最底部
		scrolltolower() {
		},
		// 获取运费模板数据
		getTempIdData(obj) {
			console.log(obj);
			this.setFormData.temp_id = obj[0].value;
			this.setFormData.tempName = obj[0].label;
			this.$refs.tempId.close();
		},
		// 设置运费模板
		setGoodsTemp() {
			navigateTo(1, '/pages/product/addGoods/freightTemplate', { mer_id: this.merId });
		},
		// 开始下一步

		handleNextStep() {
			let canJumpFlag = true;
			let requireData = {
				image: '请选择主图',
				store_name: '请输入商品名', // 商品名
				cate_id: '请选择平台分类', // 平台分类
				mer_cate_id: '请选择店铺分类', // 店铺分类
				unit_name: '请输入商品单位', // 商品单位
			};
			console.log({...this.setFormData})
			Object.keys(requireData).some(item => {
				if (!this.setFormData[item]) {
					Toast(requireData[item]);
					canJumpFlag = false;
					return;
				}
			});
			if(this.setFormData.spec_type == '0' && !this.setFormData.setSpecificaValue){
					Toast('商品价格不能为空');
					return;
			} else if(this.setFormData.spec_type == '1' && !this.setFormData.setSpecificaValue2){
					Toast('商品价格不能为空');
					return;
			}
			if(!this.setFormData.delivery_way.length){
					Toast('请选择送货方式');
					return;
			}

			if (canJumpFlag) {
				// navigateTo(1, '/pages/product/addGoods/secound', { mer_id: this.merId, type: this.type });
				// this.$refs.secound.open();
				this.step = 2;
			}
		},
		lastStep() {
			this.step = 1;
		}
	}
};
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
</style>
