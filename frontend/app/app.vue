<template>
  <UApp :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none">Skip to main content</a>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const { selectedLanguage } = useLocales()
</script>

<style>
/* High-Contrast Focus Ring States */
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:not([tabindex="-1"]):focus-visible {
  outline: 2px solid #059669; /* emerald-600 */
  outline-offset: 2px;
}
</style>
