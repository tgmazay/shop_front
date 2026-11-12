<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const isLoading = ref(false)
const error = ref('')
const isSuccess = ref(false)

function handleSubmit() {
  if (!email.value) {
    error.value = 'Введите адрес электронной почты'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Введите корректный адрес электронной почты'
    return
  }

  error.value = ''
  isLoading.value = true

  // Имитация запроса к API для сброса пароля
  setTimeout(() => {
    console.log('Password reset requested for:', email.value)
    isLoading.value = false
    isSuccess.value = true
  }, 1500)
}

function resetForm() {
  isSuccess.value = false
  email.value = ''
  error.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900">

    <!-- Декоративное фоновое свечение (как в Login и Register) -->
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

    <!-- Основная карточка -->
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 sm:p-10 space-y-8 relative z-10">
      
      <!-- Заголовок -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600 text-white mb-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-600 uppercase tracking-tight">
          Забыли пароль?
        </h1>
        <p class="text-slate-500 text-sm leading-relaxed">
          Не переживайте. Введите email, привязанный к аккаунту, и мы пришлем вам ссылку для сброса пароля.
        </p>
      </div>

      <!-- СОСТОЯНИЕ 1: Форма ввода email -->
      <form v-if="!isSuccess" @submit.prevent="handleSubmit" class="space-y-5">
        
        <div class="space-y-1.5">
          <label for="email" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Электронная почта
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="your@email.com"
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
          {{ isLoading ? 'Отправка...' : 'Отправить ссылку' }}
        </button>
      </form>

      <!-- СОСТОЯНИЕ 2: Успешная отправка -->
      <div v-else class="space-y-6 text-center py-4">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-slate-600">Проверьте вашу почту</h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            Мы отправили инструкцию по восстановлению пароля на адрес 
            <span class="font-bold text-slate-700">{{ email }}</span>.
          </p>
          <p class="text-xs text-slate-400 leading-relaxed pt-2">
            Если письмо не пришло в течение 5 минут, проверьте папку «Спам» или попробуйте другой email.
          </p>
        </div>
        
        <div class="pt-4 space-y-3">
          <button 
            @click="router.push('/login')" 
            class="w-full py-3.5 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm"
          >
            Вернуться ко входу
          </button>
          <button 
            @click="resetForm" 
            class="w-full py-3 px-6 text-slate-500 font-bold hover:text-amber-600 transition-colors duration-300 text-sm"
          >
            Отправить на другой email
          </button>
        </div>
      </div>

      <!-- Ссылка на вход (показывается только если форма еще не отправлена) -->
      <div v-if="!isSuccess" class="text-center pt-4 border-t border-slate-100">
        <p class="text-sm text-slate-500">
          Вспомнили пароль?
          <button @click="router.push('/signin')" class="font-bold text-amber-600 hover:text-amber-700 transition-colors ml-1">
            Войти в аккаунт
          </button>
        </p>
      </div>
    </div>
  </div>
</template>