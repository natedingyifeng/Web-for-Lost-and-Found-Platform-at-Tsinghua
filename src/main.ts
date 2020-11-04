import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router/index.ts'
// import store from './store'
import axios from 'axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(elementUI)

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')