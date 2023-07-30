<template>
  <div class="divBox">
    <el-dialog v-if="dialogVisible" title="直播间信息" :visible.sync="dialogVisible" width="700px">
      <div v-loading="loading">
        <div class="box-container">
          <div class="list sp">
            <label class="name">直播间名称：</label>
            <span class="info">{{ FormData.name }}</span>
          </div>
          <div class="list sp">
            <label class="name">主播微信号：</label>
            <span class="info">{{ FormData.anchor_wechat }}</span>
          </div>
          <div class="list sp">
            <label class="name">直播间ID：</label>
            <span class="info">{{ FormData.broadcast_room_id }}</span>
          </div>
          <div class="list sp">
            <label class="name">主播昵称：</label>
            <span class="info">{{ FormData.anchor_name }}</span>
          </div>
          <div class="list sp">
            <label class="name">手机号：</label>
            <span class="info">{{ FormData.phone }}</span>
          </div>
          <div class="list sp">
            <label class="name">审核结果：</label>
            <span class="info">{{ FormData.status | liveReviewStatusFilter }}</span>
          </div>
          <div class="list sp">
            <label class="name">直播开始时间：</label>
            <span class="info">{{ FormData.start_time }}</span>
          </div>
          <div class="list sp">
            <label class="name">直播结束时间：</label>
            <span class="info">{{ FormData.end_time }}</span>
          </div>
          <div class="list sp">
            <label class="name">直播间类型：</label>
            <span class="info">{{ FormData.type | broadcastType }}</span>
          </div>
          <div v-if="FormData.type == 1" class="list sp">
            <label class="name">显示类型：</label>
            <span class="info">{{ FormData.screen_type | broadcastDisplayType }}</span>
          </div>
          <div v-if="FormData.type == 1 && FormData.push_url" class="list sp100">
            <label class="name" style="float: left;">推流地址：</label>
            <span class="info line1" style="float:left;width:300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ FormData.push_url }}</span>
            <el-button class="copyBtn" type="primary" plain @click="handleClipboard(FormData.push_url,$event)">复制</el-button>
          </div>
          <div class="list sp">
            <label class="name">是否开启点赞：</label>
            <span class="info blue">{{ FormData.close_like ? "✖" : "✔" }}</span>
          </div>
          <div class="list sp">
            <label class="name">是否开启货架：</label>
            <span class="info blue">{{ FormData.close_goods ? "✖" : "✔" }}</span>
          </div>
          <div class="list sp">
            <label class="name">是否开启评论：</label>
            <span class="info blue">{{ FormData.close_comment ? "✖" : "✔" }}</span>
          </div>

          <div class="list sp">
            <label class="name">是否开启直播回放：</label>
            <span class="info blue">{{ FormData.replay_status ? "✔" : "✖" }}</span>
          </div>
          <div class="list sp">
            <label class="name">是否开启分享：</label>
            <span class="info blue">{{ FormData.close_share ? "✖" : "✔" }}</span>
          </div>
          <div class="list sp">
            <label class="name">是否开启客服：</label>
            <span class="info blue">{{ FormData.close_kf ? "✖" : "✔" }}</span>
          </div>
          <div class="list sp100">
            <label class="name">是否开启官方收录：</label>
            <span class="info blue">{{ FormData.is_feeds_public ? "✔" : "✖" }}</span>
          </div>
          <div class="list sp image">
            <label class="name">背景图：</label>
            <img style="max-width: 150px; height: 80px;" :src="FormData.cover_img">
          </div>
          <div class="list sp image">
            <label class="name">分享图：</label>
            <img style="max-width: 150px; height: 80px;" :src="FormData.share_img">
          </div>
          <div v-if="FormData.status === 2" class="list sp100">
            <label class="name">已导入的直播商品：</label>
            <el-button v-if="type === 'edit'" size="small" type="primary" class="mr10" @click="handleImport(FormData)">导入直播商品</el-button>
            <selected-goods ref="selectedGoods" :type="type" :broadcast_room_id="FormData.broadcast_room_id" />
          </div>
          <div class="list sp100">
            <label class="name">备注：</label>
            <span class="info">
              <el-input v-model="FormData.mark" type="textarea" :rows="1" />
            </span>
          </div>
          <div class="list sp100 mt20">
            <el-button
              type="button"
              class="el-button el-button--primary el-button--medium"
              style="width: 100%;"
              :disabled="FormData.mark == ''"
              @click="handleRemarks()"
            >提交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--导入直播商品-->
    <import-goods ref="uploadGoods" @getList="getList"/>
  </div>
</template>

<script>
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { broadcastDetailApi, broadcastRemarksApi } from '@/api/marketing'
import selectedGoods from './selectedGoods'
import importGoods from '@/components/importGoods/index'
import clipboard from '@/utils/clipboard'
export default {
  name: 'StudioDetail',
  components: {
    selectedGoods,
    importGoods
  },
  data() {
    return {
      dialogVisible: false,
      option: {
        form: {
          labelWidth: '150px'
        }
      },
      FormData: {},
      loading: false,
      type: ''
    }
  },
  mounted() {

  },
  methods: {
    getData(id, type) {
      this.loading = true
      this.type = type
      broadcastDetailApi(id)
        .then((res) => {
          this.FormData = res.data
          this.loading = false
          console.log(this.FormData)
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.loading = false
        })
    },
    // 导入
    handleImport(row) {
      this.$refs.uploadGoods.importVisible = true
      this.$refs.uploadGoods.broadcast_id = row.broadcast_room_id
      this.$refs.uploadGoods.broadcast_room = row.name
      this.$refs.uploadGoods.image = ''
      localStorage.setItem('liveRoom_id', row.broadcast_room_id)
    },
    handleRemarks(id) {
      broadcastRemarksApi(this.FormData.broadcast_room_id, this.FormData.mark)
        .then((res) => {
          this.loading = false
          this.$message.success(res.message)
          this.dialogVisible = false
          this.$emit('getList')
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.loading = false
        })
    },
    getList() {
      this.$refs.selectedGoods.getList()
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style scoped>
.box-container {
  overflow: hidden;
}
.box-container .list {
  float: left;
  line-height: 40px;
}
.box-container .sp {
  width: 50%;
}
.box-container .sp3 {
  width: 33.3333%;
}
.box-container .sp100 {
  width: 100%;
}
.box-container .list .name {
  display: inline-block;
  width: 150px;
  text-align: right;
  color: #606266;
}
.box-container .list .blue {
  color: #1890ff;
}
.box-container .list.image {
  margin-bottom: 40px;
}
.box-container .list.image img {
  position: relative;
  top: 40px;
}
.el-textarea {
  width: 400px;
}
.copyBtn{
  padding: 6px 10px;
}
</style>
