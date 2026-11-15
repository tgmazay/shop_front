<script setup>
import { useRouter } from 'vue-router'
import { useCarousel } from '@/composables/useCarousel'

const router = useRouter()

const currentYear = new Date().getFullYear();
const beginYear = 2013
const stats = [
  { value: `${currentYear - beginYear}+`, label: 'лет практики' },
  { value: '500+', label: 'выпускников по миру' },
  { value: '40+', label: 'запусков программ' },
  { value: '98%', label: 'довольных студентов' }
];

const benefits = [
  {
    photo: 'https://optim.tildacdn.com/tild3062-3238-4331-b633-373866373035/-/resize/456x/-/format/webp/1__small.jpg.webp',
    title: 'Уникальная методика',
    description: 'Авторский метод «Геометрия тарелки» превращает интуитивный навык в четкую систему математических и композиционных правил, которую может освоить каждый.'
  },
  {
    photo: 'https://optim.tildacdn.com/tild3565-3166-4665-b462-663463316537/-/resize/456x/-/format/webp/2_small.jpg.webp',
    title: 'Реальный опыт, а не теория',
    description: 'Более ' + (currentYear - beginYear) + ' лет работы с топовыми рекламными агентствами, ресторанами и производителями. Только проверенные техники со сложных съемочных площадок.'
  },
  {
    photo: 'https://optim.tildacdn.com/tild6138-6533-4138-b230-653338386534/-/resize/456x/-/format/webp/3_small.jpg.webp',
    title: 'Закулисные инсайты',
    description: 'Делюсь знаниями, которые не найдёшь в бесплатных источниках. Секреты работы со светом, реквизитом и композицией для создания "дорогого" кадра.'
  },
  {
    photo: 'https://optim.tildacdn.com/tild6531-6439-4764-a139-373635613863/-/resize/380x/-/format/webp/IMG_0537-Edit-Edit-E.jpg.webp',
    title: 'Обратная связь',
    description: 'Личная проверка домашних заданий, детальный разбор ваших работ и поддержка в закрытом сообществе профессионалов. Получите рекомендации, нужные непосредственно вам.'
  }
]

const courses = [
  {
    title: 'Геометрия тарелки',
    subtitle: 'Базовый курс',
    description: 'Фундаментальные основы фудстайлинга и композиции. Пошаговая система от простого к сложному.',
    features: ['12 подробных видеоуроков', 'Домашние задания с проверкой', 'Доступ к материалам навсегда', 'Сертификат об окончании'],
    price: '15 900 ₽',
    action: "Записаться на курс",
    popular: true
  },
  {
    title: 'Plate Geometry Club',
    subtitle: 'Закрытое сообщество',
    description: 'Еженедельный эксклюзивный контент, прямые эфиры, разборы работ и доступ к библиотеке референсов.',
    features: ['Новый контент каждую неделю', 'Прямые эфиры и Q&A сессии', 'Закрытый чат студентов', 'База знаний и пресеты'],
    price: '2 900 ₽/мес',
    action: "Вступить",
    popular: false
  },
  {
    title: 'Индивидуальное обучение',
    subtitle: 'Персональный трек',
    description: 'Работа один на один, разбор ваших текущих проектов, помощь в создании портфолио и развитии карьеры.',
    features: ['Персональная программа', 'Разбор ваших съёмок', 'Помощь с портфолио', 'Карьерная консультация'],
    price: 'от 25 000 ₽',
    action: "Записаться на курс",
    popular: false
  }
]

