<template>
<!-- 装修-页面数据 -->
  <div class="divBox">
    <el-card :bordered="false" dis-hover class="ivu-mt">
      <el-row class="ivu-mt box-wrapper">
        <el-col :xs="24" :sm="24" :md="6" :lg="4" class="left-wrapper" v-if="!$route.params.id && groupAll.length">
          <!-- 左侧菜单 --> 
          <el-menu default-active="0" width="auto" >
            <el-menu-item :name="item.group_id" class="menu-item" v-for="(item,index) in groupAll" :key="index+ 'menu'"
              :index="index.toString()" @click.native='edits(item)'>
                {{item.group_name}}
            </el-menu-item>  
          </el-menu>
        </el-col>
        <!-- 自定义配置页面展示 -->
				<el-col v-if="name == 'integral_shop_banner'" class="iframe" :bordered="false">
					<div class="iframe-box">
						<img src="../../../assets/images/integral.png" style="width: 100%;">
						<div class="moddile_goods">
							<div class="nofonts" v-if="tabList.list == ''">暂无照片，请添加~</div>
							<swiper v-else :options="swiperOption" class="pcswiperimg_goods">
							    <swiper-slide class="swiperimg_goods" v-for="(item,index) in tabList.list">
									<img :src="item.pic" >
								</swiper-slide>
							</swiper>
						</div>
					</div>
				</el-col>
				<el-col v-if="name != 'sign_day_config' && name != 'integral_shop_banner' && guide != 2" class="iframe">
				   <iframe :src="url" id="iframe" scrolling="no" class="iframe-box" frameborder="0" ref="iframe"></iframe>
				    <div class="moddile"></div>
					<div v-if="name == 'new_home_banner' || name == 'hot_home_banner' || name == 'best_home_banner' || name == 'good_home_banner' || name == 'points_mall_banner'" class="moddile_box">
						<div class="nofonts" v-if="tabList.list == ''">暂无照片，请添加~</div>
						<swiper v-else :options="swiperOption" class="swiperimg">
						    <swiper-slide class="swiperimg" v-for="(item,index) in tabList.list" :key="index + 'c'">
								<img :src="item.pic" >
							</swiper-slide>
						</swiper>
					</div>
          <div class="district-main" v-if="name == 'points_mall_district'">
            <div class="nofonts" v-if="tabList.list == ''">暂无内容，请添加~</div>
            <ul v-else class="district-count">
              <li v-for="(item,index) in tabList.list" :key="index + 'c'"  class="district-list">
                <template v-if="index<=9">
                  <img :src="item.pic" class="image">
                  <div class="name">{{item.name}}</div>
                </template>
              </li>
            </ul>
            <div v-if="tabList.list.length>10" class="district-pagition">
              <span class="active" :style="'background-color:'+bgCol"></span>
              <span></span>
            </div>
          </div>
				</el-col>
				<el-col v-if="name == 'sign_day_config'" class="iframe">
					<div class="iframe-box"> 
            <img v-if="bgimg == 0" src="../../../assets/images/purplesign.png">
						<img v-if="bgimg == 1" src="../../../assets/images/bluesgin.png">
						<img v-if="bgimg == 2" src="../../../assets/images/greesgin.png">
						<img v-if="bgimg == 3" src="../../../assets/images/redsgin.png">
						<img v-if="bgimg == 4" src="../../../assets/images/pinksgin.png">
						<img v-if="bgimg == 5" src="../../../assets/images/oragesgin.png">
					</div>
				</el-col>
        <!-- <el-col v-if="name == 'points_mall_scope'" class="iframe">
					<div class="iframe-box">
						<img src="../../../assets/images/points_mall.png">
					</div>
				</el-col> -->
        <el-col v-if="guide == 2">
          <div v-if="guide == 2" class="iframe" :bordered="false">
            <div class="nofonts" v-if="tabList.list == ''">暂无照片，请添加~</div>
            <swiper :options="swiperOption" class="swiperimg on">
              <swiper-slide class="swiperimg on" v-for="(item,indexa) in tabList.list" :key="indexa + 'a'">
                <img :src="item.pic" >
              </swiper-slide>
            </swiper>
          </div>
        </el-col>
				<el-col v-if="name == 'sign_day_config'" :xs="24" :sm="24" :md="14" :lg="11" class="ml20 right-wrapper">
					<div class="table_box">
						<el-row type="flex">
							<el-col v-bind="grid">
								<div class="title">连续签到奖励</div>
								<el-button type="primary" size="small" @click="groupAdd()" class="mt30 ml14">添加数据</el-button>
							</el-col>
						</el-row>
						<div class="table">
							<el-table :data="sginList" size="small"  ref="table" class="mt25" :loading="loading">
                <el-table-column
                  key="1"
                  prop="group_data_id"
                  label="编号"
                  width="50">
                </el-table-column>
                <el-table-column
                  key="2"
                  prop="sign_day"
                  label="第几天"
                  width="120">
                </el-table-column>
                <el-table-column
                  key="3"
                  prop="sign_integral"
                  label="获取积分"
                  width="120">
                </el-table-column>
                <el-table-column
                  key="4"
                  prop="status"
                  label="是否可用"
                  width="120">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.status"
                      :active-value="1"
                      :inactive-value="0"
                      active-text="显示"
                      inactive-text="隐藏"
                      @change="onchangeIsShow(scope.row)"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  key="5"
                  prop="sort"
                  label="排序"
                  width="80">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
							</el-table>
              <div class="block">
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="pageChange"
                  :total="total"
                  :page-count="total"
                  :page-size="7"
                  >
                </el-pagination>
              </div>
						</div>
					</div>
				</el-col>
        <el-col v-if="name == 'points_mall_scope'" :xs="24" :sm="24" :md="14" :lg="11" class="ml20 right-wrapper">
					<div class="table_box">
						<el-row type="flex">
							<el-col v-bind="grid">
								<div class="title">积分范围设置</div>
								<el-button type="primary" size="small" @click="groupAdd()" class="mt30 ml14">添加数据</el-button>
							</el-col>
						</el-row>
						<div class="table">
							<el-table :data="cmsList" size="small"  ref="table" class="mt25" :loading="loading">
                <el-table-column
                  key="6"
                  prop="group_data_id"
                  label="编号"
                  width="50">
                </el-table-column>
                <el-table-column
                  key="18"
                  prop="title"
                  label="标题"
                  width="120">
                </el-table-column>
                <el-table-column
                  key="7"
                  prop="sign_day"
                  label="积分范围"
                  width="120">
                  <template slot-scope="scope">
                   <span>{{scope.row.min}}-{{scope.row.max}}积分</span>
                  </template>
                </el-table-column>
               
                <el-table-column
                  key="8"
                  prop="status"
                  label="是否可用"
                  width="100">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.status"
                      :active-value="1"
                      :inactive-value="0"
                      active-text="显示"
                      inactive-text="隐藏"
                      @change="onchangeIsShow(scope.row)"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  key="9"
                  prop="sort"
                  label="排序"
                  width="80">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
							</el-table>
              <div class="block">
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="pageChange"
                  :total="total"
                  :page-count="total"
                  :page-size="7"
                  >
                </el-pagination>
              </div>
						</div>
					</div>
				</el-col>
        <el-col v-if="guide == 2">
          <div class="content">
            <div class="right-box">
              <div class="hot_imgs">
                <div class="title">开屏广告设置</div>
                  <div class="title-text">建议尺寸：750 * 1334px，拖拽图片可调整图片顺序哦，最多添加五张</div>
                    <div class="list-box">
                      <div>
                        <el-form :model="formItem" label-width="80px">
                          <el-form-item label="开屏广告:">
                             <el-switch
                              v-model="formItem.open_screen_switch"
                              :active-value="1"
                              :inactive-value="0"
                              :width="53"
                              active-text="开启"
                              inactive-text="关闭"
                            />
                          </el-form-item>
                          <el-form-item label="停留时间:">
                              <el-input-number
                                v-model.number="formItem.open_screen_time"
                                type="number"
                                size="small"
                                :min="1"
                                placeholder="请输入开屏广告时间"
                                style="width: 150px"
                              ></el-input-number>（单位：秒）
                          </el-form-item>
                          <el-form-item label="间隔时间:">
                              <el-input-number
                                v-model.number="formItem.open_screen_space"
                                type="number"
                                size="small"
                                :min="1"
                                placeholder="请输入广告间隔时间"
                                style="width: 150px"
                              ></el-input-number>（单位：小时）
                              <span style="color:#999999;">备注：弹广告的频次，即N小时内进入不再显示广告页，0为每次进入都显示</span>
                          </el-form-item>
                        </el-form>
                      </div>
                    <draggable class="dragArea list-group" :list="tabList.list" group="peoples"
                        handle=".move-icon">
                      <div class="item" v-for="(item,index) in tabList.list" :key="index+ 'd'">
                        <div class="move-icon">
                          <span class="iconfont icondrag2"></span>
                        </div>
                        <div class="img-box" @click="modalPicTap('单选',index)">
                          <img :src="item.pic" alt="" v-if="item.pic">
                          <div class="upload-box" v-else>
                            <i class="el-icon-camera-solid"/>
                          </div>
                        </div>
                        <div class="info">
                          <div class="info-item">
                            <span>图片名称：</span>
                            <div class="input-box">
                                <el-input v-model="item.name" size="small" placeholder="请填写名称"/>
                            </div>
                          </div>
                          <div class="info-item">
                            <span>链接地址：</span>
                            <div class="input-box" @click="link(index)">
                              
                                <el-input v-model="item.url" size="small" suffix-icon="el-icon-arrow-right" readonly
                                        placeholder="选择链接"/>
                            </div>
                          </div>
                        </div>
                        <div class="delect-btn" @click.stop="bindDelete(item,index)">
                          <i class="el-icon-error"/>
                        </div>
                    </div>
                  </draggable>
                </div>
              <template>
              <div class="add-btn">
                <el-button class="btn-add" @click="addBox">添加图片</el-button>
              </div>
            </template>
          </div>
        </div>
        </div>
        </el-col>
				<el-col v-else>
        <!-- 右侧轮播图以及其他设置 -->
					<div v-if="name != 'sign_day_config' && name != 'points_mall_scope'" class="content">
            <div class="right-box">
              <div class="hot_imgs">
                <div class="title">{{name != 'points_mall_district' ? '轮播图设置' : '积分金刚区设置'}}</div>
                <div v-if="name != 'points_mall_district'" class="title-text">建议尺寸：690 * 240px，拖拽图片可调整图片顺序哦，最多添加五张</div>
                <div v-else class="title-text">建议尺寸：90 * 90px，拖拽图片可调整图片顺序哦，图片名称建议四个字以内</div>
                <div class="list-box">
                  <draggable class="dragArea list-group" :list="tabList.list" group="peoples" handle=".move-icon">
                  <div class="item" v-for="(item,index) in tabList.list" :key="index+ 'f'">
                    <div class="move-icon">
                      <span class="iconfont icondrag2"></span>
                    </div>
                    <div class="img-box" @click="modalPicTap('单选',index)">
                      <img :src="item.pic" alt="" v-if="item.pic">
                      <div class="upload-box" v-else>
                        <i class="el-icon-camera-solid"/>
                      </div>
                    </div>
                    <div class="info">
                      <div class="info-item">
                        <span>图片名称：</span>
                        <div class="input-box">
                          <el-input v-model="item.name" size="small" placeholder="请填写名称"/>
                        </div>
                      </div>
                      <div class="info-item">
                        <span>链接地址：</span>
                        <div class="input-box" @click="link(index)">
                          <el-input v-model="item.url" suffix-icon="el-icon-arrow-right" size="small" readonly placeholder="选择链接" />
                        </div>
                      </div>
                    </div>
                    <div class="delect-btn" @click.stop="bindDelete(item,index)"><i class="el-icon-error" /></div>
                  </div>
                  </draggable>
                 
                  </div>
                  <template >
                    <div class="add-btn">
                      <el-button class="btn-add" @click="addBox">添加图片</el-button>
                    </div>
                  </template>
              </div>
            </div>
          </div>
				</el-col>
        </el-row>
        </el-card>
        <el-card :bordered="false" dis-hover class="fixed-card" :style="{left: `${ isCollapse && !sideBar1 ? '54px' : !isCollapse&&sideBar1 ? '270px' : !isCollapse&&!sideBar1 ? '180px' : '130px'}`}">
          <div class="acea-row row-center-wrapper">
           <el-button class="bnt" type="primary" @click="save" :loading="loadingExist">保存</el-button>
          </div>
        </el-card>
		    <linkaddress ref="linkaddres" @linkUrl="linkUrl"></linkaddress>
    </div>
