<template>
  <UModal :open="modelValue" @update:open="$emit('update:modelValue', $event)">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">Secure Incident Report</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="$emit('update:modelValue', false)" />
          </div>
        </template>

        <div v-if="submittedToken" class="text-center py-6">
          <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h4 class="text-xl font-bold mb-2">Report Submitted Successfully</h4>
          <p class="text-gray-600 mb-6 text-sm">Please save this claim token. It will only be shown once and is required to track your case.</p>
          <div class="bg-gray-100 p-4 rounded-lg flex items-center justify-center gap-4">
            <span class="font-mono text-2xl font-bold tracking-widest text-gray-900">{{ submittedToken }}</span>
          </div>
          <UButton color="primary" class="mt-8 w-full" @click="closeAndReset">I Have Saved My Token</UButton>
        </div>

        <form v-else @submit.prevent="submitReport" class="space-y-4">
          <UFormField label="Incident Category" required>
            <USelect v-model="reportForm.category" :items="categories" label-key="label" value-key="value" />
          </UFormField>
          
          <UFormField label="Urgency Level" required>
            <USelect v-model="reportForm.urgency" :items="urgencies" label-key="label" value-key="value" />
          </UFormField>

          <UFormField label="Description" help="Do not include your real name or contact details." required>
            <UTextarea v-model="reportForm.description" :rows="4" placeholder="Describe what happened..." />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Region / State">
              <UInput v-model="reportForm.region_state" placeholder="e.g. Addis Ababa" />
            </UFormField>
            <UFormField label="City / District">
              <UInput v-model="reportForm.city_district" placeholder="e.g. Bole" />
            </UFormField>
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <UButton color="gray" variant="ghost" @click="$emit('update:modelValue', false)">Cancel</UButton>
            <UButton type="submit" color="primary" :loading="isSubmitting">Submit Securely</UButton>
          </div>
        </form>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const config = useRuntimeConfig()
const isSubmitting = ref(false)
const submittedToken = ref('')

const categories = [
  { value: 'SEXUAL_VIOLENCE', label: 'Sexual Violence & Rape' },
  { value: 'DOMESTIC_ABUSE', label: 'Domestic / Intimate Partner Violence' },
  { value: 'PHYSICAL_ASSAULT', label: 'Physical Assault & Battery' },
  { value: 'HARASSMENT_STALKING', label: 'Harassment & Stalking' },
  { value: 'CHILD_EARLY_MARRIAGE', label: 'Harmful Practices & Child Exploitation' },
  { value: 'OTHER', label: 'Other Unspecified Abuse' }
]

const urgencies = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Standard' },
  { value: 'HIGH', label: 'High Priority' },
  { value: 'CRITICAL', label: 'Immediate Threat / Medical Emergency' }
]

const defaultForm = {
  category: categories[0].value,
  urgency: urgencies[1].value,
  description: '',
  region_state: '',
  city_district: ''
}
const reportForm = ref({ ...defaultForm })

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
