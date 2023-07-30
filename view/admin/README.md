# CRMEB多商户
## 开发规范
统一使用ES6 语法
方法注释
/*
* th => 表头
* data => 数据
* fileName => 文件名
* fileType => 文件类型
* sheetName => sheet页名
*/
export default function toExcel ({ th, data, fileName, fileType, sheetName }) 
行注释 //

### 命名

页面目录 文件夹命名格式骆驼式命名法,例如：用户列表 userList 
例如：商品模块
product 商品
    ├─ product 商品管理
        ├─productList 商品管理目录
            ├- index.vue  首页

页面命名、组建、文件夹 命名格式小驼峰命名法,例如：用户列表 userList

类名函数命名 大驼峰式 例如：addUser
变量命名 小驼峰式 例如：user 或者 userInfo _userinfo user-info
常量 采用全大些下划线命名 例如：VUE_APP_API_URl

### 文件管理规范
pages 页面模块必须件文件夹区分
api 接口一个模块一个文件
组建 一个组建一个文件夹
plugins 插件一个插件一个文件夹
vuex 路由状态管理，一个模块在modules 中建一个文件夹
router 一个模块一个模块在modules 中建一个文件夹
style 样式尽量采用iView自带组建，common.less 系统通用样式不要轻易动
自定义通用样式 style.less,每次添加必须加注释，页面独立样式在在页面内写，后缀less 格式
组建样式 styles 中添加文件夹 composents 对应components 目录新建样式文件
utils 自定义工具js 独立命名，一般不用新建文件夹

## 模块命名
~~~
├─ login 登录
├─ dashboard 首页
├─ product 商品管理
├─ order 系统订单管理
├─ promoter 分销
├─ user 用户管理
├─ accounts 财务管理
├─ merchant 商户管理
├─ app 各个应用模块功能管理公众号、小程序、支付宝、百度小程序、今日头条小程序
├─ system 系统更新日志 数据库管理 素材管理
├─ setting 系统身份管理 系统权限管理、系统菜单管理、操作日志
├─ sms 短信设置
├─ systemForm 商城设置
├─ freight 物流设置
├─ maintain 安全维护
├─ safe 维护-页面链接
├─ userFeedback 用户反馈
├─ error-page 错误页

~~~
## 目录结构
主要目录结构及说明：
~~~

