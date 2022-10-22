import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
console.log(resolve(__dirname, 'src/components'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        // 这里新增一个配置
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  },
  resolve: {
    alias: [{
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: 'components',
        replacement: resolve(__dirname, 'src/components')
      }
    ],
  },
})
