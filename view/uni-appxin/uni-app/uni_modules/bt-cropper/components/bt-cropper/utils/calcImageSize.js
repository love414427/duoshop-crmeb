import ratio from "./ratio.js"
export default function(imageInfo, container = {
	width: 9,
	height: 16
}) {
	const containerRatio = ratio(container.width, container.height)
	const imageRatio = ratio(imageInfo.width, imageInfo.height)
	if (containerRatio > imageRatio) {
		const width = container.height * imageRatio
		const height = container.height
		return {
			width,
			height,
			left: (container.width - width) / 2,
			top: 0,
		}
	} else {
		const width = container.width
		const height = container.width / imageRatio
		return {
			width,
			height,
			left: 0,
			top: (container.height - height) / 2
		}
	}
}
