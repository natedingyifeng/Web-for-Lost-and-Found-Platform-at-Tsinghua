import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import Moment from 'moment'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://xyh.iterator-traits.com/api/v1/'

Vue.use(elementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(process.env.VUE_APP_URL);