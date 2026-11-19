<script setup>
import { useLibrary } from '@/stores/library'
//import { formatPrice } from '@/stores/format'

const { items, isEmpty } = useLibrary()

function formatDate(iso) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}
</script>

<template>
  <div class="space-y-6">
    <!-- Пустое состояние -->
    <div
      v-if="isEmpty"
      class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-10 lg:p-16 text-center"
    >
      <div
        class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-slate-600 mb-2">Библиотека пуста</h3>
      <p class="text-sm text-slate-400 mb-6">
        Купленные уроки появятся здесь. Загляните в каталог, чтобы выбрать что-нибудь интересное.
      </p>
      <router-link
        to="/lessons"
        class="inline-block px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300"
      >
        Перейти к урокам
      </router-link>
    </div>

    <!-- Сетка купленных уроков -->
    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div
          v-for="lesson in items"
          :key="lesson.lesson_id"
          class="group flex flex-col bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <!-- Превью -->
          <div class="relative aspect-video bg-slate-900 overflow-hidden">
            <video
              v-if="lesson.title_video_url"
              :src="lesson.title_video_url"
              muted
              loop
              playsinline
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
            ></video>
            <div v-else class="absolute inset-0 flex items-center justify-center bg-slate-800">
              <svg
                class="w-12 h-12 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>

            <!-- Бейдж "Куплено" -->
            <div class="absolute top-3 left-3">
              <span
                class="px-3 py-1 bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest rounded shadow-md"
              >
                Куплено
              </span>
            </div>
          </div>

          <!-- Контент -->
          <div class="p-5 grow flex flex-col">
            <h3
              class="text-base font-black text-slate-600 mb-2 group-hover:text-amber-600 transition-colors leading-tight line-clamp-2"
            >
              {{ lesson.title }}
            </h3>
            <p class="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
              {{ lesson.description }}
            </p>

            <div class="mt-auto flex items-center justify-between gap-3">
              <span class="text-xs text-slate-400">
                {{ formatDate(lesson.purchasedAt) }}
              </span>
              <router-link
                :to="`/lessons/${lesson.lesson_id}`"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-600 text-white text-sm font-bold rounded-lg hover:bg-amber-600 transition-all duration-300"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Смотреть
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
