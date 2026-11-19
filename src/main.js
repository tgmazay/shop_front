import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

// Импортируем наш единственный файл стилей Tailwind v4
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Восстанавливаем сессию до установки роутера: тогда guard'ы и шапка
// сразу видят актуальный статус авторизации и не мигают «гостем»
const auth = useAuthStore(pinia)

auth.restoreSession().finally(() => {
  app.use(router)
  app.mount('#app')
})
