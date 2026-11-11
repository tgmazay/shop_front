// Чистый запуск отрисовки компонентов при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderMobileDrawer();
});

// ГЛОБАЛЬНЫЙ ПЕРЕХВАТ КЛИКОВ (Заменяет старую функцию initMobileMenuLogic)
document.addEventListener("click", (e) => {
  const drawerContainer = document.getElementById("mobile-drawer");
  const content = document.getElementById("drawer-content");
  const overlay = document.getElementById("drawer-overlay");

  if (!drawerContainer || !content || !overlay) return;

  // Клик по гамбургеру (Открытие меню)
  if (e.target.closest("#mobile-menu-btn")) {
    drawerContainer.classList.remove("invisible");
    overlay.classList.remove("invisible", "opacity-0");
    overlay.classList.add("opacity-100");
    content.style.transform = "translateX(0)";
    return;
  }

  // Клик по крестику или по размытому фону (Закрытие меню)
  if (
    e.target.id === "drawer-overlay" ||
    e.target.closest("#close-drawer-btn")
  ) {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0", "invisible");
    content.style.transform = "translateX(-100%)";

    // Скрываем весь контейнер строго после завершения анимации задвигания шторки
    setTimeout(() => {
      if (overlay.classList.contains("opacity-0")) {
        drawerContainer.classList.add("invisible");
      }
    }, 300);
  }
});

function renderHeader() {
  const headerHTML = `
      <div class="max-w-5xl mx-auto h-24 flex items-center justify-between px-4 relative">
        
        <!-- КНОПКА-ГАМБУРГЕР -->
        <button id="mobile-menu-btn" class="md:hidden text-stone-900 focus:outline-none p-2 cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-50">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- ЛОГОТИП ПЛАТФОРМЫ -->
        <div class="flex flex-col select-none cursor-pointer pl-10 md:pl-0" onclick="window.location.href='/'">
          <span class="text-xs font-light tracking-[0.35em] text-stone-400 uppercase">Natalia Tsyganova</span>
          <span class="text-sm font-semibold tracking-[0.2em] uppercase mt-0.5 text-stone-900">Food Photo Stylist</span>
        </div>
        
        <!-- ДЕСКТОПНОЕ МЕНЮ -->
        <nav class="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-stone-500 h-full">
          <a href="/" class="hover:text-stone-900 transition py-8">Главная</a>
          
          <div class="relative group h-full flex items-center">
            <a href="/portfolio.html" class="hover:text-stone-900 transition flex items-center gap-1 py-8">
              Портфолио
              <span class="text-[10px] lowercase text-stone-400 group-hover:text-stone-900 transition duration-200">▼</span>
            </a>
            <div class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-xl p-6 w-72 space-y-4 hidden group-hover:block transition z-50">
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">съемка для ресторанов</a>
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">фудстайлинг</a>
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">имиджевая съемка</a>
            </div>
          </div>

          <a href="/services.html" class="hover:text-stone-900 transition py-8">Услуги</a>
          
          <div class="relative group h-full flex items-center">
            <a href="/lessons.html" class="hover:text-stone-900 transition flex items-center gap-1 py-8">
              Обучение
              <span class="text-[10px] lowercase text-stone-400 group-hover:text-stone-900 transition duration-200">▼</span>
            </a>
            <div class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-xl p-6 w-64 space-y-4 hidden group-hover:block transition z-50">
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">программы</a>
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">курсы</a>
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">вебинары</a>
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">уроки</a>
              <a href="#" class="block text-stone-500 hover:text-stone-900 font-medium transition text-center uppercase tracking-widest text-[10px]">марафоны</a>
            </div>
          </div>

          <a href="/about.html" class="hover:text-stone-900 transition py-8">Обо мне</a>
          <a href="/blog.html" class="hover:text-stone-900 transition py-8">Блог</a>
        </nav>
        
        <div class="hidden sm:block">
          <a href="/login.html" 
             class="border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest px-6 py-3 hover:bg-stone-900 hover:text-white transition duration-300 rounded-none">
            Вход в кабинет
          </a>
        </div>
      </div>
    `;

  const headerElement = document.getElementById("global-header");
  if (headerElement) headerElement.innerHTML = headerHTML;
}

