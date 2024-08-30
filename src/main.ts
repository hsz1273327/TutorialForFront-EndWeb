// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import installEcharts from './plugins/echarts'

const app = createApp(App)
installEcharts(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
