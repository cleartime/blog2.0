import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from 'router'
import './dome.styl'

Vue.use(VueRouter)


export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app');