<template>
  <view class="container_input">
    <view class="container_input_item" v-for="(item, index) in platformClassification" :key="index" @click="selectItem(item)" v-if="!item.DoNotShow">
      <view class="select_and_input" v-if="item.type == 'select' || item.type == 'input' || item.type == 'switch'">
        <view class="container_input_item_label">
          <text class="select_check" :class="{ select: item.select }" @click.stop="selectRadio(item)" v-if="Object.keys(item).indexOf('select') != -1">
            <text v-if="item.select" class="iconfont">&#xe646;</text>
          </text>
          <text class="select_label line1">{{ item.label }}</text>
        </view>
        <view class="container_input_item_value greyColor" v-if="item.type == 'select'">
          <text v-if="item.value" class="text">{{ item.value }}</text>
          <text v-else>{{ item.holder }}</text>
          <text class="iconfont">&#xe6bd;</text>
        </view>
       <view class="container_input_item_value" v-if="item.type == 'input'">
          <input v-model="formData[item.model]" type="text" value="" :placeholder="item.holder" placeholder-class="inputPlaceHolder" />
        </view>
        <view class="container_input_item_value" v-if="item.type == 'switch'">
          <switch :checked="formData[item.model] == 1" color="#E93323" style="transform:scale(0.8)" @change="switchChange($event, item)" />
        </view>
      </view>
      <view class="radio" v-if="item.type == 'radio' || item.type == 'check'">
        <view class="container_input_item_label">{{ item.label }}</view>
        <view class="container_input_item_value flex_start" v-if="item.type == 'radio'">
          <radio-group class="select_group" @change="radioChange($event, item)">
            <label class="container_input_item_value_select" v-for="(val, i) in item.radioList" :key="val.value">
              <view>
                <radio :value="val.value" :checked="val.value == item.inforValue" />
              </view>
              <view>{{ val.name }}</view>
            </label>
          </radio-group>
        </view>
        <view class="container_input_item_value flex_start" v-if="item.type == 'check'">
          <checkbox-group class="select_group" @change="checkChange($event, item)">
            <label class="container_input_item_value_select" v-for="(val, i) in item.checkList" :key="val.value">
              <view>
                <checkbox class="chenk_list" :value="val.value" :checked="val.value == item.inforValue" />
              </view>
              <view>{{ val.name }}</view>
            </label>
          </checkbox-group>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
/*
    item参数
    id:
    type: select
    label: '标题'
    jumpLogic: 是否自定义跳转逻辑
    select 有此key值时，可进行选择逻辑
  */

export default {
  props: {
    platformClassification: {
      type: Array,
      default() {
        return [];
      }
    },
    form: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      value: '',
			formData: this.form
    };
  },
  watch: {
  	formData: {
  		handler(val) {
  			this.$emit('input',val)
  		},
  		deep: true
  	},
		form: {
			handler(val) {
				this.formData = val
			},
			deep: true
		}
  },
  created() {
    this.platformClassification.forEach(item => {
      if(item.inforValue) {
        this.$emit('formInitData', item.inforValue, item.model);
      }
    });
  },
  methods: {
    selectItem(item) {
      if(item.jumpLogic) {
        // 执行跳转新界面逻辑暴露的方法
        this.$emit('handleJumpLogic', item);
        return;
      }
      this.$emit('handleSelectItem', item);
    },
    radioChange(e, item) {
      this.$emit('radioChange', e.detail.value, item);
    },
    // switch组件切换
    switchChange(e, item) {
      this.$emit('switchChange', e.detail.value, item);
    },
    // 可选择条框模式
    // 选择事件
    selectRadio(item) {
      item.select = !item.select;
    },
    // 多选按钮
    checkChange(e, item) {
      this.$emit('checkChange', e.detail.value, item);
    }
  }
};
</script>

<style lang="scss" scoped>
.container_input {
  background: #fff;
  padding: 0 20rpx;
  width: 710rpx;
  margin: auto;
  margin-top: 31rpx;
  border-radius: 10rpx;
  &_item {
    .select_and_input {
      height: 106rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .greyColor {
        color: #bbbbbb;
      }
    }

    .radio {
      padding: 30rpx 0;
    }

    &_label {
      padding-left: 10rpx;
      color: #333333;
      font-size: 30rpx;
      display: flex;
      align-items: center;
	  .select_label{
		  max-width: 520rpx;
	  }
      .select_check {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rpx;
        height: 40rpx;
        border: 1px solid #cccccc;
        border-radius: 50%;
        margin-right: 20rpx;

        .iconfont {
          font-size: 24rpx;
        }
      }

      .select {
        background: #e93323;
        border: none;
        .iconfont {
          color: #fff;
        }
      }
    }
    &_value {
      padding-right: 10rpx;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      > span:nth-child(1) {
        display: inline-block;
        margin-right: 15rpx;
      }
      .text {
        color: #000;
        display: inline-block;
        max-width: 400rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      input {
        text-align: right;
      }

      .select_group {
        display: flex;
      }

      &_select {
        display: flex;
        margin-right: 110rpx;
      }
    }

    .flex_start {
      padding: 0 10rpx;
      margin-top: 40rpx;
      justify-content: flex-start;
    }
  }
  > view:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
}

.inputPlaceHolder {
  color: #bbbbbb;
}
</style>
