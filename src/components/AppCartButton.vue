<script setup lang="ts">
import { useCart } from '@/stores/cart'

const cart = useCart()
</script>

<template>
  <router-link
    to="/account/cart"
    class="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 transition"
  >
    <span class="text-xs font-medium uppercase tracking-widest">Корзина</span>
    <span
      v-if="cart.count"
      class="bg-stone-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
    >
      {{ cart.count }}
    </span>
  </router-link>
</template>
