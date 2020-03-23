let jweixin = require('./jweixin-module')
import request from "./ajax.js";

function getconfig() {
	var local = encodeURIComponent(window.location.href); // 获取页面url
	request.get({
		url: 'api/index/wx_config',
		data: {
			url: local
		}
	}).then(res => {
		return res;
	})
}

function getLocation() {
	return new Promise(function(resolve, reject) {
		var local = encodeURIComponent(window.location.href); // 获取页面url 
		request.get({
			url: 'api/index/wx_config',
			data: {
				url: local
			}
		}).then(res => {
			let info = {
				debug: false,
				appId: res.appId,
				nonceStr: res.nonceStr,
				timestamp: res.timestamp,
				signature: res.signature,
				jsApiList: ["getLocation"]
			};
			jweixin.config(info);
			jweixin.error(err => {
				console.log('config fail:', err); 
			});
			jweixin.ready(function() {
				jweixin.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function(res1) {
						resolve(res1); 
						// uni.showModal({
						// 	title:"提示",
						// 	content:JSON.stringify(res1)
						// })
					},
					cancel: function(res2) {
						uni.showToast({
							title: "您拒绝了位置授权！"
						})
						reject(res2)
					},
					fail: function(res3) {
						// uni.showModal({
						// 	title: "提示",
						// 	content: "d"
						// })
						reject(res2)
					}
				});
			});
		})
	})
}

export default {
	async getLocation() {
		return getLocation();
	},
	async getconfig() {
		return getconfig();
	}
}
