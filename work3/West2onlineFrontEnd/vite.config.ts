// vite.config.ts
// import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

import VueSetUpExtend from 'vite-plugin-vue-setup-extend'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [  
    vue(),
    VueSetUpExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }) 
  ],
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "src"),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})  