const testimonials = [
  {
    photo: "https://static.tildacdn.com/tild3438-3166-4839-b137-653339613136/IMG_5596.JPG",
    name: 'Алёна Синицына',
    role: 'Фудстилист/фудфотограф',
    location: 'Москва, Россия',
    text: 'Наташа, спасибо тебе огромное за активную помощь в моем процессе становления и развития как фуд-стилиста! С момента, когда я всерьез взялась за фудстайлинг, прошло всего то пару лет, но за это время я успела поработать и на съемках видео, и на сложных рекламных съемках, научилась собирать очень многое — от салатов до фастфуда. Мне очень нравится это занятие и то, что у меня получается в итоге! Очень тебе благодарна за структурированные понятные уроки, за обратную связь, за терпение, поддержку, ответы на вопросы, секретики, лайфхаки и все остальные нюансы!',
    nickname: "@alena_golden",
    url: "https://alenasinitsyna.ru"
  },
  {
    photo: "https://static.tildacdn.com/tild3462-3935-4431-b361-623732353162/photo_2024-05-23_14-.jpg",
    name: "Светлана Дэвис",
    role: "Фудфотограф",
    location: "South Florida, USA & Medellin, Colombia",
    text: "В большом восторге от курса Геометрия тарелки, дающего уникальные знания по композиции, которые применяешь не только в работе, но и в повседневной жизни. Особенно мне поправилась тема про баланс, например, как совместить большой и маленький предмет в кадре. Это оказалось просто, когда знаком с теорией. Знания, полученные на этом курсе, значительно сократили время, которое я тратила, составляя композиции. Наташа, огромное спасибо за знания!",
    nickname: "@lanadavis_photography",
    url: "https://lanadavisphotography.com"
  },
  {
    photo: "https://static.tildacdn.com/tild6134-6238-4564-b334-663663366262/000001.jpg",
    name: 'Алиса Новгородцева',
    role: 'Фудфотограф',
    location: 'Ростов-на-Дону, Россия',
    text: 'Очень близок системный подход, который нашла в этом обучении. Каждый марафон, вебинар органично дополняют друг друга и не повторяются. Поэтому на новое обучение иду каждый раз с большим интересом! Огромное спасибо за труд, терпение, за подробную обратную связь и самые нужные слова для каждого из нас.',
    nickname: "@a_novgorodceva",
    url: "https://novgorodcevaphoto.ru"
  },
  {
    photo: "https://static.tildacdn.com/tild3865-3763-4135-b164-666436626438/IMG_3458.jpg",
    name: 'Надежда Серова',
    role: 'Фудфотограф',
    location: 'Нижний Новгород, Россия',
    text: 'Изменения в моих работах налицо. На свой первый оливье в рамках учебы я смотрю с горем, он был ужасен. Но сейчас, с уверенностью могу сказать, что сделаю его на 5 баллов. Очень нравится структура обучения, четкое изложение материала, что и зачем должно быть в кадре, последовательный подход. За более чем годовой обучающий процесс по фудстайлингу только в марафонах, в голове уже заложились основы, сложились нейронные связи, и мне хочется непременно учиться дальше. Тем более, что этому модному ремеслу не учит никто.',
    nickname: "@_mir_len_",
    url: "https://nadezhdaserova.ru/"
  },
  {
    photo: "https://static.tildacdn.com/tild3534-3332-4266-b038-383239346361/IMG_4560___.jpg",
    name: "Елена Мирончук",
    role: "Фотограф",
    location: "Обнинск/Москва, Россия",
    text: "Обучаюсь у Наташи второй год, и очень ценю ее уроки и подход в обучении! Здесь столько знаний, новой информации, прекрасной энергетики и просто жизненных полезностей, что хочется постоянно находиться в этой атмосфере, где царит гармония, эстетика и бесконечное творчество, а в чатах всегда тепло и отзывчиво!",
    nickname: "@kirsanova.photo",
    url: "https://api.whatsapp.com/send/?phone=79099487154&text&type=phone_number&app_absent=0&utm_source=ig"
  },
  {
    photo: "https://static.tildacdn.com/tild3464-6239-4562-b464-623436326634/photo_2024-05-01_00-.jpg",
    name: "Ольга Кирсанова",
    role: "Фудфотограф ",
    location: "Москва, Россия",
    text: "Как же это круто, когда на пути не куда-нибудь, а к самой заветной мечте, так везёт с Преподавателем! На курсе так много было новых знаний, много работы, поисков и открытий, постоянных инсайтов. И столько радости от творчества и созидания. Это конечно меняет что-то внутри, а значит хочется изменений и вокруг. Будьте готовы к тому, что по окончании вам захочется улучшать всё: не только ежедневную сервировку, но и окружающее пространство.",
    nickname: "@mironchuk_elen",
    url: "https://kirsanova-foto.com/"
  },
  {
    photo: "https://static.tildacdn.com/tild3432-3962-4564-b161-623735386538/4__.jpeg",
    name: "Катерина Басюк",
    role: "фудфотограф ",
    location: "Украина",
    text: "Наталья, хочу поблагодарить тебя за насыщенные, наполненные знаниями недели обучения! Открыла для себя много нового и интересного, зарядилась творческой энергией и вдохновилась на новые съемки, но уже с продуманным планом и пониманием как правильно снять. Особенно, хочется выделить структурную, математическую подачу материала, организацию по визуализации и удобный формат для качественного усваивания огромного пласта знаний.",
    nickname: "@kateryna.basiuk",
    url: "https://katerynabasiuk.myportfolio.com/work"
  }
]
// КАРУСЕЛЬ С отзывами
const carouselReviews = useCarousel(testimonials)

