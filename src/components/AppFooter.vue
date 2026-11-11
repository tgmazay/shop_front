<template>
  <footer>
      <div class="max-w-[1600px] mx-auto px-6 pt-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs font-light text-stone-500">
        
        <!-- КОЛОНКА 1: ЛОГОТИП И ИКОНКИ СОЦСЕТЕЙ -->
        <div class="space-y-6">
          <div class="flex flex-col select-none">
            <span class="text-[11px] font-light tracking-[0.35em] text-stone-400 uppercase">©foodphotostylist</span>
            <span class="text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400 mt-0.5">Food Photography | Styling</span>
          </div>
          
          <!-- Ряд значков соцсетей-->
          <div class="flex items-center space-x-3 pt-1">
            <!-- VK -->
            <a href="#" class="w-9 h-9 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition flex items-center justify-center" title="ВКонтакте">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.07 2H8.93C4.12 2 2 4.12 2 8.93v6.14C2 19.88 4.12 22 8.93 22h6.14c4.81 0 6.93-2.12 6.93-6.93V8.93C22 4.12 19.88 2 15.07 2zm3.17 11.75c0 .35-.15.54-.45.54h-1.42c-.44 0-.83-.24-1.18-.73-.66-.66-1.14-.61-1.33-.61-.27 0-.39.11-.39.43v.45c0 .32-.13.46-.5.46-1.95 0-3.9-1.07-5.13-2.82-1-.13-1.89-2.58-1.89-2.58a.49.49 0 0 1 .48-.37h1.43c.32 0 .45.13.53.46 0 0 .74 1.93 1.69 2.92.3.3.44.4.59.4.11 0 .22-.1.22-.4v-2c0-.52-.16-.67-.67-.71a.23.41 0 0 1-.13-.34c.16-.32.61-.43.93-.43h1.4c.38 0 .5.16.5.54v2.09c0 .24.11.32.19.32s.19-.08.37-.32c.95-1.12 1.63-2.88 1.63-2.88a.47.47 0 0 1 .46-.31h1.43c.35 0 .48.16.4.46a22.2 22.2 0 0 1-1.57 3.01c-.13.19-.19.35 0 .54.14.16.59.57.89.92.56.65.91 1.25.97 1.53z"/></svg>
            </a>
            <!-- YouTube -->
            <a href="#" class="w-9 h-9 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition flex items-center justify-center" title="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <!-- Instagram -->
            <a href="#" class="w-9 h-9 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition flex items-center justify-center" title="Instagram">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <!-- Telegram (Твоя ровная иконка с правильной палитрой и ховером) -->
            <a href="#" class="w-9 h-9 text-stone-600 hover:text-stone-900 transition flex items-center justify-center" title="Telegram">
              <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 128 128">
                <path d="M 64.000002,10.847658 C 34.644818,10.847767 10.847767,34.644818 10.847658,64.000002 10.84777,93.355184 34.64482,117.15223 64.000002,117.15234 93.355183,117.15223 117.15223,93.355183 117.15223,64.000002 117.15223,34.64482 93.355184,10.84777 64.000002,10.847658 Z m 27.533203,23.873047 c 2.159355,-0.07872 3.794128,1.876009 2.917969,5.388672 L 83.919924,89.74219 c -0.735207,3.5272 -2.86777,4.371077 -5.820313,2.742187 L 62.05469,80.628908 c -3.768605,3.664093 -7.144432,6.945669 -7.712891,7.501953 -0.893917,0.873247 -1.605929,1.605469 -3.210938,1.605469 -2.07976,0 -1.725837,-0.787042 -2.443359,-2.767578 L 42.785158,68.875002 27.359377,64.058596 c -3.426838,-1.049871 -3.45177,-3.403991 0.769531,-5.097656 l 61.84961,-23.855469 c 0.529657,-0.240389 1.056374,-0.3666 1.554687,-0.384766 z m -9.810547,10.556641 c -0.465094,-0.0065 -1.097161,0.159953 -1.748047,0.554687 L 45.207033,67.76758 51.064455,85.730471 52.224611,73.36719 81.996096,46.505861 c 0.816659,-0.724929 0.50172,-1.21776 -0.273438,-1.228515 z"/>
              </svg>
            </a>
            <!-- WhatsApp -->
            <a href="#" class="w-9 h-9 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition flex items-center justify-center" title="WhatsApp">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.753-1.464L0 24zm6.59-4.846c1.657.983 3.284 1.517 4.904 1.518 5.389 0 9.773-4.381 9.776-9.773a9.714 9.714 0 0 0-2.868-6.92 9.716 9.714 0 0 0-6.915-2.865C6.112 1.114 1.728 5.495 1.725 10.887c-.001 1.691.543 3.34 1.571 4.779L2.292 20.31l4.355-1.156z"/></svg>
            </a>
          </div>
        </div>

        <!-- КОЛОНКА 2: КОНТАКТЫ -->
        <div class="space-y-2">
          <h4 class="font-medium text-stone-900 uppercase tracking-wider mb-3">Контакты</h4>
          <p>тел. +7 920 251 59 89</p>
          <p>e-mail: nataly@foodphotostylist.ru</p>
          <p>соцсети: @foodphotostylist</p>
          <p><a href="#" class="hover:text-stone-900 transition underline decoration-stone-200 underline-offset-4">Оставить заявку</a></p>
          <p class="text-stone-400 pt-1">Нижний Новгород</p>
        </div>
        
        <!-- КОЛОНКА 3: УСЛУГИ -->
        <div class="space-y-2">
          <h4 class="font-medium text-stone-900 uppercase tracking-wider mb-3">Услуги</h4>
          <p><a href="#" class="hover:text-stone-900 transition">Съемка для ресторанов</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Имиджевая фудфотосъемка</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Фудстайлинг</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Все услуги</a></p>
        </div>

        <!-- КОЛОНКА 4: ИНФОРМАЦИЯ -->
        <div class="space-y-2">
          <h4 class="font-medium text-stone-900 uppercase tracking-wider mb-3">Информация</h4>
          <p><a href="#" class="hover:text-stone-900 transition">Главная</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Рассчитать стоимость услуг</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Политика конфиденциальности</a></p>
          <p><a href="#" class="hover:text-stone-900 transition">Публичная оферта</a></p>
        </div>
      </div>
  </footer>
</template>