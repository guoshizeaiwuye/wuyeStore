/*
	2019-02-20 lane 封装wx-app请求 
*/
import config from "../config.js";

var utils = {}

utils.request = function(option) {
	let token = option.token ? '' : uni.getStorageSync('token');
	// token="7bfb2313-05f0-45ea-ab17-f8770edc1517";
	uni.setStorageSync("url", config.material_url);
	if (option.title) {
		uni.showLoading({
			title: option.title ? option.title : '加载中'
		})
	}
	option.data || (option.data = {});
	if (option.Toast) {
		uni.showLoading({
			title: option.Toast
		})
	} 
	uni.request({
		url: config.base_url + option.url,
		data: option.data,
		method: option.method ? option.method : 'Get',
		type: 'json',
		header: {
			"content-type": "application/x-www-form-urlencoded;charset=UTF-8",
			"token": token ? token : ''
		},
		success(res) { 
			if (res.statusCode == 200 && res.data.code == 1) {
				option.success(res.data.data)
			} else if (res.statusCode == 200 && res.data.code != 1) {
				if (option.fail) {
					option.fail(res.data)
				} else {
					switch (res.data.code) {
						case 0:
							utils.hint({
								msg: res.data.msg
							});
							break;
						case 401:
							 
							break;
						case 403:
							utils.hint({
								msg: res.data.msg
							});
							break;
					}
				}
			}else if(res.statusCode == 401){
				 
			}
		},
		fail(res) {
			option.fail(res)
		},
		complete() {
			if (option.Toast) {
				uni.hideLoading()
			}
		}
	})

};

utils.hint = function(option) {
	uni.showModal({
		title: "提示",
		content: option.msg,
		showCancel: false,
		confirmText: option.confirm ? option.confirm : "知道了",
		confirmColor: "#0x1AA0",
		success(res) {
			option.success ? option.success(res) : ''
		}
	})
}
// 更新用户信息 
utils.getuserIndex = function(option) {
	utils.request({
		url: "api/user/index",
		success(res) {
			uni.setStorageSync("userInfo", res)
		}
	})
}

module.exports = utils;
