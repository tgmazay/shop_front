<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarousel } from '@/composables/useCarousel'

const router = useRouter()

const currentYear = new Date().getFullYear()
const beginYear = 2013

// «Здесь вас ждут» — карточки с иконками
const clubFeatures = [
  {
    icon: 'layers',
    title: 'Пошаговые техники',
    description: 'Фуд-стайлинг разобран на понятные шаги: от подготовки продукта до финального кадра.'
  },
  {
    icon: 'sparkles',
    title: 'Композиционные идеи',
    description: 'Практические лайфхаки и приёмы, которые применяются сразу же в вашей съёмке.'
  },
  {
    icon: 'radio',
    title: 'Прямые эфиры',
    description: 'Регулярные трансляции с разборами, ответами на вопросы и живым процессом работы.'
  },
  {
    icon: 'image',
    title: 'Подборки для вдохновения',
    description: 'Курируемые референсы и мудборды, которые помогают растить визуальный вкус.'
  },
  {
    icon: 'message',
    title: 'Ответы на вопросы',
    description: 'Материалы и рекомендации, которые повышают ваш уровень месяц за месяцем.'
  },
  {
    icon: 'book',
    title: 'База знаний и пресеты',
    description: 'Архив уроков, конспектов и готовых пресетов — всё в одном закрытом пространстве.'
  }
]

// Шаги «Как это работает»
const steps = [
  {
    number: '01',
    title: 'Оформляете подписку',
    description: 'Выбираете удобный формат оплаты и получаете мгновенный доступ к платформе клуба.'
  },
  {
    number: '02',
    title: 'Погружаетесь в контент',
    description: 'Каждую неделю вас ждут новые уроки, эфиры и подборки — от основ плейтинга до авторских решений.'
  },
  {
    number: '03',
    title: 'Растёте в сообществе',
    description: 'Показываете работы, получаете обратную связь и окружение профессионалов, которое тянет вверх.'
  }
]

// Тарифы
const plans = [
  {
    title: 'Подписка на месяц',
    subtitle: 'Гибкий старт',
    price: '2 900 ₽',
    period: '/мес',
    features: [
      'Новый контент каждую неделю',
      'Прямые эфиры и Q&A сессии',
      'Закрытый чат участников',
      'База знаний и пресеты',
      'Отмена в любой момент'
    ],
    action: 'Вступить на месяц',
    popular: false
  },
  {
    title: 'Годовая подписка',
    subtitle: 'Максимальная выгода',
    price: '29 000 ₽',
    period: '/год',
    features: [
      'Всё из месячной подписки',
      '2 месяца в подарок',
      'Доступ к полному архиву эфиров',
      'Приоритет в разборах работ',
      'Скидка на индивидуальные консультации'
    ],
    action: 'Вступить на год',
    popular: true
  }
]

// FAQ
const faqs = [
  {
    question: 'Что именно я получаю после подписки?',
    answer: 'Доступ к закрытому пространству клуба: еженедельные уроки и техники, записи прямых эфиров, базу знаний с пресетами, подборки референсов и чат участников. Всё это открывается сразу после оплаты.'
  },
  {
    question: 'Как проходят прямые эфиры?',
    answer: 'Эфиры идут по расписанию, их анонсируем в чате клуба. Вы можете задать вопрос заранее или в реальном времени. Все трансляции сохраняются в архив — если не получается подключиться, можно посмотреть запись.'
  },
  {
    question: 'Подойдёт ли клуб, если я новичок?',
    answer: 'Да. Контент выстроен по принципу «от простого к сложному»: сначала фундаментальные основы плейтинга и композиции, затем авторские решения. Текущий уровень не имеет значения — важна готовность практиковать.'
  },
  {
    question: 'Можно ли отменить подписку?',
    answer: 'Да, месячную подписку можно отменить в любой момент — доступ сохранится до конца оплаченного периода. Годовая подписка даёт максимум выгоды и включает два месяца в подарок.'
  },
  {
    question: 'Есть ли обратная связь по моим работам?',
    answer: 'Да. В клубах предусмотрены разборы: вы публикуете работу, а в эфирах и чате получаете рекомендации по композиции, свету и стайлингу — именно те, которые нужны вам.'
  }
]

const openFaq = ref(null)
function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index
}

