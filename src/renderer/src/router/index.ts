import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Main from '../pages/Main.vue'
import Sysinfo from '../pages/Sysinfo.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Main
  },
  {
    path: '/sysinfo',
    name: 'Sysinfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Sysinfo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
