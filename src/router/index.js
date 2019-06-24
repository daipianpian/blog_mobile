import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index' // 首页
import article from '@/pages/Article/Article.vue' // 文章详情

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/',
	routes: [
		{ path: '/', name: 'Index', component: Index,
      meta: {
        keepAlive: true
      }
    },
    { path: '/article', name: 'article', component: article,
      meta: {
        keepAlive: false
      }}
	]
})