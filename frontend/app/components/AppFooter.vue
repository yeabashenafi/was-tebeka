<template>
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
</template>

<script setup lang="ts">
const { t } = useLocales()
</script>
