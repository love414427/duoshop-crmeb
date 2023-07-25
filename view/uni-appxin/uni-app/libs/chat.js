// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import $store from "@/store";
import {
	HTTP_REQUEST_URL,
	VUE_APP_WS_URL
} from "@/config/app.js";
const Socket = function() {
	let wsUrl = `${VUE_APP_WS_URL}&token=${$store.state.app.token}`
	this.ws = uni.connectSocket({
		// #ifdef H5
		url:wss(wsUrl),
		// #endif
		// #ifdef MP || APP-PLUS
		url:wsUrl,
		// #endif
		header: {
			'content-type': 'application/json'
		},
		method: 'GET',
		success: (res) => {
			console.log(res, 'success');
		}
	});
	this.ws.onOpen(this.onSocketOpen.bind(this))
	this.ws.onError(this.onError.bind(this));
	this.ws.onMessage(this.onMessage.bind(this))
	this.ws.onClose(this.onClose.bind(this));
	// this.ws.close(this.close.bind(this));
};

// #ifdef H5
function wss(wsSocketUrl) {
	let ishttps = document.location.protocol == 'https:';
	if (ishttps) {
		return wsSocketUrl.replace('ws:', 'wss:');
	} else {
		return wsSocketUrl.replace('wss:', 'ws:');
	}
}
// #endif



Socket.prototype = {
	// close() {
	//   clearInterval(this.timer);
	//   this.ws.close();
	// },
	onSocketOpen: function(my) {
		this.init();
		uni.$emit("socket_open");
	},
	init: function() {
		var that = this;
		this.timer = setInterval(function() {
			that.send({
				type: "ping"
			});
		}, 10000);
	},
	send: function(data) {
		let datas = JSON.stringify(data)
		return uni.sendSocketMessage({
			data: datas
		});
	},
	onMessage: function(res) {
		console.log(JSON.parse(res.data), 'onMessage')
		const {
			type,
			data = {}
		} = JSON.parse(res.data);
		uni.$emit(type, data)
	},

	onClose: function() {
		uni.closeSocket();
		clearInterval(this.timer);
		uni.$emit("socket_close");
	},
	onError: function(e) {
		console.log(e);
		uni.$emit("socket_error", e);
	},
	close: function() {
		uni.closeSocket();
	}
};

Socket.prototype.constructor = Socket;

export default Socket;
