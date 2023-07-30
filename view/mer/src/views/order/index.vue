<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" inline>
            <el-form-item label="订单状态：" style="display: block;">
              <el-radio-group v-model="tableFrom.status" type="button" @change="getList(1),getCardList()">
                <el-radio-button label>全部 {{ '(' +orderChartType.all?orderChartType.all:0 + ')' }}</el-radio-button>
                <el-radio-button label="1">待付款 {{ '(' +orderChartType.unpaid?orderChartType.unpaid:0+ ')' }}</el-radio-button>
                <el-radio-button label="2">待发货 {{ '(' +orderChartType.unshipped?orderChartType.unshipped:0+ ')' }}</el-radio-button>
                <el-radio-button label="3">待收货 {{ '(' +orderChartType.untake?orderChartType.untake:0+ ')' }}</el-radio-button>
                <el-radio-button label="4">待评价 {{ '(' +orderChartType.unevaluate?orderChartType.unevaluate:0+ ')' }}</el-radio-button>
                <el-radio-button label="5">交易完成 {{ '(' +orderChartType.complete?orderChartType.complete:0+ ')' }}</el-radio-button>
                <el-radio-button label="6">已退款 {{ '(' +orderChartType.refund?orderChartType.refund:0+ ')' }}</el-radio-button>
                <el-radio-button label="7">已删除 {{ '(' +orderChartType.del?orderChartType.del:0+ ')' }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间选择：" class="width100" style="display: block;">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
            </el-form-item>
            <div>
              <el-form-item label="商品名称" class="width100">
                <el-input v-model="tableFrom.store_name" placeholder="请输入商品名称" class="selWidth" size="small" @keyup.enter.native="getList(1),getCardList()">
                  <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
                </el-input>
              </el-form-item>
              <el-form-item label="总单单号：" class="width100">
                <el-input v-model="tableFrom.group_order_sn" placeholder="请输入总单订单号" class="selWidth" size="small" @keyup.enter.native="getList(1),getCardList()">
                  <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
                </el-input>
              </el-form-item>
              <el-form-item label="发货方式：" class="width100">
                <el-select
                  v-model="tableFrom.filter_delivery"
                  placeholder="请选择"
                  class="filter-item selWidth"
                  clearable
                  @change="getList(1),getCardList()"
                >
                  <el-option
                    v-for="item in dliveryWayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="商品类型：" class="width100">
                <el-select
                  v-model="tableFrom.filter_product"
                  placeholder="请选择"
                  class="filter-item selWidth"
                  clearable
                  @change="getList(1),getCardList()"
                >
                  <el-option
                    v-for="item in productTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="活动类型：" class="width100">
                <el-select
                  v-model="tableFrom.activity_type"
                  placeholder="请选择"
                  class="filter-item selWidth"
                  clearable
                  @change="getList(1),getCardList()"
                >
                  <el-option
                    v-for="item in activityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="关键字：" class="width100" style="display: block;">
              <el-input v-model="tableFrom.keywords" placeholder="请输入订单号/收货人/联系方式" class="selWidth" size="small" @keyup.enter.native="getList(1),getCardList()">
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
              <el-dropdown class="dropdown" @command="exports">
                <span class="el-dropdown-link">
                  列表导出<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">导出订单</el-dropdown-item>
                  <el-dropdown-item command="2">导出发货单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="用户信息：" class="width100">
              <el-input v-model="tableFrom.username" placeholder="请输入用户昵称/手机号" class="selWidth" size="small" @keyup.enter.native="getList(1),getCardList()">
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
              <el-button size="small" type="primary" @click="orderCancellation('')">订单核销</el-button>
              <el-upload
                style="display: inline-block;"
                class="upload-demo"
                :headers="myHeaders"
                :action="fileUrl"
                :on-success="handleSuccess"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">导入批量发货</el-button>
              </el-upload>
              <el-button @click="getDeliveryList">批量发货记录</el-button>
              <el-button size="small" type="primary" @click="batchSend">批量发送货</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-tabs v-if="headeNum.length > 0" v-model="tableFrom.order_type" @tab-click="getList(1),getCardList(),getHeaderList()">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.order_type.toString()" :label="item.title +'('+item.count +')' " />
        </el-tabs>
        <cards-data :card-lists="cardLists" />
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" class="table" highlight-current-row :cell-class-name="addTdClass">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品总价：">
                <span>{{ props.row.total_price | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="下单时间：">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="用户备注：">
                <span style="display: inline-block; width: 200px;">{{ props.row.mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="商家备注：">
                <span>{{ props.row.remark | filterEmpty }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template slot="header" slot-scope="scope">
            <el-popover placement="top-start" width="100" trigger="hover" class="tabPop">
              <div>
                <span class="spBlock onHand" :class="{'check': chkName === 'dan'}" @click="onHandle('dan',scope.$index)">选中本页</span>
                <span class="spBlock onHand" :class="{'check': chkName === 'duo'}" @click="onHandle('duo')">选中全部</span>
              </div>
              <el-checkbox slot="reference" :value="(chkName === 'dan' && checkedPage.indexOf(tableFrom.page) > -1) || chkName === 'duo'" @change="changeType" />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-checkbox :value="checkedIds.indexOf(scope.row.order_id) > -1 || (chkName === 'duo' && noChecked.indexOf(scope.row.order_id) === -1)" @change="(v)=>changeOne(v,scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="170">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.order_sn" />
            <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="real_name" label="收货人/订购人" min-width="130" />
        <el-table-column label="商品信息" min-width="330">
          <template slot-scope="scope">
            <div v-for="(val, i) in scope.row.orderProduct" :key="i" class="tabBox acea-row row-middle">
              <div class="demo-image__preview">
                <el-image :src="val.cart_info.product.image" :preview-src-list="[val.cart_info.product.image]" />
              </div>
              <span class="tabBox_tit">{{ val.cart_info.product.store_name + ' | ' }}{{ val.cart_info.productAttr.sku }}</span>
              <span class="tabBox_pice">
                <span v-if="scope.row.activity_type === 2 && val.cart_info.productPresellAttr">{{ '￥'+ val.cart_info.productPresellAttr.presell_price + ' x '+ val.product_num }}</span>
                <span v-else-if="scope.row.activity_type === 3 && val.cart_info.productAssistAttr">{{ '￥'+ val.cart_info.productAssistAttr.assist_price + ' x '+ val.product_num }}</span>
                <span v-else>{{ '￥'+ val.cart_info.productAttr.price + ' x '+ val.product_num }}</span>
                <em v-if="val.refund_num < val.product_num && val.refund_num >= 0" style="color: red;font-style: normal;">(-{{ val.product_num - val.refund_num }})</em>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际支付" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_price }}</span>
            <p v-if="scope.row.finalOrder">尾款：{{ scope.row.finalOrder.pay_price }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单佣金" min-width="100">
          <template slot-scope="scope">
            <span>{{ (parseFloat(scope.row.extension_one) + parseFloat(scope.row.extension_two) + parseFloat(scope.row.refund_extension_one) + parseFloat(scope.row.refund_extension_two)).toFixed(2) }}</span>
            <em v-if="(scope.row.refund_extension_one > 0) || (scope.row.refund_extension_two > 0)" style="color: red;font-style: normal;">(-{{ (parseFloat(scope.row.refund_extension_one)+parseFloat(scope.row.refund_extension_two)).toFixed(2) }})</em>
          </template>
        </el-table-column>
        <el-table-column label="支付类型" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.paid === 1">{{ scope.row.pay_type | orderPayType }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.paid === 0 ? "未支付" : "已支付" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.is_del === 0">
              <span v-if="scope.row.paid === 0">待付款</span>
              <span v-else>
                <span v-if="scope.row.order_type === 0 || scope.row.order_type === 2">{{ scope.row.status | orderStatusFilter }}</span>
                <span v-else>{{ scope.row.status | takeOrderStatusFilter }}</span>
              </span>
            </span>
            <span v-else>已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" min-width="130" />
        <el-table-column label="推广人" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.spread && scope.row.spread.nickname || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上级推广人" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.TopSpread && scope.row.TopSpread.nickname || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column key="8" label="操作" min-width="150" fixed="right" align="left">
          <template slot-scope="scope">
            <el-button v-if="orderFilter(scope.row) " type="text" size="small" @click="onRefundDetail(scope.row.order_sn)">查看退款单</el-button>
            <el-button v-if="scope.row.paid === 0 && scope.row.is_del===0 && scope.row.activity_type != 2" type="text" size="small" class="mr10" @click="edit(scope.row.order_id)">编辑</el-button>
            <el-button v-if="(scope.row.order_type == 0 || scope.row.order_type == 2) && scope.row.status === 0 && scope.row.paid === 1" type="text" size="small" class="mr10" @click="send(scope.row,scope.row.order_id)">发送货</el-button>
            <el-button type="text" size="small" class="mr10" @click="onOrderDetails(scope.row.order_id)">订单详情</el-button>
            <el-button v-if="scope.row.is_del !== 0" type="text" size="small" class="mr10" @click.native="handleDelete(scope.row, scope.$index)">删除</el-button>
            <el-button v-if="scope.row.order_type == 1 && scope.row.status === 0 && scope.row.paid === 1" type="text" size="small" class="mr10" @click.native="orderCancellation(scope.row.verify_code)">去核销</el-button>
            
            <!-- <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="(scope.row.paid===1 && scope.row.order_type===0)" @click.native="printOrder(scope.row.order_id)">订单打印</el-dropdown-item>
                <el-dropdown-item v-if="(scope.row.status < 1 && scope.row.is_del===0)" @click.native="onOrderDetails(scope.row.order_id)">订单详情</el-dropdown-item>
                <el-dropdown-item @click.native="onOrderMark(scope.row.order_id)">订单备注</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.is_del !== 0" @click.native="handleDelete(scope.row, scope.$index)">删除订单</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.order_type == 0 && scope.row.status === 1 && scope.row.paid === 1" @click.native="reSend(scope.row.order_id)">修改发货信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
      </div>
    </el-card>

    <!--记录-->
    <el-dialog title="操作记录" :visible.sync="dialogVisible" width="700px">
      <el-table v-loading="LogLoading" border :data="tableDataLog.data" style="width: 100%">
        <el-table-column prop="order_id" align="center" label="订单ID" min-width="80" />
        <el-table-column prop="change_message" label="操作记录" align="center" min-width="280" />
        <el-table-column prop="change_time" label="操作时间" align="center" min-width="280" />
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFromLog.limit" :current-page="tableFromLog.page" layout="total, sizes, prev, pager, next, jumper" :total="tableDataLog.total" @size-change="handleSizeChangeLog" @current-change="pageChangeLog" />
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog title="修改订单" :visible.sync="editVisible" width="700px">
      <el-form ref="formValidate" :model="formValidate" label-width="120px" @submit.native.prevent>
        <el-form-item label="订单总价：">
          <el-input-number v-model="formValidate.total_price" :min="0" placeholder="请输入订单总价" @change="changePrice" />
        </el-form-item>
        <el-form-item label="实际支付邮费：">
          <el-input-number v-model="formValidate.pay_postage" :min="0" placeholder="请输入订单油费" @change="changePrice" />
        </el-form-item>
        <el-form-item label="优惠金额">
          <span>{{ formValidate.coupon_price }}</span>
        </el-form-item>
        <el-form-item label="实际支付金额：">
          <span>{{ formValidate.pay_price }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editConfirm">确定</el-button>
      </span>
    </el-dialog>
    <!--发送货-->
    <el-dialog :title="isBatch ? '批量发货':'订单发送货'" :visible.sync="sendVisible" width="800px" :before-close="handleClose">
      <el-form ref="shipment" :model="shipment" :rules="rules" label-width="120px" @submit.native.prevent>
        <el-form-item v-if="isResend && noLogistics != 3 && tableFrom.order_type != 2" :label="shipment.delivery_type == 1 || shipment.delivery_type == 4 ? '原快递公司：' : '送货人姓名：'">
          <span>{{ original.delivery_name }}</span>
        </el-form-item>
        <el-form-item v-if="isResend && noLogistics != 3 && tableFrom.order_type != 2" :label="shipment.delivery_type == 1 || shipment.delivery_type == 4 ? '原快递单号：' : '送货人手机号：'">
          <span>{{ original.delivery_id }}</span>
        </el-form-item>
        <el-form-item label="选择类型：" prop="delivery_type">
          <el-radio-group v-model="shipment.delivery_type" @change="changeSend">
            <el-radio v-if="!isBatch && tableFrom.order_type != 2 && orderType != 1" :label="1">手动发货</el-radio>
            <el-radio :label="3" class="radio"> {{orderType == 1 ? '虚拟发货' : '无需物流'}}</el-radio>
            <el-radio v-if="isDump==1 && tableFrom.order_type != 2 && orderType !=1 && !isBatch" :label="4" class="radio">电子面单打印</el-radio>
            <el-radio v-if="tableFrom.order_type != 2 && orderType !=1" :label="2">自己配送</el-radio>
            <el-radio v-if="tableFrom.order_type != 2 && orderType !=1 && !isBatch" :label="5">同城配送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 5 && tableFrom.order_type != 2 && orderType !=1" label="选择发货点：" prop="station_id">
          <el-select
            v-model="shipment.station_id"
            placeholder="请选择配送发货点"
            class="filter-item selWidth mr20"
          >
            <el-option
              v-for="(item,index) in storeList"
              :key="item.value+index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="(shipment.delivery_type == 1 || shipment.delivery_type == 4) && tableFrom.order_type != 2 && orderType !=1" label="快递公司：" prop="delivery_name">
          <el-select
            filterable
            v-model="shipment.delivery_name"
            placeholder="请选择快递公司"
            class="filter-item selWidth mr20"
            @change="getTempsLst(shipment.delivery_name)"
          >
            <el-option
              v-for="item in deliveryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 5 && tableFrom.order_type != 2 && orderType !=1" label="包裹重量(kg)：" prop="cargo_weight">
          <el-input-number v-model="shipment.cargo_weight"  placeholder="请输入包裹重量" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 5 && tableFrom.order_type != 2 && orderType !=1" label="配送备注：" >
          <el-input type="textarea" v-model="shipment.mark"  placeholder="请输入配送单备注" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 1 && tableFrom.order_type != 2 && orderType !=1" label="快递单号：" prop="delivery_id">
          <el-input v-model="shipment.delivery_id" placeholder="请输入快递单号" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 4 && tableFrom.order_type != 2 && orderType !=1" label="电子面单：" prop="temp_id">
          <el-select
            v-model="shipment.temp_id"
            placeholder="请选择电子面单"
            class="filter-item selWidth mr20"
          >
            <el-option
              v-for="(item,index) in eleTempsLst"
              :key="item.temp_id+index"
              :label="item.title"
              :value="item.temp_id"
            />
          </el-select>
          <el-button type="text" @click="getPicture()">预览</el-button>
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 4 && tableFrom.order_type != 2 && orderType !=1" label="寄件人姓名：" prop="from_name">
          <el-input v-model="shipment.from_name" placeholder="请输入寄件人姓名" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 4 && tableFrom.order_type != 2 && orderType !=1" label="寄件人电话：" prop="from_tel">
          <el-input v-model="shipment.from_tel" placeholder="请输入寄件人电话" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 2 && tableFrom.order_type != 2 && orderType !=1" label="送货人姓名：" prop="to_name">
          <el-input v-model="shipment.to_name"  maxlength="10" placeholder="请输入送货人姓名" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 2 && tableFrom.order_type != 2 && orderType !=2" label="送货人手机号：" prop="to_phone">
          <el-input v-model="shipment.to_phone" placeholder="请输入送货人手机号" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 4 && tableFrom.order_type != 2 && orderType !=1" label="寄件人地址：" prop="from_addr">
          <el-input v-model="shipment.from_addr" type="textarea" placeholder="请输入寄件人地址" />
        </el-form-item>
        <el-form-item v-if="shipment.type != 4 && activityType != 2 && (productList.length > 1 || productNum > 1)" label="分单发货：">
          <el-switch
            v-model="shipment.is_split"
            :active-value="1"
            :inactive-value="0"
            active-text="开启"
            inactive-text="关闭"
          />
          <p class="area-desc">可选择表格中的商品单独发货，发货后会生成新的订单且不能撤回，请谨慎操作！</p>
        </el-form-item>
        <el-form-item v-if="shipment.is_split == 1 && tableFrom.order_type != 2 && (productList.length > 1 || productNum > 1)" label="">
          <el-table
                ref="multipleSelection"
                :data="productList"
                tooltip-effect="dark"
                size="mini"
                :row-key="(row) => { return row.product_id }"
                @selection-change="handleSelectionChange"
              >
                <el-table-column align="center" type="selection" :reserve-selection="true" min-width="50"/>
                <el-table-column align="center" label="商品信息" min-width="200">
                  <template slot-scope="scope">
                    <div class="acea-row" style="align-items: center;">
                      <div class="demo-image__preview">
                        <el-image :src="scope.row.cart_info.product.image" :preview-src-list="[scope.row.cart_info.product.image]" />
                      </div>
                      <span class="priceBox" style="width: 150px;">{{scope.row.cart_info.product.store_name}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="规格" min-width="80">
                  <template slot-scope="scope">
                    <span class="priceBox">{{scope.row.cart_info.productAttr.sku}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="商品售价" min-width="80">
                  <template slot-scope="scope">
                    <span class="priceBox">{{scope.row.cart_info.productAttr.price}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="总数" min-width="80">
                  <template slot-scope="scope">
                    <span class="priceBox">{{scope.row.stock_num}}</span>
                  </template>
                </el-table-column>                    
                <el-table-column label="待发数量" align="center" min-width="120">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row['product_num_input']"
                      type="number"
                      :min="0"
                      :max="scope.row.refund_num"
                      class="priceBox"
                      @blur="limitCount(scope.row)"
                    />  
                  </template>
                </el-table-column>
              </el-table>
        </el-form-item>
        <el-form-item  label="备注：" prop="remark">
          <el-input v-model="shipment.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('shipment')">提交</el-button>
      </span>
    </el-dialog>
    <!--电子面单预览-->
    <el-dialog v-if="pictureVisible" :visible.sync="pictureVisible" width="500px">
      <img :src="pictureUrl" class="pictures">
    </el-dialog>
    <!--详情-->
    <order-detail
      ref="orderDetail"
      :orderId="orderId"
      @closeDrawer="closeDrawer"
      @changeDrawer="changeDrawer"
      @reSend="reSend"
      @send="send"
      @getList="getList"
      :drawer="drawer"
    ></order-detail>
    <!--导出订单列表-->
    <file-list ref="exportList" />
    <!--导出订单列表-->
    <delivery-record ref="deliveryList" />
    <!--订单核销-->
    <order-cancellate ref="orderCancellate" @getList="getList" />
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
import {
  orderListApi,
  chartApi,
  orderUpdateApi,
  orderDetailApi,
  orderDeliveryApi,
  batchDeliveryApi,
  orderLogApi,
  orderDeleteApi,
  orderRemarkApi,
  orderPrintApi,
  exportOrderApi,
  orderCancellationApi,
  orderHeadListApi,
  exportInvoiceApi,
  cardListApi,
  expressLst,
  exprTempsLst,
  getEleTempData,
  getDeliveryStoreLst,
} from '@/api/order'
import createWorkBook from '@/utils/newToExcel.js'
import { serveInfoApi } from '@/api/setting'
import orderDetail from './orderDetails.vue';
import fileList from '@/components/exportFile/fileList'
import deliveryRecord from '@/components/deliveryRecord/index'
import orderCancellate from './orderCancellate'
import cardsData from '@/components/cards/index'
import { getToken } from '@/utils/auth'
import SettingMer from '@/libs/settingMer'
import { roterPre } from '@/settings'
//修改引入打印扩展
import printJS from 'print-js';
export default {
  components: {
    orderDetail,
    cardsData,
    fileList,
    deliveryRecord,
    orderCancellate
  },
  data() {
    return {
      fileUrl: SettingMer.https + '/store/import/delivery',
      myHeaders: { 'X-Token': getToken() },
      orderId: 0,
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      roterPre: roterPre,
      tableFrom: {
        order_sn: this.$route.query.order_sn ? this.$route.query.order_sn : '',
        group_order_sn: '',
        order_type: '-1',
        keywords: '',
        store_name: '',
        status: '',
        date: '',
        page: 1,
        limit: 20,
        type: '1',
        username: '',
        filter_delivery: '',
        filter_product : '',
        order_id: this.$route.query.id ? this.$route.query.id : '',
        activity_type: ''
      },
      activityList: [
        { value: 0, label: '普通订单' },
        { value: 1, label: '秒杀订单' },
        { value: 2, label: '预售订单' },
        { value: 3, label: '助力订单' },
        { value: 4, label: '拼团订单' }
      ],
      dliveryWayList: [
        { value: 1, label: '快递订单' },
        { value: 2, label: '配送订单' },
        { value: 4, label: '核销订单' },
        { value: 3, label: '虚拟发货' },
        { value: 6, label: '自动发货' }
      ], //发货方式
      productTypeList: [
        { value: 1, label: '实物商品' },
        { value: 2, label: '虚拟商品' },
        { value: 3, label: '卡密商品' }
      ], //商品类型
      orderChartType: {},
      timeVal: [],
      fromList: {
        title: '选择时间',
        custom: true,
        fromTxt: [{
          text: '全部',
          val: ''
        },
        {
          text: '今天',
          val: 'today'
        },
        {
          text: '昨天',
          val: 'yesterday'
        },
        {
          text: '最近7天',
          val: 'lately7'
        },
        {
          text: '最近30天',
          val: 'lately30'
        },
        {
          text: '本月',
          val: 'month'
        },
        {
          text: '本年',
          val: 'year'
        }
        ]
      },
      ids: '',
      tableFromLog: {
        page: 1,
        limit: 10
      },
      tableDataLog: {
        data: [],
        total: 0
      },
      LogLoading: false,
      dialogVisible: false,
      fileVisible: false,
      editVisible: false,
      sendVisible: false,
      pictureVisible: false,
      drawer: false,
      cardLists: [],
      orderDatalist: null,
      headeNum: [],
      editId: '',
      formValidate: {
        total_price: '',
        pay_postage: '',
        pay_price: '',
        coupon_price: ''
      },
      deliveryList: [],
      eleTempsLst: [],
      productList: [], //订单商品
      productNum: 0,
      storeList: [], //门店列表
      multipleSelection: [],
      shipment: {
        delivery_type: 1,
        station_id: '',
        is_split:"0",
        split:[]
      },
      original: {
        delivery_name: '',
        delivery_id: ''
      },
      isResend: false,
      chkName: '',
      checkedPage: [],
      checkedIds: [], // 订单当前页选中的数据
      noChecked: [], // 订单全选状态下当前页不选中的数据
      allCheck: false,
      isBatch: false,
      delivery_name: '',
      isDump: false,
      noLogistics: false,
      orderType: 0,
      activityType: 0,
      rules: {
        delivery_type: [
          { required: true, message: '请选择发送货方式', trigger: 'change' }
        ],
        station_id: [
          { required: true, message: '请选择发货点', trigger: 'change' }
        ],
        delivery_name: [
          { required: true, message: '请选择快递公司', trigger: 'change' }
        ],
        to_name: [
          { required: true, message: '请输入送货人姓名', trigger: 'blur' }
        ],
        delivery_id: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        cargo_weight: [
          { required: true, message: '请输入包裹重量', trigger: 'blur' }
        ],
        to_phone: [
          { required: true, message: '请输入送货人手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        temp_id: [
          { required: true, message: '请选择电子面单', trigger: 'change' }
        ],
        from_name: [
          { required: true, message: '请输入寄件人姓名', trigger: 'blur' }
        ],
        from_tel: [
          { required: true, message: '请输入寄件人电话', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确的联系方式', trigger: 'blur' }
        ],
        from_addr: [
          { required: true, message: '请输入寄件人地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('order_sn')) {
      this.tableFrom.order_sn = this.$route.query.order_sn
    } else {
      this.tableFrom.order_sn = ''
    }
    this.isOpenDump()
    this.headerList()
    this.getCardList()
    this.getExpressLst()
    this.getList(1)
    this.getHeaderList()
    this.getStoreList()
  },
  methods: {
    limitCount(row) {
      if (row.stock > row.product_num)row.stock = row.product_num
    },
    changeDrawer(v) {
      this.drawer = v;
    },
    closeDrawer() {
      this.drawer = false;
    },
    // 分单发货选择商品
    handleSelectionChange(val) {
      this.multipleSelection = val
      const data = []
      this.multipleSelection.map((item) => {
        data.push({id:item.order_product_id,num:item.product_num})
      })
      this.ids = data
    },
    // 是否开启电子面单
    isOpenDump() {
      serveInfoApi().then((res) => {
        this.isDump = res.data.crmeb_serve_dump
        if (res.data.crmeb_serve_dump == 1) this.getEleTempData()
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    // 获取快递公司列表
    getExpressLst() {
      expressLst().then((res) => {
        this.deliveryList = res.data
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    // 获取电子面单列表
    getTempsLst(name) {
      exprTempsLst({ com: name }).then((res) => {
        this.eleTempsLst = res.data.data
      })
    },
    // 获取电子面单默认数据
    getEleTempData() {
      getEleTempData().then((res) => {
        const data = res.data
        const delivery_type = this.shipment.delivery_type
        this.shipment = {
          from_name: data.mer_from_name,
          from_addr: data.mer_from_addr,
          from_tel: data.mer_from_tel,
          delivery_type: delivery_type,
          delivery_name: data.mer_from_com,
          temp_id: ""
          // temp_id: data.mer_config_temp_id
        }
        if(data.mer_from_com != ''){
          this.getTempsLst(data.mer_from_com)
        }
        
      })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    //获取门店列表
    getStoreList() {
      getDeliveryStoreLst().then((res) => {
        this.storeList = res.data
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    changeSend(e) {
      this.$refs['shipment'].clearValidate();
      if(e == 3){
        //如果是无需配送，就重置拆单信息
        this.shipment.is_split = '0';
        delete this.shipment.split;
      }
    },
    getPicture(name) {
      if (this.shipment.temp_id) {
        this.eleTempsLst.forEach((o, i) => {
          if (o['temp_id'] == this.shipment.temp_id) {
            this.pictureVisible = true
            this.pictureUrl = o['pic']
          }
        })
      } else {
        this.$message.error('选择电子面单后才可以预览')
      }
    },
    // 批量发送货
    batchSend() {
      if (this.checkedIds.length == 0) {
        return this.$message.warning('请先选择订单')
      } else {
        this.isBatch = true
        this.sendVisible = true
        this.shipment.delivery_type = 2
        this.shipment.order_id = this.checkedIds
      }
    },
    handleClose() {
      this.sendVisible = false
      this.$refs['shipment'].resetFields()
    },
    onHandle(name) {
      this.chkName = this.chkName === name ? '' : name
      this.changeType(!(this.chkName === ''))
    },
    changeType(v) {
      if (v) {
        if (!this.chkName) {
          this.chkName = 'dan'
        }
      } else {
        this.chkName = ''
        this.allCheck = false
      }
      const index = this.checkedPage.indexOf(this.tableFrom.page)
      if (this.chkName === 'dan') {
        this.checkedPage.push(this.tableFrom.page)
      } else if (index > -1) {
        this.checkedPage.splice(index, 1)
      }
      this.syncCheckedId()
    },
    syncCheckedId() {
      const ids = this.tableData.data.map(v => v.order_id)
      if (this.chkName === 'duo') {
        this.checkedIds = []
        this.allCheck = true
      } else if (this.chkName === 'dan') {
        this.allCheck = false
        ids.forEach(id => {
          const index = this.checkedIds.indexOf(id)
          if (index === -1) {
            this.checkedIds.push(id)
          }
        })
      } else {
        ids.forEach(id => {
          const index = this.checkedIds.indexOf(id)
          if (index > -1) {
            this.checkedIds.splice(index, 1)
          }
        })
      }
    },
    // 分开选择
    changeOne(v, row) {
      if (v) {
        if (this.chkName === 'duo') {
          const index = this.noChecked.indexOf(row.order_id)
          if (index > -1) this.noChecked.splice(index, 1)
        } else {
          const index = this.checkedIds.indexOf(row.order_id)
          if (index === -1) this.checkedIds.push(row.order_id)
        }
      } else {
        if (this.chkName === 'duo') {
          const index = this.noChecked.indexOf(row.order_id)
          if (index === -1) this.noChecked.push(row.order_id)
        } else {
          const index = this.checkedIds.indexOf(row.order_id)
          if (index > -1) this.checkedIds.splice(index, 1)
        }
      }
    },
    // 头部
    getHeaderList() {
      orderHeadListApi()
        .then((res) => {
          this.headeNum = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 订单筛选
    orderFilter(item) {
      let status = false
      item.orderProduct.forEach((el) => {
        if (el.refund_num < el.product_num) {
          status = true
        }
      })
      return status
    },
    // 退款详情页
    onRefundDetail(sn) {
      this.$router.push({
        path: 'refund',
        query: {
          sn: sn
        }
      })
    },
    // 表格某一行添加特定的样式
    addTdClass(val) {
      if (val.row.status > 0 && val.row.paid == 1) {
        for (let i = 0; i < val.row.orderProduct.length; i++) {
          if (val.row.orderProduct[i].refund_num >= 0 && val.row.orderProduct[i].refund_num < val.row.orderProduct[i].product_num) {
            return 'row-bg'
          }
        }
      } else {
        return ' '
      }
    },
    // 详情
    onOrderDetails(id) {
      this.orderId = id
      this.$refs.orderDetail.getInfo(id);
      this.drawer = true;
      // this.$refs.orderDetail.dialogVisible = true
      // this.$refs.orderDetail.onOrderDetails(id)
      // this.$refs.orderDetail.onOrderLog(id)
    },
    async exports(value) {
      let excelData = JSON.parse(JSON.stringify(this.tableFrom)), data = []
      excelData.page = 1
      excelData.ids = this.checkedIds.toString() 
      let pageCount = 1
      let lebData = {};
      for (let i = 0; i < pageCount; i++) {
        lebData = value == 1 ? await this.downOrderData(excelData) : await this.downInvoiceData(excelData)
        pageCount = Math.ceil(lebData.count/excelData.limit)
        if (lebData.export.length) {
          data = data.concat(lebData.export)
          excelData.page++
        }  
      }
      createWorkBook(lebData.header, lebData.title, data, lebData.foot,lebData.filename);
      return
    },
    /**订单 */
    downOrderData(excelData) {
      return new Promise((resolve, reject) => {
        exportOrderApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    /**发货单 */
    downInvoiceData(excelData) {
      return new Promise((resolve, reject) => {
        exportInvoiceApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 生成订单
    // exportOrder() {
    //   exportOrderApi(this.tableFrom)
    //     .then((res) => {
    //       const h = this.$createElement
    //       this.$msgbox({
    //         title: '提示',
    //         message: h('p', null, [
    //           h('span', null, '文件正在生成中，请稍后点击"'),
    //           h('span', { style: 'color: teal' }, '导出记录'),
    //           h('span', null, '"查看~ ')
    //         ]),
    //         confirmButtonText: '我知道了'
    //       }).then(action => {
    //         this.$router.push({ path: this.roterPre + '/export/list' })
    //       })
    //     }).catch((res) => {
    //       this.$message.error(res.message)
    //     })
    // },
    // 生成发货单
    // exportInvoice() {
    //   exportInvoiceApi(this.tableFrom)
    //     .then((res) => {
    //       const h = this.$createElement
    //       this.$msgbox({
    //         title: '提示',
    //         message: h('p', null, [
    //           h('span', null, '文件正在生成中，请稍后点击"'),
    //           h('span', { style: 'color: teal' }, '导出记录'),
    //           h('span', null, '"查看~ ')
    //         ]),
    //         confirmButtonText: '我知道了'
    //       }).then(action => {
    //         this.$router.push({ path: this.roterPre + '/export/list' })
    //       })
    //     })
    //     .catch((res) => {
    //       this.$message.error(res.message)
    //     })
    // },
    // getExportFileList() {
    //   this.fileVisible = true
    //   this.$refs.exportList.exportFileList()
    // },
    // 批量发货记录
    getDeliveryList() {
      this.$refs.deliveryList.getList()
    },
    // 上传成功
    handleSuccess(response) {
      if (response.status === 200) {
        this.$message.success(response.message)
      } else {
        this.$message.error(response.message)
      }
    },
    // 下载物流公司对照表
    downloadLogistics() {
      window.open(SettingMer.https + `/excel/download/express?token=` + getToken())
    },
    // 订单核销
    orderCancellation(code) {
      const that = this
      that.$refs.orderCancellate.dialogVisible = true;
      if(code) {
         that.$refs.orderCancellate.productDetails(code)
         that.$refs.orderCancellate.isColum = true;
      }else{
         that.$refs.orderCancellate.isColum = false;
      }
      // this.$prompt('', '提示', {
      //   confirmButtonText: '立即核销',
      //   cancelButtonText: '取消',
      //   inputPattern: /\S/,
      //   inputPlaceholder: '请输入核销码',
      //   inputErrorMessage: '请输入核销码'
      // }).then(({
      //   value
      // }) => {
      //   that.handleCancellation(value)
      // })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消输入'
      //     })
      //   })

    },
    // 去核销
    handleCancellation(code) {
      this.$confirm('确定核销此订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          orderCancellationApi(code)
            .then((res) => {
              this.$message.success(res.message)
              this.getList('')
            })
            .catch((res) => {
              this.$message.error(res.message)
              this.LogLoading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消核销'
          })
        })
    },
    // 订单记录
    onOrderLog(id) {
      this.dialogVisible = true
      this.LogLoading = true
      orderLogApi(id, this.tableFromLog)
        .then((res) => {
          this.tableDataLog.data = res.data.list
          this.tableDataLog.total = res.data.count
          this.LogLoading = false
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.LogLoading = false
        })
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page
      this.getList('')
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val
      this.getList('')
    },
    // 打印订单
    printOrder(id) {
      orderPrintApi(id)
        .then((res) => {
          this.$message.success(res.message)
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 订单删除
    handleDelete(row, idx) {
      if (row.is_del === 1) {
        this.$modalSure().then(() => {
          orderDeleteApi(row.order_id)
            .then(({
              message
            }) => {
              this.$message.success(message)
              this.tableData.data.splice(idx, 1)
            })
            .catch(({
              message
            }) => {
              this.$message.error(message)
            })
        })
      } else {
        this.$confirm(
          '您选择的的订单存在用户未删除的订单，无法删除用户未删除的订单！',
          '提示', {
            confirmButtonText: '确定',
            type: 'error'
          }
        )
      }
    },
    // 备注
    onOrderMark(id) {
      this.$modalForm(orderRemarkApi(id)).then(() => this.getList(''))
    },
    // 选择时间
    selectChange(tab) {
      this.timeVal = []
      this.tableFrom.date = tab
      this.getCardList()
      this.getList(1)
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.getCardList()
      this.getList(1)
    },
    // 编辑
    edit(id) {
      this.editId = id
      this.editVisible = true
      orderDetailApi(id).then(res => {
        this.formValidate = {
          pay_postage: res.data.pay_postage,
          total_price: res.data.total_price,
          coupon_price: (Number(res.data.coupon_price) + Number(res.data.svip_discount)).toFixed(2) ,
          pay_price: (Number(res.data.total_price) + Number(res.data.pay_postage) - Number(res.data.coupon_price) - Number(res.data.svip_discount)).toFixed(2) 
        }
        this.loading = false
      }).catch(({ message }) => {
        this.loading = false
        this.$message.error(message)
      })
    },
    editConfirm() {
      orderUpdateApi(this.editId, this.formValidate).then(res => {
        this.editVisible = false
        this.$message.success(res.message)
        this.getList('')
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    changePrice() {
      this.formValidate.pay_price = (this.formValidate.total_price + this.formValidate.pay_postage - this.formValidate.coupon_price).toFixed(2)
    },
    // 发货
    send(row,id) {
      this.isBatch = false
      this.sendVisible = true
      this.isResend = false
      this.orderId = id
      this.activityType = row.activity_type
      this.orderType = row.is_virtual
      this.shipment.delivery_type = this.orderType === 1 ? 3 : 1
      row.orderProduct.forEach(item => {
          item.stock_num = item.product_num
      })
      this.productList = row.orderProduct
      this.productNum  = row.orderProduct && row.orderProduct[0] && row.orderProduct[0]['product_num'] || 0
      delete this.shipment.order_id
      if(this.tableFrom.order_type == 2)this.shipment.delivery_type = 3
    },
    sendReset() {
      this.shipment = {
        delivery_type: 1,
        delivery_name: '',
        delivery_id: '',
        from_name: '',
        from_addr: '',
        from_tel: '',
        temp_id: ''
      }
    },
    // 修改发货信息
    reSend(id) {
      this.isBatch = false
      this.sendVisible = true
      this.orderId = id
      this.isResend = true
      delete this.shipment.order_id
      orderDetailApi(id).then(res => {
        const data = res.data
        this.shipment.delivery_type = (!this.isDump && data.delivery_type == 4) ? 1 : Number(data.delivery_type)
        this.noLogistics = data.delivery_type
        this.loading = false
        this.original = {
          delivery_name: data.delivery_name,
          delivery_id: data.delivery_id
        }
        this.loading = false
      }).catch(({ message }) => {
        this.loading = false
        this.$message.error(message)
      })
    },
    submitForm(name) {
      if (this.shipment.delivery_type == 2) {
        this.shipment.delivery_name = this.shipment.to_name
        this.shipment.delivery_id = this.shipment.to_phone
      }
      if(this.shipment.is_split != '0' && this.shipment.is_split && this.orderType != 2){ 
        if (!this.multipleSelection.length) {
          return this.$message.warning('请选择拆单商品!')
        }
        const data = []
        this.multipleSelection.map((item) => {
          data.push({id:item.order_product_id,num:item.product_num_input})
        })
        this.ids = data
        this.shipment.split = this.ids
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          delete this.shipment.to_name
          delete this.shipment.to_phone
          console.log(this.shipment);
          // return
          this.isBatch ? batchDeliveryApi(this.shipment).then(res => {
            this.sendVisible = false
            this.$message.success(res.message)
            this.getList('')
            // this.$refs[name].resetFields()
            this.sendReset()
          }).catch(({ message }) => {
            this.$message.error(message)
          })
            : orderDeliveryApi(this.orderId, this.shipment).then(res => {
              this.sendVisible = false
              this.$message.success(res.message)
              this.getList('')
              //   this.$refs[name].resetFields()
              this.sendReset()
              //修改增加打印机打印
              if (res.data.label) this.printImg(res.data.label);
            }).catch(({ message }) => {
              this.$message.error(message)
            })
        } else {
          return
        }
      })
    },
    //修改增加打印方法
    printImg(url) {
      printJS({
        // printable: 'http://api.kuaidi100.com/label/getImage/20230518/9CBFE5F980044698A54CF19EB1585125',
        printable: url,
        type: 'image',
        documentTitle: '快递信息',
        style: `img{
          width: 100%;
          height: 476px;
        }`,
      });
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      orderListApi(this.tableFrom)
        .then((res) => {
          res.data.list.forEach(item => {
            item.orderProduct.forEach(cell => {
              cell.product_num_input = cell.refund_num
            })
          })
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          //   this.cardLists = res.data.stat
          this.listLoading = false
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.listLoading = false
        })
    },
    getCardList() {
      cardListApi(this.tableFrom)
        .then((res) => {
          this.cardLists = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    headerList() {
      chartApi()
        .then((res) => {
          this.orderChartType = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.pictures{
    max-width: 100%;
}
.area-desc{
    margin: 0;
    color: #999;
    font-size: 12px;
}
.selWidth {
    width: 300px;
}
.spBlock {
    cursor: pointer;
    display: block;
    padding: 5px 0;
}
.check {
    color: #00a2d4;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    font-size: 12px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.tabBox_tit {
    width: 53%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
}
/deep/.row-bg {
    .cell {
        color: red !important;
    }
}
.headTab{
    position: relative;
    .headBtn{
        position: absolute;
        right: 0;
        top: -6px;
    }
}
.dropdown{
    padding: 0 10px;
    border: 1px solid #409eff;
    margin-right: 10px;
    line-height: 28px;
    border-radius: 4px;
}
</style>
