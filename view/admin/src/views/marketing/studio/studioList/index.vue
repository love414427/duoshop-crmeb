<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px" inline>
            <el-form-item label="状态：" style="display: block;">
              <el-radio-group v-model="tableFrom.status_tag" type="button" @change="getList(1)">
                <el-radio-button label>全部</el-radio-button>
                <el-radio-button label="0">待审核</el-radio-button>
                <el-radio-button label="1">审核已通过</el-radio-button>
                <el-radio-button label="-1">审核未通过</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商户名称：">
                <el-select
                  v-model="tableFrom.mer_id"
                  clearable
                  filterable
                  placeholder="请选择"
                  class="selWidth"
                  @change="getList(1)"
                >
                  <el-option
                    v-for="item in merSelect"
                    :key="item.mer_id"
                    :label="item.mer_name"
                    :value="item.mer_id"
                  />
                </el-select>
              </el-form-item>
            <el-form-item label="商户类别：" >
              <el-select
                v-model="tableFrom.is_trader"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option label="自营" value="1" />
                <el-option label="非自营" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="商城显示状态：">
                <el-select
                    v-model="tableFrom.show_type"
                    placeholder="请选择"
                    class="filter-item selWidth"
                    clearable
                    @change="getList(1)"
                >
                    <el-option
                        v-for="item in studioShowStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
                <el-form-item label="直播状态：">
                    <el-select
                        v-model="tableFrom.live_status"
                        placeholder="请选择"
                        class="filter-item selWidth"
                        clearable
                        @change="getList(1)"
                    >
                    <el-option
                        v-for="item in studioStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="推荐级别：">
              <el-select
                v-model="tableFrom.star"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in recommendedLevelStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="width100" style="display: inline-block;">
              <el-input
                v-model="tableFrom.keyword"
                @keyup.enter.native="getList(1)"
                placeholder="请输入直播间名称/ID/主播昵称/微信号"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column label="序号" min-width="60">
          <template scope="scope">
            <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户名称" min-width="90">
          <template scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="broadcast_room_id" label="ID" min-width="60" />
        <el-table-column prop="name" label="直播间名称" min-width="90" />
        <el-table-column
          v-if="tableFrom.status_tag == 1"
          key="1"
          prop="broadcast_room_id"
          label="直播间ID"
          min-width="80"
        />
        <el-table-column prop="anchor_name" label="主播昵称" min-width="90" />
        <el-table-column prop="anchor_wechat" label="主播微信号" min-width="100" />
        <el-table-column prop="start_time" min-width="150" label="直播开始时间" />
        <el-table-column prop="end_time" min-width="150" label="直播计划结束时间" />
        <el-table-column label="直播状态" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.live_status | broadcastStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" min-width="150" label="创建时间" />
        <el-table-column label="推荐级别"  min-width="150">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.star+'星推荐' }} </span> -->
            <el-rate
            disabled
            v-model="scope.row.star"
            :colors="colors">
           </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="sort" min-width="60" label="排序" />
        <el-table-column label="显示状态" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column key="15" label="开启收录" min-width="100">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.status == 2" v-model="scope.row.is_feeds_public" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" @click.native="onchangeIsFeeds(scope.row)" />
            <el-switch v-else v-model="scope.row.is_feeds_public" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" />
          </template>
        </el-table-column>
        <el-table-column key="16" label="禁言" min-width="100">
           <template slot-scope="scope">
             <el-switch v-if="scope.row.status == 2" v-model="scope.row.close_comment" :active-value="0" :inactive-value="1" active-text="开启" inactive-text="关闭" @click.native="onchangeIsCommen(scope.row)" />
             <el-switch v-else v-model="scope.row.close_comment" disabled :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" />
           </template>
        </el-table-column>
        <el-table-column key="17" label="客服开关" min-width="100">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.status == 2" v-model="scope.row.close_kf" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" @click.native="onchangeIsKf(scope.row)" />
            <el-switch v-else v-model="scope.row.close_kf" disabled :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" />
          </template>
        </el-table-column>
        <el-table-column label="商城显示" min-width="90">
            <template slot-scope="scope">
                <span v-if="scope.row.is_mer_show == 1 && scope.row.is_show == 1">显示</span>
                <span v-else-if="scope.row.is_mer_show == 0 && scope.row.is_show == 1">商户关闭</span>
                <span v-else-if="scope.row.is_mer_show == 1 && scope.row.is_show == 0">平台关闭</span>
                <span v-else>关闭</span>
            </template>
        </el-table-column>
        <el-table-column  label="审核状态" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.status | liveReviewStatusFilter }}</span>
            <span
              v-if="scope.row.status == -1"
              style="display: block; font-size: 12px;"
            >原因 {{ scope.row.error_msg }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 0"
              type="text"
              size="small"
              @click="handleAudit(scope.row.broadcast_room_id)"
            >审核</el-button>
            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="onStudioDetails(scope.row.broadcast_room_id)"
            >详情</el-button>
            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="handleEdit(scope.row.broadcast_room_id)"
            >编辑</el-button>
            <!--<el-button
              v-if="scope.row.status !== 2 || scope.row.live_status === 103 || scope.row.live_status === 107"
              type="text"
              size="small"
              @click="handleDelete(scope.row.broadcast_room_id, scope.$index)"
            >删除</el-button>-->
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--详情-->
    <details-from ref="studioDetail" @getList="getList" />
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
import {
  broadcastListApi,
  changeDisplayApi,
  broadcastDeleteApi,
  broadcastAuditApi,
  openCommontApi,
  openCollectionApi,
  studioCloseKfApi
} from "@/api/marketing";
merSelectApi
import {
   merSelectApi
} from '@/api/product'
import detailsFrom from "./studioDetail";
import { roterPre } from "@/settings";
export default {
  name: "StudioList",
  components: { detailsFrom },
  data() {
    return {
      Loading: false,
      dialogVisible: false,
      broadcast_room_id: 0,
      roterPre: roterPre,
      listLoading: true,
      merSelect: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      studioShowStatusList: [
        { label: "显示", value: 3 },
        { label: "商户关闭", value: 2 },
        { label: "平台关闭", value: 1 },
        { label: "关闭", value: 0 }
      ],
      studioStatusList: [
        { label: "正在进行", value: '101' },
        { label: "已结束", value: '103' },
        { label: "未开始", value: '102' },
        { label: "已过期", value: '107' }
      ],
      recommendedLevelStatus: [
        { label: "全部", value: "" },
        { label: "5星", value: '5' },
        { label: "4星", value: '4' },
        { label: "3星", value: '3' },
        { label: "2星", value: '2' },
        { label: "1星", value: '1' }
      ],
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status_tag: this.$route.query.status ? this.$route.query.status : "",
        is_trader: '',
        show_type: "",
        status: "",
        star: "",
        broadcast_room_id: this.$route.query.id ? this.$route.query.id : "",
      },
    };
  },
  mounted() {
    this.getMerSelect()
    this.getList();
  },
  methods: {
      // 商户列表；
    getMerSelect() {
      merSelectApi()
        .then((res) => {
          this.merSelect = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 删除
    handleDelete(item, idx) {
      (item.status == 2 && item.live_status == 101) ?
        this.$confirm('该直播间正在进行直播，删除后不可恢复，您确认删除吗？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '不删除',
          type: 'warning'
        }).then(() => {
          broadcastDeleteApi(item.broadcast_room_id)
            .then(({ message }) => {
              this.$message.success(message);
              this.tableData.data.splice(idx, 1)
            })
            .catch(({ message }) => {
              this.$message.error(message);
            });
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
        :
      this.$modalSureDelete().then(() => {
        broadcastDeleteApi(item.broadcast_room_id)
          .then(({ message }) => {
            this.$message.success(message)
            this.tableData.data.splice(idx, 1)
            this.getList()
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    },
    // 详情
    onStudioDetails(id) {
      this.broadcast_room_id = id
      this.$refs.studioDetail.dialogVisible = true
      this.$refs.studioDetail.isEdit = false
      this.$refs.studioDetail.getData(id)
    },
    // 编辑
    handleEdit(id) {
      this.broadcast_room_id = id
      this.$refs.studioDetail.dialogVisible = true
      this.$refs.studioDetail.isEdit = true
      this.$refs.studioDetail.getData(id)
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page
      broadcastListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false
          this.$message.error(res.message)
        })
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList();
    },
    // 审核
    handleAudit(id) {
      this.$modalForm(broadcastAuditApi(id)).then(() => this.getList());
    },
    // 修改显示状态
    onchangeIsShow(row) {
      changeDisplayApi(row.broadcast_room_id, { is_show: row.is_show })
        .then(({ message }) => {
          this.$message.success(message);
          this.getList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    // 开启收录
    onchangeIsFeeds(row) {
      openCollectionApi(row.broadcast_room_id, row.is_feeds_public).then(({ message }) => {
        this.$message.success(message)
        this.getList('')
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 禁言
    onchangeIsCommen(row) {
      openCommontApi(row.broadcast_room_id, row.close_comment).then(({ message }) => {
        this.$message.success(message)
        this.getList('')
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 客服
    onchangeIsKf(row) {
      studioCloseKfApi(row.broadcast_room_id, row.close_kf).then(({ message }) => {
        this.$message.success(message)
        this.getList('')
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
  },
};
</script>

<style scoped lang="scss">
.modalbox {
  /deep/.el-dialog {
    min-width: 550px;
  }
}
.selWidth {
  width: 350px !important;
}
.seachTiele {
  line-height: 35px;
}
.fa {
  color: #0a6aa1;
  display: block;
}
.sheng {
  color: #ff0000;
  display: block;
}
</style>
