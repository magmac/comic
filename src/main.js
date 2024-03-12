import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
// import VConsole from 'vconsole'
// const { PROD } = import.meta.env

createApp(App).use(ElementPlus).use(store).use(router).use(VueAxios, axios).mount('#app')

// if (!PROD) {
//   new VConsole({ theme: 'dark' })
// }
