import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
  		path: '/',
  		redirect: '/login'
  	},
  	{
  		path: '/home',
  		component: resolve => require(['@/components/Home.vue'], resolve),
  		children:[
		  	{
		  		path: '/',
  				redirect: '/todayData'
		  	},
		  	{
		  		path: '/todayData',
		  		component: resolve => require(['@/components/TodayData.vue'], resolve)
		  	},
		  	{
		  		path: '/historyData',
		  		component: resolve => require(['@/components/HistoryData.vue'], resolve)
		  	},
  		]
  	},
    {
        path: '/login',
        component: resolve => require(['@/components/Login.vue'], resolve)
    }
  ],
  linkActiveClass: 'active',
	scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})
