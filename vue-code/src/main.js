// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible/flexible'
import Juqery from 'jquery'
import Menu from '@/components/common/Menu'

Vue.prototype.$Juqery = Juqery
Vue.prototype.$http = 'http://localhost:8090/sy_franchiser/'

Vue.use(ElementUI, { size: 'small' })
Vue.component('v-menu', Menu)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})