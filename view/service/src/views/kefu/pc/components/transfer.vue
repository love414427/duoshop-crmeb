<template>
  <div>
    <div class="list-wrapper">
      <div v-for="(item,index) in labelLists" :key="index" class="user-item" @click="bindActive(item)">
        <img v-lazy="item.avatar" alt="">
        <p class="line1">{{ item.wx_name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { transferList, serviceTransfer } from '@/api/kefu'
export default {
  name: 'Transfer',
  props: {
    userUid: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      currentChoose: '',
      labelLists: [
        {
          add_time: '2021-12-26 05:59:13',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/GuicL1v8ElXvIVOKh2YpPExF2QApTOiaAXXOXuPk5FdsaGiaSHRibg2FwHHaQRZPK3HbTKohXmsRtiaMHLCGIMMqEew/132',
          id: 66,
          nickname: 'Zesslly',
          phone: '18676081336',
          status: 1,
          uid: 25201,
          wx_name: '陈'
        },
        {
          add_time: '2021-12-13 18:03:10',
          avatar: 'https://demo26.crmeb.net/uploads/store/comment/20211213/3bcb795098cdb03e2025ffa4650ae4f4.jpeg',
          id: 64,
          nickname: '浮云都想对你说',
          phone: '18709256020',
          status: 1,
          uid: 21410,
          wx_name: '123'
        }
      ],
      name: ''
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList() {
      transferList({
        nickname: this.name,
        uid: this.userUid
      }).then(res => {
        this.labelLists = res.data.list
      })
    },
    bindActive(item) {
      // this.$emit('transferPeople',item)
      serviceTransfer({
        uid: this.userUid,
        kefuToUid: item.uid
      }).then(res => {
        this.$Message.success(res.msg)
        this.$emit('close')
      }).catch(error => {
        this.$Message.error(error.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper{
  .user-item{
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    cursor: pointer;
    &:last-child{
      margin-bottom: 0;
    }
    img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 8px;
    }
    p{
      width: 80%;
      color: #333;
      font-size: 13px;
    }
  }
}
</style>
