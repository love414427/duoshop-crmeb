export function getTouchPoints(touchs) {
	return Array.from(touchs).map(ev => {
		return [ev.clientX, ev.clientY]
	})
}
// 函数防抖
export function debounce(fn, wait = 200) {
	var timer = null;
	return function (){
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(fn.bind(this), wait);
	}
}

/**
 * @description 睡眠
 * @param {number} time 等待时间毫秒数
 */
export function sleep(time = 200) {
	return new Promise(resolve => {
		setTimeout(resolve, time)
	})
}

export function log(message,type='log'){
	if(process.env.NODE_ENV === 'development'){
		console[type](message)
	}
}
