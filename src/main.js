import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import 'common/SvgIcon'
//  生产打包的时候 element-ui 如果用cdn 把这里动态加载关闭 同时要把动态的babelrc 也要注释 防止打包进去
// import './use';

import '@/assets/styles/normalize.less'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