</template>

<script>
import WangEditor from "@/components/wangEditor/index.vue";
import SettingMer from '@/libs/settingMer'
import { mapState } from "vuex";
import { getStyleApi } from "@/api/setting";
import {
  groupAllApi,
  groupDataListApi,
  groupSaveApi,
  groupDataAddApi,
  groupDataEditApi,
  groupDataDeleteApi,
  groupDataSetApi,
} from "@/api/system";
import draggable from "vuedraggable";
import linkaddress from "@/components/linkaddress";
export default {
  name: "list",
  components: { draggable, linkaddress, WangEditor },
  computed: {
    bgcolors() {
      return {
        "--color-theme": this.bgCol,
      };
    },
    ...mapState({
      sidebar: state => state.app.sidebar,
    }),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  data() {
    return {
      sideBar1:
        window.localStorage.getItem("sidebarStyle") == "a" ? false : true,
      formValidate: {
        content: "",
      },
      agreementList: [
        { name: "隐私协议", type: "privacy" },
        { name: "用户协议", type: "user" },
        { name: "注销协议", type: "cancel" },
      ],
      ruleValidate: {},
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: "100%", // 初始容器宽度
        UEDITOR_HOME_URL: "/admin/UEditor/",
        serverUrl: "",
      },
      agreementType: 0, //判断的隐私协议
      bgimg: 0,
      columns1: [],
      bgCol: "",
      name: "new_home_banner",
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      loading: false,
      sginList: [],
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        //自动轮播
        autoplay: {
          delay: 2000,
          //当用户滑动图片后继续自动轮播
          disableOnInteraction: false,
        },
        //开启循环模式
        loop: false,
      },
      url: "",
      BaseURL: SettingMer.httpUrl || 'http://localhost:8080',
      // BaseURL: 'http://localhost:8080',
      pageId: 0,
      theme3: "light",
      tabList: {},
      lastObj: {
        add_time: "",
        name: "",
        gid: "",
        id: "",
        pic: "",
        link: "",
        sort: "",
        status: 1,
      },
      isChoice: "单选",
      modalPic: false,
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      groupAll: [],
      activeIndex: 0,
      sortName: null,
      activeIndexs: 0,
      cmsList: [],
      loadingExist: false,
      formItem: {
        time: "",
        type: "pic",
        status: 1,
        value: [],
        video_link: "",
      },
      guide: 0,
      colorTheme: 'default',
      total: 0,
      signFrom: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.color();
    console.log(this.BaseURL);
  },
  mounted() {
    this.getGroupAll();
    let time = new Date().getTime() * 1000
    this.url =
      this.BaseURL + "/pages/columnGoods/HotNewGoods/index?inner_frame=1&type=new&time="+time;
  },
  methods: {
    getEditorContent(data) {
      this.formValidate.content = data;
    },
    linkUrl(e) {
      this.$set(this.tabList.list[this.activeIndexs], 'url', e);
    },
    color() {
       getStyleApi()
        .then((res) => {
          switch (res.data.global_theme) {
            case 'purple':
              this.bgCol = "#905EFF";
              this.bgimg = 0;
              break;
            case 'blue':
              this.bgCol = "#3875EA";
              this.bgimg = 1;
              break;
            case 'green':
              this.bgCol = "#00C050";
              this.bgimg = 2;
              break;
            case 'default':
              this.bgCol = "#E93323";
              this.bgimg = 3;
              break;
            case 'pink':
              this.bgCol = "#FF448F";
              this.bgimg = 4;
              break;
            case 'orange':
              this.bgCol = "#FE5C2D";
              this.bgimg = 5;
              break;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 添加表单
    groupAdd() {
      this.$modalForm(groupDataAddApi(this.pageId)).then(() => {
        this.url = this.BaseURL + "pages/users/user_sgin/index?inner_frame=1";
        this.info(this.name);
      });
    },
    info(key) {
      groupDataListApi(key,this.signFrom)
        .then(async (res) => {
          res.data.list.forEach((item, index, array) => {
            item.pic= item.pic || ""
            item.url= item.url || ""
          });
          this.tabList = res.data;
          if (key == "sign_day_config" ) {
            this.sginList = res.data.list;
            this.total = res.data.count;
          } else if (key == "points_mall_scope") {
            this.cmsList = res.data.list;
            this.total = res.data.count;
          } else if (key == "open_screen_advertising") {
            this.formItem = res.data.config;
          }
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(status) {
      this.signFrom.page = status;
      this.info(this.name);
    },
    handleSizeChange(val) {
      this.signFrom.limit = val
      this.info(this.name)
    },
    edits(row) {
      this.signFrom.page = 1;
      this.pageId = row.group_id;
      this.name = row.group_key || "";
      let time = new Date().getTime() * 1000
      if (row.group_key == "open_screen_advertising") {
        this.guide = 2;
        this.info(row.group_key);
      } else {
        this.info(row.group_key);
        this.guide = 0;
        switch (row.group_key) {
          case "best_home_banner":
            this.url =
            `${this.BaseURL}/pages/columnGoods/HotNewGoods/index?inner_frame=1&type=best&time=${time}`; //精品推荐
            break;
          case "sign_day_config":
            this.url = "";
            break;
          case "points_mall_scope":
            this.url = `${this.BaseURL}/pages/points_mall/index?inner_frame=1&time=${time}`; //积分商城
            break;
          case "hot_home_banner":
            this.url =
            `${this.BaseURL}/pages/columnGoods/HotNewGoods/index?inner_frame=1&type=hot&time=${time}`;//热门榜单
            break;
          case "new_home_banner":
            this.url =
             `${this.BaseURL}/pages/columnGoods/HotNewGoods/index?inner_frame=1&type=new&time=${time}`; //首发新品
            break;
          case "good_home_banner":
            this.url =
            `${this.BaseURL}/pages/columnGoods/HotNewGoods/index?inner_frame=1&type=good&time=${time}`; //推荐单品
            break;
          case "points_mall_district":
            this.url = `${this.BaseURL}/pages/points_mall/index?inner_frame=1&time=${time}`; //积分金刚区
            break;
          case "points_mall_banner":
            this.url = `${this.BaseURL}/pages/points_mall/index?inner_frame=1&time=${time}`; //积分商城轮播图
            break;
        }
      }
    },
    addBox() {
      if (this.tabList.list.length == 0) {
        this.tabList.list.push(this.lastObj);
        this.lastObj = {
          add_time: "",
          name: "",
          gid: "",
          id: "",
          pic: "",
          url: "",
          sort: "",
          status: 1,
        };
      } else {
        if (this.tabList.list.length == 5 && this.name != "points_mall_district") {
          this.$message.warning("最多添加五张呦");
        } else {
          let obj = JSON.parse(JSON.stringify(this.lastObj));
          this.tabList.list.push(obj);
        }
      }
    },
    // 删除
    bindDelete(item, index) {
      this.tabList.list.splice(index, 1);
    },
    // 点击图文封面
    modalPicTap(title, index) {
      this.activeIndex = index;
      const _this = this;
      this.$modalUpload(function (img) {
          _this.tabList.list[index]['pic'] = img[0];
      });
    },
    // 获取图片信息
    getPic(pc) {
      this.$nextTick(() => {
        if (this.name == "admin_login_slide") {
          this.tabList.list[this.activeIndex].slide = pc.att_dir;
        } else {
          this.tabList.list[this.activeIndex].pic = pc.att_dir;
        }
        this.modalPic = false;
      });
    },
    save() {
      this.loadingExist = true;
      let data = {data: this.tabList.list}
      if(this.guide == 2){data.config={open_screen_switch: this.formItem.open_screen_switch,open_screen_time: this.formItem.open_screen_time,open_screen_space: this.formItem.open_screen_space}}
      groupSaveApi(this.name,data)
      .then((res) => {
        this.loadingExist = false;
        this.$message.success(res.message);
      })
      .catch((err) => {
        this.loadingExist = false;
        this.$message.error(err.message);
      });
    },
    link(index) {
      this.activeIndexs = index;
      this.$refs.linkaddres.modals = true;
    },
    // 编辑
    edit(row) {
      this.$modalForm(
        groupDataEditApi(this.pageId, row.group_data_id)
      ).then(() => {
        this.info(this.name);
        this.url = this.BaseURL + "pages/users/user_sgin/index";
      });
    },
    // 删除
    del(row) {
      this.$modalSure('删除数据吗').then(() => {
        groupDataDeleteApi(row.group_data_id).then(({ message }) => {
          this.$message.success(message)
          this.info(this.name); 
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    // 修改是否显示
    onchangeIsShow(row) {
      groupDataSetApi(row.group_data_id,row.status)
        .then(async (res) => {
          this.$message.success(res.message);
          this.info(this.name);
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    getGroupAll() {
      groupAllApi()
        .then(async (res) => {
          this.groupAll = res.data.menu;
          this.sortName = res.data.menu[0].group_name;
          this.pageId = res.data.menu[0].group_id;
          this.info(res.data.menu[0]['group_key'])
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    getContent(val) {
      this.formValidate.content = val;
    },
  },
};
</script>

<style scoped lang="scss">
.ml14 {
 margin-left: 14px
}
.el-menu-item:hover, .el-menu-item:focus{
  background: transparent;
  color: #1890ff;
}
.btn-add {
 width: 100px; 
 height: 35px; 
 background-color:#1890FF; 
 color: #FFFFFF;
}
.ml20{
  margin-left: 20px;
}
.mt30{
  margin-top: 30px;
}
.mt25{
  margin-top: 25px;
}
/deep/.el-form-item__label{
  font-weight: normal;
}
/deep/ .ivu-menu-vertical .ivu-menu-item-group-title {
  display: none;
}
.box-wrapper{
  display: flex;
  flex-flow: row wrap;
}
/deep/ .ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}
/deep/.ivu-form-item-content {
  margin-left: 0px !important;
}
.nofont {
  text-align: center;
  line-height: 123px;
}
.nofonts {
  text-align: center;
  line-height: 125px;
}
.save {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: #FFF;
  bottom: 0;
  padding: 16px;
  border-top: 3px solid #f5f7f9;
}
.form {
  .goodsTitle {
    margin-bottom: 25px;
  }
  .goodsTitle ~ .goodsTitle {
    margin-top: 20px;
  }
  .goodsTitle .title {
    border-bottom: 2px solid #1890ff;
    padding: 0 8px 12px 5px;
    color: #000;
    font-size: 14px;
  }
  .goodsTitle .icons {
    font-size: 15px;
    margin-right: 8px;
    color: #999;
  }
  .add {
    font-size: 12px;
    color: #1890ff;
    padding: 0 12px;
    cursor: pointer;
  }
  .radio {
    margin-right: 20px;
  }
  .upLoad {
    width: 58px;
    height: 58px;
    line-height: 58px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.02);
  }
  .iconfont {
    color: #898989;
  }
  .pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
  }
  .pictrue img {
    width: 100%;
    height: 100%;
  }
}
.district-pagition{
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    width: 5px;
    height: 5px;
    border-radius: 4px;
    background-color: rgba(0,0,0,.3);
    &.active{
      width: 19px;
      margin-right: 3px;
    }
  }
}
.agreement-box {
  width: 350px;
  height: 550px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #EEEEEE;
  opacity: 1;
  position: relative;
  .template {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    background-color: #817e81;
  }
  .htmls_box {
    font-size: 12px;
    width: 259px;
    height: 430px;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    top: 58px;
    left: 26px;
    .htmls_top {
      position: absolute;
      top: 8px;
      left: 0;
      height: 34px;
      text-align: center;
      width: 100%;
      line-height: 35px;
      font-weight: 600;
      font-size: 20px;
    }
    .htmls_font {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 15px 15px;
      text-align: center;
      width: 100%;
      div {
        height: 35px;
        line-height: 35px;
        border-radius: 20px;
      }
      .ok {
        background-color: #f33316;
        color: #FFFFFF;
      }
    }
    .htmls {
      position: absolute;
      background-color: #fff;
      top: 50px;
      left: 0;
      width: 259px;
      height: 281px;
      border-radius: 4px;
      overflow: auto;
      padding: 5px 15px;
    }
    .htmls::-webkit-scrollbar {
      display: none;
    }
  }
}
.Bbox {
  width: 495px;
  display: flex;
  flex-wrap: wrap;
}
.item {
  margin-right: 15px;
  border: 1px dashed #dbdbdb;
  padding-bottom: 10px;
  padding-right: 15px;
  padding-top: 20px;
}
.items {
  margin-right: 15px;
  border: 1px dashed #dbdbdb;
  padding-bottom: 10px;
  padding-top: 15px;
  position: relative;
  display: flex;
  margin-top: 20px;
  .move-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 80px;
    cursor: move;
    color: #D8D8D8;
  }
  .img-box {
    position: relative;
    width: 80px;
    height: 80px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    flex: 1;
    margin-left: 22px;
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-size: 13px;
        .input-box {
          flex: 1;
        }
      }
    }
  }
  .delect-btn {
    position: absolute;
    right: -12px;
    top: -12px;
    color: #999999;
    .el-icon-error {
      font-size: 20px;
      color: #FF1818;
    }
  }
}
.table {
  color: #515a6e;
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  margin-left: 20px;
}
.contents {
  width: 150px;
  .right-box {
    margin-left: 40px;
  }
  .title-text {
    width: 500px;
  }
}
.pciframe {
  margin-left: 20px;
  width: 430px;
  height: 280px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  border-radius: 13px;
  img {
    width: 100%;
    height: 100%;
  }
  .pciframe-box {
    background: rgba(0, 0, 0, 0);
    border-radius: 4px;
  }
  .pcmoddile_goods {
    position: absolute;
    top: 69px;
    width: 171px;
    height: 140px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    left: 65px;
    background-color: #fff;
  }
  .pcswiperimg_goods {
    height: 140px;
    background-color: #f5f5f5;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.link {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.25);
  opacity: 1;
  cursor: pointer;
  .you {
    color: #999999;
    float: right;
    margin-right: 11px;
  }
}
.swiperimg {
  width: 335px;
  height: 145px;
  border-radius: 8px;
  &.on{
	  height: 100%;
    width: 350px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.swiperimg_goods {
  width: 284px;
  height: 124px;
  border-radius: 4px;
  line-height: 99px;
  text-align: center;
  background-color: #f5f5f5;
  img {
    width: 100%;
    height: 100%;
  }
}
.title {
  padding: 0 0 13px 0;
  font-weight: bold;
  font-size: 15px;
  border-left: 2px solid #1890FF;
  height: 23px;
  padding-left: 10px;
}
.title-text {
  padding: 0 0 0px 16px;
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}
.content {
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
  .right-box {
    margin-left: 40px;
  }
}
.content::-webkit-scrollbar{
  width: 0;
  height: 0;
  background-color: transparent;
}
.box {
  border-top: 3px solid #f5f7f9;
  padding: 10px;
  padding-top: 25px;
  width: 100%;
  .save {
    background-color: #1890FF;
    color: #FFFFFF;
    width: 71px;
    height: 30px;
    margin: 0 auto;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}
.iframe {
  margin-left: 20px;
  position: relative;
  width: 350px;
  height: 550px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  opacity: 1;
  border-radius: 10px;
}
.moddile {
  position: absolute;
  width: 350px;
  height: 550px;
  top: 0px;
  opacity: 0;
  left: 0px;
  border-radius: 4px;
}
.moddile_box {
  position: absolute;
  top: 12px;
  width: 335px;
  height: 145px;
  border-radius: 8px;
  left: 8px;
  background-color: #f5f5f5;
}
.district-main{
  position: absolute;
  top: 156px;
  width: 350px;
  left: 0;
  background-color: #ffffff;
}
.district-count{
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  overflow: hidden;
  margin: 0;
}
.district-list{
  float: left;
  width: 20%;
  text-align: center;
  list-style: none;
  margin-top: 12px;

  .image{
    width: 45px;
    height: 45px;
    border-radius: 100%;
  }
  .name{
    font-size: 10px;
    color: #282828;
    margin-top: 7px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
}
.moddile_goods {
  position: absolute;
  top: 18px;
  width: 284px;
  height: 124px;
  border-radius: 5px;
  left: 13px;
  line-height: 99px;
  text-align: center;
  background-color: #f5f5f5;
}
.iframe-box {
  width: 350px;
  height: 550px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #EEEEEE;
  opacity: 1;
  img {
    width: 100%;
    height: 100%;
  }
}
.left-wrapper {
  background: #fff;
  border-right: 1px solid #dcdee2;
  width: 20%;
}
.right-wrapper {
  width: 60%;
}
.menu-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  word-break: break-all;
  .icon-box {
    z-index: 3;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
  }
  &:hover .icon-box {
    display: block;
  }
  .right-menu {
    z-index: 10;
    position: absolute;
    right: -106px;
    top: -11px;
    width: auto;
    min-width: 121px;
  }
}
.tabBox_img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.ivu-menu {
  z-index: auto;
}
.icondrag2 {
  font-size: 26px;
  color: #d8d8d8;
}
.hot_imgs {
  margin-bottom: 20px;
  .title {
    font-size: 14px;
  }
  .list-box {
    .item {
      position: relative;
      display: flex;
      margin-top: 20px;
      .move-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 80px;
        cursor: move;
        color: #D8D8D8;
      }
      .img-box {
        position: relative;
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        margin-left: 22px;
        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          span {
            font-size: 13px;
          }
          .input-box {
            flex: 1;
          }
        }
      }
      .delect-btn {
        position: absolute;
        right: -12px;
        top: -12px;
        color: #999999;

        .el-icon-error {
          font-size: 20px;
          color: #FF1818;
        }
      }
    }
  }
  .add-btn {
    margin-top: 20px;
  }
}
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  cursor: pointer;
}
.el-icon-camera-solid {
  color: #cccccc;;
  font-size: 30px;
}
.iframe-boxs::-webkit-scrollbar {
  display: none;
}
.sgin_iframe::-webkit-scrollbar {
  display: none;
}
.iframe-boxs {
  width: 350px;
  height: 550px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #EEEEEE;
  opacity: 1;
  overflow: auto;
  .moneyBox {
    background-color: var(--color-theme);
    height: 414px;
    border-radius: 10px;
    .box1 {
      text-align: center;
      color: #FFFFFF;
      padding-bottom: 15px;
      .font1 {
        padding-top: 20px;
        font-size: 12px;
        opacity: 0.6;
      }
      .font2 {
        font-size: 30px;
        font-style: normal;
        opacity: 0.9;
      }
    }
    .moneyBox_content {
      background-color: #FFFFFF;
      height: 317px;
      border-radius: 4px;
      .box2 {
        display: flex;
        justify-content: space-around;
        height: 35px;
        line-height: 35px;
        margin-bottom: 10px;
        div:nth-child(1) {
          font-weight: bold;
          border-bottom: 2px solid var(--color-theme);
        }
      }
      .box3 {
        padding: 0px 10px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        .box3_box {
          width: 90px;
          height: 55px;
          border-radius: 9px;
          background-color: #f4f4f4;
          color: #888;
          margin-bottom: 10px;
          text-align: center;
          padding-top: 3px;
          font-size: 19px;
          margin-right: 3px;
          margin-left: 3px;
          .font {
            font-size: 11px;
            font-style: normal;
          }
        }
        .box3_box:nth-child(1) {
          width: 90px;
          height: 55px;
          border-radius: 9px;
          background-color: var(--color-theme);
          color: #FFFFFF;
          text-align: center;
          padding-top: 3px;
          margin-right: 3px;
          margin-left: 3px;
        }
        .other {
          line-height: 55px;
        }
      }
      .box4 {
        padding: 0px 10px;
        .tips {
          font-size: 14px;
          color: #333333;
          font-weight: 800;
          margin-bottom: 7px;
          margin-top: 10px;
        }
        .tips-samll {
          font-size: 12px;
          color: #333333;
          margin-bottom: 7px;
          p {
            margin: 2px 0px;
          }
        }
      }
      .box5 {
        font-size: 15px;
        width: 225px;
        height: 40px;
        border-radius: 25px;
        margin: 23px auto 0 auto;
        line-height: 40px;
        text-align: center;
        background-color: var(--color-theme);
        color: #FFFFFF;
      }
    }
  }
}
.fixed-card {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 130px;
  z-index: 99;
  box-shadow: 0 -1px 2px rgb(240, 240, 240);
}
.el-col-24{
  max-width: 100%;
  width: auto;
}
</style>
