import { createApp } from 'vue'
import axios from 'axios'
import router from '../router';
import App from './App.vue'

import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
const pinia = createPinia()

app.use(pinia)
app.config.globalProperties.$axios = axios
app.mount('#app')
