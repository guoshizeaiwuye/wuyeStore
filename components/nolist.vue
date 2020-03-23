<template>
	<view>
		<!-- 
			1.粉丝
			2.关注
			3.订单
			4.收藏
			5.收益
			6.团队
		 -->
		<view class="margin-top" style="height: 80%;">
			<view class="text-center  ">
				<view class="flex justify-center" >
					<image class="icon" :src="imglist[type]" mode="widthFix" style="width: 400upx;height: 400upx;" ></image>
				</view> 
				<view class="text-sm text-gray margin-top" style="color: #b9b9b9;"  v-if="text">{{text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		name: 'onlist',
		props: {
			type: {
				type: String,
				default: '1'
			},
			text: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				page: 1,
				imglist: [
					"/static/nolist/fans.png",
					"/static/nolist/guanzhu.png",
					"/static/nolist/order.png",
					"/static/nolist/shoucang.png",
					"/static/nolist/shouyi.png",
					"/static/nolist/time.png",
					"/static/nolist/cart.png",
				]
			};
		},
		computed: {

		},
		methods: {

		},
		created() {

		}
	}
</script>

<style> 
	.text-center {
		text-align: center;
	}

	.text-sm {
		font-size: 24rpx;
	}

	.text-gray {
		color: #F0F0F0;
	}

	.margin-top {
		margin-top: 30rpx;
	}
</style>
