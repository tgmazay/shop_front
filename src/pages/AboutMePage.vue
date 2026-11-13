<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSubmit() {
  // Здесь будет подключение к Go API
  console.log('Заявка отправлена!')
  alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    
    <!-- 1. Секция: Обо мне -->
    <section class="py-12 lg:py-24 bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <!-- Текст -->
          <div class="order-2 lg:order-1 space-y-6">
            <h1 class="text-3xl lg:text-5xl text-slate-600 uppercase tracking-tight">
              Обо мне
            </h1>
            <div class="space-y-4 text-lg text-slate-600 leading-relaxed text-justify">
              <p>
                Привет, я фудстилист и фудфотограф <span class="font-bold text-slate-700">Наталья Цыганова</span>.
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
            </div>
            
            <div class="flex flex-wrap gap-4 pt-4">
              <router-link 
                to="/portfolio" 
                class="px-6 py-4 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm"
              >
                Портфолио
              </router-link>
              <router-link 
                to="/services" 
                class="px-6 py-4 bg-transparent text-slate-600 font-bold rounded-lg border-2 border-slate-600 hover:bg-slate-600 hover:text-white transition-all duration-300 uppercase tracking-wide text-sm"
              >
                Услуги
              </router-link>
            </div>
          </div>

          <!-- Фото -->
          <div class="order-1 lg:order-2">
            <div class="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl aspect-[3/4] lg:aspect-[4/5] group">
              <img 
                src="https://optim.tildacdn.com/tild3735-6561-4335-b739-333064303966/-/resize/840x/-/format/webp/039.jpg.webp" 
                alt="Наталья Цыганова" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              >
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. Секция: Геометрия тарелки -->
    <section class="py-12 lg:py-24 bg-slate-50">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <!-- Фото -->
          <div class="order-1">
            <div class="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl aspect-[3/4] lg:aspect-[4/5] group">
              <img 
                src="https://static.tildacdn.com/tild6436-6530-4262-b466-366663373464/Studio_Session-10175.jpg" 
                alt="Геометрия тарелки" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              >
            </div>
          </div>

          <!-- Текст -->
          <div class="order-2 space-y-6">
            <h2 class="text-3xl lg:text-5xl text-slate-600 uppercase tracking-tight">
              Геометрия тарелки
            </h2>
            <div class="space-y-4 text-lg text-slate-600 leading-relaxed text-justify">
              <p>
                «Геометрия тарелки» — мой авторский метод, которым я смогла описать созидательный интуитивный навык конструкциями математической базы и композиционных правил.
              </p>
              <p>
                Благодаря набору своих навыков и интересов, а именно техническому образованию, ученой степени в физико-математических науках, гуманитарному складу ума и художественному видению, я смогла сформулировать и оформить простой и доступный каждому способ обучения процессу стилизации еды.
              </p>
              <p class="text-xl font-bold text-amber-600 italic leading-relaxed border-l-4 border-amber-500 pl-4 my-6">
                Облечь в форму бесформенное, разложить сложное в последовательность простых правил, сделать видимым неочевидное.
              </p>
              <p>
                Я покажу вам, как фундаментальные знания создают необходимую основу для творчества и создают возможности для освобождения вашего таланта и уникальности.
              </p>
            </div>
            
            <div class="flex flex-wrap gap-4 pt-4">
              <router-link 
                to="/lessons" 
                class="px-6 py-4 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm"
              >
                К урокам
              </router-link>
              <router-link 
                to="/training" 
                class="px-6 py-4 bg-transparent text-slate-600 font-bold rounded-lg border-2 border-slate-600 hover:bg-slate-600 hover:text-white transition-all duration-300 uppercase tracking-wide text-sm"
              >
                Персональные занятия
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. Секция: Plate Geometry Club -->
    <section class="py-12 lg:py-24 bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <!-- Текст -->
          <div class="order-2 lg:order-1 space-y-6">
            <h2 class="text-3xl lg:text-5xl text-slate-600 uppercase tracking-tight">
              Plate Geometry Club
            </h2>
            <p class="text-lg text-slate-600 leading-relaxed text-justify">
              Plate Geometry Club — пространство, в котором через практические техники и уроки, соединенные с теоретическими вкраплениями, мы глубоко проникаем в композиционную суть стилизации блюд.
            </p>
            
            <ul class="space-y-4 pt-2">
              <li class="flex items-start gap-4 text-slate-700 font-medium">
                <svg class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Пошаговые техники фуд‑стайлинга</span>
              </li>
              <li class="flex items-start gap-4 text-slate-700 font-medium">
                <svg class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Композиционные идеи и практические лайфхаки</span>
              </li>
              <li class="flex items-start gap-4 text-slate-700 font-medium">
                <svg class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Прямые эфиры и подборки для вдохновения</span>
              </li>
              <li class="flex items-start gap-4 text-slate-700 font-medium">
                <svg class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Ответы на ваши вопросы и материалы для повышения уровня визуального мастерства</span>
              </li>
            </ul>

            <p class="text-sm text-slate-500 uppercase tracking-widest font-bold pt-4">
              Подписка открывает доступ к закрытому клубу, где идеи становятся воплощенной эстетикой.
            </p>

            <div class="pt-4">
              <router-link 
                to="/club" 
                class="inline-block px-8 py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-amber-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm"
              >
                Вступить в клуб
              </router-link>
            </div>
          </div>

          <!-- Фото -->
          <div class="order-1 lg:order-2">
            <div class="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl aspect-[3/4] lg:aspect-[4/5] group">
              <img 
                src="https://optim.tildacdn.com/tild6130-3430-4334-b332-336431383832/-/format/webp/Plate_Geometry_Club_.jpg.webp" 
                alt="Plate Geometry Club" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              >
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 4. Секция: Форма заявки -->
    <section class="py-12 lg:py-24 bg-slate-50">
      <div class="max-w-2xl mx-auto px-6">
        <div class="bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 sm:p-10 space-y-8">
          
          <div class="text-center space-y-3">
            <h3 class="text-3xl font-black text-slate-600 uppercase tracking-tight">
              Оставить заявку
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              Заполните форму ниже, и я свяжусь с вами для обсуждения деталей
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <!-- Имя -->
            <div class="space-y-1.5">
              <label for="name" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Имя</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Ваше имя"
                class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
            </div>

            <!-- Email -->
            <div class="space-y-1.5">
              <label for="email" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">E-mail</label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
            </div>

            <!-- Телефон -->
            <div class="space-y-1.5">
              <label for="phone" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Телефон</label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="+7 (999) 000-00-00"
                class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
            </div>

            <!-- Интересующая услуга -->
            <div class="space-y-1.5">
              <label for="service" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Интересующая услуга</label>
              <textarea
                id="service"
                rows="3"
                placeholder="фудфотосъемка, фудстайлинг, обучение: курсы, вебинары, видеоуроки, воркшопы или другое"
                class="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder-slate-400 resize-none"
              ></textarea>
            </div>

            <!-- Чекбоксы -->
            <div class="space-y-4 pt-2">
              <label class="flex items-start gap-3 cursor-pointer select-none group">
                <div class="relative shrink-0 mt-0.5">
                  <input type="checkbox" required class="peer sr-only" />
                  <div class="w-5 h-5 rounded border-2 border-slate-300 bg-white transition-all duration-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 group-hover:border-slate-400"></div>
                  <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition">
                  Я согласен(-на) с <a href="#" class="underline decoration-slate-300 hover:decoration-amber-500 transition-colors">политикой конфиденциальности</a>
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer select-none group">
                <div class="relative shrink-0 mt-0.5">
                  <input type="checkbox" required class="peer sr-only" />
                  <div class="w-5 h-5 rounded border-2 border-slate-300 bg-white transition-all duration-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 group-hover:border-slate-400"></div>
                  <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition">
                  Я согласен(-на) на обработку персональных данных
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer select-none group">
                <div class="relative shrink-0 mt-0.5">
                  <input type="checkbox" class="peer sr-only" />
                  <div class="w-5 h-5 rounded border-2 border-slate-300 bg-white transition-all duration-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 group-hover:border-slate-400"></div>
                  <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition">
                  Я согласен(-на) на рекламную рассылку
                </span>
              </label>
            </div>

            <!-- Кнопка отправки -->
            <button
              type="submit"
              class="w-full py-4 px-6 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 uppercase tracking-wide text-sm mt-4"
            >
              Оставить заявку
            </button>

          </form>
        </div>
      </div>
    </section>

  </div>
</template>