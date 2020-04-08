import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store'
import './plugins/element.js'
import './styles/reset.css'

Vue.prototype.$moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
