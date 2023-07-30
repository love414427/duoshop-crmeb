<template>
  <div :key="sideBar1 && isCollapse" :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" :sideBar1="sideBar1" />
    <el-scrollbar>
      <el-menu
        v-if="!sideBar1"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        class="subMenu1"
      >
        <template>
          <sidebar-item
            v-for="route in menuList"
            :key="route.route"
            :item="route"
            :base-path="route.route"
          />
        </template>
      </el-menu>
      <template v-else>
        <template v-if="!isCollapse">
          <ul v-for="item in menuList" :key="item.route" style="padding: 0;"><li><div class="menu menu-one"><div class="menu-item" :class="{ active: pathCompute(item) }" @click="goPath(item)"><i :class="'menu-icon el-icon-' + item.icon"></i><span>{{ item.menu_name }}</span></div></div></li></ul>
        </template>
        <!--一级菜单点击后二级菜单展开样式-->
        <el-menu
          v-if="subMenuList && subMenuList.length > 0 && !isCollapse"
          class="menuOpen"
          :default-active="activeMenu"
          background-color="#ffffff"
          text-color="#303133"
          :unique-opened="false"
          active-text-color="#303133"
          mode="vertical"
        >
          <div style="height: 100%;">
            <div class="sub-title">{{ menu_name }}</div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
              <div v-for="(itm, idx) in subMenuList" :key="idx">
                <template
                  v-if="
                    hasOneShowingChild(itm.children, itm) &&
                      (!onlyOneChild.children ||
                        onlyOneChild.noShowingChildren) &&
                      !itm.alwaysShow
                  "
                >
                  <app-link
                    v-if="onlyOneChild"
                    :to="resolvePath(onlyOneChild.route)"
                  >
                    <el-menu-item :index="resolvePath(onlyOneChild.route)">
                      <item :icon="onlyOneChild.icon || (itm && itm.icon)":title="onlyOneChild.menu_name"/>
                    </el-menu-item>
                  </app-link>
                </template>
                <el-submenu
                  v-else
                  ref="subMenu"
                  :index="resolvePath(itm.route)"
                  popper-append-to-body
                >
                  <template slot="title">
                    <item
                      v-if="itm"
                      :icon="itm && itm.icon"
                      :title="itm.menu_name"
                    />
                  </template>
                  <sidebar-item
                    v-for="(child, index) in itm.children"
                    :key="index"
                    :is-nest="true"
                    :item="child"
                    :base-path="resolvePath(child.route)"
                    :isCollapse="isCollapse"
                    class="nest-menu"
                  />
                </el-submenu>
              </div>
            </el-scrollbar>
          </div>
        </el-menu>
        <template v-if="isCollapse">
         <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :unique-opened="true"
            active-text-color="#ffffff"
            :collapse-transition="false"
            mode="vertical"
            class="menuStyle2"
            popper-class="styleTwo"
          >
            <template>
              <sidebar-item
                v-for="route in menuList"
                :key="route.route"
                :item="route"
                :base-path="route.route"
                class="style2"
              />
            </template>
          </el-menu>
        </template>
      </template>
    </el-scrollbar>
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

import path from "path";
import { mapGetters, mapMutations, mapState } from "vuex";
import Logo from "./Logo";
import AppLink from "./Link";
import SidebarItem from "./SidebarItem";
import Item from "./Item";
import { isExternal } from "@/utils/validate";
import FixiOSBug from "./FixiOSBug";
import variables from "@/styles/variables.scss";


