import { createApp } from 'vue'
import App from './App.vue'
import { MyVuePlugin } from "myvueplugin"

createApp(App).use(MyVuePlugin, { withComponents: true }).mount('#app')
