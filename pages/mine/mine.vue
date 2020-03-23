<template>
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="bg-gradual-green UCenter-bg">
				<image src="/static/logo.png" class="png" mode="widthFix"></image>
				<view class="text-xl">商城</view>
				<view class="margin-top-sm"><text>guo</text></view>
				<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>

			<view class="padding flex text-center text-grey bg-white shadow-warp">
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{ visitTotal }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-attentionfill"></text>
						View
					</view>
				</view>
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">{{ starCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-favorfill"></text>
						Star
					</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="text-xxl text-green">{{ forksCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-fork"></text>
						Fork
					</view>
				</view>
			</view>

			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius"> 
				<view class="cu-item arrow" v-for="(item,index) in tablist" :key="index">
					<navigator class="content" url="/pages/about/test/list" hover-class="none">
						<text class="cuIcon-creativefill text-orange"></text>
						<text class="text-grey">Bug测试</text>
					</navigator>
				</view>
			</view>
			
			
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
import data from'../../data.js'
var that;
export default {
	data() {
		return {
			tablist: [{}]
		};
	},
	methods: {
		
	},
	onLoad() {
		that=this;
		 that.tablist=data.minetablist
	}
};
</script>

<style>
.UCenter-bg {
	background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
	background-size: cover;
	height: 550rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	width: 750rpx;
	height: 300rpx;
}
</style>
