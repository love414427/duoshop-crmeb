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
          <div class="list sp">
            <label class="name">显示类型：</label>
            <span class="info">{{ FormData.screen_type | broadcastDisplayType }}</span>
          </div>
          <div v-if="FormData.type == 1 && FormData.push_url" class="list sp100">
            <label class="name" style="float: left;">推流地址：</label>
            <span class="info line1" style="float:left;width:300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ FormData.push_url }}</span>
            <el-button class="copyBtn" type="primary" plain @click="handleClipboard(FormData.push_url,$event)">复制</el-button>
          </div>
          <div class="list sp image">
            <label class="name">背景图：</label>
            <img style="max-width: 150px; height: 80px;" :src="FormData.cover_img" />
          </div>
          <div class="list sp image">
            <label class="name">分享图：</label>
            <img style="max-width: 150px; height: 80px;" :src="FormData.share_img" />
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
            <span class="info blue">{{ FormData.close_comment  ? "✖" : "✔" }}</span>
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
          <div v-if="isEdit" class="list">
            <div class="list sp100">
                <label class="name">直播列表推荐：</label>
                <el-rate class="rate_star"
                    v-model="FormData.star"
                    :colors="colors">
                </el-rate>
            </div>
            <div class="list sp100">
                <label class="name" >排序：</label>
                <el-input
                v-model.number="FormData.sort"
                type="number"
                placeholder="请输入序号"
                class="selWidth"
                size="small"
                style="padding-right: 0;"
                />
                <el-button size="small" type="primary" style="width: 80px;" @click="handleSort">确定</el-button>
            </div>
          </div>
          <div v-else class="list sp">
            <label class="name">排序：</label>
            <span class="info">{{ FormData.sort }}</span>
          </div>
          <div v-if="FormData.status === 2" class="list sp100">
            <label class="name">已导入直播商品：</label>
            <selected-goods ref="selectedGoods" v-bind:broadcast_room_id="FormData.broadcast_room_id"/>
          </div>
        </div>
      </div>
    </el-dialog>
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
import { broadcastDetailApi, broadcastRoomSortApi } from "@/api/marketing";
import selectedGoods from './selectedGoods'
import clipboard from '@/utils/clipboard'
export default {
  name: "studioDetail",
  components: {
    selectedGoods
  },
  data() {
    return {
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogVisible: false,
      isEdit: false,
      option: {
        form: {
          labelWidth: "150px",
        },
      },
      FormData: {
        sort: 0,
        star: 0
      },
      loading: false,
    };
  },
  mounted() {},
  methods: {

    getData(id) {
      this.loading = true;
      broadcastDetailApi(id)
        .then((res) => {
          this.FormData = res.data;
          this.loading = false;
          console.log(this.FormData);
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.loading = false;
        });
    },
    // 排序
    handleSort() {
      broadcastRoomSortApi(this.FormData.broadcast_room_id,{sort:this.FormData.sort,star:this.FormData.star})
        .then((res) => {
          this.$emit("getList")
          this.$message.success(res.message)
          this.dialogVisible = false
        })
        .catch((res) => {
          this.$message.error(res.message)

        });
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  },
};
</script>

<style scoped>
.rate_star{
    display: inline-block;
}
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
/deep/ .el-input__inner{
  padding-right: 0;
}
.copyBtn{
  padding: 6px 10px;
}
</style>
