<template>
  <div class="kefu-layouts" @click="roomClick">
    <div class="content-wrapper" @click.stop="press=false">
      <baseHeader
        :is-online="isOnline"
        @online="changeOnline"
      />
      <div class="container">
        <chatList ref="chatList" @active="activeUser" />
        <div class="chat-content">
          <div class="chat-body">
            <div
              id="chat_scroll"
              ref="scrollBox"
              @scroll="scrollHandler"
            >
              <div v-show="loading" style="text-align: center;">
                <i class="el-icon-loading" />
              </div>
              <div
                v-for="items in chatList"
                :id="`chat_${items.time}`"
                :key="items.time"
              >
                <div class="time">{{ items.time }}</div>
                <div v-for="item in items.children"
                  :id="`chat_${item.service_log_id}`"
                  :key="item.service_log_id"
                  class="chat-item"
                  :class="[{ 'right-box': item.send_type == 1 },{ gary: item.msn_type == 5 }]">
                  <div class="flex-box">
                  <div v-if="item.msn_type != 100" class="avatar">
                    <img v-if="item.send_type == 0 && item.user" v-lazy="item.user.avatar" alt="">
                    <img v-else v-lazy="item.service.avatar" alt="">
                  </div>
                  <div class="msg-wrapper" @contextmenu.prevent="showReverst(item)">
                    <template v-if="item.msn_type === 1">
                      <div class="txt-wrapper pad16" v-html="item.msn" />
                    </template>
                    <template v-if="item.msn_type === 2">
                      <div class="txt-wrapper pad16">
                        <i :class="`em ${item.msn}`" />
                      </div>
                    </template>
                    <template v-if="item.msn_type == 3">
                      <div class="img-wraper">
                        <img v-lazy="item.msn" alt="">
                      </div>
                    </template>
                    <template v-if="item.msn_type == 4">
                      <div class="order-wrapper pad16">
                        <div class="img-box">
                          <img :src="item.product.image" alt="">
                        </div>
                        <div class="order-info">
                          <div class="name line1">
                            {{ item.product.store_name }}
                          </div>
                          <div class="sku">
                            库存：{{ item.product.stock }} 销量：{{
                              parseInt(item.product.sales) +
                                parseInt(item.product.ficti ? item.product.ficti : 0)
                            }}
                          </div>
                          <div class="price-box">
                            <div class="num">
                              ¥ {{ item.product.price }}
                            </div>
                            <a herf="javascript:;" class="more" @click.stop="lookGoods(item.product.product_id)">查看商品 ></a>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="item.msn_type == 7">
                      <div v-if="item.presell" class="order-wrapper pad16">
                        <div class="img-box">
                          <img :src="item.presell.product.image" alt="">
                        </div>
                        <div class="order-info">
                          <div class="name line1">
                            {{ item.presell.product.store_name }}
                          </div>
                          <div class="sku">
                            库存：{{ item.presell.product.stock }} 销量：{{
                              parseInt(item.presell.product.sales) +
                                parseInt(item.presell.product.ficti ? item.presell.product.ficti : 0)
                            }}
                          </div>
                          <div class="price-box">
                            <div class="num">
                              ¥ {{ item.presell.product.price }}
                            </div>
                            <a herf="javascript:;" class="more" @click.stop="lookGoods(item.presell.product.product_id)">查看商品 ></a>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="item.msn_type === 5 && item.orderInfo && item.orderInfo.order_id">
                      <div v-for="(val, inx) in item.orderInfo.orderProduct" :key="val.id" class="order-wrapper pad16">
                        <div v-if="inx == 0" class="img-box">
                          <img :src="val.cart_info.product.image" alt="">
                        </div>
                        <div v-if="inx == 0" class="order-info">
                          <div class="name line1">
                            订单号：{{ item.orderInfo.order_sn }}
                          </div>
                          <div class="sku">
                            商品数量：{{ item.orderInfo.total_num }}
                          </div>
                          <div class="price-box">
                            <div class="num">
                              ¥ {{ item.orderInfo.pay_price }}
                            </div>
                            <a href="javascript:;" class="more" @click.stop="lookOrder(item)">查看订单 ></a>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="item.msn_type === 6 && item.refundOrder && item.refundOrder.refund_order_id">
                      <div
                        v-for="(val, inx) in item.refundOrder.refundProduct"
                        :key="val.id"
                        class="order-wrapper pad16"
                      >
                        <div v-if="inx == 0" class="img-box">
                          <img :src="val.product.cart_info.product.image" alt="">
                        </div>
                        <div v-if="inx == 0" class="order-info">
                          <div class="name line1">
                            退款单号：{{ item.refundOrder.refund_order_sn }}
                          </div>
                          <div class="sku">
                            商品数量：{{ item.refundOrder.refund_num }}
                          </div>
                          <div class="price-box">
                            <div class="num">
                              ¥ {{ item.refundOrder.refund_price }}
                            </div>
                            <a href="javascript:;" class="more" @click="lookRefundOrder(item)">查看退款单 ></a>
                          </div>
                        </div>
                      </div>
                    </template> 
                  </div>
                  <template v-if="item.msn_type === 100">
                    <div class="recall-msg">{{item.send_type == 1 ? '你撤回了一条消息' : '对方撤回了一条消息'}}</div>
                  </template>
                  <div class="recall" v-if="item.longpress && press && (new Date().getTime()/1000 - item.send_time) <= 120">
										<div v-if="(new Date().getTime()/1000 - item.send_time) <= 120" class="recall-item" @click.stop="reverstMsg(item)">撤回</div>
									</div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-textarea">
            <div class="chat-btn-wrapper">
              <div v-if="!(!active || !isOnline || closed)" class="left-wrapper">
              <div class="icon-item">
                  <el-upload
                    :show-file-list="false"
                    :headers="header"
                    :data="uploadData"
                    :on-success="handleSuccess"
                    :format="['jpg', 'jpeg', 'png', 'gif']"
                    :on-format-error="handleFormatError"
                    :before-upload="onBeforeUpload"
                    :action="upload"
                  >
                    <span class="iconfont icontupian1" />
                  </el-upload>
                </div>
                <div class="icon-item" @click.stop="isEmoji = !isEmoji">
                  <span class="iconfont iconbiaoqing1" />
                </div>
                
              </div>
              <!-- 表情 -->
              <div v-show="isEmoji" class="emoji-box">
                <div
                  v-for="(emoji, index) in emojiList"
                  :key="index"
                  class="emoji-item"
                >
                  <i class="em" :class="emoji" @click.stop="select(emoji)" />
                </div>
              </div>
            </div>
            <div class="textarea-box" style="position: relative">
              <el-input
                v-model="chatCon"
                type="textarea"
                :rows="4"
                placeholder="请输入文字内容"
                style="font-size: 14px"
                @keydown.native="chatKeydown"
              />
              <div class="send-btn">
                <el-button
                  class="btns"
                  type="primary"
                  :disabled="!chatCon.trim()"
                  @click.stop="sendText"
                >发送
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 280px;overflow: hidden;">
          <rightMenu
            :user="active"
          />
        </div>
      </div>
    </div>
    <!-- 用户标签 -->
    <msgWindow ref="msgWindow" />
    <!-- 商品弹窗 -->
    <goodsDetail ref="goodsDetail" :goods-id="goodsId" />
    <!-- 订单详情 -->
    <orderDetail ref="orderDetail" :order-id="orderId" />
    <!-- 退款单详情 -->
    <refundOrderDetail ref="refundOrderDetail" :order-id="orderId" />
    <!-- </div> -->
  </div>
