<template>
  <div class="divBox">
    <div>
      <div v-if="cardShow==1 || cardShow==2"
        class="product_tabs"
        :style="'padding-right:'+(menuCollapse?105:20)+'px'"
      >
        <div slot="title">
          <div>
            <el-button class="bnt" type="primary" @click="submit" :loading="loadingExist">保存</el-button>
            <el-button class="bnt ml20" @click="reast">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-row class="ivu-mt box-wrapper">
      <el-col :span="3" class="left-wrapper">
        <el-menu default-active="0" width="auto">
          <el-menu-item
            :name="item.id"
            v-for="(item, index) in menuList"
            :key="index"
            :index="index.toString()"
            @click.native="bindMenuItem(index)"        
            >
              {{ item.name }}
            </el-menu-item>
  
        </el-menu>
      </el-col>
      <el-col :span="21" class="right-wrapper">
        <el-card v-if="cardShow==0" shadow="never">
          <el-row v-if="cardShow==0">
            <el-col style="width: 350px;height:550px;margin-right: 10px;position: relative" v-if="isDiy">
              <iframe id="iframe" class="iframe-box" :src="imgUrl" frameborder="0" ref="iframe"></iframe>
              <div class="mask"></div>
            </el-col>
            <el-col :span="24" class="table">
              <div class="acea-row row-between-wrapper">
                <el-row type="flex">
                  <el-col>
                    <div class="acea-row row-between-wrapper">
                      <div class="button acea-row row-middle">
                        <el-button type="primary" size="small" @click="add" style="font-size: 12px;"><i class="el-icon-plus" style="margin-right: 4px;"/>添加</el-button>
                      </div>
                      <div style="color:rgb(246, 44, 44);font-size: 13px;">&nbsp;&nbsp;注：初次进入该页面，可直接添加商城首页模板，也可先复制默认模板，再编辑默认模板保存后设为首页。</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-table
                class="tables"
                :data="list"
                ref="table"
                size="mini"
                v-loading="loading"   
              >
                <el-table-column prop="id" label="页面ID" min-width="80" />
                <el-table-column prop="name" label="模板名称" min-width="100" />
                <el-table-column prop="add_time" label="添加时间" min-width="100" />
                <el-table-column prop="update_time" label="更新时间" min-width="100" />
                <el-table-column label="操作" min-width="150">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="(scope.row.status || scope.row.is_diy) && scope.row.is_default == 0" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" v-if="scope.row.id != 1 && scope.row.is_diy && scope.row.is_default == 0" @click="del(scope.row.id, scope.$index)">删除</el-button>
                    <el-button type="text" size="small" v-if="scope.row.status != 1" @click="setStatus(scope.row, scope.$index)">设为首页</el-button>
                    <!--<el-button type="text" size="small" v-if="scope.row.status || scope.row.is_diy" class="copy-data" @click="preview(scope.row)">预览</el-button>-->
                    <div style="display: inline-block" v-if="!scope.row.is_diy">
                      <el-button type="text" size="small" @click="recovery(scope.row, scope.$index)">恢复初始设置</el-button>
                      <el-button type="text" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
                    </div>
                    <el-button type="text" size="small" v-if="scope.row.status || scope.row.is_diy" @click="onDiyCopy(scope.row)">复制</el-button>
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
        </el-card>
        <shopStreet v-else-if="cardShow==1" ref="shopStreet" @parentFun="getChildData"></shopStreet>
        <users v-else ref="users" @parentFun="getChildData"></users>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="modal" title="预览">
      <div>
        <div v-viewer class="acea-row row-around code">
          <div class="acea-row row-column-around row-between-wrapper">
            <div class="QRpic" ref="qrCodeUrl"></div>
            <span class="mt10">公众号二维码</span>
          </div>
          <div class="acea-row row-column-around row-between-wrapper">
            <div class="QRpic">
              <img v-lazy="qrcodeImg" />
            </div>
            <span class="mt10">小程序二维码</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SettingMer from '@/libs/settingMer'
