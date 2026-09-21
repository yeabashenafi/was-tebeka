<template>
  <div>

    <!-- Analytics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <UIcon name="i-heroicons-document-duplicate" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Total Reports</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalIncidents }}</p>
          </div>
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
            <UIcon name="i-heroicons-clock" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Pending Review</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingIncidents }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-red-100 text-red-600 rounded-lg">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">High Urgency</p>
            <p class="text-2xl font-bold text-gray-900">{{ highUrgencyIncidents }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-green-100 text-green-600 rounded-lg">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Resolved</p>
            <p class="text-2xl font-bold text-gray-900">{{ resolvedIncidents }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <UCard>

      <template #header>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Active Incidents</h2>
            <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="fetchIncidents" :loading="isLoading" />
          </div>
          <div class="flex items-center gap-4 border-t border-gray-100 pt-4">
            <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Search ID, category, location, or notes..." class="flex-1 max-w-sm" />
            <div class="flex items-center gap-2 ml-auto">
              <span class="text-sm text-gray-500 font-medium">Country:</span>
              <USelect v-model="filterCountry" :items="availableCountries" class="w-32" />
              <span class="text-sm text-gray-500 font-medium ml-2">Status:</span>
              <USelect v-model="filterStatus" :items="['ALL', ...statusOptions]" class="w-48" />
            </div>
          </div>
        </div>
      </template>
      
      <UTable :columns="columns" :data="paginatedRows" @select="openIncident" class="w-full" v-model:sort="sort" :loading="isLoading">
        <template #id-cell="{ row }">
          <span class="font-mono text-gray-500" :title="row.original ? row.original.id : row.id">{{ (row.original ? row.original.id : row.id).substring(0, 8) }}</span>
        </template>
        <template #id-data="{ row }">
          <span class="font-mono text-gray-500" :title="row.original ? row.original.id : row.id">{{ (row.original ? row.original.id : row.id).substring(0, 8) }}</span>
        </template>
        <template #urgency-cell="{ row }">
          <span :class="`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getUrgencyBadgeClass(row.original ? row.original.urgency : row.urgency)}`">
            {{ (row.original ? row.original.urgency : row.urgency).replace(/_/g, ' ') }}
          </span>
        </template>
        <template #urgency-data="{ row }">
          <span :class="`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getUrgencyBadgeClass(row.original ? row.original.urgency : row.urgency)}`">
            {{ (row.original ? row.original.urgency : row.urgency).replace(/_/g, ' ') }}
          </span>
        </template>

        <template #status-cell="{ row }">
          <span :class="`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(row.original ? row.original.status : row.status)}`">
            {{ (row.original ? row.original.status : row.status).replace(/_/g, ' ') }}
          </span>
        </template>
        <template #status-data="{ row }">
          <span :class="`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(row.original ? row.original.status : row.status)}`">
            {{ (row.original ? row.original.status : row.status).replace(/_/g, ' ') }}
          </span>
        </template>

        <!-- Actions Custom Cell -->
        <template #actions-cell="{ row }">
          <UButton size="sm" color="primary" variant="soft" icon="i-heroicons-eye" @click.stop="openIncident(row)">View Details</UButton>
        </template>
        <template #actions-data="{ row }">
          <UButton size="sm" color="primary" variant="soft" icon="i-heroicons-eye" @click.stop="openIncident(row)">View Details</UButton>
        </template>
      
      </UTable>

      <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200" v-if="filteredRows.length > 0">
        <div class="text-sm text-gray-500">
          Showing <span class="font-bold">{{ (page - 1) * pageCount + 1 }}</span> to <span class="font-bold">{{ Math.min(page * pageCount, filteredRows.length) }}</span> of <span class="font-bold">{{ filteredRows.length }}</span> results
        </div>
        <UPagination v-model="page" :page-count="pageCount" :total="filteredRows.length" />
      </div>
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
            
            <div class="mt-4 bg-primary-50 p-3 rounded border border-primary-100">
              <p class="text-sm text-primary-700 font-bold uppercase tracking-wide">Refer Case</p>
              <div class="flex flex-col gap-2 mt-2">
                <USelect v-model="selectedReferral" :items="referralOrganizations" placeholder="Select Organization..." class="flex-1" />
                <UButton color="primary" @click="referCase" :loading="isReferring" :disabled="!selectedReferral" block>Refer Case</UButton>
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
               <ul class="space-y-3">
                 <li v-for="(t, i) in selectedIncident.timeline" :key="i" class="text-sm bg-gray-100 p-3 rounded">
                   <div class="flex justify-between items-start mb-1">
                     <strong class="text-gray-900">{{ t.title }}</strong>
                     <span class="text-gray-500 text-xs">{{ new Date(t.timestamp).toLocaleString() }}</span>
                   </div>
                   <p v-if="t.description" class="text-gray-600 whitespace-pre-wrap">{{ t.description }}</p>
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

import { ref, computed, onMounted, watch } from 'vue'

const { token, logout } = useAdminAuth()

const config = useRuntimeConfig()


const incidents = ref([])
const isLoading = ref(false)

// Table features: Pagination, Sorting, Filtering
const q = ref('')
const availableCountries = computed(() => {
  const countries = new Set(incidents.value.map((i: any) => i.country).filter(Boolean))
  return ['ALL', 'Ethiopia', ...Array.from(countries).filter(c => c !== 'Ethiopia').sort()]
})
const filterStatus = ref('ALL')
const filterCountry = ref('Ethiopia')
const page = ref(1)
const pageCount = ref(10)
const sort = ref({ column: 'urgency', direction: 'desc' })

const filteredRows = computed(() => {
  let data = [...incidents.value]
  
  // 1. Status Filter
  if (filterStatus.value !== 'ALL') {
    data = data.filter((i: any) => i.status === filterStatus.value)
  }

  // 1.5 Country Filter
  if (filterCountry.value !== 'ALL') {
    data = data.filter((i: any) => i.country === filterCountry.value)
  }

  // 2. Search Filter
  if (q.value) {
    const query = q.value.toLowerCase()
    data = data.filter((item: any) => {
      return (
        item.id.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        (item.city_district && item.city_district.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      )
    })
  }

  // 3. Sorting
  if (sort.value.column) {
    data.sort((a: any, b: any) => {
      let valA = a[sort.value.column]
      let valB = b[sort.value.column]
      
      if (sort.value.column === 'urgency') {
        const urgencyWeight: Record<string, number> = {
          'CRITICAL': 4,
          'HIGH': 3,
          'MEDIUM': 2,
          'LOW': 1
        }
        const wA = urgencyWeight[valA] || 0
        const wB = urgencyWeight[valB] || 0
        if (wA < wB) return sort.value.direction === 'asc' ? -1 : 1
        if (wA > wB) return sort.value.direction === 'asc' ? 1 : -1
        
        // Secondary sort by date descending if urgency is equal
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        if (dateA < dateB) return 1
        if (dateA > dateB) return -1
        return 0
      }

      valA = valA === null || valA === undefined ? '' : valA
      valB = valB === null || valB === undefined ? '' : valB
      
      if (valA < valB) return sort.value.direction === 'asc' ? -1 : 1
      if (valA > valB) return sort.value.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  return data
})

// Reset to page 1 if filters change
watch([q, filterStatus, filterCountry], () => {
  page.value = 1
})

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageCount.value
  const end = start + pageCount.value
  return filteredRows.value.slice(start, end)
})



const isSlideoverOpen = ref(false)
const selectedIncident = ref<any>(null)
const isUpdating = ref(false)

const isAddingEvent = ref(false)
const newEvent = ref({ title: '', description: '' })

const isReferring = ref(false)
const selectedReferral = ref('')
const fetchedResponders = ref<any[]>([])

const referralOrganizations = computed(() => {
  if (fetchedResponders.value.length === 0) {
    return ['Addis Ababa Bureau of Women & Social Affairs', 'EWLA Legal Aid Clinic', 'Safe Haven Emergency Shelter']
  }
  return fetchedResponders.value.filter(o => o.is_active).map(o => `${o.name} (${o.tier})`)
})


const columns = [
  { accessorKey: 'id', key: 'id', header: 'ID' },
  { accessorKey: 'category', key: 'category', header: 'Category', sortable: true },
  { id: 'urgency', accessorKey: 'urgency', key: 'urgency', header: 'Urgency', sortable: true },
  { id: 'status', accessorKey: 'status', key: 'status', header: 'Status', sortable: true },
  { accessorKey: 'country', key: 'country', header: 'Country', sortable: true },
  { accessorKey: 'city_district', key: 'city_district', header: 'Location', sortable: true },
  { accessorKey: 'created_at', key: 'created_at', header: 'Reported', sortable: true, cell: (info: any) => new Date(info.getValue ? info.getValue() : info.created_at).toLocaleDateString() },
  { id: 'actions', key: 'actions', accessorKey: 'actions', header: 'Actions' }
]

const statusOptions = ['PENDING', 'TRIAGED', 'ASSIGNED', 'ACTION_IN_PROGRESS', 'RESOLVED', 'REFERRED_TO_PARTNER']



const getUrgencyBadgeClass = (urgency: string) => {
  switch (urgency) {
    case 'LOW': return 'bg-green-100 text-green-700'
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-700'
    case 'HIGH': return 'bg-orange-100 text-orange-700'
    case 'CRITICAL': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-700'
    case 'TRIAGED': return 'bg-orange-100 text-orange-700'
    case 'ASSIGNED': return 'bg-blue-100 text-blue-700'
    case 'ACTION_IN_PROGRESS': return 'bg-purple-100 text-purple-700'
    case 'RESOLVED': return 'bg-green-100 text-green-700'
    case 'REFERRED_TO_PARTNER': return 'bg-teal-100 text-teal-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

// Analytics Computed Properties
const totalIncidents = computed(() => incidents.value.length)
const pendingIncidents = computed(() => incidents.value.filter((i: any) => i.status === 'PENDING').length)
const highUrgencyIncidents = computed(() => incidents.value.filter((i: any) => i.urgency === 'HIGH' || i.urgency === 'CRITICAL').length)
const resolvedIncidents = computed(() => incidents.value.filter((i: any) => i.status === 'RESOLVED').length)


onMounted(() => {
  if (token.value) {
    fetchIncidents()
    fetchResponders()
  }
})

watch(token, (newVal) => {
  if (newVal) {
    fetchIncidents()
    fetchResponders()
  } else {
    incidents.value = []
    fetchedResponders.value = []
  }
})

const fetchResponders = async () => {
  if (!token.value) return
  try {
    const res: any = await $fetch(`${config.public.apiBase}/admin/responders/`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    fetchedResponders.value = res
  } catch (err) {
    console.error('Failed to fetch responders', err)
  }
}


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


const referCase = async () => {
  if (!selectedIncident.value || !selectedReferral.value) return
  isReferring.value = true
  
  const org = fetchedResponders.value.find(o => `${o.name} (${o.tier})` === selectedReferral.value)
  const contactDetails = org ? `\n\nJurisdiction: ${org.jurisdiction}\nContact Info: ${org.contact}` : ''
  
  try {
    // Update status
    await $fetch(`${config.public.apiBase}/admin/incidents/${selectedIncident.value.id}/`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { status: 'REFERRED_TO_PARTNER' }
    })
    
    // Append timeline event
    await $fetch(`${config.public.apiBase}/admin/timeline/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        incident: selectedIncident.value.id,
        title: `Referred to ${selectedReferral.value}`,
        description: `Case automatically referred to partner organization: ${selectedReferral.value}.${contactDetails}`
      }
    })

    selectedReferral.value = ''
    
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
      alert('Failed to refer case')
    }
  } finally {
    isReferring.value = false
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
