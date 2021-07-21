import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import VueLazyload from "vue-lazyload";
import store from "@/store";

import fastClick from 'fastclick'

import toast from "components/common/toast";

Vue.use(VueLazyload, {
  loading: require('assets/images/loading/loading.gif')
})

Vue.config.productionTip = false

//解决移动端300ms延迟
fastClick.attach(document.body)

//原型加上 $bus 事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  fastClick,
  store
}).$mount('#app')
