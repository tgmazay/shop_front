import { computed, reactive } from 'vue'

// Купленные уроки — тоже личные данные, поэтому ключ хранения по пользователю.
const STORAGE_PREFIX = 'library:'

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
    // Приватный режим или переполнение хранилища
  }
}

export function useLibrary() {
  const count = computed(() => state.items.length)
  const isEmpty = computed(() => state.items.length === 0)
  const isGuest = computed(() => state.ownerId === null)

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

  function reset() {
    state.ownerId = null
    state.items.splice(0)
  }

  function addMany(lessons) {
    if (!state.ownerId || !Array.isArray(lessons)) return 0

    let added = 0

    for (const lesson of lessons) {
      if (!state.items.some((i) => i.lesson_id === lesson.lesson_id)) {
        state.items.push({ ...lesson, purchasedAt: new Date().toISOString() })
        added += 1
      }
    }

    if (added > 0) persist()
    return added
  }

  function has(lessonId) {
    return state.items.some((i) => i.lesson_id === lessonId)
  }

  return {
    items: state.items,
    count,
    isEmpty,
    isGuest,
    addMany,
    has,
    loadForUser,
    reset,
  }
}
