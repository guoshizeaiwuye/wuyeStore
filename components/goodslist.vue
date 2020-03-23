<template>
	<view> 
		<view class="goodslist" v-if="type==0" >
			<block v-for="(item, index) in list" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id">
					<view class="goods-img"><image :src="item.pic_url?item.pic_url:item.cover_pic" mode="aspectFill" lazy-load="true" style="width: 100%;height: 100%;" ></image></view>
					<view class="goods-down">
						<view class="goods-name text-cut">{{ item.name?item.name:'' }}</view>
						<view class="goods-dview">
							<view class="goods-price">￥{{ item.price?item.price:'' }}</view>
							<view class="icon-car"><image src="/static/icon/icon-car.png" mode="widthFix"></image></view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 首页不带购物车 -->
		<view class="goodslist2" v-if="type==4" >
			<block v-for="(item, index) in list" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id">
					<view class="goods-img"><image :src="item.pic_url?item.pic_url:item.cover_pic" mode="aspectFill" lazy-load="true"  style="width: 100%;height: 100%;"></image></view>
					<view class="goods-down">
						<view class="goods-name text-cut">{{ item.name?item.name:''}}</view>
						<view class="goods-dview">
							<view class="goods-price">￥{{ item.price?item.price:'' }}</view>
							<!-- <view class="icon-car"><image src="/static/icon/icon-car.png" mode="widthFix"></image></view> -->
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goodslist',
		props: {
			list: {
				type: Array  
			}, 
			type:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			tpinfo(e){
				let id=e.currentTarget.dataset.id;
				uni.navigateTo({
					url:'/pages/goods/goodsInfo/goodsInfo?gid='+id
				})
			}
		}
	}
</script>

<style>
 @import "../goods.css";
 .goodslist{
	 padding-top: 0upx;
	 padding-bottom: 0upx;
 } 
</style>