export default {
  components: { SidebarItem, Logo, AppLink, Item },
  mixins: [FixiOSBug],
  data() {
    this.onlyOneChild = null;
    return {
      sideBar1:
        window.localStorage.getItem("sidebarStyle") == "a" ? false : true,
      menu_name: "",
      list: this.$store.state.user.menuList,
      subMenuList: [],
      activePath: "",
      isShow: false,
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar", "menuList"]),
    ...mapState({
      sidebar: state => state.app.sidebar,
      sidebarRouters: state => state.user.sidebarRouters,
      sidebarStyle: state => state.user.sidebarStyle,
      // 所有的路由信息
      routers() {
        let routers = this.$store.state.user.menuList
          ? this.$store.state.user.menuList
          : [];
        return routers;
      }
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  watch: {
    sidebarStyle(newValue, oldValue) {
      this.sideBar1 = newValue == "a" && oldValue != "a" ? false : true;
      this.setMenuWidth();
    },
    sidebar: { 
      handler(newVal, oldVal) {
        if(this.sideBar1){
          this.getSubMenu();
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
    $route:{
      handler(newVal, oldVal) {
        if(this.sideBar1){
          this.getSubMenu();
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
  },
  mounted() {
    this.getMenus();
    this.setMenuWidth();
    if(this.sideBar1){
      this.getSubMenu();
    }
  },
  methods: {
    // 菜单选中后左侧宽度数值存储
    setMenuWidth() {
      if (this.sideBar1) {
        if (this.subMenuList && this.subMenuList.length > 0 && !this.isCollapse) {
          this.$store.commit("user/SET_SIDEBAR_WIDTH", 270);
        } else {
          this.$store.commit("user/SET_SIDEBAR_WIDTH", 130);
        }
      } else {
        this.$store.commit("user/SET_SIDEBAR_WIDTH", 180);
      }
    },
    ishttp(url) {
      return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    },
    getMenus() {
      this.$store.dispatch("user/getMenus", {
        that: this
      });
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return routePath;
      }
      return path.resolve(routePath, routePath);
    },
    goPath(item) {
      this.menu_name = item.menu_name;
      if (item.children) {
        this.$store.commit("user/SET_SIDEBAR_WIDTH", 270);
        // console.log(this.pathCompute(item.children)+ 'sdxsds');
        this.subMenuList = item.children;
        window.localStorage.setItem("subMenuList",this.subMenuList);
        let goUrl = this.resolvePath(this.getChild(item.children)[0].route);
        item.route = goUrl;
        this.$router.push({
          path: goUrl
        });
      } else {
        this.$store.commit("user/SET_SIDEBAR_WIDTH", 130);
        this.subMenuList = [];
        window.localStorage.setItem("subMenuList",[]);
        let goUrl = this.resolvePath(item.route);
        this.$router.push({
          path: goUrl
        });
      }
    },
    getChild(data) {
      const result = [];
      data.forEach(item => {
        // 遍历树
        const loop = data => {
          let child = data.children;
          if (child) {
            // 是否有子节点，有则继续遍历下一级，无则是叶子节点
            for (let i = 0; i < child.length; i++) {
              loop(child[i]);
            }
          } else {
            result.push(data);
          }
        };
        loop(item);
      });
      return result;
    },
    //判断当前页面父级菜单
    pathCompute(data) {
      const loop = child => {
        // 是否有子节点，有则继续遍历下一级，无则是叶子节点
        for (let i = 0; i < child.length; i++) {
          if(this.$route.path == child[i]['route'] || this.$route.meta.activeMenu == child[i]['route']){
            return true;
          }
          if(loop(child[i].children || [])){
            return true;
          };
        }  
        return false;        
      };      
      if(!loop(data.children || [])){

        return this.$route.path == data.route;
      }
      return true;
    },
    // 获取当前一级菜单的二级菜单
    getSubMenu(){
      for (let i = 0; i < this.menuList.length; i++) {
       if(this.pathCompute(this.menuList[i])){
        this.subMenuList = this.menuList[i].children;
        this.menu_name = this.menuList[i].menu_name;
        window.localStorage.setItem("subMenuList",this.menuList[i].children);
        this.setMenuWidth();
        return;
       }
      }  
    },
    ...mapMutations("user", ["SET_MENU_LIST"])
  }
};
</script>
<style lang="scss" scoped>
.menu-one {
  position: relative;
  .menu-item {
    padding: 0 20px;
    // height: 50px;
    line-height: 50px;
    font-size: 14px;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 130px;
    .menu-icon {
      font-size: 18px;
      margin-right: 5px;
      vertical-align: middle;
      text-align: center;
      color: #909399;
      width: 24px;
    }
    span{
      display: inline-block;
      color: #bfcbd9;
    }
    &.active {
      background: rgba(67, 127, 253, 0.5);
    }
    &:hover {
      background: rgba(67, 127, 253, 0.2);
      
    }
  }
  .menu-two {
    position: absolute;
    left: 130px;
    top: 0;
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.06);
    width: 140px;
    background: #000000;
    .two-list {
      font-size: 13px;
      color: #ffffff;
      line-height: 46px;
      padding: 0 20px;
    }
  }
}

.el-scrollbar {
  height: calc(100vh - 50px);
}
.menuOpen {
  width: 140px !important;
  height: 100%;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 130px;
  box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.06);
  .subMenu2{
    background: #ffffff!important;
  }
  .sub-title {
    font-weight: 600;
    color: #303133;
    font-size: 18px;
    padding: 20px;
  }
  /deep/.el-menu-item,/deep/.el-submenu__title {
    height: 46px;
    line-height: 46px;
    // background: #ffffff !important;
    color: #303133 !important;
    font-size: 13px;
    
    &:hover {
      background: #ECF2FE !important;
      color: #303133 !important;
      .el-submenu__title{
        background: #ECF2FE !important;
        color: #303133 !important;
      }
    }
  }
  /deep/.subMenu2 .el-submenu__title{
    padding-left: 15px!important;
  }
  /deep/.router-link-active .el-menu-item, /deep/.el-menu-item.is-active,/deep/ .router-link-active .el-submenu__title{
    background: #ECF2FE !important;
  }
}
/deep/.menus-new .el-icon-arrow-down {
  display: none;
}
/deep/.el-submenu .el-menu-item {
  min-width: 140px !important;
  font-size: 13px;
}
/deep/.menuOpen .el-menu-item,/deep/.menuOpen .el-menu-item,/deep/.menuOpen .el-submenu__title{
  padding-left: 15px!important;
}
/deep/.menuOpen .subMenu2 .el-submenu__title{
  padding-left: 30px!important;
}
/deep/.style2 .is-active,/deep/.style2>.el-submenu:hover{
  background: #182848!important;
}
/deep/.style2.menuTwo .el-submenu__title{
  display: flex;
  align-items: center;
}
/deep/.subMenu1 .menuTwo .el-submenu__title:hover,/deep/.subMenu1 .menuTwo .el-menu-item:hover{
 background: #182848!important;
}
.menu-link{
  display: flex!important;
  align-items: center;
  width: 100%;
}
/deep/.menuStyle2 .el-submenu>.el-submenu__title>span{
  display: inline-block!important;
  visibility: visible!important;
  width: auto!important;
  height: auto!important;
}
/deep/.menuStyle2 .el-submenu{
  padding: 0 20px;
}
/deep/.menuStyle2 .el-submenu .el-submenu__title{
  background: transparent!important;
}
/deep/.subMenu1 .menuTwo .el-menu{
  background: #030C17!important;
}
/deep/.subMenu1 .menuTwo .nest-menu .el-submenu>.el-submenu__title,/deep/.subMenu1 .menuTwo .el-submenu .el-menu-item{
  background: #030c17!important;
}
</style>
