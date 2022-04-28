<template>
	<view>
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
									<view @click="handleDL(item)" class="padding-sm u-border-bottom">
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
		
	</view>
</template>

<script>
	export default {
		name:"tab-custom",
		data() {
			return {
				tabArr:[
					{name:'分类',bcid:'',target:''},
					{name:'蛋糕',bcid:'1',target:'/pages/cake/cake'},
					{name:'面包',bcid:'11',target:'/pages/cake/cake'},
					{name:'小食',bcid:'6',target:'/pages/cake/cake'},
					{name:'购物车',bcid:'',target:'/pages/cart/cart'}
				],
				show:false,
				//分类列表
				cfylist:[],
				listShow:false,
				sceneShow:false
			}
		},
		created() {
			// 侧边分类数据获取
			this.$get('/1.1/classes/classify').then(res=>{
				console.log(res);
				this.cfylist = res.results
			})
		},
		methods:{
			handleTab(item){
					let {bcid,target} = item
					if(bcid){
						this.glist = []
						this.page = 0
						// this.condition.bcid = Number(bcid)
						this.$store.commit('changeCondition',{
							bcid:Number(bcid)
						})
						uni.navigateTo({
							url:target
						})
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
					uni.navigateTo({
						url:'/pages/cake/cake'
					})
				},
				//场景筛选
				handleScene({bid,tid}){
					this.$store.commit('changeCondition',{
						bcid:bid,
						sid:tid
					})
					uni.navigateTo({
						url:'/pages/cake/cake'
					})
				},
				handleDL({bid}){
					this.$store.commit('changeCondition',{
						bcid:bid,
					})
					uni.navigateTo({
						url:'/pages/cake/cake'
					})
				}
		}
	}
</script>

<style lang="scss">
.pop-cont{
	width:400upx ;
	margin-top: 200upx;
}
</style>
