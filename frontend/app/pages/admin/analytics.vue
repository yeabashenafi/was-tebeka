<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Analytics & Insights</h2>
    
    <div v-if="isLoading" class="flex justify-center p-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
    </div>

    <div v-else-if="incidents.length === 0" class="text-center p-12 text-gray-500">
      No data available to generate analytics.
    </div>

    <div v-else class="space-y-6">
      <!-- Quick Stats Row (Optional repetition, but good for context) -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UCard>
          <p class="text-sm text-gray-500 font-medium">Total Cases</p>
          <p class="text-2xl font-bold text-gray-900">{{ totalIncidents }}</p>
        </UCard>
        <UCard>
          <p class="text-sm text-gray-500 font-medium">Pending</p>
          <p class="text-2xl font-bold text-gray-900">{{ incidentsByStatus['PENDING'] || 0 }}</p>
        </UCard>
        <UCard>
          <p class="text-sm text-gray-500 font-medium">In Progress</p>
          <p class="text-2xl font-bold text-gray-900">{{ incidentsByStatus['ACTION_IN_PROGRESS'] || 0 }}</p>
        </UCard>
        <UCard>
          <p class="text-sm text-gray-500 font-medium">Resolved</p>
          <p class="text-2xl font-bold text-gray-900">{{ incidentsByStatus['RESOLVED'] || 0 }}</p>
        </UCard>
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Status Doughnut Chart -->
        <UCard>
          <template #header>
            <h3 class="font-bold">Case Status Distribution</h3>
          </template>
          <div class="h-64 flex items-center justify-center">
            <Doughnut v-if="statusChartData" :data="statusChartData" :options="chartOptions" />
          </div>
        </UCard>

        <!-- Urgency Doughnut Chart -->
        <UCard>
          <template #header>
            <h3 class="font-bold">Case Urgency Distribution</h3>
          </template>
          <div class="h-64 flex items-center justify-center">
            <Doughnut v-if="urgencyChartData" :data="urgencyChartData" :options="chartOptions" />
          </div>
        </UCard>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 gap-6">
        <!-- Category Bar Chart -->
        <UCard>
          <template #header>
            <h3 class="font-bold">Incidents by Category</h3>
          </template>
          <div class="h-80 w-full flex items-center justify-center">
            <Bar v-if="categoryChartData" :data="categoryChartData" :options="barOptions" />
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const { token, logout } = useAdminAuth()
const config = useRuntimeConfig()

const incidents = ref<any[]>([])
const isLoading = ref(true)

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

const totalIncidents = computed(() => incidents.value.length)

// Aggregate functions
const countBy = (arr: any[], key: string) => {
  return arr.reduce((acc, curr) => {
    acc[curr[key]] = (acc[curr[key]] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

const incidentsByStatus = computed(() => countBy(incidents.value, 'status'))
const incidentsByUrgency = computed(() => countBy(incidents.value, 'urgency'))
const incidentsByCategory = computed(() => countBy(incidents.value, 'category'))

// Chart Data Computed Properties
const statusChartData = computed(() => {
  if (!incidents.value.length) return null
  const data = incidentsByStatus.value
  return {
    labels: Object.keys(data),
    datasets: [
      {
        backgroundColor: ['#eab308', '#f97316', '#3b82f6', '#a855f7', '#22c55e', '#6b7280'], // yellow, orange, blue, purple, green, gray
        data: Object.values(data)
      }
    ]
  }
})

const urgencyChartData = computed(() => {
  if (!incidents.value.length) return null
  const data = incidentsByUrgency.value
  return {
    labels: Object.keys(data),
    datasets: [
      {
        backgroundColor: ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#6b7280'], // red for CRITICAL, orange HIGH, yellow MEDIUM, blue LOW
        data: Object.values(data)
      }
    ]
  }
})

const categoryChartData = computed(() => {
  if (!incidents.value.length) return null
  const data = incidentsByCategory.value
  return {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Incidents',
        backgroundColor: '#10b981', // emerald
        data: Object.values(data)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>
