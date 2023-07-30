// import Setting from "@/setting";

const Socket = function(wsSocketUrl) {
  this.ws = new WebSocket(wss(wsSocketUrl))
  this.ws.onopen = this.onOpen.bind(this)
  this.ws.onerror = this.onError.bind(this)
  this.ws.onmessage = this.onMessage.bind(this)
  this.ws.onclose = this.onClose.bind(this)
}

function wss(wsSocketUrl) {
  wsSocketUrl = wsSocketUrl.replace('https:', 'wss:')
  wsSocketUrl = wsSocketUrl.replace('http:', 'ws:')
  const ishttps = document.location.protocol === 'https:'
  if (ishttps) {
    return wsSocketUrl.replace('ws:', 'wss:')
  } else {
    return wsSocketUrl.replace('wss:', 'ws:')
  }
}

Socket.prototype = {
  vm(vm) {
    this.vm = vm
  },
  close() {
    clearInterval(this.timer)
    this.ws.close()
  },
  onOpen: function() {
    this.init()
    this.vm.$emit('socket_open')
  },
  init: function() {
    var that = this
    this.loaded = true
    this.timer = setInterval(function() {
      that.send({ type: 'ping' })
    }, 10000)
  },
  onLoad(fn) {
    if (this.loaded) {
      fn()
    } else {
      this.vm.$once('socket_open', fn)
    }
  },
  send: function(data) {
    return this.ws.send(JSON.stringify(data))
  },
  onMessage: function(res) {
    const { type, data = {}} = JSON.parse(res.data)
    this.vm.$emit(type, data)
  },
  onClose: function() {
    clearInterval(this.timer)
    this.vm.$emit('socket_close')
  },
  onError: function(e) {
    this.vm.$emit('socket-error', e)
  }
}

Socket.prototype.constructor = Socket

export default Socket
