<template>
	<view>
		<view>
			<swiper
				class="screen-swiper"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="5000"
				duration="500"
				indicator-active-color="#FFF"
				style="height: 720upx;"
			>
				<swiper-item v-for="(item, index) in goods.pic_list" :key="index"><image :src="item.pic_url" mode="aspectFill"></image></swiper-item>
			</swiper>
		</view>

		<view class=" padding-air bg-white " style="padding-top: 15upx; ">
			<view v-if="userinfo.level == -1" class="flex  justify-between" style="font-weight: 550; overflow: hidden;height: 50upx;">
				<view class="price-color" style="font-size: 38upx;font-weight: 550;margin-right: 20upx;">￥{{ goods.price ? goods.price : '' }}</view>
				<view class="text-gray" style="font-size: 24upx;position: relative;top: 10upx;">销量：{{ goods.sales ? goods.sales : '' }}</view>
			</view>
			<view v-else class=" flex justify-between " style="font-weight: 550; overflow: hidden;">
				<text style="font-size: 38upx;color: #ff4040;">
					<text class="price-color">￥{{ goods.min_member_price ? goods.min_member_price : '' }}</text>
					<text class="text-gray old-price" style="font-size: 28upx;margin: 0upx 10upx;">￥{{ goods.max_price ? goods.max_price : '' }}</text>
				</text>
				<view class="text-gray" style="font-size: 24upx;position: relative;top: 10upx;">销量：{{ goods.sales ? goods.sales : '' }}</view>
			</view>
			<view style="font-weight: 600; margin-top: 10upx;">
				<text style="font-size: 32upx;color: #000000;">{{ goods.name ? goods.name : '' }}</text>
			</view>
			<view class="text-gray " v-if="goods.subtitle" style="font-size: 27upx; padding:10upx 0upx 20upx;">{{ goods.subtitle ? goods.subtitle : '' }}</view>
		</view>
		<view class="kong"></view>
		<view>
			<view class="li-view  ">
				<view class="li-title">选择数量</view>
				<view class="li-conten flex align-center">
					<view class="add-del" @tap="comput" :data-type="1">-</view>
					<view style="font-size: 26upx;color: #000000; width: 80upx;text-align: center;">{{ num }}</view>
					<view class="add-del" @tap="comput" :data-type="0">+</view>
				</view>
			</view>
			<view class="li-view " @tap="getall" data-type="2">
				<view class="li-title text-gray">选择规格</view>
				<view class="li-conten text-black" style="color: #000000 !important;">
					<block v-for="(item, index) in prinattr" :key="index">
						<block v-if="index != 0">,</block>
						{{ item.attr_name }}
					</block>
					<block v-if="prinattr.length == 0">请选择规格</block>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<view class="kong"></view>
		<view v-if="goods.video_url" style="position: relative; ">
			<view
				class=" bg-img flex justify-center align-center "
				@tap="playvideo"
				style="width: 100%;height: 350upx;"
				:style="{ backgroundImage: 'url(' + goods.video_url + '?x-oss-process=video/snapshot,t_10000,m_fast,f_png,ar_auto)' }"
			>
				<image src="/static/ico/pay.png" style="width: 70upx;height: 70upx;"></image>
			</view>
		</view>

		<!-- 商户 -->
		<block v-if="goods.mch">
			<view class="let-mchView">
				<view class="image"><image :src="goods.mch.logo" mode="aspectFill"></image></view>
				<view class="center">
					<view class="mchName">{{ goods.mch.name }}</view>
					<view class="mchNum">共{{ goods.mch.goods_num }}件宝贝</view>
				</view>
				<view><button class="cu-btn" @tap="tpmchinfo" :data-id="goods.mch.id">进入</button></view>
			</view>
			<view class="kong"></view>
		</block>
		<view class="padding-air bg-white  ">
			<view class=" flex justify-center align-center ">
				<text class="lain"></text>
				<view style="font-size: 28upx;">商品详情</view>
				<text class="lain"></text>
			</view>
		</view>
		<view class="info bg-white">
			<rich-text :nodes="detail"></rich-text>
			<video :src="goods.video_url" v-if="play" id="myVideo" @fullscreenchange="fullscreenchange" style="width: 100%;height: 350upx; "></video>
		</view>
		<view style="height: 120upx;"></view>
		<view class="foot cu-bar bg-white tabbar border shop">
			<button class="action " @tap="favoriteAddRem" :data-favorite="goods.is_favorite">
				<view class="cuIcon-favorfill price-color " v-if="goods.is_favorite"></view>
				<view class="cuIcon-favor text-gray" v-else></view>
				<block v-if="goods.is_favorite">已收藏</block>
				<block v-else>收藏</block>
			</button>
			<view class="action" @tap="tocard">
				<view class="cuIcon-cart"></view>
				购物车
			</view>
			<view class="btn-group">
				<button class="cu-btn lin-color round shadow-blur" @tap="getall" data-type="3">加入购物车</button>
				<button class="cu-btn lin-color1 round shadow-blur" @tap="getall" data-type="2">立即购买</button>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="modal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="action text-blue" @tap="hideModal"><text class="cuIcon-close text-black"></text></view>
				</view>
				<view class="padding-li text-left bg-white" v-for="(item, index) in attr" :key="index">
					<view class="text-left" style="height: 60upx;">{{ item.attr_group_name }}</view>
					<view class="no-h-view" style="padding-bottom: 30upx;">
						<view
							class="x_view"
							:class="item1.type ? 'bg-yellow1' : ''"
							v-for="(item1, index1) in item.attr_list"
							:key="index1"
							@tap="getattr"
							:data-id="item1.attr_id"
							:data-gid="item.attr_group_id"
						>
							{{ item1.attr_name }}
						</view>
					</view>
				</view>
				<view class="bg-black " style="height: 88upx;font-size: 30upx;line-height: 88upx; " @tap="hideModal">确定</view>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="allmodal ? 'show' : ''">
			<view style="width: 100%;height: 100%;position: absolute;top: 0upx;" @tap="getall" data-type="1"></view>
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="flex justify-between" style="width: 100%;position: relative;">
						<view class="flex " style="padding:40upx 30upx;">
							<view>
								<view class="bg-img x_goodsimg">
									<image :src="attrgoods.pic ? attrgoods.pic : goods.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
								</view>
							</view>
							<view class=" " style="width: 400upx;">
								<view class="text-left text-cut2" style="line-height: 48upx;font-size: 30upx; height: 100upx;">{{ goods.name }}</view>
								<view class="text-left text-bold price-color" style=" width: 100%;font-size: 32rpx; margin-top: 20upx;">
									￥{{ attrgoods.price ? attrgoods.price : goods.price }}
								</view>
								<!-- <view>库存 {{ attrgoods.num ? attrgoods.num : goods.num }}</view> -->
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 450upx;width: 100%;">
					<view class="padding-li text-left bg-white" v-for="(item, index) in attr" :key="index" style="padding: 0upx 40upx;">
						<view class="text-left" style="height: 60upx;">{{ item.attr_group_name }}</view>
						<view class="no-h-view" style="padding-bottom: 30upx;">
							<view
								class="x_view"
								:class="item1.type ? 'bg-yellow1' : ''"
								v-for="(item1, index1) in item.attr_list"
								:key="index1"
								@tap="getattr"
								:data-id="item1.attr_id"
								:data-gid="item.attr_group_id"
								:data-name="item1.attr_name"
							>
								{{ item1.attr_name }}
							</view>
						</view>
					</view>
					<view class="bg-white flex justify-between  align-center" style="height: 100upx;padding: 0upx 40upx; ">
						<view>数量:</view>
						<view class="li-conten flex align-center " style="width: 200upx;">
							<view class="add-del" @tap="comput" :data-type="1">-</view>
							<view style="font-size: 26upx;color: #989898; width: 80upx;text-align: center;">{{ num }}</view>
							<view class="add-del" @tap="comput" :data-type="0">+</view>
						</view>
					</view>
				</scroll-view>
				<view class="bg-black  bg-yellow1" v-if="prinattr.length == attr.length" @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">
					确定
				</view>
				<view class="  bg-yellow1" v-else @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
