<template>
	<view class="bt-container">
		<!-- <view class="iconfont icon-reset" @click.stop="resetImage"></view> -->
		<view @touchend="onTouchEnd" @touchstart="onTouchStart" class="mainContent">
			<template v-if="imageInfo">
				<image :src="showImagePath" mode="aspectFit" data-type="image" @touchmove.stop.prevent="onImageMove"
					:style="[imageStyle]" class="image"></image>
				<view class="cropper" :style="{
						width: cropperPosition.width + 'px',
						height: cropperPosition.height + 'px',
						left: cropperPosition.left - 1 + 'px',
						top: cropperPosition.top - 1 + 'px',
						transition,
					}">
					<template v-if="showGrid">
						<view class="line row row1"></view>
						<view class="line row row2"></view>
						<view class="line col col1"></view>
						<view class="line col col2"></view>
					</template>
				</view>
				<view @touchmove.stop.prevent="onHandleResize(-1, 0, $event)" class="controller vertical"
					:style="[controllerPosition.left]" />
				<view @touchmove.stop.prevent="onHandleResize(1, 0, $event)" class="controller vertical"
					:style="[controllerPosition.right]" />
				<view @touchmove.stop.prevent="onHandleResize(0, -1, $event)" class="controller horizon"
					:style="[controllerPosition.top]" />
				<view @touchmove.stop.prevent="onHandleResize(0, 1, $event)" class="controller horizon"
					:style="[controllerPosition.bottom]" />
				<template v-if="ratio==0">
					<view @touchmove.stop.prevent="onHandleResize(-1, -1, $event)" class="controller controller_dot"
						:style="[controllerPosition.leftTop]" />
					<view @touchmove.stop.prevent="onHandleResize(1, -1, $event)" class="controller controller_dot"
						:style="[controllerPosition.rightTop]" />
					<view @touchmove.stop.prevent="onHandleResize(-1, 1, $event)" class="controller controller_dot"
						:style="[controllerPosition.leftBottom]" />
					<view @touchmove.stop.prevent="onHandleResize(1, 1, $event)" class="controller controller_dot"
						:style="[controllerPosition.rightBottom]" />
				</template>
			</template>
		</view>
		<view class="slot">
			<slot />
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<canvas v-if="showCanvas" type="2d" class="bt-canvas" :style="{
			width:dSize.width+'px',
			height:dSize.height+'px'
		}"></canvas>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<canvas v-if="showCanvas" canvas-id="bt-canvas" class="bt-canvas" :style="{
			width:dSize.width+'px',
			height:dSize.height+'px'
		}"></canvas>
		<!-- #endif -->
	</view>
</template>

