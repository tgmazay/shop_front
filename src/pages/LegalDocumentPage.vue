<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getLegalDocument } from '@/constants/legalContent'
import { LEGAL_DOCS, OPERATOR } from '@/constants/legal'

const route = useRoute()

const document = computed(() => getLegalDocument(route.params.slug))

const otherDocuments = computed(() =>
  Object.values(LEGAL_DOCS).filter((path) => path !== route.path),
)
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
    <div class="max-w-3xl mx-auto">
      <button
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors duration-300"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Назад
      </button>

      <article
        v-if="document"
        class="bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 sm:p-12 space-y-8"
      >
        <header class="space-y-3 border-b border-slate-100 pb-6">
          <h1 class="text-2xl sm:text-3xl font-black text-slate-700 uppercase tracking-tight">
            {{ document.title }}
          </h1>
          <p class="text-xs text-slate-400 uppercase tracking-wider">
            Редакция от {{ document.updatedAt }} · {{ OPERATOR.name }}
          </p>
          <p class="text-sm text-slate-500 leading-relaxed">{{ document.intro }}</p>
        </header>

        <section
          v-for="section in document.sections"
          :key="section.heading"
          class="space-y-2 text-sm text-slate-600 leading-relaxed"
        >
          <h2 class="font-bold text-slate-700 text-base">{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.list" class="list-disc pl-5 space-y-1">
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
        </section>

        <footer class="border-t border-slate-100 pt-6 text-sm text-slate-500">
          <p>
            Контакты оператора:
            <a
              :href="`mailto:${OPERATOR.email}`"
              class="underline hover:text-slate-700 transition-colors"
              >{{ OPERATOR.email }}</a
            >,
            <a
              :href="`tel:${OPERATOR.phone.replace(/\s/g, '')}`"
              class="underline hover:text-slate-700 transition-colors"
              >{{ OPERATOR.phone }}</a
            >
          </p>
        </footer>
      </article>

      <div v-else class="bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 sm:p-12">
        <h1 class="text-2xl font-black text-slate-700 uppercase tracking-tight mb-3">
          Документ не найден
        </h1>
        <p class="text-sm text-slate-500">
          Проверьте адрес страницы — возможно, документ был перемещён.
        </p>
      </div>

      <nav class="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
        <RouterLink
          v-for="path in otherDocuments"
          :key="path"
          :to="path"
          class="underline hover:text-slate-600 transition-colors"
        >
          {{ path }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