var videoCtx;
export default {
	data() {
		return {
			swiperList: [],
			dotStyle: false,
			towerStart: 0,
			direction: '',
			pjlist: [],
			gid: '',
			goods: '',
			attr: '',
			detail: '',
			modal: false,
			modali: false,
			allmodal: false,
			prinattr: [],
			num: 1,
			comment: '',
			attrgoods: '',
			buytype: 1,
			userinfo: uni.getStorageSync('userinfo'),
			show: false,
			fx: '',
			play: false,
			kefupara: '',
			jsonUser: ''
		};
	},
	methods: {
		showModel(e) {
			that.allmodal = true;
		},
		tocard() {
			uni.navigateTo({
				url: '/pages/cart/cart'
			});
		},
		tpmchinfo(e) {
			uni.navigateTo({
				url: '/pages/mch/mchinfo/mchinfo?id=' + e.currentTarget.dataset.id
			});
		},
		getinfo() {
			this.$request
				.request({
					url: that.api.default.goods,
					data: {
						id: that.gid
					}
				})
				.then(res => {
					console.log(res);
					that.goods = res;
					that.goods['cover_pic'] = res.pic_list[0].pic_url;
					var attr = res.attr_group_list;
					that.attr = attr;
					var detail = res.detail.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
					that.detail = detail;
				});
		},
		hideModal() {
			that.modal = !that.modal;
		},
		tmodal() {
			that.modali = !that.modali;
		},
		pint(e) {
			console.log(e.currentTarget.dataset.id);
			that.kd = e.currentTarget.dataset.id;
		},
		getall(e) {
			if (e) {
				//判断但规格直接购买
				if (e.currentTarget.dataset.ok) {
					if (that.prinattr.length == that.attr.length) {
						if (e.currentTarget.dataset.type != 1) {
							if (that.paytype == 2) {
								console.log('attrgoods', that.attrgoods);
								if (that.attrgoods) {
									if (that.attrgoods.num == 0) {
										that.$alert('当前商品已售罄!');
										that.allmodal = !that.allmodal;
										return;
									}
								} else {
									console.log('goods', that.goods.num);
									if (that.goods.num == 0) {
										that.$alert('当前商品已售罄!');
										that.allmodal = !that.allmodal;
										return;
									}
								}
								that.buy();
							}
							if (that.paytype == 3) {
								that.addcart();
							}
							that.allmodal = !that.allmodal;
						}
					} else {
						that.$alert('请选择规格');
						return;
					}
				} else {
					if (that.attr.length == 1 && that.attr[0].attr_list.length == 1) {
						console.log('单规格');
						that.attr[0].attr_list[0]['type'] = true;
						var v = {
							attr_group_id: that.attr[0].attr_group_id,
							attr_id: that.attr[0].attr_list[0].attr_id,
							attr_name: that.attr[0].attr_list[0].attr_name
						};
						that.prinattr[0] = v;
						that.$forceUpdate();
						console.log('prinattr：', that.prinattr);
					}
					that.allmodal = !that.allmodal;
					that.paytype = e.currentTarget.dataset.type;
				}
			} else {
				that.allmodal = !that.allmodal;
			}
		},
		//评论列表
		getcomlist() {
			this.$request
				.request({
					url: that.api.default.comment_list,
					data: {
						goods_id: that.gid,
						page: 1
					}
				})
				.then(res => {
					if (res.list.length > 0) {
						that.comment = res.data.list[0];
					}
				});
		},
		tplist() {
			uni.navigateTo({
				url: '/pages/evaluateList/evaluateList?id=' + that.gid
			});
		},
		// 打开客服
		kefu() {},

		// 加入购物车
		addcart() {
			if (!uni.getStorageSync('access_token')) {
				that.$zax.yzlogin();
				return;
			}
			if (that.prinattr.length != that.attr.length) {
				that.getall();
				return;
			}
			console.log('商品id:', that.gid);
			console.log('规格信息：', that.prinattr);
			console.log('数量：', that.num);
			// return;
			this.$request
				.request({
					url: that.api.cart.add_cart,
					data: {
						goods_id: that.gid,
						attr: JSON.stringify(that.prinattr),
						num: that.num
					},
					method: 'post'
				})
				.then(res => {
					this.$alertok('添加购物车成功');
				});
		},
		// 选择规格
		getattr(e) {
			var attr_group_id = e.currentTarget.dataset.gid;
			var attr_id = e.currentTarget.dataset.id;
			var attr_name = e.currentTarget.dataset.name;
			for (let t = 0; t < that.attr.length; t++) {
				if (that.attr[t].attr_group_id == attr_group_id) {
					console.log('当前大类:', that.attr[t]);
					for (let a = 0; a < that.attr[t].attr_list.length; a++) {
						if (that.attr[t].attr_list[a].attr_id == attr_id) {
							console.log('选择的小类：', that.attr[t].attr_list[a]);
							that.attr[t].attr_list[a]['type'] = true;
							that.$forceUpdate();
						} else {
							that.attr[t].attr_list[a]['type'] = false;
							that.$forceUpdate();
						}
					}
				}
			}
			// 添加规格
			var list = [];
			for (let t = 0; t < that.attr.length; t++) {
				for (let a = 0; a < that.attr[t].attr_list.length; a++) {
					if (that.attr[t].attr_list[a]['type'] == true) {
						var v = {
							attr_group_id: that.attr[t].attr_group_id,
							attr_id: that.attr[t].attr_list[a].attr_id,
							attr_name: that.attr[t].attr_list[a].attr_name
						};
						// console.log("点击的", v);
						list = list.concat(v);
						that.$forceUpdate();
					}
				}
			}
			that.prinattr = list;
			// console.log('选择规格:', that.prinattr);
			// console.log("规格列表：", that.attr)
			that.getattringo();
			that.$forceUpdate();
		},

		comput(e) {
			var type = e.currentTarget.dataset.type;
			if (type == 0) {
				that.num = that.num + 1;
			} else {
				if (that.num == 1) {
					return;
				}
				that.num = that.num - 1;
			}
		},
		buy() {
			if (!uni.getStorageSync('access_token')) {
				that.$zax.yzlogin();
				return;
			}
			if (that.prinattr.length != that.attr.length) {
				that.getall();
				return;
			}
			var mch_list = [
				{
					mch_id: that.goods.mch ? that.goods.mch.id : '0',
					goods_list: [
						{
							goods_id: that.gid,
							attr: that.prinattr,
							num: that.num
						}
					]
				}
			];
			console.log('订单信息：', mch_list);
			this.$request
				.request({
					url: that.api.order.new_submit_preview,
					data: {
						mch_list: JSON.stringify(mch_list)
					},
					method: 'post'
				})
				.then(res => {
					console.log(res);
					uni.setStorageSync('order', res);
					uni.redirectTo({
						url: '/pages/order/createOrder/createOrder'
					});
				});
		},
		//获取规格信息
		getattringo() {
			var attr_list = [];
			for (let i in that.prinattr) {
				attr_list.push(that.prinattr[i].attr_id);
			}
			that.$request
				.request({
					url: that.api.default.goods_attr_info,
					data: {
						goods_id: that.gid,
						attr_list: JSON.stringify(attr_list),
						group_checked: 0,
						group_id: 0
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log('规格信息', res);
						that.attrgoods = res;
					}
				});
		},
		previewImage(e) {
			console.log(e.currentTarget.dataset.list);
			uni.previewImage({
				urls: e.currentTarget.dataset.list,
				current: e.currentTarget.dataset.img
			});
		},
		playvideo() {
			that.play = true;
			videoCtx = uni.createVideoContext('myVideo');
			setTimeout(function() {
				videoCtx.requestFullScreen();
				0;
				videoCtx.play();
			}, 100);
		},
		fullscreenchange(e) {
			if (!e.detail.fullScreen) {
				videoCtx.stop();
				setTimeout(function() {
					that.play = false;
				}, 1000);
			}
		},
		// favorite-add 收藏
		favoriteAddRem(e) {
			let favorite = e.currentTarget.dataset.favorite;
			console.log(favorite);
			let url = favorite != 0 ? that.api.user.favorite_remove : that.api.user.favorite_add;
			that.$request
				.request({
					url: url,
					data: {
						goods_id: that.gid
					},
					method: 'post'
				})
				.then(res => {
					that.getinfo();
				});
		}
	},
	onLoad(option) {
		that = this;
		console.log(option);
		that.gid = option.gid ? option.gid : '1';
		that.getinfo();
		that.getcomlist();
		that.userinfo = uni.getStorageSync('userinfo');
		videoCtx = uni.createVideoContext('myVideo');
		that.jsonUser = uni.getStorageSync('jsonUser');
	},
	onBackPress() {
		if (!that.allmodal) {
			that.allmodal = !that.allmodal;
			return;
		}
	},
	onShareAppMessage() {
		console.log('分享');
		var goods = that.goods;
		console.log(goods);
		return {
			imageUrl: goods.cover_pic,
			title: goods.name,
			path: '/pages/goods/goodsinfo/goodsinfo?gid=' + goods.id + '&user_id=' + that.userinfo.id,
			success: function(res) {
				console.log('成功', res);
			}
		};
	}
};
</script>

