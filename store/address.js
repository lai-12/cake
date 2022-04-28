import {$post,$get} from '../utils/request.js';
export default {
	namespaced:true,
	state(){
	
		return{
			checkdIdx:-1,  //记录用户勾选的地址
			addressList:[]
		}
	},
	getters:{
		 //订单中的地址
		orderAddress(state){ 
		    //根据checkedIdx 与 isdefault 共同得到一个地址对象
			let {checkdIdx,addressList} = state
			if(checkdIdx!==-1){
				return addressList[checkdIdx]
			}
			let len = addressList.length
			for(let i=0;i<len;i++){
				if(addressList[i].isdefault){
					return addressList[i]
				}
			}
		}
	},
	mutations:{
		//根据默认地址，设置勾选地址的下标
		initCheckIdxMut(state){ 
			state.addressList.forEach((item,i)=>{
				if(item.isdefault){
					state.checkedIdx = i
				}
			})
		},
		
		//设置为默认地址
		AddressDefaultMut(state,idx){
			state.addressList.forEach((item,i) =>{
				if(i==idx){
					item.isdefault = true
				}else{
					item.isdefault = false
				}
			})
		},
		//选取新地址
		addressCheckMut(state,idx){
			state.checkdIdx = idx
			uni.navigateBack()({
				delta:1
			})
		},
		//新增地址
		addressAddMut(state,addressObj){
			state.addressList.push(addressObj)
		},
		//初始化地址列表
		addressInitMut(state,addressArr){
			state.addressList = addressArr
		}
	},
	actions:{
		//新增地址
		addressAddAct(context,addressObj){
			$post('/1.1/classes/address',addressObj).then(({objectId})=>{
				context.commit('addressAddMut',{
					...addressObj,
					objectId
				})
				uni.navigateBack({
					delta:1
				})
			})
		},
		//初始化地址列表
		addressInitAct(context,userid){
			let url = `/1.1/classes/address?where={"userid":"${userid}"}`
			$get(url).then(({results})=>{
				// console.log(results);
				context.commit('addressInitMut',results)
			})
		}
	}
}