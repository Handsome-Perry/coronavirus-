import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
=======
      '/api1': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, '') // 不可以省略rewrite
>>>>>>> 7862e3c (CORS)
      }
    }
  }
})
