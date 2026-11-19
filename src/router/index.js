import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue' // Проверка алиаса @
import AboutMePage from '@/pages/AboutMePage.vue' // Проверка алиаса @
import ClubPage from '@/pages/ClubPage.vue' // Проверка алиаса @
import LoginPage from '@/pages/LoginPage.vue' // Проверка алиаса @
import RegisterPage from '@/pages/RegisterPage.vue' // Проверка алиаса @
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue' // Проверка алиаса @
import ChangePasswordPage from '@/pages/ChangePasswordPage.vue' // Проверка алиаса @
import LessonsPage from '@/pages/LessonsPage.vue' // Проверка алиаса @
import YandexVerificationPage from '@/pages/YandexVerificationPage.vue' // Проверка алиаса @
import LegalDocumentPage from '@/pages/LegalDocumentPage.vue' // Проверка алиаса @
import AccountLayout from '@/views/AccountLayout.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import LibraryPage from '@/views/LibraryPage.vue'
import CartPage from '@/views/CartPage.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutMePage },
  { path: '/club', component: ClubPage },
  { path: '/login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/register', component: RegisterPage, meta: { guestOnly: true } },
  { path: '/forgotpassword', component: ForgotPasswordPage },
  { path: '/changepassword', component: ChangePasswordPage },
  { path: '/lessons', component: LessonsPage },
  { path: '/auth/yandex/verification', component: YandexVerificationPage },
  { path: '/docs/:slug', name: 'legal-document', component: LegalDocumentPage },
  {
    path: '/account',
    component: AccountLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/account/profile' },
      { path: 'profile', component: ProfilePage },
      { path: 'library', component: LibraryPage },
      { path: 'cart', component: CartPage },
    ],
  },
  // Старые ссылки на отдельный layout ведём в профиль
  { path: '/account/layout', redirect: '/account/profile' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  // Личный кабинет, корзина и библиотека доступны только после входа
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  // Пока пользователь не вышел из аккаунта, вход и регистрация недоступны
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { path: '/account/profile' }
  }

  return true
})

export default router
