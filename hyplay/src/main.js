import Vue from 'vue'
import App from './App.vue'
import router from './route/index'
//路由插件
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementui)
//element-ui插件

import axios from 'axios'
axios.defaults.baseURL='https://autumnfish.cn/'
Vue.prototype.$axios=axios
//配置为全局axios对象

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
