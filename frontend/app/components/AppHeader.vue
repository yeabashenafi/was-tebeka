<template>
  <div class="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div class="flex items-center gap-3 md:gap-6">
      <!-- Mobile Hamburger -->
      <UButton
        icon="i-heroicons-bars-3"
        variant="ghost"
        color="gray"
        class="md:hidden"
        @click="isMobileMenuOpen = true"
      />

      <NuxtLink to="/" class="flex items-center gap-2">
        <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-primary-600" />
        <span class="font-bold text-lg md:text-xl tracking-tight text-gray-900">{{ t.appTitle }}</span>
      </NuxtLink>
      <NuxtLink to="/rights" class="hidden md:flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">
        <UIcon name="i-heroicons-book-open" class="w-4 h-4" />
        Know Your Rights
      </NuxtLink>
      <NuxtLink to="/contacts" class="hidden md:flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">
        <UIcon name="i-heroicons-phone" class="w-4 h-4" />
        {{ t?.contacts?.menu || 'Contacts' }}
      </NuxtLink>
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

    <!-- Mobile Menu Slideover -->
    <USlideover v-model:open="isMobileMenuOpen" side="left">
      <template #content>
        <div class="p-4 flex flex-col h-full bg-white">
          <div class="flex justify-between items-center mb-8 border-b pb-4">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-primary-600" />
              <span class="font-bold text-lg text-gray-900">Menu</span>
            </div>
            <UButton icon="i-heroicons-x-mark" variant="ghost" color="gray" @click="isMobileMenuOpen = false" />
          </div>
          
          <nav class="flex flex-col gap-6">
            <NuxtLink to="/" class="flex items-center gap-3 text-lg text-gray-700 font-medium hover:text-primary-600" @click="isMobileMenuOpen = false">
              <UIcon name="i-heroicons-home" class="w-6 h-6" />
              Home
            </NuxtLink>
            <NuxtLink to="/rights" class="flex items-center gap-3 text-lg text-gray-700 font-medium hover:text-primary-600" @click="isMobileMenuOpen = false">
              <UIcon name="i-heroicons-book-open" class="w-6 h-6" />
              Know Your Rights
            </NuxtLink>
            <NuxtLink to="/contacts" class="flex items-center gap-3 text-lg text-gray-700 font-medium hover:text-primary-600" @click="isMobileMenuOpen = false">
              <UIcon name="i-heroicons-phone" class="w-6 h-6" />
              {{ t?.contacts?.menu || 'Contacts' }}
            </NuxtLink>
          </nav>

          <div class="mt-auto pt-6 border-t border-gray-100">
            <UButton
              color="error"
              variant="solid"
              icon="i-heroicons-arrow-right-on-rectangle"
              :label="t.quickExit"
              @click="quickExit"
              block
              class="font-bold uppercase tracking-wider shadow-md"
            />
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { languages, selectedLanguage, t } = useLocales()
const isMobileMenuOpen = ref(false)

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
