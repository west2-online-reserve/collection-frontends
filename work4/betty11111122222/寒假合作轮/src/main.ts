//引入createApp用于创建应用
import {createApp} from 'vue'
//引入App根组件
import App from './App.vue'
import PrimeVue from 'primevue/config'// @ts-expect-error
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'// @ts-expect-error
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'// @ts-expect-error

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
import router from './router'



const app=createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(VueMarkdownEditor)
app.mount('#app')
