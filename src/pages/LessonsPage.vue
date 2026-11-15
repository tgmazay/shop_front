<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const lessons = ref([])
const loading = ref(true)
const error = ref(null)

// Пагинация
const page = ref(1)
const pageSize = ref(5)
const hasMore = ref(true)
const isLoadingMore = ref(false)

// Управление видео
const videoRefs = ref({})
const activeVideoId = ref(null)

// Sentinel для infinite scroll
const sentinelRef = ref(null)
let observer = null

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)
}

const fetchLessons = async (isLoadMore = false) => {
  if (isLoadMore) {
    isLoadingMore.value = true
  } else {
    loading.value = true
  }
  error.value = null

  try {
    const response = await fetch(
      `http://192.168.1.124:8000/lessons?page=${page.value}&pageSize=${pageSize.value}`,
    )
    if (!response.ok) throw new Error('Не удалось загрузить уроки')

    const data = await response.json()

    if (isLoadMore) {
      lessons.value = [...lessons.value, ...data.items]
    } else {
      lessons.value = data.items
    }

    if (data.items.length < pageSize.value) {
      hasMore.value = false
    }
  } catch (err) {
    console.error('Ошибка при загрузке уроков:', err)
    error.value = 'Произошла ошибка при загрузке. Пожалуйста, попробуйте позже.'
  } finally {
    loading.value = false
    isLoadingMore.value = false
  }
}

const loadMore = () => {
  if (isLoadingMore.value || !hasMore.value || loading.value) return
  page.value++
  fetchLessons(true)
}

// --- ЛОГИКА ВИДЕО ---
const setVideoRef = (el, id) => {
  if (el) {
    videoRefs.value[id] = el
  }
}

const toggleVideo = (lesson) => {
  const video = videoRefs.value[lesson.lesson_id]
  if (!video) return

  if (activeVideoId.value === lesson.lesson_id) {
    video.pause()
    video.muted = true
    activeVideoId.value = null
  } else {
    if (activeVideoId.value && videoRefs.value[activeVideoId.value]) {
      const prevVideo = videoRefs.value[activeVideoId.value]
      prevVideo.pause()
      prevVideo.muted = true
    }
    video.muted = false
    video.play().catch((e) => console.log('Ошибка воспроизведения:', e))
    activeVideoId.value = lesson.lesson_id
  }
}

// --- INFINITE SCROLL ---
const disconnectObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

const setupObserver = () => {
  disconnectObserver()

  const el = sentinelRef.value
  if (!el) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (
        entry.isIntersecting &&
        hasMore.value &&
        !isLoadingMore.value &&
        !loading.value &&
        !error.value
      ) {
        loadMore()
      }
    },
    {
      root: null,
      rootMargin: '400px',
      threshold: 0,
    },
  )

  observer.observe(el)
}

watch([sentinelRef, isLoadingMore, hasMore, loading, error], () => {
  nextTick(() => {
    setupObserver()
  })
})

onMounted(async () => {
  await fetchLessons()
})

