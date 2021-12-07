import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Dashboard
  },
  {
    path: '/herolist',
    name: 'HeroList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HeroList.vue')
  },
  {
    path: '/newhero',
    name: 'NewHero',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewHero.vue')
  },
  {
    path: '/herodetail/:id',
    name: 'HeroDetail',
    props: route => ({ id: Number(route.params.id)}),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HeroDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
