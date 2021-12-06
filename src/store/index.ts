import { createStore } from 'vuex'
import herolist from './modules/herolist'
import menu from './modules/menu'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    herolist,
    menu
  },
  strict: debug
})
