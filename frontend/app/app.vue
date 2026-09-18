<template>
  <UApp :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
    <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans selection:bg-primary-100" :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
      <!-- 1. Prominent Emergency Quick Exit (Panic Button) & App Bar -->
      <div class="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-primary-600" />
          <span class="font-bold text-lg md:text-xl tracking-tight text-gray-900">{{ t.appTitle }}</span>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
          <USelect
            v-model="selectedLanguage"
            :items="languages"
            label-key="label"
            value-key="value"
            icon="i-heroicons-language"
            color="neutral"
            variant="ghost"
            class="w-32 md:w-40 hidden sm:block"
          />
          <USelect
            v-model="selectedLanguage"
            :items="languages"
            label-key="label"
            value-key="value"
            icon="i-heroicons-language"
            color="neutral"
            variant="ghost"
            class="w-12 sm:hidden"
            :ui="{ icon: { leading: { pointer: '' } } }"
            title="Language"
          />
          
          <UButton
            color="error"
            variant="solid"
            icon="i-heroicons-arrow-right-on-rectangle"
            :label="t.quickExit"
            @click="quickExit"
            class="font-bold uppercase tracking-wider text-xs md:text-sm shadow-md transition-transform hover:scale-105"
          />
        </div>
      </div>

      <main class="pt-24 flex-1 flex flex-col">
        <!-- 3. Immediate Emergency Aid Bar -->
        <UContainer class="mb-12">
          <div class="bg-red-50 border-s-4 border-red-500 p-4 rounded-e-lg shadow-sm">
            <div class="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
              <div class="flex items-center gap-3 text-red-800">
                <UIcon name="i-heroicons-phone-arrow-up-right" class="w-6 h-6 shrink-0" />
                <p class="font-medium text-sm md:text-base" v-html="t.dangerCall"></p>
              </div>
              <div class="flex gap-3 flex-wrap">
                <UButton size="xs" color="error" variant="soft" :label="t.medCare" />
                <UButton size="xs" color="error" variant="soft" :label="t.safeShelter" />
              </div>
            </div>
          </div>
        </UContainer>

        <!-- 2. Hero Section -->
        <UContainer class="text-center max-w-4xl mb-20 px-4">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight" v-html="t.heroTitle"></h1>
          <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {{ t.heroSubtitle }}
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <UButton
              size="xl"
              color="primary"
              variant="solid"
              icon="i-heroicons-document-text"
              :label="t.btnReport"
              class="w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all"
            />
            <UButton
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-heroicons-magnifying-glass"
              :label="t.btnTrack"
              class="w-full sm:w-auto font-semibold bg-white"
            />
          </div>

          <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
            <UIcon name="i-heroicons-lock-closed" class="w-4 h-4" />
            <span v-html="t.secureTags"></span>
          </div>
        </UContainer>

        <!-- 4. How It Works -->
        <section class="bg-white py-16 border-y border-gray-100">
          <UContainer>
            <div class="text-center mb-12">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ t.howWorks }}</h2>
              <p class="text-gray-600 max-w-2xl mx-auto">{{ t.howWorksSub }}</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 relative">
              <UCard class="relative z-10 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">1</div>
                <h3 class="text-xl font-bold mb-2">{{ t.step1Title }}</h3>
                <p class="text-gray-600 text-sm">{{ t.step1Desc }}</p>
              </UCard>
              
              <UCard class="relative z-10 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">2</div>
                <h3 class="text-xl font-bold mb-2">{{ t.step2Title }}</h3>
                <p class="text-gray-600 text-sm">{{ t.step2Desc }}</p>
              </UCard>
              
              <UCard class="relative z-10 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">3</div>
                <h3 class="text-xl font-bold mb-2">{{ t.step3Title }}</h3>
                <p class="text-gray-600 text-sm">{{ t.step3Desc }}</p>
              </UCard>
            </div>
          </UContainer>
        </section>

        <!-- 5. Survivor Case Tracker Demo / Lookup Widget -->
        <section class="py-16">
          <UContainer class="max-w-3xl">
            <UCard class="shadow-lg border-t-4 border-t-primary-500">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-magnifying-glass-circle" class="w-6 h-6 text-primary-600" />
                  <h2 class="text-2xl font-bold">{{ t.trackTitle }}</h2>
                </div>
              </template>
              
              <p class="text-gray-600 mb-6 text-sm">{{ t.trackSub }}</p>
              
              <div class="flex gap-2 mb-8">
                <UInput
                  v-model="searchToken"
                  :placeholder="t.placeholderToken"
                  size="lg"
                  class="flex-1 font-mono uppercase"
                  icon="i-heroicons-key"
                />
                <UButton size="lg" color="primary" @click="trackCase">{{ t.btnTrackToken }}</UButton>
              </div>

              <!-- Timeline Preview -->
              <div v-if="showTimeline" class="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <div class="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                  <span class="font-mono font-bold text-gray-700">{{ searchToken || 'WAS-7821-KM' }}</span>
                  <span class="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase tracking-wide">Active</span>
                </div>
                
                <ul class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  <li class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <UIcon name="i-heroicons-check" class="w-5 h-5" />
                    </div>
                    <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow-sm">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-bold text-gray-900 text-sm">Case Received & Hash Verified</h4>
                        <time class="text-xs text-gray-500">09:12 AM</time>
                      </div>
                    </div>
                  </li>
                  
                  <li class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <UIcon name="i-heroicons-check" class="w-5 h-5" />
                    </div>
                    <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow-sm">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-bold text-gray-900 text-sm">Assigned to Legal Aid Clinic</h4>
                        <time class="text-xs text-gray-500">10:45 AM</time>
                      </div>
                    </div>
                  </li>

                  <li class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <UIcon name="i-heroicons-check" class="w-5 h-5" />
                    </div>
                    <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow-sm">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-bold text-gray-900 text-sm">Emergency Shelter Referral Dispatched</h4>
                        <time class="text-xs text-gray-500">11:30 AM</time>
                      </div>
                    </div>
                  </li>

                  <li class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <UIcon name="i-heroicons-ellipsis-horizontal" class="w-5 h-5" />
                    </div>
                    <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/50 p-4 rounded border border-gray-200 border-dashed">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-bold text-gray-500 text-sm">Case Resolution / Legal Action</h4>
                        <time class="text-xs text-gray-400">Pending</time>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </UCard>
          </UContainer>
        </section>

        <!-- 6. Institutional Response Network (Trust Section) -->
        <section class="bg-gray-900 text-white py-24 md:py-32 mt-auto">
          <UContainer class="text-center">
            <UIcon name="i-heroicons-shield-exclamation" class="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 class="text-2xl font-bold mb-4">{{ t.trustTitle }}</h2>
            <p class="text-gray-400 max-w-2xl mx-auto mb-10">
              {{ t.trustSub }}
            </p>
            
            <div class="flex flex-wrap justify-center gap-6 opacity-70">
              <div class="bg-gray-800 px-6 py-3 rounded-lg font-semibold tracking-wider text-sm">{{ t.trustTag1 }}</div>
              <div class="bg-gray-800 px-6 py-3 rounded-lg font-semibold tracking-wider text-sm">{{ t.trustTag2 }}</div>
              <div class="bg-gray-800 px-6 py-3 rounded-lg font-semibold tracking-wider text-sm">{{ t.trustTag3 }}</div>
              <div class="bg-gray-800 px-6 py-3 rounded-lg font-semibold tracking-wider text-sm">OSF / ANDELA</div>
            </div>
          </UContainer>
        </section>
      </main>

      <!-- 7. Footer -->
      <footer class="bg-gray-100 border-t border-gray-200 py-8 text-gray-600 text-sm">
        <UContainer class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <p v-html="t.footerRights"></p>
          </div>
          
          <div class="flex items-center gap-4">
            <UButton variant="ghost" color="neutral" size="sm" icon="i-heroicons-eye" label="Accessibility" />
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { translations } from '~/utils/locales'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'አማርኛ (Amharic)', value: 'am' },
  { label: 'Français (French)', value: 'fr' },
  { label: 'Kiswahili (Swahili)', value: 'sw' },
  { label: 'العربية (Arabic)', value: 'ar' }
]
const selectedLanguage = ref(languages[0].value)

// Reactive translation object based on selected language
const t = computed(() => translations[selectedLanguage.value] || translations['en'])

const searchToken = ref('')
const showTimeline = ref(false)

const trackCase = () => {
  showTimeline.value = true
}

const quickExit = () => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
      window.sessionStorage.clear()
    }
  } catch (e) {
    console.error('Failed to clear storage', e)
  }
  window.location.replace('https://www.google.com')
}
</script>
