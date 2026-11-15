<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleYandexLogin = () => {
  // Читаем переменные из .env файла
  const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID
  const redirectUri = encodeURIComponent(import.meta.env.VITE_YANDEX_REDIRECT_URI)

  if (!clientId) {
    console.error('VITE_YANDEX_CLIENT_ID не найден в переменных окружения!')
    return
  }

  if (!redirectUri) {
    console.error('VITE_YANDEX_REDIRECT_URI не найден в переменных окружения!')
    return
  }

  // Корректный URL для авторизации Яндекс
  window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
}

// Авторизация через другие провайдеры (VK, Telegram)
function socialLogin(provider) {
  console.log(`OAuth via ${provider}`)
  // Здесь редирект на бэкенд: window.location.href = `/auth/${provider}`
}
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900"
  >
    <!-- Декоративное фоновое свечение -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-150 h-150 bg-amber-900/5 rounded-full blur-[100px] pointer-events-none"
    ></div>

    <!-- Кнопка "На главную" -->
    <button
      @click="router.push('/')"
      class="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors duration-300 z-20"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
      На главную
    </button>

    <!-- Основная карточка входа -->
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 sm:p-10 space-y-8 relative z-10"
    >
      <!-- Заголовок -->
      <div class="text-center space-y-3">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600 text-white mb-2"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-600 uppercase tracking-tight">Вход</h1>
        <p class="text-slate-500 text-sm leading-relaxed">
          Войдите через удобный для вас сервис — это быстро и безопасно.
        </p>
      </div>

      <!-- Кнопки OAuth-провайдеров -->
      <div class="space-y-3">
        <!-- Яндекс ID -->
        <button
          type="button"
          @click="handleYandexLogin"
          class="w-full flex items-center gap-4 py-4 px-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#FC3F1D] hover:bg-[#FC3F1D]/5 transition-all duration-300 group"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-lg bg-[#FC3F1D] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-110 transition-transform"
          >
            Я
          </div>
          <div class="flex flex-col items-start flex-1">
            <span class="text-base font-black leading-tight">Яндекс ID</span>
            <span class="text-xs font-medium text-slate-400 leading-tight mt-0.5">
              Войти через аккаунт Яндекса
            </span>
          </div>
          <svg
            class="w-5 h-5 text-slate-300 group-hover:text-[#FC3F1D] group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        <!-- ВКонтакте -->
        <button
          type="button"
          @click="socialLogin('vk')"
          class="w-full flex items-center gap-4 py-4 px-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#0077FF] hover:bg-[#0077FF]/5 transition-all duration-300 group"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-lg bg-[#0077FF] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.79 16.14c-5.08 0-8.04-3.48-8.16-9.27h2.56c.08 4.24 1.96 6.04 3.45 6.42V6.87h2.41v3.66c1.47-.16 3.01-1.85 3.53-3.66h2.41a7.4 7.4 0 01-2.86 4.63 7.7 7.7 0 013.18 4.64h-2.65c-.47-1.47-1.65-2.61-3.61-2.77v2.77h-.26z"
              />
            </svg>
          </div>
          <div class="flex flex-col items-start flex-1">
            <span class="text-base font-black leading-tight">ВКонтакте</span>
            <span class="text-xs font-medium text-slate-400 leading-tight mt-0.5">
              Войти через аккаунт VK
            </span>
          </div>
          <svg
            class="w-5 h-5 text-slate-300 group-hover:text-[#0077FF] group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        <!-- Telegram -->
        <button
          type="button"
          @click="socialLogin('telegram')"
          class="w-full flex items-center gap-4 py-4 px-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#229ED9] hover:bg-[#229ED9]/5 transition-all duration-300 group"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-lg bg-[#229ED9] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21.94 4.66 2.92 12.14c-1.1.43-1.09 1.64-.01 2.01l4.85 1.51 1.13 3.5c.18.5.46.62.83.63.37.01.54-.17.77-.37l2.32-2.26 4.82 3.56c.89.49 1.53.24 1.75-.82l3.16-14.9c.32-1.3-.5-1.9-1.64-1.34zM9.08 14.3l8.4-5.3c.38-.24.72-.11.44.14l-7.2 6.51-.3 2.85-1.34-4.2z"
              />
            </svg>
          </div>
          <div class="flex flex-col items-start flex-1">
            <span class="text-base font-black leading-tight">Telegram</span>
            <span class="text-xs font-medium text-slate-400 leading-tight mt-0.5">
              Войти через Telegram
            </span>
          </div>
          <svg
            class="w-5 h-5 text-slate-300 group-hover:text-[#229ED9] group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Подсказка о безопасности -->
      <div
        class="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 leading-relaxed"
      >
        <svg
          class="w-5 h-5 shrink-0 text-slate-400 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
        <p>
          Мы используем безопасную авторизацию через выбранный сервис. Ваш пароль нигде не хранится
          — вход происходит по защищённому протоколу OAuth.
        </p>
      </div>
    </div>
  </div>
</template>
