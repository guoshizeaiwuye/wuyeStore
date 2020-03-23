<template>
	<view>
		<view class="kong" style="height: 10px;"></view>
		<view class="VerticalBox"  style="height: calc(100vh - 10px);" >
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:100%">
				<view class="cu-item" :class="index == tabCur ? 'action' : ''" v-for="(item, index) in list" :key="index" @tap="TabSelect" :data-id="index">{{ item.name }}</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:100%">
				<view class="list padding-top">
					<view class="cu-list grid col-3  no-border " style="width: 100%;">
						<view class="cu-item click" v-for="(item, index) in list[tabCur].list" :key="index" @tap="tpinfo" :data-url="'/pages/goods/goodsList/goodsList?cat_id='+item.id">
							<view><image class="li-image" :src="item.pic_url" mode="aspectFill"></image></view>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			list: [],
			tabCur: 0,
			mainCur: 0,
			verticalNavTop: 0,
			load: true
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
	},
	onReady() {
		uni.hideLoading();
	},
	methods: {
		TabSelect(e) {
			this.tabCur = e.currentTarget.dataset.id;
			this.mainCur = e.currentTarget.dataset.id;
			this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
		},
		tpinfo(e) {
			let url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: url
			});
		},
		getlist() {
			that.$request.request({
				url: that.api.default.cat_list
			}).then(res=>{
				console.log(res);
				that.list=res.list
			}) 
		}
	},
	onLoad() {
		that = this;
		that.getlist();
	}
};
</script>

<style>
.fixed {
	position: fixed;
	z-index: 99;
}

.VerticalNav.nav {
	width: 200upx;
	white-space: initial;
}

.VerticalNav.nav .cu-item {
	width: 100%;
	text-align: center;
	margin: 0;
	border: none;
	height: 84rpx;
	position: relative;
}
.VerticalNav.nav .action {
	width: 100%;
	text-align: center;
	background-color: #fff;
	color: #a500d3;
	border: none;
	height: 84rpx;
	position: relative;
}

.VerticalNav.nav .cu-item.cur {
	background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item.cur::after {
	content: '';
	width: 8upx;
	height: 30upx;
	border-radius: 10upx 0 0 10upx;
	position: absolute;
	background-color: currentColor;
	top: 0;
	right: 0upx;
	bottom: 0;
	margin: auto;
}

.VerticalBox {
	display: flex; 
}

.VerticalMain {
	background-color: #fff;
	flex: 1;
}

.list {
	display: flex;
	flex-wrap: wrap;
}
.li-image {
	width: 70rpx;
	height: 70rpx;
} 
</style>
