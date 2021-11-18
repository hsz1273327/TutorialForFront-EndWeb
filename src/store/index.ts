import { createStore } from 'vuex'
import herolist from './modules/herolist'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    herolist
  },
  strict: debug
})
