import config from "./ajax.js";

function wxshare(data) {
	return new Promise(function(resolve, reject) {
		console.log("imageUrl:", data.imageUrl);
		console.log("title:", data.title);
		console.log("path:", data.path);
		// gh_e229d21f070b
		uni.share({
			provider: 'weixin',
			type: 5,
			imageUrl: data.imageUrl,
			title: data.title,
			miniProgram: {
				id: 'gh_e229d21f070b',
				path: data.path,
				type: 0,
				webUrl: 'http://www.caiguohouzi.net',
			},
			success: ret => {
				console.log(JSON.stringify(ret));
				resolve(ret);
			},
			fail(err) {
				var i = {
					code: 1,
					err
				}
				resolve(i);
				console.log("分享失败：", err);
			}
		});
	})
	// return new Promise(function(resolve, reject) {
	// 	uni.share({
	// 		provider: 'weixin',
	// 		type: 5,
	// 		imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
	// 		title: '欢迎体验uniapp',
	// 		miniProgram: {
	// 			id: 'gh_e229d21f070b',
	// 			path: 'pages/index/index',
	// 			type: 0,
	// 			webUrl: 'http://uniapp.dcloud.io'
	// 		},
	// 		success: ret => {
	// 			console.log(JSON.stringify(ret));
	// 			resolve(ret);
	// 		},
	// 		fail(err) {
	// 			var i = {
	// 				code: 1,
	// 				err
	// 			}
	// 			resolve(i);
	// 			console.log("分享失败：", JSON.stringify(err));
	// 		}
	// 	});
	// }) 
}

function wxpyshare(data) {
	return new Promise(function(resolve, reject) {
		uni.share({
			provider: "weixin",
			scene: "WXSenceTimeline",
			type: 0,
			href: "http://uniapp.dcloud.io/",
			title: "采果猴子",
			summary: "我正在使用采果猴子商城，赶紧跟我一起来体验！",
			imageUrl: "/static/img/icon.png",
			success: function(res) {
				console.log("success:" + JSON.stringify(res));
			},
			fail: function(err) {
				console.log("fail:" + JSON.stringify(err));
			}
		});
	})
}

function share(data) {
	var fxinfo = uni.getStorageSync("fxinfo");
	let share=uni.getStorageSync("share");
	var data1 = {
		href: fxinfo.url,
		title: share.title?share.title:"采果猴子",
		summary: share.ftitle?share.ftitle:"我正在使用采果猴子，赶紧跟我一起来体验！",
		imageUrl:share.thumbs?share.thumbs:"/static/img/icon.png",
	}; 
	console.log("啊什么的卡", JSON.stringify(data));
	return new Promise(function(resolve, reject) {
		// let type = data.type;
		let provider = '';
		let scene = '';
		let type = data.type;
		if (type != 4) {
			if (type == 0) {
				uni.share({
					provider: 'weixin',
					type: 5,
					imageUrl: fx.imageUrl,
					title: fx.title,
					miniProgram: {
						id: 'gh_e229d21f070b',
						path: fx.path,
						webUrl: 'http://www.caiguohouzi.net',
					},
					success(res) {
						resolve(res);
					},
					fail(err) {
						var i = {
							code: 1,
							err
						}
						resolve(i);
						console.log("分享失败：", err);
					}
				});
			} else if (type == 1) {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: data1.href,
					title: data1.title,
					summary: data1.summary,
					imageUrl: data1.imageUrl,
					success: function(res) {
						resolve(res);
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						var i = {
							code: 1,
							err
						}
						resolve(i);
						console.log("fail:" + JSON.stringify(err));
					}
				});
			} else if (type == 2) {
				provider = "sinaweibo";
				uni.share({
					provider: "sinaweibo",
					type: 0,
					href: data1.href,
					title: data1.title,
					summary: data1.summary,
					imageUrl: data1.imageUrl,
					success: function(res) {
						resolve(res);
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						var i = {
							code: 1,
							err
						}
						resolve(i);
						console.log("fail:" + JSON.stringify(err));
					}
				});
			} else if (type == 3) {
				uni.share({
					provider: "qq",
					type: 1,
					href: data1.href,
					title: data1.title,
					summary: data1.summary,
					imageUrl: data1.imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
						resolve(res);
					},
					fail: function(err) {
						var i = {
							code: 1,
							err
						}
						resolve(i);
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		} else {
			uni.setClipboardData({
				data: fxinfo.url,
				success: function(res1) {
					uni.showToast({
						title: "已复制到剪切板"
					})
				}
			});
		}
	});

}





export default {
	async wxshare(data) {
		return wxshare(data)
	},
	async share(data) {
		return share(data)
	},
}
