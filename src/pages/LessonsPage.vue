<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const lessons = ref([])
const loading = ref(true)
const error = ref(null)

// Пагинация
const page = ref(1)
const pageSize = ref(3)
const hasMore = ref(true)
const isLoadingMore = ref(false)

// Корзина (локальное состояние для примера. В реальном проекте используйте Pinia/Vuex)
const cart = ref([])

// Управление видео
const videoRefs = ref({})
const activeVideoId = ref(null)

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
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
    const response = await fetch(`http://localhost:8000/lessons?page=${page.value}&pageSize=${pageSize.value}`)
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
  page.value++
  fetchLessons(true)
}

// --- ЛОГИКА КОРЗИНЫ ---
const isInCart = (lessonId) => {
  return cart.value.some(item => item.lesson_id === lessonId)
}

const addToCart = (lesson) => {
  if (!isInCart(lesson.lesson_id)) {
    cart.value.push(lesson)
    // Здесь можно добавить вызов toast-уведомления, например: showToast('Урок добавлен в корзину')
    console.log('Добавлено в корзину:', lesson.title)
  }
}

const cartCount = computed(() => cart.value.length)

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
    // Если уже играет — ставим на паузу и выключаем звук
    video.pause()
    video.muted = true
    activeVideoId.value = null
  } else {
    // Останавливаем другое видео, если оно играет
    if (activeVideoId.value && videoRefs.value[activeVideoId.value]) {
      const prevVideo = videoRefs.value[activeVideoId.value]
      prevVideo.pause()
      prevVideo.muted = true
    }
    // Запускаем текущее со звуком (клик пользователя разрешает unmute)
    video.muted = false
    video.play().catch(e => console.log('Ошибка воспроизведения:', e))
    activeVideoId.value = lesson.lesson_id
  }
}

onMounted(() => {
  fetchLessons()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
    
    <!-- Плавающая кнопка корзины (появляется, если там что-то есть) -->
    <div 
      v-if="cartCount > 0"
      class="fixed top-6 right-6 z-50 bg-amber-600 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 hover:bg-amber-700 transition-all duration-300 cursor-pointer group"
      @click="router.push('/cart')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      <span class="font-bold text-sm">Корзина</span>
      <span class="bg-white text-amber-600 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
        {{ cartCount }}
      </span>
    </div>

    <!-- Header Section -->
    <section class="pt-12 lg:pt-16 pb-4 lg:pb-6 bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <h1 class="text-3xl lg:text-5xl text-slate-600 mb-4 uppercase tracking-tight">
            Библиотека уроков
          </h1>
          <p class="text-lg text-slate-600">
            Пошаговые видео-руководства по фудстайлингу: от простых закусок до сложных композиций
          </p>
        </div>

        <!-- Состояние загрузки -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="bg-white rounded-xl border border-indigo-100 p-6 animate-pulse">
            <div class="aspect-video bg-slate-200 rounded-lg mb-6"></div>
            <div class="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
            <div class="h-10 bg-slate-200 rounded w-full"></div>
          </div>
        </div>

        <!-- Состояние ошибки -->
        <div v-else-if="error" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-600 mb-2">Что-то пошло не так</h3>
          <p class="text-slate-500 mb-6">{{ error }}</p>
          <button @click="fetchLessons()" class="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300">
            Попробовать снова
          </button>
        </div>

        <!-- Сетка уроков -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="lesson in lessons" 
            :key="lesson.lesson_id"
            class="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <!-- Медиа-блок (Видео превью) -->
            <div class="relative aspect-video bg-slate-900 overflow-hidden">
              <video 
                :ref="el => setVideoRef(el, lesson.lesson_id)"
                :src="lesson.title_video_url"
                muted
                loop
                playsinline
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                :class="{ 'scale-105': activeVideoId === lesson.lesson_id }"
              ></video>

              <!-- Fallback заглушка, если видео нет -->
              <div v-if="!lesson.title_video_url" class="absolute inset-0 flex items-center justify-center bg-slate-800">
                <svg class="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>

              <!-- Кнопка Play/Pause -->
              <button 
                v-if="lesson.title_video_url"
                @click="toggleVideo(lesson)"
                class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors duration-300 w-full h-full"
                :aria-label="activeVideoId === lesson.lesson_id ? 'Пауза' : 'Воспроизвести'"
              >
                <div class="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 hover:bg-amber-500 hover:text-white transition-all duration-300 text-slate-600">
                  <!-- Иконка Play -->
                  <svg v-if="activeVideoId !== lesson.lesson_id" class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                  <!-- Иконка Pause -->
                  <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                  </svg>
                </div>
              </button>

              <!-- Бейдж "Видео" -->
              <div class="absolute top-4 left-4 pointer-events-none">
                <span class="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded shadow-md flex items-center gap-1.5">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Видео
                </span>
              </div>
            </div>

            <!-- Контент карточки -->
            <div class="p-6 lg:p-8 grow flex flex-col">
              <h3 class="text-xl font-black text-slate-600 mb-3 group-hover:text-amber-600 transition-colors leading-tight">
                {{ lesson.title }}
              </h3>
              
              <p class="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                {{ lesson.description }}
              </p>

              <!-- Футер карточки -->
              <div class="mt-auto pt-6 border-t-2 border-dashed border-indigo-100 flex items-center justify-between gap-4">
                <div class="text-2xl font-black text-slate-600">
                  {{ formatPrice(lesson.price) }}
                </div>
                <button 
                  @click="addToCart(lesson)"
                  :disabled="isInCart(lesson.lesson_id)"
                  class="px-5 py-3 text-sm font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-2"
                  :class="isInCart(lesson.lesson_id) 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-slate-600 text-white hover:bg-amber-600'"
                >
                  <svg v-if="isInCart(lesson.lesson_id)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ isInCart(lesson.lesson_id) ? 'В корзине' : 'В корзину' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка "Загрузить еще" -->
        <div v-if="!loading && !error && hasMore" class="text-center mt-12">
          <button 
            @click="loadMore"
            :disabled="isLoadingMore"
            class="px-8 py-4 bg-white text-slate-600 font-bold rounded-lg border-2 border-slate-200 hover:border-amber-500 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wide text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <svg v-if="isLoadingMore" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoadingMore ? 'Загрузка...' : 'Показать еще уроки' }}
          </button>
        </div>

        <div v-if="!loading && !error && !hasMore && lessons.length > 0" class="text-center mt-12">
          <p class="text-slate-400 text-sm uppercase tracking-widest font-bold">
            Вы просмотрели все доступные уроки
          </p>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>