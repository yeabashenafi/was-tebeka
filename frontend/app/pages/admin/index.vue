<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Active Incidents</h2>
          <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="fetchIncidents" :loading="isLoading" />
        </div>
      </template>
      
      <UTable :columns="columns" :data="incidents" @select="openIncident" class="w-full">
        <!-- Status Custom Cell -->
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original ? row.original.status : row.status)" variant="soft">
            {{ (row.original ? row.original.status : row.status).replace(/_/g, ' ') }}
          </UBadge>
        </template>
        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.original ? row.original.status : row.status)" variant="soft">
            {{ (row.original ? row.original.status : row.status).replace(/_/g, ' ') }}
          </UBadge>
        </template>

        <!-- Actions Custom Cell -->
        <template #actions-cell="{ row }">
          <UButton size="sm" color="primary" variant="soft" icon="i-heroicons-eye" @click.stop="openIncident(row)">View Details</UButton>
        </template>
        <template #actions-data="{ row }">
          <UButton size="sm" color="primary" variant="soft" icon="i-heroicons-eye" @click.stop="openIncident(row)">View Details</UButton>
        </template>
      </UTable>
    </UCard>

    <!-- Incident Detail Slideover -->
    <USlideover v-model:open="isSlideoverOpen" :title="`Incident Details`">
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
import { ref, onMounted, watch } from 'vue'

const { token, logout } = useAdminAuth()
const config = useRuntimeConfig()

const incidents = ref([])
const isLoading = ref(false)

const isSlideoverOpen = ref(false)
const selectedIncident = ref<any>(null)
const isUpdating = ref(false)
const isAddingEvent = ref(false)
const newEvent = ref({ title: '', description: '' })

const columns = [
  { accessorKey: 'id', key: 'id', header: 'ID' },
  { accessorKey: 'category', key: 'category', header: 'Category' },
  { accessorKey: 'urgency', key: 'urgency', header: 'Urgency' },
  { accessorKey: 'status', key: 'status', header: 'Status' },
  { accessorKey: 'city_district', key: 'city_district', header: 'Location' },
  { accessorKey: 'created_at', key: 'created_at', header: 'Reported', cell: (info: any) => new Date(info.getValue ? info.getValue() : info.created_at).toLocaleDateString() },
  { id: 'actions', key: 'actions', accessorKey: 'actions', header: 'Actions' }
]

const statusOptions = ['PENDING', 'TRIAGED', 'ASSIGNED', 'ACTION_IN_PROGRESS', 'RESOLVED']

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'yellow'
    case 'TRIAGED': return 'orange'
    case 'ASSIGNED': return 'blue'
    case 'ACTION_IN_PROGRESS': return 'purple'
    case 'RESOLVED': return 'green'
    default: return 'gray'
  }
}

onMounted(() => {
  if (token.value) {
    fetchIncidents()
  }
})

watch(token, (newVal) => {
  if (newVal) {
    fetchIncidents()
  } else {
    incidents.value = []
  }
})

const fetchIncidents = async () => {
  if (!token.value) return
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
  // Support both Nuxt UI v3 (direct object) and v4 (TanStack row.original)
  const data = row.original ? row.original : row
  selectedIncident.value = { ...data }
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
    if ((err as any).response?.status === 401) {
      alert('Session expired. Please log in again.')
      logout()
    } else {
      alert('Failed to update status')
    }
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
    
    // Refresh the specific incident
    const updated: any = await $fetch(`${config.public.apiBase}/admin/incidents/${selectedIncident.value.id}/`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    selectedIncident.value = updated
    fetchIncidents()
  } catch (err) {
    if ((err as any).response?.status === 401) {
      alert('Session expired. Please log in again.')
      logout()
    } else {
      alert('Failed to add event')
    }
  } finally {
    isAddingEvent.value = false
  }
}
</script>
