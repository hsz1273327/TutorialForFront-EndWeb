import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import HeroList from '../views/HeroList.vue'
import NewHero from '../views/NewHero.vue'
import HeroDetail from '../views/HeroDetail.vue'
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
  },
  {
    path: '/newhero',
    name: 'NewHero',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NewHero
  },
  {
    path: '/herodetail/:id',
    name: 'HeroDetail',
    props: route => ({ id: Number(route.params.id) }),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HeroDetail
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

