<template>
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
</template>

<script setup lang="ts">
const { t } = useLocales()
</script>
