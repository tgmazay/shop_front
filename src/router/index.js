import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue' // Проверка алиаса @
import AboutMePage from '@/pages/AboutMePage.vue' // Проверка алиаса @
import ClubPage from '@/pages/ClubPage.vue' // Проверка алиаса @
import SignInPage from '@/pages/SignInPage.vue' // Проверка алиаса @
import SignUpPage from '@/pages/SignUpPage.vue' // Проверка алиаса @
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue' // Проверка алиаса @
import ChangePasswordPage from '@/pages/ChangePasswordPage.vue' // Проверка алиаса @
import LessonsPage from '@/pages/LessonsPage.vue' // Проверка алиаса @

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutMePage },
  { path: '/club', component: ClubPage },
  { path: '/signin', component: SignInPage },
  { path: '/signup', component: SignUpPage },
  { path: '/forgotpassword', component: ForgotPasswordPage },
  { path: '/changepassword', component: ChangePasswordPage },
  { path: '/lessons', component: LessonsPage },
]

export default createRouter({
  history: createWebHistory(),
  routes
})












  