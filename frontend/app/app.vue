<template>
  <UApp :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const { selectedLanguage } = useLocales()
</script>
