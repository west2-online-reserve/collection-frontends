import './assets/main.css'
import ElementPlus from 'element-plus'//导入element-plus
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'//导入element-plus的样式
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from './stores/user'

const app = createApp(App);
const store=createPinia();
store.use(piniaPluginPersistedstate);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
};

app.use(router)
    .use(store)
    .mount('#app')
