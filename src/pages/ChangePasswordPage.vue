<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = ref({
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const error = ref('')
const isSuccess = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// В реальном приложении токен сброса приходит в URL (например, /reset-password?token=xyz)
// const resetToken = route.query.token 

function handleSubmit() {
  // Сброс предыдущих ошибок
  error.value = ''

  // Валидация
  if (!form.value.newPassword || !form.value.confirmPassword) {
    error.value = 'Пожалуйста, заполните оба поля'
    return
  }

  if (form.value.newPassword.length < 8) {
    error.value = 'Пароль должен содержать минимум 8 символов'
    return
  }

  if (form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'Пароли не совпадают'
    return
  }

  // Имитация запроса к API с токеном
  isLoading.value = true
  
  setTimeout(() => {
    console.log('Password reset payload:', { 
      token: route.query.token, // Отправляем токен на бэкенд
      newPassword: form.value.newPassword 
    })
    
    isLoading.value = false
    isSuccess.value = true
  }, 1500)
}

function toggleNewPassword() {
  showNewPassword.value = !showNewPassword.value
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900">

    <!-- Декоративное фоновое свечение -->
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
          <!-- Иконка ключа -->
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-600 uppercase tracking-tight">
          Новый пароль
        </h1>
        <p class="text-slate-500 text-sm leading-relaxed">
          Придумайте надежный пароль для вашего аккаунта. 
          Мы рекомендуем использовать комбинацию букв, цифр и спецсимволов.
        </p>
      </div>

      <!-- СОСТОЯНИЕ 1: Форма ввода нового пароля -->
      <form v-if="!isSuccess" @submit.prevent="handleSubmit" class="space-y-5">
        
        <!-- Поле: Новый пароль -->
        <div class="space-y-1.5">
          <label for="newPassword" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Новый пароль
          </label>
          <div class="relative">
            <input
              id="newPassword"
              v-model="form.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Минимум 8 символов"
              class="w-full px-4 py-3.5 pr-12 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
            />
            <button
              type="button"
              @click="toggleNewPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Поле: Подтверждение пароля -->
        <div class="space-y-1.5">
          <label for="confirmPassword" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Повторите пароль
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Повторите новый пароль"
              class="w-full px-4 py-3.5 pr-12 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
            />
            <button
              type="button"
              @click="toggleConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </button>
          </div>
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
          {{ isLoading ? 'Сохранение...' : 'Сменить пароль' }}
        </button>
      </form>

      <!-- СОСТОЯНИЕ 2: Успешная смена пароля -->
      <div v-else class="space-y-6 text-center py-4">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-slate-600">Пароль успешно изменен!</h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            Теперь вы можете войти в свой аккаунт, используя новый пароль.
          </p>
        </div>
        
        <div class="pt-4">
          <button 
            @click="router.push('/signin')" 
            class="w-full py-4 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm"
          >
            Перейти ко входу
          </button>
        </div>
      </div>

    </div>
  </div>
</template>