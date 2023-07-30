<template>
  <el-dialog
    title="选择用户标签"
    :visible.sync="dialogVisible"
    width="320px"
    :show-close="false"
    top="15vh"
    :before-close="handleClose"
  >
    <div class="label-wrapper">
      <div v-for="(item,index) in labelList" :key="index" class="label-box">
        <div class="title">{{ item.name }}</div>
        <div class="list">
          <div v-for="(label,j) in item.label" :key="j" class="label-item" :class="{on:label.disabled}" @click="selectLabel(label)">{{ label.label_name }}</div>
        </div>
      </div>
      <div class="footer">
        <el-button size="mini" type="primary" class="btns" @click="subBtn">确定</el-button>
        <el-button size="mini" class="btns" ghost @click="handleClose">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { userLabel, userLabelPut } from '@/api/kefu'
export default {
  name: 'UserLabel',
  props: {
    uid: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      labelList: [
        {
          add_time: 0,
          id: 14,
          label: [
            { id: 18, label_cate: 14, label_name: '电子数码', disabled: true },
            { id: 19, label_cate: 14, label_name: '机械加工', disabled: true },
            { id: 20, label_cate: 14, label_name: '品牌服饰', disabled: true },
            { id: 21, label_cate: 14, label_name: '廉价经济', disabled: false },
            { id: 22, label_cate: 14, label_name: '美妆达人', disabled: false },
            { id: 23, label_cate: 14, label_name: '同行竞品', disabled: true }
          ],
          name: '购买意向',
          other: '',
          owner_id: 0,
          pid: 0,
          sort: 5,
          type: 0
        }
      ],
      activeIds: [],
      dialogVisible: false
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    openBox() {
      this.dialogVisible = true
    },
    getList() {
      userLabel(this.uid).then(res => {
        res.data.map(el => {
          el.label.map(label => {
            if (label.disabled) {
              this.activeIds.push(label.id)
            }
          })
        })
        this.labelList = res.data
      })
    },
    selectLabel(label) {
      if (label.disabled) {
        const index = this.activeIds.indexOf(label.id)
        this.activeIds.splice(index, 1)
        label.disabled = false
      } else {
        this.activeIds.push(label.id)
        label.disabled = true
      }
    },
    // 确定
    subBtn() {
      const unLaberids = []
      this.labelList.map(item => {
        item.label.map(i => {
          if (i.disabled == false) {
            unLaberids.push(i.id)
          }
        })
      })
      console.log(unLaberids)
      this.handleClose()
      // userLabelPut(this.uid,{
      //     label_ids: this.activeIds,
      //     un_label_ids: unLaberids
      // }).then(res=>{
      //     this.$Message.success(res.msg)
      //     this.$emit('editLabel')
      // }).catch(error=>{
      //     this.$Message.error(error.msg)
      // })
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header{
  text-align: center;
}
/deep/ .el-dialog__title{
  font-size: 14px;
}
.label-wrapper{
  .list{
    display: flex;
    flex-wrap: wrap;
    .label-item{
      margin: 10px 8px 10px 0;
      padding: 3px 8px;
      background: #EEEEEE;
      color: #333333;
      border-radius: 2px;
      cursor: pointer;
      font-size: 12px;
      &.on{
        color: #fff;
        background: #1890FF;
      }
    }
  }
  .footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    button {
      margin-left: 10px;
    }
  }
}
.title{
  font-size: 13px;
}
</style>