<style>
.wl-list {
	font-size: 28upx;
	height: 140upx;
	padding: 0upx 50upx;
	border-bottom: solid 1upx #ececec;
}

.wl-list image {
	width: 34upx;
	height: 34upx;
}

.no-h-view {
	flex-wrap: wrap;
	display: flex;
}

.padding-li {
	padding: 0upx 20upx 0upx 50upx;
}

.x_view {
	/* width: 150upx; */
	padding: 0upx 20upx;
	height: 56upx;
	line-height: 56upx;
	background: #ececec;
	font-size: 24upx;
	text-align: center;
	border-radius: 10upx;
	margin: 11upx 20upx 11upx 0upx;
	color: #9f9f9f;
}

.bg-yellow1 {
	background: #b701e5;
	color: #fff;
}

.t-view {
	/* height: 284upx; */
	border: solid 1upx #c7c7c7;
	margin-top: 32upx;
	padding: 20upx 40upx;
	border-radius: 10upx;
}

.soldi-bottom {
	border-bottom: solid 2upx #e2e2e2;
}

.ts-view {
	padding: 0upx 33upx 0upx 45upx;
	height: 77upx;
	background-color: #353535;
	font-size: 28upx;
	color: #ffffff;
}

.ts-view .cu-btn {
	width: 166upx;
	height: 48upx;
	font-size: 26upx;
	font-weight: 500;
}

.screen-swiper {
	height: 511upx;
	background-color: #f0f0f0;
}

.padding-air {
	padding: 35upx 44upx 35upx 52upx;
}

.li-view {
	height: 105upx;
	display: flex;
	align-items: center;
	background: #fff;
	padding: 0upx 36upx;
	border-bottom: solid #eeeeee 1upx;
}

.li-title {
	color: #1d1d1d;
	font-size: 28upx;
	width: 180upx;
}

.li-conten {
	color: #989898;
	font-size: 26upx;
	width: 460upx;
}

.lin-color {
	background-image: linear-gradient(-60deg, #dd00ac 0%, #fd59ff 100%);
	height: 75upx;
	font-size: 28upx;
	color: #ffffff;
}
.lin-color1 {
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	height: 75upx;
	font-size: 28upx;
	color: #ffffff;
}

.x_goodsimg {
	width: 184upx;
	height: 184upx;
	border-radius: 10upx;
	margin-right: 30upx;
	overflow: hidden;
}
</style>
