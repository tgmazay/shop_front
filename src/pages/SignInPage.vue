<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PersonalDataConsent from '@/components/PersonalDataConsent.vue'
import { CONSENT_VERSION } from '@/constants/legal'

const router = useRouter()

const consentAccepted = ref(false)
const consentError = ref(false)
const errorMessage = ref('')

const marketingAccepted = ref(false)

const canLogin = computed(() => consentAccepted.value)

function requireConsent() {
  if (consentAccepted.value) {
    consentError.value = false
    errorMessage.value = ''
    return true
  }

  consentError.value = true
  errorMessage.value = 'Для входа необходимо согласие на обработку персональных данных.'
  return false
}

function onConsentChange() {
  if (consentAccepted.value) {
    consentError.value = false
    errorMessage.value = ''
  }
}

function readEnv(name) {
  const value = import.meta.env[name]
  return typeof value === 'string' ? value.trim() : ''
}

function createOAuthState() {
  const cryptoApi = globalThis.crypto

  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID()
  }

  if (cryptoApi && typeof cryptoApi.getRandomValues === 'function') {
    const bytes = new Uint8Array(16)
    cryptoApi.getRandomValues(bytes)
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

function rememberConsent(provider) {
  sessionStorage.setItem(
    'pd_consent',
    JSON.stringify({
      version: CONSENT_VERSION,
      acceptedAt: new Date().toISOString(),
      provider,
      marketing: marketingAccepted.value,
    }),
  )
}

const handleYandexLogin = () => {
  if (!requireConsent()) return

  const clientId = readEnv('VITE_YANDEX_CLIENT_ID')
  const redirectUri = readEnv('VITE_YANDEX_REDIRECT_URI')

  if (!clientId) {
    console.error('VITE_YANDEX_CLIENT_ID не найден в переменных окружения!')
    errorMessage.value = 'Вход через Яндекс временно недоступен. Попробуйте позже.'
    return
  }

  if (!redirectUri) {
    console.error('VITE_YANDEX_REDIRECT_URI не найден в переменных окружения!')
    errorMessage.value = 'Вход через Яндекс временно недоступен. Попробуйте позже.'
    return
  }

  try {
    const parsed = new URL(redirectUri)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error('Неподдерживаемый протокол redirect_uri')
    }
  } catch {
    console.error('VITE_YANDEX_REDIRECT_URI не является корректным абсолютным URL:', redirectUri)
    errorMessage.value = 'Вход через Яндекс временно недоступен. Попробуйте позже.'
    return
  }

  const state = createOAuthState()
  sessionStorage.setItem('oauth_state', state)
  rememberConsent('yandex')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  })

  window.location.assign(`https://oauth.yandex.ru/authorize?${params.toString()}`)
}

function socialLogin(provider) {
  if (!requireConsent()) return

  rememberConsent(provider)
  console.log(`OAuth via ${provider}`)
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
      class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-6 sm:p-6 space-y-4 relative z-10"
    >
      <!-- Заголовок -->
      <div class="text-center space-y-1">
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

      <!-- Сообщение об ошибке -->
      <div
        v-if="errorMessage"
        class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2"
        role="alert"
        aria-live="polite"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Кнопки OAuth-провайдеров -->
      <div class="space-y-3">
        <!-- Яндекс ID -->
        <button
          type="button"
          :disabled="!canLogin"
          :aria-disabled="!canLogin"
          @click="handleYandexLogin"
          class="w-full flex items-center gap-4 py-4 px-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#000000] hover:bg-white transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-full bg-[#FC3F1D] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
          >
            <svg class="w-8 h-8" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path
                fill="#fff"
                d="M11.823 14h-1.748V5.354h-.778c-1.428 0-2.176.713-2.176 1.779 0 1.209.516 1.769 1.583 2.482l.879.593-2.527 3.79h-1.88l2.275-3.384C6.143 9.68 5.407 8.769 5.407 7.23 5.407 5.308 6.747 4 9.284 4h2.527v9.997h.012z"
              />
            </svg>
          </div>
          <div class="flex flex-col items-start flex-1">
            <span class="text-base font-black leading-tight">Яндекс ID</span>
            <span class="text-xs font-medium text-slate-400 leading-tight mt-0.5">
              Войти через аккаунт Яндекса
            </span>
          </div>
          <svg
            class="w-5 h-5 text-slate-300 group-hover:text-black group-hover:translate-x-1 transition-all"
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
          :disabled="!canLogin"
          :aria-disabled="!canLogin"
          @click="socialLogin('vk')"
          class="w-full flex items-center gap-4 py-4 px-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#0077FF] hover:bg-[#0077FF]/5 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-full bg-[#0077FF] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
          >
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
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
          :disabled="!canLogin"
          :aria-disabled="!canLogin"
          @click="socialLogin('telegram')"
          class="w-full flex items-center gap-4 py-4 px-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#229ED9] hover:bg-[#229ED9]/5 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
          >
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="m 2.7525282,10.838873 c -1.1,0.43 -1.09,1.64 -0.01,2.01 l 4.85,1.51 1.13,3.5 c 0.18,0.5 0.46,0.62 0.83,0.63 0.37,0.01 0.5399998,-0.17 0.7699998,-0.37 l 2.32,-2.26 4.82,3.56 c 0.89,0.49 1.53,0.24 1.75,-0.82 L 21.548051,6.9194847 c 0.32,-1.3 -0.39694,-1.7325282 -1.64,-1.34 z m 6.16,2.16 6.7768118,-3.5222222 c 0.38,-0.24 0.72,-0.11 0.44,0.14 l -5.576812,4.7322222 -0.3,2.85 z"
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

        <!-- Обязательное согласие на обработку персональных данных -->
        <PersonalDataConsent
          v-model="consentAccepted"
          v-model:marketing="marketingAccepted"
          :error="consentError"
          show-marketing
          @change="onConsentChange"
        />
      </div>
    </div>
  </div>
</template>
