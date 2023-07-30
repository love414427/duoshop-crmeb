<template>
  <div>
    <el-drawer
      :with-header="false"
      :size="1000"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"  
    >
    <div v-loading="loading" v-if="psInfo">
       <div class="head">
        <div class="full">
          <img class="order_icon" :src="psInfo.avatar ? psInfo.avatar : moren" alt="" />
          <div class="text">
            <div class="title">{{psInfo.nickname}}</div>
            <div v-if="psInfo.is_svip > 0" class="svip">
              <img src="../../../assets/images/svip.png">
            </div>
          </div>
            <div>
              <el-button
              type="primary"
              size="small"
              @click="onEdit"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="setMoney"
              >设置余额</el-button
            >
            <el-dropdown @command="handleCommand">
              <el-button icon="el-icon-more" size="small"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="integral">设置积分</el-dropdown-item>
                <el-dropdown-item command="group">设置分组</el-dropdown-item> 
                <el-dropdown-item command="label">设置标签</el-dropdown-item> 
                <el-dropdown-item command="reference">修改推荐人</el-dropdown-item> 
                <el-dropdown-item command="password">修改密码</el-dropdown-item> 
                <el-dropdown-item command="svipLevel">编辑会员等级</el-dropdown-item> 
                <el-dropdown-item command="svipSet">付费会员设置</el-dropdown-item> 
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div>
          <ul class="list">
            <li class="item">
              <div class="title">余额</div>
              <div>
                <div class="value1">{{psInfo.now_money}}元</div>
              </div>
            </li>
            <li class="item">
              <div class="title">总计订单</div>
              <div>{{psInfo.pay_count}}笔</div>
            </li>
            <li class="item">
              <div class="title">总消费金额</div>
              <div>{{psInfo.pay_price}}元</div>
            </li>
            <li class="item">
              <div class="title">积分</div>
              <div>{{psInfo.integral}}</div>
            </li>
            <li class="item">
              <div class="title">用户经验</div>
              <div>{{psInfo.member_value}}</div>
            </li>
          </ul>
        </div>
       </div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="用户信息" name="userInfo">
            <div class="section">
              <div class="title">基本信息</div>
              <ul class="list">
                <li class="item">
                  <div>用户ID：</div>
                  <div class="value">{{ psInfo.uid || '-' }}</div>
                </li>
                <li class="item">
                  <div>真实姓名：</div>
                  <div class="value">{{ psInfo.real_name || '-' }}</div>
                </li>
                <li class="item">
                  <div>手机号码：</div>
                  <div class="value">{{ psInfo.phone || '-' }}</div>
                </li>
                <li class="item">
                  <div>生日：</div>
                  <div class="value">{{ psInfo.birthday || '-' }}</div>
                </li>
                <li class="item">
                  <div>性别：</div>
                  <div class="value">{{ psInfo.sex == 1 ? '男' : '女' }}</div>
                </li>
              </ul>
            </div>
            <div class="section">
              <div class="title">用户概况</div>
              <ul class="list">
                <li class="item">
                  <div>推广员：</div>
                  <div class="value">{{psInfo.is_promoter == 1 ? '是' : '否'}}</div>
                </li>
                <li class="item">
                  <div>用户状态：</div>
                  <div class="value">{{psInfo.status == 1 ? '开启' : '关闭'}}</div>
                </li>
                <li class="item">
                  <div>用户等级：</div>
                  <div class="value">{{psInfo.member_level}}</div>
                </li>
                 <li class="item">
                  <div>用户标签：</div>
                  <div class="value">
                    <span v-for="(item,index) in psInfo.userLabel" :key="index">
                      {{item.label_name}}
                    </span>
                  </div>
                </li>
                <li class="item">
                  <div>用户分组：</div>
                  <div class="value">{{psInfo.group && psInfo.group.group_name || '无'}}</div>
                </li>
                <li class="item">
                  <div>推广人：</div>
                  <div class="value">{{psInfo.spread && psInfo.spread.nickname || '无'}}</div>
                </li>
                <li class="item">
                  <div>注册时间：</div>
                  <div class="value">{{psInfo.last_time}}</div>
                </li>
                <li class="item">
                  <div>登录时间：</div>
                  <div class="value">{{psInfo.create_time}}</div>
                </li>
                <li v-if="psInfo.is_svip == 1 || psInfo.is_svip == 2" class="item">
                  <div>会员到期时间：</div>
                  <div class="value">{{psInfo.svip_endtime}}</div>
                </li> 
              </ul>
            </div>
            <div class="section">
              <div class="title">用户备注</div>
              <ul class="list">
                <li class="item">
                  <div>备注：</div>
                  <div class="value">{{ psInfo.mark ? psInfo.mark : '-' }}</div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="消费记录" name="record">
            <el-table :data="tableData.data" size="small">
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :prop="item.key"
                :label="item.title"
                width="item.minWidth"
              />
            </el-table>
            <div class="block">
              <el-pagination
                :page-sizes="[6, 12, 18, 24]"
                :page-size="tableFrom.limit"
                :current-page="tableFrom.page"
                layout="total, prev, pager, next"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="积分明细" name="detailed">
            <el-table :data="tableData.data" size="small">
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :prop="item.key"
                :label="item.title"
                width="item.minWidth"
              />
          </el-table>
          <div class="block">
            <el-pagination
              :page-sizes="[6, 12, 18, 24]"
              :page-size="tableFrom.limit"
              :current-page="tableFrom.page"
              layout="total, prev, pager, next"
              :total="tableData.total"
              @size-change="handleSizeChange"
              @current-change="pageChange"
            />
          </div>
          </el-tab-pane>
          <el-tab-pane label="签到记录" name="signRecord">
             <el-table :data="tableData.data" size="small">
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :prop="item.key"
                :label="item.title"
                width="item.minWidth"
              />
            </el-table>
            <div class="block">
              <el-pagination
                :page-sizes="[6, 12, 18, 24]"
                :page-size="tableFrom.limit"
                :current-page="tableFrom.page"
                layout="total, prev, pager, next"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="持有优惠券" name="coupon">
             <el-table :data="tableData.data" size="small">
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :prop="item.key"
                :label="item.title"
                width="item.minWidth"
              />
            </el-table>
            <div class="block">
              <el-pagination
                :page-sizes="[6, 12, 18, 24]"
                :page-size="tableFrom.limit"
                :current-page="tableFrom.page"
                layout="total, prev, pager, next"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="余额变更" name="balance" size="small">
             <el-table :data="tableData.data" size="small">
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :prop="item.key"
                :label="item.title"
                width="item.minWidth"
              />
            </el-table>
            <div class="block">
              <el-pagination
                :page-sizes="[6, 12, 18, 24]"
                :page-size="tableFrom.limit"
                :current-page="tableFrom.page"
                layout="total, prev, pager, next"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="浏览足迹" name="footsteps">
            <el-table :data="tableData.data" size="small">
              <template>
                <el-table-column
                  v-for="(item, index) in columns"
                  :key="index"
                  :prop="item.key"
                  :label="item.title"
                  width="item.minWidth"
                >
                 <template slot-scope="scope">
                  <div v-if="item.key == 'image'" class="acea-row" style="align-items: center;">
                      <div class="demo-image__preview">
                        <el-image v-if="scope.row.spu" :src="scope.row.spu&&scope.row.spu.image" :preview-src-list="[scope.row.spu.image]" />
                      </div>
                      <span class="priceBox" style="margin-left: 10px;width: 220px;">{{scope.row.spu&&scope.row.spu.store_name}}</span>
                    </div>
                  <span v-else-if="item.key == 'create_time'">{{scope.row[item.key]}}</span>
                  <span v-else>{{scope.row.spu&&scope.row.spu[item.key]}}</span>
                </template>
              </el-table-column>
              </template>
            </el-table>
            <div class="block">
              <el-pagination
                :page-sizes="[6, 12, 18, 24]"
                :page-size="tableFrom.limit"
                :current-page="tableFrom.page"
                layout="total, prev, pager, next"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="推荐人变更记录" name="recommend">
            <el-table :data="tableData.data" size="small">
              <el-table-column prop="spread.uid" label="上级推荐人ID" min-width="100">
                 <template slot-scope="scope">
                  <span>{{(scope.row.spread && scope.row.spread.uid) || '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="spread.nickname" label="上级推荐人昵称" min-width="100">
                 <template slot-scope="scope">
                  <span>{{(scope.row.spread && scope.row.spread.nickname) || '用户已注销'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="create_time" label="绑定时间" min-width="100" />
            </el-table>
            <div class="block">
              <el-pagination
                :page-sizes="[6, 12, 18, 24]"
                :page-size="tableFrom.limit"
                :current-page="tableFrom.page"
                layout="total, prev, pager, next"
                :total="tableData.total"
                @size-change="handleSizeChange"
                @current-change="pageChange"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
       </div>









    <!-- <div v-if="psInfo" class="acea-row row-middle">
      <div class="avatar mr15"><div class="block"><el-avatar :size="50" :src="psInfo.avatar ? psInfo.avatar : moren"></el-avatar></div></div>
      <div class="dashboard-workplace-header-tip">
        <p class="dashboard-workplace-header-tip-title" v-text="psInfo.nickname || '-'" />
        <div class="dashboard-workplace-header-tip-desc">
          <span class="dashboard-workplace-header-tip-desc-sp">余额: {{ psInfo.now_money }}</span>
          <span class="dashboard-workplace-header-tip-desc-sp">总计订单: {{ psInfo.pay_count }}</span>
          <span class="dashboard-workplace-header-tip-desc-sp">总消费金额: {{ psInfo.pay_price }}</span>
          <span class="dashboard-workplace-header-tip-desc-sp">本月订单: {{ psInfo.total_pay_count }}</span>
          <span class="dashboard-workplace-header-tip-desc-sp">本月消费金额: {{ psInfo.total_pay_price }}</span>
          <span v-if="psInfo.is_svip" class="dashboard-workplace-header-tip-desc-sp">会员到期时间: {{ psInfo.svip_endtime }}</span>
          <span v-if="cancelTime" class="dashboard-workplace-header-tip-desc-sp">注销时间: {{ cancelTime }}</span>
        </div>
      </div>
    </div>
    <el-row align="middle" :gutter="10" class="ivu-mt mt20">
      <el-col :span="4">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @select="changeType"
        >
          <el-menu-item v-for="(item, index) in list" :key="index" :name="item.val" :index="item.val">
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-table v-loading="loading" :data="tableData.data" class="tabNumWidth" :key="type" ref="tabe" size="mini">
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.key"
            :label="item.title"
            width="item.minWidth"
          />
          <el-table-column v-if="type === '3'" :key="111" label="有效期" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row ? scope.row.start_time + '-' + scope.row.end_time: '' | filterEmpty}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="type === '2'" :key="112" label="上级推荐人头像" min-width="150">
            <template slot-scope="scope">
                <div class="demo-image__preview">
                    <el-image style="width: 36px; height: 36px" :src="scope.row.spread&&scope.row.spread.avatar ? scope.row.spread.avatar : moren" :preview-src-list="[scope.row.avatar || moren]" />
                </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-sizes="[6, 12, 18, 24]"
            :page-size="tableFrom.limit"
            :current-page="tableFrom.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="pageChange"
          />
        </div>
      </el-col>
    </el-row> -->
    </el-drawer>
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
import { userOrderApi, userDetailApi, userCouponApi, userBillApi, 
         modifyUserRefLog, userPointsApi, userSignLogApi, userHistoryApi } from '@/api/user'
export default {
  name: 'UserDetails',
  props: {
    cancelTime: {
      type: Number,
      default: null
    },
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      direction: 'rtl',
      moren: require("@/assets/images/f.png"),
      loading: false,
      columns: [],
      activeName: 'userInfo',
      Visible: false,
      loading: false,
      list: [
        { val: '0', label: '消费记录' },
        { val: '3', label: '持有优惠券' },
        { val: '4', label: '余额变动' },
        { val: '2', label: '推荐人修改记录' }
      ],
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 6
      },
      psInfo: null,
      type: '0'
    }
  },
  mounted() {

    
  },
  beforeUpdate(){
    this.$nextTick(() =>{
      // this.$refs['tabe'].doLayout();
    })
  },
  methods: {
    changeType(key) {
      this.type = key
      this.tableFrom.page = 1
      this.getInfo(key)
    },
    getData(id){
      this.activeName = 'userInfo'
      if (id) {
        this.uid = id
        this.getHeader()
        // this.getInfo('0')
      }
    },
    getInfo(key) {
      this.loading = true
      switch (key) {
        case 'record':
          userOrderApi(this.uid, this.tableFrom).then(res => {
            this.tableData.data = res.data.list
            this.tableData.total = res.data.count
            this.columns = [
              {
                title: '订单编号',
                key: 'order_sn',
                minWidth: 250
              },
              {
                title: '收货人',
                key: 'real_name',
                minWidth: 90
              },
              {
                title: '商品数量',
                key: 'total_num',
                minWidth: 80
              },
              {
                title: '商品总价',
                key: 'total_price',
                minWidth: 90
              },
              {
                title: '实付金额',
                key: 'pay_price',
                minWidth: 90
              },
              {
                title: '交易完成时间',
                key: 'pay_time',
                minWidth: 160
              }
            ]
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        break
      case 'recommend':
          modifyUserRefLog(this.uid, this.tableFrom).then(res => {
            this.tableData.data = res.data.list
            this.tableData.total = res.data.count
            this.columns = [
              {
                title: '上级推荐人ID',
                key: 'spread.uid',
                minWidth: 120
              },
              {
                title: '上级推荐人昵称',
                key: 'spread.nickname',
                minWidth: 120
              },
              {
                title: '绑定时间',
                key: 'create_time',
                minWidth: 120
              }
            ]
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
          break
      case 'signRecord':
        userSignLogApi(this.uid, this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.columns = [
            {
              title: '获得积分',
              key: 'number',
              minWidth: 120
            },
            {
              title: '签到时间',
              key: 'create_time',
              minWidth: 120
            },
            {
              title: '备注',
              key: 'mark',
              minWidth: 120
            },
            
          ]
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        break
      case 'coupon':
        userCouponApi(this.uid, this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.columns = [
            {
              title: '优惠券名称',
              key: 'coupon_title',
              minWidth: 120
            },
            {
              title: '面值',
              key: 'coupon_price',
              minWidth: 120
            },
            {
              title: '最低消费额',
              key: 'use_min_price',
              minWidth: 120
            },
            {
              title: '兑换时间',
              key: 'use_time',
              minWidth: 120
            }
          ]
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        break
      case 'balance':
        userBillApi(this.uid, this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.columns = [
            {
              title: '变动金额',
              key: 'number',
              minWidth: 90
            },
            {
              title: '变动后',
              key: 'balance',
              minWidth: 90
            },
            {
              title: '类型',
              key: 'title',
              minWidth: 100
            },
            {
              title: '创建时间',
              key: 'create_time',
              minWidth: 150
            },
            {
              title: '备注',
              key: 'mark',
              minWidth: 200
            }
          ]
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        break
      case 'detailed':
        userPointsApi(this.uid, this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.columns = [
            {
              title: '来源/用途',
              key: 'title',
              minWidth: 90
            },
            {
              title: '积分变化',
              key: 'number',
              minWidth: 90
            },
            {
              title: '变化后积分',
              key: 'balance',
              minWidth: 100
            },
            {
              title: '日期',
              key: 'create_time',
              minWidth: 150
            },
            {
              title: '备注',
              key: 'mark',
              minWidth: 200
            }
          ]
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        break 
      case 'footsteps':
        userHistoryApi(this.uid, this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.columns = [
            {
              title: '商品信息',
              key: 'image',
              minWidth: 200
            },
            {
              title: '价格',
              key: 'price',
              minWidth: 50
            },
            {
              title: '浏览时间',
              key: 'create_time',
              minWidth: 50
            }
          ]
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        break
      default:
        userBillApi(this.uid, this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.columns = [
            {
              title: '变动金额',
              key: 'number',
              minWidth: 90
            },
            {
              title: '变动后',
              key: 'balance',
              minWidth: 90
            },
            {
              title: '类型',
              key: 'title',
              minWidth: 100
            },
            {
              title: '创建时间',
              key: 'create_time',
              minWidth: 150
            },
            {
              title: '备注',
              key: 'mark',
              minWidth: 200
            }
          ]
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    handleClose() {
      this.$emit('closeDrawer');
    },
    tabClick(tab) {
      this.tableFrom.page = 1;
      this.getInfo(tab.name)
    },
    onEdit(){
      this.$emit('onEdit',this.uid);
    },
    setMoney() {
      this.$emit('setMoney',{uid: this.uid});
    },
   //下拉
    handleCommand(command) {
       if (command == 'integral') {
        this.$emit('changeIntegral',{uid: this.uid});
      } else if (command == 'group') {
        this.$emit('setGroup',{uid: this.uid});
      } else if (command == 'label') {
        this.$emit('setLabel',{uid: this.uid});
      } else if (command == 'reference') {
        this.$emit('setModify',{uid: this.uid});
      } else if (command == 'password') {
        this.$emit('setPassword',{uid: this.uid});
      } else if (command == 'svipLevel') {
        this.$emit('setMember',{uid: this.uid});
      } else if (command == 'svipSet') {
        this.$emit('giveMember',{uid: this.uid});
      }
      
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getInfo(this.activeName)
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getInfo(this.activeName)
    },
    getHeader() {
      userDetailApi(this.uid).then(res => {
        this.psInfo = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .avatar{
    width: 60px;
    height: 60px;
    margin-left: 18px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .dashboard-workplace {
    &-header {
      &-avatar {
        /*width: 64px;*/
        /*height: 64px;*/
        /*border-radius: 50%;*/
        margin-right: 16px;
        font-weight: 600;
      }

      &-tip {
        width: 82%;
        display: inline-block;
        vertical-align: middle;
        margin-top: -12px;
        &-title {
          font-size: 13px;
          color: #000000;
          margin-bottom: 12px;
        }

        &-desc {
          &-sp {
            width: 32%;
            color: #17233D;
            font-size: 13px;
            display: inline-block;
          }
        }
      }

      &-extra {
        .ivu-col {
          p {
            text-align: right;
          }

          p:first-child {
            span:first-child {
              margin-right: 4px;
            }

            span:last-child {
              color: #808695;
            }
          }

          p:last-child {
            font-size: 22px;
          }
        }
      }
    }
  }
  .head {
    padding: 20px 35px 10px;
    .full {
      display: flex;
      align-items: center;
      .order_icon {
        width: 60px;
        height: 60px;
        border-radius: 100%;
      }
      .iconfont {
        color: #1890ff;
        &.sale-after {
          color: #90add5;
        }
      }
      .text {
        align-self: center;
        flex: 1;
        min-width: 0;
        padding-left: 12px;
        font-size: 13px;
        color: #606266;
        .title {
          margin-bottom: 10px;
          font-weight: 500;
          font-size: 16px;
          line-height: 16px;
          color: rgba(0, 0, 0, 0.85);
        }
        .order-num {
          padding-top: 10px;
          white-space: nowrap;
        }
      }
    .svip{
      img{
        width: 40px;
        height: 15px;
      }
    }
  }
  .list {
    display: flex;
    margin-top: 20px;
    overflow: hidden;
    list-style: none;
    padding: 0;
    .item {
      flex: none;
      width: 200px;
      font-size: 14px;
      line-height: 14px;
      color: rgba(0, 0, 0, 0.85);
      .title {
        margin-bottom: 12px;
        font-size: 13px;
        line-height: 13px;
        color: #666666;
      }
      .value1 {
        color: #f56022;
      }

      .value2 {
        color: #1bbe6b;
      }

      .value3 {
        color: #1890ff;
      }

      .value4 {
        color: #6a7b9d;
      }

      .value5 {
        color: #f5222d;
      }
    }
  }
}
.el-tabs--border-card {
  box-shadow: none;
  border-bottom: none;
}
.section {
  padding: 20px 0 5px;
  border-bottom: 1px dashed #eeeeee;
  .title {
    padding-left: 10px;
    border-left: 3px solid #1890ff;
    font-size: 15px;
    line-height: 15px;
    color: #303133;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
  .item {
    flex: 0 0 calc(100% / 3);
    display: flex;
    margin-top: 16px;
    font-size: 13px;
    color: #606266;
    &:nth-child(3n + 1) {
      padding-right: 20px;
    }

    &:nth-child(3n + 2) {
      padding-right: 10px;
      padding-left: 10px;
    }

    &:nth-child(3n + 3) {
      padding-left: 20px;
    }
  }
  .value {
    flex: 1;
    image {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 0 12px 12px 0;
      vertical-align: middle;
    }
  }
}
.tab {
  display: flex;
  align-items: center;
  .el-image {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
}
/deep/.el-drawer__body {
  overflow: auto;
}
.gary {
  color: #aaa;
}
.logistics{
  align-items: center;
  padding: 10px 0px;
  .logistics_img{
    width: 45px;
    height: 45px;
    margin-right: 12px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .logistics_cent{
    span{
      display: block;
      font-size: 12px;
    }
  }
}
.tabBox_tit {
  width: 53%;
  font-size: 12px !important;
  margin: 0 2px 0 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  box-sizing: border-box;
}
</style>
