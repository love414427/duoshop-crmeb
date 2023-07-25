export default function(position) {
	return {
		...position,
		right: position.left + position.width,
		bottom: position.top + position.height
	}
}
