// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import Layout from '@/layout'
import { roterPre } from '@/settings'
const cmsRouter =
    {
      path: `${roterPre}/cms`,
      name: 'cms',
      meta: {
        icon: 'dashboard',
        title: '内容'
      },
      alwaysShow: true,
      component: Layout,
      children: [
        {
          path: 'article',
          name: 'article',
          meta: {
            title: '文章管理',
            noCache: true
          },
          component: () => import('@/views/cms/article/index')
        },
        {
          path: 'articleCategory',
          name: 'articleCategory',
          meta: {
            title: '文章分类',
            noCache: true
          },
          component: () => import('@/views/cms/articleCategory/index')
        },
        {
          path: 'article/addArticle/:id?',
          component: () => import('@/views/cms/addArticle/index'),
          name: 'EditArticle',
          meta: { title: '文章添加', noCache: true, activeMenu: `${roterPre}/cms/article` },
          hidden: true
        }
      ]
    }

export default cmsRouter