├── public                      # 静态资源
│   ├── favicon.ico            # favicon图标
│   └── index.html             # html 模板
├── src                       # 源代码
│   ├── api                   # 所有接口api
│   │    └──request.js        # 请求封装
│   │    └──accounts.js       # 有关财务的接口
│   │    └──promoter.js       # 有关分销的接口
│   │    └──app.js            # 有关应用（小程序、公众号）的接口
│   │    └──cms.js            # 有关内容（文章管理、分类）的接口
│   │    └──home.js           # 有关首页的接口
│   │    └──order.js          # 有关订单的接口
│   │    └──product.js        # 有关商品的接口
│   │    └──setting.js        # 有关权限管理的接口
│   │    └──system.js         # 有关系统配置的接口
│   │    └──systemForm.js     # 有关表单组件的接口
│   │    └──maintain.js       # 有关安全维护的接口
│   │    └──merchant.js       # 有关商户的接口
│   │    └──sms.js            # 有关短信设置的接口
│   │    └──user.js           # 有关登录、用户的接口
│   │    └──userFeedback.js   # 有关用户反馈的接口
│   │    └──freight.js        # 有关物流设置的接口
│   ├── assets                 # 图片、svg 等静态资源
│   ├── icons                 # svg 等静态资源
│   ├── components             # 公共组件
│   │    └──Breadcrumb        # 头部标题标签
│   │    └──cards             # 统计
│   │    └──echarts           # 统计图
│   │    └──goodsList         # 商品列表
│   │    └──Hamburger         # 导航收缩组件
│   │    └──HeaderSearch      # 导航搜索组件
│   │    └──iconFrom          # 导航添加图标
│   │    └──newsCategory      # 图文组件
│   │    └──RightPanel        # 右侧设置按钮，设置导航相关
│   │    └──Screenfull        # 全屏
│   │    └──SvgIcon           # svg图标
│   │    └──ThemePicker       # 右侧设置按钮，设置组题颜色
│   │    └──ueditorFrom       # 富文本编辑器
│   │    └──uploadPicture     # 上传图片组件
│   ├── layouts               # 导航布局
│   │    ├──index             # 主页面
│   │    ├──components        # 导航组件
│   │        └──Settings      # 右边小按钮，设置导航等
│   │        └──Sidebar       # 侧边导航
│   │        └──TagsView      # tab标签页导航
│   │        └──Navbar        # 头部导航
│   │        └──AppMain       # 导航路由
│   │        └──index.js      # 组件引用
│   │    └──mixins            # 自适应大小
│   ├── libs                  # 公共js方法
│   │    └──settingMer        # 配置请求地址
│   ├── views                 # 所有页面
│   │    └──login                    # 登录
│   │         └──index               # 登录
│   │    └──dashboard                # 首页
│   │    └──product                  # 商品
│   │         └──band                # 品牌管理
│   │         └──productClassify     # 商品分类
│   │         └──productExamine      # 商品审核
│   │         └──productComment      # 商品评论管理
│   │    └──order                    # 订单管理
│   │    └──promoter                 # 分销
│   │         └──user                # 分销员列表
│   │         └──config              # 分销设置
│   │    └──cms                      # 内容
│   │         └──addArticle          # 添加文章/编辑文章
│   │         └──article             # 文章管理
│   │         └──articleCategory     # 文章分类
│   │    └──user                     # 用户
│   │         └──group               # 用户分组
│   │         └──group               # 用户标签
│   │         └──list                # 用户管理
│   │    └──accounts          # 财务
│   │         └──bill         # 充值记录
│   │         └──capital      # 资金记录
│   │         └──extract      # 提现管理
│   │         └──reconciliation  # 财务对账
│   │    └──merchant          # 商户
│   │         └──list         # 商户列表
│   │         └──classify     # 商户分类
│   │         └──system       # 商户菜单管理
│   │    └──app               # 应用
│   │         └──wechat       # 公众号
│   │              └──menus   # 微信菜单
│   │              └──newsCategory   # 图文管理
│   │                   └──save      # 图文添加
│   │              └──reply          # 自动回复
│   │                   └──follow    # 微信关注回复/无效关键词回复
│   │                   └──keyword   # 关键字回复
│   │              └──wxTemplate     # 微信/小程序模板消息
│   │    └──system                   # 设置
│   │         └──config              # 系统设置
│   │              └──classify       # 配置分类
│   │              └──setting        # 配置管理
│   │              └──picture        # 素材管理
│   │         └──groupData           # 组合设置
│   │              └──list           # 组合数据
│   │              └──data           # 组合数据列表/登录页幻灯片/首页幻灯片/首页导航按钮/首页推荐区/个人中心幻灯片/个人中心菜单/热门搜索/分销特权/分销海报/充值金额配置
│   │    └──setting                  # 设置-权限管理
│   │         └──systemRole          # 身份管理
│   │         └──systemAdmin         # 管理员管理
│   │         └──systemLog           # 操作日志
│   │         └──systemMenu          # 菜单管理
│   │    └──systemForm               # 设置-商城设置
│   │         └──setSystem           # 基础配置/商城配置/余额充值设置/文件上传/短信提醒开关/公众号支付配置/小程序支付配置/公众号配置/小程序配置
│   │    └──sms                      # 短信设置
│   │         └──smsConfig           # 短信账户
│   │         └──smsTemplate         # 短信模板
│   │         └──smsPay              # 短信购买
│   │    └──freight                  # 物流设置
│   │         └──express             # 物流公司
│   │    └──maintain                 # 安全维护
│   │         └──dataBackup          # 数据备份
│   │         └──auth                # 商业授权
│   │    └──safe                     # 维护-页面链接
│   │         └──pageLinks           # 页面链接
│   │    └──userFeedback             # 用户-用户反馈
│   │         └──list                # 反馈列表
│   │         └──classify            # 反馈分类
│   │    └──error-page               # 错误页
│   │         └──404                 # 错误页404
│   │         └──403                 # 错误页403
│   ├── filters                      # 过滤器
│   ├── router                           # 路由配置
│   │    └──modules                      # 页面路由模块
│   │         └──accounts.js                  # 有关财务
│   │         └──app.js                       # 有关应用（公众号）
│   │         └──cms.js                       # 有关内容（文章管理、文章分类）
│   │         └──config.js                    # 有关系统配置
│   │         └──freight.js                   # 有关物流设置
│   │         └──group.js                     # 有关组合数据
│   │         └──maintain.js                  # 有关安全维护
│   │         └──merchant.js                  # 有关商户
│   │         └──order.js                     # 有关订单
│   │         └──product.js                   # 有关商品
│   │         └──promoter.js                  # 有关分销
│   │         └──routine.js                   # 有关小程序
│   │         └──safe.js                      # 有关维护
│   │         └──setting.js                   # 有关权限
│   │         └──sms.js                       # 有关短信
│   │         └──systemForm.js                # 有关商城设置
│   │         └──user.js                      # 有关用户
│   │         └──feedback.js                  # 有关用户反馈
│   │    └──index.js                          # 路由的汇总
│   ├── store                                 # Vuex 状态管理
│   ├── utils                                 # 全局公用方法
│   ├── styles            # 样式管理
│   ├── permission.js     # 路由拦截
│   ├── setting.js        # 业务配置文件
│   ├── main.js           # 入口文件 加载组件 初始化等
│   └── App.vue           # 入口页面
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json

~~~
## 开发打包项目
~~~
# 进入项目目录
$ cd admin-iView

# 安装依赖
$ npm install

# 启动项目(本地开发环境)
$ npm run dev

# 打包项目
## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```
## Advanced
```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```