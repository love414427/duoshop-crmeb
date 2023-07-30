<template>
  <div class="divBox">
    <el-card class="box-card mb20" :body-style="{ padding: '0 20px 20px' }">
      <el-tabs v-if="tabList.length > 0" v-model="currentTab">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :name="item.value" :label="item.title" />
      </el-tabs>
      <el-form
        ref="formValidate"
        v-loading="fullscreenLoading"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="110px"
        @submit.native.prevent
      >
        <div v-show="currentTab == 1">
          <el-form-item label="边框名称" prop="activity_name">
            <el-input v-model="formValidate.activity_name" size="small" class="selWidth" placeholder="请输入边框名称" />
          </el-form-item>
          <el-form-item label="活动时间：" required>
            <el-date-picker
              v-model="timeVal"
              size="small"
              type="datetimerange"
              placement="bottom-end"
              placeholder="请选择显示时间"
              :default-time="['00:00:00', '23:59:59']"
              @change="onchangeTime"
              class="selWidth"
            />
            <p class="desc mt10">设置活动氛围图在商城展示时间</p>
          </el-form-item>
          <el-form-item label="边框图：">
            <div class="upLoadPicBox" @click="modalPicTap('1', 'dan')">
              <div v-if="formValidate.pic" class="pictrue"><img :src="formValidate.pic" /></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
            <p class="desc mt10">宽750px，高750px
              <el-popover
                placement="bottom-start"
                title=""
                min-width="200"
                trigger="hover"
                >
                <img :src="`${baseURL}/statics/system/activityBackground.png`" style="height:270px;" alt="">
                <el-button type="text" slot="reference">查看示例</el-button>
              </el-popover>
            </p>
          </el-form-item>
          <el-form-item label="是否开启:">
            <el-switch
              :width="56"
              v-model="formValidate.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
            />
          </el-form-item>
        </div>
        <div v-show="currentTab == 2">
          <el-form-item label-width="0">
            <el-radio-group v-model="formValidate.scope_type">
              <el-radio :label="0">全部商品参与</el-radio>
              <el-radio :label="1">指定商品参与</el-radio>
              <el-radio :label="2">指定分类参与</el-radio>
              <el-radio :label="3">指定商户参与</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formValidate.scope_type == 1" label-width="0">
            <el-button size="small" type="primary" @click="addGoods">添加商品</el-button>
            <el-button size="small" @click="batchDel" :disabled="!multipleSelection.length">批量删除</el-button>
          </el-form-item>
          <el-form-item v-if="formValidate.scope_type == 1" label-width="0">
            <el-table
              ref="tableList"
              v-loading="listLoading"
              :data="tableData.data"
              style="width: 100%"
              size="mini"
              @selection-change="handleSelectionChange"
              @select-all="selectAll"
              @select="selectOne"
            >
              <el-table-column type="selection" width="55"> </el-table-column>

              <el-table-column prop="product_id" width="90">
                <template slot="header" slot-scope="scope">
                  <el-dropdown szie="mini" @command="handleCommand">
                    <span class="el-dropdown-link">选择页<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="item in options" :key="item.value" :command="item.value">{{
                        item.label
                      }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
              <el-table-column label="商品图" min-width="80">
                <template slot-scope="scope">
                  <div class="demo-image__preview">
                    <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" />
                  </div>  
                </template>
              </el-table-column>
              <el-table-column prop="store_name" label="商品名称" min-width="200" />
              <el-table-column prop="price" label="售价" min-width="90" />
              <el-table-column prop="sales" label="库存" min-width="70" />
              <el-table-column
                label="操作"
                min-width="140"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          </el-form-item>
          <el-form-item v-if="formValidate.scope_type == 2" label="选择分类:" :span="24" label-width="80px" prop="cate_ids">
            <el-cascader v-model="formValidate.cate_ids" class="selWidth" :props="props" :options="categoryList" multiple :show-all-levels="false" clearable />
          </el-form-item>
          <el-form-item label="选择商户:" v-if="formValidate.scope_type == 3" :span="24" label-width="80px" prop="mer_ids">
            <el-select v-model="formValidate.mer_ids" placeholder="请选择" class="selWidth" clearable multiple filterable>
              <el-option v-for="item in merchantList" :key="item.mer_id" :label="item.mer_name" :value="item.mer_id" />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="fixed-card">
      <el-button v-show="currentTab == 1" size="small" type="primary" @click="currentTab = '2'">下一步</el-button>
      <el-button v-show="currentTab == 2" size="small" @click="currentTab = '1'">上一步</el-button>
      <el-button v-show="currentTab == 2" size="small" type="primary" @click="submitForm('formValidate')"
        >保存</el-button
      >
    </el-card>
    <goodsList ref="goodsList" @onSelectList="selectList" />
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
import { borderDetailApi, borderUpdateApi, selectProductList, createBorder } from '@/api/marketing';
import { merSelectApi, categoryListApi } from '@/api/product';
import SettingMer from '@/libs/settingMer'
import { roterPre } from '@/settings';
import goodsList from '../../atmosphere/atmosphereList/goodsList.vue';
export default {
  name: 'addBorder',
  data() {
    return {
      baseURL: SettingMer.httpUrl || 'http://localhost:8080',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      props: { multiple: true, emitPath: false},
      roterPre: roterPre,
      currentTab: '1',
      tabList: [
        { value: '1', title: '基础设置' },
        { value: '2', title: '使用范围' },
      ],
      fullscreenLoading: false,
      timeVal: '',
      formValidate: {
        activity_name: '',
        start_time: '',
        end_time: '',
        pic: '',
        cate_ids: [],
        mer_ids: [],
        is_show: 0,
        scope_type: 0,
        spu_ids: [],
      },
      ruleValidate: {
        activity_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      listLoading: false,
      selectGoods: false,
      multipleSelection: [],
      categoryList: [],
      merchantList: [],
      tableData: {
        data: [],
        total: 0,
      },
      options: [
        {
          value: 'all',
          label: '所有页',
        },
        {
          value: 'one',
          label: '当前页',
        },
      ],
      tableFrom: {
        page: 1,
        limit: 20,
        spu_ids: [],
      },
      ids: [],
    };
  },
  components: {
    goodsList,
  },
  computed: {
    isEdit() {
      return this.$route.params.id ? true : false;
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.setTagsViewTitle();
      this.getInfo(this.$route.params.id);
    }
    this.getMerSelect();
    this.getCategorySelect();
  },
  methods: {
    // 活动时间
    onchangeTime(e) {
      this.timeVal = e;
      this.formValidate.start_time = e ? this.moment(e[0]).format('YYYY-MM-DD HH:mm:ss') : '';
      this.formValidate.end_time = e ? this.moment(e[1]).format('YYYY-MM-DD HH:mm:ss') : '';
    },
    //上传图片
    modalPicTap(type, num) {
      const _this = this;
      this.$modalUpload(function (img) {
        _this.formValidate.pic = img[0];
      }, type);
    },
    setTagsViewTitle() {
      const title = '编辑商品边框';
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.$route.params.id}`,
      });
      this.$store.dispatch('tagsView/updateVisitedView', route);
    },
    // 商户列表；
    getMerSelect() {
      merSelectApi().then(res => {
        this.merchantList = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 商品分类
    getCategorySelect() {
      categoryListApi({type: 1}).then(res => {
        this.categoryList = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 氛围图详情
    getInfo(id) {
      this.fullscreenLoading = true;
      borderDetailApi(id)
        .then((res) => {
          let info = res.data
          this.formValidate = {
            activity_name: info.activity_name,
            start_time: info.start_time,
            end_time: info.end_time,
            cate_ids: info.cate_ids,
            mer_ids: info.mer_ids,
            spu_ids: info.spu_ids,
            pic: info.pic,
            is_show: info.is_show,
            scope_type: info.scope_type
          };
          this.fullscreenLoading = false;
          this.timeVal = [new Date(res.data.start_time), new Date(res.data.end_time)];
          if(info.scope_type == 1) {
            this.$set(this.tableFrom, 'spu_ids', info.spu_ids);
            this.getList('');
          } 
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.fullscreenLoading = false;
        });
    },
    addGoods() {
      this.$refs.goodsList.dialogVisible = true;
    },
    //选择完商品确定方法
    selectList(spu_ids) {
      this.listLoading = true;
      console.log(...spu_ids);
      if (this.tableFrom.spu_ids.length) {
        //如果spu_ids有长度，就push商品id，并且去重以后重新请求列表
        this.tableFrom.spu_ids.push(...spu_ids);
        this.tableFrom.spu_ids = [...new Set(this.tableFrom.spu_ids)];
      } else {
        this.$set(this.tableFrom, 'spu_ids', spu_ids);
      }
      this.getList('');
    },
    getList(num) {
      this.tableFrom.page = num || this.tableFrom.page;
      selectProductList({
        spu_ids: this.tableFrom.spu_ids.toString(),
        page: this.tableFrom.page,
        limit: this.tableFrom.limit,
      })
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          if (this.selectAllPage == 'all') {
            this.multipleSelection.push(...this.tableData.data);
            this.multipleSelection.forEach((row) => {
              this.$refs.tableList.toggleRowSelection(row, true);
            });
          }

          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.listLoading = false;
        });
    },
    //行删除
    handleDelete(index, row) {
      this.tableData.data.splice(index, 1);
      let i = this.tableFrom.spu_ids.findIndex((item) => item == row.product_id);
      this.tableFrom.spu_ids.splice(i, 1);
    },
    //批量删除
    batchDel() {
      let d = this.tableData.data;
      this.$refs.tableList.selection.forEach((Ele, index) => {
        for (var j = 0; j < this.tableFrom.spu_ids.length; j++) {
          var t = this.tableFrom.spu_ids[j];
          if (t == Ele.spu_ids) {
            this.tableFrom.spu_ids.splice(j, 1);
          }
        }
        for (var i = 0; i < d.length; i++) {
          var t = d[i].spu_id;
          if (t == Ele.spu_id) {
            d.splice(i, 1);
          }
        }
        this.multipleSelection = [];
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const data = [];
      this.multipleSelection.map((item) => {
        data.push(item.spu_id);
      });
    },
    selectAll(data) {
      let id = data.map((i, index) => {
        return i.spu_id;
      });
      this.ids = Array.from(new Set([...this.ids, ...id]));
    },
    selectOne(data,row) {
      let id = data.map((i, index) => {
        return i.spu_id;
      });
      let index = this.ids.findIndex((e) => {
        return e == row.spu_id;
      });
      this.ids.splice(index, 1);
      this.ids = Array.from(new Set([...this.ids, ...id]));
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
      this.selectAllPage = command === 'all';
      this.$nextTick(() => {
        this.$refs.tableList.toggleAllSelection();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
       if (valid) {
          this.formValidate.spu_ids =  this.tableFrom.spu_ids.toString();
          if (this.formValidate.scope_type == 1 && this.formValidate.spu_ids == "") return this.$message.error('请选择商品');
          if (this.formValidate.pic == '') return this.$message.error('请上传氛围图');
          this.isEdit
            ? borderUpdateApi(this.$route.params.id, this.formValidate)
                .then((res) => {
                  this.$message.success(res.message);
                  this.$router.push({ path: this.roterPre + '/marketing/border/list' });
                })
                .catch((res) => {
                  this.$message.error(res.message);
                })
            : createBorder(this.formValidate)
                .then((res) => {
                  this.$message.success(res.message);
                  this.$router.push({ path: this.roterPre + '/marketing/border/list' });
                })
                .catch((res) => {
                  this.$message.error(res.message);
                });
        } else {
          return false;
        }
      });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList('');
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__item {
  height: 52px !important;
  line-height: 52px !important;
}
.desc {
  color: #999;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
}
.el-form-item {
  margin-bottom: 20px;
}
/deep/.el-input__suffix {
  right: 10px;
  line-height: 32px;
}
.fixed-card {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  box-shadow: 0 -1px 2px rgb(240, 240, 240);
  text-align: center;
}
.selWidth {
  width: 460px !important;
}
</style>
