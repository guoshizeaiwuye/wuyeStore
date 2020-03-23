<template>
	<view>
		<view>
			<view class="title">产品1</view>
			<view class="card-view">
				<view class="card-title">商品图片</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" @tap="ViewImage" :data-url="zheng" v-if="zheng">
							<image :src="zheng" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="zheng"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids bg-gray" @tap="ChooseImage" data-name="zheng" v-if="!zheng"><text class="cuIcon-add text-white " style="color: #FFF;"></text></view>
					</view>
				</view>
				<view class="form-group">
					<label>商品名称</label>
					<view class="form-group no-border "><input placeholder="请输入名称" placeholder-class="placeholder" /></view>
				</view>
				<view class="form-group no-border">
					<label>售价</label>
					<view class="form-group no-border"><input placeholder="请输入售价" placeholder-class="placeholder" /></view>
				</view>
			</view>
		</view>

		<view class="btn">+增加产品</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList: [],
			codez: '',
			codeb: '',
			zheng: ''
		};
	},
	methods: {
		async choose_img_upload(n) {
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(n);
			this.imgList = this.imgList.concat(path_arr);
			(that.images = that.images ? that.images + ',' + path_arr : path_arr), console.log('图片', that.images);
		}
	},
	onLoad() {}
};
</script>

<style>
page {
	background: #f5f5f5;
}
.form-group {
	height: 112upx;
	padding: 0upx 43upx;
	display: flex;
	align-items: center;
	background: #ffffff;
	border-bottom: solid 1upx #ebebeb;
}
.form-group label {
	width: 210upx;
}
.form-group .right {
	flex: 1;
}
.form-group .right input {
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	text-align: right;
}
.placeholder {
	font-size: 28upx;
	color: #c6c6c6;
	text-align: right;
}
.upimg-view {
	border-bottom: solid #eeeeee 1upx;
	padding: 0upx 20upx 10upx;
}
.cu-form-group {
	padding: 2upx 44upx;
}

.card-view {
	width: 712upx;
	margin: auto;
	background: #fff;
	border-radius: 20upx;
	overflow: hidden;
}
.title {
	height: 80upx;
	line-height: 80upx;
	padding-left: 53upx;
	font-size: 26upx;
	color: #9f9f9f;
}
.card-title {
	height: 105upx;
	line-height: 105upx;
	padding-left: 43upx;
	font-size: 30upx;
	color: #000000;
}
.no-border {
	border: none;
}
.btn {
	font-size: 28upx;
	color: #b701e5;
	text-align: center;
	line-height: 120upx;
	height: 120upx;
}
</style>
