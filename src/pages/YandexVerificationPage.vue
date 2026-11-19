<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const OAUTH_STATE_KEY = 'oauth_state'
const OAUTH_MODE_KEY = 'oauth_mode'
const REDIRECT_KEY = 'oauth_redirect'

const isLoading = ref(true)
const isSuccess = ref(false)
const error = ref('')
const returnPath = ref('/account/profile')

function resolveReturnPath() {
  const stored = sessionStorage.getItem(REDIRECT_KEY)
  sessionStorage.removeItem(REDIRECT_KEY)

  const isSafe = Boolean(stored) && stored.startsWith('/') && !stored.startsWith('//')

  return isSafe ? stored : '/account/profile'
}

function clearOAuthState() {
  sessionStorage.removeItem(OAUTH_STATE_KEY)
  sessionStorage.removeItem(OAUTH_MODE_KEY)
}

function goBack() {
  router.replace(returnPath.value || '/account/profile')
}

onMounted(async () => {
  returnPath.value = resolveReturnPath()

  // Страница обслуживает только привязку соцсети из личного кабинета.
  // Публичный вход через Яндекс на бэкенде удалён.
  if (sessionStorage.getItem(OAUTH_MODE_KEY) !== 'link') {
    error.value = 'Привязка Яндекс ID доступна только из личного кабинета.'
    isLoading.value = false
    return
  }

  if (route.query.error) {
    error.value = route.query.error_description
      ? String(route.query.error_description)
      : 'Яндекс отклонил запрос на привязку.'

    clearOAuthState()
    isLoading.value = false
    return
  }

  const code = route.query.code
  const state = route.query.state
  const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY)

  if (!code) {
    error.value = 'Отсутствует код авторизации. Вернитесь в кабинет и попробуйте снова.'
    clearOAuthState()
    isLoading.value = false
    return
  }

  // Защита от CSRF: state должен совпасть с сохранённым перед редиректом.
  if (expectedState && state !== expectedState) {
    error.value = 'Сессия привязки устарела. Вернитесь в кабинет и попробуйте снова.'
    clearOAuthState()
    isLoading.value = false
    return
  }

  try {
    await authStore.linkYandexCode({ code: String(code) })

    clearOAuthState()
    isSuccess.value = true
    isLoading.value = false

    setTimeout(() => {
      if (isSuccess.value) goBack()
    }, 1500)
  } catch (err) {
    clearOAuthState()
    error.value =
      err?.code === 'YANDEX_LINK_UNAVAILABLE'
        ? 'Привязка Яндекс ID пока недоступна.'
        : err?.message || 'Не удалось привязать Яндекс ID.'
    isLoading.value = false
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden font-sans text-slate-900"
  >
    <!-- Декоративное фоновое свечение -->
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
            Привязываем Яндекс ID
          </h2>
          <p class="text-slate-500 text-sm leading-relaxed">
            Завершаем привязку аккаунта. Пожалуйста, подождите...
          </p>
        </div>
      </div>

      <!-- Успешная привязка -->
      <div v-else-if="isSuccess" class="space-y-6">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight mb-2">
            Яндекс ID привязан
          </h2>
          <p class="text-slate-500 text-sm leading-relaxed">
            Теперь вы можете использовать аккаунт Яндекса для входа и управления профилем.
          </p>
        </div>
        <button
          type="button"
          @click="goBack"
          class="w-full py-3.5 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 uppercase tracking-wide text-sm"
        >
          Вернуться в кабинет
        </button>
      </div>

      <!-- Ошибка привязки -->
      <div v-else class="space-y-6">
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
            Не удалось привязать Яндекс ID
          </h2>
          <p class="text-slate-500 text-sm leading-relaxed mb-6">{{ error }}</p>
          <button
            @click="goBack"
            class="w-full py-3.5 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 uppercase tracking-wide text-sm"
          >
            Вернуться в кабинет
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
