<template>
  <div v-if="!item.hidden" :class="{menuTwo:isCollapse}">
    
    <template>
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
        <app-link v-if="onlyOneChild" :to="resolvePath(onlyOneChild.route)">
          <el-menu-item :index="resolvePath(onlyOneChild.route)" :class="{'submenu-title-noDropdown':!isNest}">
            <template v-if="sideBar1 && (!item.children || item.children.length <= 1)">
              <div class="el-submenu__title" :class="{titles:level == 0, hide:!sideBar1&&!isCollapse}"><i :class="'menu-icon el-icon-' + item.icon"></i><span>{{onlyOneChild.menu_name}}</span></div>
            </template>
            <item v-else :icon="onlyOneChild.icon||(item&&item.icon)" :title="onlyOneChild.menu_name" />
          </el-menu-item>
        </app-link>
      </template>
      <el-submenu :class="{subMenu2 : sideBar1}" :popper-class="sideBar1 ? 'styleTwo' : ''" v-else ref="subMenu" :index="resolvePath(item.route)" popper-append-to-body>
        <template slot="title">
          <item v-if="item" :icon="item && item.icon" :title="item.menu_name" />
        </template>
        <template>
          <sidebar-item :level="level+1" v-for="(child, index) in item.children" :key="index" :is-nest="true" :item="child" :base-path="resolvePath(child.route)" class="nest-menu" />
        </template>
      </el-submenu>
    </template> 
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
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 0
    },
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      sideBar1:
        window.localStorage.getItem("sidebarStyle") == "a" ? false : true,
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if(item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if(showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if(showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    /** */
    resolvePath(routePath) {
      if(isExternal(routePath)) {
        return routePath
      }
      if(isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-one{
  position: relative;
  .menu-item{
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #D7DBE0;;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    justify-items: center;
    align-items: center;  
    .menu-icon{
      font-size: 18px;
      margin-right: 10px;
      vertical-align: middle;
    }
    &.active{
      background: rgba(67, 127, 253 ,.5);
      // color: #ffffff;
    }
    &:hover{
      background: rgba(67, 127, 253 ,.2);
    }
  }
}
.el-scrollbar{
  height: calc(100% - 50px);
}
.titles{
  padding: 0 20px;
  }
.styleTwo .subMenu2{
  background: #5f5f66;
}
.styleTwo .el-submenu__title{
  color: #ffffff;
}
.menuTwo .titles i{
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  color: #909399!important;
}
.menuTwo .titles span{
  display: inline-block !important;
  visibility: visible !important;
  width: auto !important;
  height: auto !important;
  color: rgb(191, 203, 217);
}
.menuTwo .titles.hide span{
  visibility: hidden !important;
}

</style>
