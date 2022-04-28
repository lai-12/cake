<template>
	<view>
		<view @click="handleAddress" class="padding flex align-center justify-between">
			<view class="" v-if="orderAddress">
				{{orderAddress.username}}  {{orderAddress.phone}}
				<view class="">
					{{orderAddress.city}}
					{{orderAddress.region}}
					{{orderAddress.detail}}
				</view>
			</view>
			<view class="" v-else>
				请选择地址
			</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="padding">
			配送时间: {{datevalues}} -- {{timevalues}}
		</view>
		<view class="flex justify-between padding">
			<view class="" @click="showCalendar()">
				请选择配送日期
				<u-calendar :show="showdate" :mode="mode" @confirm="confirmdate" @close="close" defaultDate="2022-02-15"></u-calendar>
			</view>
			<view class="" @click="showDatetimePicker()">
				请选择配送时间
				<u-datetime-picker :show="showtime" mode="time" @confirm="confirmtime" @cancel="canceltime"></u-datetime-picker>
			</view>
		</view>
		
		<view class="flex padding" v-for="(item,index) in cartList" v-if="item.ischeck==true">
			<view class="flex align-center">
			<image class="poster margin-right" :src="item.img"></image>
			</view>
			<view class="flex justify-between info">
				<view class="">
					{{item.name}}
					<view class="margin-tb-xs">{{item.french}}</view>
					￥{{item.list[item.idx].price}}
				</view>
				<view class="flex flex-direction align-end">
					<view class="edit margin-bottom-xs">
						<text class="iconfont icon-bianji"></text>
					</view>
					{{item.list[item.idx].spec}} X {{item.num}}
				</view>
			</view>
		</view>
		
		
		<view class="fixed padding flex justify-between">
			<view class="padding-xs margin-left">
				共计：${{allInfo.allPrice}}
			</view>
			<button class="cu-btn bg-brown">立即支付</button>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex'
	export default {
		data() {
			return {
				showdate:false,
				showtime:false,
				mode:'single',
				datevalues:[''],
				timevalues:['']
			}
		},
		computed:{
			...mapGetters({
				'orderAddress':'address/orderAddress',
				 allInfo:'cart/allInfo'
			}),
			...mapState({
				cartList:state=>state.cart.cartList
			})
		},
		methods: {
			handleAddress(){
				uni.navigateTo({
					url:'../address/address'
				})
			},
			//日历确认回调
			confirmdate(res){
				// console.log(res);
				this.showdate=false
				this.datevalues = res[0]
			},
			//关闭日历回调
			close() {
				this.showdate = false
			},
			//点击配送日期显示日历
			showCalendar(){
				this.showdate = true
			},
			showDatetimePicker(){
				this.showtime = true
			},
			//关闭DatetimePicker选择器
			canceltime(){
				this.showtime = false
			},
			//DatetimePicker选择器 确认回调
			confirmtime(e){
				this.showtime = false
				this.timevalues = e.value
				// console.log(e);	
			}
		}
	}
</script>

<style lang="scss">
page{
	padding-bottom: 100upx;
}
.poster{
	width: 180upx;
	height: 180upx;
	background-color: #d8d8d8;
}
.info{
	width: 60%;
	.edit{
		width: 80upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background-color: #e6e6e6;
		border-radius: 50%;
		
	}
}
.flex.align-end{
	min-width: 210upx;
}
.icon-gouxuan{
	color: #e7e7e7;
}
.cu-btn.lg{
	width:50%;
	border-radius: 0;
}
</style>
