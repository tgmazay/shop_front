<script setup>
function handleSubmit() {
  alert('Заявка отправлена! (Здесь будет подключение к Go API)')
}
</script>

<template>
  <div class="min-h-screen bg-white">
    
    <!-- 1. Секция: Обо мне -->
    <section class="border-b border-stone-100 py-16 lg:py-24">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <!-- Заголовок (на мобильном 2-й, на десктопе 1-й) -->
          <div class="md:col-span-1 order-2 md:order-1">
            <h1 class="text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-stone-900">
              Обо мне
            </h1>
          </div>
          
          <!-- Текст (на мобильном 3-й, на десктопе 2-й) -->
          <div class="md:col-span-2 order-3 md:order-2 text-justify hyphens-auto space-y-6 text-stone-600 leading-relaxed text-sm lg:text-base font-light">
            <p>
              Привет, я фудстилист и фудфотограф <strong class="text-stone-900 font-medium">Наталья Цыганова</strong>.
            </p>
            <p>
              С 2013 года я занимаюсь профессиональным стайлингом и фотосъемкой еды. Я начинала свой путь с фудфотографии. Сейчас я в основном работаю как фудстилист над созданием образов для рекламных кампаний производителей продуктов питания и напитков.
            </p>
            <p>
              Я осуществляю как подготовку продуктов, напитков и композиций на основе готовой визуализации, так и разработку образов для рекламной фото- и видеосъемки, съемки на упаковку, съемки меню и имиджевой съемки для социальных сетей, а также создаю авторские рецепты и продумываю все детали подачи блюд, максимально используя все мои знания продуктов, сочетаемости их форм, цветов, текстур и вкусов.
            </p>
            <p>
              Мои клиенты — это маркетинговые и рекламные агентства, бренды, рестораны, фермеры, шеф-повара и кондитеры, а также все те, для кого важна визуальная презентация своего продукта. Я участвую в рекламных съемках и иных проектах фуд-индустрии в качестве фудстилиста, сотрудничаю с российскими и международными рекламными агентствами, продакшн-студиями, производителями продукции и ресторанами, а также провожу мастер-классы, обучаю стайлингу блюд и дизайну еды.
            </p>
            
            <!-- Кнопки (зацентрованы) -->
            <div class="flex flex-wrap justify-center gap-4 pt-6">
              <router-link to="/portfolio" class="border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-8 py-3 hover:bg-stone-900 hover:text-white transition duration-300">
                Портфолио
              </router-link>
              <router-link to="/services" class="border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-8 py-3 hover:bg-stone-900 hover:text-white transition duration-300">
                Услуги
              </router-link>
            </div>
          </div>
          
          <!-- Фото (на мобильном 1-е, на десктопе 3-е) -->
          <div class="md:col-span-1 order-1 md:order-3">
            <div class="aspect-3/4 bg-stone-100 w-full flex items-center justify-center overflow-hidden">
              <img src="https://optim.tildacdn.com/tild3735-6561-4335-b739-333064303966/-/resize/840x/-/format/webp/039.jpg.webp" class="w-full h-full object-cover" alt="Наталья Цыганова">
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- 2. Секция: Геометрия тарелки -->
    <section class="py-16 lg:py-24 bg-stone-50">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <!-- Заголовок -->
          <div class="md:col-span-1 order-2 md:order-1">
            <h2 class="text-2xl lg:text-3xl font-light tracking-[0.15em] uppercase text-stone-900">
              Геометрия тарелки
            </h2>
          </div>
          
          <!-- Текст -->
          <div class="md:col-span-2 order-3 md:order-2 space-y-6">
            <div class="text-justify hyphens-auto space-y-4 text-stone-600 leading-relaxed text-sm lg:text-base font-light">
              <p>
                «Геометрия тарелки» — мой авторский метод, которым я смогла описать созидательный интуитивный навык конструкциями математической базы и композиционных правил.
              </p>
              <p>
                Благодаря набору своих навыков и интересов, а именно техническому образованию, ученой степени в физико-математических науках, гуманитарному складу ума и художественному видению, я смогла сформулировать и оформить простой и доступный каждому способ обучения процессу стилизации еды.
              </p>
              <p class="text-stone-900 font-medium italic">
                Облечь в форму бесформенное, разложить сложное в последовательность простых правил, сделать видимым неочевидное.
              </p>
              <p>
                Я покажу вам, как фундаментальные знания создают необходимую основу для творчества и создают возможности для освобождения вашего таланта и уникальности.
              </p>
            </div>
            
            <!-- Кнопки (зацентрованы) -->
            <div class="flex flex-wrap justify-center gap-4 pt-6">
              <router-link to="/lessons" class="border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-8 py-3 hover:bg-stone-900 hover:text-white transition duration-300">
                К урокам
              </router-link>
              <router-link to="/training" class="border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-8 py-3 hover:bg-stone-900 hover:text-white transition duration-300">
                Персональные занятия
              </router-link>
            </div>
          </div>
          
          <!-- Фото -->
          <div class="md:col-span-1 order-1 md:order-3">
            <div class="aspect-3/4 bg-stone-200 w-full flex items-center justify-center overflow-hidden">
              <img src="https://static.tildacdn.com/tild6436-6530-4262-b466-366663373464/Studio_Session-10175.jpg" class="w-full h-full object-cover" alt="Геометрия тарелки">
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- 3. Секция: Plate Geometry Club -->
    <section class="py-16 lg:py-24 border-b border-stone-100">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <!-- Заголовок -->
          <div class="md:col-span-1 order-2 md:order-1">
            <h2 class="text-2xl lg:text-3xl font-light tracking-[0.15em] uppercase text-stone-900">
              Plate Geometry Club
            </h2>
          </div>
          
          <!-- Текст -->
          <div class="md:col-span-2 order-3 md:order-2 space-y-8">
            <p class="text-justify hyphens-auto text-stone-600 leading-relaxed text-sm lg:text-base font-light">
              Plate Geometry Club — пространство, в котором через практические техники и уроки, соединенные с теоретическими вкраплениями, мы глубоко проникаем в композиционную суть стилизации блюд.
            </p>
            <ul class="space-y-4 text-stone-600 text-sm font-light">
              <li class="flex items-start gap-3">
                <span class="text-stone-400 mt-0.5">✦</span>
                <span>пошаговые техники фуд‑стайлинга</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-stone-400 mt-0.5">✦</span>
                <span>композиционные идеи и практические лайфхаки</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-stone-400 mt-0.5">✦</span>
                <span>прямые эфиры и подборки для вдохновения</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-stone-400 mt-0.5">✦</span>
                <span>ответы на ваши вопросы и материалы для повышения уровня визуального мастерства</span>
              </li>
            </ul>
            <p class="text-stone-500 text-xs tracking-widest uppercase pt-2">
              Подписка открывает доступ к закрытому клубу, где идеи становятся воплощенной эстетикой.
            </p>
            
            <div class="flex justify-center pt-4">
              <router-link to="/club" class="inline-block border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-8 py-3 hover:bg-stone-900 hover:text-white transition duration-300">
                Вступить в клуб
              </router-link>
            </div>
          </div>
          
          <!-- Фото -->
          <div class="md:col-span-1 order-1 md:order-3">
            <div class="aspect-3/4 bg-stone-100 w-full flex items-center justify-center overflow-hidden">
              <img src="https://optim.tildacdn.com/tild6130-3430-4334-b332-336431383832/-/format/webp/Plate_Geometry_Club_.jpg.webp" class="w-full h-full object-cover" alt="Plate Geometry Club">
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- 4. Секция: Форма заявки -->
    <section class="py-16 lg:py-24 bg-stone-50">
      <div class="max-w-2xl mx-auto px-6">
        <div class="bg-white p-8 lg:p-12 border border-stone-100 shadow-sm">
          <h3 class="text-xl font-light tracking-[0.15em] uppercase text-stone-900 mb-8 text-center">Оставить заявку</h3>
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label class="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-2">Имя</label>
              <input type="text" class="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-stone-900 transition bg-transparent placeholder-stone-300" placeholder="Ваше имя">
            </div>
            <div>
              <label class="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-2">E-mail</label>
              <input type="email" class="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-stone-900 transition bg-transparent placeholder-stone-300" placeholder="your@email.com">
            </div>
            <div>
              <label class="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-2">Телефон</label>
              <input type="tel" class="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-stone-900 transition bg-transparent placeholder-stone-300" placeholder="+7 (___) ___-__-__">
            </div>
            <div>
              <label class="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-2">Интересующая услуга</label>
              <textarea rows="3" class="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-stone-900 transition bg-transparent resize-none placeholder-stone-300" placeholder="фудфотосъемка, фудстайлинг, обучение: курсы, вебинары, видеоуроки, воркшопы или другое"></textarea>
            </div>
            <div class="space-y-3 pt-4">
              <label class="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required class="mt-1 accent-stone-900">
                <span class="text-[11px] text-stone-500 leading-relaxed group-hover:text-stone-900 transition">Я согласна(ен) с <a href="#" class="underline decoration-stone-300 hover:decoration-stone-900">политикой конфиденциальности</a></span>
              </label>
              <label class="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required class="mt-1 accent-stone-900">
                <span class="text-[11px] text-stone-500 leading-relaxed group-hover:text-stone-900 transition">Я согласна(ен) на обработку персональных данных</span>
              </label>
              <label class="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" class="mt-1 accent-stone-900">
                <span class="text-[11px] text-stone-500 leading-relaxed group-hover:text-stone-900 transition">Я согласна(ен) на рекламную рассылку</span>
              </label>
            </div>
            <button type="submit" class="w-full border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest py-4 hover:bg-stone-900 hover:text-white transition duration-300 mt-6">
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>