<template>
  <el-dialog
    title="选择分组"
    :visible.sync="dialogVisible"
    width="320px"
    :show-close="false"
    top="15vh"
    :before-close="handleClose"
  >
    <div class="label-wrapper">
      <div class="label-box">
        <div class="list">
          <div v-for="(label,j) in labelList" :key="j" class="label-item" :class="{on:label.id == groupId}" @click="selectLabel(label)">{{ label.group_name }}</div>
        </div>
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
    },
    groupId: {
      type: String | Number,
      default: ''
    },
    labelList: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  data() {
    return {
      activeIds: [],
      dialogVisible: false
    }
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
      this.handleClose()
      this.$emit('editUserLabel', label.id)
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
