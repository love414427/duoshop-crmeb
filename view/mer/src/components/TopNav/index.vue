<template>
  <el-menu
    :default-active="activeMenu"
    background-color="transparent"
    text-color="#fff"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(item, index) in topMenus">
      <el-menu-item :index="item.route" :key="index" @click="openRouter(item.route)">
        {{ item.menu_name }}
      </el-menu-item>
    </template>
    <!-- <el-submenu index="more" v-if="topMenus.length > visibleNumber">
      <template slot="title" class="more_menu">更多菜单</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item :index="item.route" :key="index" v-if="index >= visibleNumber" @click="openRouter(item.route)">
          {{ item.menu_name }}
        </el-menu-item>
      </template>
    </el-submenu> -->
  </el-menu>
</template>

<script>
import { roterPre } from '@/settings';
export default {
  data() {
    return {
      // 顶部栏初始数
      visibleNumber: 9,
      // 当前激活菜单的 index
      currentIndex: undefined,
      roterPre: roterPre,
      activeMenu: sessionStorage.getItem('activeMenu') ? sessionStorage.getItem('activeMenu') : this.$route.path,
    };
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme;
    },
    navIcon() {
      return this.$store.state.settings.navIcon;
    },
    // 所有的路由信息
    routers() {
      let routers = this.$store.state.user.menuList ? this.$store.state.user.menuList : [];
      return routers;
    },
    // 顶部显示菜单
    topMenus() {
      let topMenus = [];
      this.routers.map((menu) => {
        if (menu.hidden !== true) {
          // 兼容顶部栏一级菜单内部跳转
          if (menu.route === '/') {
            topMenus.push(menu.children[0]);
          } else {
            topMenus.push(menu);
          }
        }
      });
      return topMenus;
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.setVisibleNumber);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setVisibleNumber);
  },
  mounted() {
    this.setVisibleNumber();
  },
  methods: {
    // 根据宽度计算设置显示栏数
    setVisibleNumber() {
      const width = document.body.getBoundingClientRect().width / 1.8;
      this.visibleNumber = parseInt(width / 60);
    },
    // 菜单选择事件
    handleSelect(key, keyPath) {
      this.currentIndex = key;
      sessionStorage.setItem('activeMenu', key);
      if (this.ishttp(key)) {
        // http(s):// 路径新窗口打开
        window.open(key, '_blank');
      } else if (key.indexOf('/redirect') !== -1) {
        // /redirect 路径内部打开
        this.$router.push({ path: key.replace('/redirect', '') });
      } else {
        // 显示左侧联动菜单
        this.activeRoutes(key);
      }
    },
    // 当前激活的路由
    activeRoutes(key) {
      var routes = [];
      this.routers.map((item) => {
        if (key == item.route && item.children) {
          //如果选中导航的key值与遍历项的url匹配并且有子级，那么就将该项的子级数组放在routes中
          routes = item.children;
        } else if (key == item.route && !item.children) {
          //只满足选中导航的key值与遍历项的url匹配但是没有子级的情况下，就把这一项赋值给vuex中
          //这一项其实针对控制台，控制台没有子级
          this.$store.commit('user/SET_SIDEBAR_ROUTERS', [item]);
        }
      });
      if (routes.length > 0) {
        //routes数组有长度就将它放在vuex中，左侧导航就能读取到，展示的也是选中项的子级
        this.$store.commit('user/SET_SIDEBAR_ROUTERS', routes);
      }
      return routes;
    },
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
    },
    openRouter(url) {
      if (url == '/admin/theme') {
        this.$router.push({ path: '/admin/setting/diy/list' });
      } else {
        this.$router.push({ path: url });
      }
    },
  },
};
</script>

<style lang="scss">
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 65px !important;
  line-height: 65px !important;
  color: #999093;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
.topmenu-container.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid #fff !important;
  color: #fff;
  font-weight: 800;
}

/* submenu item */
.topmenu-container.el-menu--horizontal > .el-submenu .el-submenu__title {
  float: left;
  height: 65px !important;
  line-height: 65px !important;
  color: #fff !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
/deep/.el-menu.el-submenu__title:hover {
  background: #fff !important;
}

/deep/.el-menu.el-menu-item:hover {
  background: #fff !important;
}
</style>
