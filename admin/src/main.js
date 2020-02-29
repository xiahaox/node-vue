import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import VueRouter from 'vue-router'
import { AxiosInstance } from './axios'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(Element, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.prototype.$http = AxiosInstance

// 复合使用
Vue.mixin({
  created() {
  },
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + 'upload'
    }
  },
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
