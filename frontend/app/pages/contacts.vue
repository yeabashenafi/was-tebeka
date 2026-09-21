<template>
  <UApp :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
    <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans selection:bg-primary-100" :dir="selectedLanguage === 'ar' ? 'rtl' : 'ltr'">
      <AppHeader />
      <main class="pt-24 flex-1 container mx-auto px-4 max-w-5xl py-8">
                <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ t?.contacts?.title || 'Emergency Contacts & Partner Organizations' }}</h1>
            <p class="text-gray-600 max-w-3xl">{{ t?.contacts?.subtitle || 'Get immediate help, legal advice, or medical support from our trusted partners before submitting a report.' }}</p>
          </div>
          
          <div v-if="availableCountries.length > 1" class="w-full md:w-64 shrink-0">
            <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Country</label>
            <USelect 
              v-model="selectedCountry" 
              :items="availableCountries"
              icon="i-heroicons-globe-alt"
            />
          </div>
        </div>

        <div v-if="pending" class="flex justify-center p-12">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
        </div>
        <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load contacts. Please try again later.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard v-for="org in filteredOrgs" :key="org.id" class="flex flex-col">
            <template #header>
              <div class="flex justify-between items-start">
                <h3 class="font-bold text-lg text-gray-900">{{ org.name }}</h3>
                <UBadge :color="tierColor(org.tier)" variant="subtle" size="sm" class="uppercase text-xs">{{ org.tier }}</UBadge>
              </div>
            </template>
            
            <div class="space-y-4 flex-1">
              <div class="space-y-2 text-sm">
                <div v-if="org.contact" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-phone" class="text-gray-400 w-4 h-4" />
                  <a :href="'tel:' + org.contact" class="text-primary-600 font-medium hover:underline">{{ org.contact }}</a>
                </div>
                <div v-if="org.country || org.jurisdiction" class="flex items-start gap-2">
                  <UIcon name="i-heroicons-map-pin" class="text-gray-400 w-4 h-4 mt-0.5 shrink-0" />
                  <span class="text-gray-700">
                    {{ org.jurisdiction }}<span v-if="org.jurisdiction && org.country">, </span>{{ org.country }}
                  </span>
                </div>
              </div>
            </div>

            <template #footer>
              <UButton v-if="org.contact" :to="'tel:' + org.contact" color="primary" variant="soft" block icon="i-heroicons-phone">
                {{ t?.contacts?.btnCall || 'Call Now' }}
              </UButton>
            </template>
          </UCard>
          
          <div v-if="!filteredOrgs?.length" class="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
            {{ t?.contacts?.empty || 'No partner organizations available at this time.' }}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const { t, selectedLanguage } = useLocales()
const config = useRuntimeConfig()


const { data: orgs, pending, error } = useFetch(`${config.public.apiBase}/organizations/`, {
  lazy: true
})

const selectedCountry = ref('')

const availableCountries = computed(() => {
  if (!orgs.value) return []
  const countries = new Set(orgs.value.map((org: any) => org.country).filter(Boolean))
  return ['All Countries', ...Array.from(countries).sort()]
})

watch(orgs, () => {
  if (orgs.value && !selectedCountry.value && availableCountries.value.length > 1) {
    if (availableCountries.value.includes('Ethiopia')) {
       selectedCountry.value = 'Ethiopia'
    } else {
       selectedCountry.value = 'All Countries'
    }
  }
})

const filteredOrgs = computed(() => {
  if (!orgs.value) return []
  if (!selectedCountry.value || selectedCountry.value === 'All Countries') return orgs.value
  return orgs.value.filter((org: any) => org.country === selectedCountry.value)
})


const tierColor = (tier: string) => {
  switch (tier) {
    case 'LEGAL': return 'blue'
    case 'MEDICAL': return 'red'
    case 'SHELTER': return 'emerald'
    case 'GOV_AGENCY': return 'amber'
    default: return 'gray'
  }
}
</script>
