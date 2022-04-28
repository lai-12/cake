export default {
	state(){
		return{
			cond:{
				bcid:1
			}
		}
	},
	mutations:{
		changeCondition(state,obj){
			state.cond = obj
		}
	}
}