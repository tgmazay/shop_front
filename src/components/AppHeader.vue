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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Логотип -->
      <router-link to="/" class="flex flex-col select-none pl-10 md:pl-0">
        <span class="text-xs font-light tracking-[0.35em] text-stone-400 uppercase">VideoLessons</span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase mt-0.5 text-stone-900">Foodphotostylist</span>
      </router-link>

      <!-- Десктопное меню с выпадашками -->
      <nav class="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-stone-500 h-full">
        <router-link to="/" class="hover:text-stone-900 transition py-8">Главная</router-link>
        
        <router-link to="/lessons" class="hover:text-stone-900 transition py-8">Уроки</router-link>
        <router-link to="/club" class="hover:text-stone-900 transition py-8">Клуб</router-link>        

        <!-- Выпадающее меню: Услуги (Исправлено на тег span, так как это просто триггер ховера) -->
        <div class="relative group h-full flex items-center">
          <span class="hover:text-stone-900 transition flex items-center gap-1 py-8 cursor-pointer">
            Услуги
            <span class="text-[10px] lowercase text-stone-400 group-hover:text-stone-900 transition duration-200">▼</span>
          </span>
          <div class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-xl p-6 w-64 space-y-4 hidden group-hover:block transition z-50">
            <router-link to="/services/foodstyling" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">Фудстайлинг</router-link>
            <router-link to="/services/foodphoto" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">Фудфотосъемка</router-link>
            <router-link to="/services/training" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">Персональные занятия</router-link>
          </div>
        </div>

        <!-- Выпадающее меню: Портфолио -->
        <div class="relative group h-full flex items-center">
          <router-link to="/portfolio" class="hover:text-stone-900 transition flex items-center gap-1 py-8">
            Портфолио
            <span class="text-[10px] lowercase text-stone-400 group-hover:text-stone-900 transition duration-200">▼</span>
          </router-link>
          <div class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-xl p-6 w-64 space-y-4 hidden group-hover:block transition z-50">
            <router-link to="/restaurants" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">съемка для ресторанов</router-link>
            <router-link to="/foodstyling" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">фудстайлинг</router-link>
            <router-link to="/imagery" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">имиджевая съемка</router-link>
          </div>
        </div>

        <router-link to="/about" class="hover:text-stone-900 transition py-8">Обо мне</router-link>
      </nav> <!-- ТЕГ БЫЛ НЕ ЗАКРЫТ -->

      <!-- Кнопка входа и корзина -->
      <div class="flex items-center gap-6">
        <!-- Не забудьте импортировать CartLink в секцию <script> -->
        <CartLink class="hidden md:inline-flex" /> 
        
        <router-link 
          to="/signin"
          class="hidden md:block border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-6 py-3 hover:bg-stone-900 hover:text-white transition duration-300"
        >
          Вход в кабинет
        </router-link>
      </div>
    </div>
  </header>
</template>
