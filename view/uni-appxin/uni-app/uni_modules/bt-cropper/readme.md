

## bt-cropper 图片裁切
> **组件名：bt-cropper**
---
### 2022年7月13日
### 2.0版本发布啦！！ 完全重构了代码，代码可读性更强 用户体验更好了
---
图片裁切组件，在页面中裁切图片，输出裁切后的图片
### [在线体验](https://static-a3b890b4-7cb2-4b29-aa78-e652572bdef6.bspapp.com/#/)

> **注意事项**
> 为了避免错误使用，给大家带来不好的开发体验，请在使用组件前仔细阅读下面的注意事项，可以帮你避免一些错误。
> - 组件需要依赖 `sass` 插件 ，请自行手动安装
> - `bt-cropper` 并不能完全阻止页面滚动，可在使用 `bt-cropper` 的页面手动去做一些处理，禁止页面滚动，请在`pages.json`中使用他的页面添加`"disableScroll": true`
> - 容器使用百分比布局，所以包裹层需要手动指定高度，推荐设定为`100vh`
> - 目前只适配了H5和微信小程序，其他平台暂未适配，如有需要可以留言或者自行修改代码
> - 如使用过程中有任何问题，或者您有一些好的建议，欢迎联系作者微信:1097122362

### 插件亮点
 * 以组件形式使用，可以方便地与你的业务集成，你甚至可以将它放在一个弹窗或者对话框里面给用户使用
 * 支持按比例缩放和双指缩放
 * 丰富的动画，支持调整后自动缩放，试过你就知道有多好用了
 * 支持一键导入插件


### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法 

**示例**

```html
<template>
	<view class="container">
		<bt-cropper ref="cropper" :imageSrc="imageSrc">
			<!-- 你想插入的内容 -->
			<button @click="crop">裁切</button>
		</bt-cropper>
	</view>
</template>

```


```javascript
export default {
   methods:{
      crop(){
        // 通过组件定义的ref调用cropper方法，返回一个promise对象
        this.$refs.cropper.crop().then(([err,res])=>{
			if(!err){
				console.log(res)
			}else{
				console.err(err)
			}
		})
      }
   }
}

```

### 限定裁切比例

bt-cropper，指定ratio即可设置裁切框的宽高比，如果你想让用户自由缩放，将ratio设置为0即可

**示例**

```html
<bt-cropper ref="cropper" :ratio="16/9" :imageSrc="imageSrc">
	<!-- 你想插入的内容 -->
	<button @click="crop">裁切</button>
</bt-cropper>
```

## API

### cropper Props 

|属性名|类型|默认值|说明|
|:-:|:-:|:-:|:-:|
|ratio|number|0|裁切图像的宽高比，0表示自由比例|
|dWidth|number|0|生成的图片的宽度,单位：px,如果传入0的话就是按原像素的比例裁剪，也就是说，输出图片的清晰度和输入图片的清晰度一样|
|imageSrc|String|''|原图的路径，支持本地路径和网络路径，如果是网络路径，小程序要注意配置下载域名，H5要注意跨域问题|
|fileType|String|'jpg'|目标文件的类型，只支持 'jpg' 或 'png'。默认为 'jpg'|
|quality|Number|1|图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理|
|showGrid|Boolean|false|是否显示中心网格线，默认不显示|
|initPosition|object|null|图片自定义的初始的位置，内容格式见change事件|
|compress|Boolean|false|是否开启图像压缩，开启后，用户拖动的图片会被压缩，可以一定程度上提升用户操作的流畅度，但是最终输出的图片质量不会受到影响|
|autoZoom|Boolean|true|是否开启操作结束后自动放大到窗口大小|


### cropper Methods

|方法名称|说明|参数|
|:-:|:-:|:-:|
|crop|裁剪图片|crop() ，开始绘制并开始裁剪图片，返回Promise对象|
|resetCropper|重置裁剪框的位置和大小到初始的位置和大小|-|
|resetImage|重置裁剪框和图片的位置和大小到初始的位置和大小|-|

### cropper Events

|方法名称|说明|返回值|
|:-:|:-:|:-:|
|change|当裁剪框和图片的相对位置发生变化的时候触发，返回裁剪框与图片的相对位置|ev={left:number,top:number,width:number,height:number}|
|load|当图片加载成功并初始化完成时触发| - |
|loadFail|当图片加载失败时触发| - |
|cropStart|当裁开始时触发| - |
|cropEnd|当裁结束时触发|ev=[err, res]|
## 帮助
在使用中如遇到无法解决的问题，请提 [Issues](https://gitee.com/xiaojiang1996/better-uni-cropper/issues) 或者加我 微信:1097122362。