import { roterPre } from '@/settings'
import ClipboardJS from "clipboard";
import { diyList, diyDel, setStatus, recovery, getRoutineCode, diyCopy } from "@/api/diy";
import { mapState } from "vuex";
import QRCode from 'qrcodejs2'
import shopStreet from './shopStreet'
import users from './users'
export default {
  name: "devise_list",
  computed: {
    ...mapState('layout', [
      'menuCollapse'
    ])
  },
  components: {
    shopStreet,
    users
  },
  data() {
    return {
      grid: {
        sm: 10,
        md: 12,
        lg: 19,
      },
      loading: false,
      theme3: "light",
      roterPre: roterPre,
      menuList:[
        {
          name:'商城首页',
          id:1
        },
        {
          name:'店铺街',
          id:2
        },
        {
          name:'个人中心',
          id:3
        },
      ],
      list: [],
      imgUrl:'',
      modal: false,
      BaseURL: SettingMer.httpUrl || 'http://localhost:8080',
      cardShow: 0,
      loadingExist: false,
      isDiy: 1,
      qrcodeImg: '',
      diyFrom: {
        page: 1,
        limit: 20
      },
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  mounted: function() {
    // this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
  },
  methods: {
   
    getChildData(e){
      this.loadingExist = e
    },
    submit(){
      if(this.cardShow==1){
        this.$refs.shopStreet.onSubmit()
      }else {
        this.$refs.users.onSubmit()
      }
    },
    reast(){
      if(this.cardShow==1){
        this.$refs.shopStreet.getInfo()
      }else {
        this.$refs.users.getInfo();
      }
    },
    bindMenuItem(index) {
      this.cardShow = index;
    },
    onCopy() {
      this.$message.success("复制预览链接成功");
    },
    onError() {
      this.$mssage.error("复制预览链接失败");
    },
    //生成二维码
    creatQrCode(id,status) {
      this.$refs.qrCodeUrl.innerHTML = ''
			let url = '';
			if(status){
				url = `${this.BaseURL}/pages/index/index?inner_frame=1`;
			}else{
        let time = new Date().getTime() * 1000
				url= `${this.BaseURL}/pages/index/index?inner_frame=1&time=${time}`;
			}
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: url, // 需要转换为二维码的内容
        width: 160,
        height: 160,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    //小程序二维码
    routineCode(id){
      getRoutineCode(id).then(res=>{
        this.qrcodeImg = res.data.image;
      }).catch(err=>{
        this.$message.error(err);
      })
    },
    preview(row){
      this.modal = true;
      this.creatQrCode(row.id,row.status);
      this.routineCode(row.id);
    },
    // 获取列表
    getList() {
      let storage = window.localStorage;
      this.imgUrl = storage.getItem('imgUrl');
      let that = this
      this.loading = true;
      diyList(this.diyFrom).then((res) => {
        this.loading = false;
        let data = res.data;
        this.list = data.list;
        this.total = data.count;
        let time = new Date().getTime() * 1000
        let imgUrl = `${that.BaseURL}/pages/index/index?inner_frame=1&time=${time}`;
        storage.setItem('imgUrl',imgUrl)
        that.imgUrl = imgUrl;
      });
    },
    pageChange(status) {
      this.diyFrom.page = status;
      this.getList();
    },
    handleSizeChange(val) {
      this.diyFrom.limit = val
      this.getList()
    },
    // 编辑
    edit(row) {
      this.$router.push({
          path: `${roterPre}/setting/diy/index`,
          query: { id: row.id, name: row.template_name || "moren", types: 1 },
      });
    },
    // 添加
    add() {
      this.$router.push({
        path: `${roterPre}/setting/diy/index`,
        query: { id: 0, name: "首页", types: 1 },
      });
    },
    // 删除
    del(id,idx) {
      this.$modalSure('删除模板吗').then(() => {
        diyDel(id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    // 使用模板
    async setStatus(row) {
      let that = this
      that.$modalSure("把该模板设为首页").then(() => {
        setStatus(row.id).then((res) => {
            that.$message.success(res.message);
            that.getList();
          }).catch((res) => {
            that.$message.error(res.message);
          });
        })
    },
    recovery(row) {
      recovery(row.id).then((res) => {
        this.$message.success(res.message);
        this.getList();
      });
    },
    onDiyCopy(row) {
      diyCopy(row.id).then(() => {
        this.getList()
      }).catch(res => {
        this.$message.error(res.message);
      })
    }
  },
};
</script>

<style scoped lang="scss">
  /deep/.spike-bd .spike-distance .bg-red{
    width: 45px;
  }
  .product_tabs{
    padding: 16px 32px;
    background: #fff;
    border-bottom: 1px solid #e8eaec;
    text-align: right;
  }
  .el-menu-item{
    height: 47px;
  }
  .el-menu-item.is-active::after{
    content: "";
    display: block;
    width: 2px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background: #2d8cf0;
  }
  .tables{
    margin-top: 20px;
  }
  .ivu-mt{
    background-color: #fff;
    padding-bottom: 50px;
  }
  .bnt{
    width: 80px!important;
  }
  .iframe-box{
    width: 350px;
    height: 100%;
    border-radius: 10px;
    border: 1px solid #eee;
  }
  .mask{
    position: absolute;
    left:0;
    width: 100%;
    top:0;
    height: 100%;
    background-color: rgba(0,0,0,0);
  }
  @media (max-width: 2600px){
    .table {
      display: block;
      flex: 0 0 70%;
      max-width: 70%;
    }
  }
  @media (max-width: 2175px){
    .table {
      display: block;
      flex: 0 0 75%;
      max-width: 75%;
    }
  }
  @media (max-width: 2010px){
    .table {
      display: block;
      flex: 0 0 75%;
      max-width: 73%;
    }
  }
  @media (max-width: 1860px){
    .table {
      display: block;
      flex: 0 0 70%;
      max-width: 70%;
    }
  }
  @media (max-width: 1597px){
    .table {
      display: block;
      flex: 0 0 65%;
      max-width: 65%;
    }
  }
  @media (max-width: 1413px){
    .table {
      display: block;
      flex: 0 0 60%;
      max-width: 60%;
    }
  }
  @media (max-width: 1275px){
    .table {
      display: block;
      flex: 0 0 55%;
      max-width: 55%;
    }
  }
  @media (max-width: 1168px){
    .table {
      display: block;
      flex: 0 0 48%;
      max-width: 48%;
    }
  }
  .code{
    position: relative;
  }
  .QRpic {
    width: 160px;
    height: 160px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .left-wrapper {
    background: #fff;
    border-right: 1px solid #dcdee2;
  }
  .picCon{
    width: 280px;
    height: 510px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 25px;
    .pictrue{
      width: 250px;
      height: 417px;
      border: 1px solid #EEEEEE;
      opacity: 1;
      border-radius: 10px;
      margin: 30px auto 0 auto;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .circle{
      width: 36px;
      height: 36px;
      background: #FFFFFF;
      border: 1px solid #EEEEEE;
      border-radius: 50%;
      margin: 13px auto 0 auto;
    }
  }
</style>
