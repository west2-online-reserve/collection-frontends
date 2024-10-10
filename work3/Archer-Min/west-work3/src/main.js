// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { pinia } from './stores';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount('#app');
