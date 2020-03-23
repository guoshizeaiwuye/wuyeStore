<template>
	<view>
		<text @tap="sendCode">
			<block v-if="timepay">{{time}}</block>
			<block v-else>获取验证码</block>
		</text>
	</view>
</template>

<script>
	var clock ;
export default {
	props: {
		phone: {
			type: String,
			default: ''
		},
		event:{
			type: String,
			default: ''
		}
	},
	data() {
		return {
			timepay: false,
			time: 60
		};
	},
	methods: {
		sendCode() {
			let that = this;
			if (that.timepay) {
				uni.showToast({
					title: '请稍后再获取',
					icon: 'none'
				});
				return;
			}
			if (!that.phone) {
				uni.showToast({
					title: '请填写手机号码',
					icon: 'none'
				});
				return;
			}
			if (!/^1[3456789]\d{9}$/.test(that.phone)) {
				uni.showToast({
					title: '请填写正确的手机号码',
					icon: 'none'
				});
				return;
			}
			this.$request
				.get({
					url: 'api/sms/send',
					data: {
						mobile: that.phone,
						event:that.event
					},
					rejectType:true
				})
				.then(res => {
					this.$alert('发送成功');
					that.timepay = true;
					that.time = 60;
					that.setime();
				})
				.catch(e => {
					this.$alert(e.msg);
				});
		},
		// 倒计时
		setime() {
			let that=this;
			clock = setInterval(function(){
				if (that.time >= 1) {
					that.time = that.time - 1;
				} else {
					clearInterval(clock);
					that.timepay = false;
				}
			}, 1000);
		}
	}, 
};
</script>

<style></style>