// КАРУСЕЛЬ С моими фотками
const galleryMyImages = [
  'https://optim.tildacdn.com/tild6230-6434-4462-a236-313230656436/-/resize/380x/-/format/webp/Studio_Session-1021-.jpg.webp',
  'https://optim.tildacdn.com/tild6261-3230-4365-b131-623061666262/-/resize/456x/-/format/webp/Studio_Session-11676.jpg.webp',
  'https://optim.tildacdn.com/tild3138-6335-4634-b464-336139303937/-/resize/456x/-/format/webp/Studio_Session-3398_.jpg.webp',
  'https://optim.tildacdn.com/tild3737-3038-4463-a664-356432393064/-/resize/456x/-/format/webp/IMG_8323_small.jpg.webp',
  'https://optim.tildacdn.com/tild3263-3137-4930-b237-376538626639/-/resize/380x/-/format/webp/Studio_Session-13659.jpg.webp',
  'https://optim.tildacdn.com/tild3835-6666-4339-b664-333338663366/-/resize/456x/-/format/webp/Studio_Session-1874_.jpg.webp',
  'https://optim.tildacdn.com/tild6662-3631-4162-a133-373633646363/-/resize/380x/-/format/webp/Studio_Session-7582_.jpg.webp',
  'https://optim.tildacdn.com/tild3538-3961-4365-b831-316139666366/-/resize/380x/-/format/webp/IMG_4882-1_small.jpg.webp',
  'https://optim.tildacdn.com/tild6232-6264-4334-a133-363930613063/-/resize/456x/-/format/webp/Studio_Session-3366-.jpg.webp',
  'https://optim.tildacdn.com/tild6134-6364-4466-b432-393332633866/-/resize/380x/-/format/webp/IMG_5248-3_small.jpg.webp',
  'https://optim.tildacdn.com/tild6239-6666-4631-b133-313635373362/-/resize/456x/-/format/webp/Studio_Session-5526-.jpg.webp',
  'https://optim.tildacdn.com/tild3039-3764-4337-b831-323936656564/-/resize/456x/-/format/webp/Studio_Session-12102.jpg.webp'
]
// Создаём карусель
const carouselMy = useCarousel(galleryMyImages)

// КАРУСЕЛЬ С фотками студентов
const galleryStudentsImages = [
  'https://optim.tildacdn.com/tild3835-6361-4330-b764-623063343063/-/format/webp/nadezhda_serova_nata.jpg.webp',
  'https://optim.tildacdn.com/tild3361-3936-4431-a562-663737316364/-/format/webp/kristina_voilova_nat.jpeg.webp',
  'https://optim.tildacdn.com/tild3262-3566-4562-b661-653436366464/-/format/webp/nadezhda_serova_nata.JPG.webp',
  'https://optim.tildacdn.com/tild3532-3334-4762-a463-326636343962/-/format/webp/Nadehzda_Serova_5.jpg.webp',
  'https://optim.tildacdn.com/tild3234-6661-4262-b834-623565366235/-/format/webp/_2.jpeg.webp',
  'https://optim.tildacdn.com/tild3936-3433-4239-b031-663839393238/-/format/webp/__2.jpg.webp',
  'https://optim.tildacdn.com/tild6139-3233-4164-a363-396664666239/-/format/webp/_2.jpg.webp',
]
// Создаём карусель
const carouselStudents = useCarousel(galleryStudentsImages)

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style>
/* Базовое значение для мобильных устройств (1 слайд на экране) */
:root {
  --slide-w: calc(100% - 0px);
}

