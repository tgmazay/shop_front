<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)
const rememberMe = ref(true)

function handleSubmit() {
  if (!form.value.email || !form.value.password) {
    error.value = 'Введите email и пароль'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    error.value = 'Введите корректный адрес электронной почты'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Пароль должен быть не менее 6 символов'
    return
  }

  error.value = ''
  isLoading.value = true

  // Имитация запроса к API авторизации
  setTimeout(() => {
    console.log('Login data:', { ...form.value, rememberMe: rememberMe.value })
    isLoading.value = false
    // После успешного входа — в личный кабинет / клуб
    router.push('/lessons')
  }, 1200)
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

function socialLogin(provider) {
  console.log(`OAuth via ${provider}`)
  // Здесь редирект на бэкенд: /auth/vk, /auth/telegram и т.д.
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900">

    <!-- Декоративное фоновое свечение (как в Hero и на странице регистрации) -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-150 h-150 bg-amber-900/5 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Кнопка "На главную" -->
    <button
      @click="router.push('/')"
      class="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors duration-300 z-20"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      На главную
    </button>

    <!-- Основная карточка входа -->
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 sm:p-10 space-y-8 relative z-10">

      <!-- Заголовок -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600 text-white mb-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-600 uppercase tracking-tight">
          Вход
        </h1>
        <p class="text-slate-500 text-sm leading-relaxed">
          Рады видеть вас снова. Продолжайте там, где остановились.
        </p>
      </div>

      <!-- Форма -->
      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- Поле: Почта -->
        <div class="space-y-1.5">
          <label for="email" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Электронная почта
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="your@email.com"
            class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
          />
        </div>

        <!-- Поле: Пароль -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label for="password" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Пароль
            </label>
            <button
              type="button"
              @click="router.push('/forgotpassword')"
              class="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              Забыли пароль?
            </button>
          </div>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Ваш пароль"
              class="w-full px-4 py-3.5 pr-12 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Чекбокс: Запомнить меня -->
        <label class="flex items-center gap-3 cursor-pointer select-none group">
          <div class="relative shrink-0">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="peer sr-only"
            />
            <div class="w-5 h-5 rounded border-2 border-slate-300 bg-white transition-all duration-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 group-hover:border-slate-400"></div>
            <svg
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span class="text-sm text-slate-600 font-medium">Запомнить меня на этом устройстве</span>
        </label>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ error }}
        </div>

        <!-- Кнопка отправки -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm flex items-center justify-center gap-2"
        >
          <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Входим...' : 'Войти' }}
        </button>

      </form>

      <!-- Разделитель + соцсети -->
      <div class="space-y-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase tracking-widest">
            <span class="px-3 bg-white text-slate-400 font-bold">или через</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="socialLogin('vk')"
            class="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-slate-200 rounded-lg font-bold text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
          >
            <svg class="w-5 h-5 text-[#0077FF]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.79 16.14c-5.08 0-8.04-3.48-8.16-9.27h2.56c.08 4.24 1.96 6.04 3.45 6.42V6.87h2.41v3.66c1.47-.16 3.01-1.85 3.53-3.66h2.41a7.4 7.4 0 01-2.86 4.63 7.7 7.7 0 013.18 4.64h-2.65c-.47-1.47-1.65-2.61-3.61-2.77v2.77h-.26z"/>
            </svg>
            ВКонтакте
          </button>
          <button
            type="button"
            @click="socialLogin('telegram')"
            class="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-slate-200 rounded-lg font-bold text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
          >
            <svg class="w-5 h-5 text-[#229ED9]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.94 4.66 2.92 12.14c-1.1.43-1.09 1.64-.01 2.01l4.85 1.51 1.13 3.5c.18.5.46.62.83.63.37.01.54-.17.77-.37l2.32-2.26 4.82 3.56c.89.49 1.53.24 1.75-.82l3.16-14.9c.32-1.3-.5-1.9-1.64-1.34zM9.08 14.3l8.4-5.3c.38-.24.72-.11.44.14l-7.2 6.51-.3 2.85-1.34-4.2z"/>
            </svg>
            Telegram
          </button>
        </div>
      </div>

      <!-- Ссылка на регистрацию -->
      <div class="text-center pt-4 border-t border-slate-100">
        <p class="text-sm text-slate-500">
          Ещё нет аккаунта?
          <button @click="router.push('/signup')" class="font-bold text-amber-600 hover:text-amber-700 transition-colors ml-1">
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  </div>
</template>