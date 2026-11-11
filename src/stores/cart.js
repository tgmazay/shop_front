import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const count = computed(() => items.value.length)
  const total = computed(() => items.value.reduce((sum, item) => sum + item.price_cents, 0))
  
  function add(lesson) {
    items.value.push(lesson)
  }
  
  function remove(lessonId) {
    items.value = items.value.filter(item => item.id !== lessonId)
  }
  
  return { items, count, total, add, remove }
})