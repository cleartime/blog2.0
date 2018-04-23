import VueRouter from 'vue-router'
import Foo from 'views/main'

const routes = [
  { path: '/foo', component: Foo },
]



export default new VueRouter({
	mode: 'history',
    routes
})