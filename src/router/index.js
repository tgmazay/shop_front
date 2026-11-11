import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue' // Проверка алиаса @
import AboutMePage from '@/pages/AboutMePage.vue' // Проверка алиаса @

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutMePage },
  // { path: '/catalog', component: () => import('@/pages/CatalogPage.vue') },
  // { path: '/catalog', component: () => import('@/pages/CatalogPage.vue') } // Можно добавлять по мере создания
]

export default createRouter({
  history: createWebHistory(),
  routes
})












  