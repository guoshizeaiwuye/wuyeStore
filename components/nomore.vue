<template>
	<view>
		<view class="flex  justify-center align-center view">
			<text class="lin"></text>
			<text class="text text-gray">{{text}}</text>
			<text class="lin"></text>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		props: {
			text: {
				type: String,
				default: '没有更多了'
			},
		},
		data() {
			return {};
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
	 
	.lin {
		padding: 0.5upx 30upx;
		background: #c8c3c3;
		margin: 0upx 20upx;
	}
	.text{
		font-size: 26upx; 
	}
	.view{
		height: 90upx;
	}
	 
 
/* ==================
          布局
 ==================== */
/*  -- flex弹性布局 -- */
.flex {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}
.basis-xs {
	-webkit-flex-basis: 20%;
	    -ms-flex-preferred-size: 20%;
	        flex-basis: 20%;
}
.basis-sm {
	-webkit-flex-basis: 40%;
	    -ms-flex-preferred-size: 40%;
	        flex-basis: 40%;
}
.basis-df {
	-webkit-flex-basis: 50%;
	    -ms-flex-preferred-size: 50%;
	        flex-basis: 50%;
}
.basis-lg {
	-webkit-flex-basis: 60%;
	    -ms-flex-preferred-size: 60%;
	        flex-basis: 60%;
}
.basis-xl {
	-webkit-flex-basis: 80%;
	    -ms-flex-preferred-size: 80%;
	        flex-basis: 80%;
}
.flex-sub {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	    -ms-flex: 1;
	        flex: 1;
}
.flex-twice {
	-webkit-box-flex: 2;
	-webkit-flex: 2;
	    -ms-flex: 2;
	        flex: 2;
}
.flex-treble {
	-webkit-box-flex: 3;
	-webkit-flex: 3;
	    -ms-flex: 3;
	        flex: 3;
}
.flex-direction {
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	    -ms-flex-direction: column;
	        flex-direction: column;
}
.flex-wrap {
	-webkit-flex-wrap: wrap;
	    -ms-flex-wrap: wrap;
	        flex-wrap: wrap;
}
.align-start {
	-webkit-box-align: start;
	-webkit-align-items: flex-start;
	    -ms-flex-align: start;
	        align-items: flex-start;
}
.align-end {
	-webkit-box-align: end;
	-webkit-align-items: flex-end;
	    -ms-flex-align: end;
	        align-items: flex-end;
}
.align-center {
	-webkit-box-align: center;
	-webkit-align-items: center;
	    -ms-flex-align: center;
	        align-items: center;
}
.align-stretch {
	-webkit-box-align: stretch;
	-webkit-align-items: stretch;
	    -ms-flex-align: stretch;
	        align-items: stretch;
}
.self-start {
	-webkit-align-self: flex-start;
	    -ms-flex-item-align: start;
	        align-self: flex-start;
}
.self-center {
	-webkit-align-self: flex-center;
	    -ms-flex-item-align: flex-center;
	        align-self: flex-center;
}
.self-end {
	-webkit-align-self: flex-end;
	    -ms-flex-item-align: end;
	        align-self: flex-end;
}
.self-stretch {
	-webkit-align-self: stretch;
	    -ms-flex-item-align: stretch;
	        align-self: stretch;
}
.align-stretch {
	-webkit-box-align: stretch;
	-webkit-align-items: stretch;
	    -ms-flex-align: stretch;
	        align-items: stretch;
}
.justify-start {
	-webkit-box-pack: start;
	-webkit-justify-content: flex-start;
	    -ms-flex-pack: start;
	        justify-content: flex-start;
}
.justify-end {
	-webkit-box-pack: end;
	-webkit-justify-content: flex-end;
	    -ms-flex-pack: end;
	        justify-content: flex-end;
}
.justify-center {
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	    -ms-flex-pack: center;
	        justify-content: center;
}
.justify-between {
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	    -ms-flex-pack: justify;
	        justify-content: space-between;
}
.justify-around {
	-webkit-justify-content: space-around;
	    -ms-flex-pack: distribute;
	        justify-content: space-around;
}
 
/* ==================
          文本
 ==================== */
.text-xs {
	font-size: 20rpx;
}
.text-sm {
	font-size: 24rpx;
}
.text-df {
	font-size: 28rpx;
}
.text-lg {
	font-size: 32rpx;
}
.text-xl {
	font-size: 36rpx;
}
.text-xxl {
	font-size: 44rpx;
}
.text-sl {
	font-size: 80rpx;
}
.text-xsl {
	font-size: 120rpx;
}
.text-Abc {
	text-transform: Capitalize;
}
.text-ABC {
	text-transform: Uppercase;
}
.text-abc {
	text-transform: Lowercase;
}
.text-price::before {
	content: "\A5";
	font-size: 80%;
	margin-right: 4rpx;
}
.text-cut {
	-o-text-overflow: ellipsis;
	   text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.text-bold {
	font-weight: bold;
}
.text-center {
	text-align: center;
}
.text-content {
	line-height: 1.6;
}
.text-left {
	text-align: left;
}
.text-right {
	text-align: right;
}
.text-red,
.line-red,
.lines-red {
	color: #e54d42;
}
.text-orange,
.line-orange,
.lines-orange {
	color: #f37b1d;
}
.text-yellow,
.line-yellow,
.lines-yellow {
	color: #fbbd08;
}
.text-olive,
.line-olive,
.lines-olive {
	color: #8dc63f;
}
.text-green,
.line-green,
.lines-green {
	color: #39b54a;
}
.text-cyan,
.line-cyan,
.lines-cyan {
	color: #1cbbb4;
}
.text-blue,
.line-blue,
.lines-blue {
	color: #0081ff;
}
.text-purple,
.line-purple,
.lines-purple {
	color: #6739b6;
}
.text-mauve,
.line-mauve,
.lines-mauve {
	color: #9c26b0;
}
.text-pink,
.line-pink,
.lines-pink {
	color: #e03997;
}
.text-brown,
.line-brown,
.lines-brown {
	color: #a5673f;
}
.text-grey,
.line-grey,
.lines-grey {
	color: #8799a3;
}
.text-gray,
.line-gray,
.lines-gray {
	color: #aaaaaa;
}
.text-black,
.line-black,
.lines-black {
	color: #333333;
}
.text-white,
.line-white,
.lines-white {
	color: #ffffff;
}
.lin {
	padding: 0.5rpx 30rpx;
	background: #c8c3c3;
	margin: 0rpx 20rpx;
}
.text{
	font-size: 26rpx;
}
.view{
	height: 90rpx;
}


</style>