function renderMobileDrawer() {
  const drawerHTML = `
    <!-- ОВЕРЛЕЙ: сидит фиксированно на месте, плавно проявляется через opacity -->
    <div id="drawer-overlay" class="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out invisible opacity-0"></div>
    
    <!-- БЕЛАЯ ПАНЕЛЬ МЕНЮ: выезжает отдельно от оверлея, имеет плотный белый фон -->
    <div id="drawer-content" class="fixed inset-y-0 left-0 w-4/5 max-w-sm p-6 shadow-2xl flex flex-col justify-between border-r border-stone-100 z-50 transition-transform duration-300 ease-in-out" 
         style="background-color: #ffffff; transform: translateX(-100%);">
      <div>
        <div class="flex items-center justify-between border-b border-stone-100 h-24 mb-6">
          <span class="text-xs font-semibold tracking-widest uppercase text-stone-900">Навигация</span>
          <button id="close-drawer-btn" class="text-stone-400 hover:text-stone-900 p-1 cursor-pointer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <nav class="space-y-3 text-xs font-medium uppercase tracking-widest text-stone-500">
          <a href="/" class="block hover:text-stone-900 py-3 border-b border-stone-100/50">Главная</a>
          
          <!-- РАСКРЫВАЮЩИЙСЯ БЛОК: ПОРТФОЛИО -->
          <details class="group/mobile-nav border-b border-stone-100/50">
            <summary class="flex justify-between items-center hover:text-stone-900 py-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
              <span>Портфолио</span>
              <span class="text-[10px] text-stone-400 group-open/mobile-nav:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <!-- Изменено: добавлен uppercase, tracking-widest и изящный размер text-[10px] -->
            <div class="pl-4 pb-4 pt-2 space-y-4 uppercase tracking-widest text-stone-500 text-[10px]">
              <a href="#" class="block hover:text-stone-900 transition">съемка для ресторанов</a>
              <a href="#" class="block hover:text-stone-900 transition">фудстайлинг</a>
              <a href="#" class="block hover:text-stone-900 transition">имиджевая съемка</a>
            </div>
          </details>

          <a href="/services.html" class="block hover:text-stone-900 py-3 border-b border-stone-100/50">Услуги</a>
          
          <!-- РАСКРЫВАЮЩИЙСЯ БЛОК: ОБУЧЕНИЕ -->
          <details class="group/mobile-nav border-b border-stone-100/50">
            <summary class="flex justify-between items-center hover:text-stone-900 py-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
              <span>Обучение</span>
              <span class="text-[10px] text-stone-400 group-open/mobile-nav:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <!-- Изменено: добавлен uppercase, tracking-widest и изящный размер text-[10px] -->
            <div class="pl-4 pb-4 pt-2 space-y-4 uppercase tracking-widest text-stone-500 text-[10px]">
              <a href="#" class="block hover:text-stone-900 transition">программы</a>
              <a href="#" class="block hover:text-stone-900 transition">курсы</a>
              <a href="#" class="block hover:text-stone-900 transition">вебинары</a>
              <a href="#" class="block hover:text-stone-900 transition">уроки</a>
              <a href="#" class="block hover:text-stone-900 transition">марафоны</a>
            </div>
          </details>

          <a href="/about.html" class="block hover:text-stone-900 py-3 border-b border-stone-100/50">Обо мне</a>
          <a href="/blog.html" class="block hover:text-stone-900 py-3 border-b border-stone-100/50">Блог</a>
        </nav>
      </div>

      <div class="pt-6 border-t border-stone-100">
        <a href="/login.html" class="w-full block text-center border border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-widest py-3 hover:bg-stone-900 hover:text-white transition duration-300">
          Вход в кабинет
        </a>
      </div>
    </div>
  `;

  let drawerContainer = document.getElementById("mobile-drawer");
  if (!drawerContainer) {
    drawerContainer = document.createElement("div");
    drawerContainer.id = "mobile-drawer";
    drawerContainer.className = "fixed inset-0 z-50 md:hidden invisible";
    drawerContainer.setAttribute("role", "dialog");
    drawerContainer.setAttribute("aria-modal", "true");
    document.body.appendChild(drawerContainer);
  }
  drawerContainer.innerHTML = drawerHTML;
}

function renderFooter() {
  const footerHTML = `
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-xs font-light text-stone-500">
        <div class="space-y-2">
          <h4 class="font-medium text-stone-900 uppercase tracking-wider mb-3">Контакты</h4>
          <p>тел. +7 920 251 59 89</p>
          <p>e-mail: nataly@foodphotostylist.ru</p>
          <p>соцсети: @foodphotostylist</p>
          <p class="text-stone-400">Нижний Новгород</p>
        </div>
        <div class="space-y-2">
          <h4 class="font-medium text-stone-900 uppercase tracking-wider mb-3">Услуги</h4>
          <p><a href="#" class="hover:text-stone-900 transition">Съемка для ресторанов</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Имиджевая фудфотосъемка</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Фудстайлинг</a></p>
        </div>
        <div class="space-y-2">
          <h4 class="font-medium text-stone-900 uppercase tracking-wider mb-3">Информация</h4>
          <p><a href="#" class="hover:text-stone-900 transition">Политика конфиденциальности</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Публичная оферта</a></p>
          <p class="text-stone-400 mt-4">&copy; 2026 FOOD PHOTO STYLIST</p>
        </div>
      </div>
    `;

  const footerElement = document.getElementById("global-footer");
  if (footerElement) footerElement.innerHTML = footerHTML;
}
