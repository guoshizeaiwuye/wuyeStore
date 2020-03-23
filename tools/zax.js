import config from "./ajax.js";

// 倒计时
function Conversiontime(timestamp) {
	return new Promise(function(resolve, reject) {
		var timestamp = Number(timestamp);
		var date = new Date(timestamp);
		var time = {};
		var Y = date.getFullYear();
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
		var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
		var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
		resolve(Y);
	})
};
// 更新用户信息
function userinfo(timestamp) {
	return new Promise(function(resolve, reject) { 
		config.get({
			url: 'api/user/index'
		}, "").then(res => {
			let userinfo=res; 
			let url =uni.getStorageSync("url");  
			if(userinfo.avatar.indexOf("http")==-1){
				userinfo.avatar=url+userinfo.avatar
			} 
			uni.setStorageSync("userinfo",userinfo)
			uni.setStorageSync("token",userinfo.token)
			resolve(userinfo)
		});
	})
};

// 判断是否登录
function yzlogin() {
	var token = uni.getStorageSync("token");
	if (!token) {
		console.log("没有登陆！");
		uni.reLaunch({
			url: "/pages/login/login"
		})
	}
}
// 获取定位
function getlocation() {
	return new Promise(function(resolve, reject) {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				resolve(res)
			}
		});
	})
} 
// 保存图片到本地（系统自用）
function Saveitlocally(data) {
	// 下载
	uni.downloadFile({
		url: data.url, //仅为示例，并非真实的资源
		success: (res) => { 
			// 保存到本地  
			uni.saveFile({
				tempFilePath: res.tempFilePath,
				success: function(e){
					console.log("下载的本地地址",e); 
					uni.setStorageSync(data.name,e.savedFilePath);
				}
			});
		}
	});
} 
// 加载系统信息

function xtinfo(){
	return new Promise(function(resolve, reject) {
		config.get({
			url: 'api/common/system'
		}).then(res => { 
			let system=res; 
			let url =uni.getStorageSync("url");
			if(system.area_agent.indexOf("http")==-1){
				system.area_agent=url+system.area_agent
			}
			uni.setStorageSync("system",system)
			resolve(system)
		});
	})
}

export default {
	async Conversiontime(timestamp) {
		return Conversiontime(timestamp);
	},
	async userinfo() {
		return userinfo();
	},
	async yzlogin() {
		return yzlogin();
	},
	async getlocation() {
		return getlocation();
	},
	async setskin(data) {
		return setskin(data);
	},
	async Saveitlocally(data){
		return Saveitlocally(data);
	},
	async xtinfo(){
		return xtinfo();
	}
}
