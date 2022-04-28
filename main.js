import App from './App'
import store from 'store/index.js'
import Vue from 'vue'
//引入uview组件
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

//挂载全局组件
import NavCustom from './components/nav-custom.vue'
Vue.component('nav-custom',NavCustom)
import HomeTitle from './components/home-title.vue'
Vue.component('home-title',HomeTitle)
import GoodItem from './components/good-item.vue'
Vue.component('good-item',GoodItem)
import TabCustom from './components/tab-custom.vue'
Vue.component('tab-custom',TabCustom)


//挂载全局异步请求方法
import * as request from 'utils/request.js'
for(let key in request){
	Vue.prototype[key] = request[key]
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
