import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

import West2Ui from '@west2ui/components'
import '@west2ui/theme/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.use(ElementPlus)
    app.use(West2Ui)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
