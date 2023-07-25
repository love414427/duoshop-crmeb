import calcRightAndBottom from "./calcRightAndBottom"
const defaultPosition = {
	left: 0,
	top: 0,
	width: 0,
	height: 0
}
const defaultTransfrom = {
	imgTranslateX: 0,
	imgTranslateY: 0,
	imgScale: 1
}
// 先默认变换原点在中间
export default function(imagePosition = defaultPosition, transfrom = defaultTransfrom) {
	const width = imagePosition.width * transfrom.imgScale
	const height = imagePosition.height * transfrom.imgScale
	return calcRightAndBottom({
		left: (imagePosition.left + transfrom.imgTranslateX) - (width - imagePosition.width) / 2,
		top: (imagePosition.top + transfrom.imgTranslateY) - (height - imagePosition.height) / 2,
		width,
		height
	})
}
