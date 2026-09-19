<template>
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
</template>

<script setup lang="ts">
const { languages, selectedLanguage, t } = useLocales()

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
