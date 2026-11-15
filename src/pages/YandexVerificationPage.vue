<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  // Получаем код из query-параметров URL (например, ?code=12345)
  const code = route.query.code

  if (!code) {
    error.value = 'Отсутствует код авторизации. Пожалуйста, попробуйте войти снова.'
    isLoading.value = false
    return
  }

  try {
    const response = await fetch('/backend/api/auth/yandex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Критически важно для записи HttpOnly куки с Refresh-токеном
      body: JSON.stringify({ code }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.message || 'Ошибка сервера при проверке данных')
    }

    const data = await response.json()

    console.log(data)

    // 1. Сохраняем accessToken (если бэкенд возвращает его в теле ответа)
    // Если у тебя используется Pinia/Vuex, лучше сохранить токен туда:
    // useAuthStore().setToken(data.accessToken)
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken)
    }

    // 2. Маршрутизация в зависимости от статуса пользователя
    if (data.status === 'ONBOARDING') {
      // Пользователь новый, нужно заполнить профиль
      router.replace('/complete-profile')
    } else if (data.status === 'ACTIVE') {
      // Пользователь уже зарегистрирован, ведём в личный кабинет / к урокам
      router.replace('/lessons')
    } else {
      throw new Error('Неизвестный статус аккаунта')
    }
  } catch (err) {
    console.error('Yandex Auth Error:', err)
    error.value = err.message || 'Не удалось выполнить вход через Яндекс ID'
    isLoading.value = false
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden font-sans text-slate-900"
  >
    <!-- Декоративное фоновое свечение (как на странице входа) -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none"
    ></div>

    <!-- Основная карточка -->
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 sm:p-10 text-center relative z-10"
    >
      <!-- Состояние загрузки -->
      <div v-if="isLoading" class="space-y-6">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 text-amber-600"
        >
          <svg class="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight mb-2">
            Проверка данных
          </h2>
          <p class="text-slate-500 text-sm leading-relaxed">
            Завершаем вход через Яндекс ID. Пожалуйста, подождите...
          </p>
        </div>
      </div>

      <!-- Состояние ошибки -->
      <div v-else-if="error" class="space-y-6">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight mb-2">
            Ошибка входа
          </h2>
          <p class="text-slate-500 text-sm leading-relaxed mb-6">
            {{ error }}
          </p>
          <button
            @click="router.push('/signin')"
            class="w-full py-3.5 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 uppercase tracking-wide text-sm"
          >
            Вернуться ко входу
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
