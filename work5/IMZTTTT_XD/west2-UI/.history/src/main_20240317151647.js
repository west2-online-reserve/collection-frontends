import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import West2Ui from '@west2ui/components'
import '@west2ui/theme/index.scss'

const app = createApp(App)
app.use(West2Ui)
app.mount('#app')