// Карусель «За кулисами клуба» (используем те же фото, что и в портфолио)
const galleryClubImages = [
  'https://optim.tildacdn.com/tild6230-6434-4462-a236-313230656436/-/resize/380x/-/format/webp/Studio_Session-1021-.jpg.webp',
  'https://optim.tildacdn.com/tild6261-3230-4365-b131-623061666262/-/resize/456x/-/format/webp/Studio_Session-11676.jpg.webp',
  'https://optim.tildacdn.com/tild3138-6335-4634-b464-336139303937/-/resize/456x/-/format/webp/Studio_Session-3398_.jpg.webp',
  'https://optim.tildacdn.com/tild3737-3038-4463-a664-356432393064/-/resize/456x/-/format/webp/IMG_8323_small.jpg.webp',
  'https://optim.tildacdn.com/tild3263-3137-4930-b237-376538626639/-/resize/380x/-/format/webp/Studio_Session-13659.jpg.webp',
  'https://optim.tildacdn.com/tild3835-6666-4339-b664-333338663366/-/resize/456x/-/format/webp/Studio_Session-1874_.jpg.webp'
]
const carouselClub = useCarousel(galleryClubImages)

// Цитаты участников
const clubVoices = [
  {
    photo: 'https://static.tildacdn.com/tild3438-3166-4839-b137-653339613136/IMG_5596.JPG',
    name: 'Алёна Синицына',
    role: 'Фудстилист / фудфотограф',
    location: 'Москва, Россия',
    text: 'Очень ценю структурированные понятные уроки, обратную связь, терпение и поддержку. Секретики и лайфхаки, которые не найдёшь в бесплатных источниках.'
  },
  {
    photo: 'https://static.tildacdn.com/tild3462-3935-4431-b361-623732353162/photo_2024-05-23_14-.jpg',
    name: 'Светлана Дэвис',
    role: 'Фудфотограф',
    location: 'South Florida, USA',
    text: 'Знания, полученные в клубе, значительно сократили время, которое я тратила на составление композиций. Теория, которая применяется и в работе, и в жизни.'
  },
  {
    photo: 'https://static.tildacdn.com/tild6134-6238-4564-b334-663663366262/000001.jpg',
    name: 'Алиса Новгородцева',
    role: 'Фудфотограф',
    location: 'Ростов-на-Дону, Россия',
    text: 'Каждый эфир и разбор органично дополняют друг друга и не повторяются. Иду на новое обучение каждый раз с большим интересом.'
  }
]