<script>
	/**
	 * better-cropper 图片裁切插件
	 */
	import calcImageSize from "./utils/calcImageSize.js"
	import calcImagePosition from "./utils/calcImagePosition.js"
	import calcCropper from "./utils/calcCropper.js"
	import calcRightAndBottom from "./utils/calcRightAndBottom.js"
	import calcPointDistance from "./utils/calcPointDistance.js"
	import {
		getTouchPoints,
		sleep,
		debounce,
		log
	} from "./utils/tools.js"

	var startOffsetX = 0,
		startOffsetY = 0,
		startTouchsDistance = 0,
		startChangeLeft = 0,
		startChangeTop = 0,
		startChangeWidth = 0,
		startChangeHeight = 0,
		initScale = 1,
		startTouches = [],
		timer = null;
	export default {
		name: "bt-cropper",
		props: {
			// 图片路径，支持网络路径和本地路径
			imageSrc: {
				type: String,
				default: "",
				required: true
				// validator(value) {
				// 	if (/^(http:|https:|)\/\//.test(value)) {
				// 		return true
				// 	} else {
				// 		console.warn("图片url似乎不合法")
				// 		return false
				// 	}
				// }
			},
			// 输出图片的格式，默认jpg
			fileType: {
				type: String,
				default: "jpg"
			},
			// 生成的图片的宽度
			dWidth: {
				type: Number,
				default: 0
			},
			// 裁切比例，0表示自由
			ratio: {
				type: Number,
				default: 0,
				validator(value) {
					if (typeof value === 'number') {
						if (value < 0) {
							log('裁剪框比例值必须大于零', 'error')
							return false
						}
					} else {
						log('裁剪框比例值必须是数字', 'error')
						return false
					}
					return true
				}
			},
			// 是否展示网格
			showGrid: {
				type: Boolean,
				default: false
			},
			// 图片质量，0-1 越大质量越好
			quality: {
				type: Number,
				default: 1
			},
			// 初始的图片位置
			initPosition: {
				type: Object,
				default () {
					return null
				}
			},
			// 是否压缩图片
			// 注意：这里的压缩指的是用户移动图片展示的那个图片的压缩，
			// 输出图片的质量并不会受到影响，
			// 也就是说，最终输出图片的质量会比裁切时看起来更好
			compress: {
				type: Boolean,
				default: false
			},
			// 是否开启操作结束后自动放大
			autoZoom:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				imageUrl: "",
				imageInfo: null,
				containerRect: "",
				offsetX: 0,
				offsetY: 0,
				changeWidth: 0,
				changeHeight: 0,
				windowWidth: 375,
				dpr: 2,
				forceChangeWidth: 0,
				forceChangeHeight: 0,
				animate: false,
				imgScale: 1,
				imgTranslateX: 0,
				imgTranslateY: 0,
				// 这个变量不要删掉，不然会造成性能严重下降，这是uni-app框架的Bug
				showCanvas: false,
				cropperPosition: {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				},
				// 图片在视图上的位置
				imageBoundingRect: {
					left: 0,
					top: 0,
					width: 0,
					height: 0,
				}
			};
		},
		watch: {
			imageSrc: {
				handler(imageSrc) {
					this.imageUrl = imageSrc
					this.imageInfo = null;
					if(!imageSrc){
						return
					}
					this.getImageInfo(imageSrc).then(imageInfo => {
						this.imageInfo = imageInfo;
						return this.getContainerRect()
					}).then(rect => {
						this.containerRect = rect;
						this.imageBoundingRect = this.getImageInitRect()
						this.resetImage()
						if (this.ratio == 0) {
							this.cropperPosition = this.getCropperInitPosition()
						}
						return this.imageBoundingRect;
					}).then((imageBoundingRect) => {
						if (this.initPosition) {
							const {left,top,width,height} = this.initPosition
							const ratio = this.imageBoundingRect.width / this.imageInfo.width
							if(left!==undefined){
								const imgTranslateX = this.cropperPosition.left - imageBoundingRect.left - left * ratio
								this.cropperPosition.left -= imgTranslateX
							}
							if(top!==undefined){
								const imgTranslateY = this.cropperPosition.top - imageBoundingRect.top - top * ratio
								this.cropperPosition.top -= imgTranslateY
							}
							!!width && (this.cropperPosition.width = this.initPosition.width * ratio);
							!!height && (this.cropperPosition.height = this.initPosition.height * ratio);
						}
						this.$emit('load')
					}).catch(err=>{
						console.error('失败信息',err)
						this.$emit('loadFail',err)
					})
				},
				immediate: true
			},
			ratio: {
				handler(ratio) {
					this.resetCropper()
					this.applyAnim()
				},
				immediate: false
			},
		},
		computed: {
			showImagePath() {
				if (this.imageInfo && this.imageInfo.compressPath) {
					return this.imageInfo.compressPath
				} else {
					return this.imageInfo?.path || ""
				}
			},
			// 生成图片的大小
			dSize() {
				if (this.dWidth > 0) {
					return {
						width: this.dWidth,
						height: this.dWidth * (this.cropperPosition.height / this.cropperPosition.width)
					}
				} else {
					// 原像素比例裁剪
					let scale = 1
					if (this.imageInfo) {
						scale = this.imgScale * this.imageBoundingRect.width / this.imageInfo.width
					}
					return {
						width: this.cropperPosition.width / scale,
						height: this.cropperPosition.height / scale
					}
				}
			},
			imageStyle() {
				let style = {
					left: this.imageBoundingRect.left + 'px',
					top: this.imageBoundingRect.top + 'px',
					width: this.imageBoundingRect.width + 'px',
					height: this.imageBoundingRect.height + 'px',
					transition: this.transition,
					transform: `matrix(${this.imgScale}, 0, 0, ${this.imgScale}, ${this.imgTranslateX}, ${this.imgTranslateY}) translateZ(0px)`,
				}
				return style
			},
			transition() {
				return this.animate ? '0.2s' : 'none'
			},
			// 四个控制点的位置
			controllerPosition() {
				const up40 = uni.upx2px(40),
					up30 = uni.upx2px(30),
					up20 = uni.upx2px(20);
				const transition = this.transition
				return {
					left: {
						left: this.cropperPosition.left - up30 + 'px',
						top: this.cropperPosition.top + (this.cropperPosition.height) / 2 - up40 + 'px',
						transition
					},
					right: {
						left: this.cropperPosition.left + this.cropperPosition.width - up20 + 'px',
						top: this.cropperPosition.top + (this.cropperPosition.height) / 2 - up40 + 'px',
						transition
					},
					top: {
						left: this.cropperPosition.left + this.cropperPosition.width / 2 - up40 + 'px',
						top: this.cropperPosition.top - up30 + 'px',
						transition
					},
					bottom: {
						left: this.cropperPosition.left + this.cropperPosition.width / 2 - up40 + 'px',
						top: this.cropperPosition.top + this.cropperPosition.height - up20 + 'px',
						transition
					},
					leftTop: {
						left: this.cropperPosition.left - up40 + 'px',
						top: this.cropperPosition.top - up40 + 'px',
						transition
					},
					rightTop: {
						left: this.cropperPosition.left + this.cropperPosition.width - up40 + 'px',
						top: this.cropperPosition.top - up40 + 'px',
						transition
					},
					leftBottom: {
						left: this.cropperPosition.left - up40 + 'px',
						top: this.cropperPosition.top + this.cropperPosition.height - up40 + 'px',
						transition
					},
					rightBottom: {
						left: this.cropperPosition.left + this.cropperPosition.width - up40 + 'px',
						top: this.cropperPosition.top + this.cropperPosition.height - up40 + 'px',
						transition
					}
				}
			},
		},
		methods: {
			// 开启动画
			applyAnim() {
				this.animate = true
				clearTimeout(timer)
				timer = setTimeout(() => {
					this.animate = false
				}, 200)
			},
			async getContainerRect() {
				const systemInfo = uni.getSystemInfoSync()
				this.windowWidth = systemInfo.windowWidth
				this.dpr = systemInfo.pixelRatio
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this).select(".mainContent").boundingClientRect((rect) => {
						resolve(rect)
					}).exec()
				})
			},
			async getImageInfo(imageSrc) {
				uni.showLoading({
					title: "获取图片信息"
				})
				return uni.getImageInfo({
					src: imageSrc
				}).then((res) => {
					let imageInfo = null;
					// #ifdef VUE2
					const err = res[0];
					imageInfo = res[1];
					if (err) {
						throw new Error(err)
					}
					// #endif
					// #ifdef VUE3
					imageInfo = res
					// #endif
					uni.hideLoading()
					return imageInfo;
				}).then(imageInfo => {
					const maxSize = 2000 * 2000
					const imageSize = imageInfo.width * imageInfo.height
					// uni.canIUse('compressImage.success.tempFilePath')
					// #ifndef H5
					// 是否压缩图片
					if (maxSize < imageSize && this.compress) {
						const quality = maxSize / imageSize * 100
						return uni.compressImage({
							src: imageInfo.path,
							quality
						}).then(([err, {
							tempFilePath
						}]) => {
							if (!err) {
								imageInfo.compressPath = tempFilePath
							}
							return imageInfo
						})
					}
					// #endif
					return imageInfo;
				}).then(imageInfo => {
					return imageInfo;
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: "图片加载失败",
						icon: "none"
					})
					throw Error(err)
				})
			},
			getImageInitRect() {
				return calcImageSize(this.imageInfo, this.containerRect)
			},
			resetImage() {
				this.imgTranslateX = 0
				this.imgTranslateY = 0
				this.imgScale = 1
				this.resetCropper()
			},
			// 获取裁剪框初始位置
			getCropperInitPosition() {
				return calcCropper(this.imageBoundingRect, {
					width: this.ratio || 1,
					height: 1
				})
			},
			/**
			 * @deprecated 本方法已弃用，请用resetCropper代替
			 */
			resetRatio(){
				log('本方法(resetRatio)已弃用,未来将删除,请用resetCropper代替','warn')
				return this.resetCropper()
			},
			// 重置裁剪框
			resetCropper() {
				if (this.imageInfo && this.ratio !== 0) {
					this.cropperPosition = this.getCropperInitPosition()
					this.checkImagePosition()
				}
			},
			onTouchStart(ev) {
				this.animate = false
				if (timer) {
					clearTimeout(timer)
				}
				startTouches = Array.from(ev.touches)
				if (ev.target.dataset.type === 'image') {
					startOffsetX = this.imgTranslateX;
					startOffsetY = this.imgTranslateY;
					if (ev.touches.length == 2) {
						initScale = this.imgScale
						startTouchsDistance = calcPointDistance(...getTouchPoints(startTouches))
					}
				} else {
					startChangeLeft = this.cropperPosition.left
					startChangeTop = this.cropperPosition.top
					startChangeWidth = this.cropperPosition.width;
					startChangeHeight = this.cropperPosition.height;
				}
			},
			onTouchEnd() {
				startTouches = []
				this.checkImagePosition()
				if(this.autoZoom){
					clearTimeout(timer)
					timer = setTimeout(this.zoom,1000)
				}
				this.reportChange()
			},
			getImagePosition() {
				return calcImagePosition(this.imageBoundingRect, {
					imgTranslateX: this.imgTranslateX,
					imgTranslateY: this.imgTranslateY,
					imgScale: this.imgScale
				})
			},
			getCropperPosition() {
				return calcRightAndBottom(this.cropperPosition)
			},
			// 检查图片位置
			checkImagePosition() {
				const imagePosition = this.getImagePosition()
				const cropperPosition = this.getCropperPosition()
				// 如果裁剪框大于图像大小，就放大到裁剪框大小
				const widthScale = cropperPosition.width / imagePosition.width
				const heightScale = cropperPosition.height / imagePosition.height
				const scale = Math.max(widthScale, heightScale)
				if (scale > 1) {
					this.imageZoom({
						left: cropperPosition.left + cropperPosition.width / 2,
						top: cropperPosition.top + cropperPosition.height / 2
					}, scale)
					this.applyAnim()
				}
				// 判断是否超出边界
				if (imagePosition.left > cropperPosition.left) {
					this.imgTranslateX = this.imgTranslateX - (imagePosition.left - cropperPosition.left)
				} else if (imagePosition.right < cropperPosition.right) {
					this.imgTranslateX = this.imgTranslateX + (cropperPosition.right - imagePosition.right)
				}
				if (imagePosition.top > cropperPosition.top) {
					this.imgTranslateY = this.imgTranslateY - (imagePosition.top - cropperPosition.top)
				} else if (imagePosition.bottom < cropperPosition.bottom) {
					this.imgTranslateY = this.imgTranslateY + (cropperPosition.bottom - imagePosition.bottom)
				}
			},
			zoom(){
				// 容器比例
				const containerRatio = this.containerRect.width / this.containerRect.height
				// 移动后的裁剪框比例
				const cropperRatio = this.cropperPosition.width / this.cropperPosition.height
				// 放大比例
				let scale = 1
				if (cropperRatio > containerRatio) {
					scale = this.containerRect.width / this.cropperPosition.width
				} else {
					scale = this.containerRect.height / this.cropperPosition.height
				}
				// 放大裁剪框
				this.cropperPosition.width *= scale
				this.cropperPosition.height *= scale
				// // 移动图像
				this.imageZoom({
					left: this.cropperPosition.left,
					top: this.cropperPosition.top
				}, scale)
				// 将裁剪框上下居中
				const cropperTop = (this.containerRect.height - this.cropperPosition.height) / 2
				// 需要上下移动的距离
				const moveTop = cropperTop - this.cropperPosition.top
				// 将裁剪框左右居中
				const cropperLeft = (this.containerRect.width - this.cropperPosition.width) / 2
				// 需要左右移动的距离
				const moveLeft = (cropperLeft - this.cropperPosition.left)
				this.cropperPosition.left = cropperLeft
				this.cropperPosition.top = cropperTop

				// 移动图像使之与裁剪框对齐
				this.imgTranslateX += moveLeft
				this.imgTranslateY += moveTop
				this.checkImagePosition()
				this.applyAnim()
			},
			// 发送change事件
			reportChange() {
				const imagePosition = this.getImagePosition()
				const cropperPosition = this.getCropperPosition()
				const scale = this.imageBoundingRect.width/this.imageInfo.width * this.imgScale
				this.$emit('change', {
					left: (cropperPosition.left - imagePosition.left) / scale,
					top: (cropperPosition.top - imagePosition.top) / scale,
					width: cropperPosition.width / scale,
					height: cropperPosition.height / scale
				})
			},
			imageZoom(center = {
				left: 0,
				top: 0
			}, scale = 1) {
				const imagePosition = this.getImagePosition()
				this.imgScale = this.imgScale * scale
				const offsetLeftPercent = (center.left - imagePosition.left) / imagePosition.width
				this.imgTranslateX = this.imgTranslateX + imagePosition.width * (scale - 1) / 2 * (1 - offsetLeftPercent *
					2)
				const offsetTopPercent = (center.top - imagePosition.top) / imagePosition.height
				this.imgTranslateY = this.imgTranslateY + imagePosition.height * (scale - 1) / 2 * (1 - offsetTopPercent *
					2)
			},
			onImageMove(ev) {
				if (ev.touches.length == 2 && startTouches.length == 2) {
					const points = getTouchPoints(ev.touches)
					const imgScale = initScale * calcPointDistance(...points) / startTouchsDistance
					this.imageZoom({
						left: this.cropperPosition.left + this.cropperPosition.width / 2,
						top: this.cropperPosition.top + this.cropperPosition.height / 2
					}, imgScale / this.imgScale)
				} else if (ev.touches.length == 1 && startTouches.length == 1) {
					const [startClientX, startClientY] = getTouchPoints(startTouches)[0]
					const [clientX, clientY] = getTouchPoints(ev.touches)[0]
					this.imgTranslateX = startOffsetX + clientX - startClientX
					this.imgTranslateY = startOffsetY + clientY - startClientY
				}
			},
			// 调整裁剪框大小
			onHandleResize(pX, pY, ev) {
				const [startClientX, startClientY] = getTouchPoints(startTouches)[0]
				const [clientX, clientY] = getTouchPoints(ev.touches)[0]
				const cropperBoundingRect = this.getCropperPosition()
				const imageBoundingRect = this.getImagePosition()
				const changeX = clientX - startClientX
				const changeY = clientY - startClientY
				const minSize = {
					width: uni.upx2px(100),
					height: uni.upx2px(100)
				}
				const imageRemainHeight = imageBoundingRect.bottom - cropperBoundingRect.top
				const cropperRemainHeight = this.containerRect.bottom - cropperBoundingRect.top
				const maxHeight = Math.min(imageRemainHeight, cropperRemainHeight)
				const imageRemainWidth = imageBoundingRect.right - cropperBoundingRect.left
				const cropperRemainWidth = this.containerRect.right - cropperBoundingRect.left
				const maxWidth = Math.min(imageRemainWidth, cropperRemainWidth)
				let width = 0
				switch (pX) {
					case 1:
						width = startChangeWidth + changeX
						if (width < maxWidth) {
							if (width > minSize.width) {
								this.cropperPosition.width = width
							}
						}
						break;
					case -1:
						const left = startChangeLeft + changeX
						const minLeft = Math.min(imageBoundingRect.left, cropperBoundingRect.left)
						width = startChangeWidth - changeX
						if (left > minLeft) {
							if (width > minSize.width) {
								this.cropperPosition.left = left
								this.cropperPosition.width = width
							}
						}
						break;
					case 0:
						if (this.ratio != 0)
							this.cropperPosition.width = this.cropperPosition.height * this.ratio
						break
				}
				switch (pY) {
					case 1:
						const height = startChangeHeight + changeY
						if (height < maxHeight && height > minSize.height) {
							this.cropperPosition.height = height
						}
						break;
					case -1:
						const top = startChangeTop + changeY
						const minTop = Math.min(imageBoundingRect.top, cropperBoundingRect.top)
						if (top > minTop) {
							const height = startChangeHeight - changeY
							if (height > minSize.height) {
								this.cropperPosition.top = top
								this.cropperPosition.height = height
							}
						}
						break;
					case 0:
						if (this.ratio != 0)
							this.cropperPosition.height = this.cropperPosition.width / this.ratio;
						break;
				}
			},
			// 开始裁剪
			async crop(images = null) {
				// 批量裁剪，暂时还没实现
				// if (Array.isArray(images) && images.length) {
				// 	for (item in images) {
				// 	}
				// 	return;
				// }
				if (!this.imageInfo) {
					uni.showToast({
						title: "图片尚未载入完成"
					})
					return [new Error("图片尚未载入完成"), null]
				}
				this.showCanvas = true
				this.$emit('cropStart')
				return new Promise(resolve => {
					this.$nextTick(() => {
						this.onCrop().then(res => {
							resolve(res)
						})
					})
				})
			},
			// 开始裁切
			async onCrop() {
				let canvas, image, ctx, err, res;
				// 新版canvas
				// #ifdef MP-WEIXIN
				canvas = await new Promise((resolve) => {
					uni
						.createSelectorQuery().in(this)
						.select(".bt-canvas")
						.node((res) => {
							resolve(res.node);
						})
						.exec();
				});
				log("在小程序模拟器上可能会裁剪失败，真机无此问题，放心使用", "warn")
				image = canvas.createImage();
				image.src = this.imageInfo.path;
				await new Promise((resolve) => (image.onload = resolve));
				canvas.width = this.dSize.width;
				canvas.height = this.dSize.height;
				ctx = canvas.getContext("2d");
				// #endif
				// #ifndef MP-WEIXIN
				image = this.imageInfo.path
				ctx = uni.createCanvasContext("bt-canvas", this)
				// #endif
				const imagePosition = this.getImagePosition()
				const cropperPosition = this.getCropperPosition()
				const scale = imagePosition.width / this.imageInfo.width
				const offsetLeft = (cropperPosition.left - imagePosition.left) / scale
				const offsetTop = (cropperPosition.top - imagePosition.top) / scale
				const cropperWidth = cropperPosition.width / scale
				const cropperHeight = cropperPosition.height / scale
				// console.log('offsetLeft', offsetLeft, 'offsetTop', offsetTop, this.imageInfo)
				ctx.drawImage(
					image,
					offsetLeft,
					offsetTop,
					cropperWidth,
					cropperHeight,
					0,
					0,
					this.dSize.width,
					this.dSize.height
				);
				// #ifndef MP-WEIXIN
				await new Promise((resolve) => ctx.draw(true, resolve));
				// #endif
				// 等待一段时间，不然ios会裁剪失败
				await sleep(200);
				// 在vue3里面，只能写成这种回调形式，否则报错
				[err, res] = await new Promise(resolve => {
					uni.canvasToTempFilePath({
						// #ifdef MP-WEIXIN
						canvas,
						// #endif
						// #ifndef MP-WEIXIN
						canvasId: "bt-canvas",
						// #endif
						fileType: this.fileType,
						destWidth: this.dSize.width,
						destHeight: this.dSize.height,
						quality: this.quality,
						success(res) {
							console.log("裁剪成功")
							resolve([null, res])
						},
						fail(err) {
							console.log("裁剪失败", err)
							resolve([err, null])
						},
						complete: () => {
							this.showCanvas = false
						}
					});
				})
				this.$emit('cropEnd', [err, res])
				return [err, res]
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "./iconfont.css";
	.bt-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		box-sizing: border-box;
		background-color: #0e1319;
		padding-top: 30rpx;
		position: relative;
		overflow: hidden;
		.iconfont {
			position: absolute;
			z-index: 999;
			top: 40rpx;
			font-size: 30rpx;
			padding: 10rpx;
			background-color: rgba(255, 255, 255, 0.2);
			border-radius: 50%;
			color: #FFFFFF;
			&.active {
				color: #007AFF;
			}
		}
		.icon-move {
			right: 100rpx;
		}
		.icon-reset {
			right: 40rpx;
		}
		.bt-canvas {
			position: absolute;
			left: 100%;
			top: 0;
			width: 300px;
			height: 300px;
		}
		.mainContent {
			flex: 1;
			margin: 60rpx 60rpx 150rpx;
			position: relative;
			.image {
				position: absolute;
				will-change: transform;
				transform-origin: center center;
			}
			.controller {
				position: absolute;
				z-index: 99;
				padding: 20rpx;
				&::after {
					display: block;
					content: '';
					box-shadow: 0 0 10rpx #333;
					background-color: #E4E7ED;
				}
				&.controller_dot {
					&::after {
						width: 40rpx;
						height: 40rpx;
						border-radius: 99px;
					}
				}
				&.vertical {
					&::after {
						width: 10rpx;
						height: 40rpx;
					}
				}
				&.horizon {
					&::after {
						width: 40rpx;
						height: 10rpx;
					}
				}
			}
			.cropper {
				position: absolute;
				border: 1px solid #eee;
				box-sizing: content-box;
				transform-origin: center center;
				outline: 999px solid rgba(0, 0, 0, 0.5);
				will-change: transform;
				display: contain;
				pointer-events: none;
				.line {
					position: absolute;
					// background-color: #eee;
				}
				.row {
					width: 100%;
					height: 0px;
					left: 0;
					border-top: 1px dashed #007AFF;
				}
				.col {
					height: 100%;
					width: 0px;
					border-left: 1px dashed #007AFF;
				}
				.row1 {
					top: 33%;
				}
				.row2 {
					top: 66%;
				}
				.col1 {
					left: 33%;
				}
				.col2 {
					left: 66%;
				}
			}
		}
		.slot {
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			height: 90rpx;
			height: calc(90rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
			height: calc(90rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		}
	}
</style>
