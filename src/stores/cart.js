import { computed, reactive } from 'vue'

// Корзина привязана к авторизованному пользователю.
// Гость корзиной не пользуется: add() вернёт ошибку unauthorized.
const STORAGE_PREFIX = 'cart:'

const state = reactive({
  items: [],
  ownerId: null,
})

function storageKey(userId) {
  return `${STORAGE_PREFIX}${userId}`
}

function readItems(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist() {
  if (!state.ownerId) return

  try {
    localStorage.setItem(storageKey(state.ownerId), JSON.stringify(state.items))
  } catch {
    // Приватный режим или переполнение хранилища — работаем только в памяти
  }
}

export function useCart() {
  const total = computed(() => state.items.reduce((sum, item) => sum + Number(item.price ?? 0), 0))
  const count = computed(() => state.items.length)
  const isEmpty = computed(() => state.items.length === 0)
  const isGuest = computed(() => state.ownerId === null)

  // Вызывается auth-стором при входе/восстановлении сессии
  function loadForUser(userId) {
    if (userId === null || userId === undefined) {
      reset()
      return
    }

    const id = String(userId)
    if (state.ownerId === id) return

    state.ownerId = id
    state.items.splice(0, state.items.length, ...readItems(id))
  }

  // Выход из аккаунта: чистим память, сохранённая корзина остаётся на диске
  function reset() {
    state.ownerId = null
    state.items.splice(0)
  }

  function add(lesson) {
    if (!state.ownerId) return { ok: false, reason: 'unauthorized' }

    if (state.items.some((i) => i.lesson_id === lesson.lesson_id)) {
      return { ok: false, reason: 'duplicate' }
    }

    state.items.push({ ...lesson })
    persist()
    return { ok: true }
  }

  function remove(lessonId) {
    const idx = state.items.findIndex((i) => i.lesson_id === lessonId)
    if (idx !== -1) {
      state.items.splice(idx, 1)
      persist()
    }
  }

  function clear() {
    state.items.splice(0)
    persist()
  }

  function has(lessonId) {
    return state.items.some((i) => i.lesson_id === lessonId)
  }

  return {
    items: state.items,
    total,
    count,
    isEmpty,
    isGuest,
    add,
    remove,
    clear,
    has,
    loadForUser,
    reset,
  }
}
