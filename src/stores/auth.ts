import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useCart } from '@/stores/cart'
import { useLibrary } from '@/stores/library'
import { API } from '@/constants/api'

type Profile = Record<string, any>

interface SessionPayload {
  access_token?: string | null
  accessToken?: string | null
  user?: Profile | null
}

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  email: string
  password: string
  captchaSessionId: string
  piiConsentId: number
  points: Array<{ x: number; y: number; t: number }>
}

async function readJson(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) return {}

  return response.json().catch(() => ({}))
}

function extractErrorMessage(data: any, fallback: string): string {
  if (!data) return fallback
  if (typeof data === 'string') return data

  return data.message || data.error?.message || data.error || fallback
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Profile | null>(null)
  // Access-токен живёт только в памяти: после F5 сессия восстанавливается
  // по HttpOnly refresh-cookie, поэтому XSS не может утащить его из storage
  const accessToken = ref<string | null>(null)
  const isInitialized = ref(false)
  const isBusy = ref(false)

  // Единственный источник правды: авторизован = есть токен
  const isAuthenticated = computed(() => Boolean(accessToken.value))
  const userId = computed<string | null>(() => {
    const id = user.value?.id ?? user.value?.user_id
    return id === null || id === undefined ? null : String(id)
  })

  function authHeaders(): Record<string, string> {
    return accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}
  }

  // Личные данные (корзина, библиотека) живут по ключу пользователя
  function syncUserStores() {
    const cart = useCart()
    const library = useLibrary()

    if (!userId.value) {
      cart.reset()
      library.reset()
      return
    }

    cart.loadForUser(userId.value)
    library.loadForUser(userId.value)

    if (Array.isArray(user.value?.lessons)) {
      library.addMany(user.value.lessons)
    }
  }

  // TODO(backend): удалить заглушку, когда профиль начнёт приходить
  // с реальным идентификатором. Пока бэкенд может не отдать user,
  // корзина и библиотека привязываются к локальному владельцу.
  function ensureLocalOwner() {
    if (user.value?.id || user.value?.user_id) return

    user.value = {
      ...user.value,
      id: 'local-session',
      name: user.value?.name ?? '',
      provider: user.value?.provider ?? 'email',
    }

    syncUserStores()
  }

  function setToken(token: string | null) {
    // Никакого localStorage: токен доступен только в памяти вкладки
    accessToken.value = token || null
  }

  function setUser(profile: Profile | null) {
    user.value = profile ? { ...profile } : null
    syncUserStores()
  }

  // Приводим ответ бэкенда (snake_case или camelCase) к состоянию стора
  function applySession(payload: SessionPayload | null) {
    const token = payload?.access_token ?? payload?.accessToken ?? null
    if (token) setToken(token)

    const profile = payload?.user ?? null
    if (profile) setUser(profile)
  }

  function clearSession() {
    setToken(null)
    setUser(null)
  }

  async function loginWithPassword({
    email,
    password,
  }: LoginPayload): Promise<{ user: Profile | null }> {
    isBusy.value = true

    try {
      const response = await fetch(API.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // HttpOnly refresh-cookie
        body: JSON.stringify({ email, password }),
      })

      const data = await readJson(response)

      if (!response.ok) {
        throw new Error(extractErrorMessage(data, 'Неверный email или пароль'))
      }

      if (!data.access_token && !data.accessToken) {
        throw new Error('Сервер не вернул access-токен')
      }

      applySession(data)
      ensureLocalOwner()

      return { user: user.value }
    } finally {
      isBusy.value = false
    }
  }

  async function registerWithPassword({
    email,
    password,
    captchaSessionId,
    piiConsentId,
    points,
  }: RegisterPayload): Promise<{ user: Profile | null }> {
    isBusy.value = true

    try {
      const response = await fetch(API.auth.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // HttpOnly refresh-cookie
        body: JSON.stringify({
          email,
          password,
          captcha_session_id: captchaSessionId,
          pii_consent_id: piiConsentId,
          points,
        }),
      })

      const data = await readJson(response)

      if (!response.ok) {
        throw new Error(extractErrorMessage(data, 'Не удалось зарегистрироваться'))
      }

      if (!data.access_token && !data.accessToken) {
        throw new Error('Сервер не вернул access-токен')
      }

      applySession(data)
      ensureLocalOwner()

      return { user: user.value }
    } finally {
      isBusy.value = false
    }
  }

  async function linkYandexCode({ code }: { code: string }): Promise<{ user: Profile | null }> {
    isBusy.value = true

    try {
      const response = await fetch(API.auth.yandex, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        credentials: 'include',
        body: JSON.stringify({ provider_id: 'yandex', code }),
      })

      // Бэкенд пока держит привязку соцсетей заглушкой — не разлогиниваем
      // пользователя и показываем понятное сообщение в интерфейсе.
      if (response.status === 404 || response.status === 501) {
        const unavailableError = new Error('Привязка Яндекс ID пока недоступна')
        ;(unavailableError as Error & { code?: string }).code = 'YANDEX_LINK_UNAVAILABLE'
        throw unavailableError
      }

      const data = await readJson(response)

      if (!response.ok) {
        throw new Error(extractErrorMessage(data, 'Не удалось привязать Яндекс ID'))
      }

      if (data.access_token || data.accessToken || data.user) {
        applySession(data)
      }

      const linkedUser = data.user ?? user.value

      if (linkedUser) {
        setUser({ ...linkedUser, provider: 'yandex' })
      }

      return { user: user.value }
    } finally {
      isBusy.value = false
    }
  }

  // Восстановление сессии после перезагрузки страницы
  async function restoreSession() {
    if (isInitialized.value) return
    isBusy.value = true

    try {
      if (accessToken.value) {
        // Токен есть — проверяем, что он ещё валиден, и забираем профиль
        const response = await fetch(API.profile, {
          headers: authHeaders(),
          credentials: 'include',
          signal: AbortSignal.timeout(5000),
        })

        const contentType = response.headers.get('content-type') || ''
        const isJson = contentType.includes('application/json')

        if (response.ok && isJson) {
          const data = await response.json()
          setUser(data.user ?? data)
          return
        }

        if (response.status === 401 || response.status === 403) {
          clearSession()
          return
        }

        // 404 или HTML от SPA-fallback — эндпоинта нет, работаем с заглушкой
        ensureLocalOwner()
        return
      }

      // Токена нет — пробуем обновить сессию по HttpOnly cookie
      const response = await fetch(API.auth.refresh, {
        method: 'POST',
        credentials: 'include',
        signal: AbortSignal.timeout(5000),
      })

      const contentType = response.headers.get('content-type') || ''

      if (response.ok && contentType.includes('application/json')) {
        applySession(await response.json())
        ensureLocalOwner()
      }
    } catch (err) {
      // Бэкенд недоступен — не блокируем приложение
      console.warn('Не удалось восстановить сессию:', err)
    } finally {
      isInitialized.value = true
      isBusy.value = false
    }
  }

  async function updateProfile(patch: Profile) {
    if (user.value) {
      user.value = { ...user.value, ...patch }
    }

    try {
      const response = await fetch(`${API.profile}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        credentials: 'include',
        body: JSON.stringify(patch),
      })

      if (!response.ok && response.status !== 404) {
        throw new Error('Не удалось сохранить профиль')
      }
    } catch (err) {
      console.warn('Профиль сохранён только локально:', err)
    }
  }

  async function logout() {
    try {
      await fetch(API.auth.logout, {
        method: 'POST',
        headers: authHeaders(),
        credentials: 'include',
      })
    } catch (err) {
      console.warn('Не удалось завершить сессию на сервере:', err)
    } finally {
      clearSession()
    }
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    isInitialized,
    isBusy,
    userId,
    setToken,
    setUser,
    applySession,
    clearSession,
    loginWithPassword,
    registerWithPassword,
    linkYandexCode,
    restoreSession,
    updateProfile,
    logout,
  }
})
