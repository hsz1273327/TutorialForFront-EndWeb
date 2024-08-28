import { createApp } from 'vue'
import App from './App.vue'
import { MyVuePlugin } from "myvueplugin"
import TestComponents from 'myvueplugin/components/TestComponents.vue'

const app = createApp(App)
// app.use(MyVuePlugin, { withComponents: true })
app.use(MyVuePlugin, { "TestComponents": TestComponents })
app.mount('#app')
