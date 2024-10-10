import { defineConfig } from 'vitepress'
// 加入插件
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Ui Library',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/examples/input' }
    ],

    sidebar: [
      {
        text: '组件',
        items: [
          { text: 'Input 输入框', link: '/examples/input' },
          { text: 'Button 按钮', link: '/examples/button' },
          { text: 'Dialog 对话框', link: '/examples/dialog' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  // 加入插件
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    }
  },
  // 加入插件
  vite: {
    plugins: [demoblockVitePlugin()]
  }
})
