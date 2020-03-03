import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import '../src/assets/reset.scss'
import { router } from './router'

//引入 swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.use(VueRouter)



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
