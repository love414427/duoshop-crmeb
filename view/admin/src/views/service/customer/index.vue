<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form inline size="small">
          <el-form-item label="状态：">
            <el-select v-model="tableFrom.status" placeholder="状态" clearable @change="getList">
              <el-option
                v-for="item in optionsData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList" placeholder="请输入关键字" class="selWidth">
              <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList" />
            </el-input>
          </el-form-item>
        </el-form>
        <el-button size="small" type="primary" @click="onAdd">添加客服</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="service_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="user.nickname"
          label="微信用户名称"
          min-width="130"
        />
        <el-table-column label="客服头像" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                class="tabImage"
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="客服名称"
          min-width="130"
        />
        <el-table-column
          label="帐号状态"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_open"
              :active-value="1"
              :inactive-value="0"
              :disabled="!scope.row.user || scope.row.user.cancel_time"
              active-text="开"
              inactive-text="关"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.is_open && scope.row.status" @click="login(scope.row.service_id, scope.$index)">进入工作台</el-button>
            <el-button type="text" size="small" @click="goList(scope.row.service_id, scope.$index)">聊天记录</el-button>
            <el-button v-if="scope.row.user && !scope.row.user.cancel_time" type="text" size="small" @click="onEdit(scope.row.service_id)">编辑</el-button>
            <el-button type="text" size="small" @click="onDel(scope.row.service_id,scope.$index)">删除</el-button>
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

    <!--聊天记录-->
    <el-dialog title="聊天记录" :width="isChat?'600px':'800px'" :visible.sync="dialogTableVisible">
      <el-table v-if="isChat" key="isIndex" v-loading="loadingChat" :data="tableChatData.data">
        <el-table-column property="user.nickname" label="用户名称" min-width="100" />
        <el-table-column label="用户头像" min-width="80">
          <template slot-scope="scope">
              <img v-if="scope.row.user.avatar" class="tabImage" :src="scope.row.user.avatar" />
              <img v-else class="tabImage" src="../../../assets/images/f.png" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="check(scope.row.uid, scope.$index)">查看对话</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="!isChat" type="primary" size="small" @click="goBack">返回聊天记录</el-button>
      <el-table v-if="!isChat" key="isIndexs" v-loading="loadingChat" :data="tableServiceData.data">
        <el-table-column label="发送人" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.send_type === 0 ? scope.row.user.nickname : scope.row.service.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发送人头像" min-width="80">
          <template slot-scope="scope">
            <img v-if="scope.row.user.avatar" class="tabImage" :src="scope.row.user.avatar" />
            <img v-else class="tabImage" src="../../../assets/images/f.png" />
          </template>
        </el-table-column>
        <el-table-column label="发送消息" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.msn_type === 2" class="tabImage">[{{ scope.row.msn }}]</span>
            <img v-else-if="scope.row.msn_type === 3" class="tabImage" :src="scope.row.msn" />
            <span v-else>{{scope.row.msn}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="发送时间" min-width="100" />
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="isChat?tableChatData.total:tableServiceData.total"
          @size-change="handleSizeChangeChat"
          @current-change="pageChangeChat"
        />
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
import {
  serviceListApi,
  serviceCreateApi,
  serviceUpdateApi,
  serviceStatusApi,
  serviceDeleteApi,
  serviceChatListApi,
  serviceChatUidListApi,
  serviceLoginApi
} from '@/api/system'
import Cookies from "js-cookie";
import SettingMer from "@/libs/settingMer";
const optionsData = [
  {
    value: '1',
    label: '显示'
  }, {
    value: '0',
    label: '隐藏'
  }
]
export default {
  name: 'Service',
  data() {
    return {
      isChat: false,
      loadingChat: false,
      dialogTableVisible: false,
      optionsData: optionsData,
      loading: false,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: '',
        status: ''
      },
      tableChatFrom: {
        page: 1,
        limit: 8
      },
      tableChatData: {
        data: [],
        total: 0
      },
      tableServiceData: {
        data: [],
        total: 0
      },
      serviceId: 0,
      uid: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    login(id){
      serviceLoginApi(id)
        .then(res => {
          Cookies.set("SerToken", res.data.token);
          window.open(SettingMer.httpUrl + res.data.url);
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    // 列表
    getList() {
      this.loading = true
      serviceListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.loading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loading = false
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    // 聊天记录列表
    goList(id) {
      this.serviceId = id
      this.dialogTableVisible = true
      this.tableChatFrom.page = 1
      this.getListChat()
      this.isChat = true
    },
    goBack() {
      this.tableChatFrom.page = 1
      this.getListChat()
      this.isChat = true
    },
    check(uid) {
      this.uid = uid
      this.serviceChatUidList(uid)
      this.isChat = false
    },
    // 聊天记录列表
    getListChat() {
      this.loadingChat = true
      serviceChatListApi(this.serviceId, this.tableChatFrom).then(res => {
        this.tableChatData.data = res.data.list
        this.tableChatData.total = res.data.count
        this.loadingChat = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loadingChat = false
      })
    },
    // 聊天记录列表
    serviceChatUidList(uid) {
      this.loadingChat = true
      serviceChatUidListApi(this.serviceId, uid, this.tableChatFrom).then(res => {
        this.tableChatData.data = []
        this.tableServiceData.data = res.data.list
        this.tableServiceData.total = res.data.count
        this.loadingChat = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loadingChat = false
      })
    },
    pageChangeChat(page) {
      this.tableChatFrom.page = page
      this.isChat ? this.getListChat() : this.serviceChatUidList(this.uid)
    },
    handleSizeChangeChat(val) {
      this.tableChatFrom.limit = val
      this.getListChat()
      this.isChat ? this.getListChat() : this.serviceChatUidList(this.uid)
    },
    // 添加
    onAdd() {
      this.$modalForm(serviceCreateApi()).then(() => this.getList());
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(serviceUpdateApi(id)).then(() => this.getList());
    },
    onDel(id, idx) {
      this.$modalSure('删除该客服吗').then(() => {
        serviceDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    // 修改状态
    onchangeIsShow(row) {
      serviceStatusApi(row.service_id, row.is_open).then(({ message }) => {
        this.$message.success(message)
        this.getList()
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tabImage{
  width: 36px;
  height: 36px;
}
</style>
