<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="bg-gray-900 text-white p-4 flex justify-between items-center z-10">
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

    <!-- Dashboard View with Nested Routes -->
    <div v-else class="flex-1 flex overflow-hidden">
      <!-- Sidebar Navigation -->
      <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div class="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
          Menu
        </div>
        <nav class="flex-1 px-2 space-y-1">
          <NuxtLink to="/admin" exact-active-class="bg-primary-50 text-primary-700 font-bold" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
            <UIcon name="i-heroicons-inbox-stack" class="w-5 h-5" :class="$route.path === '/admin' ? 'text-primary-600' : 'text-gray-400'" />
            Incidents
          </NuxtLink>
          <NuxtLink to="/admin/responders" active-class="bg-primary-50 text-primary-700 font-bold" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
            <UIcon name="i-heroicons-users" class="w-5 h-5" :class="$route.path.includes('/admin/responders') ? 'text-primary-600' : 'text-gray-400'" />
            Responders
          </NuxtLink>
          <NuxtLink to="/admin/analytics" active-class="bg-primary-50 text-primary-700 font-bold" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
            <UIcon name="i-heroicons-chart-bar" class="w-5 h-5" :class="$route.path.includes('/admin/analytics') ? 'text-primary-600' : 'text-gray-400'" />
            Analytics
          </NuxtLink>
          <NuxtLink to="/admin/settings" active-class="bg-primary-50 text-primary-700 font-bold" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
            <UIcon name="i-heroicons-cog-8-tooth" class="w-5 h-5" :class="$route.path.includes('/admin/settings') ? 'text-primary-600' : 'text-gray-400'" />
            Settings
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto bg-gray-50">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { token, loadToken, setToken, logout } = useAdminAuth()
const config = useRuntimeConfig()
const route = useRoute()

const credentials = ref({ username: '', password: '' })
const isLoggingIn = ref(false)
const loginError = ref('')

onMounted(() => {
  loadToken()
})

const login = async () => {
  isLoggingIn.value = true
  loginError.value = ''
  try {
    const res: any = await $fetch(`${config.public.apiBase}/token/`, {
      method: 'POST',
      body: credentials.value
    })
    setToken(res.access)
  } catch (err) {
    loginError.value = 'Invalid credentials.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>
