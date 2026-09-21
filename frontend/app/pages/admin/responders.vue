<template>
  <div>
    <UCard class="flex-1 flex flex-col">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Responders & Organizations</h2>
          <div class="flex gap-2">
            <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="fetchResponders" :loading="isLoading" />
            <UButton icon="i-heroicons-plus" color="primary" @click="openCreateModal">Add Responder</UButton>
          </div>
        </div>
      </template>

      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Search organization..." class="w-full max-w-sm" />
      </div>

      <UTable :columns="columns" :data="paginatedRows" :loading="isLoading" class="flex-1" v-model:sort="sort">
        <template #is_active-data="{ row }">
          <UBadge :color="(row.original ? row.original.is_active : row.is_active) ? 'green' : 'gray'" variant="soft">
            {{ (row.original ? row.original.is_active : row.is_active) ? 'Active' : 'Inactive' }}
          </UBadge>
        </template>
        <template #is_active-cell="{ row }">
          <UBadge :color="(row.original ? row.original.is_active : row.is_active) ? 'green' : 'gray'" variant="soft">
            {{ (row.original ? row.original.is_active : row.is_active) ? 'Active' : 'Inactive' }}
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton size="sm" color="gray" variant="ghost" icon="i-heroicons-pencil-square" @click.stop="openEditModal(row)">Edit</UButton>
        </template>
        <template #actions-cell="{ row }">
          <UButton size="sm" color="gray" variant="ghost" icon="i-heroicons-pencil-square" @click.stop="openEditModal(row)">Edit</UButton>
        </template>
      </UTable>

      <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200" v-if="filteredRows.length > 0">
        <div class="text-sm text-gray-500">
          Showing <span class="font-bold">{{ (page - 1) * pageCount + 1 }}</span> to <span class="font-bold">{{ Math.min(page * pageCount, filteredRows.length) }}</span> of <span class="font-bold">{{ filteredRows.length }}</span> results
        </div>
        <UPagination v-model="page" :page-count="pageCount" :total="filteredRows.length" />
      </div>
    </UCard>

    <!-- Modal for Create/Edit -->
    <UModal v-model:open="isModalOpen" :title="isEditing ? 'Edit Responder' : 'Add Responder'">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">{{ isEditing ? 'Edit Responder' : 'Add Responder' }}</h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false" />
            </div>
          </template>

          <form @submit.prevent="saveResponder" class="space-y-4">
            <UFormField label="Organization Name">
              <UInput v-model="form.name" required />
            </UFormField>

            <UFormField label="Tier">
              <USelect v-model="form.tier" :items="['Legal Defense', 'Emergency Shelter', 'Medical Care', 'Social Support']" required />
            </UFormField>

            <UFormField label="Country">
              <USelect v-model="form.country" :items="['Ethiopia', 'Kenya', 'Côte d\'Ivoire']" required />
            </UFormField>

            <UFormField label="Jurisdiction">
              <UInput v-model="form.jurisdiction" required placeholder="e.g. Addis Ababa" />
            </UFormField>

            <UFormField label="Contact Info">
              <UInput v-model="form.contact" required placeholder="Phone / Email" />
            </UFormField>

            <UFormField label="Status" class="flex items-center gap-2 mt-4">
              <UToggle v-model="form.is_active" /> <span class="text-sm">{{ form.is_active ? 'Active' : 'Inactive' }}</span>
            </UFormField>

            <div class="pt-4 flex justify-end gap-2 border-t mt-4">
              <UButton color="gray" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
              <UButton type="submit" color="primary" :loading="isSaving">Save</UButton>
            </div>
          </form>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const { token, logout } = useAdminAuth()
const config = useRuntimeConfig()

const responders = ref<any[]>([])
const isLoading = ref(false)

const q = ref('')
const page = ref(1)
const pageCount = ref(10)
const sort = ref({ column: 'name', direction: 'asc' })

const columns = [
  { accessorKey: 'name', key: 'name', header: 'Name', sortable: true },
  { accessorKey: 'tier', key: 'tier', header: 'Tier', sortable: true },
  { accessorKey: 'country', key: 'country', header: 'Country', sortable: true },
  { accessorKey: 'jurisdiction', key: 'jurisdiction', header: 'Jurisdiction' },
  { accessorKey: 'contact', key: 'contact', header: 'Contact' },
  { accessorKey: 'is_active', key: 'is_active', header: 'Status', sortable: true },
  { id: 'actions', key: 'actions', accessorKey: 'actions', header: 'Actions' }
]

const filteredRows = computed(() => {
  let data = [...responders.value]
  if (q.value) {
    const query = q.value.toLowerCase()
    data = data.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.tier.toLowerCase().includes(query) ||
      item.jurisdiction.toLowerCase().includes(query)
    )
  }
  if (sort.value.column) {
    data.sort((a, b) => {
      let valA = a[sort.value.column]
      let valB = b[sort.value.column]
      if (valA < valB) return sort.value.direction === 'asc' ? -1 : 1
      if (valA > valB) return sort.value.direction === 'asc' ? 1 : -1
      return 0
    })
  }
  return data
})

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageCount.value
  const end = start + pageCount.value
  return filteredRows.value.slice(start, end)
})

onMounted(() => {
  if (token.value) fetchResponders()
})

const fetchResponders = async () => {
  if (!token.value) return
  isLoading.value = true
  try {
    const res: any = await $fetch(`${config.public.apiBase}/admin/responders/`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    responders.value = res
  } catch (err) {
    if ((err as any).response?.status === 401) logout()
  } finally {
    isLoading.value = false
  }
}

const isModalOpen = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const form = ref({ id: null, name: '', tier: 'Legal Defense', jurisdiction: '', country: 'Ethiopia', contact: '', is_active: true })

const openCreateModal = () => {
  isEditing.value = false
  form.value = { id: null, name: '', tier: 'Legal Defense', jurisdiction: '', country: 'Ethiopia', contact: '', is_active: true }
  isModalOpen.value = true
}

const openEditModal = (row: any) => {
  const data = row.original ? row.original : row
  isEditing.value = true
  form.value = { ...data }
  isModalOpen.value = true
}

const saveResponder = async () => {
  isSaving.value = true
  try {
    if (isEditing.value && form.value.id) {
      await $fetch(`${config.public.apiBase}/admin/responders/${form.value.id}/`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    } else {
      await $fetch(`${config.public.apiBase}/admin/responders/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    }
    isModalOpen.value = false
    fetchResponders()
  } catch (err) {
    alert('Failed to save responder.')
  } finally {
    isSaving.value = false
  }
}
</script>
