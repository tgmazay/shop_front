<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUser } from '@/stores/user'
import { useCart } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const { state: user, providerLabel, initials } = useUser()
const { count: cartCount } = useCart()

const isLinking = ref(false)
const linkError = ref('')
const yandexLinkedLocally = ref(false)

const isYandexLinked = computed(() => {
  if (yandexLinkedLocally.value) return true
  if (authStore.user?.provider === 'yandex') return true

  const identities = Array.isArray(authStore.user?.identities) ? authStore.user.identities : []

  return identities.some((identity) => {
    const provider =
      typeof identity === 'string' ? identity : identity?.provider_id || identity?.provider

    return provider === 'yandex'
  })
})

const navItems = [
  { to: '/account/profile', label: 'Профиль' },
  { to: '/account/cart', label: 'Корзина' },
  { to: '/account/library', label: 'Библиотека' },
]

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

function startYandexLink() {
  if (isYandexLinked.value || isLinking.value) return

  linkError.value = ''

  const clientId = readEnv('VITE_YANDEX_CLIENT_ID')
  const redirectUri = readEnv('VITE_YANDEX_REDIRECT_URI')

  if (!clientId || !redirectUri) {
    linkError.value = 'Привязка Яндекс ID временно недоступна.'
    return
  }

  try {
    const parsed = new URL(redirectUri)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error('Неподдерживаемый протокол redirect_uri')
    }
  } catch {
    linkError.value = 'Привязка Яндекс ID временно недоступна.'
    return
  }

  const state = createOAuthState()

  sessionStorage.setItem('oauth_state', state)
  sessionStorage.setItem('oauth_mode', 'link')
  sessionStorage.setItem('oauth_redirect', route.fullPath)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  })

  isLinking.value = true

  try {
    window.location.assign(`https://oauth.yandex.ru/authorize?${params.toString()}`)
  } catch {
    isLinking.value = false
    linkError.value = 'Не удалось открыть страницу Яндекса.'
  }
}

onMounted(() => {
  const message = sessionStorage.getItem('oauth_link_error')

  if (message) {
    linkError.value = message
    sessionStorage.removeItem('oauth_link_error')
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 lg:py-10">
      <!-- Заголовок -->
      <div class="mb-6 lg:mb-10">
        <h1 class="text-3xl lg:text-4xl font-black text-slate-600 uppercase tracking-tight">
          Личный кабинет
        </h1>
        <p class="text-slate-500 mt-1">Управляйте профилем, покупками и доступом к урокам</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Сайдбар -->
        <aside class="lg:w-64 shrink-0">
          <!-- Карточка пользователя -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-5 mb-4 flex items-center gap-4"
          >
            <div
              class="w-12 h-12 rounded-full bg-slate-600 text-white flex items-center justify-center text-lg font-black shrink-0 overflow-hidden"
            >
              <img
                v-if="user.social.avatar"
                :src="user.social.avatar"
                alt=""
                class="w-full h-full object-cover"
              />
              <template v-else>{{ initials }}</template>
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-700 truncate">{{ user.social.name }}</div>
              <div class="text-xs text-slate-400 truncate">{{ providerLabel }}</div>
            </div>
          </div>

          <!-- Навигация -->
          <nav
            class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-2 flex lg:flex-col gap-1 overflow-x-auto"
          >
            <router-link
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors whitespace-nowrap"
              :class="
                route.path === item.to
                  ? 'bg-slate-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              "
            >
              <!-- Иконка Профиль -->
              <svg
                v-if="item.to === '/account/profile'"
                class="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <!-- Иконка Корзина -->
              <svg
                v-else-if="item.to === '/account/cart'"
                class="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <!-- Иконка Библиотека -->
              <svg
                v-else
                class="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>

              <span>{{ item.label }}</span>

              <!-- Бейдж количества для корзины -->
              <span
                v-if="item.to === '/account/cart' && cartCount > 0"
                class="ml-auto inline-flex items-center justify-center w-5 h-5 text-[10px] font-black rounded-full"
                :class="
                  route.path === item.to ? 'bg-amber-500 text-white' : 'bg-slate-600 text-white'
                "
              >
                {{ cartCount }}
              </span>
            </router-link>
          </nav>

          <!-- Привязка соцсетей -->
          <div class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-4 mt-4">
            <h2 class="text-xs font-black text-slate-600 uppercase tracking-wider mb-3">Соцсети</h2>

            <button
              type="button"
              :disabled="isYandexLinked || isLinking"
              :aria-disabled="isYandexLinked || isLinking"
              @click="startYandexLink"
              class="w-full flex items-center gap-3 py-3 px-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-[#FC3F1D] hover:bg-[#FC3F1D]/5 transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:bg-white"
            >
              <div
                class="shrink-0 w-10 h-10 rounded-full bg-[#FC3F1D] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#fff"
                    d="M11.823 14h-1.748V5.354h-.778c-1.428 0-2.176.713-2.176 1.779 0 1.209.516 1.769 1.583 2.482l.879.593-2.527 3.79h-1.88l2.275-3.384C6.143 9.68 5.407 8.769 5.407 7.23 5.407 5.308 6.747 4 9.284 4h2.527v9.997h.012z"
                  />
                </svg>
              </div>
              <div class="flex flex-col items-start flex-1 text-left">
                <span class="text-sm font-black leading-tight">
                  {{ isYandexLinked ? 'Яндекс ID привязан' : 'Привязать Яндекс ID' }}
                </span>
                <span class="text-[11px] font-medium text-slate-400 leading-tight mt-0.5">
                  {{
                    isYandexLinked
                      ? 'Соцсеть подключена к аккаунту'
                      : isLinking
                        ? 'Переходим в Яндекс...'
                        : 'Подключите аккаунт Яндекса'
                  }}
                </span>
              </div>
              <svg
                v-if="isYandexLinked"
                class="w-5 h-5 text-emerald-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-slate-300 group-hover:text-[#FC3F1D] group-hover:translate-x-1 transition-all shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <p v-if="linkError" class="mt-3 text-xs font-medium text-red-600">{{ linkError }}</p>
          </div>
        </aside>

        <!-- Контент -->
        <main class="grow min-w-0">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
