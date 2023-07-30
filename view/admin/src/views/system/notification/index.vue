<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <el-form size="small">
            <el-form-item label="" class="mr10">
              <!-- <el-button type="primary" @click="add">添加通知</el-button> -->
              <el-button type="primary" icon="el-icon-s-tools" @click="syncApplet">同步小程序订阅消息</el-button>
              <el-button type="success" icon="el-icon-s-tools" @click="syncPublic">同步公众号模板消息</el-button>
            </el-form-item>
            <el-form-item label="" class="mr10">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item name="1">
                    <template slot="title">
                     <div style="font-size: 14px;font-weight: bold;color:#1890ff;">同步消息必读 <i class="header-icon el-icon-info"></i></div>
                    </template>
                    <div style="font-weight: bold;">小程序订阅消息</div>
                    <div>登录微信小程序后台，基本设置，服务类目增加《生活服务 > 百货/超市/便利店》 <span style="color: #FF9400;">(否则同步小程序订阅消息会报错)</span></div>
                    <div>同步小程序订阅消息 是在小程序后台未添加订阅消息模板的前提下使用的，会新增一个模板消息并把信息同步过来，如果小程序后台已经添加过的，会跳过不会更新本项目数据库。</div>
                    <div style="font-weight: bold;">微信模板消息</div> 
                    <div>登录微信公众号后台，选择模板消息，将模板消息的所在行业修改副行业为《其他/其他》 <span style="color: #FF9400;">(否则同步模板消息不成功)</span></div>
                    <div>同步公众号模板消息 同步公众号模板会删除公众号后台现有的模板，并重新添加新的模板，然后同步信息到数据库，如果多个项目使用同一个公众号的模板，请谨慎操作。</div>
                  </el-collapse-item>
                </el-collapse>
            </el-form-item>
          </el-form>
        </div>
        <el-tabs v-if="headeNum.length > 0" v-model="tableForm.type" @tab-click="getList(1)">
            <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.type.toString()" :label="item.title" />
        </el-tabs>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column label="ID" prop="notice_config_id" min-width="90" />
        <el-table-column
          prop="notice_title"
          label="通知类型"
          min-width="150"
        />
        <el-table-column
          prop="notice_info"
          label="通知场景说明"
          min-width="150"
        />
        <!-- <el-table-column
          prop="notice_key"
          label="通知键名称"
          min-width="150"
        />         -->
        <el-table-column label="公众号模板" min-width="100">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.notice_wechat == 0 || scope.row.notice_wechat == 1" v-model="scope.row.notice_wechat" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" @click.native="onchangeIsShow(scope.row,'notice_wechat')" />
          </template>
        </el-table-column>
        <el-table-column label="小程序订阅" min-width="100">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.notice_routine == 0 || scope.row.notice_routine == 1" v-model="scope.row.notice_routine" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" @click.native="onchangeIsShow(scope.row,'notice_routine')" />
          </template>
        </el-table-column>
        <el-table-column label="发送短信" min-width="100">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.notice_sms == 0 || scope.row.notice_sms == 1" v-model="scope.row.notice_sms" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" @click.native="onchangeIsShow(scope.row,'notice_sms')" />
          </template>
        </el-table-column>
   
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="onSet(scope.row.notice_config_id)">编辑</el-button> -->
            <el-button type="text" size="small" @click="onChange(scope.row.notice_config_id)">设置</el-button>
          </template> 
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableForm.limit"
          :current-page="tableForm.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>     
    </el-card> 

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
import { messageManageLst, addMessageApi, messageSettingApi, messageStatusApi, syncAppletsApi, syncPublicApi, messageChangeApi } from '@/api/setting'
import { configApi } from '@/api/system'
import { roterPre } from '@/settings'
export default {
  name: 'Notification',
  data() {
    return {
      loading: false,
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableForm: {
        page: 1,
        limit: 20,
        type: '0',
      },
      ruleForm: {
        status: '0'
      },
      headeNum: [
        {type: 0,title: "通知会员"},
        {type: 1,title: "通知商户"},
      ],
      noticeConfig:{
        sms_use_type:0,
      },
      activeName: 1
    }
  },
  computed: {

  },
  mounted() {
    this.getList('')
  },
  methods: {
    add(){
      this.$modalForm(addMessageApi()).then(() => this.getList());
    },
    onSet(id){
      this.$modalForm(messageSettingApi(id)).then(() => this.getList());
    },
    onChange(id){
      this.$modalForm(messageChangeApi(id)).then(() => this.getList());
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableForm.page = num ? num : this.tableForm.page;
      configApi().then(res=> {
        this.noticeConfig = res.data
      })
      messageManageLst(this.tableForm).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    // 同步微信小程序订阅消息
    syncApplet(){
      syncAppletsApi()
        .then(({ message }) => {
          this.$message.success(message);
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    // 同步微信公众号订阅消息
    syncPublic(){
      syncPublicApi()
        .then(({ message }) => {
          this.$message.success(message);
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    // 修改显示状态
    onchangeIsShow(row,key) {
      let data = {status: row[key], key: key}
      messageStatusApi(row.notice_config_id, data)
        .then(({ message }) => {
          this.$message.success(message);
          this.getList('');
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
     pageChange(page) {
      this.tableForm.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableForm.limit = val;
      this.getList('');
    },
  }
}
</script>

<style lang="scss" scoped>
 
</style>
