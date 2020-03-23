<template>
	<view> 
		<view class="cu-bar search bg-white fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入搜索关键词" :value="keyword" confirm-type="search" @input="getsearch" @confirm="search"></input>
			</view>
			<view class="action"><button class="cu-btn  shadow-blur round zcolor-btn" @tap="search">搜索</button></view>
		</view>

		<view style="height: 100upx;"></view>
		<!-- 历史记录 -->
		<view class="search-local  margin-top "  v-if="localshow">
			<block v-if="local.length>0" >
				<view class="flex justify-between padding-sm ">
					<view>历史记录</view>
					<view @tap="del">
						<text class="cuIcon-delete"></text>
					</view>
				</view>
				<view class=" flex flex-wrap  ">
					<view class="s-local" v-for="(item, index) in local" :key="index" @click="searchList(index)">{{ local[index] }}</view>
				  
				</view>
			</block>
		</view>
		<block v-else >
			<block v-if="list.length>0" >
			<goodslist :list="list"></goodslist>
			</block>
			<uni-load-more :status="lodstatus" v-if="page_count!=1" ></uni-load-more>
		</block>
		 
	

		<nolist type="1" :text="'没有搜索到关于“' + keyword + '”的商品'" v-if="nolist && keyword"></nolist>

		  
	</view>
</template>

<script>
var that;
var arr = [];
export default {
	data() {
		return {
			lodstatus:'',//loading,more,noMore
			CustomBar: this.CustomBar,
			page: 1,
			list: [],
			keyword: '',
			nolist: false,
			local: [],
			localshow: true,
			modal: false,
			page_count:'',
			row_count:''
		};
	},
	methods: {
		getlist(e) { 
			that.lodstatus='loading';
			this.$request
				.request(
					{
						url: that.api.default.search, 
						data: {
							page: that.page,
							keyword: that.keyword
						},
						Toast:'正在搜索' 
					} 
				)
				.then(res => {  
					var list = res.list; 
					if(that.page==1){
						that.list=list;
						that.page++
						that.lodstatus='more';
					}else{
						if(list.length>0){
							that.list=that.list.concat(list);
							that.page++;
							that.lodstatus='more';
						}else{
							that.lodstatus='noMore';
						} 
					}
					that.page_count=res.page_count;
					that.row_count=res.row_count
					
				});
		},
		del() {
			that.local = [];
			uni.setStorageSync('local', that.local); 
		}, 
		//获取显示历史记录
		fo() {
			var local = uni.getStorageSync('local');
			// 历史记录倒序
			if (local) {
				local.reverse();
				that.local = local;
				that.localshow = true;
			} else {
				uni.setStorageSync('local', []);
			}
		},
		searchList(e) {
			//console.log(this.local[e])
			that.keyword = that.local[e];
			that.page = 1;
			that.list = [];
			that.getlist();
			that.nolist = false;
			// 隐藏历史记录
			that.localshow = false;
		},
		getsearch(e) {
			that.keyword = e.detail.value;
			that.nolist=false;
			if (that.keyword.length == 0){
				that.localshow = true;
				that.fo();
			}
		},
		search(e) {
			that.page = 1;
			that.list = [];
			that.nolist = false;
			that.getlist();  
			that.localshow = false;
			var val =that.keyword; 
			val = val?val.trim():val;
			if (val!= '') {
				if (uni.getStorageSync('local') != []) {
					arr = uni.getStorageSync('local');
					// 不重复添加值
					if (arr.indexOf(val) == -1) {
						arr.push(val);
					}
					//最多显示15条历史记录
					if (arr.length > 15) {
						arr.shift();
					}
				} else {
					// 不重复添加值
					if (arr.indexOf(val) == -1) {
						arr.push(val);
					}
				}
			}
			uni.setStorageSync('local', arr);
			that.local=arr;
			
		}
	},

	onLoad() {
		that = this;
		// 显示历史记录
		that.fo();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style>
page {
	background: #F0F0F0;
}

.text-cut {
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.goods-list {
	padding: 14upx;
}

.text-center {
	text-align: center;
}

.goods-li {
	padding: 14upx 14upx;
}

.goods-view {
	/* border: solid 2upx #e6e4e4; */
	border-radius: 10upx;
	overflow: hidden;
}

.goods-info {
	padding: 10upx 26upx 26upx 26upx;
}

.goods-info .goods-name {
	font-size: 30upx;
	margin-top: 10upx;
}

.gooods-info .goods-conten {
	font-size: 26upx;
	transform: scale(0.5);
}

.goods-info .goods-price {
	margin: 15upx 0upx;
}

.goods-info .goods-price .price {
	font-size: 30upx;
	color: #ff4040;
	margin-right: 10upx;
	font-weight: 550;
}

.goods-info .goods-price .old-price {
	font-size: 23upx;
}

.goods-info .goods-btn button {
	width: 244upx;
	height: 50upx;
	background-color: #ffd100;
	border-radius: 100upx;
	font-size: 21upx;
}

.s-local { 
	line-height: 46upx;
	font-size: 26upx;
	height: 46upx;
	margin: 15upx;
	padding: 0 15upx;
	border-radius: 10upx;
	background: #ddd;
	
}

.zhan {
	clear: both;
}
</style>
