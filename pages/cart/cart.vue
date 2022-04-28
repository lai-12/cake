<template>
	<view>
		<!-- 购物车主内容区域 -->
		<view class="flex padding" v-for="(item,index) in cartList" :key="item.id+'-'+item.idx">
			<view class="flex align-center">
				<text class="iconfont icon-gouxuan margin-right" 
				:class="item.ischeck?'color-yellow':''"
				@click="handleCheck(index)"></text>
				<image class="poster margin-right" :src="item.img"></image>
			</view>
			<view class="flex justify-between info">
				<view class="">
					{{item.name}}
					<view class="margin-tb-xs">{{item.french}}</view>
					{{item.list[item.idx].price}}
				</view>
				<view class="flex flex-direction align-end">
					<view @click="handleEdit(index)" class="edit margin-bottom-xs">
						<text class="iconfont icon-bianji"></text>
					</view>
					{{item.list[item.idx].spec}} X {{item.num}}
				</view>
			</view>
		</view>
		<!-- 编辑弹窗 -->
		<u-overlay :show="show" @click="show =false">
			<!-- click.stop 阻止冒泡  点击弹窗以外的区域关闭弹窗 -->
			<view class="bg-fff margin cover-cont" @click.stop>
				<view class="padding">
					<!-- 弹窗 渲染商品图片，信息 -->
					<view class="flex justify-between info">
						<image class="poster margin-right" ></image>
						<view class="">
							{{cartList[cartIdx].name}}
							<view class="margin-tb-xs">{{cartList[cartIdx].french}}</view>
							${{checkCartInfo.price}}
						</view>
					</view>
					<view class="flex justify-between padding-tb u-border-bottom">
						<view>规格选择</view>
						<view class="drop">
							<view @click="dropShow=true"> 
							  {{checkCartInfo.spec}} 
							  - 
							  {{checkCartInfo.edible}}
								<text class="iconfont icon-xiala"></text>
							</view>
							<!-- 下拉列表 -->
							<view class="drop-list bg-fff " v-if="dropShow">
								<view 
								v-for="(item,index) in cartList[cartIdx].list" 
								class="padding-sm"
								@click="handleDropList(index)">
									{{item.spec}} - {{item.edible}}
								</view>
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center padding-top ">
						<view>数量选择</view>
							<u-number-box button-size="26" @change="handleNum"></u-number-box>
					</view>
				</view>
				<view class="flex margin-top">
					<button @click="show=false" type="default" class="cu-btn lg bg-brown">取消</button>
					<button @click="handleOk" type="default" class="cu-btn lg bg-yellow">确认</button>	
				</view>
			</view>
		</u-overlay>
		<!-- 底部结算栏 -->
		<view class="fixed bg-fff flex">
			<view class="flex flex-sub padding align-center">
				<text class="iconfont icon-gouxuan margin-right-xs"
				:class="allInfo.allcheck?'color-yellow':''"
				@click="handleAllCheck(allInfo.allcheck)"></text>
				全选
				<view class="margin-left">
					共计：{{allInfo.allPrice}}
				</view>
			</view>
			<view @click="handleOrder" class="bg-yellow padding text-center color-fff">
				立即结算
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				show:false,
				dropShow:false,
				cartIdx:0,  //主商品序号
				dropIdx:0,  // 子商品序号
				num:1  //当前弹窗商品数量
			}
		},
		onLoad() {
			//判断是否存储了用户信息
			if(this.userInfo){
				return
			}
			//判断是否登录
			uni.showModal({
				title:'温馨提示',
				content:'您需要先登录',
				cancelText:'取消登录',
				confirmText:'立即登录',
				success: ({cancel}) => {
					if(cancel){
						uni.navigateBack({
							delta:1
						})
						return
					}
					uni.navigateTo({
						url:'../user/login'
					})
				}
			})
		},
		computed: {
			...mapState({
				cartList:state=>state.cart.cartList,
				userInfo:state=>state.user.userInfo	
			}),
			...mapGetters({
				allInfo:'cart/allInfo'
			}),
			//过滤下拉选择的商品对象
			checkCartInfo(){
				let {cartIdx,cartList,dropIdx} = this
				return cartList[cartIdx].list[dropIdx]
			}
		},
		methods: {
			...mapMutations({
				handleCheck:'cart/cartCheckMut',
				handleAllCheck:'cart/cartAllCheckMut'
			}),
			//编辑控制弹窗
			handleEdit(idx){
				this.cartIdx = idx
				this.dropIdx = this.cartList[idx].idx
				this.show = true
			},
			//子商品下拉列表
			handleDropList(dropIdx){
				this.dropShow =false
				this.dropIdx = dropIdx
			},
			//弹窗确认
			handleOk(){
				this.show =false
				let{cartIdx,dropIdx,num} = this
				this.$store.commit('cart/cartListCheckMut',{cartIdx,dropIdx,num})
			},
			handleNum({value}){
				this.num = value
			},
			handleOrder(){
				uni.navigateTo({
					url:'../order/order'
				})
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
.cover-cont{
	position: absolute;
	top:50%;
	left: 0;
	width: 690upx;
	transform: translateY(-50%);
}
.drop{
	position: relative;
	.drop-list{
		width:300upx;
		position: absolute;
		right: 0;
		top: 60upx;
		box-shadow: 0 0 10upx 2upx rgba(0,0,0,0.2);
		z-index: 10;
		view:hover{
			background-color: #e6e6e6;
		}
		}
}
</style>
