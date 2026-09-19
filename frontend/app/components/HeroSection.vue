<template>
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
        @click="$emit('open-report')"
      />
      <UButton
        size="xl"
        color="neutral"
        variant="outline"
        icon="i-heroicons-magnifying-glass"
        :label="t.btnTrack"
        class="w-full sm:w-auto font-semibold bg-white"
        @click="$emit('scroll-tracker')"
      />
    </div>

    <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
      <UIcon name="i-heroicons-lock-closed" class="w-4 h-4" />
      <span v-html="t.secureTags"></span>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
defineEmits(['open-report', 'scroll-tracker'])
const { t } = useLocales()
</script>
