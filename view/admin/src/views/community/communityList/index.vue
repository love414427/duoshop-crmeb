<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small" label-width="110px">
            <el-form-item label="审核状态">
              <el-select
                v-model="tableFrom.status"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.category_id"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option
                  v-for="item in cateSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="话题名称：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.topic_id"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
               >
                <el-option
                  v-for="item in topicSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-select
                v-model="tableFrom.is_show"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option label="显示" value="1"/>
                <el-option label="不显示" value="0"/>
              </el-select>
            </el-form-item>
            <el-form-item label="作者：">
              <el-input v-model="tableFrom.username" @keyup.enter.native="getList(1)" placeholder="请输入文章作者" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="关键字：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入文章标题" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            
          </el-form>
        </div>
        <el-tabs v-if="headeNum.length > 0" v-model="tableFrom.is_type" @tab-click="getList(1)">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.type.toString()" :label="item.title +'('+item.count +')' " />
        </el-tabs>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          label="ID"
          prop="community_id"
          min-width="100" />       
        <el-table-column
          label="标题"
          prop="title"
          min-width="100" />
        <el-table-column
          label="作者"
          prop="author.nickname"
          min-width="100" />
        <!-- <el-table-column key="1" label="视频" min-width="210">
          <template slot-scope="scope">
            <div>
             <video style="width:40%;height: 180px;border-radius: 10px;" :src="scope.row.video_link" controls="controls">
            您的浏览器不支持 video 标签。
            </video>
            </div>
          </template>
        </el-table-column>  -->
        <el-table-column :label="tableFrom.is_type == 1 ? '图文封面' : '视频封面图'" min-width="210">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                v-for="(item,index) in scope.row.image"
                :key="index"
                :src="item"
                class="mr5"
                :preview-src-list="[item]"
              />
            </div>
          </template>
        </el-table-column>  
        <el-table-column label="推荐级别"  min-width="150">
          <template slot-scope="scope">
            <el-rate
            disabled
            v-model="scope.row.start"
            :colors="colors">
           </el-rate>
          </template>
        </el-table-column>    
        <el-table-column
          prop="count_start"
          label="点赞数"
          min-width="100"
        />
        <el-table-column
          prop="count_reply"
          label="评论数"
          min-width="100"
        />
         <el-table-column
          label="分类"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category && scope.row.category.cate_name || '暂无'  }}</span>
          </template>
        </el-table-column>
         
        <el-table-column
          label="话题"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.topic && scope.row.topic.topic_name || ''  }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发布时间"
          min-width="100"
        />     
        <el-table-column
          prop="status"
          label="是否显示"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.status | communityStatus }}</span>
            <span
              v-if="scope.row.status == -1"
              style="display: block; font-size: 12px; color: red;"
            >原因 {{ scope.row.refusal }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
             <el-button type="text" size="small" @click="onDetail(scope.row.community_id)">详情</el-button>
            <el-button v-if="scope.row.status == 0 || scope.row.status == -2" type="text" size="small" @click="onAudit(scope.row.community_id)">审核</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row.community_id)">编辑星级</el-button>
            <el-button v-if="scope.row.status == 1" type="text" size="small" @click="onOff(scope.row.community_id)">强制下架</el-button>
            <el-button type="text" size="small" @click="onReply(scope.row.community_id)">查看评论</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.community_id, scope.$index)">删除</el-button>
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
    <!--审核-->
    <el-dialog v-if="dialogVisible" :title="isExamine ? '审核' : '详情'" :visible.sync="dialogVisible" width="700px">
      <div v-loading="loading">
       <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="formData.type == 1 ? '图片：' : '短视频封面：'">
          <div v-for="(item, index) in formData.image" :key="index" style="display: inline-block; margin: 0 10px 10px 0">
            <el-image
                style="width: 80px; height: 80px"
                :src="item || ''"
                :preview-src-list="[item?item:'']"
              />
          </div>
        </el-form-item>
        <el-form-item v-if="formData.is_type == 2" label="短视频：">
          <div style="margin: 0 10px 10px 0">
           <video style="width:40%;height: 180px;border-radius: 10px;" :src="formData.video_link" controls="controls">
            您的浏览器不支持 video 标签。
            </video>
          </div>
        </el-form-item>
        <el-form-item label="文章内容：">
          <div>{{formData.content}}</div>
        </el-form-item>
        <el-form-item v-if="formData.topic && formData.topic.topic_name" label="话题：">
          <div>{{formData.topic.topic_name}}</div>
        </el-form-item>
        <el-form-item v-if="formData.relevance && formData.relevance.length > 0" label="关联商品：">
          <el-table
            :data="formData.relevance"
            style="width:100%;position:relative;top:-10px;"
            size="small"
          >
            <el-table-column prop="spu.store_name" label="商品名称" min-width="120" />
            <el-table-column label="商品图" min-width="60">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image style="width: 35px; height: 35px" v-if="scope.row.spu" :src="scope.row.spu.image" class="mr5" :preview-src-list="[scope.row.spu.image]" />
              </div>
              </template>
            </el-table-column>
            <el-table-column prop="spu.price" label="售价" min-width="60" />
          </el-table>
        </el-form-item>
        <el-form-item label="作者：" >
          <span>{{formData.author && formData.author.nickname}}</span>
        </el-form-item>
        <el-form-item label="作者ID：">
          <span>{{formData.author && formData.author.uid}}</span>
        </el-form-item>
        <el-form-item label="发布时间：">
          <span>{{formData.create_time}}</span>
        </el-form-item>
        <el-form-item v-if="!isExamine && formData.status==1" label="审核通过时间：">
          <span>{{formData.status_time}}</span>
        </el-form-item>
        <el-form-item v-if="isExamine" label="审核状态：" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="-1">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.status===-1 && isExamine" label="原因" prop="refusal">
          <el-input v-model="ruleForm.refusal" type="textarea" placeholder="请输入原因" />
        </el-form-item>
        <el-form-item v-if="isExamine">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
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
  communityListApi, communityStatusApi, communityUpdateApi, communityAuditApi, communityDetailApi, communityDeleteApi, communityOffApi,
   communityCateOptionApi, communityTopicOptionApi, communityTitleApi
} from '@/api/community'
export default {
  name: 'communityTopic',
  data() {
    return {
      moren: require("@/assets/images/f.png"),
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      isChecked: false,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        is_type: '1',
        status: "",
        keyword: "",
        username: "",
        category_id: "",
        topic_id: ""
      },
      statusList: [
        { label: "审核通过", value: 1 },
        { label: "待审核", value: 0 },
        { label: "审核未通过", value: -1 },
        { label: "下架", value: -2 },
      ],
      headeNum: [
        {title: "图文内容", count: 18, type: 1},
        {title: "短视频内容", count: 30, type: 2},
      ],
      cateSelect: [],
      topicSelect: [],
      dialogVisible: false,
      loading: false,
      isExamine: false,
      community_id: "",
      formData: {},
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        refusal: [
          { required: true, message: '请填写拒绝原因', trigger: 'blur' }
        ]
      },
      ruleForm: {
        refusal: '',
        status: 1,
      },
    }
  },
  mounted() {
    this.getList(1)
    this.getCateSelect()
    this.getTopicSelect()
    this.getHeaderData()
  },
  methods: {
    // 分类列表；
    getCateSelect() {
      communityCateOptionApi()
        .then((res) => {
          this.cateSelect = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
     // tab栏标题
    getHeaderData() {
      communityTitleApi()
        .then((res) => {
          this.headeNum = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 话题列表；
    getTopicSelect() {
      communityTopicOptionApi()
        .then((res) => {
          this.topicSelect = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      communityListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
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
    // 编辑
    onEdit(id) {
      this.$modalForm(communityUpdateApi(id)).then(() => this.getList(''))
    },
    // 查看评论
    onReply(id) {
      this.$router.push({
        path: "reply",
        query: {
          community_id: id,
        },
      });
    },
    // 审核
    onAudit(id) {
      this.community_id = id;
      this.dialogVisible = true;
      this.isExamine = true;
      communityDetailApi(id).then((res) => {
        this.formData = res.data
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 详情
    onDetail(id) {
      this.community_id = id;
      this.dialogVisible = true;
      this.isExamine = false;
      communityDetailApi(id).then((res) => {
        this.formData = res.data
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 强制下架
    onOff(id){
      this.$modalForm(communityOffApi(id)).then(() => this.getList(''))
    },
    onSubmit() {
      communityAuditApi(this.community_id,this.ruleForm).then(res => {
        this.$message.success(res.message)
        this.dialogVisible = false
        this.getList('')
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('确定删除该文章').then(() => {
        communityDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.getList('')
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    onchangeIsShow(row) {
      communityStatusApi(row.community_id, row.is_show).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.box-container .list.image {
  margin-bottom: 40px;
}
.box-container .list.image img {
  position: relative;
  top: 40px;
}
/deep/.el-form-item__content .el-rate{
  position: relative;
  top: 8px;
}
</style>
