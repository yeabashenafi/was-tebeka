<template>
  <UModal :open="modelValue" @update:open="$emit('update:modelValue', $event)">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">{{ t?.reportModal?.title || 'Secure Incident Report' }}</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="$emit('update:modelValue', false)" />
          </div>
        </template>

        <div v-if="submittedToken" class="text-center py-6">
          <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h4 class="text-xl font-bold mb-2">{{ t?.reportModal?.successTitle || 'Report Submitted Successfully' }}</h4>
          <p class="text-gray-600 mb-6 text-sm">{{ t?.reportModal?.successDesc || 'Please save this claim token. It will only be shown once and is required to track your case.' }}</p>
          <div class="bg-gray-100 p-4 rounded-lg flex items-center justify-center gap-4">
            <span class="font-mono text-2xl font-bold tracking-widest text-gray-900">{{ submittedToken }}</span>
          </div>
          <UButton color="primary" class="mt-8 w-full" @click="closeAndReset">{{ t?.reportModal?.btnSaved || 'I Have Saved My Token' }}</UButton>
        </div>

        <form v-else @submit.prevent="submitReport" class="space-y-4">
          <UFormField :label="t?.reportModal?.category || 'Incident Category'" required>
            <USelect v-model="reportForm.category" :items="categories" label-key="label" value-key="value" />
          </UFormField>
          
          <UFormField :label="t?.reportModal?.urgency || 'Urgency Level'" required>
            <USelect v-model="reportForm.urgency" :items="urgencies" label-key="label" value-key="value" />
          </UFormField>

          <UFormField :label="t?.reportModal?.desc || 'Description'" :help="t?.reportModal?.descHelp || 'Do not include your real name or contact details.'" required>
            <UTextarea v-model="reportForm.description" :rows="4" :placeholder="t?.reportModal?.descPlaceholder || 'Describe what happened...'" />
          </UFormField>

          <div class="space-y-4">
            <UFormField label="Country / ሀገር" required>
              <USelect v-model="reportForm.country" :items="africanCountries" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="t?.reportModal?.region || 'Region / State'" required>
                <UInput v-model="reportForm.region_state" :placeholder="t?.reportModal?.regionPlaceholder || 'e.g. Addis Ababa'" required />
              </UFormField>
              <UFormField :label="t?.reportModal?.city || 'City / District'" required>
                <UInput v-model="reportForm.city_district" :placeholder="t?.reportModal?.cityPlaceholder || 'e.g. Bole'" required />
              </UFormField>
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <UButton color="gray" variant="ghost" @click="$emit('update:modelValue', false)">{{ t?.reportModal?.btnCancel || 'Cancel' }}</UButton>
            <UButton type="submit" color="primary" :loading="isSubmitting">{{ t?.reportModal?.btnSubmit || 'Submit Securely' }}</UButton>
          </div>
        </form>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const { t } = useLocales()

const config = useRuntimeConfig()
const isSubmitting = ref(false)
const submittedToken = ref('')

const categories = computed(() => [
  { value: 'SEXUAL_VIOLENCE', label: t.value?.reportModal?.categories?.sexual || 'Sexual Violence & Rape' },
  { value: 'DOMESTIC_ABUSE', label: t.value?.reportModal?.categories?.domestic || 'Domestic / Intimate Partner Violence' },
  { value: 'PHYSICAL_ASSAULT', label: t.value?.reportModal?.categories?.physical || 'Physical Assault & Battery' },
  { value: 'HARASSMENT_STALKING', label: t.value?.reportModal?.categories?.harassment || 'Harassment & Stalking' },
  { value: 'CHILD_EARLY_MARRIAGE', label: t.value?.reportModal?.categories?.child || 'Harmful Practices & Child Exploitation' },
  { value: 'OTHER', label: t.value?.reportModal?.categories?.other || 'Other Unspecified Abuse' }
])

const urgencies = computed(() => [
  { value: 'LOW', label: t.value?.reportModal?.urgencies?.low || 'Low' },
  { value: 'MEDIUM', label: t.value?.reportModal?.urgencies?.medium || 'Standard' },
  { value: 'HIGH', label: t.value?.reportModal?.urgencies?.high || 'High Priority' },
  { value: 'CRITICAL', label: t.value?.reportModal?.urgencies?.critical || 'Immediate Threat / Medical Emergency' }
])

const defaultForm = {
  category: 'SEXUAL_VIOLENCE',
  urgency: 'MEDIUM',
  description: '',
  country: 'Ethiopia',
  region_state: '',
  city_district: ''
}
const reportForm = ref({ ...defaultForm })

const africanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 
  'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo (Brazzaville)', 
  'Congo (Kinshasa)', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 
  'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 
  'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 
  'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 
  'Sao Tome & Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 
  'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 
  'Zambia', 'Zimbabwe'
]

const submitReport = async () => {
  if (!reportForm.value.description) return
  isSubmitting.value = true
  try {
    const res = await $fetch(`${config.public.apiBase}/incidents/`, {
      method: 'POST',
      body: reportForm.value
    })
    // @ts-ignore
    submittedToken.value = res.raw_token
  } catch (err) {
    console.error(err)
    alert("Failed to submit report. Ensure backend is running.")
  } finally {
    isSubmitting.value = false
  }
}

const closeAndReset = () => {
  emit('update:modelValue', false)
  setTimeout(() => {
    submittedToken.value = ''
    reportForm.value = { ...defaultForm }
  }, 300)
}
</script>
