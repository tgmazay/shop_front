<script setup>
import { computed, ref, useId, watch } from 'vue'
import { LEGAL_DOCS } from '@/constants/legal'

// Обязательное согласие на обработку персональных данных (ст. 9 152-ФЗ).
// Чекбокс НЕ предустановлен и не объединён с другими согласиями.
const accepted = defineModel({ type: Boolean, default: false })

const props = defineProps({
  error: { type: Boolean, default: false },
  // Переливающаяся рамка, пока согласие не проставлено
  highlight: { type: Boolean, default: true },
  // Актуальная редакция согласия на сервере. Если не передана —
  // показываем локальный документ.
  documentUrl: { type: String, default: '' },
  documentVersion: { type: String, default: '' },
})

const emit = defineEmits(['change'])

const uid = useId()
const consentId = computed(() => `pd-consent-${uid}`)
const textId = computed(() => `pd-consent-text-${uid}`)
const consentHref = computed(() => props.documentUrl || LEGAL_DOCS.consent)

// Момент, когда пользователь поставил галочку (показываем ему для наглядности).
const acceptedAt = ref('')

watch(accepted, (value) => {
  acceptedAt.value = value ? new Date().toISOString() : ''
})
</script>

<template>
  <div class="space-y-3">
    <!-- Плашка статичная: чекбокс подпрыгивает, пока согласие не отмечено -->
    <div
      class="rounded-xl border p-4 transition-colors duration-300"
      :class="props.error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'"
    >
      <div class="flex items-start gap-3">
        <input
          :id="consentId"
          v-model="accepted"
          type="checkbox"
          :aria-invalid="props.error ? 'true' : 'false'"
          :aria-describedby="textId"
          class="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-slate-600 focus:outline-none"
          :class="{ 'consent-checkbox-bounce': !accepted && props.highlight }"
          @change="emit('change')"
        />
        <div class="text-xs leading-relaxed text-slate-500">
          <label :for="consentId" class="cursor-pointer font-bold text-slate-700">
            Я даю согласие на обработку персональных данных
          </label>
          <p :id="textId" class="mt-1 text-[8px]">
            Я прочитал(а) и принимаю
            <a
              :href="consentHref"
              target="_blank"
              rel="noopener noreferrer"
              class="underline hover:text-slate-700 transition-colors"
              >Согласие на обработку персональных данных</a
            ><span v-if="props.documentVersion" class="text-slate-400">
              (редакция от {{ props.documentVersion }})</span
            >
            и
            <RouterLink
              :to="LEGAL_DOCS.privacy"
              target="_blank"
              rel="noopener"
              class="underline hover:text-slate-700 transition-colors"
              >Политику в отношении обработки персональных данных</RouterLink
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Чекбокс «подпрыгивает как мячик», пока согласие не отмечено.
   Двигается только transform, поэтому вёрстка не сдвигается.
Механика: transform-origin: center bottom — «земля» снизу; приседание scale(1.08, 0.9) даёт squash, взлёт translateY(-6px) scale(0.96, 1.05) — stretch, затем удар и второй короткий отскок. Пауза с 55 % до 100 % цикла (примерно 1,2 с при длительности 2,6 с) — прыжок получается периодическим, а не непрерывным. Анимируется только transform, поэтому текст не дёргается и layout не пересчитывается.

Что крутить
Высота прыжка — translateY(-6px) (и -2px для отскока).
Частота — 2.6s: меньше значение → чаще прыгает; пауза задаётся процентами 55% (больше процент → дольше стоит на месте).
Мягкость приземления — cubic-bezier(0.28, 0.84, 0.42, 1); для более резкого мячика замени на ease-out.
Сила сжатия — значения в scale(...); 1.08, 0.9 — заметное, 1.03, 0.97 — еле уловимое.
Анимация отключается пропом :highlight="false" и полностью убирается при prefers-reduced-motion: reduce.*/

.consent-checkbox-bounce {
  transform-origin: center bottom;
  animation: consent-checkbox-bounce 2.6s ease-out infinite;
}

@keyframes consent-checkbox-bounce {
  /* пауза между прыжками */
  0%,
  55%,
  100% {
    transform: translateY(0) scale(1, 1);
  }

  /* приседание перед прыжком */
  8% {
    transform: translateY(0) scale(1.08, 0.9);
  }

  /* взлёт */
  22% {
    transform: translateY(-6px) scale(0.96, 1.05);
  }

  /* касание «земли» */
  36% {
    transform: translateY(0) scale(1.06, 0.92);
  }

  /* небольшой отскок */
  45% {
    transform: translateY(-2px) scale(1, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .consent-checkbox-bounce {
    animation: none;
  }
}
</style>
