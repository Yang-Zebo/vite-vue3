import { createApp } from 'vue'
import './style.css'
// 引入全局 SCSS 样式
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
// 引入蓝鸟 Promise 库
import '@/utils/externalPlugin/bluebird.js'

createApp(App)
.use(router)
.mount('#app')