<template>
	<view>
		<view class="cu-modal bottom-modal" :class="show? 'show' : ''">
			<view class="cu-dialog">
				<view class="  bg-gary">
					<view class="down-item ">
						<view class="cu-list  bg-gary grid col-4 no-border" style="background-color: #f6f6f6;">
							<view class="cu-item  bg-gary down-tab" v-for="(item, index) in fxtablist" :key="index" @tap="provider" :data-id="item.id">
								<view class="text-center" style="width: 100%;">
									<image :src="item.image" style="width: 90upx;height: 90upx;"></image>
								</view>
								<text style="font-size: 20upx;color: #333333;">{{ item.name }}</text>
							</view>
						</view>
					</view>
					<view @tap="c_show" class=" bg-white text-center" style="height:75upx;line-height: 75upx;color: #0f0e0e;" >取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'shear',
		props: {
			data: {
				type: Object, 
			}, 
			show:{
				type: Boolean, 
			}
		},
		data() {
			return { 
				fxtablist: [{
						id: 0,
						image: '/static/img/invite/icon-wx.png',
						name: '分享到微信'
					}, 
					//#ifndef MP-WEIXIN 
					{
						id: 1,
						image: '/static/img/invite/icon-pyq.png',
						name: '分享到朋友圈'
					},
					{
						id: 2,
						image: '/static/img/invite/icon-wb.png',
						name: '分享到微博'
					},
					{
						id: 3,
						image: '/static/img/invite/icon-qq.png',
						name: '分享到QQ'
					}, 
					{
						id: 4,
						image: '/static/img/invite/icon-lj.png',
						name: '复制链接'
					},
					//#endif
				],
				fx: ''
			}
		},
		methods: {
			shearqita(e){
				let that=this;
				var index=e.currentTarget.dataset.index;
				var provider="";
				var scene="";
				var data="";
				var fx=that.fx;
				if(index==0){
					uni.share({
						provider: 'weixin',
						type: 5,
						imageUrl:fx.imageUrl,
						title: fx.title,
						miniProgram: {
							id: 'gh_e229d21f070b',
							path:fx.path, 
						},
						success(res) {
							resolve(res);
						},
						fail(err) {
						  var i={
							  code:1,
							  err
						  }
						  resolve(i);
						  // console.log("分享失败：",err);
						}
					});
				}else if(index==1){
					provider="weixin"; 
					scene= "WXSenceTimeline";
				} else if(index==2){
					provider="sinaweibo";
				}else if(index==3){ 
					provider="qq";
				}
				if(index!=4){
					uni.share({
					    provider:provider,
					    scene: scene, 
					    title: fx.name,
						href:fx.href,
						imageUrl:fx.imageUrl,
					    success: function (res) {
					        // console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        // console.log("fail:" + JSON.stringify(err));
					    }
					}); 
				}else{
					uni.showModal({
						title:"提示",
						content:"是否要复制推荐码？", 
						success(res) {
							if(res.confirm){
								var text=String(that.userinfo.recode);
								uni.setClipboardData({
									data: text,
									success: function (res1) {
										// console.log(res1); 
										// that.$alert(res1);
									}
								});
							}
						}
					}) 
				}
			},
			c_show(){
				that.show=false
			} 
		},
		
	}
</script>

<style>
	.cu-modal.bottom-modal.show {
		margin-bottom: 0;
	}

	.cu-modal.bottom-modal {
		margin-bottom: -1000rpx;
	}

	.cu-modal.show {
		opacity: 1;
		-webkit-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		-webkit-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;

	}

	.cu-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		-webkit-transform: scale(1.185);
		transform: scale(1.185);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-perspective: 2000rpx;
		perspective: 2000rpx;
		background: rgba(0, 0, 0, 0.6);
		-webkit-transition: all 0.3s ease-in-out 0s;
		-o-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;

	}

	/* .cu-modal.bottom-modal: : before {
		vertical-align: bottom;

	}

	.cu-modal: : before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;

	} */

	.cu-modal.bottom-modal .cu-dialog {
		width: 100%;
		border-radius: 0;

	}

	.cu-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680rpx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10rpx;
		overflow: hidden;

	}

	.margin-top {
		margin-top: 30rpx;

	}

	.cu-list.grid.no-border {
		padding: 20rpx 10rpx;

	}

	.grid {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;

	}

	.cu-list.grid.no-border .cu-item {
		padding-top: 10rpx;
		padding-bottom: 20rpx;

	}

	.grid.col-4  view {
		width: 25%;

	}

	.cu-list.grid>.cu-item {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		padding: 20rpx 0 30rpx;
		-webkit-transition-duration: 0s;
		-o-transition-duration: 0s;
		transition-duration: 0s;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;

	}

	.cu-list>.cu-item {
		-webkit-transition: all .6s ease-in-out 0s;
		-o-transition: all .6s ease-in-out 0s;
		transition: all .6s ease-in-out 0s;
		-webkit-transform: translateX(0rpx);
		-ms-transform: translateX(0rpx);
		transform: translateX(0rpx);

	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;

	}

	.text-center {
		text-align: center;

	}
</style>
