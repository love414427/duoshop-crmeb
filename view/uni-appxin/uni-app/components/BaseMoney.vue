<template>
	<view :class="{ line: line, weight: weight }"
		:style="{color: '#' + incolor,fontWeight: fontWeight, display:(discount || inline) ? 'inline-block' : 'block', fontFamily: line?'Futura-Light':'Futura' }"
		class="base-money">
		<text v-if="!discount" class="symbol" :style="{'font-size': symbolSize +'rpx'}">￥</text><text class="integer"
			:style="{'font-size': integerSize +'rpx'}">{{ integer }}</text>
		<text v-if="digits && decimal != '00' && decimal != '0'" class="decimal"
			:style="{'font-size': decimalSize +'rpx'}">.{{ decimal }}</text>
	</view>
</template>

<script>
	export default {
		name: 'BaseMoney',
		props: {
			// 小数位数，为0则不显示
			digits: {
				type: Number,
				default: 2
			},
			fontWeight: {
				type: Number | String,
				default: 'inherit'
			},
			money: {
				type: String | Number,
				default: ""
			},
			// 删除线
			line: {
				type: Boolean,
				default: false
			},
			// 粗体
			weight: {
				type: Boolean,
				default: false
			},
			incolor: {
				type: String,
				default: '424242'
			},
			symbolSize: {
				type: String,
				default: '20'
			},
			integerSize: {
				type: String,
				default: '26'
			},
			decimalSize: {
				type: String,
				default: '24'
			},
			discount: {
				type: Boolean,
				default: false
			},
			inline: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				integer: 0,
				decimal: 0
			};
		},
		watch: {
			money: {
				handler(newValue, oldValue) {
					let value = Number(newValue).toFixed(this.digits);
					value = value.split('.');
					this.integer = value[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					if (value[1]) {
						this.decimal = (value[1].length == 2 && value[1].charAt(1) != 0) ? value[1] : (value[1].charAt(
							0) || 0);
					}

				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base-money {
		font-family: Futura;
		&.line {
			.symbol,.decimal,.integer{
				text-decoration: line-through;
			}
		}

		&.weight {
			font-weight: 500;
		}
	}
	
</style>
