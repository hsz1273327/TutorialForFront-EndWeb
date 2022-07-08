import Vue from 'nativescript-vue'
import Home from './views/Home.vue'
import { Init,Close } from './models/Flick'

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

new Vue({
  render: (h) => h('frame', [h(Home)]),
  created: function () {
    Init()
  },
  beforeDestroy: function (){
    Close()
  }
}).$start()
