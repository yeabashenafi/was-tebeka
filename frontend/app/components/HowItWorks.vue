<template>
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
</template>

<script setup lang="ts">
const { t } = useLocales()
</script>
