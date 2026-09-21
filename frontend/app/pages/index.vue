<template>
  <UApp :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
    <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans selection:bg-primary-100" :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
      <AppHeader />
      <main id="main-content" tabindex="-1" class="pt-24 flex-1 flex flex-col">
        <EmergencyBanner />
        <HeroSection @open-report="isReportModalOpen = true" @scroll-tracker="scrollToTracker" />
        <HowItWorks />
        <CaseTracker id="tracker-section" />
        <TrustSection />
      </main>
      <AppFooter />
    </div>
    <ReportModal v-model="isReportModalOpen" />
  </UApp>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { selectedLanguage } = useLocales()
const isReportModalOpen = ref(false)

const scrollToTracker = () => {
  const el = document.getElementById('tracker-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
