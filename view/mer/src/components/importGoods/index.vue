<template>
  <el-dialog title="商品信息" :visible.sync="importVisible" width="700px" v-if="importVisible"  :before-close="handleClose">
    <div class="divBox">
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="直播间名称：" label-width="150px">
              <span>{{ broadcast_room}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="直播间ID：" label-width="150px">
              <span>{{ broadcast_id }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="box-card">
        <form-create v-if="importVisible" ref="fc" v-loading="loading" :rule="FormData.rule" class="formBox" handle-icon="false" @submit="onSubmit"/>
      </div>
    </div>
  </el-dialog>
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
import formCreate from "@form-create/element-ui";
import { broadcastGoodsImportApi } from "@/api/marketing";
export default {
  name: "importGoods",
  components: {
    formCreate: formCreate.$form(),
  },
  data() {
    return {
      option: {
        form: {
          labelWidth: "150px",
        },
        global: {
          upload: {
            props: {
              onSuccess(rep, file) {
                if (rep.status === 200) {
                  file.url = rep.data.src;
                }
              },
            },
          },
        },
      },
      importVisible: false,
      selectedProducts: "",
      broadcast_room: "",
      broadcast_id: "",
      image: "",
      FormData : {
        action: "/mer/studio/goods/create.html",
        config: {},
        rule: [{
          field: "product_id",
          props: {
            height: "536px",
            maxLength: 5,
            modal: {
              modal: false
            },
            src: "/merchant/setting/broadcastProduct?field=product_id",
            srcKey: "src",
            title: "请选择商品",
            type: "image",
            width: "60%",
          },
          title: "商品:",
          type: "frame",
          value: "",
        },],
      },
      loading: false,
      selectedGoods: [],
    };
  },
  mounted() {

  },
  methods: {
    handleClose() {
      this.importVisible = false
      this.FormData.rule[0].value = ''
    },
    getFrom() {
    },
    modalPicTap(tit, num, i) {
      const _this = this;
      this.$modalUpload(function (img) {
        if (tit === "1" && !num) {
          _this.image = img[0];
        }
      }, tit);
    },
    onSubmit(formData) {
      this.listLoading = true;
      this.selectedProducts = JSON.parse(localStorage.getItem("broadcastPro")) || [];
      let ids = this.filtersArr(this.selectedProducts), roomId = this.broadcast_id;
      let args = {
        ids: ids,
        room_id: roomId,
      };
      broadcastGoodsImportApi(args)
        .then((res) => {
          this.$message.success(res.message);
          this.listLoading = false;
          this.importVisible = false;
          // localStorage.setItem('noGoods', '1')
          this.FormData.rule[0].value = ''
          localStorage.removeItem("broadcastPro")
          this.$emit('getList');
        }).catch((res) => {
          this.$emit('getList');
          this.listLoading = false;
          this.$message.error(res.message);
          this.FormData.rule[0].value = ''
          this.importVisible = false;
        });
    },
    // 过滤id
    filtersArr(arr) {
      this.selectedGoods = [];
      arr.map((item) => {
        this.selectedGoods.push(item.broadcast_goods_id);
      });
      return this.selectedGoods;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item__content {
    position: static;
}
</style>
