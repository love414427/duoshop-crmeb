<template>
  <div class="divBox">
    <el-card v-loading="fullscreenLoading" class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">模板类型：</span>
            <el-select v-model="tableFrom.type" placeholder="请选择" clearable class="filter-item selWidth mr20" @change="userSearchs">
              <el-option label="验证码" :value="1" />
              <el-option label="通知" :value="2" />
              <el-option label="推广" :value="3" />
            </el-select>
          </div>
        </div>
        <el-button size="small" type="primary" @click="apply">申请短信模板</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        highlight-current-row
      >
        <el-table-column
          prop="id"
          label="ID"
          min-width="50"
        />
        <el-table-column
          prop="templateid"
          label="模板ID"
          min-width="80"
        />
        <el-table-column
          prop="title"
          label="模板名称"
          min-width="120"
        />
        <el-table-column
          prop="content"
          label="模板内容"
          min-width="500"
        />
        <el-table-column
          prop="type"
          label="模板类型"
          min-width="100"
        />
        <el-table-column label="模板状态">
          <template slot-scope="{row}">
            <span>{{ row.status ? '可用' : '不可用' }}</span>
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
    <!--短信模板弹框-->
    <el-dialog v-if="dialogVisible" title="申请短信模板" :visible.sync="dialogVisible" width="700px">
      <el-form @submit.native.prevent size="small" label-width="100px">
        <el-form-item label="模板名称：" class="width100" prop="title">
          <el-input v-model="form.title" type="text" :placeholder="placeholder.title" class="selwidths" size="small" />
        </el-form-item>
        <el-form-item label="模板内容：" class="width100" prop="content">
          <el-input v-model="form.content" type="textarea" :placeholder="placeholder.content" class="selwidths" size="small" />
        </el-form-item>
        <el-form-item label="模板类型：">
          <el-radio-group v-model="form.type" @change="changeRadioText">
            <el-radio :label="1">验证码</el-radio>
            <el-radio :label="2">通知</el-radio>
            <el-radio :label="3">推广</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="use-template-dialog-footer">
        <el-button type="primary" @click="add">确定</el-button>
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
import { smsTempLstApi, tempCreateApi } from '@/api/sms'
import { roterPre } from '@/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'SmsTemplate',

  data() {
    return {
      fullscreenLoading: false,
      listLoading: false,
      dialogVisible: false,
      tableData: {
        data: [],
        total: 0
      },
      form: {
        title: '',
        content: '',
        type: 1
      },
      placeholder: {},
      placeholderObj:[
        {
          title: '例如：注册验证码',
          content: '例如：您的验证码是：{$code}，有效期为{$time}分钟。如非本人操作，可不予理会.'
        },
        {
          title: '例如：订单支付成功通知',
          content: '例如：您购买的商品已支付成功，支付金额{$pay_price}元，订单号{$order_id},感谢您的光临！'
        },
        {
          title: '例如：国庆优惠活动',
          content: '10月1日-8日期间 全场商品满1000减200，国庆欢乐购，立即查看http://mer.crmeb.net/admin.'
        }
      ],
      tableFrom: {
        page: 1,
        limit: 20,
        type: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  mounted() {
    console.log(this.isLogin);
    this.getList('')
    this.changeRadioText();
  },
  methods: {

    changeRadioText(){
      this.placeholder=this.placeholderObj[this.form.type-1]
    },
    // 查看是否登录
    onIsLogin() {
      this.fullscreenLoading = true
      this.$store.dispatch('user/isLogin').then(async res => {
        const data = res.data
        if (!data.status) {
          this.$message.warning('请先登录')
          this.$router.push(roterPre + '/sms/config?url=' + this.$route.path)
        } else {
          this.getList('')
        }
        this.fullscreenLoading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.$router.push(roterPre + '/sms/config?url=' + this.$route.path)
        this.fullscreenLoading = false
      })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      smsTempLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.data
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
         this.$router.push(roterPre + '/setting/sms/sms_config/index')
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    // 表格搜索
    userSearchs() {
      this.getList(1)
    },
    // 申请
    apply(){
      this.form={title: '',content: '',type: 1};
      this.dialogVisible = true;
      this.changeRadioText();
    },
    // 添加
    add() {
      if(!this.form.title || !this.form.content){
        this.$message.error('请提前写完信息！');
      }else{
        tempCreateApi(this.form).then(({ message }) => {
          this.$message.success('申请成功!')
          this.dialogVisible = false
          this.$router.push(roterPre + '/sms/applyList')
        })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      }
    }
  },

}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 350px !important;
  }
</style>
