import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// wewbpackChunkName
// · 使用到了路由页面，再去请求他
// 懒加载的chunk默认的名字是模块的路径
// webpack魔法注释：/*webpackChunkName:"新名字”*/
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:'base' */ '@/views/video')
      },
      {
        path: '/wenda',
        component: () => import(/* webpackChunkName:'base' */ '@/views/qa')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:'Search' */ '@/views/Search')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName:'User' */ '@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
