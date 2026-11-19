<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CaptchaCheckmark from '@/components/CaptchaCheckmark.vue'
import PersonalDataConsent from '@/components/PersonalDataConsent.vue'
import { API, piiConsentDocumentUrl } from '@/constants/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

const consentAccepted = ref(false)
const consentError = ref(false)

const captchaRef = ref(null)
const captchaError = ref('')
const captchaSession = ref({
  captchaSessionId: '',
  piiConsentId: null,
  piiConsentVersion: '',
  piiConsentUrl: '',
})

// Актуальная редакция PII-согласия приходит отдельным запросом при входе
// на страницу. Именно её ID уходит в ссылку и в POST /auth/register.
const currentPiiConsentId = ref(null)
const isLoadingPiiConsent = ref(false)
const piiConsentError = ref('')

const piiConsentUrl = computed(() => piiConsentDocumentUrl(currentPiiConsentId.value))

function resolveNextPath() {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
  const isSafe = redirect.startsWith('/') && !redirect.startsWith('//')

  return isSafe ? redirect : '/account/profile'
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

function onConsentChange() {
  if (consentAccepted.value) {
    consentError.value = false
    error.value = ''
  }
}

function onCaptchaSession(payload) {
  captchaSession.value = payload
  captchaError.value = ''
}

function onCaptchaError(message) {
  captchaError.value = message || 'Не удалось подготовить капчу.'
}

function extractErrorMessage(data, fallback) {
  if (!data) return fallback
  if (typeof data === 'string') return data
  return data.message || data.error?.message || data.error || fallback
}

async function loadCurrentPiiConsent() {
  isLoadingPiiConsent.value = true
  piiConsentError.value = ''

  try {
    const response = await fetch(API.piiConsents.current, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'include',
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        extractErrorMessage(data, 'Не удалось получить актуальное согласие на обработку данных'),
      )
    }

    const id = Number(data.pii_consent_id)

    if (!Number.isInteger(id)) {
      throw new Error('Сервер вернул некорректный pii_consent_id')
    }

    currentPiiConsentId.value = id
  } catch (err) {
    currentPiiConsentId.value = null
    piiConsentError.value =
      err?.message || 'Не удалось получить актуальное согласие на обработку данных'
  } finally {
    isLoadingPiiConsent.value = false
  }
}

onMounted(loadCurrentPiiConsent)

async function handleSubmit() {
  error.value = ''
  captchaError.value = ''

  if (!form.value.email || !form.value.password) {
    error.value = 'Введите email и пароль'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(form.value.email)) {
    error.value = 'Введите корректный адрес электронной почты'
    return
  }

  if (form.value.password.length < 8) {
    error.value = 'Пароль должен быть не менее 8 символов'
    return
  }

  if (!consentAccepted.value) {
    consentError.value = true
    error.value = 'Для регистрации необходимо согласие на обработку персональных данных.'
    return
  }

  // Точки не проверяем локально: форму галочки валидирует сервер.
  const points = captchaRef.value?.getPoints() ?? []

  if (!captchaSession.value.captchaSessionId) {
    error.value = 'Капча ещё не готова. Подождите немного и попробуйте снова.'
    return
  }

  if (isLoadingPiiConsent.value) {
    error.value = 'Загружаем актуальное согласие на обработку данных. Подождите немного.'
    return
  }

  if (currentPiiConsentId.value === null) {
    error.value =
      piiConsentError.value ||
      'Не удалось получить актуальное согласие на обработку данных. Обновите страницу.'
    return
  }

  isLoading.value = true

  try {
    await authStore.registerWithPassword({
      email: form.value.email.trim(),
      password: form.value.password,
      captchaSessionId: captchaSession.value.captchaSessionId,
      piiConsentId: currentPiiConsentId.value,
      points,
    })

    await router.replace(resolveNextPath())
  } catch (err) {
    error.value = err?.message || 'Не удалось зарегистрироваться. Попробуйте позже.'

    const message = String(error.value).toLowerCase()
    if (message.includes('капч') || message.includes('captcha') || message.includes('провер')) {
      captchaRef.value?.reset(true)
    }
  } finally {
    isLoading.value = false
  }
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

    <!-- Основная карточка регистрации -->
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-indigo-100 p-6 sm:p-8 space-y-5 relative z-10"
    >
      <!-- Заголовок -->
      <div class="text-center space-y-2">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600 text-white mb-1"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            ></path>
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-600 uppercase tracking-tight">Регистрация</h1>
        <p class="text-slate-500 text-sm leading-relaxed">
          Создайте аккаунт по email и паролю, чтобы сохранять покупки и доступ к урокам.
        </p>
      </div>

      <!-- Сообщение об ошибке -->
      <div
        v-if="error"
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
        <span>{{ error }}</span>
      </div>

      <!-- Форма -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Поле: Почта -->
        <div class="space-y-1.5">
          <label
            for="register-email"
            class="block text-xs font-bold text-slate-600 uppercase tracking-wider"
          >
            Электронная почта
          </label>
          <input
            id="register-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="your@email.com"
            class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
          />
        </div>

        <!-- Поле: Пароль -->
        <div class="space-y-1.5">
          <label
            for="register-password"
            class="block text-xs font-bold text-slate-600 uppercase tracking-wider"
          >
            Пароль
          </label>
          <div class="relative">
            <input
              id="register-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Минимум 8 символов"
              class="w-full px-4 py-3.5 pr-12 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
            >
              <svg
                v-if="!showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Согласие на обработку персональных данных -->
        <div v-if="isLoadingPiiConsent" class="text-xs font-medium text-slate-400">
          Загружаем актуальную редакцию согласия...
        </div>
        <div
          v-else-if="piiConsentError"
          class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-start justify-between gap-3"
        >
          <span>{{ piiConsentError }}</span>
          <button type="button" class="font-bold underline shrink-0" @click="loadCurrentPiiConsent">
            Повторить
          </button>
        </div>

        <PersonalDataConsent
          v-model="consentAccepted"
          :error="consentError"
          :document-url="piiConsentUrl"
          @change="onConsentChange"
        />

        <!-- Капча: только сбор точек, проверка на сервере -->
        <CaptchaCheckmark
          ref="captchaRef"
          :disabled="isLoading"
          @session="onCaptchaSession"
          @error="onCaptchaError"
        />

        <p v-if="captchaError" class="text-xs font-medium text-red-600">{{ captchaError }}</p>

        <!-- Кнопка отправки -->
        <button
          type="submit"
          :disabled="isLoading || isLoadingPiiConsent || currentPiiConsentId === null"
          class="w-full py-4 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm flex items-center justify-center gap-2"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
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
          {{ isLoading ? 'Регистрируем...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <!-- Ссылка на вход -->
      <div class="text-center pt-4 border-t border-slate-100">
        <p class="text-sm text-slate-500">
          Уже есть аккаунт?
          <button
            @click="router.push('/login')"
            class="font-bold text-amber-600 hover:text-amber-700 transition-colors ml-1"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
