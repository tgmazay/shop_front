<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  phone: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)

function handleSubmit() {
  if (!form.value.email || !form.value.phone || !form.value.password) {
    error.value = 'Пожалуйста, заполните все поля'
    return
  }
  
  // Простая валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    error.value = 'Введите корректный адрес электронной почты'
    return
  }

  error.value = ''
  isLoading.value = true

  // Имитация запроса к API
  setTimeout(() => {
    console.log('Registration data:', form.value)
    isLoading.value = false
    // После успешной регистрации перенаправляем, например, на страницу оплаты или в клуб
    router.push('/checkout') 
  }, 1500)
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900">
    
    <!-- Декоративное фоновое свечение (как в Hero секциях) -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-150 h-150 bg-amber-900/5 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Кнопка "Назад на главную" -->
    <button 
      @click="router.push('/')" 
      class="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors duration-300 z-20"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      На главную
    </button>

    <!-- Основная карточка регистрации -->
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 sm:p-10 space-y-8 relative z-10">
      
      <!-- Заголовок -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600 text-white mb-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-600 uppercase tracking-tight">
          Регистрация
        </h1>
        <p class="text-slate-500 text-sm leading-relaxed">
          Получите доступ к урокам и начните создавать визуальный контент, за который платят бренды.
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
            placeholder="your@email.com"
            class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
          />
        </div>



        <!-- Поле: Пароль -->
        <div class="space-y-1.5">
          <label for="password" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Пароль
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Минимум 8 символов"
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

        <!-- Поле: Телефон -->
        <div class="space-y-1.5">
          <label for="phone" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Телефон
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="+7 (999) 000-00-00"
            class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
          />
        </div>

        <!-- Поле: Имя -->
        <div class="space-y-1.5">
          <label for="username" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Имя
          </label>
          <input
            id="username"
            v-model="form.username"
            type="tel"
            placeholder="Ваше имя"
            class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
          />
        </div>        

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
          {{ isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться' }}
        </button>

      </form>

      <!-- Ссылка на вход -->
      <div class="text-center pt-4 border-t border-slate-100">
        <p class="text-sm text-slate-500">
          Уже есть аккаунт? 
          <button @click="router.push('/signin')" class="font-bold text-amber-600 hover:text-amber-700 transition-colors ml-1">
            Войти
          </button>
        </p>
      </div>

      <!-- Согласие с условиями (опционально, но рекомендуется) -->
      <p class="text-xs text-slate-400 text-center leading-relaxed">
        Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с 
        <a href="#" class="underline hover:text-slate-600 transition-colors">Политикой конфиденциальности</a> 
        и 
        <a href="#" class="underline hover:text-slate-600 transition-colors">Пользовательским соглашением</a>.
      </p>
    </div>
  </div>
</template>