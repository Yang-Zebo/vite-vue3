import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// element plus 自动引入组件的插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path' // 这里使用了 @types/node 包
export default defineConfig({
  plugins: [
    vue(),
    // 配置 element plus 自动引入组件的插件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    // 配置路径别名 与 jsconfig.json 里的 baseUrl 与 paths 配合使用
    alias: {
      '@': path.resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 配置全局的 scss 样式
        additionalData: '@use "./src/styles/variables.scss" as *;'
      }
    }
  }
})
