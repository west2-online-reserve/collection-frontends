// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入App根组件
import App from '../App.vue'
// 引入路由器
import router from './router';
// 引入pinia
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


// 创建一个应用
const app = createApp(App)
// 使用路由器
app.use(router)
// 创建pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 安装pinia
app.use(pinia)

// 挂载整个应用到app容器中
app.mount('#app')


