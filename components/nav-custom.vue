<template>
	<view>
		<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-locationfill text-gray"></text> 首页
						</view>
						<view class="content text-bold">
							MCAKE
						</view>
						<view class="action">
							<text class="cuIcon-search text-grey"></text>
							<u-line direction="col" length="15" margin="20upx"></u-line>
							<text class="cuIcon-sort text-grey"></text>
						</view>
					</view>
	</view>
</template>

<script>
	export default {
		name:"nav-custom",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.cu-bar{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 2;
}
</style>
