import ratio from "./ratio"
import calcRightAndBottom from "./calcRightAndBottom"
const defaultImagePosition = {
	left: 0,
	top: 0,
	width: 9,
	height: 16
}
const defaultTarget = {
	width: 2,
	height: 1
}
/**
 * 计算初始的裁剪框位置
 * @param {*} imagePosition 
 * @param {*} target 
 */
export default function(imagePosition = defaultImagePosition, target = defaultTarget) {
	const cropperPosition = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width:0,
		height:0
	}
	const targetRatio = ratio(target.width, target.height)
	const imageRatio = ratio(imagePosition.width, imagePosition.height)
	if(targetRatio>imageRatio){
		cropperPosition.width = imagePosition.width
		cropperPosition.height = cropperPosition.width/targetRatio
		cropperPosition.left = imagePosition.left
		cropperPosition.top = (imagePosition.height-cropperPosition.height)/2+imagePosition.top
	}else{
		cropperPosition.height = imagePosition.height
		cropperPosition.width = cropperPosition.height * targetRatio
		cropperPosition.left = (imagePosition.width - cropperPosition.width)/2 + imagePosition.left
		cropperPosition.top = imagePosition.top
	}
	return calcRightAndBottom(cropperPosition)
}
