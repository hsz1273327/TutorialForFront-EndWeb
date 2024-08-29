import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import HeroList from '../views/HeroList.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: DashBoard
  },
  {
    path: '/herolist',
    name: 'Herolist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HeroList
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

