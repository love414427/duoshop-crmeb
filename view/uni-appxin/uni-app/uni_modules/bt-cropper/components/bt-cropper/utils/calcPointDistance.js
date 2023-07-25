/**
 * 计算两点之间距离
 * @param {*} point1 
 * @param {*} point2 
 */
export default function(point1 = [0, 0], point2 = [0, 0]) {
	const X1 = point1[0],
		X2 = point2[0],
		Y1 = point1[1],
		Y2 = point2[1];
	return Math.sqrt(Math.pow(X1 - X2, 2) + Math.pow(Y1 - Y2, 2))
}
