<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '@/stores/cart'
import { useLibrary } from '@/stores/library'
import { formatPrice } from '@/stores/format'

const router = useRouter()
const { items, total, count, isEmpty, remove, clear } = useCart()
const { addMany } = useLibrary()

function handleCheckout() {
  // В реальном приложении здесь будет редирект на платёжный шлюз.
  // Для демонстрации переносим уроки в библиотеку и очищаем корзину.
  addMany(items)
  clear()
  router.push('/account/library')
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-slate-600 mb-2">Корзина пуста</h3>
      <p class="text-sm text-slate-400 mb-6">
        Добавьте видеоуроки из каталога, чтобы оформить покупку.
      </p>
      <router-link
        to="/lessons"
        class="inline-block px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300"
      >
        Перейти к урокам
      </router-link>
    </div>

    <!-- Список уроков в корзине -->
    <template v-else>
      <div class="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
        <div class="p-6 border-b border-indigo-100 flex items-center justify-between">
          <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight">
            Уроки в корзине
          </h2>
          <span class="text-sm font-bold text-slate-400">{{ count }} шт.</span>
        </div>

        <ul class="divide-y divide-indigo-100">
          <li
            v-for="lesson in items"
            :key="lesson.lesson_id"
            class="flex items-center gap-4 p-4 lg:p-6 hover:bg-slate-50 transition-colors"
          >
            <!-- Превью -->
            <div
              class="w-20 h-14 lg:w-28 lg:h-20 rounded-lg bg-slate-900 overflow-hidden shrink-0 relative"
            >
              <video
                v-if="lesson.title_video_url"
                :src="lesson.title_video_url"
                muted
                class="w-full h-full object-cover opacity-80"
              ></video>
              <div v-else class="absolute inset-0 flex items-center justify-center bg-slate-800">
                <svg
                  class="w-6 h-6 text-slate-600"
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
            </div>

            <!-- Название -->
            <div class="grow min-w-0">
              <h3 class="font-bold text-slate-700 leading-tight line-clamp-2">
                {{ lesson.title }}
              </h3>
              <p class="text-xs text-slate-400 mt-1 line-clamp-1">{{ lesson.description }}</p>
            </div>

            <!-- Цена -->
            <div class="text-base lg:text-lg font-black text-slate-600 whitespace-nowrap">
              {{ formatPrice(lesson.price) }}
            </div>

            <!-- Удалить -->
            <button
              @click="remove(lesson.lesson_id)"
              class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              :aria-label="`Удалить ${lesson.title} из корзины`"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <!-- Итого -->
      <div class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="text-sm font-bold text-slate-400 uppercase tracking-widest">Итого</div>
            <div class="text-3xl font-black text-slate-600 mt-1">{{ formatPrice(total) }}</div>
          </div>
          <div class="flex gap-3">
            <button
              @click="clear"
              class="px-5 py-3 border-2 border-slate-300 text-slate-500 font-bold rounded-lg hover:border-red-400 hover:text-red-500 transition-all duration-300"
            >
              Очистить
            </button>
            <button
              @click="handleCheckout"
              class="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-md"
            >
              Перейти к оплате
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
