<template>
	<view>
		<view class="header">
			<view class="tab" @tap="qie" data-index="0" :class="sort == 0 ? 'action' : ''">综合</view>
			<view class="tab" @tap="qie" data-index="3" :class="sort == 3 ? 'action' : ''">销量</view>
			<view class="tab price " @tap="qie" data-index="2" :class="sort == 2 ? 'action' : ''">
				价格
				<view v-if="sort_type == -1">
					<view class="cuIcon-triangleupfill" style="position: relative;top: 12upx;"></view>
					<view class="cuIcon-triangledownfill" style="position: relative;top: -5upx;"></view>
				</view>
				<view v-else>
					<view class="cuIcon-triangleupfill" v-if="sort_type == 1"></view>
					<view class="cuIcon-triangledownfill" v-if="sort_type == 0"></view>
				</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
		<goodslist :list="goods_list"></goodslist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			sort: '',
			sort_type: '-1',
			goods_list: [],
			cat_id: '',
			page: 1,
			goods_id: '',
			nomore:false,
			nolist:false
		};
	},
	methods: {
		qie(e) {
			let index = e.currentTarget.dataset.index;
			that.sort = index;
			if (index == 2) {
				if (that.sort_type != -1) {
					that.sort_type == 1 ? (that.sort_type = 0) : (that.sort_type = 1);
				} else {
					that.sort_type = 1;
				}
			} else {
				that.sort_type = '-1';
			}
			that.page = 1;
			that.getlist();
		},
		getlist() {
			let goods_list=that.goods_list;
			let page=that.page;
			let nolist='';
			let nomore='';
			that.$request
				.request({
					url: that.api.default.goods_list,
					data: {
						cat_id: that.cat_id,
						page: that.page,
						sort: that.sort,
						sort_type: that.sort_type,
						goods_id: that.goods_id
					}
				})
				.then(res => {
					console.log(res);
					let li=res.list;
					if(page==1){
						goods_list=li
						page=1
						goods_list.length==0?nolist=true:nolist=false
					}else{
						if(li.length>0){
							goods_list=goods_list.concat(li);
							page++
							nolist=false
						}else{
							page==1?(nolist=true,nomore=false):(nolist=false,nomore=true)
						}
					}
					that.goods_list=goods_list;
					that.page=page;
					that.nolist=nolist;
					that.nomore=nomore;
				});
		}
	},
	onLoad(option) {
		that = this;
		that.cat_id = option.cat_id ? option.cat_id : 5;
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style>
@import '../../../goods.css';
.header {
	height: 80rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	/* top: 0; */
	z-index: 999;
	background: #fff;
}
.header .tab {
	flex: 1;
	text-align: center;
	font-size: 27rpx;
	color: #969696;
}
.header .action {
	color: #b000dd;
}
.price {
	display: flex;
	align-items: center;
	justify-content: center;
}
.xia .cuIcon-triangleupfill {
	color: #ffffff;
}
.shang .cuIcon-triangledownfill {
	color: #ffffff;
}
</style>
