<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PersonalDataConsent from '@/components/PersonalDataConsent.vue'
import { CONSENT_VERSION } from '@/constants/legal'

const router = useRouter()
const route = useRoute()

const CONSENT_STORAGE_KEY = 'pd_consent'
const OAUTH_STATE_KEY = 'oauth_state'

const isLoading = ref(true)
const error = ref(null)

// Сценарий, когда пользователь вернулся от Яндекса без зафиксированного согласия
// (например, открыл страницу по прямой ссылке): просим подтвердить согласие,
// а не блокируем вход.
const needsConsent = ref(false)
const consentAccepted = ref(false)
const consentError = ref(false)
// Необязательное согласие на рекламные сообщения (ч. 1 ст. 18 ФЗ «О рекламе»)
const marketingAccepted = ref(false)

const pendingCode = ref('')

function readStoredConsent() {
  try {
    return JSON.parse(sessionStorage.getItem(CONSENT_STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

function storeConsent() {
  const consent = {
    version: CONSENT_VERSION,
    acceptedAt: new Date().toISOString(),
    provider: 'yandex',
    marketing: marketingAccepted.value,
  }
  sessionStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  return consent
}

onMounted(() => {
  // Получаем код из query-параметров URL (например, ?code=12345)
  const code = route.query.code
  const state = route.query.state
  const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY)

  if (!code) {
    error.value = 'Отсутствует код авторизации. Пожалуйста, попробуйте войти снова.'
    isLoading.value = false
    return
  }

  // Защита от CSRF: если state был сохранён перед редиректом, он должен совпасть
  if (expectedState && state !== expectedState) {
    error.value =
      'Сессия входа устарела. Пожалуйста, вернитесь на страницу входа и попробуйте снова.'
    isLoading.value = false
    return
  }

  pendingCode.value = String(code)

  const consent = readStoredConsent()
  if (!consent) {
    needsConsent.value = true
    isLoading.value = false
    return
  }

  verify(consent)
})

async function confirmConsent() {
  if (!consentAccepted.value) {
    consentError.value = true
    return
  }

  consentError.value = false
  needsConsent.value = false
  isLoading.value = true
  await verify(storeConsent())
}

async function verify(consent) {
  try {
    const response = await fetch('/backend/api/auth/yandex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Критически важно для записи HttpOnly куки с Refresh-токеном
      body: JSON.stringify({
        code: pendingCode.value,

        // Значения чекбоксов, которые пользователь отметил до редиректа на Яндекс
        pii_consent: true, // без него verify() не вызывается
        pii_consent_version: consent.version, // версия редакции согласия

        marketing_consent: Boolean(consent.marketing), // согласие на рассылку рекламы

        consents_accepted_at: consent.acceptedAt, // дата согласий
      }),
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

    // Согласие зафиксировано на бэкенде — локальную копию больше не храним
    sessionStorage.removeItem(CONSENT_STORAGE_KEY)
    sessionStorage.removeItem(OAUTH_STATE_KEY)

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
}
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

      <!-- Подтверждение согласия на обработку персональных данных -->
      <div v-else-if="needsConsent" class="space-y-6 text-left">
        <div class="text-center space-y-3">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600 text-white"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight">
            Подтвердите согласие
          </h2>
          <p class="text-slate-500 text-sm leading-relaxed">
            Остался один шаг: подтвердите согласие на обработку персональных данных, чтобы завершить
            вход.
          </p>
        </div>

        <PersonalDataConsent
          v-model="consentAccepted"
          v-model:marketing="marketingAccepted"
          :error="consentError"
          show-marketing
          @change="consentError = false"
        />

        <button
          type="button"
          :disabled="!consentAccepted"
          :aria-disabled="!consentAccepted"
          @click="confirmConsent"
          class="w-full py-3.5 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-600"
        >
          Продолжить вход
        </button>

        <button
          type="button"
          @click="router.push('/signin')"
          class="w-full py-2 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          Вернуться на страницу входа
        </button>
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