// Иконки для clubFeatures
const icons = {
  layers: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l9 5-9 5-9-5 9-5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9 5 9-5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17l9 5 9-5"/>',
  sparkles: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/>',
  radio: '<circle cx="12" cy="12" r="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.9 19.1a10 10 0 010-14.2M7.8 16.2a6 6 0 010-8.4M16.2 7.8a6 6 0 010 8.4M19.1 4.9a10 10 0 010 14.2"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15l-5-5L5 21"/>',
  message: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>',
  book: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>'
}

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style>
:root {
  --slide-w: calc(100% - 0px);
}
@media (min-width: 768px) {
  :root {
    --slide-w: calc(33.3333% - 16px);
  }
}
</style>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">

    <!-- 1. Hero Section (как на скриншоте: тёмный фон + логотип) -->
    <section class="relative bg-slate-950 text-white flex items-center justify-center overflow-hidden min-h-125 lg:min-h-150">
      <!-- Декоративное свечение -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-indigo-900/30 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 right-1/4 w-100 h-100 bg-amber-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center space-y-8">
        <!-- Логотип (CSS-версия. Замените на <img src="/logo.png">, если есть файл) -->
        <div class="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto">
          <div class="absolute inset-0 rounded-full border-2 border-indigo-300/50"></div>
          <div class="absolute inset-8 rounded-full border border-indigo-300/30"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="font-serif italic text-4xl lg:text-5xl text-indigo-200 leading-none">Plate Geometry</span>
            <span class="tracking-[0.5em] text-sm lg:text-base text-indigo-300 mt-3">CLUB</span>
          </div>
        </div>

        <h1 class="text-4xl lg:text-6xl leading-[1.1] tracking-tight uppercase">
          Plate Geometry Club
        </h1>

        <p class="text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
          Закрытое пространство, где идеи становятся воплощённой эстетикой.
          Эксклюзивный контент каждую неделю — от основ плейтинга до авторских решений профессионала.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button
            @click="scrollToSection('plans')"
            class="w-full sm:w-auto px-6 py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-amber-900/50 hover:-translate-y-0.5 uppercase tracking-wide text-sm"
          >
            Выбрать подписку
          </button>
          <button
            @click="scrollToSection('about')"
            class="w-full sm:w-auto px-6 py-4 bg-transparent text-slate-300 font-bold rounded-lg border-2 border-slate-300 hover:border-white hover:text-white transition-all duration-300 uppercase tracking-wide text-sm"
          >
            Что внутри клуба
          </button>
        </div>
      </div>
    </section>

    <!-- 2. О клубе -->
    <section id="about" class="py-12 lg:py-16 bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl lg:text-5xl text-slate-500 uppercase tracking-tight">
              Plate Geometry Club
            </h2>
            <p class="text-lg text-slate-600 leading-relaxed text-justify">
              <span class="font-bold text-slate-700">Plate Geometry Club</span> — пространство, в котором через практические техники и уроки, соединённые с теоретическими вкраплениями, мы глубоко проникаем в композиционную суть стилизации блюд.
            </p>
            <p class="text-lg text-slate-600 leading-relaxed text-justify">
              Получай эксклюзивный контент каждую неделю — от основ плейтинга до авторских решений от профессионала.
            </p>
            <p class="text-lg text-slate-600 leading-relaxed text-justify">
              Подписка открывает доступ к закрытому клубу, где идеи становятся воплощённой эстетикой.
            </p>
            <div class="flex items-center gap-4 pt-2">
              <div class="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-slate-600 text-2xl font-bold shrink-0">✓</div>
              <div>
                <div class="font-bold text-slate-600 text-xl">500+ участников</div>
                <div class="text-sm text-slate-500">уже изменили свою карьеру</div>
              </div>
            </div>
          </div>

          <!-- Шаги «Как это работает» -->
          <div class="space-y-6">
            <div
              v-for="step in steps"
              :key="step.number"
              class="group flex gap-6 p-6 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-slate-400 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div class="text-4xl lg:text-5xl font-black text-amber-500/70 group-hover:text-amber-500 transition-colors shrink-0">
                {{ step.number }}
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-600 mb-2 group-hover:text-amber-600 transition-colors">
                  {{ step.title }}
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Здесь вас ждут -->
    <section id="features" class="py-12 lg:py-16 bg-slate-50">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <h2 class="text-3xl lg:text-5xl text-slate-500 mb-2 uppercase tracking-tight">
            Здесь вас ждут
          </h2>
          <p class="text-lg text-slate-600">
            Всё, что нужно для системного роста в фуд-стайлинге
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in clubFeatures"
            :key="index"
            class="group flex flex-col p-6 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300"
          >
            <div class="w-12 h-12 rounded-lg bg-slate-600 group-hover:bg-amber-500 text-white flex items-center justify-center mb-4 transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="icons[feature.icon]"></svg>
            </div>
            <h3 class="text-lg font-bold text-slate-600 mb-2 group-hover:text-amber-600 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Карусель «За кулисами клуба» -->
    <section class="py-4 bg-slate-100 overflow-hidden">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <h2 class="text-3xl lg:text-5xl text-slate-500 mb-2 uppercase tracking-tight">
            За кулисами клуба
          </h2>
          <p class="text-lg text-slate-500">
            Атмосфера, в которой рождаются кадры
          </p>
        </div>
        <div class="relative">
          <button @click="carouselClub.prevSlide" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg shadow-black/30 items-center justify-center text-white hover:bg-white/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="carouselClub.nextSlide" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg shadow-black/30 items-center justify-center text-white hover:bg-white/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          <div class="overflow-hidden rounded-xl pb-8 -mb-8">
            <div
              class="flex gap-6"
              :class="{ 'transition-transform duration-500 ease-out': !carouselClub.disableTransition }"
              :style="{
                touchAction: 'pan-y',
                transform: `translateX(calc(-${carouselClub.currentIndex} * (var(--slide-w) + ${carouselClub.GAP}px) + ${carouselClub.dragOffset}px))`
              }"
              @transitionend="carouselClub.handleTransitionEnd"
              @touchstart.passive="carouselClub.onTouchStart"
              @touchmove.passive="carouselClub.onTouchMove"
              @touchend="carouselClub.onTouchEnd"
              @touchcancel="carouselClub.onTouchCancel"
            >
              <div
                v-for="(imgUrl, index) in carouselClub.displayImages"
                :key="`club-${index}-${imgUrl}`"
                class="shrink-0 w-(--slide-w) aspect-9/14 md:aspect-3/3 rounded-xl overflow-hidden border-2 border-slate-600 shadow-lg"
              >
                <img :src="imgUrl" alt="Club life" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(img, index) in galleryClubImages"
            :key="index"
            @click="carouselClub.goToSlide(index + carouselClub.CLONES)"
            class="h-2 rounded-full transition-all duration-300"
            :class="carouselClub.activeDot === index ? 'bg-slate-500 w-8' : 'bg-slate-300 w-2'"
          ></button>
        </div>
      </div>
    </section>

    <!-- 5. Тарифы -->
    <section id="plans" class="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <h2 class="text-3xl lg:text-5xl text-slate-600 mb-4 uppercase tracking-tight">
            Форматы подписки
          </h2>
          <p class="text-lg text-slate-600">
            Выберите удобный ритм — месяц или год с выгодой
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            v-for="plan in plans"
            :key="plan.title"
            class="relative flex flex-col bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            :class="{ 'ring-2 ring-amber-500 ring-offset-2': plan.popular }"
          >
            <div v-if="plan.popular" class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-md">
                🔥 Выгодно
              </span>
            </div>
            <div class="p-8 grow space-y-6">
              <div>
                <p class="text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">{{ plan.subtitle }}</p>
                <h3 class="text-2xl font-black text-slate-600">{{ plan.title }}</h3>
              </div>
              <div class="border-t-2 border-dashed border-indigo-100"></div>
              <ul class="space-y-3">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="p-8 bg-white border-indigo-100">
              <div class="text-3xl font-black text-slate-600 mb-6">
                {{ plan.price }}<span class="text-base font-bold text-slate-400">{{ plan.period }}</span>
              </div>
              <button
                @click="router.push('/checkout')"
                class="w-full py-4 px-6 font-bold rounded-lg transition-all duration-300 uppercase tracking-wide text-sm"
                :class="plan.popular
                  ? 'bg-slate-600 text-white hover:bg-amber-600 shadow-lg'
                  : 'bg-white text-slate-600 border-2 border-slate-600 hover:bg-slate-600 hover:text-white'"
              >
                {{ plan.action }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Голоса клуба -->
    <section class="py-12 lg:py-16 bg-slate-50">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <h2 class="text-3xl lg:text-5xl text-slate-500 mb-2 uppercase tracking-tight">
            Голоса клуба
          </h2>
          <p class="text-lg text-slate-600">
            Реальные люди, реальные успехи
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="voice in clubVoices"
            :key="voice.name"
            class="flex flex-col h-full p-8 rounded-2xl bg-white border border-indigo-100 hover:bg-white hover:shadow-xl hover:border-slate-100 transition-all duration-300"
          >
            <div class="flex items-center gap-1 mb-6">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-slate-700 leading-relaxed mb-8 italic">
              "{{ voice.text }}"
            </p>
            <div class="flex items-center gap-4 mt-auto">
              <img :src="voice.photo" :alt="`Фото: ${voice.name}`" class="w-12 h-12 rounded-full object-cover shrink-0">
              <div class="grow min-w-0">
                <div class="font-bold text-slate-600">{{ voice.name }}</div>
                <div class="text-sm text-slate-500">{{ voice.role }}</div>
                <div class="text-xs text-amber-600 font-medium">{{ voice.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. FAQ -->
    <section id="faq" class="py-12 lg:py-16 bg-white">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-8 lg:mb-12">
          <h2 class="text-3xl lg:text-5xl text-slate-500 mb-2 uppercase tracking-tight">
            Частые вопросы
          </h2>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="rounded-xl border-2 transition-all duration-300"
            :class="openFaq === index ? 'border-slate-400 bg-white shadow-xl' : 'border-slate-200 bg-slate-50'"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between gap-4 p-6 text-left"
            >
              <span class="font-bold text-slate-600">{{ faq.question }}</span>
              <svg
                class="w-5 h-5 shrink-0 text-amber-500 transition-transform duration-300"
                :class="{ 'rotate-180': openFaq === index }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-300"
              :class="openFaq === index ? 'max-h-96' : 'max-h-0'"
            >
              <p class="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Final CTA Section -->
    <section class="pt-10 lg:pt-12 pb-12 lg:pb-16 bg-slate-600 text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-900/30 via-slate-600 to-slate-600"></div>
      <div class="relative max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-5xl mb-6">
          Готовы стать частью <br>Plate Geometry Club?
        </h2>
        <p class="text-lg text-white mb-10 max-w-2xl mx-auto">
          Подписка открывает доступ к закрытому клубу, где идеи становятся воплощённой эстетикой.
          Начните уже на этой неделе.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button
            @click="router.push('/checkout')"
            class="px-8 py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/50 hover:-translate-y-0.5 min-w-65 uppercase tracking-wide text-sm"
          >
            Вступить в клуб
          </button>
          <button
            @click="scrollToSection('plans')"
            class="px-8 py-4 bg-transparent text-slate-300 font-bold rounded-lg border-2 border-slate-300 hover:border-white hover:text-white transition-all duration-300 min-w-65 uppercase tracking-wide text-sm"
          >
            Смотреть тарифы
          </button>
        </div>
      </div>
    </section>
  </div>
</template>