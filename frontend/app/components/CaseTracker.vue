<template>
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
        
        <div class="flex flex-col gap-2 mb-8">
          <div class="flex gap-2">
            <UInput
              v-model="searchToken"
              :placeholder="t.placeholderToken"
              size="lg"
              class="flex-1 font-mono uppercase"
              icon="i-heroicons-key"
              @keyup.enter="trackCase"
            />
            <UButton size="lg" color="primary" @click="trackCase" :loading="isTracking">{{ t.btnTrackToken }}</UButton>
          </div>
          <p v-if="trackError" class="text-red-500 text-sm">{{ trackError }}</p>
        </div>

        <!-- Timeline Preview -->
        <div v-if="showTimeline && trackedCase" class="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <div class="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <span class="font-mono font-bold text-gray-700">{{ searchToken.toUpperCase() }}</span>
            <span class="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase tracking-wide">
              {{ trackedCase.status.replace(/_/g, ' ') }}
            </span>
          </div>
          
          <ul class="space-y-6 flex flex-col">
            <li 
              v-for="(event, index) in trackedCase.timeline" 
              :key="index"
              class="flex w-full"
              :class="index === 0 ? 'justify-end' : 'justify-start'"
            >
              <!-- System message (Left) -->
              <div v-if="index > 0" class="flex gap-3 max-w-[90%] md:max-w-[75%]">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white mt-1 shadow-sm">
                  <UIcon name="i-heroicons-shield-check" class="w-5 h-5" />
                </div>
                <div class="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
                  <div class="flex items-center justify-between mb-1 gap-4">
                    <h4 class="font-bold text-gray-900 text-sm">{{ event.title }}</h4>
                    <time class="text-xs text-gray-400 whitespace-nowrap">{{ new Date(event.timestamp).toLocaleDateString() }} {{ new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</time>
                  </div>
                  <p v-if="event.description" class="text-sm text-gray-600 mt-1">{{ event.description }}</p>
                </div>
              </div>

              <!-- User message (Right) -->
              <div v-if="index === 0" class="flex gap-3 max-w-[90%] md:max-w-[75%] flex-row-reverse">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mt-1 shadow-sm">
                  <UIcon name="i-heroicons-user" class="w-5 h-5" />
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm">
                  <div class="flex items-center justify-between mb-1 gap-4">
                    <h4 class="font-bold text-gray-100 text-sm">{{ event.title }}</h4>
                    <time class="text-xs text-gray-400 whitespace-nowrap">{{ new Date(event.timestamp).toLocaleDateString() }} {{ new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</time>
                  </div>
                  <p v-if="event.description" class="text-sm text-gray-300 mt-1">{{ event.description }}</p>
                </div>
              </div>
            </li>
            
            <li class="flex w-full justify-start" v-if="trackedCase.status !== 'RESOLVED'">
              <div class="flex gap-3 max-w-[90%] md:max-w-[75%]">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mt-1">
                  <UIcon name="i-heroicons-ellipsis-horizontal" class="w-5 h-5" />
                </div>
                <div class="bg-white/50 p-4 rounded-2xl rounded-tl-sm border border-gray-200 border-dashed">
                  <div class="flex items-center justify-between mb-1 gap-4">
                    <h4 class="font-bold text-gray-500 text-sm">Next Steps Pending</h4>
                    <time class="text-xs text-gray-400">Awaiting Action</time>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { t } = useLocales()
const config = useRuntimeConfig()

const searchToken = ref('')
const showTimeline = ref(false)
const isTracking = ref(false)
const trackError = ref('')
const trackedCase = ref<any>(null)

const trackCase = async () => {
  if (!searchToken.value) return
  isTracking.value = true
  trackError.value = ''
  showTimeline.value = false
  trackedCase.value = null

  try {
    const res = await $fetch(`${config.public.apiBase}/incidents/${searchToken.value}/`)
    trackedCase.value = res
    showTimeline.value = true
  } catch (err: any) {
    if (err.response?.status === 404) {
      trackError.value = 'Token not found. Please verify your claim token.'
    } else {
      trackError.value = 'An error occurred while tracking the case.'
    }
  } finally {
    isTracking.value = false
  }
}
</script>