/* Для десктопов пересчитываем сетку строго на 3 слайда с учетом отступов (gap-6 = 24px) */
@media (min-width: 768px) {
  :root {
    --slide-w: calc(33.3333% - 16px);
  }
}
</style>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    
    <!-- 1. Hero Section -->
    <section class="relative bg-slate-600 text-white flex items-center overflow-hidden min-h-125 lg:min-h-150">
      <!-- Фон (видео) остается на всю ширину секции -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <iframe 
            class="absolute min-w-full min-h-full w-auto h-auto"
            style="left: 50%; top: 50%; transform: translate(-50%, -50%) scale(1.3); width: 100vw; height: 100vh; min-width: 177.77vh; min-height: 56.25vw;"
            src="https://www.youtube.com/embed/A3Xv1vfrW3I?autoplay=1&mute=1&loop=1&playlist=A3Xv1vfrW3I&controls=0&modestbranding=1&rel=0&cc_load_policy=0&iv_load_policy=3&hl=en"
            title="Background Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
          ></iframe>
        </div>
        <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>
      
      <div class="relative z-10 max-w-[1600px] mx-auto px-6 w-full py-12">
        <!-- Сетка на 2 колонки -->
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <!-- БЛОК 1: Левая часть (Контент) -->
          <div class="w-full max-w-2xl space-y-8">
            <h1 class="text-4xl lg:text-6xl leading-[1.1] tracking-tight uppercase wrap-break-words">
              Научитесь создавать <br class="hidden sm:block">
              <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">продающие образы</span> <br class="hidden sm:block">
              еды
            </h1>

            <p class="text-lg text-slate-200 leading-relaxed font-light text-justify wrap-break-words">
              Авторские видеокурсы по фудстайлингу от практика с {{ currentYear - beginYear }}-летним опытом. 
              Уникальные методики, проверенные на сотнях часов съемок для крупнейших брендов и ресторанов.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button @click="scrollToSection('courses')" class="min-w-70 px-6 py-4 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-400 transition-all duration-300 shadow-lg shadow-slate-900/50 hover:-translate-y-0.5 text-center">
                Выбрать программу обучения
              </button>
              <button @click="scrollToSection('about')" class="min-w-70 px-6 py-4 bg-transparent text-slate-300 font-bold rounded-lg border-2 border-slate-300 hover:border-white hover:text-white transition-all duration-300 text-center">
                Узнать подробнее
              </button>
            </div>

            <div class="grid grid-cols-4 gap-6 pt-4 border-t border-slate-500 w-full">
              <div v-for="stat in stats" :key="stat.label" class="min-w-0">
                <div class="text-2xl lg:text-3xl font-black text-white truncate">{{ stat.value }}</div>
                <div class="text-sm text-slate-300 mt-1 wrap-break-words">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- БЛОК 2: Правая часть (Карточка) -->
          <!-- На мобилке скрыта (hidden), на десктопе flex -->
          <div class="relative hidden lg:flex justify-end items-center w-full h-full min-h-100">
            <!-- Карточка теперь центрирована вертикально в своей колонке -->
            <div class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl max-w-md w-full">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-slate-600 text-2xl font-bold shrink-0">✓</div>
                <div>
                  <div class="font-bold text-white text-xl">500+ студентов</div>
                  <div class="text-sm text-indigo-200">уже изменили свою карьеру</div>
                </div>
              </div>
              <div class="h-px bg-white/20 w-full mb-6"></div>
              <p class="text-base text-indigo-100 italic leading-relaxed">
                "Этот курс дал мне системное понимание композиции, которого не хватало годами."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. Why Choose Me -->
    <section id="about" class="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <h2 class="text-3xl lg:text-5xl text-slate-500 mb-2 uppercase tracking-tight">
            Почему выбирают меня
          </h2>
          <p class="text-lg text-slate-600">
            Я учу не порядку действий, я привожу в порядок ваши мысли

          </p>
        </div>
        <div class="grid lg:grid-cols-3 gap-8 items-stretch">
          <!-- Колонка 1: фото + текст (в стиле плашки) -->
          <div class="group flex flex-col p-6 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-slate-400 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div class="rounded-lg overflow-hidden mb-3 border border-indigo-100" style="aspect-ratio: 16/9;">
              <img
                src="https://optim.tildacdn.com/tild3735-6561-4335-b739-333064303966/-/resize/840x/-/format/webp/039.jpg.webp"
                alt="Наталья Цыганова"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              >
            </div>
            <h3 class="text-lg font-bold text-slate-600 mb-2 group-hover:text-amber-600 transition-colors">
              Наталья Цыганова
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed text-justify text-left-last pb-4">
              Привет, я фудстилист и фудфотограф Наталья Цыганова.
            </p>
            <p class="text-sm text-slate-600 leading-relaxed text-justify text-left-last pb-4">
              С {{ beginYear }} года я занимаюсь профессиональным стайлингом и фотосъемкой еды. Я начинала свой путь с фудфотографии. Сейчас я в основном работаю как фудстилист   над созданием образов для рекламных кампаний производителей продуктов питания и напитков.
            </p>
            <p class="text-sm text-slate-600 leading-relaxed text-justify text-left-last pb-4">
              Я осуществляю как подготовку продуктов, напитков и композиций на основе готовой визуализации, так и разработку образов для рекламной фото- и видео-съемки, съемки на упаковку, съемки меню и имиджевой съемки для социальных сетей, а также создаю авторские рецепты и продумываю все детали подачи блюд, максимально используя все мои знания продуктов, сочетаемости их форм, цветов, текстур и вкусов.
            </p>
            <p class="text-sm text-slate-600 leading-relaxed text-justify text-left-last">
              Мои клиенты — это маркетинговые и рекламные агентства, бренды, рестораны, фермеры, шеф-повара и кондитеры, а также все те, для кого важна визуальная презентация своего продукта. Я участвую в рекламных съемках и иных проектах фуд-индустрии в качестве фудстилиста, сотрудничаю с российскими и международными рекламными агентствами, продакшн-студиями, производителями продукции и ресторанами, а также провожу мастер-классы, обучаю стайлингу блюд и дизайну еды.
            </p>
          </div>

          <!-- Колонки 2 и 3: плашки 2×2 -->
          <div class="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="group flex flex-col p-6 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-slate-400 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div class="rounded-lg overflow-hidden mb-3 border border-indigo-100" style="aspect-ratio: 16/9;">
                <img
                  :src="benefit.photo"
                  :alt="benefit.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
              </div>
              <h3 class="text-lg font-bold text-slate-600 mb-2 group-hover:text-amber-600 transition-colors">
                {{ benefit.title }}
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- 3. My photo -->
    <section class="py-4 bg-slate-10 overflow-hidden bg-slate-100">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <h2 class="text-3xl lg:text-5xl text-slate-500 mb-2 uppercase tracking-tight">
            Мои работы
          </h2>
          <p class="text-lg text-slate-500">
            Не сомневайся, ты тоже так сможешь!
          </p>
        </div>

        <div class="relative">
          <button @click="carouselMy.prevSlide" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg shadow-black/30 items-center justify-center text-white hover:bg-white/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="carouselMy.nextSlide" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg shadow-black/30 items-center justify-center text-white hover:bg-white/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div class="overflow-hidden rounded-xl pb-8 -mb-8">
            <div
              class="flex gap-6"
              :class="{ 'transition-transform duration-500 ease-out': !carouselMy.disableTransition }"
              :style="{
                touchAction: 'pan-y',
                transform: `translateX(calc(-${carouselMy.currentIndex} * (var(--slide-w) + ${carouselMy.GAP}px) + ${carouselMy.dragOffset}px))`
              }"
              @transitionend="carouselMy.handleTransitionEnd"
              @touchstart.passive="carouselMy.onTouchStart"
              @touchmove.passive="carouselMy.onTouchMove"
              @touchend="carouselMy.onTouchEnd"
              @touchcancel="carouselMy.onTouchCancel"
            >
            <div
              v-for="(imgUrl, index) in carouselMy.displayImages"
              :key="`my-${index}-${imgUrl}`"
              class="shrink-0 w-(--slide-w) aspect-9/14 md:aspect-3/3 rounded-xl overflow-hidden border-2 border-slate-600 shadow-lg"
            >
                <img :src="imgUrl" alt="Portfolio" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>

        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(img, index) in galleryMyImages"
            :key="index"
            @click="carouselMy.goToSlide(index + carouselMy.CLONES)"
            class="h-2 rounded-full transition-all duration-300"
            :class="carouselMy.activeDot === index ? 'bg-slate-500 w-8' : 'bg-slate-300 w-2'"
          ></button>
        </div>
      </div>
    </section>

    <!-- 4. Courses Section -->
    <section id="courses" class="pt-4 lg:pt-6 pb-4 lg:pb-6 ">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <h2 class="text-3xl lg:text-5xl text-slate-600 mb-4 uppercase tracking-tight">
            Программы обучения
          </h2>
          <p class="text-lg text-slate-600">
            Выберите формат, который подходит под ваши цели и текущий уровень
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="course in courses" 
            :key="course.title"
            class="relative flex flex-col bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            :class="{ 'ring-2 ring-amber-500 ring-offset-2': course.popular }"
          >
            <div v-if="course.popular" class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-md">
                🔥 Хит продаж
              </span>
            </div>

            <div class="p-8 grow space-y-6">
              <div>
                <p class="text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">{{ course.subtitle }}</p>
                <h3 class="text-2xl font-black text-slate-600">{{ course.title }}</h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                {{ course.description }}
              </p>

              <div class="border-t-2 border-dashed border-indigo-100 my-4"></div>

              <ul class="space-y-3">
                <li v-for="feature in course.features" :key="feature" class="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="p-8 bg-white border-indigo-100">
              <div class="text-3xl font-black text-slate-600 mb-6">{{ course.price }}</div>
              <button 
                @click="router.push('/checkout')"
                class="w-full py-4 px-6 font-bold rounded-lg transition-all duration-300 uppercase tracking-wide text-sm"
                :class="course.popular 
                  ? 'bg-slate-600 text-white hover:bg-amber-600 shadow-lg' 
                  : 'bg-white text-slate-600 border-2 border-slate-600 hover:bg-slate-600 hover:text-white'"
              >
                {{ course.action }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--5. Student's photo -->
    <section class="py-4 bg-slate-10 overflow-hidden bg-slate-100">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-4">
          <h2 class="text-3xl lg:text-5xl text-slate-600 mb-2 uppercase tracking-tight">
            Работы студентов
          </h2>
          <p class="text-lg text-slate-600">
            Чтобы исчезли последние сомнения
          </p>
        </div>

        <div class="relative">
          <button @click="carouselStudents.prevSlide" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg shadow-black/30 items-center justify-center text-white hover:bg-white/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="carouselStudents.nextSlide" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg shadow-black/30 items-center justify-center text-white hover:bg-white/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div class="overflow-hidden rounded-xl pb-8 -mb-8">
            <div
              class="flex gap-6"
              :class="{ 'transition-transform duration-500 ease-out': !carouselStudents.disableTransition }"
              :style="{
                touchAction: 'pan-y',
                transform: `translateX(calc(-${carouselStudents.currentIndex} * (var(--slide-w) + ${carouselStudents.GAP}px) + ${carouselStudents.dragOffset}px))`
              }"
              @transitionend="carouselStudents.handleTransitionEnd"
              @touchstart.passive="carouselStudents.onTouchStart"
              @touchmove.passive="carouselStudents.onTouchMove"
              @touchend="carouselStudents.onTouchEnd"
              @touchcancel="carouselStudents.onTouchCancel"
            >
              <div
                v-for="(imgUrl, index) in carouselStudents.displayImages"
                :key="`student-${index}-${imgUrl}`"
                class="shrink-0 w-(--slide-w) aspect-9/14 md:aspect-3/3 rounded-xl overflow-hidden border-2 border-slate-600 shadow-lg"
              >
                <img :src="imgUrl" alt="Student work" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(img, index) in galleryStudentsImages"
            :key="index"
            @click="carouselStudents.goToSlide(index + carouselStudents.CLONES)"
            class="h-2 rounded-full transition-all duration-300"
            :class="carouselStudents.activeDot === index ? 'bg-slate-500 w-8' : 'bg-slate-300 w-2'"
          ></button>
        </div>
      </div>
    </section>


    <!-- 6. Testimonials Carousel -->
    <section class="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-white overflow-hidden">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <h2 class="text-3xl lg:text-5xl text-slate-600 mb-2 uppercase tracking-tight">
            Отзывы студентов
          </h2>
          <p class="text-lg text-slate-600">
            Реальные люди, реальные успехи
          </p>
        </div>

        <div class="relative">
          <button @click="carouselReviews.prevSlide" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white border border-indigo-100 shadow-lg rounded-full items-center justify-center text-slate-600 hover:bg-slate-600 hover:text-white transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="carouselReviews.nextSlide" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white border border-indigo-100 shadow-lg rounded-full items-center justify-center text-slate-600 hover:bg-slate-600 hover:text-white transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div class="overflow-hidden rounded-2xl pb-12 -mb-12">
            <div
              class="flex gap-6"
              :class="{ 'transition-transform duration-500 ease-out': !carouselReviews.disableTransition }"
              :style="{
                touchAction: 'pan-y',
                transform: `translateX(calc(-${carouselReviews.currentIndex} * (var(--slide-w) + ${carouselReviews.GAP}px) + ${carouselReviews.dragOffset}px))`
              }"
              @transitionend="carouselReviews.handleTransitionEnd"
              @touchstart.passive="carouselReviews.onTouchStart"
              @touchmove.passive="carouselReviews.onTouchMove"
              @touchend="carouselReviews.onTouchEnd"
              @touchcancel="carouselReviews.onTouchCancel"
            >
              <div
                v-for="(review, index) in carouselReviews.displayImages"
                :key="'review-' + index"
                class="shrink-0 w-(--slide-w)"
              >
                <div class="flex flex-col h-full p-8 rounded-2xl bg-slate-50 border border-indigo-100 hover:bg-white hover:shadow-xl hover:border-slate-100 transition-all duration-300">
                  <div class="flex items-center gap-1 mb-6">
                    <svg v-for="i in 5" :key="i" class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>

                  <p class="text-slate-700 leading-relaxed mb-8 italic">
                    "{{ review.text }}"
                  </p>

                  <div class="flex items-center gap-4 mt-auto">
                    <img
                      :src="review.photo"
                      :alt="`Фото: ${review.name}`"
                      class="w-16 h-16 rounded-full object-cover shrink-0"
                    >
                    <div class="grow min-w-0">
                      <div class="font-bold text-slate-600">{{ review.name }}</div>
                      <div class="text-sm text-slate-500">{{ review.role }}</div>
                      <div class="text-sm text-slate-500">{{ review.nickname }}</div>
                      <div class="text-xs text-amber-600 font-medium">{{ review.location }}</div>
                    </div>
                    <a
                      v-if="review.url"
                      :href="review.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      :title="`${review.name} в Интернете`"
                      class="ml-auto shrink-0 w-10 h-10 rounded-full bg-white border border-indigo-100 flex items-center justify-center text-slate-400 transition-all duration-300 hover:text-white hover:border-transparent hover:bg-linear-to-tr hover:from-slate-500 hover:via-slate-300 hover:to-slate-600 hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100"><!-- Icon from Font-GIS by Jean-Marc Viglino - https://github.com/Viglino/font-gis/blob/main/LICENSE-CC-BY.md --><path fill="currentColor" d="M49.947 0C22.354.03 0 22.406 0 50c.01 27.34 21.979 49.603 49.316 49.977c-2.995-7.598-1.378-16.913 3.184-23.758V74.13h1.516c1.566-1.865 3.766-3.506 6.384-5h-7.9V52.5h4.54c.1-1.682.422-3.367.935-5H52.5V30.87h19.195c.26.996.495 2.02.715 3.056c1.857-.3 3.536-.313 5.084-.117a76 76 0 0 0-.639-2.94h13.89A44.8 44.8 0 0 1 94.783 45.6c.428 4.941.422 9.388-1.106 15.24a45 45 0 0 1-2.5 7.307c1.128 1.186 2.494 2.308 3.867 3.453A50 50 0 0 0 100 50c0-27.614-22.386-50-50-50ZM52.5 5.682c5.268.896 10.302 5.236 14.268 12.437c1.278 2.321 2.42 4.927 3.408 7.75H52.5Zm-5 .197v19.99H30.75c.988-2.823 2.13-5.429 3.408-7.75C37.89 11.341 42.571 7.102 47.5 5.88M35.98 7.232c-2.324 2.352-4.41 5.22-6.203 8.475c-1.68 3.05-3.125 6.467-4.312 10.162H12.01c5.535-8.706 13.975-15.37 23.97-18.637m29.41.463c9.398 3.413 17.32 9.868 22.6 18.174H75.455c-1.184-3.695-2.627-7.112-4.307-10.162c-1.676-3.045-3.613-5.749-5.757-8.012M9.257 30.87h14.808c-1.245 5.162-2.008 10.76-2.203 16.631H5.072a44.8 44.8 0 0 1 4.184-16.63m19.974 0H47.5V47.5H26.867c.212-5.935 1.043-11.554 2.363-16.63M5.072 52.5h16.762c.129 5.856.82 11.454 1.994 16.63H9.256A44.8 44.8 0 0 1 5.072 52.5m21.762 0H47.5v16.63H28.98c-1.245-5.1-2.006-10.715-2.146-16.63M12.01 74.13h13.136c1.242 4.085 2.8 7.84 4.631 11.165c1.438 2.61 3.068 4.969 4.854 7.017c-9.407-3.41-17.336-9.869-22.621-18.181m18.394 0H47.5v20.798c-.308-.017-.612-.048-.918-.07c-4.59-1.5-8.924-5.62-12.424-11.975c-1.428-2.594-2.692-5.537-3.754-8.752" color="currentColor"/><path fill="currentColor" d="M76 37.769c-8.285 0-15 6.716-15 15s6.715 15 15 15c8.283 0 15-6.716 15-15s-6.717-15-15-15m0 32.223c-16.57 0-24 7.431-24 24v2c.075 3.94 1.817 4.056 5.5 4h37c4.695-.004 5.532.005 5.5-4v-2c0-16.569-7.432-24-24-24"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(review, index) in testimonials"
            :key="index"
            @click="carouselReviews.goToSlide(index + carouselReviews.CLONES)"
            class="h-2 rounded-full transition-all duration-300"
            :class="carouselReviews.activeDot === index ? 'bg-slate-500 w-8' : 'bg-slate-300 w-2'"
          ></button>
        </div>
      </div>
    </section>



    <!-- 7. Final CTA Section -->
    <section class="pt-10 lg:pt-12 pb-12 lg:pb-16 bg-slate-500 text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-900/30 via-slate-600 to-slate-600"></div>
      
      <div class="relative max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-5xl mb-6">
          Готовы вывести свои работы <br>на новый уровень?
        </h2>
        <p class="text-lg text-white mb-10 max-w-2xl mx-auto">
          Присоединяйтесь к сообществу профессионалов и начните создавать визуальный контент, которым будете гордиться и за который будут платить бренды.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button 
            @click="router.push('/club')"
            class="px-8 py-4 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-400 transition-all duration-300 shadow-lg shadow-slate-900/50 hover:-translate-y-0.5 min-w-65"
          >
            Присоединиться
          </button>
          <button 
            @click="scrollToSection('courses')"
            class="px-8 py-4 bg-transparent text-slate-300 font-bold rounded-lg border-2 border-slate-300 hover:border-white hover:text-white transition-all duration-300 pl-11 pr-11 min-w-65"
          >
            Смотреть все уроки
          </button>
        </div>
      </div>
    </section>

  </div>
</template>


