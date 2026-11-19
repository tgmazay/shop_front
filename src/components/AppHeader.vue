<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useUser } from '@/stores/user'

const { state: user, initials } = useUser()
const router = useRouter()
const authStore = useAuthStore()

// storeToRefs сохраняет реактивность при деструктуризации
const { isAuthenticated } = storeToRefs(authStore)

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="border-b border-stone-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-[1600px] mx-auto h-14 flex items-center justify-between px-4 relative">
      <!-- Бургер (только мобильные) -->
      <button
        class="md:hidden text-stone-900 focus:outline-none p-2 cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-50"
        @click="$emit('open-menu')"
        aria-label="Открыть меню"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <!-- Логотип -->
      <router-link to="/" class="flex flex-col select-none pl-10 md:pl-0">
        <span class="text-xs font-light tracking-[0.35em] text-stone-400 uppercase"
          >VideoLessons</span
        >
        <span class="text-sm font-semibold tracking-[0.2em] uppercase mt-0.5 text-stone-900"
          >Foodphotostylist</span
        >
      </router-link>

      <!-- Десктопное меню с выпадашками -->
      <nav
        class="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-stone-500 h-full"
      >
        <router-link to="/" class="hover:text-stone-900 transition py-8">Главная</router-link>

        <router-link to="/lessons" class="hover:text-stone-900 transition py-8">Уроки</router-link>
        <router-link to="/club" class="hover:text-stone-900 transition py-8">Клуб</router-link>

        <!-- Выпадающее меню: Услуги (Исправлено на тег span, так как это просто триггер ховера) -->
        <div class="relative group h-full flex items-center">
          <span class="hover:text-stone-900 transition flex items-center gap-1 py-8 cursor-pointer">
            Услуги
            <span
              class="text-[10px] lowercase text-stone-400 group-hover:text-stone-900 transition duration-200"
              >▼</span
            >
          </span>
          <div
            class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-xl p-6 w-64 space-y-4 hidden group-hover:block transition z-50"
          >
            <router-link
              to="/services/foodstyling"
              class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]"
              >Фудстайлинг</router-link
            >
            <router-link
              to="/services/foodphoto"
              class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]"
              >Фудфотосъемка</router-link
            >
            <router-link
              to="/services/training"
              class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]"
              >Персональные занятия</router-link
            >
          </div>
        </div>

        <!-- Выпадающее меню: Портфолио -->
        <div class="relative group h-full flex items-center">
          <router-link
            to="/portfolio"
            class="hover:text-stone-900 transition flex items-center gap-1 py-8"
          >
            Портфолио
            <span
              class="text-[10px] lowercase text-stone-400 group-hover:text-stone-900 transition duration-200"
              >▼</span
            >
          </router-link>
          <div
            class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-xl p-6 w-64 space-y-4 hidden group-hover:block transition z-50"
          >
            <router-link
              to="/restaurants"
              class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]"
              >съемка для ресторанов</router-link
            >
            <router-link
              to="/foodstyling"
              class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]"
              >фудстайлинг</router-link
            >
            <router-link
              to="/imagery"
              class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]"
              >имиджевая съемка</router-link
            >
          </div>
        </div>

        <router-link to="/about" class="hover:text-stone-900 transition py-8">Обо мне</router-link>
      </nav>

      <!-- Правая часть: авторизация -->
      <div class="hidden md:flex items-center gap-6">
        <!-- НЕ авторизован -->
        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-6 py-3 hover:bg-stone-900 hover:text-white transition duration-300"
        >
          Вход в кабинет
        </router-link>

        <!-- Авторизован -->
        <template v-else>
          <!-- Библиотека -->
          <router-link
            to="/account/library"
            class="text-xs font-medium uppercase tracking-widest text-stone-500 hover:text-stone-900 transition"
          >
            <div
              class="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400 mb-4"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </router-link>

          <!-- Корзина -->
          <router-link
            to="/account/cart"
            class="text-xs font-medium uppercase tracking-widest text-stone-500 hover:text-stone-900 transition"
          >
            <div
              class="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400 mb-4"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </router-link>

          <router-link
            to="/account/profile"
            class="text-xs font-medium uppercase tracking-widest text-stone-500 hover:text-stone-900 transition"
            :title="user.social.name || 'Профиль'"
          >
            <div
              class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl font-black shrink-0 overflow-hidden"
            >
              <img
                v-if="user.social.avatar"
                :src="user.social.avatar"
                alt=""
                class="w-full h-full object-cover"
              />
              <template v-else>{{ initials }}</template>
            </div>
          </router-link>
          <button
            @click="handleLogout"
            class="text-stone-400 hover:text-red-500 transition cursor-pointer"
            title="Выйти"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </template>
      </div>
    </div>
  </header>
</template>
