<script setup>
import { watch } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

// Закрываем меню при изменении размера экрана (если пользователь растянул окно)
watch(() => window.innerWidth, (width) => {
  if (width >= 768 && props.isOpen) {
    emit('close')
  }
})

function close() {
  emit('close')
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-in-out"
    leave-active-class="transition-opacity duration-300 ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- Оверлей -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden"
      @click="close"
    ></div>
  </Transition>

  <Transition
    enter-active-class="transition-transform duration-300 ease-in-out"
    leave-active-class="transition-transform duration-300 ease-in-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <!-- Панель меню -->
    <div 
      v-if="isOpen"
      class="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between border-r border-stone-100 z-50 md:hidden"
    >
      <div>
        <!-- Шапка -->
        <div class="flex items-center justify-between border-b border-stone-100 h-24 mb-6 px-6">
          <span class="text-xs font-semibold tracking-widest uppercase text-stone-900">Навигация</span>
          <button 
            class="text-stone-400 hover:text-stone-900 p-1 cursor-pointer"
            @click="close"
            aria-label="Закрыть меню"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Ссылки -->
        <nav class="space-y-3 text-xs font-medium uppercase tracking-widest text-stone-500 px-6">
          <router-link 
            to="/" 
            class="block hover:text-stone-900 py-3 border-b border-stone-100/50"
            @click="close"
          >
            Главная
          </router-link>

          <router-link 
            to="/lessons" 
            class="block hover:text-stone-900 py-3 border-b border-stone-100/50"
            @click="close"
          >
            Уроки
          </router-link>

          <router-link 
            to="/club"
            class="block hover:text-stone-900 py-3 border-b border-stone-100/50"
            @click="close"
          >
            Клуб
          </router-link>          

          <!-- Раскрывающийся блок: Портфолиио -->
          <details class="group/mobile-nav border-b border-stone-100/50">
            <summary class="flex justify-between items-center hover:text-stone-900 py-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
              <span>Портфолио</span>
              <span class="text-[10px] text-stone-400 group-open/mobile-nav:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div class="pl-4 pb-4 pt-2 space-y-4 uppercase tracking-widest text-stone-500 text-[10px]">
              <router-link to="/restaurants" class="block hover:text-stone-900 transition" @click="close">съемка для ресторанов</router-link>
              <router-link to="/foodstyling" class="block hover:text-stone-900 transition" @click="close">фудстайлинг</router-link>
              <router-link to="/imagery" class="block hover:text-stone-900 transition" @click="close">имиджевая съемка</router-link>
            </div>
          </details>

          <!-- Раскрывающийся блок: Услуги -->
          <details class="group/mobile-nav border-b border-stone-100/50">
            <summary class="flex justify-between items-center hover:text-stone-900 py-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
              <span>Услуги</span>
              <span class="text-[10px] text-stone-400 group-open/mobile-nav:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div class="pl-4 pb-4 pt-2 space-y-4 uppercase tracking-widest text-stone-500 text-[10px]">
              <router-link to="/services/foodstyling" class="block hover:text-stone-900 transition" @click="close">Фудстайлинг</router-link>
              <router-link to="/services/foodphoto" class="block hover:text-stone-900 transition" @click="close">Фудфото</router-link>
              <router-link to="/services/training" class="block hover:text-stone-900 transition" @click="close">Персональные занятия</router-link>
            </div>
          </details>

          <router-link 
            to="/about" 
            class="block hover:text-stone-900 py-3 border-b border-stone-100/50"
            @click="close"
          >
            Обо мне
          </router-link>

          <router-link 
            to="/cart" 
            class="block hover:text-stone-900 py-3 border-b border-stone-100/50"
            @click="close"
          >
            Корзина
          </router-link>
        </nav>
      </div>

      <!-- Кнопка входа -->
      <div class="p-6 border-t border-stone-100">
        <router-link 
          to="/login" 
          class="w-full block text-center border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest py-3 hover:bg-stone-900 hover:text-white transition duration-300"
          @click="close"
        >
          Вход в кабинет
        </router-link>
      </div>
    </div>
  </Transition>
</template>