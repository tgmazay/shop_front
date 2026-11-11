import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // Подключаем плагин Tailwind v4

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss() // Внедряем Tailwind в цепочку сборки Vite
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // Важно: открывает сервер Vite наружу из контейнера во внешнюю Wi-Fi сеть
    port: 5173,
    watch: {
      usePolling: true // Гарантирует работу автообновления страниц (HMR) внутри Docker на Windows
    }
  }
})
