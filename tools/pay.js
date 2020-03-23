import config from "./ajax.js";

function wxpay(order_id) {
	return new Promise(function(resolve, reject) {
		config.get({
				url: 'api/order/pay-data',
				data: {
					order_id: order_id,
					pay_type: "WECHAT_PAY",
				}
			},
			'正在发送'
		).then(res => {
			console.log(res, 33333); 
			// #ifdef APP-PLUS 
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: res, //微信单数据
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					resolve(res)
				},
				fail: function(err) {
					var i={
						code:1,
						err
					}
					console.log('fail:' ,i);
					console.log("支付失败")
					resolve(i)
				}
			});
			//#endif
			//#ifdef MP-WEIXIN
			console.log("支付参数：",res);
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp:res.data.timeStamp,
				nonceStr: res.data.nonceStr,
				package: res.data.package,
				signType: res.data.signType,
				paySign: res.data.paySign, 
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				},
			});
		//#endif

		});
	})
}

function alpay(order_id) {
	return new Promise(function(resolve, reject) {
		config.get({
				url: 'api/order/pay-data',
				data: {
					order_id: order_id,
					pay_type: "ALIPAY",
				}
			},
			'正在发送'
		).then(res => {
			console.log(res, 33333);
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: res.data, //支付宝订单数据
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					resolve(res)
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
					var i={
						code:1,
						err
					}
					console.log('fail:' ,i);
					console.log("支付失败")
					resolve(i)
				}
			});
		});
	})
}

function lqpay(order_id) {
	return new Promise(function(resolve, reject) {
		config.get({
				url: 'api/order/pay-data',
				data: {
					order_id: order_id,
					pay_type: "BALANCE_PAY",
				}
			},
			'正在发送'
		).then(res => {
			console.log(res, 33333);
			resolve(res)
		});
	})
}

function groupwxpay(order_id) {
	return new Promise(function(resolve, reject) {
		config.get({
				url: 'api/order/pay-data',
				data: {
					order_id: order_id,
					pay_type: "WECHAT_PAY",
					order_id_list: '',
					form_id: 'undefined',
					parent_user_id: 0,
					condition: 2,
				}
			},
			'正在发送'
		).then(res => {
			console.log(res, 33333); 
			// #ifdef APP-PLUS 
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: res, //微信单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						resolve(res)
					},
					fail: function(err) {
						var i={
							code:1,
							err
						}
						console.log('fail:' ,i);
						console.log("支付失败")
						resolve(i)
					}
				});
				//#endif
				//#ifdef MP-WEIXIN
				console.log("支付参数：",res);
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp:res.data.timeStamp,
					nonceStr: res.data.nonceStr,
					package: res.data.package,
					signType: res.data.signType,
					paySign: res.data.paySign, 
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					},
				});
			//#endif 
		});
	})
}

function groupalpay(order_id) {
	return new Promise(function(resolve, reject) {
		config.get({
				url: 'api/group/order/pay-data',
				data: {
					order_id: order_id,
					pay_type: "ALIPAY",
					order_id_list: '',
					form_id: '',
					parent_user_id: 0,
					condition: 2,
				}
			},
			'正在发送'
		).then(res => {
			console.log(res, 33333);
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: res.data, //支付宝订单数据
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					resolve(res)
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
					var i={
						code:1,
						err
					}
					console.log('fail:' ,i);
					console.log("支付失败")
					resolve(i)
				}
			});
		});
	})
}

function grouplqpay(order_id) {
	return new Promise(function(resolve, reject) {
		config.get({
				url: 'api/group/order/pay-data',
				data: {
					order_id: order_id,
					pay_type: "BALANCE_PAY",
					order_id_list: '',
					form_id: '',
					parent_user_id: 0,
					condition: 2,
				}
			},
			'正在发送'
		).then(res => {
			console.log(res, 33333);
			resolve(res)
		});
	})
}
export default {
	async pay(paytype, order_id) {
		if (paytype == "WECHAT_PAY") {
			// 微信支付
			return wxpay(order_id)
		}
		if (paytype == "ALIPAY") {
			// 支付宝支付
			return alpay(order_id)
		}
		if (paytype == "BALANCE_PAY") {
			// 零钱支付
			console.log("爱上你的就看撒", paytype);
			return lqpay(order_id)
		}
	},
	async grouppay(paytype, order_id) {
		console.log("支付方式：",paytype);
		if (paytype == "WECHAT_PAY") {
			// 微信支付
			return groupwxpay(order_id)
		}
		if (paytype == "ALIPAY") {
			// 支付宝支付
			return groupalpay(order_id)
		}
		if (paytype == "BALANCE_PAY") {
			// 零钱支付 
			return grouplqpay(order_id)
		}
	}
}
