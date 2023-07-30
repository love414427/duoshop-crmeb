<template>
  <div class="divBox">
    <div class="container">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="页面搜索：">
          <el-input
            v-model="diyFrom.keyword"
            @keyup.enter.native="getList(1)"
            placeholder="请输入页面名称/ID"
            class="selWidth"
            size="small"
          >
            <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="ivu-mt box-wrapper">
      <el-row>
        <el-col :span="24" class="table">
          <div class="acea-row row-between-wrapper">
            <el-row type="flex">
              <el-col v-bind="grid">
                <div class="button acea-row row-middle">
                  <el-button type="primary" @click="add" size="small" style="font-size: 12px"
                    ><i class="el-icon-plus" style="margin-right: 4px" />添加</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table class="tables" :data="list" size="small" ref="table" v-loading="loading">
            <el-table-column prop="id" label="ID" min-width="80" />
            <el-table-column prop="name" label="页面名称" min-width="100" />
            <el-table-column prop="add_time" label="创建时间" min-width="100" />
            <el-table-column prop="update_time" label="更新时间" min-width="100" />
            <el-table-column label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.status"
                  class="copy-data"
                  @click="preview(scope.row)"
                  >预览</el-button
                >
                <el-button type="text" size="small" @click="del(scope.row.id, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :page-sizes="[20, 40, 60, 80]"
              :page-size="diyFrom.limit"
              :current-page="diyFrom.page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="pageChange"
            />
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog :visible.sync="modal" title="预览" width="300px">
      <div v-viewer class="code">
        <vue-qr class="bicode" :text="qrcodeImg" :size="310" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SettingMer from '@/libs/settingMer';
import { roterPre } from '@/settings';
import { microList, microDel, getRoutineCode } from '@/api/diy';
import { mapState } from 'vuex';
// 二维码组件
import VueQr from 'vue-qr';
export default {
  name: 'devise_list',
  computed: {
    ...mapState('layout', ['menuCollapse']),
  },
  components: {
    VueQr,
  },
  data() {
    return {
      grid: {
        sm: 10,
        md: 12,
        lg: 19,
      },
      loading: false,
      theme3: 'light',
      roterPre: roterPre,
      list: [],
      imgUrl: '',
      modal: false,
      BaseURL: SettingMer.httpUrl || 'http://localhost:8080',
      cardShow: 0,
      loadingExist: false,
      isDiy: 1,
      qrcodeImg: '',
      diyFrom: {
        keyword: '',
        page: 1,
        limit: 20,
      },
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  mounted: function () {},
  methods: {
    //小程序二维码
    routineCode(id) {
      getRoutineCode(id)
        .then((res) => {
          this.qrcodeImg = res.data.url;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    preview(row) {
      this.modal = true;
      this.routineCode(row.id);
    },
    // 获取列表
    getList() {
      let storage = window.localStorage;
      this.imgUrl = storage.getItem('imgUrl');
      let that = this;
      this.loading = true;
      microList(this.diyFrom).then((res) => {
        this.loading = false;
        let data = res.data;
        this.list = data.list;
        this.total = data.count;
        let time = new Date().getTime() * 1000;
        let imgUrl = `${that.BaseURL}/pages/index/index?inner_frame=1&time=${time}`;
        storage.setItem('imgUrl', imgUrl);
        that.imgUrl = imgUrl;
      });
    },
    pageChange(status) {
      this.diyFrom.page = status;
      this.getList();
    },
    handleSizeChange(val) {
      this.diyFrom.limit = val;
      this.getList();
    },
    // 编辑
    edit(row) {
      this.$router.push({
        path: `${roterPre}/setting/diy/index`,
        query: { id: row.id, name: row.template_name || 'moren', types: 0 },
      });
    },
    // 添加
    add() {
      this.$router.push({
        path: `${roterPre}/setting/diy/index`,
        query: { id: 0, name: '首页', types: 0 },
      });
    },
    // 删除
    del(id, idx) {
      this.$modalSure('删除模板吗').then(() => {
        microDel(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList();
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.tables {
  margin-top: 20px;
}
.ivu-mt {
  background-color: #fff;
  padding-bottom: 50px;
}
.bnt {
  width: 80px !important;
}
.iframe-box {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #eee;
}
.mask {
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
}
@media (max-width: 2600px) {
  .table {
    display: block;
    flex: 0 0 70%;
    max-width: 70%;
  }
}
@media (max-width: 2175px) {
  .table {
    display: block;
    flex: 0 0 75%;
    max-width: 75%;
  }
}
@media (max-width: 2010px) {
  .table {
    display: block;
    flex: 0 0 75%;
    max-width: 73%;
  }
}
@media (max-width: 1860px) {
  .table {
    display: block;
    flex: 0 0 70%;
    max-width: 70%;
  }
}
@media (max-width: 1597px) {
  .table {
    display: block;
    flex: 0 0 65%;
    max-width: 65%;
  }
}
@media (max-width: 1413px) {
  .table {
    display: block;
    flex: 0 0 60%;
    max-width: 60%;
  }
}
@media (max-width: 1275px) {
  .table {
    display: block;
    flex: 0 0 55%;
    max-width: 55%;
  }
}
@media (max-width: 1168px) {
  .table {
    display: block;
    flex: 0 0 48%;
    max-width: 48%;
  }
}
.code {
  position: relative;
}
.QRpic {
  width: 160px;
  height: 160px;
  margin: 50px auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.left-wrapper {
  background: #fff;
  border-right: 1px solid #dcdee2;
}
.picCon {
  width: 280px;
  height: 510px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 25px;
  .pictrue {
    width: 250px;
    height: 417px;
    border: 1px solid #eeeeee;
    opacity: 1;
    border-radius: 10px;
    margin: 30px auto 0 auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .circle {
    width: 36px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    margin: 13px auto 0 auto;
  }
}
</style>
