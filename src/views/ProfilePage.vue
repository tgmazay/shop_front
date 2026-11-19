<script setup>
import { ref, watch } from 'vue'
import { useUser } from '@/stores/user'

const { state: user, providerLabel, initials, updateContacts } = useUser()

const email = ref(user.email)
const phone = ref(user.phone)
const saved = ref(false)

// Профиль приходит асинхронно (restoreSession) — подставляем значения, когда он загрузится
watch(
  () => [user.email, user.phone],
  ([nextEmail, nextPhone]) => {
    email.value = nextEmail
    phone.value = nextPhone
  },
)

function handleSave() {
  updateContacts({ email: email.value, phone: phone.value })
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 3000)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Карточка с данными из соцсети -->
    <div class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8">
      <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight mb-6">Способ входа</h2>

      <div class="flex items-center gap-5">
        <div
          class="w-20 h-20 rounded-full bg-slate-600 text-white flex items-center justify-center text-3xl font-black shrink-0 overflow-hidden"
        >
          <img
            v-if="user.social.avatar"
            :src="user.social.avatar"
            alt=""
            class="w-full h-full object-cover"
          />
          <template v-else>{{ initials }}</template>
        </div>
        <div>
          <div class="text-lg font-bold text-slate-700">{{ user.social.name }}</div>
          <div class="flex items-center gap-2 mt-1">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              :class="{
                'bg-[#FC3F1D]/10 text-[#FC3F1D]': user.social.provider === 'yandex',
                'bg-[#0077FF]/10 text-[#0077FF]': user.social.provider === 'vk',
                'bg-[#229ED9]/10 text-[#229ED9]': user.social.provider === 'telegram',
              }"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {{ providerLabel }}
            </span>
          </div>
          <p class="text-sm text-slate-400 mt-2">
            <template v-if="user.social.provider && user.social.provider !== 'email'">
              Эти данные получены при входе через {{ providerLabel }} и не могут быть изменены
              здесь.
            </template>
            <template v-else>
              Вы вошли по email и паролю. Контактные данные можно изменить ниже.
            </template>
          </p>
        </div>
      </div>
    </div>

    <!-- Карточка с контактными данными -->
    <div class="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8">
      <h2 class="text-xl font-black text-slate-600 uppercase tracking-tight mb-6">
        Контактные данные
      </h2>

      <form @submit.prevent="handleSave" class="space-y-5 max-w-lg">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-bold text-slate-600 mb-1.5">
            Электронная почта
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm focus:border-slate-600 focus:outline-none transition-colors"
          />
        </div>

        <!-- Телефон -->
        <div>
          <label for="phone" class="block text-sm font-bold text-slate-600 mb-1.5"> Телефон </label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            placeholder="+7 (900) 000-00-00"
            class="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm focus:border-slate-600 focus:outline-none transition-colors"
          />
        </div>

        <!-- Кнопка сохранения -->
        <div class="flex items-center gap-4 pt-2">
          <button
            type="submit"
            class="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-md"
          >
            Сохранить изменения
          </button>

          <!-- Уведомление об успешном сохранении -->
          <transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 -translate-x-2"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <span v-if="saved" class="flex items-center gap-1.5 text-sm font-bold text-green-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Сохранено
            </span>
          </transition>
        </div>
      </form>
    </div>
  </div>
</template>
