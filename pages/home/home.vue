<template>
	<scroll-view class="scroll-cont" scroll-y="true" @scroll="handleScroll" :scroll-into-view="topItem" scroll-with-animation>
		<view>
			<view id="top"></view>
				<!-- 导航栏 -->
				<nav-custom></nav-custom>
				
				<!-- 轮播图 -->
				<swiper class="banner" :indicator-dots="true" :autoplay="true" indicator-active-color="#ffe32a">
					<swiper-item v-for="(item,index) in banner" :key="item.objectId"  @click="handleBanner(item.link)">
						<view class="swiper-item">
							<image :src="item.img"></image>
						</view>
					</swiper-item>
				</swiper>
				
				<!-- 标题栏 -->
				<home-title  title="本季推荐" en-title="Seasonal Recommend" en-tit="Seasonal"></home-title>
				
				<!-- scroll-view 滚动 -->
				<scroll-view scroll-x="true" >
					<view class="scroll-inner">
						<image src="../../static/img/recommend1.jpeg" mode="heightFix"></image>
						<image src="../../static/img/recommend2.jpg" mode="heightFix"></image>
						<image src="../../static/img/recommend3.jpg" mode="heightFix"></image>
						
					</view>
				</scroll-view>
				
				<home-title  title="法式经典" en-title="French Classics" en-tit="French"></home-title>
				
				<image class="classify" src="../../static/img/french.jpg"></image>
				
				<!-- 商品列表 -->
				<!-- <view class="flex flex-wrap padding-sm justify-between">
					<good-item v-for="(item,index) in 4"></good-item>
				</view> -->
				
				<!-- 返回顶部 -->
				<view class="back-top" v-if="isShow" @click="handleBackTop">
					<text class="iconfont icon-tubiao_fanhuidingbu"></text>
				</view>
				
			</view>
		<tab-custom></tab-custom>
	</scroll-view>
</template>

<script>
	import {$http} from '../../utils/request.js'
	export default {
		data() {
			return {
				isShow:false,
				topItem:'',
				banner:[]
			}
		},
		methods: {
			//判断是否显示返回顶部按钮
			handleScroll(ev){
				// console.log(event);
				let {scrollTop} = ev.detail
				if(scrollTop>500){
					this.isShow = true
				}else{
					this.isShow = false
				}
				this.topItem = ''
			},
			//返回顶部函数回调
			handleBackTop(){
				this.topItem = 'top'
			},
			handleBanner(link){
				uni.navigateTo({
					url:`./banner-ad?link=${link}`
				})
			}
		},
		onLoad() {
			//方法1
			// uni.request({
			// 	url:'https://api2105.h5project.cn/1.1/classes/classify',
			// 	method:'GET',
			// 	header:{
			// 		"X-LC-Id": "7yoqQxyLBNN9MW5rsgTGXbHL-gzGzoHsz",
			// 		"X-LC-Key": "hA8yGYuHjnXWRui1rzTe0C3P",
			// 		"Content-Type": "application/json"
			// 	},
			// 	success: (res) => {
			// 		console.log(res);
			// 	}
			// })
			
			//方法2
			// $http('/1.1/classes/classify').then(res=>{
			// 	console.log(res);
			// })
			
			//方法3
			this.$get('/1.1/classes/banner').then(res=>{
				console.log(res);
				this.banner = res.results
			})
		}
	}
</script>

<style lang="scss">
.banner{
	height: 1000upx;
	swiper-item{
		height: 1000upx;
	}
	image{
		width: 100%;
		height: 1000upx;
	}
}
.scroll-inner{
	white-space: nowrap;
	image{
		height: 290upx;
		
	}
}
.classify{
	height: 380upx;
	width: 100%;
}
.back-top{
	height: 100upx;
	width: 100upx;
	background-color: #fff;
	border-radius: 50%;
	box-shadow: 0 0 0upx 4upx rgba(0,0,0,0.4);
	position: fixed;
	bottom: 20upx;
	right: 20upx;
	text-align: center;
	line-height: 100upx;
	}
	.scroll-cont{
		height: 100vh;
	}
</style>
