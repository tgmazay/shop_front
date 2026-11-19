// Единая точка правды для путей API.
// Vite проксирует /api на Go-сервер без переписывания пути, поэтому
// Path=/api/auth у refresh-cookie совпадает с адресом запроса.
export const API_PREFIX = '/api'

export const API = {
  auth: {
    captchaSession: `${API_PREFIX}/auth/captcha/session`,
    login: `${API_PREFIX}/auth/login`,
    register: `${API_PREFIX}/auth/register`,
    refresh: `${API_PREFIX}/auth/refresh`,
    logout: `${API_PREFIX}/auth/logout`,
    yandex: `${API_PREFIX}/auth/yandex`,
  },
  profile: `${API_PREFIX}/profile`,
  regularConsents: `${API_PREFIX}/profile/regular-consents`,
  piiConsents: {
    current: `${API_PREFIX}/pii-consents/current`,
    byId: (id) => `${API_PREFIX}/pii-consents/${encodeURIComponent(String(id))}`,
  },
  // Каталог уроков на бэкенде живёт по /lessons, но этот путь совпадает
  // с фронтенд-маршрутом /lessons. В dev оставляем его за /backend-прокси.
  lessons: '/backend/lessons',
}

export const CAPTCHA_PURPOSE = 'register'

// Приводит относительный путь из ответа бэкенда к виду, который проходит
// через Vite-прокси. Абсолютные URL и уже префиксованные пути не трогаем.
export function normalizeApiUrl(url) {
  const value = String(url ?? '').trim()

  if (!value) return ''
  if (/^https?:\/\//i.test(value)) return value
  if (value === API_PREFIX || value.startsWith(`${API_PREFIX}/`)) return value
  if (value.startsWith('/')) return `${API_PREFIX}${value}`

  return `${API_PREFIX}/${value.replace(/^\/+/, '')}`
}

// Ссылка на конкретную редакцию PII-согласия.
export function piiConsentDocumentUrl(id) {
  if (id === null || id === undefined || id === '') return ''

  return API.piiConsents.byId(id)
}

// Ссылка на редакцию PII-согласия: сначала используем pii_consent_url
// из ответа сервера, затем собираем путь по pii_consent_id.
export function resolvePiiConsentUrl({ id, url } = {}) {
  const normalized = normalizeApiUrl(url)
  if (normalized) return normalized

  return piiConsentDocumentUrl(id)
}