onUnmounted(() => {
  disconnectObserver()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
    <!-- Header Section -->
    <section class="pt-6 pb-2 md:pt-12 md:pb-4 lg:pt-16 lg:pb-6 bg-white">
      <div class="max-w-[1600px] mx-auto px-3 md:px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 md:mb-8 lg:mb-12">
          <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
            <h2 class="text-3xl lg:text-5xl text-slate-600 mb-2 uppercase tracking-tight">
              Библиотека уроков
            </h2>
            <p class="text-lg text-slate-600">
              Пошаговые видео-руководства по фудстайлингу: от простых закусок до сложных композиций
            </p>
          </div>
        </div>

        <!-- Состояние загрузки -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-8">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-white rounded-lg md:rounded-xl border border-indigo-100 p-3 md:p-6 animate-pulse"
          >
            <div class="aspect-video bg-slate-200 rounded mb-3 md:mb-6"></div>
            <div class="h-4 md:h-6 bg-slate-200 rounded w-3/4 mb-2 md:mb-4"></div>
            <div class="h-3 md:h-4 bg-slate-200 rounded w-full mb-1 md:mb-2"></div>
            <div class="h-3 md:h-4 bg-slate-200 rounded w-5/6 mb-3 md:mb-6"></div>
            <div class="h-8 md:h-10 bg-slate-200 rounded w-full"></div>
          </div>
        </div>

        <!-- Состояние ошибки -->
        <div v-else-if="error" class="text-center py-8 md:py-12">
          <div
            class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 text-red-600 mb-3 md:mb-4"
          >
            <svg
              class="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg md:text-xl font-bold text-slate-600 mb-2">Что-то пошло не так</h3>
          <p class="text-sm md:text-base text-slate-500 mb-4 md:mb-6">{{ error }}</p>
          <button
            @click="fetchLessons()"
            class="px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300"
          >
            Попробовать снова
          </button>
        </div>

        <!-- Сетка уроков: 2 колонки на мобилках, 2 на md, 5 на lg -->
        <div v-else class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5">
          <router-link
            v-for="lesson in lessons"
            :key="lesson.lesson_id"
            :to="`/lessons/${lesson.lesson_id}`"
            class="group relative flex flex-col bg-slate-100 rounded-lg md:rounded-xl overflow-hidden border border-indigo-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <!-- Медиа-блок (Видео превью) -->
            <div class="relative aspect-video bg-slate-900 overflow-hidden">
              <video
                :ref="(el) => setVideoRef(el, lesson.lesson_id)"
                :src="lesson.title_video_url"
                muted
                loop
                playsinline
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                :class="{ 'scale-105': activeVideoId === lesson.lesson_id }"
              ></video>
              <!-- Fallback заглушка, если видео нет -->
              <div
                v-if="!lesson.title_video_url"
                class="absolute inset-0 flex items-center justify-center bg-slate-800"
              >
                <svg
                  class="w-10 h-10 md:w-16 md:h-16 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <!-- Кнопка Play/Pause -->
              <button
                v-if="lesson.title_video_url"
                @click.stop.prevent="toggleVideo(lesson)"
                class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors duration-300 w-full h-full"
                :aria-label="activeVideoId === lesson.lesson_id ? 'Пауза' : 'Воспроизвести'"
              >
                <div
                  class="w-9 h-9 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 hover:bg-amber-500 hover:text-white transition-all duration-300 text-slate-600"
                >
                  <svg
                    v-if="activeVideoId !== lesson.lesson_id"
                    class="w-4 h-4 md:w-6 md:h-6 ml-0.5 md:ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                  </svg>
                </div>
              </button>
              <!-- Бейдж "Видео" -->
              <div class="absolute top-2 left-2 md:top-4 md:left-4 pointer-events-none">
                <span
                  class="px-1.5 py-0.5 md:px-3 md:py-1 bg-slate-900/80 backdrop-blur-md text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded shadow-md flex items-center gap-1"
                >
                  <svg
                    class="w-2 h-2 md:w-3 md:h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Видео
                </span>
              </div>
            </div>
            <!-- Контент карточки -->
            <div class="p-2.5 md:p-6 lg:p-6 grow flex flex-col">
              <h3
                class="text-base md:text-xl font-black text-slate-600 mb-3 md:mb-3 group-hover:text-amber-600 transition-colors leading-tight line-clamp-3"
              >
                {{ lesson.title }}
              </h3>
              <p
                class="text-sm md:text-sm text-slate-600 leading-relaxed mb-3 md:mb-3 line-clamp-4 md:line-clamp-4"
              >
                {{ lesson.description }}
              </p>
              <!-- Футер карточки -->
              <div
                class="mt-auto pt-2 md:pt-4 border-t border-dashed md:border-t-2 border-indigo-100 flex items-center justify-between gap-2 md:gap-4"
              >
                <div class="text-sm md:text-2xl font-black text-slate-600">
                  {{ formatPrice(lesson.price) }}
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Индикатор подгрузки -->
        <div
          v-if="!loading && !error && isLoadingMore"
          class="flex items-center justify-center gap-2 md:gap-3 py-6 md:py-10"
        >
          <svg
            class="animate-spin h-5 w-5 md:h-6 md:w-6 text-amber-600"
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
          <span class="text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm">
            Загружаем ещё...
          </span>
        </div>

        <!-- Sentinel -->
        <div
          v-if="!loading && !error && hasMore"
          ref="sentinelRef"
          class="h-4 w-full"
          aria-hidden="true"
        ></div>

        <!-- Всё загружено -->
        <div
          v-if="!loading && !error && !hasMore && lessons.length > 0"
          class="text-center mt-6 md:mt-12"
        >
          <p class="text-slate-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">
            Вы просмотрели все доступные уроки
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
