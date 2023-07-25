<template>
	<view class="container">
		<select-form :platformClassification="formList" :form="singleSpecification" @input="input"></select-form>
		<view class="more_than" @click="selectMoreThan" v-if="moreThanFlag">
			<view>更多</view>
		</view>	
		<view class="handle">
			<view class="button" @click="saveSingleSpecification">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import selectForm from '../components/selectForm.vue';
	import { navigateTo, navigateBack, serialize, setStorage, getStorage} from '../../../libs/uniApi.js';
	// 单规格商品 attrValue
	export default {
		components:{
			selectForm
		},
		data() {
			return {
				singleSpecification: {
					price: '', // 售价
					cost: '', // 成本价
					ot_price: '', // 原价
					stock: '', // 库存
					bar_code: '', // 商品编号
					weight: '', // 重量
					volume: '', // 体积
					image: '',
					extension_one: '',
					extension_two: ''
				},
				moreThanFlag: true,
				formList: [
					{
						id: 1,
						label: '售价',
						type: 'input',
						model: 'price',
						holder: '请填写售价'
					},
					{
						id: 2,
						label: '成本价',
						type: 'input',
						holder: '请填写成本价',
						model: 'cost'
					},
					{
						id: 3,
						label: '原价',
						type: 'input',
						holder: '请填写原价',
						model: 'ot_price'
					},
					{
						id: 4,
						label: '库存',
						type: 'input',
						holder: '请填写库存',
						model: 'stock'
					}
				],
				moreThanList: [
					{
						id: 5,
						label: '商品编号',
						type: 'input',
						holder: '请填写商品编号',
						model: 'bar_code'
					},
					{
						id: 6,
						label: '重量',
						type: 'input',
						holder: '请输入重量',
						model: 'weight'
					},
					{
						id: 7,
						label: '体积',
						type: 'input',
						holder: '请输入体积',
						model: 'volume'
					},
					{
						id: 8,
						label: '佣金（一级）',
						type: 'input',
						holder: '请输入一级佣金',
						model: 'extension_one'
					},
					{
						id: 8,
						label: '佣金（二级）',
						type: 'input',
						holder: '请输入二级佣金',
						model: 'extension_two'
					}
				],
				
			}
		},
		watch: {
			singleSpecification: {
				handler(val) {
					this.singleSpecification = val
				},
				deep: true
			}
		},
		onShow() {
			if(getStorage('addGoodsFormData').image) {
				this.singleSpecification.image = getStorage('addGoodsFormData').image;
			}
			if(getStorage('singleSpecification')) {
				Object.keys(this.singleSpecification).forEach(item => {
					if(getStorage('singleSpecification')[item]) {
						this.singleSpecification[item] = getStorage('singleSpecification')[item]
					}
				})
			}
		},
		methods: {
			selectMoreThan() {
				this.formList = this.formList.concat(this.moreThanList);
				this.moreThanFlag = false;
			},
			spliceMoreThan() {
				this.moreThanFlag = true;
				this.formList.splice(3, 4);
			},
			input(val) {
				this.singleSpecification = val
			},
			// 保存
			saveSingleSpecification() {
				setStorage('singleSpecification', this.singleSpecification);
				navigateBack(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 126rpx;
	}
	.more_than {
		background: #FFFFFF;
		border-radius: 10px;
		margin: auto;
		margin-top: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 710rpx;
		height: 84rpx;
		color: #333333;
		font-size: 30rpx;
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
		.button {
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
</style>
