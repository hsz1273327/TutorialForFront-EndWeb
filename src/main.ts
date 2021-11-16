import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import installEcharts from './plugins/echarts'
// import installElementPlus from './plugins/element'

const app = createApp(App)
// installElementPlus(app)
installEcharts(app)
app.use(store).use(router).mount('#app')