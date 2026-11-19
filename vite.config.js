import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // Подключаем плагин Tailwind v4

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // Внедряем Tailwind в цепочку сборки Vite
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // Важно: открывает сервер Vite наружу из контейнера во внешнюю Wi-Fi сеть
    port: 5173,
    watch: {
      usePolling: true, // Гарантирует работу автообновления страниц (HMR) внутри Docker на Windows
    },
    proxy: {
      // Бэкенд уже отдаёт API по /api, поэтому путь не переписываем:
      // Path=/api/auth у refresh-cookie должен совпадать с адресом запроса.
      '/api': {
        target: 'http://192.168.1.124:8000', // Ваш Go-сервер
        changeOrigin: true,
      },
      // Каталог уроков на бэкенде — /lessons. В dev он идёт через /backend,
      // чтобы не конфликтовать с одноимённым фронтенд-маршрутом /lessons.
      '/backend': {
        target: 'http://192.168.1.124:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
  },
})
