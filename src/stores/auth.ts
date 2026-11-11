import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  function login(credentials: any) {
    isAuthenticated.value = true
    user.value = credentials
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
  }

  return { user, isAuthenticated, login, logout }
})
