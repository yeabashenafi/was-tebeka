<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-primary-400" />
        <span class="font-bold">Was Tebeka | Admin Dashboard</span>
      </div>
      <UButton v-if="token" color="error" variant="ghost" size="sm" @click="logout">Logout</UButton>
    </div>

    <!-- Login View -->
    <div v-if="!token" class="flex-1 flex items-center justify-center p-4">
      <UCard class="w-full max-w-sm">
        <template #header>
          <h3 class="text-xl font-bold">Staff Login</h3>
        </template>
        <form @submit.prevent="login" class="space-y-4">
          <UFormField label="Username">
            <UInput v-model="credentials.username" autocomplete="username" />
          </UFormField>
          <UFormField label="Password">
            <UInput v-model="credentials.password" type="password" autocomplete="current-password" />
          </UFormField>
          <p v-if="loginError" class="text-red-500 text-sm">{{ loginError }}</p>
          <UButton type="submit" color="primary" block :loading="isLoggingIn">Secure Login</UButton>
        </form>
      </UCard>
    </div>

    <!-- Dashboard View -->
    <div v-else class="flex-1 p-6">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Active Incidents</h2>
            <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="fetchIncidents" :loading="isLoading" />
          </div>
        </template>
        
        <UTable :columns="columns" :data="incidents" @select="openIncident" class="w-full">
          <!-- custom cell rendering if needed -->
        </UTable>
      </UCard>
    </div>

    <!-- Incident Detail Slideover -->
    <USlideover v-model="isSlideoverOpen" :title="`Incident Details`">
      <template #content v-if="selectedIncident">
        <UCard class="flex flex-col flex-1 h-full rounded-none">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">Case Overview</h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isSlideoverOpen = false" />
            </div>
          </template>

          <div class="space-y-6 overflow-y-auto">
            <div>
              <p class="text-sm text-gray-500 font-bold uppercase tracking-wide">Status</p>
              <div class="flex gap-2 mt-1">
                <USelect v-model="selectedIncident.status" :items="statusOptions" />
                <UButton color="primary" @click="updateStatus" :loading="isUpdating">Update</UButton>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 font-bold uppercase tracking-wide">Category</p>
                <p class="font-medium">{{ selectedIncident.category }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 font-bold uppercase tracking-wide">Urgency</p>
                <p class="font-medium">{{ selectedIncident.urgency }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 font-bold uppercase tracking-wide">Location</p>
                <p class="font-medium">{{ selectedIncident.city_district }}, {{ selectedIncident.region_state }}</p>
              </div>
            </div>

            <div>
              <p class="text-sm text-gray-500 font-bold uppercase tracking-wide">Description</p>
              <div class="bg-gray-50 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap">
                {{ selectedIncident.description }}
              </div>
            </div>

            <UDivider />

            <div>
              <h4 class="font-bold mb-4">Append Timeline Event</h4>
              <form @submit.prevent="addTimelineEvent" class="space-y-3">
                <UInput v-model="newEvent.title" placeholder="Event Title (e.g., Police Dispatched)" required />
                <UTextarea v-model="newEvent.description" placeholder="Internal notes or updates for the survivor..." :rows="2" />
                <UButton type="submit" color="black" block :loading="isAddingEvent">Add Event & Notify</UButton>
              </form>
            </div>
            
            <div v-if="selectedIncident.timeline && selectedIncident.timeline.length" class="mt-6">
               <h4 class="font-bold mb-2">History</h4>
               <ul class="space-y-2">
                 <li v-for="(t, i) in selectedIncident.timeline" :key="i" class="text-sm bg-gray-100 p-2 rounded">
                   <strong>{{ t.title }}</strong> - {{ new Date(t.timestamp).toLocaleDateString() }}
                 </li>
               </ul>
            </div>
          </div>
        </UCard>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const token = ref('')
const credentials = ref({ username: '', password: '' })
const isLoggingIn = ref(false)
const loginError = ref('')

const incidents = ref([])
const isLoading = ref(false)

const isSlideoverOpen = ref(false)
const selectedIncident = ref<any>(null)
const isUpdating = ref(false)
const isAddingEvent = ref(false)
const newEvent = ref({ title: '', description: '' })

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'urgency', header: 'Urgency' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'city_district', header: 'Location' },
  { accessorKey: 'created_at', header: 'Reported', cell: (info: any) => new Date(info.getValue()).toLocaleDateString() }
]

const statusOptions = ['PENDING', 'TRIAGED', 'ASSIGNED', 'ACTION_IN_PROGRESS', 'RESOLVED']

onMounted(() => {
  const saved = localStorage.getItem('admin_token')
  if (saved) {
    token.value = saved
    fetchIncidents()
  }
})

const login = async () => {
  isLoggingIn.value = true
  loginError.value = ''
  try {
    const res: any = await $fetch(`${config.public.apiBase}/token/`, {
      method: 'POST',
      body: credentials.value
    })
    token.value = res.access
    localStorage.setItem('admin_token', res.access)
    await fetchIncidents()
  } catch (err) {
    loginError.value = 'Invalid credentials.'
  } finally {
    isLoggingIn.value = false
  }
}

const logout = () => {
  token.value = ''
  localStorage.removeItem('admin_token')
  incidents.value = []
}

const fetchIncidents = async () => {
  isLoading.value = true
  try {
    const res: any = await $fetch(`${config.public.apiBase}/admin/incidents/`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    incidents.value = res
  } catch (err) {
    if ((err as any).response?.status === 401) logout()
  } finally {
    isLoading.value = false
  }
}

const openIncident = (row: any) => {
  // @ts-ignore
  selectedIncident.value = { ...row.original }
  isSlideoverOpen.value = true
}

const updateStatus = async () => {
  if (!selectedIncident.value) return
  isUpdating.value = true
  try {
    await $fetch(`${config.public.apiBase}/admin/incidents/${selectedIncident.value.id}/`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { status: selectedIncident.value.status }
    })
    fetchIncidents()
  } catch (err) {
    alert('Failed to update status')
  } finally {
    isUpdating.value = false
  }
}

const addTimelineEvent = async () => {
  if (!selectedIncident.value) return
  isAddingEvent.value = true
  try {
    await $fetch(`${config.public.apiBase}/admin/timeline/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        incident: selectedIncident.value.id,
        title: newEvent.value.title,
        description: newEvent.value.description
      }
    })
    newEvent.value = { title: '', description: '' }
    
    // Refresh the specific incident to get the new timeline event
    const updated: any = await $fetch(`${config.public.apiBase}/admin/incidents/${selectedIncident.value.id}/`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    selectedIncident.value = updated
    fetchIncidents()
  } catch (err) {
    alert('Failed to add event')
  } finally {
    isAddingEvent.value = false
  }
}
</script>
