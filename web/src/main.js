import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import '../src/assets/reset.scss'

import 'element-ui/lib/theme-chalk/index.css';
import { router } from './router'
import axios from 'axios'
//引入 swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import convertDate from './utils/common'
Vue.use(VueAwesomeSwiper)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };


Vue.config.productionTip = false
Vue.use(VueRouter)
// 全局过滤器
Vue.filter('convertDate', convertDate)

const instance = axios.create({
  baseURL: 'http://localhost:3000/web/api/'
});

Vue.prototype.$http = instance

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
