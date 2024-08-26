import { createApp } from 'vue'
import App from './App.vue'
import myvueplugin from "myvueplugin"

createApp(App).use(myvueplugin, { withComponents: true }).mount('#app')
