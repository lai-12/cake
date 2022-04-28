<template>
	<view>
		<!-- 顶部导航栏 -->
		<nav-custom></nav-custom>
		<!-- 商品列表 -->
		<view class="cont">
			<good-item v-for="(item,index) in glist" :gdata="item"></good-item>
		</view>
		<!-- 底部导航栏 -->
			<view class="fixed flex bg-fff justify-center padding-sm">
				<view class="flex align-center justify-around" v-for="(item,index) in tabArr" :key="index" @click="handleTab(item)">
					<view>{{item.name}}</view>
					<u-line v-if="index<tabArr.length-1" direction="col" length="15" margin="30upx"></u-line>
				</view>
			</view>
			<!-- 侧边分类 -->
			<u-popup :show="show" :round="10" mode="left" @close="handleclose">
					<view class="pop-cont">
			            <view v-for="(item,index) in cfylist.slice(0,4)">
							<view class="padding-sm u-border-bottom">
								{{item.bname}}
								<view class="cu-tag round bg-yellow color-fff margin-left-xs">
									{{item.num}}
								</view>
							</view>
							<view v-if="index==0"> 
								<view @click="listShow=!listShow" class="padding-sm" :class="{'u-border-bottom':!listShow}">
									口味筛选
								</view>
								<u-cell-group v-if="listShow">
									<u-cell  v-for="(itm,index) in item.list" :title="itm.tname" isLink @click="handleList(itm)"></u-cell>
								</u-cell-group>
								<view @click="sceneShow=!sceneShow" class="padding-sm" :class="{'u-border-bottom':!sceneShow}">
									场景筛选
								</view>
								<u-cell-group v-if="sceneShow">
									<u-cell  v-for="(itm,index) in item.scene" :title="itm.tname" isLink @click="handleScene(itm)"></u-cell>
								</u-cell-group>
							</view>
						</view>
					 </view>
				</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				glist:[],
				page:0,
				tabArr:[
					{name:'分类',bcid:'',target:''},
					{name:'蛋糕',bcid:'1',target:'/pages/cake/cake'},
					{name:'面包',bcid:'11',target:'/pages/cake/cake'},
					{name:'小食',bcid:'6',target:'/pages/cake/cake'},
					{name:'购物车',bcid:'',target:'/pages/cart/cart'}
				],
				// bcid:1,
				// condition:{
				// 	bcid:1
				// },
				show:false,
				//分类列表
				cfylist:[],
				listShow:false,
				sceneShow:false
			}
		},
		computed:{
			condition(){
				return this.$store.state.condition.cond
			}
		},
		onLoad() {
			this.loadData()
			// 侧边分类数据获取
			this.$get('/1.1/classes/classify').then(res=>{
				console.log(res);
				this.cfylist = res.results
			})
		},
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {
			this.glist = []
			this.page =0
			this.loadData()
		},
		methods: {
			//跳转到详细页面
			handleDetail(idx){
				uni.navigateTo({
					url:'../detail/detail?idx='+idx
				})
			},
			//取数据
			loadData(){
				let skip = this.page * 8
				let wh = JSON.stringify(this.condition)
				let url =`/1.1/classes/goods?where=${wh}&limit=8&skip=${skip}`
				this.$get(url).then(res=>{
					uni.stopPullDownRefresh()
					let {results} = res
					if(results.length){
						this.page++
						this.glist = [
							...this.glist,
							...res.results
						]
						return
					}
					uni.showToast({
						title:'确实美有了',
						icon:'none'
					})
				})
			},
			//刷新页面数据
			reloadData(){
				this.glist = []
				this.page = 0
				this.loadData()
			},
			//侧边栏点击回调
			handleTab(item){
				let {bcid,target} = item
				if(bcid){
					this.glist = []
					this.page = 0
					// this.condition.bcid = Number(bcid)
					this.$store.commit('changeCondition',{
						bcid:Number(bcid)
					})
					this.loadData()
				}
				//侧边分类显示
				if(!bcid&&!target){
					this.show = true
				}
				if(!bcid&&target){
					uni.navigateTo({
						url:target
					})
				}
			},
			handleclose(){
				this.show = false
			},
			//口味筛选
			handleList({bid,tid}){
				this.$store.commit('changeCondition',{
					bcid:bid,
					fid:tid
				})
				this.reloadData()
			},
			//场景筛选
			handleScene({bid,tid}){
				this.$store.commit('changeCondition',{
					bcid:bid,
					sid:tid
				})
				this.reloadData()
			}
		}
	}
</script>

<style lang="scss">
page{
	padding-bottom: 100upx 0 120upx;
}	
.cont{
	display: flex;
	flex-wrap: wrap;
	padding: 15upx;
	justify-content: space-between;
}
.cake-item{
	width: 350upx;
	.poster{
		height: 350upx;
		background-color: #f5f5f5;
	}
	.fs-28{
		margin-top: 24upx;
	}
	.fs-16{
		margin: 14upx 0;
	}
	.fs-18{
		margin-bottom: 22upx ;
	}
}
.fixed{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	box-shadow: 0 0 10upx 2upx rgba(0,0,0,0.2);
}
.pop-cont{
	width:400upx ;
	margin-top: 200upx;
}
</style>
