import Vue from 'vue'
import App from './App'
 
import config from './config.js' 
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
 
import nolist from '@/components/nolist.vue'
Vue.component('nolist', nolist) 
 

import shear from '@/components/shear.vue'
Vue.component('shear', shear) 

import nomore from '@/components/nomore.vue'
Vue.component('nomore', nomore)

import sendCode from '@/components/sendCode.vue'
Vue.component('sendCode', sendCode)
 
import uniNoticeBar from '@/components/notice-bar/uni-notice-bar.vue'
Vue.component('uniNoticeBar', uniNoticeBar) 
 
// 请求模块
import $request from "./tools/ajax.js";
Vue.prototype.$request = $request;

// 微信js

import jwx from "./tools/jwx.js";
Vue.prototype.$jwx = jwx;

// 上传图片插件
import upload_img from "./tools/upload_img.js";
Vue.prototype.$Uploader = upload_img;
// 上传视频
import upload_video from "./tools/upload_video.js";
Vue.prototype.$Upvideo = upload_video;

// 支付
import $pay from "./tools/pay.js";
Vue.prototype.$pay = $pay; 

//杂项封装
import zax from "./tools/zax.js";
Vue.prototype.$zax = zax;

//表单验证 
import form from "./tools/form.js";
Vue.prototype.$form = form; 

// 分享
import share from "@/tools/share1.js";
Vue.prototype.$share= share;
// 无状态提示信息
Vue.prototype.$alert = function(msg) {
	if (!msg) {
		return
	}
	uni.showToast({
		title: msg,
		icon: 'none'
	})
};
// 成功
Vue.prototype.$alertko = function(msg) {
	if (!msg) {
		return
	}
	uni.showToast({
		title: msg, 
	})
};

Vue.config.productionTip = false
 
Vue.prototype.$app = App; 

App.mpType = 'app'

const app = new Vue({ 
	...App
})
app.$mount()
