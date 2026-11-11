<script setup lang="ts">
import { ref } from 'vue'
// import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppMobileMenu from '@/components/AppMobileMenu.vue'

// const auth = useAuthStore()
const cart = useCartStore()

const isMobileMenuOpen = ref(false)

function openMobileMenu() {
  isMobileMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <AppHeader @open-menu="openMobileMenu" />
    
    <main class="grow">
      <router-view />
    </main>
    
    <AppFooter />

    <!-- Мобильное меню с анимацией -->
    <AppMobileMenu 
      :is-open="isMobileMenuOpen" 
      @close="closeMobileMenu" 
    />
  <router-link to="/cart" class="hidden md:block relative text-stone-600 hover:text-stone-900 transition">
    <span class="text-xs font-medium uppercase tracking-widest">Корзина</span>
    <span 
      v-if="cart.count" 
      class="absolute -top-2 -right-4 bg-stone-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
    >
      {{ cart.count }}
    </span>
  </router-link>
  </div>
</template>

