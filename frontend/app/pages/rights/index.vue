<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />

    <main id="main-content" tabindex="-1" class="flex-1 pt-[72px]">
      <section class="bg-primary-900 text-white py-16">
        <UContainer class="max-w-4xl text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-6">{{ t.rightsTitle }}</h1>
          <p class="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {{ t.rightsSubTitle }}
          </p>
          <div class="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
            <USelect
              v-model="selectedCountry"
              :items="countries"
              label-key="label"
              value-key="value"
              icon="i-heroicons-globe-alt"
              size="xl"
              class="w-full md:w-1/3 text-gray-900"
            />
            <UInput
              v-model="searchQuery"
              icon="i-heroicons-magnifying-glass"
              size="xl"
              :placeholder="t.rightsSearch"
              class="w-full md:w-2/3 text-gray-900"
            />
          </div>
        </UContainer>
      </section>

      <section class="py-12">
        <UContainer class="max-w-5xl">
          <div v-if="filteredCategories.length === 0" class="text-center py-12 text-gray-500">
            {{ t.rightsEmpty }}
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard v-for="(cat, idx) in filteredCategories" :key="idx" class="h-full flex flex-col hover:shadow-md transition-shadow">
              <template #header>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                      <UIcon :name="cat.icon" class="w-6 h-6" />
                    </div>
                    <div>
                      <h2 class="text-lg font-bold text-gray-900">{{ cat.title }}</h2>
                    </div>
                  </div>
                  <UButton 
                    size="xs" 
                    color="gray" 
                    variant="ghost" 
                    :icon="speakingIdx === idx ? 'i-heroicons-stop-circle' : 'i-heroicons-speaker-wave'"
                    :label="speakingIdx === idx ? (t.stopReading || 'Stop') : (t.readAloud || 'Read Aloud')"
                    :aria-label="speakingIdx === idx ? 'Stop reading' : 'Read ' + cat.title + ' aloud'"
                    @click="toggleSpeak(idx, cat)"
                  />
                </div>
              </template>
              
              <div class="flex-1 space-y-4">
                <p class="text-gray-600 text-sm leading-relaxed">{{ cat.description }}</p>
                <div class="bg-gray-50 p-3 rounded border border-gray-100">
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{{ t.rightsSurvivorHeading }}</p>
                  <ul class="space-y-2">
                    <li v-for="(right, rIdx) in cat.rights" :key="rIdx" class="flex items-start gap-2 text-sm text-gray-700">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0" />
                      <span>{{ right }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <template #footer>
                <div class="flex justify-end">
                  <UBadge color="gray" variant="solid">{{ cat.article }}</UBadge>
                </div>
              </template>
            </UCard>
          </div>
        </UContainer>
      </section>

      <section class="py-12 bg-white border-t border-gray-200">
        <UContainer class="max-w-3xl">
          <h2 class="text-2xl font-bold text-center mb-8">{{ t.rightsMythRealityTitle }}</h2>
          <UAccordion :items="currentMyths" color="gray" variant="ghost" size="xl" />
        </UContainer>
      </section>

      <section class="py-12 pb-24">
        <UContainer class="max-w-4xl">
          <UCard class="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-none shadow-xl">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
              <div>
                <h3 class="text-xl font-bold mb-2">{{ t.rightsNeedHelp }}</h3>
                <p class="text-gray-300 text-sm max-w-lg">
                  {{ t.rightsNeedHelpSub }}
                </p>
              </div>
              <UButton to="/" size="xl" color="primary" class="shrink-0 w-full md:w-auto text-center justify-center">
                {{ t.btnReport }}
              </UButton>
            </div>
          </UCard>
        </UContainer>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { getLocalizedRightsContent } from '~/utils/rightsContent'

const { t, selectedLanguage } = useLocales()

useHead({
  title: computed(() => `${t.value.rightsTitle} | Was Tebeka`)
})

const searchQuery = ref('')
const selectedCountry = ref('ET')

const countries = [
  { label: 'Ethiopia', value: 'ET' },
  { label: 'Kenya', value: 'KE' },
  { label: 'Côte d\'Ivoire', value: 'CI' }
]

const localizedContent = computed(() => {
  return getLocalizedRightsContent(selectedLanguage.value, selectedCountry.value)
})

const currentCategories = computed(() => localizedContent.value.categories)
const currentMyths = computed(() => localizedContent.value.myths)


const filteredCategories = computed(() => {
  const cats = currentCategories.value
  if (!searchQuery.value) return cats
  
  const q = searchQuery.value.toLowerCase()
  return cats.filter((cat: any) => 
    cat.title.toLowerCase().includes(q) || 
    cat.description.toLowerCase().includes(q) ||
    (cat.keywords && cat.keywords.some((kw: string) => kw.includes(q)))
  )
})

const speakingIdx = ref<number | null>(null)

const toggleSpeak = (idx: number, cat: any) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  if (speakingIdx.value === idx) {
    window.speechSynthesis.cancel()
    speakingIdx.value = null
    return
  }

  window.speechSynthesis.cancel()
  speakingIdx.value = idx

  const textToRead = `${cat.title}. ${cat.description}. ${t.value.rightsSurvivorHeading}. ${cat.rights.join('. ')}`
  const utterance = new SpeechSynthesisUtterance(textToRead)
  
  const langMap: Record<string, string> = {
    'en': 'en-US',
    'am': 'am-ET',
    'fr': 'fr-FR',
    'sw': 'sw-KE',
    'ar': 'ar-SA'
  }
  utterance.lang = langMap[selectedLanguage.value] || 'en-US'
  
  utterance.onend = () => {
    if (speakingIdx.value === idx) speakingIdx.value = null
  }
  utterance.onerror = () => {
    if (speakingIdx.value === idx) speakingIdx.value = null
  }
  
  window.speechSynthesis.speak(utterance)
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
})

watch([selectedLanguage, selectedCountry], () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
    speakingIdx.value = null
  }
})

</script>
