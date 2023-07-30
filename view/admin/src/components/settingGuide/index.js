export default {
  components: {
    app: () => import('./app'),
    routine: () => import('./routine'),
    wechat: () => import('./wechat'),
  }
}