</template>
<script>
import baseHeader from './components/baseHeader'
import chatList from './components/chatList'
import emojiList from '@/utils/emoji'
import goodsDetail from './components/goods_detail'
import rightMenu from './components/rightMenu'
import msgWindow from './components/msgWindow'
import orderDetail from './components/order_detail'
import refundOrderDetail from './components/refund_order_detail'
import { getToken } from '@/utils/auth'
import SettingMer from '@/libs/settingMer'
import Socket from '@/libs/socket'
import { MessageBox } from 'element-ui'
import { history } from '@/api/kefu'
import Cookies from 'js-cookie'
const mp3 = require('@/assets/video/notice.wav')

const chunk = function(arr, num) {
  num = num * 1 || 1
  var ret = []
  arr.forEach(function(item, i) {
    if (i % num === 0) {
      ret.push([])
    }
    ret[ret.length - 1].push(item)
  })
  return ret
}
export default {
  name: 'PCList',
  components: {
    baseHeader,
    chatList,
    goodsDetail,
    orderDetail,
    refundOrderDetail,
    msgWindow,
    rightMenu
  },
  data() {
    return {
      mp3: new Audio(mp3),
      active: null,
      isEmoji: false,
      chatCon: '',
      emojiGroup: chunk(emojiList, 20), // 表情列表
      emojiList: emojiList,
      userActive: {}, // 左侧用户列表选中信息
      kefuInfo: {}, // 客服信息
      chatList: [],
      page: 1,
      limit: 20,
      loaded: false,
      loading: false,
      online: true, // 当前客服在线状态
      goodsId: '',
      isOrder: false,
      isOnline: false,
      closed: false,
      orderId: '',
      upload: '',
      header: {},
      uploadData: {
        filename: 'file'
      },
      tourist: 0,
      socket: null,
      press: false,
      merchant: {}
    }
  },
  mounted() {
    this.upload = SettingMer.https + '/upload/file'
    this.header['X-Token'] = getToken()
    this.createSocket()
    this.merchant = JSON.parse(Cookies.get('ServiceInfo'))
    this.$on('socket_open', () => {
      this.isOnline = true
      this.active && this.socket.send({
        data: {
          mer_id: this.active.mer_id,
          uid: this.active.uid
        },
        type: 'service_chat_start'
      })
    })
    this.$on(['reply', 'chat', 'send_chat'], (data) => {
      data.longpress = false
      if(this.chatList.length>0 && this.chatList[this.chatList.length-1]['children'].length > 0){
          let index = this.chatList[this.chatList.length-1]['children'].length-1
					let item = this.chatList[this.chatList.length-1]['children'][index]
					if(data.send_time - item.send_time > 300){
						this.chatList.push({time: data.create_time,children:[data]})
					}else{
						this.chatList[this.chatList.length-1]['children'].push(data);
					}
				}else{
					this.chatList.push({time: data.create_time,children:[data]})
				}

      if (this.active && data.uid === this.active.uid) {
        this.active.last = data
      }
      const idx = this.$refs.chatList.userList.indexOf(this.active)
      this.$refs.chatList.userList.splice(idx, 1)
      this.$refs.chatList.userList.unshift(this.active)
      this.deleteMsg(data);
      this.$nextTick(() => {
        this.$refs.scrollBox.scrollTop =
          this.$refs.scrollBox.scrollHeight - this.$refs.scrollBox.clientHeight
      })
    })
    this.$on('back_chat', v => {
      this.mp3.play()
      this.$refs.chatList.updateChatList()
    })
    this.$on(['socket_error', 'socket_close'], () => {
      if (!this.closed && this.isOnline) {
        MessageBox.confirm('连接失败,是否重新连接？', '提示').then(_ => {
          this.createSocket()
        })
      } else {
        this.isOnline = false
      }
    })
    this.$on('err_tip', (data) => {
      this.$message.error(data)
    })
  },
  methods: {
    onBeforeUpload() {
      if (!this.active) {
        this.$message.error('请选择发送用户')
        return false
      }
      if (!this.isOnline || this.closed) {
        this.$message.error('已离线,发送失败')
        return false
      }
    },
    chatKeydown(e) {
      if (e.keyCode === 13) {
        e.stopPropagation()
        e.preventDefault()
        if (e.ctrlKey) {
          this.chatCon += '\n'
        } else if (this.chatCon) {
          this.sendText()
        }
      }
    },
    createSocket() {
      const ws = `${SettingMer.wsSocketUrl}?type=ser&token=` + getToken()
      this.socket = new Socket(ws)
      this.socket.vm(this)
    },
    changeOnline(n) {
      this.isOnline = n
      if (n) {
        this.createSocket()
      } else {
        this.socket.send({
          data: {},
          type: 'service_chat_end'
        })
        this.socket.close()
      }
    },
    // 右键撤回
    showReverst(item){
      if(item.send_type == 1){
        this.chatList.forEach((item, index) => {
          item.children.forEach((itm, idx) => {
            itm.longpress = false
          });
        });
        item.longpress = true;
        this.press = true;
      } 
    },
    // 撤回消息
    reverstMsg(item) {
      this.socket.send({
        data: {
          msn: item.service_log_id,
          msn_type: 100,
          mer_id: this.active.mer_id,
          uid: this.active.uid
        },
        type: "service_chat",
      });
      setTimeout(function(){
        item.longpress = false;
      },300)
    },
    // 删除数组中已撤回的消息
    deleteMsg(data){
      let that = this;
      that.chatList.forEach(function(item, index) {
        item.children.forEach(function(itx, i) {
          if(data.msn_type == 100 && data.msn == itx.service_log_id){
            item.children.splice(i,1)
          }
        });	
      });
    },
    roomClick(event) {
      if (
        this.isEmoji &&
        !event.target.classList.contains('emoji-box') &&
        !event.target.classList.contains('emoji-item') &&
        !event.target.classList.contains('em')
      ) {
        this.isEmoji = false
      }
    },
    activeUser(active) {
      this.active = active
      this.chatList = []
      document.title = `正在和${active.user.nickname}对话中`
      this.page = 1
      this.loading = false
      this.loaded = false
      this.socket.onLoad(() => {
        this.socket.send({
          data: {
            mer_id: active.mer_id,
            uid: active.uid
          },
          type: 'service_chat_start'
        })
      })
      this.getChatList()
    },
    handleFormatError(file) {
      this.$message.error('上传图片只能是 jpg、jpg、jpeg、gif 格式!')
    },
    getChatList() {
      if (this.loaded) return
      if (this.loading) return
      if (!this.active) return
      this.loading = true
      let last = ''
      if (this.chatList.length) {
        last = this.chatList[0].service_log_id
      }
      history(this.active.uid, {
        page: this.page,
        limit: this.limit,
        last_id: last
      }).then(res => {
        const data = res.data.list
        // this.chatList = data.concat(this.chatList)
        let arr = this.getChatTime(data)
        let newArr = []
        for(var j in arr){
          let key = j
          let item  = {}
          item.time = key;
          arr[j].forEach(function(itm, i) {
            itm.longpress = false
          });
          item.children = arr[j]
          newArr.push(item)
        }
        this.chatList = newArr.concat(this.chatList);
        this.page++
        setTimeout(() => {
          this.loading = false
          this.loaded = data.length < this.limit
        }, 500)
        if (this.page === 2) {
          this.$nextTick(() => {
            this.$refs.scrollBox.scrollTop =
              this.$refs.scrollBox.scrollHeight - this.$refs.scrollBox.clientHeight
          })
        } else {
          last && this.$nextTick(() => {
            document.getElementById('chat_' + last).scrollIntoView()
          })
        }
      })
    },
    // 处理聊天时间
		getChatTime(list){
      let arr = {}
      let currentTime = ''
      for(var i=0; i<list.length;i++){
        if(i == 0){
          let time = list[i]['create_time']
          arr[time] = [list[i]]
          currentTime = time
        }else{
          if((list[i]['send_time'] - list[i-1]['send_time']) <= 300 ){
            arr[currentTime].push(list[i]) 
          }else{
            let time = list[i]['create_time']
            currentTime = time
            if(arr[time]){
              arr[currentTime].push(list[i]) 
            }else{
              arr[time] = [list[i]]
            } 
          }
        }
      }
      return arr
    },
    scrollHandler(e) {
      if (e.target.scrollTop <= 150) {
        this.active && this.getChatList()
      }
    },
    // 商品推送
    bindPush(data) {
      this.sendMsg(data, 5)
    },
    // 商品详情
    lookGoods(id) {
      this.$refs.goodsDetail.openBox(id)
    },
    // 订单详情
    lookOrder(item) {
      this.$refs.orderDetail.openBox(item.orderInfo.order_id)
    },
    // 退款单详情
    lookRefundOrder(item) {
      this.$refs.refundOrderDetail.openBox(item.refundOrder.refund_order_id)
      this.$refs.refundOrderDetail.onOrderLog(item.refundOrder.refund_order_id)
    },
    // 上传成功
    handleSuccess(res) {
      if (res.status === 200) {
        this.sendMsg(res.data.src, 3)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 输入框选择表情
    select(data) {
      this.sendMsg(data, 2)
      this.isEmoji = false
    },
    // 文本发送
    sendText() {
      const content = this.chatCon.trim()
      if (!content) {
        return this.$message.error('请输入消息')
      }
      this.sendMsg(content, 1)
      this.chatCon = ''
    },
    // 统一发送处理
    sendMsg(msn, type) {
      if (!this.active) {
        this.$message.error('请选择发送用户')
        return false
      }
      if (!this.isOnline || this.closed) {
        return this.$message.error('已离线,发送失败')
      }
      this.socket.send({
        data: {
          msn: msn,
          msn_type: type,
          mer_id: this.active.mer_id,
          uid: this.active.uid
        },
        type: 'service_chat'
      })
    },
    // 打开选择话语
    handleMsg() {
      this.$refs.msgWindow.openBox()
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../../styles/emoji-awesome/css/google.min.css';
.kefu-layouts {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  display: flex;
  background: #ccc;
  overflow: scroll;
  #chat_scroll {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
  }
    #chat_scroll .time{
      margin: 15px 0;
      text-align: center;
      color: #999999;
      font-size: 12px;
    }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    // width: 100%;
    width: 90%;
    min-width: 1000px;
    max-width: 1200px;
    height: 90%;
    min-height: 600px;
    max-height: 800px;
    // height: 100%;
    background: #fff;

    .container {
      display: flex;
      flex: 1;
      min-height: 0;
      // height: calc(100vh - 66px);

      .chat-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-basis: auto;
        box-sizing: border-box;
        min-width: 0;
        overflow: hidden;
        // width: 100%;
        // height: 100%;
        border-right: 1px solid #ECECEC;
        .chat-body {
          height: 100%;
          overflow: hidden;
          .chat-item {
            margin-bottom: 10px;
            position: relative;
            .recall{
              width: 70px;
              height: 30px;
              line-height: 30px;
              background: #fff;
              border-radius: 2px;
              text-align: center;
              font-size: 12px;
              box-shadow: 0px 3px 6px 1px rgba(51,51,51,0.1);
              position:absolute;
              bottom: -20px;
              right: 50px;
              z-index: 10;
             .recall-item{
              cursor: pointer;
             }
            }
            .recall-msg {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;	
              color: #999;
              font-size: 12px;
              margin: 15px 0;
            }
            .time {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #999999;
              font-size: 14px;
              margin: 18px 0;
            }

            .flex-box {
              display: flex;
            }

            .avatar {
              width: 40px;
              height: 40px;
              margin-right: 16px;

              img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            &.right-box {
              .flex-box {
                flex-direction: row-reverse;

                .avatar {
                  margin-right: 0;
                  margin-left: 16px;
                }

                .msg-wrapper {
                  background: #CDE0FF;
                }
              }

              &.gary .msg-wrapper {
                background: #f5f5f5;
              }
            }

            .msg-wrapper {
              max-width: 320px;
              background: #F5F5F5;
              border-radius: 10px;
              color: #000000;
              font-size: 14px;
              overflow: hidden;
              display: flex;
              align-items: center;

              .txt-wrapper {
                word-break: break-all;
                white-space: pre-wrap;
              }

              .pad16 {
                padding: 9px;
              }

              .img-wraper img {
                max-width: 100%;
                height: auto;
                display: block;
              }

              .order-wrapper {
                display: flex;
                width: 320px;

                .img-box {
                  width: 60px;
                  height: 60px;

                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                  }
                }

                .order-info {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  width: 224px;
                  margin-left: 10px;
                  font-size: 12px;

                  .price-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #FF0000;

                    .more {
                      font-size: 12px;
                      color: #1890FF;
                    }
                  }

                  .name {
                    font-size: 14px;
                  }

                  .sku {
                    margin: 1px 0;
                    color: #999999;
                  }
                }
              }

            }

          }
        }

        .chat-textarea {
          height: 214px;
          border-top: 1px solid #ECECEC;

          .chat-btn-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 0;

            .left-wrapper {
              display: flex;
              align-items: center;

              .icon-item {
                display: flex;
                align-items: center;
                margin-left: 20px;
                cursor: pointer;

                span {
                  font-size: 22px;
                  color: #333333;
                }
              }
            }

            .right-wrapper {
              position: relative;
              padding-right: 20px;
              width: 300px;

              .icon-item {
                display: flex;
                align-items: center;
                font-size: 15px;
                color: #333;
                cursor: pointer;

                span {
                  margin-left: 10px;
                }
              }

              .transfer-box {
                z-index: 60;
                position: absolute;
                right: 1px;
                bottom: 43px;
                width: 140px;
                background: #fff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 16px;
              }

              .transfer-bg {
                z-index: 50;
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: transparent;
              }
            }

            .emoji-box {
              position: absolute;
              left: 0;
              top: 0;
              transform: translateY(-100%);
              display: flex;
              flex-wrap: wrap;
              width: 365px;
              padding: 15px 9px;
              box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.1);
              background: #fff;

              .emoji-item {
                margin-right: 13px;
                margin-bottom: 8px;
                cursor: pointer;

                &:nth-child(10n) {
                  margin-right: 0;
                }
              }
            }
          }

          .textarea-box {
            /deep/ .el-textarea__inner {
              resize: none !important;
              height: 148px;
              border-color: transparent;
              font-size: 14px !important;
            }

            .send-btn {
              position: absolute;
              right: 0;
              bottom: 10px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: end;
              -ms-flex-pack: end;
              justify-content: flex-end;
              margin-top: 10px;
              margin-right: 10px;
              width: 80px;
            }
          }
        }
      }
    }
  }

  .happy-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  /deep/ .happy-scroll-content {
    width: 100%;

    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }

      50% {
        transform: rotate(180deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .demo-spin-col {
      height: 100px;
      position: relative;
      border: 1px solid #eee;
    }
  }
}
</style>
