<template>
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
</template>

<script setup lang="ts">
const { t } = useLocales()
</script>
